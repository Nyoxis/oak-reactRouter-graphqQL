"use client"

import { ReactElement } from "react"
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react"
import { BaseEditor, Path, Transforms } from "slate"
import {
  ImageContainerClass,
  ImageElementNonEditable,
  ImageRendered,
  ImageRenderElementProps,
} from "./imageRenderer.tsx"

const ImageElementMaybeEditable: (
  props: ImageRenderElementProps,
) => ReactElement = (props) => {
  let editor: BaseEditor & ReactEditor | undefined
  let path: Path
  if (props.attributes) {
    editor = useSlateStatic() as BaseEditor & ReactEditor
    if (editor) {
      path = ReactEditor.findPath(editor, props.element)
    }
  }
  if (!editor) return <ImageElementNonEditable {...props} />
  const selected = useSelected()
  const focused = useFocused()

  return (
    <div {...props.attributes}>
      {props.children}
      <div
        contentEditable={false}
        className={`${ImageContainerClass} max-w-fit grid ${
          (selected && focused) ? "shadow-lg" : ""
        }`}
      >
        <ImageRendered {...props} />
        {selected &&
          (
            <button
              type="button"
              className="absolute self-center justify-self-center"
              onMouseDown={() => Transforms.removeNodes(editor, { at: path })}
            >
              delete
            </button>
          )}
      </div>
    </div>
  )
}

export { ImageElementMaybeEditable }
