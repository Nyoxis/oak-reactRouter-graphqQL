"use client"

import { useState } from "react"
import { NavLink } from "react-router"
import { fetchPosts, PostsLoaderData } from "./route.tsx"
import PostDeleteButton from "./postDeleteButton.tsx"

const PostsPanel = ({ loadedData }: { loadedData: PostsLoaderData }) => {
  const [posts, setPosts] = useState(loadedData)
  const revalidate = () => {
    fetchPosts()
      .then((result) => {
        setPosts(result)
      })
  }

  const [errorMessage, setError] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-lg mx-xl">
      <NavLink to="../" className="w-fit">&lt; Admin</NavLink>
      <h2>Posts:</h2>
      <div className="w-fit flex flex-col gap-lg">
        {posts.map((post) => (
          <div key={post.title} className="tr flex gap-lg items-center">
            <div className="grow">
              <NavLink to={post.title}>{post.title}</NavLink>
            </div>
            <div>{post.author}</div>
            <PostDeleteButton
              title={post.title}
              setError={setError}
              revalidate={revalidate}
            />
          </div>
        ))}
      </div>
      <NavLink to="new" type="button" className="w-fit">new</NavLink>
      <p className="text-red-600">
        {errorMessage ? errorMessage : ""}
      </p>
    </div>
  )
}

export default PostsPanel
