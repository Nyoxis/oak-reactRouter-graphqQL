import rsc from "@vitejs/plugin-rsc/plugin"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import deno from "@deno/vite-plugin"
import process from "node:process"

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    server: {
      port: Number(env.FRONTEND_PORT) || 5173,
      watch: {
        ignored: [
          "posts/**",
          "public/**",
        ],
      },
    },
    publicDir: command === "serve" ? "public" : false, // do not copy in dist
    plugins: [
      deno(),
      tailwindcss(),
      react(),
      rsc({
        entries: {
          client: "app/entry.browser.tsx",
          rsc: "app/entry.rsc.tsx",
          ssr: "app/entry.ssr.tsx",
        },
      }),
    ],
    ssr: {
      resolve: {
        conditions: ["module", "deno", "node", "development|production"],
        externalConditions: ["deno", "node"],
      },
    },
  }
})
