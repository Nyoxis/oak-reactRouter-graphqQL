import builder from "./pothos_builder.ts"
import type { GqlContext } from "./index.ts"
import { createSession } from "./sessions.ts"
import { db } from "../drizzle/index.ts"
import { users } from "../drizzle/schema.ts"
import { eq } from "drizzle-orm"

builder.queryField("session", (t) =>
  t.string({
    authScopes: { employee: true },
    nullable: false,
    resolve: (_root, _args, context: GqlContext) => {
      const username = context.state.session?.get("username")
      if (typeof username === "string") {
        return username
      } else {
        throw new Error("Unauthorized")
      }
    },
  }))

builder.mutationField("signup", (t) =>
  t.string({
    args: {
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: (_parent, args) => {
      if (args.username.length === 0 || args.password.length === 0) {
        throw new Error("Empty values are not allowed")
      }
      return db
        .insert(users)
        .values(args)
        .returning()
        .then((result) => result[0].username)
    },
  }))

builder.mutationField("deleteAccount", (t) =>
  t.string({
    authScopes: { employee: true },
    resolve: async (_parent, _args, ctx) => {
      if (!ctx.state.session) {
        throw new Error("Unauthorized")
      }
      const username = ctx.state.session?.get("username") as string
      await ctx.state.session?.deleteSession()
      return db
        .delete(users)
        .where(eq(users.username, username))
        .returning()
        .then((result) => result[0].username)
    },
  }))

builder.mutationField("login", (t) =>
  t.boolean({
    args: {
      username: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (_parent, { username, password }, ctx) => {
      if (!username || !password) return false
      const user = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.username, username),
      })
      if (!user) return false
      if (password === user.password) {
        ctx.state.session = await createSession(ctx.cookies)
        ctx.state.session?.set("username", username)
        ctx.state.session?.set("failed-login-attempts", null)
        ctx.state.session?.flash("message", "Login successful")
        return true
      } else {
        return false
      }
    },
  }))

builder.mutationField("logout", (t) =>
  t.boolean({
    authScopes: { employee: true },
    resolve: async (_parent, _args, ctx) => {
      if (ctx.state.session) {
        await ctx.state.session?.deleteSession()
        return true
      } else {
        return false
      }
    },
  }))
