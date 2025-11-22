import SchemaBuilder from "@pothos/core"
import DrizzlePlugin from "@pothos/plugin-drizzle"
import ScopeAuthPlugin from "@pothos/plugin-scope-auth"
import RelayPlugin from "@pothos/plugin-relay"
import { DateResolver } from "graphql-scalars"
import {
  FileUpload,
  GraphQLUpload,
} from "../../../graphql-upload-deno/src/index.ts"

import { db, drizzle_schema } from "../drizzle/index.ts"
import { authScopes } from "./sessions.ts"
import type { GqlContext } from "./index.ts"
import { Descendant } from "slate"

interface PothosTypes {
  Context: GqlContext
  Scalars: {
    SlateJSON: {
      Input: Descendant[]
      Output: Descendant[]
    }
    Date: {
      Input: Date
      Output: Date
    }
    Upload: {
      Input: Promise<FileUpload>
      Output: Promise<FileUpload>
    }
  }
  DrizzleSchema: typeof drizzle_schema
  AuthScopes: {
    employee: boolean
  }
}

try {
  // checking connection
  await db.select().from(drizzle_schema.users).limit(1)
  console.log("postgres connected")
} catch (e) {
  console.log("Failed to connect to postgres: ", e)
  Deno.exit(1)
}

const builder = new SchemaBuilder<PothosTypes>({
  plugins: [DrizzlePlugin, ScopeAuthPlugin, RelayPlugin],
  drizzle: {
    client: db,
    schema: drizzle_schema,
  },
  scopeAuth: {
    authScopes,
  },
})

builder.addScalarType("Date", DateResolver)
builder.addScalarType("Upload", GraphQLUpload)

builder.queryType({})
builder.mutationType({})

export { builder as default }
