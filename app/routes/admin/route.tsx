"use server"

import AdminPanel from "./page.tsx"

// deno-lint-ignore require-await
export default async function () {
  return (
    <>
      <meta name="description" content="admin page" />
      <AdminPanel />
    </>
  )
}
