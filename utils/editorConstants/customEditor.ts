import { BaseEditor, Editor, Element, Node, Text, Transforms } from "slate"
import {
  BlockType,
  InlineType,
  isBlockType,
  isNodeType,
  isWrapping,
  MdEditor,
  MdElement,
} from "./mdEditor.ts"
import { ReactEditor } from "slate-react"

export type HeadingElement = {
  type: "heading"
  depth: number
  children: CustomText[]
}
export type CustomElement =
  | {
    type: "paragraph" | "code"
    children: CustomText[]
  }
  | HeadingElement
  | MdElement
export type CustomText = { text: string } & { [type in InlineType]?: true }

export type EmptyText = {
  text: ""
}

// Define your custom editor type
type CustomEditor = {
  isMarkActive: (type: InlineType) => boolean
  isBlockTypeActive: (type: BlockType) => boolean
  toggleMark: (type: InlineType) => void
  toggleBlock: (type: BlockType) => void
  getBlockType: () => BlockType | null
  isMarkdownMode: boolean
}

const withCustomEditor = <T extends BaseEditor & ReactEditor & MdEditor>(
  mdEditor: T,
): T & CustomEditor => {
  const editor = mdEditor as T & CustomEditor
  const { normalizeNode } = mdEditor

  // Check if bold mark is active
  editor.isMarkActive = (type) => {
    if (!editor.selection) return false
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && (n as CustomText)[type] === true,
      universal: true,
    })
    return !!match
  }

  // Check if code block is active
  editor.isBlockTypeActive = (type) => {
    if (!editor.selection) return false
    const isType = type.startsWith("heading") ? "heading" : type
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && "type" in n && n.type === isType,
    })
    return !!match
  }

  // Toggle bold mark
  editor.toggleMark = (type) => {
    if (editor.isMarkdownMode) {
      editor.toggleDecorator(type)
    } else {
      const isActive = editor.isMarkActive(type)
      Transforms.setNodes<CustomElement | CustomText | Node>(
        editor,
        { [type]: isActive ? undefined : true },
        { match: (n) => Text.isText(n), split: true },
      )
    }
  }
  editor.insertSoftBreak = () => {
    const { selection } = editor
    if (!selection) return

    // Insert literal newline instead of splitting
    Transforms.insertText(editor, "\n")
  }

  // Toggle block type
  editor.toggleBlock = (typeNode) => {
    if (editor.isMarkdownMode) {
      editor.toggleDecorator(typeNode)
      return
    }
    const isActive = editor.isBlockTypeActive(typeNode)
    const { type: type_mdast, depth }: {
      type: string
      depth: number | undefined
    } = typeNode.startsWith("heading")
      ? { type: "heading", depth: Number.parseInt(typeNode.split(" ")[1]) }
      : { type: typeNode, depth: undefined }
    const type = isActive ? "paragraph" : type_mdast

    if (isWrapping(typeNode)) {
      // Get all blocks in the selection
      const blocks = Array.from(
        Editor.nodes(editor, {
          match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
        }),
      )

      if (blocks.length === 0) return

      const [[firstNode, firstPath], ...rest] = blocks
      const range = Editor.range(
        editor,
        firstPath,
        rest.length !== 0 ? rest[rest.length - 1][1] : undefined,
      )
      // Merge text from the rest of the blocks into the first
      const mergedText = [Node.string(firstNode)]
        .concat(rest.map(([node]) => Node.string(node)))
        .join("\n")
      Transforms.insertNodes(
        editor,
        { type, depth, children: [{ text: mergedText }] } as CustomElement,
        { at: range },
      )
      Transforms.removeNodes(
        editor,
        { at: firstPath },
      )
    } else {
      Transforms.setNodes<CustomElement | CustomText | Node>(
        editor,
        { type, depth } as CustomElement,
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
      )
    }
  }
  // Toggle code block
  editor.getBlockType = () => {
    if (editor.isMarkdownMode) {
      return editor.getBlockDecorator()
    } else {
      if (!editor.selection) return null
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n),
      })
      let type = "type" in match[0] && match[0].type as string
      if (type === "heading" && "depth" in match[0]) {
        type = [type, match[0].depth].join(" ")
      }
      if (type && isNodeType(type) && isBlockType(type)) {
        return type
      }
      return null
    }
  }

  editor.normalizeNode = (entry) => {
    const [node, _path] = entry
    // If the root editor children are empty, insert default paragraph
    if (Editor.isEditor(node) && node.children.length === 0) {
      Transforms.insertNodes(mdEditor, {
        type: "paragraph",
        children: [{ text: "" }],
      } as CustomElement, { at: [0] })
      return // stop further normalization for this step
    }

    // Call the original Slate normalization for all other cases
    normalizeNode(entry)
  }

  return editor
}

export { withCustomEditor }
export type { CustomEditor }
