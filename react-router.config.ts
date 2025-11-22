import type { Config } from "@react-router/dev/config"

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  // deno-lint-ignore require-await
  async prerender() {
    return ["/"]
  },
  ssr: true,
} satisfies Config
