"use server"

import { PostParams } from "../../../../routes.ts"

import { LoaderFunctionArgs, RouterContextProvider } from "react-router"
import { Maybe, Post, resolve } from "../../../../gqty/index.ts"
import { Descendant } from "slate"
import { redirect } from "react-router"
import PostPanel from "./page.tsx"

type PostLoaderData = {
  title: string
  content: Descendant[]
} | null

const selectPost = (post: Maybe<Post>) => (post
  ? {
    title: post.title,
    content: post.content,
  }
  : undefined)

export async function loader(
  { params }: LoaderFunctionArgs<RouterContextProvider>,
): Promise<PostLoaderData | undefined> {
  const title = params.post
  if (title && title !== "new") {
    const post = await resolve(
      ({ query: { post } }) => selectPost(post({ title })),
    )
    if (post && post.title) {
      return post
    }
  }
  if (title && title === "new") {
    return null
  }
  throw redirect("../new")
}

// deno-lint-ignore require-await
export default async function (
  { loaderData, params }: { loaderData: PostLoaderData; params: PostParams },
) {
  let title = params.post
  let content
  if (loaderData) {
    ;({ title, content } = loaderData)
  }

  return (
    <>
      <meta name="description" content={`post editing page, title: ${title}`} />
      <PostPanel title={title} content={content} />
    </>
  )
}
