import { Application } from "@oak/oak"
import { oakCors } from "cors"
import { serve } from "@oak/oak/serve"
import graphqlRouter from "./api/graphql/index.ts"
import routeStaticFilesFrom from "./utils/routeStaticFilesFrom.ts"
import rscRequestHandler from "./dist/rsc/index.js"

const PORT = Number(Deno.env.get("VITE_BACKEND_PORT") ?? 8000)
const APP = new Application()
const SITE_PORT = Number(Deno.env.get("FRONTEND_PORT") ?? 5173)
const CORS_ORIGINS = Deno.env.get("CORS_ORIGINS")?.split(",") ??
  [`http://127.0.0.1:${SITE_PORT}`, `http://localhost:${SITE_PORT}`]

APP.use(oakCors({
  origin: CORS_ORIGINS,
  credentials: true,
}))

APP.use(
  graphqlRouter.routes(),
  graphqlRouter.allowedMethods(),
)

APP.use(routeStaticFilesFrom([
  `${Deno.cwd()}/dist/client`,
  `${Deno.cwd()}/public`,
]))

APP.use(serve(rscRequestHandler))

APP.addEventListener("listen", ({ secure, hostname, port }) => {
  if (hostname === "0.0.0.0") hostname = "127.0.0.1"

  const protocol = secure ? "https" : "http"
  const url = `${protocol}://${hostname}:${port}`

  console.log("☁  Started on " + url)
})

await APP.listen({ port: PORT })
