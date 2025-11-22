import { RedisStore, Session } from "deliberate-sessions"
import { connect } from "redis"
import { GqlContext } from "./index.ts"

// Create a redis connection
let redis
try {
  redis = await connect({
    hostname: Deno.env.get("REDIS_HOSTNAME") ?? (() => {
      throw new Error("unable to get REDIS_HOSTNAME env key")
    })(),
    port: Deno.env.get("REDIS_PORT"),
    maxRetryCount: 1,
  })
  console.log("redis connected")
} catch (e) {
  console.log("Failed to connect to Redis: ", e)
  Deno.exit(1)
}

const store = new RedisStore(redis)

const { fetchSession, storeState, createSession } = Session
  .initSessionsHandlers(store)

const authScopes = async (ctx: GqlContext) => {
  ctx.state.session = await fetchSession(ctx.cookies) ?? undefined
  return {
    employee: typeof ctx.state.session?.get("username") === "string",
  }
}
export type AppState = {
  session?: Session
}

export { authScopes, createSession, storeState }
