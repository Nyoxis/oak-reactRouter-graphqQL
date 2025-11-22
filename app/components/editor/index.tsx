"use client"

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"

import { createEditor, Descendant, Editor, Transforms } from "slate"
import { Editable, Slate, withReact } from "slate-react"
import { withHistory } from "slate-history"
import { useDebounceCallback } from "usehooks-ts"

import {
  ElementRenderer,
  LeafRenderer,
} from "../../../utils/editorRenderer/blockRenderers.tsx"
import {
  CustomElement,
  withCustomEditor,
} from "../../../utils/editorConstants/customEditor.ts"
import { withImages } from "../../../utils/editorConstants/withImages.ts"
import {
  isValueMd,
  withMdSyntax,
} from "../../../utils/editorConstants/mdEditor.ts"
import decorator from "../../../utils/editorConstants/decorator.ts"
import EditorTools, { EditorToolsHandle } from "./editorTools.tsx"
import EditorManaging from "./editorManaging.tsx"
import EditorFields from "./editorFields.tsx"
import PhotoPicker, { PhotoPickerHandle } from "./photoPicker.tsx"
import { MdValueToSlate, SlateToMd } from "../../../utils/editorMdConverters.ts"
import validateSlateNodes from "../../../utils/validateSlateNodes.ts"

export const draftTitleKey = "draftTitle"

const blankValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
]

function localStore(newValue: Descendant[], itemName: string) {
  // Save the value to Local Storage.
  const cache = JSON.stringify(newValue)
  localStorage.setItem(itemName, cache)
}

function localRestore(
  itemName: string,
  isNew: boolean,
): { value?: Descendant[]; title?: string; cached?: boolean; isMD?: boolean } {
  let cached
  let title
  let value
  let isMD
  if (typeof window !== "undefined") {
    const cache = localStorage.getItem(itemName)
    if (cache) {
      try {
        value = JSON.parse(cache)
        const validationError = validateSlateNodes(value)
        if (validationError) throw validationError
      } catch {
        localStorage.removeItem(itemName)
      }
      isMD = isValueMd(value)
      cached = true
    }
    if (isNew) {
      const titleCache = localStorage.getItem(draftTitleKey)
      if (titleCache) {
        title = titleCache
        cached = true
      }
    }
  }
  return { value, title, cached, isMD }
}

export function localClear(itemName: string, isNew: boolean) {
  localStorage.removeItem(itemName)
  if (isNew) {
    localStorage.removeItem(draftTitleKey)
  }
}

const SlateEditor: FC<
  { title?: string; isNew?: boolean; content?: Descendant[] }
> = ({ title = "new", content }) => {
  const isNew = !content
  const itemName = isNew ? "post:new" : `post:${title}`

  const restored = useMemo(() => localRestore(itemName, isNew), [])
  const initialValue = restored.value ?? content ?? blankValue
  const initialTitle = isNew ? "" : title
  const [newTitle, setTitle] = useState(restored.title ?? initialTitle)
  const [value, setValue] = useState(initialValue)
  const [changed, setChanged] = useState(restored.cached ?? false)
  const [isMarkDown, setMarkDown] = useState(restored.isMD ?? false)

  const [editor] = useState(() =>
    withImages(
      withCustomEditor(
        withMdSyntax(
          withHistory(
            withReact(
              createEditor(),
            ),
          ),
        ),
      ),
    )
  )

  editor.isMarkdownMode = isMarkDown
  const renderElement = useCallback(ElementRenderer, [])
  const renderLeaf = useCallback(LeafRenderer, [])
  const decorate = useCallback(decorator, [])

  const photoPickerRef = useRef<PhotoPickerHandle>(null)
  const editorToolsRef = useRef<EditorToolsHandle>(null)
  // attach error display handler to PhotoPicker error message field
  useEffect(() => {
    editor.setUploadError = photoPickerRef.current?.setUploadError
  }, [editor, photoPickerRef.current])

  const debouncedStore = useDebounceCallback(localStore, 500)
  const onSlateChange: (newValue: Descendant[]) => void = (newValue) => {
    setValue(newValue)
    // Anything besides the selection is changed
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type,
    )
    const isSelected = editor.operations.some(
      (op) => "set_selection" === op.type,
    )
    const isInserted = editor.operations.some(
      (op) => "insert_node" === op.type,
    )
    if (isSelected) {
      editorToolsRef.current?.setSelectedBlockType(editor.getBlockType())
    }
    if (isInserted) {
      photoPickerRef.current?.reloadPicker()
    } else if (isAstChange) {
      setChanged(true)
    }
    if (changed) {
      debouncedStore(newValue, itemName)
    }
  }
  const insertImage = (id: string) => {
    const imageData = new DataTransfer()
    imageData.setData("id", id)
    editor.insertData(imageData)
  }
  const clearValue = () => {
    setMarkDown(false)
    Editor.withoutNormalizing(editor, () => {
      Transforms.delete(editor, { at: Editor.range(editor, [0], []) })
      Transforms.insertNodes(editor, content ?? blankValue, { at: [1] })
      Transforms.delete(editor, { at: [0] })
    })
    setChanged(false)
    setTitle(initialTitle)
    debouncedStore.cancel()
    localClear(itemName, isNew)
  }

  const switchMode = () => {
    setMarkDown(!isMarkDown)
    let converted: CustomElement[]
    if (isMarkDown) {
      converted = MdValueToSlate(value) as CustomElement[]
    } else {
      converted = [{ type: "md", children: [{ text: SlateToMd(value) }] }]
    }
    Editor.withoutNormalizing(editor, () => {
      Transforms.delete(editor, { at: Editor.range(editor, [0], []) })
      Transforms.insertNodes(editor, converted, { at: [1] })
      Transforms.delete(editor, { at: [0] })
    })
    Editor.normalize(editor, { force: true })
    // history not valid anymore
    editor.history.undos = []
    editor.history.redos = []
  }

  return (
    <div className="flex flex-col gap-lg w-full">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={onSlateChange}
      >
        <div className="flex flex-col gap-lg mx-md md:mx-0">
          <EditorFields
            isNew={isNew}
            newTitle={newTitle}
            setTitle={setTitle}
          />
          <PhotoPicker
            ref={photoPickerRef}
            insertImage={insertImage}
          />
          <EditorTools
            ref={editorToolsRef}
            editor={editor}
            markdownSetter={{ isMarkDown, switchMode }}
          />
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          decorate={isMarkDown ? decorate : undefined}
          className="text"
          onKeyDown={(event) => {
            if (event.key === "Enter" && isMarkDown) {
              editor.insertSoftBreak()
              event.preventDefault()
            }
          }}
        />
        <EditorManaging
          className="mx-md md:mx-0"
          title={title}
          itemName={itemName}
          isNew={isNew}
          newTitle={newTitle}
          value={value}
          changedSetter={{ changed, setChanged }}
          clearValue={clearValue}
        />
      </Slate>
    </div>
  )
}

export default SlateEditor
