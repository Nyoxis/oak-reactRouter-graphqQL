"use server"

import { PostParams } from "../../../routes.ts"
import { ErrorResponse, NavLink } from "react-router"
import { ErrorBoundary } from "../../root/root.tsx"
import { fromFileUrl } from "@std/path"

export default async function ({ params }: { params: PostParams }) {
  const title = params.post
  let content: string
  try {
    if (!title) throw new Error("no title")
    const filePath = fromFileUrl(
      new URL(`${Deno.cwd()}/posts/${title}.html`, import.meta.url),
    )
    content = await Deno.readTextFile(filePath)
  } catch {
    const error = {
      status: 404,
      statusText: "Not Fofund",
      data: null,
      internal: true,
    } as ErrorResponse
    return (
      <>
        <ErrorBoundary
          error={error}
        />
      </>
    )
  }

  return (
    <>
      <meta name="description" content={title} />
      <div className="flex flex-col gap-lg">
        <NavLink to="../" className="mx-xl w-fit">&lt; Posts</NavLink>
        <h1 className="mx-md md:mx-0">{title}</h1>
        <div
          className="mx-md md:mx-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  )
}
