"use server"

import { Outlet } from "react-router"
import Header from "../../components/header.tsx"
import UserWidget from "./userWidget.tsx"
import { redirect } from "react-router"
import { Extensions, resolve } from "../../gqty/index.ts"
import { cookieContext } from "../../entry.rsc.tsx"
import { LoaderFunctionArgs, RouterContextProvider } from "react-router"
import { GraphQLError } from "graphql"

interface AdminLoaderData {
  user?: string
}

export async function loader(
  { context }: LoaderFunctionArgs<RouterContextProvider>,
): Promise<AdminLoaderData> {
  const cookie = context.get(cookieContext) || ""
  const user = await resolve(
    ({ query }) => query.session,
    {
      extensions: { Cookie: cookie } as Extensions,
    },
  )
    .catch((error: GraphQLError) => {
      if (error.message.includes("Not authorized")) {
        throw redirect("/admin/login")
      }
      return undefined
    })
  return { user }
}

// deno-lint-ignore require-await
export default async function panel_layout(
  { loaderData }: { loaderData: AdminLoaderData },
) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <Header>
        <div className="flex justify-between grow-2">
          <h1>
            Admin Panel
          </h1>
          <UserWidget className="" userData={loaderData.user} />
        </div>
      </Header>
      <main className="w-full md:w-3xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
