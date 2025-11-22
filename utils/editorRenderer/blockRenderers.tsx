import React, { ReactElement } from "react"
import { RenderElementProps, RenderLeafProps } from "slate-react"
import { BaseElement, Element, Node, Text } from "slate"
import { ImageRenderElement } from "./imageRenderer.tsx"
import {
  CustomElement,
  HeadingElement,
} from "../editorConstants/customEditor.ts"
import { ImageElement } from "../editorConstants/withImages.ts"
import { MdElement } from "../editorConstants/mdEditor.ts"

export type renderElementOptionalAttributes =
  & Omit<RenderElementProps, "attributes" | "element">
  & { attributes?: RenderElementProps["attributes"] }

type CustomRenderElementProps =
  & { element: CustomElement | ImageElement | BaseElement | MdElement }
  & renderElementOptionalAttributes

export type HeadingRenderElementProps =
  & { element: HeadingElement }
  & renderElementOptionalAttributes

type MdRenderElementProps =
  & { element: MdElement }
  & renderElementOptionalAttributes

export interface CustomRenderLeafProps
  extends Omit<RenderLeafProps, "attributes"> {
  attributes?: RenderLeafProps["attributes"]
  isSoftBreakAllowed?: boolean
}

const CodeElement: (props: CustomRenderElementProps) => ReactElement = (
  props,
) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const ParagraphElement: (props: CustomRenderElementProps) => ReactElement = (
  props,
) => {
  return (
    <p {...props.attributes}>
      {props.children}
    </p>
  )
}

const DefaultElement: (props: CustomRenderElementProps) => ReactElement = (
  props,
) => {
  return (
    <div {...props.attributes}>
      {props.children}
    </div>
  )
}

const MdElementRender: (props: MdRenderElementProps) => ReactElement = (
  props,
) => {
  return (
    <div {...props.attributes}>
      {props.children}
    </div>
  )
}

const HeadingElementRender: (props: HeadingRenderElementProps) => ReactElement =
  (props) => {
    switch (props.element.depth) {
      case 1:
        return (
          <h1 {...props.attributes}>
            {props.children}
          </h1>
        )
      case 2:
        return (
          <h2 {...props.attributes}>
            {props.children}
          </h2>
        )
      default:
        return (
          <h3 {...props.attributes}>
            {props.children}
          </h3>
        )
    }
  }

const LeafRenderer: (props: CustomRenderLeafProps) => ReactElement = (
  { attributes, children, leaf, isSoftBreakAllowed },
) => {
  const classes = [ // all types from decorate are leafs
    ("bold" in leaf && leaf.bold) || ("strong" in leaf && leaf.strong)
      ? "font-bold"
      : "",
    ("italic" in leaf && leaf.italic) || ("emphasis" in leaf && leaf.emphasis)
      ? "italic"
      : "",
    ("underlined" in leaf && leaf.underlined) ? "underline" : "",
    ("title 1" in leaf && leaf["title 1"]) ? `inline-block h1` : "",
    ("title 2" in leaf && leaf["title 2"]) ? `inline-block h2` : "",
    ("title 3" in leaf && leaf["title 3"]) ? `inline-block h3` : "",
    ("list" in leaf && leaf.list) ? "pl-[10px] text-[20px] leading-[10px]" : "",
    ("hr" in leaf && leaf.hr)
      ? "block text-center border-b-2 border-gray-300"
      : "",
    ("blockquote" in leaf && leaf.blockquote)
      ? "inline-block border-l-2 border-gray-300 pl-[10px] text-gray-400 italic"
      : "",
    ("code" in leaf && leaf.code) ? "font-mono bg-gray-200 p-[3px]" : "",
  ]
    .filter(Boolean)
    .join(" ")

  if (isSoftBreakAllowed && typeof children === "string") {
    const lines = children.split("\n")
    return (
      <span
        {...attributes}
        className={classes}
      >
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    )
  }

  return (
    <span
      {...attributes}
      className={classes}
    >
      {children}
    </span>
  )
}

const ElementRenderer: (props: CustomRenderElementProps) => ReactElement = (
  props,
) => {
  if ("type" in props.element) {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />
      case "image":
        if (props.element.type === "image") props.element
        return (
          <ImageRenderElement
            {...{ ...props, ...{ element: props.element } }}
          />
        )
      case "paragraph":
        return <ParagraphElement {...props} />
      case "heading":
        return (
          <HeadingElementRender
            {...{ ...props, ...{ element: props.element } }}
          />
        )
      case "md":
        return (
          <MdElementRender {...{ ...props, ...{ element: props.element } }} />
        )
      default:
        return <DefaultElement {...props} />
    }
  } else {
    return <DefaultElement {...props} />
  }
}

export interface RenderNodeProps {
  nodes: Node[] | Node
  isSoftBreakAllowed?: boolean
}

const ContentRenderer: (props: RenderNodeProps) => ReactElement = (props) => {
  if (Array.isArray(props.nodes)) {
    return (
      <>
        {props.nodes.map((node, index) => (
          <ContentRenderer
            key={index}
            nodes={node}
            isSoftBreakAllowed={props.isSoftBreakAllowed}
          />
        ))}
      </>
    )
  }
  if (Text.isText(props.nodes)) {
    return (
      <LeafRenderer
        leaf={props.nodes}
        text={props.nodes}
        isSoftBreakAllowed={props.isSoftBreakAllowed}
      >
        {props.nodes.text}
      </LeafRenderer>
    )
  }
  if (Element.isElement(props.nodes)) {
    return (
      <ElementRenderer element={props.nodes}>
        <ContentRenderer
          nodes={props.nodes.children}
          isSoftBreakAllowed={"type" in props.nodes &&
            props.nodes.type === "paragraph"}
        />
      </ElementRenderer>
    )
  }
  throw new Error("unknown node type")
}

export { ContentRenderer, ElementRenderer, LeafRenderer }
