import { relations } from "drizzle-orm/relations"
import { imageInPost, images, posts, users } from "./schema.ts"

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.author],
    references: [users.username],
  }),
  images: many(imageInPost),
}))

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  images: many(images),
}))

export const imagesRelations = relations(images, ({ one, many }) => ({
  user: one(users, {
    fields: [images.uploader],
    references: [users.username],
  }),
  posts: many(imageInPost),
}))

export const imageInPostsRelations = relations(imageInPost, ({ one }) => ({
  image: one(images, {
    fields: [imageInPost.image],
    references: [images.id],
  }),
  posts: one(posts, {
    fields: [imageInPost.post],
    references: [posts.id],
  }),
}))
