import { Editor, Element, Range, Text, Transforms } from "slate"
import decorator, { iterRanges, MarkRange } from "./decorator.ts"
import { Point } from "slate"
import { BaseEditor, BaseText } from "slate"

export type InlineType = "strong" | "bold" | "emphasis" | "italic" | "strike"
const HeadingVariants = ["heading", "title"] as const
const headingLevels = [1, 2, 3] as const
export type HeadingType =
  `${typeof HeadingVariants[number]} ${typeof headingLevels[number]}`
export type BlockType = HeadingType | "code"
export type NodeType = InlineType | BlockType

type DecoratorMarks = { open: string; close: string }

type InlineConfig = {
  kind: "inline"
  marks: DecoratorMarks[]
  blankAround?: DecoratorMarks
}

type BlockConfig = {
  kind: "block"
  // Fenced block style: open/close lines
  marks: DecoratorMarks[]
  blankAround?: DecoratorMarks
  isWrapping?: boolean
}
// accomodate difference between prism and mdast
const HEADING_ALIASES = Object.fromEntries(
  HeadingVariants.flatMap((variant) =>
    headingLevels.map((level) => [
      `${variant} ${level}`,
      `title ${level}`,
    ])
  ),
) as Record<HeadingType, HeadingType>
export const ALIASES: Record<NodeType, NodeType> = {
  ...HEADING_ALIASES,
  strong: "bold",
  bold: "bold",
  emphasis: "italic",
  italic: "italic",
  strike: "strike",
  code: "code",
}
const HEADING_ALIASES_REVERSED = Object.fromEntries(
  HeadingVariants.flatMap((variant) =>
    headingLevels.map((level) => [
      `${variant} ${level}`,
      `heading ${level}`,
    ])
  ),
) as Record<HeadingType, HeadingType>
export const ALIASES_REVERSED: Record<NodeType, NodeType> = {
  ...HEADING_ALIASES_REVERSED,
  strong: "strong",
  bold: "strong",
  emphasis: "emphasis",
  italic: "emphasis",
  strike: "strike",
  code: "code",
}

type DecoratorConfig = InlineConfig | BlockConfig
const headingDecorator: (depth: number) => BlockConfig = (depth) => ({
  kind: "block",
  marks: [{ open: "#".repeat(depth), close: "" }],
  blankAround: { open: " ", close: "" },
})
const boldDecorator: InlineConfig = {
  kind: "inline",
  marks: [
    { open: "**", close: "**" },
    { open: "__", close: "__" },
  ],
}
const italicDecorator: InlineConfig = {
  kind: "inline",
  marks: [
    { open: "*", close: "*" },
    { open: "_", close: "_" },
  ],
}
const HEADING_DECORATORS = Object.fromEntries(
  HeadingVariants.flatMap((variant) =>
    headingLevels.map((level) => [
      `${variant} ${level}`,
      headingDecorator(level),
    ])
  ),
) as Record<HeadingType, DecoratorConfig>
export const DECORATORS: Record<NodeType, DecoratorConfig> = {
  ...HEADING_DECORATORS,
  strong: boldDecorator,
  bold: boldDecorator,
  emphasis: italicDecorator,
  italic: italicDecorator,
  strike: { kind: "inline", marks: [{ open: "~~", close: "~~" }] },

  code: {
    kind: "block",
    marks: [{ open: "```", close: "```" }],
    blankAround: { open: "\n", close: "\n" },
    isWrapping: true,
  },
}
export const NODE_TYPES = Object.keys(DECORATORS) as string[]
export function isNodeType(str: string): str is NodeType {
  return NODE_TYPES.includes(str as NodeType)
}
export function isBlockType(type: NodeType): type is BlockType {
  const nodeType = getDecoratorConfig(type)
  return (nodeType?.kind === "block")
}
export function isWrapping(type: BlockType): boolean {
  const cfg = getDecoratorConfig(type)
  return cfg?.kind === "block" && (cfg.isWrapping ?? false)
}
export type MdEditor = {
  toggleDecorator: (type: NodeType) => void
  tryRemoveDecorator: (type: NodeType) => true | null
  addInlineDecorator: (cfg: InlineConfig) => void
  getExpandedDecoratorRange: (type: NodeType) => Range | null
  addBlockDecorator: (cfg: BlockConfig) => void
  getBlockDecorator: () => BlockType | null
  getSelectedLineRange: () => {
    range: Range
    text: string
    startLine: number
    endLine: number
  } | null
}

export type MdElement = {
  type: "md"
  children: BaseText[]
}

export function isValueMd(value: Element[]): boolean {
  return value.length > 0 && typeof value[0] === "object" &&
    "type" in value[0] && value[0].type === "md"
}

function getDecoratorConfig(type: NodeType): DecoratorConfig | null {
  return DECORATORS[type] ?? null
}

const withMdSyntax = <T extends BaseEditor>(baseEditor: T): T & MdEditor => {
  const editor = baseEditor as T & MdEditor

  editor.toggleDecorator = (type) => {
    const prismType = ALIASES[type]
    if (editor.tryRemoveDecorator(prismType)) {
      // If already decorated, remove full decorator including open/close marks
      return
    }
    // Otherwise add decorator around current selection or insert markers
    const cfg = getDecoratorConfig(prismType)
    if (!cfg) return

    switch (cfg.kind) {
      case "inline":
        editor.addInlineDecorator(cfg)
        break
      case "block":
        editor.addBlockDecorator(cfg)
        break
    }
  }

  /**
   * Removes the decorator marks from around selection if present.
   */
  editor.tryRemoveDecorator = (type) => {
    const cfg = getDecoratorConfig(type)
    if (!cfg) return null
    const decoratorRange = editor.getExpandedDecoratorRange(type)
    if (!decoratorRange) return null

    const fullText = Editor.string(editor, decoratorRange)

    // Strip surrounding markers
    for (const mark of cfg.marks) {
      if (
        fullText.startsWith(mark.open) &&
        fullText.endsWith(mark.close) &&
        fullText.length > mark.open.length + mark.close.length
      ) {
        const innerText = fullText.slice(
          mark.open.length + (cfg.blankAround?.open.length ?? 0),
          fullText.length - mark.close.length -
            (cfg.blankAround?.close.length ?? 0),
        )
        // Replace full decorator range with inner text
        Transforms.insertText(editor, innerText, { at: decoratorRange })
        Transforms.collapse(editor, { edge: "end" })

        return true
      }
    }
    return null
  }
  /**
   * add decorator
   * wraps selection or inserts pair for empty selection.
   */
  editor.addInlineDecorator = (cfg) => {
    const { selection } = editor
    if (!selection) return
    const { anchor, focus } = selection
    const canonical = cfg.marks[0]
    if (Range.isCollapsed(selection)) {
      // Insert paired symbols and move cursor inside

      Transforms.insertText(editor, canonical.open + canonical.close)
      const offset = anchor.offset + canonical.open.length
      Transforms.select(editor, {
        anchor: { path: anchor.path, offset },
        focus: { path: anchor.path, offset },
      })
    } else {
      const text = Editor.string(editor, selection)
      Transforms.insertText(editor, canonical.open + text + canonical.close, {
        at: selection,
      })
      const newRange = {
        anchor,
        focus: {
          path: anchor.path,
          offset: focus.offset + canonical.open.length + canonical.close.length,
        },
      }
      // skip to the next tick after normalization
      setTimeout(() => {
        Transforms.select(editor, newRange)
      }, 0)
    }
  }
  /**
   * Given decorator markers, find the expanded range covering the decorated text or null
   */
  editor.getExpandedDecoratorRange = (type) => {
    const selection = editor.selection
    if (!selection) return null

    return iterRanges(Editor.node(editor, [0, 0]), (range) => {
      if (range[type] === true && Range.intersection(selection, range)) {
        return range
      }
    }) ?? null
  }
  /**
   * add block decorator
   * wraps selection or inserts pair for empty selection adding empty line breaks if needed.
   */
  editor.addBlockDecorator = (cfg: BlockConfig) => {
    const info = editor.getSelectedLineRange()
    if (!info) return

    const { range, text: innerText } = info

    const canonical = cfg.marks[0]
    const newText = [
      canonical.open,
      cfg.blankAround?.open ?? "",
      innerText,
      cfg.blankAround?.close ?? "",
      canonical.close,
      "\n",
    ].join("")

    // Replace full text with new
    Transforms.insertText(editor, newText, { at: range })

    // Calculate new selection offsets inside fenced block
    const innerStartOffset = range.anchor.offset + canonical.open.length + 1
    const innerEndOffset = range.focus.offset + canonical.open.length + 1
    setTimeout(() =>
      Transforms.select(editor, {
        anchor: { path: range.anchor.path, offset: innerStartOffset },
        focus: { path: range.focus.path, offset: innerEndOffset },
      }), 0)
  }
  /**
   * gets lines around selection
   */
  editor.getSelectedLineRange = () => {
    const { selection } = editor
    if (!selection) return null
    const entry = Editor.node(editor, [0, 0])
    if (!entry) return null
    const [node, path] = entry
    if (!Text.isText(node)) {
      return null
    }
    const text = node.text
    const startOff = Range.start(selection).offset
    const endOff = Range.end(selection).offset

    const { lineIndex: sLine, lineStartOffset: sOffset } = offsetToLineInfo(
      text,
      startOff,
    )
    const { lineIndex: eLine, lineEndOffset: eOffset } = offsetToLineInfo(
      text,
      endOff,
    )
    const range = {
      anchor: { path, offset: sOffset },
      focus: { path, offset: eOffset },
    }
    return {
      range,
      text: Editor.string(editor, range).trim(),
      startLine: Math.min(sLine, eLine),
      endLine: Math.max(sLine, eLine),
    }
  }
  editor.getBlockDecorator = () => {
    function getRangeMarks(range: MarkRange): NodeType[] {
      return Object.keys(range)
        .filter((k): k is NodeType => {
          return range[k] === true && NODE_TYPES.includes(k)
        })
    }
    function getBlockTypes(range: MarkRange): BlockType[] {
      return getRangeMarks(range).reduce((out: BlockType[], mark) => {
        if (isBlockType(mark)) {
          out.push(mark)
        }
        return out
      }, [])
    }
    function getRangelength(range: MarkRange): number {
      const [start, end] = Range.edges(range)
      if (Point.equals(start, end)) return 0

      if (start.path.join() === end.path.join()) {
        return end.offset - start.offset
      }
      return Infinity
    }
    const selection = editor.selection
    if (!selection) return null
    const ranges = decorator(Editor.node(editor, [0, 0]))
    const intersected = ranges.filter((range) =>
      !!Range.intersection(selection, range)
    )
    if (intersected.length === 0) return null
    const shortestRangeWithBlockMark = intersected.reduce((shortest, r) => {
      const blockMarks = getBlockTypes(r)
      if (!blockMarks) return shortest
      const len = getRangelength(r)
      const sLen = getRangelength(shortest)
      return len < sLen ? r : shortest
    })
    // filtered to be not null, assume there's only one block decorator
    const type = getBlockTypes(shortestRangeWithBlockMark)[0]
    return ALIASES_REVERSED[type] as BlockType
  }
  return editor
}

function offsetToLineInfo(text: string, offset: number) {
  const before = text.slice(0, offset)
  const lines = before.split("\n")
  const lineIndex = lines.length - 1
  const lineStartOffset = before.length - lines[lines.length - 1].length
  const firstLineBreakAfter = text.indexOf("\n", offset)
  const lineEndOffset = firstLineBreakAfter === -1
    ? text.length
    : firstLineBreakAfter + "\n".length
  return { lineIndex, lineStartOffset, lineEndOffset }
}

export { withMdSyntax }
