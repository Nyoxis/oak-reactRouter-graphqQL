import { Dispatch, FC, SetStateAction } from "react"
import { draftTitleKey } from "./index.tsx"

type ContainerProps = {
  isNew: boolean
  newTitle: string
  setTitle: Dispatch<SetStateAction<string>>
}

function storeTitle(title: string, isNew: boolean) {
  if (isNew) {
    localStorage.setItem(draftTitleKey, title)
  }
}

const EditorFields: FC<ContainerProps> = (props) => {
  const { isNew, newTitle, setTitle } = props
  return (
    <div>
      <input
        type="text"
        id="title"
        name="title"
        value={newTitle}
        onChange={(e) => {
          setTitle(e.target.value)
          storeTitle(e.target.value, isNew)
        }}
      />
    </div>
  )
}

export default EditorFields
