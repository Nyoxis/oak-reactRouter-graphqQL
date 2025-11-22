import { Element, Node, Text } from "slate"

interface ValidationError {
  path: number[]
  message: string
}

export default function validateSlateNodes(
  nodes: Node[],
  path: number[] = [],
): ValidationError | void {
  if (nodes.length === 0) {
    return { path: [], message: "Value does not contain Nodes" }
  }
  for (const [index, node] of nodes.entries()) {
    const currentPath = [...path, index]

    // Validate Element nodes
    if (Element.isElement(node)) {
      if (!node.children.length) {
        return { path: currentPath, message: "Element must have children" }
      }

      // Check text descendants using generator efficiently
      if (Node.texts(node).next().done) {
        return {
          path: currentPath,
          message: "Element must contain at least one text descendant",
        }
      }

      const descendantsError = validateSlateNodes(node.children, currentPath)
      if (descendantsError) {
        return descendantsError
      }

      continue
    }

    // Validate Text nodes
    if (Text.isText(node)) {
      if (node.text == null) {
        return {
          path: currentPath,
          message: "Text node must have defined text",
        }
      }

      continue
    }

    // Unknown node type
    return { path: currentPath, message: "Unknown node type" }
  }
}
