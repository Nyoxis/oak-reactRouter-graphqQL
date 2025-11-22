"use server"

import SignUpWidget from "./signUpWidget.tsx"

// deno-lint-ignore require-await
export const SignUpPage = async () => {
  return (
    <div className="inset-0 absolute flex items-center justify-center pointer-events-none">
      <SignUpWidget className="pointer-events-auto" />
    </div>
  )
}

export default SignUpPage
