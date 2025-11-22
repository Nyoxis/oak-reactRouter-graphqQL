import { ReactNode } from "react"

// deno-lint-ignore require-await
const Heading = async (
  { className, children }: { className?: string; children?: ReactNode },
) => {
  return (
    <div
      className={`${className}
                  w-75%
                  left-[calc(25%+400px)]
                  top-[60px]
                  self-end
                  mb-[0.9rem]`}
    >
      {children}
    </div>
  )
}

export default Heading
