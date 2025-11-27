"use server"

import { NavLink } from "react-router"
import { Descendant } from "slate"
import { ContentRenderer } from "../../../../../utils/editorRenderer/blockRenderers.tsx"
import EditorLoader from "../../../../components/editor/editorLoader.tsx"

// deno-lint-ignore require-await
const PostPanel = async (
  { title, content }: { title: string; content?: Descendant[] },
) => {
  return (
    <div className="flex flex-col gap-lg">
      <NavLink to="../" className="mx-xl w-fit">&lt; Posts</NavLink>
      <EditorLoader title={title} content={content} />
      {content &&
        (
          <div className="mx-md md:mx-0">
            <h3>Stored content:</h3>
            <div>
              <ContentRenderer nodes={content} />
            </div>
          </div>
        )}
    </div>
  )
}

export default PostPanel
