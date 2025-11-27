"use server"

import PostsPanel from "./page.tsx"
import { Post, resolve } from "../../gqty/index.ts"

export type PostsLoaderData = {
  title: string
  author: string | undefined
}[]

const selectPost = (post: Post) => ({
  title: post.title,
  author: post.author ?? undefined,
})

export default async function () {
  const posts = await resolve(
    ({ query: { posts } }) => (posts ?? []).map(selectPost),
  )
  return (
    <>
      <meta name="description" content="posts list" />
      <PostsPanel posts={posts} />
    </>
  )
}
