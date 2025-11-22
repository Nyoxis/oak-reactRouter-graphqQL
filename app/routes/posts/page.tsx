"use server"

import { NavLink } from "react-router"
import { PostsLoaderData } from "./route.tsx"

// deno-lint-ignore require-await
const PostsPanel = async ({ posts }: { posts: PostsLoaderData }) => {
  return (
    <div className="flex flex-col gap-lg mx-xl">
      <NavLink to="../" className="w-fit">&lt; Home</NavLink>
      <h2>Posts:</h2>
      {posts.length
        ? (
          <div className="w-fit flex flex-col gap-lg">
            {posts.map((post) => (
              <div key={post.title} className="tr flex gap-lg">
                <div className="grow">
                  <NavLink to={post.title}>{post.title}</NavLink>
                </div>
                <div>{post.author}</div>
              </div>
            ))}
          </div>
        )
        : <>no posts</>}
    </div>
  )
}

export default PostsPanel
