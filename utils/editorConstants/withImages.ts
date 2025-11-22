import { BaseEditor, Element, Node, Path, Transforms } from "slate"
import { ReactEditor } from "slate-react"

import Compressor from "compressorjs"
import exifr from "exifr"

import { resolve } from "../../app/gqty/index.ts"
import { EmptyText } from "./customEditor.ts"

const base64encode = (blob: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      resolve(reader.result!.toString())
    }
  })
}

const compress = (
  blob: File | Blob,
  options: Omit<Compressor.Options, "success">,
): Promise<File | Blob> => {
  return new Promise((success, error) => {
    new Compressor(blob, {
      // to env
      ...options,

      success,
      error,
    })
  })
}

type AfterUploadCallback = (id: string, alt: string | null | undefined) => void

const uploadImages: (
  files: FileList,
  thenCb?: AfterUploadCallback,
) => Promise<void> = async (files, thenCb) => {
  if (!files) return
  if (files.length < 1) return

  for (let index = 0; index < files.length; index++) {
    const file = files.item(index)
    if (!file) continue
    const [mime] = file.type.split("/")

    if (mime === "image") {
      //to env
      const imagePromise = compress(file, {
        quality: 0.9,
        maxWidth: 1200,
        maxHeight: 1200,
        convertSize: 0,
      })
      const thumbnailPromise = compress(file, {
        quality: 0.65,
        maxWidth: 400,
        maxHeight: 400,
        convertSize: 0,
      })

      let someDescriptionsPromise: Promise<string[] | undefined> | undefined
      try {
        someDescriptionsPromise = exifr.parse(file, [
          "ImageDescription",
          "UserComment",
        ])
      } catch {
        // doesn't matter if couldn't parse
      }
      const [image, thumbnail, someDescriptions] = await Promise.all([
        imagePromise,
        thumbnailPromise,
        someDescriptionsPromise,
      ])
      const encodedThumbnail = await base64encode(thumbnail)
      const imageFile = new File([image], file.name)

      let imageDescription: string | undefined
      if (someDescriptions && someDescriptions.length > 0) {
        imageDescription = String(someDescriptions[0]).trim()
      }

      const nameWithoutExt = file.name.replace(/\.[^.]+$/, "")
      // 'image' - default when copy paste image from web page
      if (!imageDescription && nameWithoutExt !== "image") {
        imageDescription = nameWithoutExt.replace(/[-_]/g, " ")
      }

      await resolve(({ mutation }) => {
        const result = mutation.uploadImage({
          image: imageFile,
          thumbnail: encodedThumbnail,
          description: imageDescription,
        })
        if (result) {
          return {
            id: result.id,
            thumbnail: result.thumbnail,
            alt: result.description,
          }
        }
        return null
      })
        .then((result) => {
          if (!result?.id) return
          if (thenCb) thenCb(result.id, result.alt)
          resolve(({ query }) => {
            return query.images?.map((a) => ({
              id: a.id,
              thumbnail: a.thumbnail,
            }))
          }, { cachePolicy: "reload" })
        })
    }
  }
}

export type ImageElement = {
  type: "image"
  url: string
  alt: string | null | undefined
  children: EmptyText[]
}

export function createImageElement(
  url: string,
  alt?: string | null,
): ImageElement {
  return {
    type: "image",
    url,
    alt,
    children: [{ text: "" }],
  }
}

export type EditorWithImages = {
  isMarkdownMode: boolean
  setUploadError: ((error: string) => void) | undefined
  isVoid: (element: ImageElement) => boolean
}

const insertImage: (
  editor: EditorWithImages & BaseEditor,
  id: string,
  alt: string | null | undefined,
) => void = (editor, id, alt) => {
  const url = `/${id}.jpg`
  if (editor.isMarkdownMode) {
    Transforms.insertText(editor, `\n\n![${alt}](${url})\n\n`)
  } else {
    Transforms.splitNodes(editor, {
      always: true, // make sure you split even if at boundaries
    })
    const image = createImageElement(url, alt)
    Transforms.insertNodes(editor, image)
    Transforms.move(editor, { distance: 1, unit: "offset" })
    Transforms.deselect(editor)
  }
}

const withImages = <T extends ReactEditor & BaseEditor>(
  reactEditor: T,
): T & EditorWithImages => {
  const { insertData, isVoid, normalizeNode } = reactEditor
  const editor = reactEditor as T & EditorWithImages

  editor.isVoid = (element) => {
    return "type" in element && element.type === "image"
      ? true
      : isVoid(element)
  }

  editor.insertData = (data) => {
    const { files } = data
    const imageId = data.getData("id")

    if (imageId) {
      //if dataURL contains id of full image
      insertImage(editor, imageId, data.getData("alt"))
    } else if (files.length) {
      //if insert is image file
      uploadImages(files, (id, alt) => insertImage(editor, id, alt))
        .catch((error) => {
          editor.setUploadError?.(error.message)
        })
    } else {
      //if not image insert
      insertData(data)
    }
  }

  editor.normalizeNode = (entry) => {
    const [node, path] = entry

    // Rule: ImageElement must always be a top-level block
    if (
      Element.isElement(node) &&
      "type" in node && node.type === "image"
    ) {
      let currentPath = path
      // Walk up all ancestor blocks
      while (currentPath.length > 1) {
        const parentPath = Path.parent(currentPath)

        // Split the parent at the image
        Transforms.splitNodes(editor, { at: currentPath })

        // Move the image into the gap created
        Transforms.moveNodes(editor, {
          at: Path.next(parentPath).concat(0),
          to: Path.next(parentPath),
        })

        // Move to next to splitted node
        currentPath = Path.next(parentPath)

        // Remove empty blocks if created
        // important to do it from end to start, that paths are not acidentally changed
        for (
          const splittedElementPath of [Path.next(currentPath), parentPath]
        ) {
          const splittedNode = Node.get(editor, splittedElementPath)
          if (
            Element.isElement(splittedNode) &&
            (splittedNode.children.length === 1 &&
                "text" in splittedNode.children[0] &&
                splittedNode.children[0].text === "" ||
              splittedNode.children.length === 0)
          ) {
            Transforms.removeNodes(editor, { at: splittedElementPath })
            // if block before was removed, move into its place
            if (splittedElementPath === parentPath) currentPath = parentPath
          }
        }
      }
      return // exit early to avoid double-normalizing
    }

    // Fallback to original normalization
    normalizeNode(entry)
  }

  return editor
}

export { uploadImages, withImages }
