import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

import { uploadImages } from "../../../utils/editorConstants/withImages.ts"
import { client, useLazyQuery } from "../../gqty/index.ts"
import PhotoPickerPhoto from "./photoPickerPhoto.tsx"

export type PhotoPickerHandle = {
  reloadPicker: () => void
  setUploadError: (error: string) => void
}
interface PhotoPickerProps {
  insertImage: (id: string) => void
}
const PhotoPicker = forwardRef<PhotoPickerHandle, PhotoPickerProps>(
  (props, ref) => {
    const { insertImage } = props
    const [errorMessage, setError] = useState<string | null>(null)
    const [load, { data }] = useLazyQuery((query) => {
      setError(null)
      return query.images?.map((a) => ({
        id: a.id,
        thumbnail: a.thumbnail,
        description: a.description ?? undefined,
      }))
    })
    useImperativeHandle(ref, () => ({
      reloadPicker() {
        load()
      },
      setUploadError(error) {
        setError(error)
      },
    }))

    useEffect(() => {
      // Custom cache priority refetch
      // Editor can cause a lot of refetches
      if (!client.cache.get("query.images", { includeExpired: true })) load()
    }, [props])
    useEffect(() => {
      load()
    }, [])

    return (
      <div>
        <div className="flex gap-md flex-wrap">
          <div className="flex">
            <input
              type="file"
              id="files"
              className="hidden"
              onChange={(event) => {
                event.preventDefault()
                event.target.files &&
                  uploadImages(event.target.files)
              }}
            />
            <label
              className="button h-20 w-30 flex items-center"
              htmlFor="files"
            >
              Upload image
            </label>
          </div>

          {data?.map((image) => {
            if (!image.thumbnail) return
            return (
              <PhotoPickerPhoto
                key={image.id}
                image={image}
                reload={load}
                setError={setError}
                insertImage={insertImage}
                className="h-20 min-w-20 max-w-40 grow"
              />
            )
          })}
        </div>
        <p className="text-red-600 my-0">
          {errorMessage ? errorMessage : ""}
        </p>
      </div>
    )
  },
)

export default PhotoPicker
