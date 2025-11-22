/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { Descendant } from "slate";
import { Upload } from "graphql-upload-deno";

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

export interface PostsAuthorFilters {
  OR?: InputMaybe<Array<PostsAuthorfiltersOr>>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsAuthorfiltersOr {
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsContentFilters {
  OR?: InputMaybe<Array<PostsContentfiltersOr>>;
  /** JSON */
  eq?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  gt?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<JSON> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  lt?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  lte?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<JSON> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsContentfiltersOr {
  /** JSON */
  eq?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  gt?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<JSON> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  lt?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  lte?: InputMaybe<Scalars["String"]["input"]>;
  /** JSON */
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<JSON> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsDateCreatedFilters {
  OR?: InputMaybe<Array<PostsDateCreatedfiltersOr>>;
  /** Date */
  eq?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  gt?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  lt?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  lte?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsDateCreatedfiltersOr {
  /** Date */
  eq?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  gt?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<Date> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  lt?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  lte?: InputMaybe<Scalars["String"]["input"]>;
  /** Date */
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<Date> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsFilters {
  OR?: InputMaybe<Array<PostsFiltersOr>>;
  author?: InputMaybe<PostsAuthorFilters>;
  content?: InputMaybe<PostsContentFilters>;
  dateCreated?: InputMaybe<PostsDateCreatedFilters>;
  id?: InputMaybe<PostsIdFilters>;
  title?: InputMaybe<PostsTitleFilters>;
}

export interface PostsFiltersOr {
  author?: InputMaybe<PostsAuthorFilters>;
  content?: InputMaybe<PostsContentFilters>;
  dateCreated?: InputMaybe<PostsDateCreatedFilters>;
  id?: InputMaybe<PostsIdFilters>;
  title?: InputMaybe<PostsTitleFilters>;
}

export interface PostsIdFilters {
  OR?: InputMaybe<Array<PostsIdfiltersOr>>;
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  ne?: InputMaybe<Scalars["Int"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsIdfiltersOr {
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  ne?: InputMaybe<Scalars["Int"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsInsertInput {
  author: Scalars["String"]["input"];
  /** JSON */
  content: Scalars["String"]["input"];
  /** Date */
  dateCreated?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["Int"]["input"]>;
  title: Scalars["String"]["input"];
}

export interface PostsTitleFilters {
  OR?: InputMaybe<Array<PostsTitlefiltersOr>>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PostsTitlefiltersOr {
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  like?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  notIlike?: InputMaybe<Scalars["String"]["input"]>;
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>;
  notLike?: InputMaybe<Scalars["String"]["input"]>;
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  Date: true,
  ID: true,
  Int: true,
  SlateJSON: true,
  String: true,
  Upload: true,
};
export const generatedSchema = {
  Post: {
    __typename: { __type: "String!" },
    author: { __type: "users!" },
    content: { __type: "SlateJSON!" },
    dateCreated: { __type: "Date!" },
    id: { __type: "ID!" },
    title: { __type: "String!" },
  },
  PostInsertInput: {
    content: { __type: "SlateJSON!" },
    title: { __type: "String!" },
  },
  PostsAuthorFilters: {
    OR: { __type: "[PostsAuthorfiltersOr!]" },
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  PostsAuthorfiltersOr: {
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  PostsContentFilters: {
    OR: { __type: "[PostsContentfiltersOr!]" },
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  PostsContentfiltersOr: {
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  PostsDateCreatedFilters: {
    OR: { __type: "[PostsDateCreatedfiltersOr!]" },
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  PostsDateCreatedfiltersOr: {
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  PostsFilters: {
    OR: { __type: "[PostsFiltersOr!]" },
    author: { __type: "PostsAuthorFilters" },
    content: { __type: "PostsContentFilters" },
    dateCreated: { __type: "PostsDateCreatedFilters" },
    id: { __type: "PostsIdFilters" },
    title: { __type: "PostsTitleFilters" },
  },
  PostsFiltersOr: {
    author: { __type: "PostsAuthorFilters" },
    content: { __type: "PostsContentFilters" },
    dateCreated: { __type: "PostsDateCreatedFilters" },
    id: { __type: "PostsIdFilters" },
    title: { __type: "PostsTitleFilters" },
  },
  PostsIdFilters: {
    OR: { __type: "[PostsIdfiltersOr!]" },
    eq: { __type: "Int" },
    gt: { __type: "Int" },
    gte: { __type: "Int" },
    ilike: { __type: "String" },
    inArray: { __type: "[Int!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "Int" },
    lte: { __type: "Int" },
    ne: { __type: "Int" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[Int!]" },
    notLike: { __type: "String" },
  },
  PostsIdfiltersOr: {
    eq: { __type: "Int" },
    gt: { __type: "Int" },
    gte: { __type: "Int" },
    ilike: { __type: "String" },
    inArray: { __type: "[Int!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "Int" },
    lte: { __type: "Int" },
    ne: { __type: "Int" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[Int!]" },
    notLike: { __type: "String" },
  },
  PostsInsertInput: {
    author: { __type: "String!" },
    content: { __type: "String!" },
    dateCreated: { __type: "String" },
    id: { __type: "Int" },
    title: { __type: "String!" },
  },
  PostsItem: {
    __typename: { __type: "String!" },
    author: { __type: "String!" },
    content: { __type: "String!" },
    dateCreated: { __type: "String!" },
    id: { __type: "Int!" },
    title: { __type: "String!" },
  },
  PostsTitleFilters: {
    OR: { __type: "[PostsTitlefiltersOr!]" },
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  PostsTitlefiltersOr: {
    eq: { __type: "String" },
    gt: { __type: "String" },
    gte: { __type: "String" },
    ilike: { __type: "String" },
    inArray: { __type: "[String!]" },
    isNotNull: { __type: "Boolean" },
    isNull: { __type: "Boolean" },
    like: { __type: "String" },
    lt: { __type: "String" },
    lte: { __type: "String" },
    ne: { __type: "String" },
    notIlike: { __type: "String" },
    notInArray: { __type: "[String!]" },
    notLike: { __type: "String" },
  },
  image: {
    __typename: { __type: "String!" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    thumbnail: { __type: "String!" },
    uploadDate: { __type: "Date!" },
    uploader: { __type: "users!" },
  },
  mutation: {
    __typename: { __type: "String!" },
    UpdatePost: {
      __type: "Post",
      __args: { input: "PostInsertInput!", title: "String!" },
    },
    deleteAccount: { __type: "String" },
    deleteFromPosts: {
      __type: "[PostsItem!]!",
      __args: { where: "PostsFilters" },
    },
    deleteImage: { __type: "image", __args: { id: "String!" } },
    deletePost: { __type: "Post", __args: { title: "String!" } },
    insertIntoPostsSingle: {
      __type: "PostsItem",
      __args: { values: "PostsInsertInput!" },
    },
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
  users: {
    __typename: { __type: "String!" },
    password: { __type: "String" },
    username: { __type: "String" },
  },
} as const;

export interface Post {
  __typename?: "Post";
  author: users;
  content: ScalarsEnums["SlateJSON"];
  dateCreated: ScalarsEnums["Date"];
  id: ScalarsEnums["ID"];
  title: ScalarsEnums["String"];
}

export interface PostsItem {
  __typename?: "PostsItem";
  author: ScalarsEnums["String"];
  /**
   * JSON
   */
  content: ScalarsEnums["String"];
  /**
   * Date
   */
  dateCreated: ScalarsEnums["String"];
  id: ScalarsEnums["Int"];
  title: ScalarsEnums["String"];
}

export interface image {
  __typename?: "image";
  description?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["ID"];
  thumbnail: ScalarsEnums["String"];
  uploadDate: ScalarsEnums["Date"];
  uploader: users;
}

export interface Mutation {
  __typename?: "Mutation";
  UpdatePost: (args: {
    input: PostInsertInput;
    title: ScalarsEnums["String"];
  }) => Maybe<Post>;
  deleteAccount?: Maybe<ScalarsEnums["String"]>;
  deleteFromPosts: (args?: { where?: Maybe<PostsFilters> }) => Array<PostsItem>;
  deleteImage: (args: { id: ScalarsEnums["String"] }) => Maybe<image>;
  deletePost: (args: { title: ScalarsEnums["String"] }) => Maybe<Post>;
  insertIntoPostsSingle: (args: {
    values: PostsInsertInput;
  }) => Maybe<PostsItem>;
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

export interface users {
  __typename?: "users";
  password?: Maybe<ScalarsEnums["String"]>;
  username?: Maybe<ScalarsEnums["String"]>;
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
