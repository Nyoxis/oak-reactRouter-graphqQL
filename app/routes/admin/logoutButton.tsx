"use client"

import { useNavigate } from "react-router"
import { resolve } from "../../gqty/index.ts"
import { useEffect, useState } from "react"

const logoutButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const logOutHandler = () => {
    resolve(
      ({ mutation }) => mutation.logout,
    )
      .then((result) => {
        if (result) {
          navigate("/admin/login", { replace: true })
        }
      })
  }
  return (
    <button
      className={className}
      type="button"
      name="log out"
      disabled={!isMounted}
      onClick={logOutHandler}
      suppressHydrationWarning
    >
      Log out
    </button>
  )
}

export default logoutButton
