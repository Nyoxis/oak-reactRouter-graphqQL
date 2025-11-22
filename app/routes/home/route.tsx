"use server"

import Home from "./page.tsx"

// deno-lint-ignore require-await
export default async function () {
  return (
    <>
      <meta name="description" content="home page" />
      <Home />
    </>
  )
}
