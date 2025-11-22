"use client"

import { FC, lazy, Suspense, useEffect, useState } from "react"
import Fallback from "./fallback.tsx"
import { Descendant } from "slate"

const SlateEditor = lazy(() => import("./index.tsx"))

const editorLoader: FC<{ title?: string; content?: Descendant[] }> = (
  { title = "new", content },
) => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) return <Fallback />
  return (
    <Suspense fallback={<Fallback />}>
      <SlateEditor title={title} content={content} />
    </Suspense>
  )
}

export default editorLoader
