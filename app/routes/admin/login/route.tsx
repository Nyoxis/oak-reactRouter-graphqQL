"use server"

import { LoginPage } from "./page.tsx"
import { Extensions, resolve } from "../../../gqty/index.ts"
import { redirect } from "react-router"
import { LoaderFunctionArgs, RouterContextProvider } from "react-router"

export async function loader(
  { request }: LoaderFunctionArgs<RouterContextProvider>,
) {
  const cookie = request.headers.get("Cookie") || ""
  const result = await resolve(
    ({ query }) => query.session,
    {
      extensions: { Cookie: cookie } as Extensions,
    },
  )
    .catch(() => {})

  if (result) {
    throw redirect("/admin")
  }
}

// deno-lint-ignore require-await
export default async function () {
  return (
    <>
      <meta name="description" content="Login to admin panel" />
      <LoginPage />
    </>
  )
}
