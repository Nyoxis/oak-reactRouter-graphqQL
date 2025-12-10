"use server"

import { NavLink } from "react-router"

// deno-lint-ignore require-await
const Home = async () => {
  return (
    <div className="flex flex-col gap-lg mx-xl">
      <h2>Pages:</h2>
      <ol>
        <li>
          <NavLink to="posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="admin">Admin</NavLink>
        </li>
        <li>
          <NavLink to="signup">Sign Up</NavLink>
        </li>
      </ol>
    </div>
  )
}

export default Home
