import { FC, useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import { useNavigate } from "react-router"
import { Descendant, Element } from "slate"
import { resolve } from "../../gqty/index.ts"
import { GraphQLError } from "graphql"
import { localClear } from "./index.tsx"
import { isValueMd } from "../../../utils/editorConstants/mdEditor.ts"
import { MdValueToSlate } from "../../../utils/editorMdConverters.ts"

type ManagingProps = {
  className?: string
  title: string
  itemName: string
  isNew: boolean
  newTitle: string
  value: Descendant[]
  changedSetter: {
    changed: boolean
    setChanged: React.Dispatch<React.SetStateAction<boolean>>
  }
  clearValue: () => void
}
const checkTitle = (
  debounced: string,
  setAvailable: (set: boolean) => void,
) => {
  resolve(({ query }) => {
    const post = query.post({ title: debounced })
    return post ? post.title : null
  })
    .then((result) => {
      if (result !== null || debounced.toLowerCase() === "new") {
        setAvailable(false)
      } else {
        setAvailable(true)
      }
    })
}
const EditorManaging: FC<ManagingProps> = (props) => {
  const {
    className,
    title,
    itemName,
    isNew,
    newTitle,
    value,
    changedSetter,
    clearValue,
  } = props
  const { changed, setChanged } = changedSetter
  const navigate = useNavigate()

  const [errorMessage, setError] = useState<string | null>(null)
  const [titleAvailable, setTitleAvailable] = useState(false)
  const debouncedCheckTitle = useDebounceCallback(checkTitle, 500)
  useEffect(() => {
    debouncedCheckTitle(newTitle, setTitleAvailable)
  }, [newTitle])

  const updateOrCreatePost = () =>
    resolve(
      ({ mutation }) => {
        let post
        let valueUpload = value
        if (isValueMd(value as Element[])) {
          valueUpload = MdValueToSlate(value)
        }
        if (isNew) {
          post = mutation.insertPost({
            input: { title: newTitle, content: valueUpload },
          })
        } else {
          post = mutation.UpdatePost({
            title,
            input: { title: newTitle, content: valueUpload },
          })
        }
        return post?.title
      },
    )
      .catch((e: GraphQLError) => {
        setError(e.message)
      })
      .then((result) => {
        if (result) {
          setChanged(false)
          setTitleAvailable(false)
          setError(null)
          localClear(itemName, isNew)
          navigate(`../${encodeURIComponent(result)}`, { replace: true })
        }
      })

  const deletePost = () =>
    resolve(
      ({ mutation }) => {
        const post = mutation.deletePost({ title })
        return post?.title
      },
    )
      .catch((e: GraphQLError) => {
        setError(e.message)
      })
      .then((result) => {
        setError(null)
        result && navigate(-1)
      })

  return (
    <div className={`flex gap-sm ${className}`}>
      <button
        type="button"
        onMouseDown={updateOrCreatePost}
        disabled={!titleAvailable && !changed}
        suppressHydrationWarning
      >
        Save
      </button>
      {!isNew &&
        (
          <button
            type="button"
            onMouseDown={() => {
              deletePost()
              localStorage.removeItem(itemName)
            }}
          >
            Delete
          </button>
        )}
      {changed && (
        <button
          type="button"
          onMouseDown={() => {
            clearValue()
          }}
        >
          {isNew ? "Clear" : "Cancel"}
        </button>
      )}
      <p className="text-red-600">
        {errorMessage ? errorMessage : ""}
      </p>
    </div>
  )
}

export default EditorManaging
