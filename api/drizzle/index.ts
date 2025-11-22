import { drizzle } from "drizzle-orm/node-postgres"
import * as relations from "../drizzle/relations.ts"
import * as schema from "../drizzle/schema.ts"
import pg from "pg"

const drizzle_schema = { ...schema, ...relations }

const { Pool } = pg
// Instantiate Drizzle client with pg driver and schema.
const db = drizzle({
  client: new Pool({
    connectionString: Deno.env.get("DATABASE_URL"),
  }),
  schema: drizzle_schema,
})

export { db, drizzle_schema }
