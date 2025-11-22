"use server"

import LoginWidget from "./loginWidget.tsx"

// deno-lint-ignore require-await
export const LoginPage = async () => {
  return (
    <div className="inset-0 absolute flex items-center justify-center pointer-events-none">
      <LoginWidget className="pointer-events-auto" />
    </div>
  )
}

export default LoginPage
