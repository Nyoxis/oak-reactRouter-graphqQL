import builder from "./pothos_builder.ts"

import { fromFileUrl } from "@std/path"
import { createSHA256 } from "hash-wasm"
import { db } from "../drizzle/index.ts"
import { images, users } from "../drizzle/schema.ts"
import { eq } from "drizzle-orm"

const ImageObjType = builder.drizzleObject("images", {
  name: "image",
  // Custom fields because exposing doesn't work on returning modified rows
  fields: (t) => ({
    id: t.field({
      type: "ID",
      resolve: (image) => image.id,
      nullable: false,
    }),
    description: t.field({
      type: "String",
      resolve: (image) => image.description,
      nullable: true,
    }),
    uploader: t.field({
      type: "String",
      resolve: async (image) => {
        const uploader = await db.query.users.findFirst({
          where: eq(users.username, image.uploader),
        })
        if (uploader) {
          return uploader.username
        }
        throw new Error(
          "No author can be found for author relation in post type",
        )
      },
      nullable: false,
    }),
    uploadDate: t.field({
      type: "Date",
      resolve: (image) => image.uploadDate,
      nullable: false,
    }),
    thumbnail: t.field({
      type: "String",
      resolve: (image) => image.thumbnail,
      nullable: false,
    }),
  }),
})

builder.queryField("images", (t) =>
  t.drizzleField({
    type: ["images"],
    resolve: (query, _root, _args) => db.query.images.findMany(query()),
  }))

async function createHashingStream(): Promise<{
  transformStream: TransformStream<Uint8Array, Uint8Array>
  digest: Promise<string>
}> {
  const sha256 = await createSHA256()

  let resolveDigest: (value: string) => void
  let rejectDigest: (reason?: unknown) => void
  const digest = new Promise<string>((resolve, reject) => {
    resolveDigest = resolve
    rejectDigest = reject
  })
  const transformStream = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      try {
        sha256.update(chunk)
        controller.enqueue(chunk)
      } catch (err) {
        rejectDigest(err)
      }
    },
    flush(_) {
      resolveDigest(sha256.digest())
    },
  })
  return { transformStream, digest }
}

function imagePathFromId(id: string): string {
  return imagePathFromFilename(`${id}.jpg`)
}

function imagePathFromFilename(filename: string): string {
  return fromFileUrl(
    new URL(`${Deno.cwd()}/public/${filename}`, import.meta.url),
  )
}

builder.mutationField("uploadImage", (t) =>
  t.field({
    authScopes: { employee: true },
    args: {
      image: t.arg({
        type: "Upload",
        required: true,
      }),
      description: t.arg.string({ required: false }),
      thumbnail: t.arg.string({ required: true }),
    },
    type: ImageObjType,
    resolve: async (_root, args, ctx) => {
      try {
        const username = ctx.state.session?.get("username")
        if (typeof username !== "string") {
          throw new Error("Unauthorized")
        }
        const { content, filename, mimetype } = await args.image
        if (mimetype.startsWith("image")) {
          throw new Error("Not an image")
        }
        const tempPath = imagePathFromFilename(filename)
        const file = await Deno.open(tempPath, {
          create: true,
          write: true,
        })

        const { transformStream, digest } = await createHashingStream()
        await content
          .pipeThrough(transformStream)
          .pipeTo(file.writable)

        try {
          const hashSum = await digest
          const inserted = await db.insert(images).values({
            id: hashSum,
            uploader: username, // checked if exist
            description: args.description,
            thumbnail: args.thumbnail,
          })
            .onConflictDoNothing()
            .returning()

          if (inserted.length > 0) {
            const newPath = imagePathFromId(inserted[0].id)
            await Deno.rename(tempPath, newPath)
            return inserted[0]
          } else {
            await Deno.remove(tempPath)
            return await db
              .select()
              .from(images)
              .where(eq(images.id, hashSum))
              .then((rows) => rows[0])
          }
        } catch (error) {
          try {
            await Deno.remove(tempPath)
          } catch {
            // could be already removed
          }
          throw error
        }
      } catch (error) {
        const image = await args.image
        if (!image.content.locked) {
          image.content.cancel()
        }
        throw error
      }
    },
  }))

builder.mutationField("deleteImage", (t) =>
  t.field({
    authScopes: { employee: true },
    args: {
      id: t.arg.string({ required: true }),
    },
    type: ImageObjType,
    resolve: async (_root, args) => {
      const imageRow = await db.delete(images).where(eq(images.id, args.id))
        .returning().then((result) => result[0])
      try {
        await Deno.remove(imagePathFromId(imageRow.id))
      } catch {
        // no matter if does not exist
      }

      return imageRow
    },
  }))
