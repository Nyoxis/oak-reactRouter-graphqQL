import { FC } from "react"

const editorFallback: FC = () => {
  return (
    <div className="flex flex-col gap-lg w-full">
      <div className="flex flex-col gap-lg mx-md md:mx-0">
        <div>
          <input
            disabled
            suppressHydrationWarning
          />
        </div>
        <div className="flex">
          <input
            type="file"
            id="files"
            className="hidden"
            disabled
            suppressHydrationWarning
          />
          <label
            aria-disabled
            suppressHydrationWarning
            className="fallback button h-20 w-30 flex items-center"
            htmlFor="files"
          >
            &nbsp;
          </label>
        </div>
        <div className="flex gap-sm">
          <select
            className="fallback min-w-17"
            disabled
            suppressHydrationWarning
          >
          </select>
          <button
            className="fallback min-w-12"
            type="button"
            disabled
            suppressHydrationWarning
          >
            &nbsp;
          </button>
          <button
            className="fallback min-w-12"
            type="button"
            disabled
            suppressHydrationWarning
          >
            &nbsp;
          </button>
          <label>
            <input
              type="checkbox"
              className="fallback"
              disabled
              suppressHydrationWarning
            />
            &nbsp;
          </label>
        </div>
      </div>
      <div>
        <input
          className="fallback w-full min-h-40"
          disabled
          suppressHydrationWarning
        />
      </div>
      <div className="flex gap-sm mx-md md:mx-0">
        <button
          className="fallback min-w-15"
          type="button"
          disabled
          suppressHydrationWarning
        >
          &nbsp;
        </button>
        <button
          className="fallback min-w-15"
          type="button"
          disabled
          suppressHydrationWarning
        >
          &nbsp;
        </button>
      </div>
    </div>
  )
}

export default editorFallback
