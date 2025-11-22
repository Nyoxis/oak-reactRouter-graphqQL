"use server"

import Logo from "./logo.tsx"

// deno-lint-ignore require-await
const Header = async (
  { children, className }: { children?: React.ReactNode; className?: string },
) => {
  return (
    <header className={`flex justify-center ${className}`}>
      <div className="flex flex-row h-32 items-center justify-between mx-xl w-full max-w-[80rem]">
        <Logo className="min-w-fit grow" />
        {children}
      </div>
    </header>
  )
}

export default Header
