/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { Descendant } from "slate";

import { type ScalarsEnumsHash } from "gqty";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: Date; output: Date };
  SlateJSON: { input: Descendant[]; output: Descendant[] };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: File; output: File };
}

export interface PostInsertInput {
  content: Scalars["SlateJSON"]["input"];
  title: Scalars["String"]["input"];
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  Date: true,
  ID: true,
  SlateJSON: true,
  String: true,
  Upload: true,
};
export const generatedSchema = {
  Post: {
    __typename: { __type: "String!" },
    author: { __type: "String!" },
    content: { __type: "SlateJSON!" },
    dateCreated: { __type: "Date!" },
    id: { __type: "ID!" },
    title: { __type: "String!" },
  },
  PostInsertInput: {
    content: { __type: "SlateJSON!" },
    title: { __type: "String!" },
  },
  image: {
    __typename: { __type: "String!" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    thumbnail: { __type: "String!" },
    uploadDate: { __type: "Date!" },
    uploader: { __type: "String!" },
  },
  mutation: {
    __typename: { __type: "String!" },
    UpdatePost: {
      __type: "Post",
      __args: { input: "PostInsertInput!", title: "String!" },
    },
    deleteAccount: { __type: "String" },
    deleteImage: { __type: "image", __args: { id: "String!" } },
    deletePost: { __type: "Post", __args: { title: "String!" } },
    insertPost: { __type: "Post", __args: { input: "PostInsertInput!" } },
    login: {
      __type: "Boolean",
      __args: { password: "String!", username: "String!" },
    },
    logout: { __type: "Boolean" },
    signup: {
      __type: "String",
      __args: { password: "String!", username: "String!" },
    },
    uploadImage: {
      __type: "image",
      __args: { description: "String", image: "Upload!", thumbnail: "String!" },
    },
  },
  query: {
    __typename: { __type: "String!" },
    images: { __type: "[image!]" },
    post: { __type: "Post", __args: { title: "String!" } },
    posts: { __type: "[Post!]" },
    session: { __type: "String!" },
  },
  subscription: {},
} as const;

export interface Post {
  __typename?: "Post";
  author: ScalarsEnums["String"];
  content: ScalarsEnums["SlateJSON"];
  dateCreated: ScalarsEnums["Date"];
  id: ScalarsEnums["ID"];
  title: ScalarsEnums["String"];
}

export interface image {
  __typename?: "image";
  description?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["ID"];
  thumbnail: ScalarsEnums["String"];
  uploadDate: ScalarsEnums["Date"];
  uploader: ScalarsEnums["String"];
}

export interface Mutation {
  __typename?: "Mutation";
  UpdatePost: (args: {
    input: PostInsertInput;
    title: ScalarsEnums["String"];
  }) => Maybe<Post>;
  deleteAccount?: Maybe<ScalarsEnums["String"]>;
  deleteImage: (args: { id: ScalarsEnums["String"] }) => Maybe<image>;
  deletePost: (args: { title: ScalarsEnums["String"] }) => Maybe<Post>;
  insertPost: (args: { input: PostInsertInput }) => Maybe<Post>;
  login: (args: {
    password: ScalarsEnums["String"];
    username: ScalarsEnums["String"];
  }) => Maybe<ScalarsEnums["Boolean"]>;
  logout?: Maybe<ScalarsEnums["Boolean"]>;
  signup: (args: {
    password: ScalarsEnums["String"];
    username: ScalarsEnums["String"];
  }) => Maybe<ScalarsEnums["String"]>;
  uploadImage: (args: {
    description?: Maybe<ScalarsEnums["String"]>;
    image: ScalarsEnums["Upload"];
    thumbnail: ScalarsEnums["String"];
  }) => Maybe<image>;
}

export interface Query {
  __typename?: "Query";
  images?: Maybe<Array<image>>;
  post: (args: { title: ScalarsEnums["String"] }) => Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  session: ScalarsEnums["String"];
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type ScalarsEnums = {
  [Key in keyof Scalars]: Scalars[Key] extends { output: unknown }
    ? Scalars[Key]["output"]
    : never;
} & {};
