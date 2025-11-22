"use server"

import { NavLink } from "react-router"

// deno-lint-ignore require-await
const Logo = async ({ className }: { className?: string }) => {
  return (
    <NavLink to="/" className={`flex ${className}`}>
      <span className="text-balance w-30 grow">
        OAK REACTROUTER GRAPHQL DEMO
      </span>
    </NavLink>
  )
}

export default Logo
