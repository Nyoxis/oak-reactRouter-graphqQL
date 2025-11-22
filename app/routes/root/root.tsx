import { Links, Outlet, ScrollRestoration } from "react-router"
import "./styles.css"

export { ErrorBoundary } from "./error_boundary.tsx"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>OAK REACTROUTER GRAPHQL DEMO</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 user-scalable=no"
        />
        <Links />
      </head>
      <body className="min-h-screen">
        {children}
        <ScrollRestoration />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
