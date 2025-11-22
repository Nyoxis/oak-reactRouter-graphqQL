import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router"
export interface PostParams {
  post: string
}

export default [
  {
    id: "root",
    path: "",
    lazy: () => import("./routes/root/root.tsx"),
    children: [
      {
        id: "default-layout",
        path: "",
        lazy: () => import("./routes/default_layout.tsx"),
        children: [
          {
            id: "home",
            index: true,
            lazy: () => import("./routes/home/route.tsx"),
          },
          {
            // avoid admin layout
            id: "admin-login",
            path: "admin/login",
            lazy: () => import("./routes/admin/login/route.tsx"),
          },
          {
            id: "signup",
            path: "signup",
            lazy: () => import("./routes/home/signup/route.tsx"),
          },
        ],
      },
      {
        id: "blog",
        path: "posts",
        lazy: () => import("./routes/default_layout.tsx"),
        children: [
          {
            id: "posts",
            index: true,
            lazy: () => import("./routes/posts/route.tsx"),
          },
          {
            id: "post",
            path: ":post",
            lazy: () => import("./routes/posts/$post/route.tsx"),
          },
        ],
      },
      {
        id: "admin-panel-layout",
        path: "admin",
        lazy: () => import("./routes/admin/layout.tsx"),
        children: [
          {
            id: "admin",
            index: true,
            lazy: () => import("./routes/admin/route.tsx"),
          },
          {
            id: "admin-posts",
            path: "posts",
            children: [
              {
                id: "admin-posts-list",
                index: true,
                lazy: () => import("./routes/admin/posts/route.tsx"),
              },
              {
                id: "admin-post-detail",
                path: ":post",
                lazy: () => import("./routes/admin/posts/$post/route.tsx"),
              },
            ],
          },
        ],
      },
    ],
  },
] satisfies RSCRouteConfig
