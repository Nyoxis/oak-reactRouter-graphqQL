import { forwardRef, useImperativeHandle, useState } from "react"
import type { CustomEditor } from "../../../utils/editorConstants/customEditor.ts"
import {
  BlockType,
  isBlockType,
  isNodeType,
} from "../../../utils/editorConstants/mdEditor.ts"

type ToolsProps = {
  editor: CustomEditor
  markdownSetter: { isMarkDown: boolean; switchMode: () => void }
}
export type EditorToolsHandle = {
  setSelectedBlockType: (type: BlockType | null) => void
}

const EditorTools = forwardRef<EditorToolsHandle, ToolsProps>((props, ref) => {
  const { editor, markdownSetter } = props
  const [blockType, setBlockType] = useState<BlockType | null>()
  useImperativeHandle(ref, () => ({
    setSelectedBlockType(type) {
      setBlockType(type)
    },
  }))
  const blockTypeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    blockType && editor.toggleBlock(blockType)
    if (
      event.target.value !== "text" && isNodeType(event.target.value) &&
      isBlockType(event.target.value)
    ) {
      editor.toggleBlock(event.target.value)
    }
    setBlockType(editor.getBlockType())
  }

  return (
    <div className="flex gap-sm">
      <select
        onChange={blockTypeHandle}
        value={blockType ?? "text"}
      >
        <option value="text">text</option>
        <option value="heading 1">h1</option>
        <option value="heading 2">h2</option>
        <option value="heading 3">h3</option>
        <option value="code">code</option>
      </select>
      <button
        type="button"
        onMouseDown={() => {
          editor.toggleMark("strong")
        }}
      >
        Bold
      </button>
      <button
        type="button"
        onMouseDown={() => {
          editor.toggleMark("emphasis")
        }}
      >
        Italic
      </button>
      <label>
        <input
          type="checkbox"
          checked={markdownSetter.isMarkDown}
          onChange={markdownSetter.switchMode}
        />
        MD
      </label>
    </div>
  )
})

export default EditorTools
