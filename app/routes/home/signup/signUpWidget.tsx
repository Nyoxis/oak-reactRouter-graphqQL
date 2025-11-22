"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import type { GraphQLError } from "graphql"
import { resolve } from "../../../gqty/index.ts"

type LoginData = {
  username: string
  password: string
}

type ResultData = {
  success: boolean
  error: string | null
}

const SignUpWidget = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  const usernameInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    setLoginData({
      ...loginData,
      ...(usernameInputRef.current?.value
        ? { username: usernameInputRef.current?.value }
        : {}),
      ...(passwordInputRef.current?.value
        ? { password: passwordInputRef.current?.value }
        : {}),
    })
  }, [])
  const [resultData, setResultData] = useState<ResultData>({
    success: false,
    error: null,
  })
  const [loginData, setLoginData] = useState<LoginData>(() => ({
    username: "",
    password: "",
  }))
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSignUp = () => (resolve(
    ({ mutation }) =>
      mutation.signup({
        username: loginData.username,
        password: loginData.password,
      }),
  )
    .catch((e: GraphQLError) => {
      setResultData({ success: false, error: e.message })
    })
    .then((result) => {
      if (result) {
        setResultData({ success: true, error: null })
        navigate("/admin/posts", { replace: true })
      } else {
        setResultData({
          success: false,
          error: "sign up failed",
        })
      }
    }))

  return (
    <>
      <form
        className={`flex flex-col gap-lg w-60 ${className}`}
        onSubmit={(event) => {
          event.preventDefault()
          handleSignUp()
          return false
        }}
      >
        <div className="flex flex-col gap-lg">
          <input
            type="text"
            name="username"
            placeholder="username"
            id=""
            ref={usernameInputRef}
            value={loginData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            id=""
            ref={passwordInputRef}
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={handleSignUp}
          disabled={resultData.success || !isMounted}
          className={`[--button:var(--color-orange-400)] text-paper ${
            resultData.success ? "[--button-bg:var(--color-green-600)]" : ""
          }`}
          suppressHydrationWarning
        >
          {resultData.success ? "Success" : "Sign Up"}
        </button>
        <p className="h-32 overflow-hidden">
          {resultData.error ? resultData.error : ""}
        </p>
      </form>
    </>
  )
}

export default SignUpWidget
