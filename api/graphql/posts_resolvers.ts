import builder from "./pothos_builder.ts"

import { db } from "../drizzle/index.ts"
import { posts } from "../drizzle/schema.ts"
import { and, eq, ne } from "drizzle-orm"
import { renderToStaticMarkup } from "react-dom/server"
import React from "react"
import { ContentRenderer } from "../../utils/editorRenderer/blockRenderers.tsx"
import { Descendant } from "slate"
import { rehype } from "rehype"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import validateSlateNodes from "../../utils/validateSlateNodes.ts"
import { fromFileUrl, dirname } from "@std/path"
import { ensureDir } from "@std/fs"

builder.scalarType("SlateJSON", {
  serialize: (value) => value,
  parseValue: (value) => {
    if (
      Array.isArray(value) &&
      value.every((item) => item !== null && typeof item === "object")
    ) {
      const validationError = validateSlateNodes(value)
      if (validationError) {
        throw new Error(
          `${validationError.message} at [${validationError.path}]`,
        )
      }
      return value
    }
    throw new Error("Invalid value for JSONObject")
  },
})

const PostObjType = builder.drizzleObject("posts", {
  name: "Post",
  // Custom fields because exposing doesn't work on returning modified rows
  fields: (t) => ({
    id: t.field({
      type: "ID",
      resolve: (post) => post.id,
      nullable: false,
    }),
    title: t.field({
      type: "String",
      resolve: (post) => post.title,
      nullable: false,
    }),
    author: t.field({
      type: "String",
      resolve: (post) => post.author,
      nullable: false,
    }),
    dateCreated: t.field({
      type: "Date",
      resolve: (post) => post.dateCreated,
      nullable: false,
    }),
    content: t.field({
      type: "SlateJSON",
      resolve: (post) => post.content,
      nullable: false,
    }),
  }),
})

builder.queryField("posts", (t) =>
  t.drizzleField({
    type: ["posts"],
    resolve: (query, _root, _args) => db.query.posts.findMany(query()),
  }))

builder.queryField("post", (t) =>
  t.drizzleField({
    args: {
      title: t.arg.string({ required: true }),
    },
    type: "posts",
    resolve: (query, _root, args) =>
      db.query.posts.findFirst(
        query({
          where: eq(posts.title, args.title),
        }),
      ),
  }))

const PostInsertInput = builder.inputType("PostInsertInput", {
  fields: (t) => ({
    title: t.string({ required: true }),
    content: t.field({ type: "SlateJSON", required: true }),
  }),
})

function postFilePath(title: string): string {
  return fromFileUrl(
    new URL(`${Deno.cwd()}/posts/${title}.html`, import.meta.url),
  )
}

const allowClassSchema: Parameters<typeof rehypeSanitize>[0] = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // Allow className on all elements
    "*": [
      ...(defaultSchema.attributes?.["*"] || []),
      // Allow Tailwind class tokens using regex
      ["className", /^[-_a-zA-Z0-9%:\[\]\. ]+$/],
    ],
  },
}

async function writeRenderedContent(title: string, content: Descendant[]) {
  const jsxElement = React.createElement(ContentRenderer, { nodes: content })
  const htmlString = renderToStaticMarkup(jsxElement)
  const cleanHtml = await rehype()
    .data("settings", { fragment: true })
    .use(rehypeSanitize, allowClassSchema)
    .process(htmlString)
  const filePath = postFilePath(title)
  await ensureDir(dirname(filePath))
  await Deno.writeTextFile(filePath, cleanHtml.toString())
}

async function postExists(title: string): Promise<boolean> {
  return (
    0 < await db
      .$count(
        posts,
        eq(posts.title, title),
      )
  )
}
async function contentDiffers(
  title: string,
  content: Descendant[],
): Promise<boolean> {
  return (
    0 < await db
      .$count(
        posts,
        and(
          eq(posts.title, title),
          ne(posts.content, content),
        ),
      )
  )
}

builder.mutationField("insertPost", (t) =>
  t.field({
    authScopes: { employee: true },
    args: {
      input: t.arg({
        type: PostInsertInput,
        required: true,
      }),
    },
    type: PostObjType,
    resolve: (_root, args, ctx) => {
      if (args.input.title.length === 0) {
        throw new Error("title can not be empty")
      }
      if (args.input.title.toLowerCase() === "new") {
        throw new Error("'new' title is reserved")
      }
      writeRenderedContent(args.input.title, args.input.content)
      const username = ctx.state.session?.get("username") as string
      const post = { ...args.input, author: username }
      return db
        .insert(posts)
        .values(post)
        .returning()
        .then((result) => result[0])
    },
  }))

builder.mutationField("UpdatePost", (t) =>
  t.field({
    authScopes: { employee: true },
    args: {
      title: t.arg.string({ required: true }),
      input: t.arg({
        type: PostInsertInput,
        required: true,
      }),
    },
    type: PostObjType,
    resolve: async (_root, args, ctx) => {
      if (args.input.title.length === 0) {
        throw new Error("title can not be empty")
      }
      if (args.input.title === "new") throw new Error("'new' title is reserved")
      if (!await postExists(args.title)) {
        throw new Error(`post with title: "${args.title}" not found to update`)
      }

      if (await contentDiffers(args.title, args.input.content)) {
        await writeRenderedContent(args.title, args.input.content)
      }
      if (args.title !== args.input.title) {
        try {
          await Deno.rename(
            postFilePath(args.title),
            postFilePath(args.input.title),
          )
        } catch {
          writeRenderedContent(args.input.title, args.input.content)
        }
      }

      const username = ctx.state.session?.get("username") as string
      const post = { ...args.input, author: username }
      return db
        .update(posts)
        .set(post)
        .where(eq(posts.title, args.title))
        .returning()
        .then((result) => {
          if (result.length === 0) {
            throw new Error(`couldn't update post with title: "${args.title}"`)
          }
          return result[0]
        })
    },
  }))

builder.mutationField("deletePost", (t) =>
  t.field({
    authScopes: { employee: true },
    args: {
      title: t.arg.string({ required: true }),
    },
    type: PostObjType,
    resolve: async (_root, args) => {
      const a = await db
        .delete(posts)
        .where(eq(posts.title, args.title))
        .returning()
        .then((result) => result[0])
      const filePath = `posts/${a.title}.html`
      try {
        await Deno.remove(filePath)
      } catch (_) {
        // doesn't matter if couldn't delete page
      }
      return a
    },
  }))
