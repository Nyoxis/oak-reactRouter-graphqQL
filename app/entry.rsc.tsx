import {
  createTemporaryReferenceSet,
  decodeAction,
  decodeFormState,
  decodeReply,
  loadServerAction,
  renderToReadableStream,
} from "@vitejs/plugin-rsc/rsc"
import {
  createContext,
  RouterContextProvider,
  unstable_matchRSCServerRequest as matchRSCServerRequest,
} from "react-router"
import routes from "./routes.ts"

export const cookieContext = createContext<string | null>(null)

export async function fetchServer(request: Request) {
  const contextProvider = new RouterContextProvider()
  const cookie = request.headers.get("Cookie")
  contextProvider.set(cookieContext, cookie)
  return await matchRSCServerRequest({
    createTemporaryReferenceSet,
    decodeAction,
    decodeFormState,
    decodeReply,
    loadServerAction,
    request,
    requestContext: contextProvider,
    routes,
    generateResponse(match, options) {
      return new Response(renderToReadableStream(match.payload, options), {
        status: match.statusCode,
        headers: match.headers,
      })
    },
  })
}

export default async function handler(request: Request) {
  const ssr = await import.meta.viteRsc.loadModule<
    typeof import("./entry.ssr.tsx")
  >("ssr", "index")
  return ssr.generateHTML(request, fetchServer)
}

if (import.meta.hot) {
  import.meta.hot.accept()
}
