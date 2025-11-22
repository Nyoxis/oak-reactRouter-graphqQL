import {
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { Descendant } from "slate"

export const users = pgTable("Users", {
  username: text().primaryKey().notNull(),
  password: text().notNull(),
})

export const posts = pgTable("Posts", {
  id: serial().primaryKey().notNull(),
  author: text().notNull(),
  title: text().unique().notNull(),
  dateCreated: timestamp({ mode: "date" }).defaultNow().notNull(),
  content: jsonb().$type<Descendant[]>().notNull(),
})

export const images = pgTable("Images", {
  id: text().primaryKey().notNull(),
  uploader: text().notNull(),
  uploadDate: timestamp({ mode: "date" }).defaultNow().notNull(),
  description: text(),
  thumbnail: text().notNull(),
})

export const imageInPost = pgTable(
  "image_in_post",
  {
    post: serial("post")
      .notNull()
      .references(() => posts.id),
    image: text("image")
      .notNull()
      .references(() => images.id),
  },
  (t) => [
    primaryKey({ columns: [t.post, t.image] }),
  ],
)
