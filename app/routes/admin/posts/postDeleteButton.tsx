"use client"

import { GraphQLError } from "graphql"
import { resolve } from "../../../gqty/index.ts"
import { useEffect, useState } from "react"

type PostDeleteButtonArgs = {
  className?: string
  title: string
  setError: (message: string | null) => void
  revalidate: () => void
}

const postDeleteButton = (
  { className, title, setError, revalidate }: PostDeleteButtonArgs,
) => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const deletePost = () =>
    resolve(
      ({ mutation }) => {
        const post = mutation.deletePost({ title })
        return post?.title
      },
    )
      .catch((e: GraphQLError) => {
        setError(e.message)
      })
      .then(() => {
        setError(null)
        revalidate()
      })

  return (
    <button
      className={className}
      type="button"
      disabled={!isMounted}
      onMouseDown={deletePost}
      suppressHydrationWarning
    >
      delete
    </button>
  )
}

export default postDeleteButton
