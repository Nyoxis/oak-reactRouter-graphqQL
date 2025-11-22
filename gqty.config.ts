export default {
  react: true,
  scalarTypes: {
    Date: "Date",
    SlateJSON: "Descendant[]",
    Upload: "File",
  },
  preImport:
    "import { Descendant } from 'slate'; import { Upload } from 'graphql-upload-deno'",
  introspection: {
    endpoint: `${
      Deno.env.get("VITE_GRAPHQL_URL") ??
        `http://127.0.0.1:${
          Number(Deno.env.get("VITE_BACKEND_PORT") ?? 8000)
        }/graphql`
    }`,
    headers: {},
  },
  destination: "./app/gqty/index.ts",
  subscriptions: false,
  javascriptOutput: false,
}
