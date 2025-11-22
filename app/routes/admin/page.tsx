"use server"

import { NavLink } from "react-router"
import DeleteAccoutButton from "./deleteAccountButton.tsx"

// deno-lint-ignore require-await
const AdminPanel = async () => {
  return (
    <div className="flex flex-col gap-lg mx-xl">
      <h2>Pages:</h2>
      <ol>
        <li>
          <NavLink to="posts">Posts</NavLink>
        </li>
      </ol>
      <DeleteAccoutButton className="w-fit [--button:var(--color-red-400)]" />
    </div>
  )
}

export default AdminPanel
