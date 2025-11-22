"use server"

import LogoutButton from "./logoutButton.tsx"

// deno-lint-ignore require-await
const UserWidget = async (
  { className, userData }: { className?: string; userData?: string },
) => {
  return (
    <div className={`flex gap-lg h-fit items-center ${className}`}>
      {userData}
      <LogoutButton />
    </div>
  )
}

export default UserWidget
