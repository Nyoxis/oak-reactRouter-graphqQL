import { useState } from "react"
import { resolve } from "../../gqty/index.ts"

export interface ImagePicker {
  id: string
  thumbnail: string
  description: string | undefined
}

interface PhotoPickerPhotoProps {
  image: ImagePicker
  reload: () => void
  setError: (error: string) => void
  insertImage: (id: string) => void
  className?: string
}

const PhotoPickerPhoto = (
  { image, reload, setError, insertImage, className }: PhotoPickerPhotoProps,
) => {
  const [selected, setSelected] = useState(false)
  const deleteImage = () =>
    resolve(({ mutation }) => {
      const result = mutation.deleteImage({ id: image.id })
      return result?.id
    })
      .catch((e) => {
        setError(e.message)
      })
      .then(() => {
        reload()
      })

  return (
    <div
      className={`flex justify-center ${
        selected ? "shadow-lg" : ""
      } ${className}`}
      tabIndex={0}
      onFocus={() => setSelected(true)}
      onBlur={() => setSelected(false)}
    >
      <img
        className="object-cover w-full"
        src={image.thumbnail}
        alt={image.description}
        onDragStart={(dragEvent) => {
          dragEvent.dataTransfer.setData("id", image.id)
          image.description &&
            dragEvent.dataTransfer.setData("alt", image.description)
        }}
      />
      {selected &&
        (
          <>
            <button
              type="button"
              className="absolute self-end text-xs leading-[0.5] -translate-y-1/6"
              onMouseDown={deleteImage}
            >
              delete
            </button>
            <button
              type="button"
              className="absolute translate-y-1/6"
              onMouseDown={() => insertImage(image.id)}
            >
              insert
            </button>
          </>
        )}
    </div>
  )
}

export default PhotoPickerPhoto
