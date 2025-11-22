"use server"

import PostsPanel from "./page.tsx"
import { Post, resolve } from "../../../gqty/index.ts"

export type PostsLoaderData = {
  title: string
  author: string | undefined
}[]

const selectPost = (post: Post) => ({
  title: post.title,
  author: post.author.username ?? undefined,
})

// deno-lint-ignore require-await
export async function fetchPosts() {
  return resolve(
    ({ query: { posts } }) => (posts ?? []).map(selectPost),
  )
}

export default async function () {
  const posts = await fetchPosts()
  return (
    <>
      <meta name="description" content="posts manage admin panel" />
      <PostsPanel loadedData={posts} />
    </>
  )
}
