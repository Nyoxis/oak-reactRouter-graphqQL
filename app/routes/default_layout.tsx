"use server"

import { Outlet } from "react-router"
import Header from "../components/header.tsx"

// deno-lint-ignore require-await
export default async function Layout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <Header className="w-screen" />
      <main className="w-full md:w-3xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
