"use server"

import SignUp from "./page.tsx"

// deno-lint-ignore require-await
export default async function () {
  return (
    <>
      <meta name="description" content="sign up page" />
      <SignUp />
    </>
  )
}
