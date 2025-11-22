/* eslint react/prop-types: 0 */
import { ReactElement } from "react"
import { renderElementOptionalAttributes } from "./blockRenderers.tsx"
import { ImageElementMaybeEditable } from "./imageRendererMaybeEditable.tsx"
import { ImageElement } from "../editorConstants/withImages.ts"

export type ImageRenderElementProps =
  & { element: ImageElement }
  & renderElementOptionalAttributes

const ImageRenderElement: (props: ImageRenderElementProps) => ReactElement = (
  props,
) => {
  if (typeof window !== "undefined") {
    return <ImageElementMaybeEditable {...props} />
  }

  return <ImageElementNonEditable {...props} />
}

export const ImageRendered = (props: ImageRenderElementProps) => (
  <img
    src={"url" in props.element ? props.element.url : ""}
    alt={props.element.alt ?? undefined}
  />
)
export const ImageContainerClass = "w-[75%] mx-auto my-[1rem]"
const ImageElementNonEditable: (
  props: ImageRenderElementProps,
) => ReactElement = (props) => {
  return (
    <div {...props.attributes}>
      {props.children}
      <div
        contentEditable={false}
        className={ImageContainerClass}
      >
        <ImageRendered {...props} />
      </div>
    </div>
  )
}

export { ImageElementNonEditable, ImageRenderElement }
