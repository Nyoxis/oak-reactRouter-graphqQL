import { unified } from "unified"
import markdown from "remark-parse"
import stringify from "remark-stringify"
import { remarkToSlate, slateToRemark } from "remark-slate-transformer"
import { Node as SlateNode } from "slate"
import { Root } from "mdast"
import { ImageElement } from "./editorConstants/withImages.ts"

export function MdToSlate(text: string): SlateNode[] {
  const processor = unified().use(markdown).use(remarkToSlate)
  const result = processor.processSync(text).result
  return result
}

export function SlateToMd(value: SlateNode[]): string {
  const processor = unified().use(stringify)

  const ast = processor.runSync(slateToRemark(value, {
    overrides: {
      image: ((node, _next) => {
        const imageNode = node as ImageElement
        return {
          type: "paragraph",
          children: [
            {
              type: "image",
              url: imageNode.url,
              alt: imageNode.alt ?? "",
            },
          ],
        }
      }),
    },
  }))
  return processor.stringify(ast as Root)
}

export function MdValueToSlate(value: SlateNode[]): SlateNode[] {
  const stringValue = value.map((n) => SlateNode.string(n)).join("\n")
  return MdToSlate(stringValue)
}
