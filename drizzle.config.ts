import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./api/drizzle",
  schema: "./api/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: Deno.env.get("DATABASE_URL")!,
  },
})
