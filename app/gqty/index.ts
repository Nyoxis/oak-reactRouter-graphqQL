/**
 * GQty: You can safely modify this file based on your needs.
 */

import {
  Cache,
  createClient,
  defaultResponseHandler,
  type QueryFetcher,
  QueryPayload,
} from "gqty"

//import { createLogger } from '@gqty/logger'
import { createReactClient } from "@gqty/react"

import {
  type GeneratedSchema,
  generatedSchema,
  scalarsEnumsHash,
} from "./schema.generated.ts"

import extractFiles from "extract-files/extractFiles.mjs"
import isExtractableFile from "extract-files/isExtractableFile.mjs"

export type Extensions = {
  Cookie?: string
}

const apiPath = import.meta.env.VITE_GRAPHQL_URL ??
  `http://${globalThis.location?.hostname ?? "127.0.0.1"}:${
    Number(import.meta.env.VITE_BACKEND_PORT ?? 8000)
  }/graphql`

const queryFetcher: QueryFetcher = async function (
  { query, variables, operationName, extensions }: QueryPayload<Extensions>,
  fetchOptions,
) {
  const request: RequestInit = {
    method: "POST",
    // TODO: same-origin
    credentials: "include",
    headers: {
      "Cookie": extensions?.Cookie ?? "",
    },

    mode: "cors",
    ...fetchOptions,
  }

  const extracted = extractFiles(
    { query, variables },
    isExtractableFile,
  )
  if (extracted.files.size > 0) {
    const form = new FormData()
    form.append("operations", JSON.stringify(extracted.clone))
    const map: Record<number, string[]> = {}
    let i = 0
    extracted.files.forEach((paths) => {
      map[++i] = paths
    })
    form.append("map", JSON.stringify(map))
    i = 0
    extracted.files.forEach((_paths, file) => {
      form.append(++i + "", file as File)
    })
    const response = await fetch(apiPath, {
      ...request,
      body: form,
    })

    return await defaultResponseHandler(response)
  }
  // Modify "http://localhost:8000/graphql" if needed
  const response = await fetch(apiPath, {
    ...request,
    headers: {
      ...request.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
      operationName,
    }),
  })

  return await defaultResponseHandler(response)
}

const cache = new Cache(
  undefined,
  /**
   * Default option is immediate cache expiry but keep it for 5 minutes,
   * allowing soft refetches in background.
   */
  {
    maxAge: 0,
    staleWhileRevalidate: 5 * 60 * 1000,
    normalization: true,
  },
)

export const client = createClient<GeneratedSchema>({
  schema: generatedSchema,
  scalars: scalarsEnumsHash,
  cache,
  fetchOptions: {
    fetcher: queryFetcher,
  },
})

// Core functions
export const { resolve, subscribe, schema } = client

export const {
  graphql,
  useQuery,
  useTransactionQuery,
  useLazyQuery,
  useRefetch,
  useMutation,
  useMetaState,
  prepareReactRender,
  useHydrateCache,
  prepareQuery,
  useSubscription,
  usePaginatedQuery,
} = createReactClient<GeneratedSchema>(client, {
  defaults: {
    // Set this flag as "true" if your usage involves React Suspense
    // Keep in mind that you can overwrite it in a per-hook basis
    suspense: typeof window !== "undefined",

    // Set this flag based on your needs
    staleWhileRevalidate: false,
  },
})
/*
createLogger(client, {
  stringifyJSON: false,
  showSelections: true,
  showCache: true,
}).start();
*/
export * from "./schema.generated.ts"
