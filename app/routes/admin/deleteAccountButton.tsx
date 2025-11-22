"use client"

import { useEffect, useState } from "react"
import { resolve } from "../../gqty/index.ts"
import { useNavigate } from "react-router/internal/react-server-client"

const DeleteAccoutButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  const [isMounted, setMounted] = useState(false)
  const [errorMessage, setError] = useState<string | null>(null)
  useEffect(() => {
    setMounted(true)
  }, [])

  const logOutHandler = () => {
    resolve(
      ({ mutation }) => mutation.deleteAccount,
    )
      .catch((error) => {
        setError(error.message)
      })
      .then((result) => {
        if (result) {
          navigate("/", { replace: false })
        }
      })
  }
  return (
    <>
      <button
        className={className}
        type="button"
        name="delete account"
        disabled={!isMounted}
        onClick={logOutHandler}
        suppressHydrationWarning
      >
        Delete Account
      </button>
      <p className="text-red-600">
        {errorMessage ? errorMessage : ""}
      </p>
    </>
  )
}

export default DeleteAccoutButton
