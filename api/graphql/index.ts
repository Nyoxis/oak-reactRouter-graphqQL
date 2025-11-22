import { Cookies, Request as OakRequest, Router } from "@oak/oak"
import { graphqlHttpWithUploadOak } from "graphql-upload-deno"

import builder from "./pothos_builder.ts"
import { AppState, storeState } from "./sessions.ts"

import "./session_resolvers.ts"
import "./upload_resolvers.ts"
import "./posts_resolvers.ts"

type GqlContext = {
  request: OakRequest
  cookies: Cookies
  state: AppState
}

const db_schema = builder.toSchema()

const graphqlRouter = new Router<AppState>().all(
  "/graphql",
  async (ctx, next) => {
    await graphqlHttpWithUploadOak<GqlContext>({}, {
      schema: db_schema,
      graphiql: true,
      context: () => ({
        request: ctx.request,
        cookies: ctx.cookies,
        state: ctx.state,
      }),
    })(ctx, next)
    storeState(ctx.state.session ?? null, ctx.cookies)
  },
)

export type { GqlContext }
export default graphqlRouter
