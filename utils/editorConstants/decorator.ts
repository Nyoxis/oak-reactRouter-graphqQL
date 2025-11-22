import { NodeEntry, Point, Text } from "slate"
import Prism from "prismjs"
import "prismjs/components/prism-markdown"
type PrismToken = InstanceType<typeof Prism.Token>

export const getTokenLength = (token: string | PrismToken): number => {
  if (typeof token === "string") {
    return token.length
  } else if (typeof token.content === "string") {
    return token.content.length
  } else {
    return (token.content as PrismToken[]).reduce(
      (l, t) => l + getTokenLength(t),
      0,
    )
  }
}

export type MarkRange = {
  anchor: Point
  focus: Point
  [type: string]: true | Point | number | undefined
  depth?: number
}

export const iterRanges = <T>(
  [node, path]: NodeEntry,
  cb: (range: MarkRange) => T | undefined,
): T | undefined => {
  if (!Text.isText(node)) {
    return
  }

  const tokens = Prism.tokenize(
    node.text,
    (Prism.languages as Record<string, any>)["markdown"],
  )
  let start = 0

  for (const token of tokens) {
    const length = getTokenLength(token)
    const end = start + length
    if (typeof token !== "string") {
      const depth = (
          "content" in token &&
          token.content.length > 0 &&
          typeof token.content[0] === "object" &&
          "type" in token.content[0] &&
          token.content[0].type === "punctuation"
        )
        ? token.content[0].length
        : undefined
      const type = token.type === "title" ? `title ${depth}` : token.type
      const result = cb({
        [type]: true,
        anchor: { path, offset: start },
        focus: { path, offset: end },
      })
      if (result) return result
    }

    start = end
  }
}

export default (entry: NodeEntry) => {
  const ranges: MarkRange[] = []

  iterRanges(entry, (range) => {
    ranges.push(range)
  })

  return ranges
}
