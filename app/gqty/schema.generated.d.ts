/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> =
  & Omit<T, K>
  & {
    [SubKey in K]?: Maybe<T[SubKey]>
  }
export type MakeMaybe<T, K extends keyof T> =
  & Omit<T, K>
  & {
    [SubKey in K]: Maybe<T[SubKey]>
  }
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
    [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
  }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export interface InnerOrder {
  direction: OrderDirection
  /** Priority of current field */
  priority: Scalars["Int"]["input"]
}

/** Order by direction */
export type OrderDirection =
  /** Ascending order */
  | "asc"
  /** Descending order */
  | "desc"

export interface PostsAuthorFilters {
  OR?: InputMaybe<Array<PostsAuthorfiltersOr>>
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsAuthorfiltersOr {
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsContentFilters {
  OR?: InputMaybe<Array<PostsContentfiltersOr>>
  /** JSON */
  eq?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  gt?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<JSON> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  lt?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  lte?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<JSON> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsContentfiltersOr {
  /** JSON */
  eq?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  gt?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<JSON> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  lt?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  lte?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<JSON> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsDateCreatedFilters {
  OR?: InputMaybe<Array<PostsDateCreatedfiltersOr>>
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsDateCreatedfiltersOr {
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsFilters {
  OR?: InputMaybe<Array<PostsFiltersOr>>
  author?: InputMaybe<PostsAuthorFilters>
  content?: InputMaybe<PostsContentFilters>
  dateCreated?: InputMaybe<PostsDateCreatedFilters>
  id?: InputMaybe<PostsIdFilters>
  title?: InputMaybe<PostsTitleFilters>
}

export interface PostsFiltersOr {
  author?: InputMaybe<PostsAuthorFilters>
  content?: InputMaybe<PostsContentFilters>
  dateCreated?: InputMaybe<PostsDateCreatedFilters>
  id?: InputMaybe<PostsIdFilters>
  title?: InputMaybe<PostsTitleFilters>
}

export interface PostsIdFilters {
  OR?: InputMaybe<Array<PostsIdfiltersOr>>
  eq?: InputMaybe<Scalars["Int"]["input"]>
  gt?: InputMaybe<Scalars["Int"]["input"]>
  gte?: InputMaybe<Scalars["Int"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["Int"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["Int"]["input"]>
  lte?: InputMaybe<Scalars["Int"]["input"]>
  ne?: InputMaybe<Scalars["Int"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["Int"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsIdfiltersOr {
  eq?: InputMaybe<Scalars["Int"]["input"]>
  gt?: InputMaybe<Scalars["Int"]["input"]>
  gte?: InputMaybe<Scalars["Int"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["Int"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["Int"]["input"]>
  lte?: InputMaybe<Scalars["Int"]["input"]>
  ne?: InputMaybe<Scalars["Int"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["Int"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsInsertInput {
  author?: InputMaybe<Scalars["String"]["input"]>
  /** JSON */
  content?: InputMaybe<Scalars["String"]["input"]>
  dateCreated?: InputMaybe<Scalars["String"]["input"]>
  id?: InputMaybe<Scalars["Int"]["input"]>
  title?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsOrderBy {
  author?: InputMaybe<InnerOrder>
  content?: InputMaybe<InnerOrder>
  dateCreated?: InputMaybe<InnerOrder>
  id?: InputMaybe<InnerOrder>
  title?: InputMaybe<InnerOrder>
}

export interface PostsTitleFilters {
  OR?: InputMaybe<Array<PostsTitlefiltersOr>>
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface PostsTitlefiltersOr {
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface UsersFilters {
  OR?: InputMaybe<Array<UsersFiltersOr>>
  password?: InputMaybe<UsersPasswordFilters>
  username?: InputMaybe<UsersUsernameFilters>
}

export interface UsersFiltersOr {
  password?: InputMaybe<UsersPasswordFilters>
  username?: InputMaybe<UsersUsernameFilters>
}

export interface UsersPasswordFilters {
  OR?: InputMaybe<Array<UsersPasswordfiltersOr>>
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface UsersPasswordfiltersOr {
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface UsersUsernameFilters {
  OR?: InputMaybe<Array<UsersUsernamefiltersOr>>
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export interface UsersUsernamefiltersOr {
  eq?: InputMaybe<Scalars["String"]["input"]>
  gt?: InputMaybe<Scalars["String"]["input"]>
  gte?: InputMaybe<Scalars["String"]["input"]>
  ilike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  inArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  isNotNull?: InputMaybe<Scalars["Boolean"]["input"]>
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>
  like?: InputMaybe<Scalars["String"]["input"]>
  lt?: InputMaybe<Scalars["String"]["input"]>
  lte?: InputMaybe<Scalars["String"]["input"]>
  ne?: InputMaybe<Scalars["String"]["input"]>
  notIlike?: InputMaybe<Scalars["String"]["input"]>
  /** Array<undefined> */
  notInArray?: InputMaybe<Array<Scalars["String"]["input"]>>
  notLike?: InputMaybe<Scalars["String"]["input"]>
}

export declare const scalarsEnumsHash: ScalarsEnumsHash
export declare const generatedSchema: {
  InnerOrder: {
    direction: { __type: "OrderDirection!" }
    priority: { __type: "Int!" }
  }
  PostsAuthorFilters: {
    OR: { __type: "[PostsAuthorfiltersOr!]" }
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsAuthorfiltersOr: {
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsContentFilters: {
    OR: { __type: "[PostsContentfiltersOr!]" }
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsContentfiltersOr: {
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsDateCreatedFilters: {
    OR: { __type: "[PostsDateCreatedfiltersOr!]" }
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsDateCreatedfiltersOr: {
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsFilters: {
    OR: { __type: "[PostsFiltersOr!]" }
    author: { __type: "PostsAuthorFilters" }
    content: { __type: "PostsContentFilters" }
    dateCreated: { __type: "PostsDateCreatedFilters" }
    id: { __type: "PostsIdFilters" }
    title: { __type: "PostsTitleFilters" }
  }
  PostsFiltersOr: {
    author: { __type: "PostsAuthorFilters" }
    content: { __type: "PostsContentFilters" }
    dateCreated: { __type: "PostsDateCreatedFilters" }
    id: { __type: "PostsIdFilters" }
    title: { __type: "PostsTitleFilters" }
  }
  PostsIdFilters: {
    OR: { __type: "[PostsIdfiltersOr!]" }
    eq: { __type: "Int" }
    gt: { __type: "Int" }
    gte: { __type: "Int" }
    ilike: { __type: "String" }
    inArray: { __type: "[Int!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "Int" }
    lte: { __type: "Int" }
    ne: { __type: "Int" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[Int!]" }
    notLike: { __type: "String" }
  }
  PostsIdfiltersOr: {
    eq: { __type: "Int" }
    gt: { __type: "Int" }
    gte: { __type: "Int" }
    ilike: { __type: "String" }
    inArray: { __type: "[Int!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "Int" }
    lte: { __type: "Int" }
    ne: { __type: "Int" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[Int!]" }
    notLike: { __type: "String" }
  }
  PostsInsertInput: {
    author: { __type: "String" }
    content: { __type: "String" }
    dateCreated: { __type: "String" }
    id: { __type: "Int" }
    title: { __type: "String" }
  }
  PostsItem: {
    __typename: { __type: "String!" }
    author: { __type: "String" }
    content: { __type: "String" }
    dateCreated: { __type: "String" }
    id: { __type: "Int!" }
    title: { __type: "String" }
  }
  PostsOrderBy: {
    author: { __type: "InnerOrder" }
    content: { __type: "InnerOrder" }
    dateCreated: { __type: "InnerOrder" }
    id: { __type: "InnerOrder" }
    title: { __type: "InnerOrder" }
  }
  PostsSelectItem: {
    __typename: { __type: "String!" }
    author: { __type: "String" }
    content: { __type: "String" }
    dateCreated: { __type: "String" }
    id: { __type: "Int!" }
    title: { __type: "String" }
    user: { __type: "PostsUserRelation"; __args: { where: "UsersFilters" } }
  }
  PostsTitleFilters: {
    OR: { __type: "[PostsTitlefiltersOr!]" }
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsTitlefiltersOr: {
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  PostsUserRelation: {
    __typename: { __type: "String!" }
    password: { __type: "String!" }
    posts: {
      __type: "[PostsUserRelationPostsRelation!]!"
      __args: {
        limit: "Int"
        offset: "Int"
        orderBy: "PostsOrderBy"
        where: "PostsFilters"
      }
    }
    username: { __type: "String!" }
  }
  PostsUserRelationPostsRelation: {
    __typename: { __type: "String!" }
    author: { __type: "String" }
    content: { __type: "String" }
    dateCreated: { __type: "String" }
    id: { __type: "Int!" }
    title: { __type: "String" }
  }
  UsersFilters: {
    OR: { __type: "[UsersFiltersOr!]" }
    password: { __type: "UsersPasswordFilters" }
    username: { __type: "UsersUsernameFilters" }
  }
  UsersFiltersOr: {
    password: { __type: "UsersPasswordFilters" }
    username: { __type: "UsersUsernameFilters" }
  }
  UsersPasswordFilters: {
    OR: { __type: "[UsersPasswordfiltersOr!]" }
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  UsersPasswordfiltersOr: {
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  UsersUsernameFilters: {
    OR: { __type: "[UsersUsernamefiltersOr!]" }
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  UsersUsernamefiltersOr: {
    eq: { __type: "String" }
    gt: { __type: "String" }
    gte: { __type: "String" }
    ilike: { __type: "String" }
    inArray: { __type: "[String!]" }
    isNotNull: { __type: "Boolean" }
    isNull: { __type: "Boolean" }
    like: { __type: "String" }
    lt: { __type: "String" }
    lte: { __type: "String" }
    ne: { __type: "String" }
    notIlike: { __type: "String" }
    notInArray: { __type: "[String!]" }
    notLike: { __type: "String" }
  }
  mutation: {
    __typename: { __type: "String!" }
    deleteFromPosts: {
      __type: "[PostsItem!]!"
      __args: { where: "PostsFilters" }
    }
    insertIntoPostsSingle: {
      __type: "PostsItem"
      __args: { values: "PostsInsertInput!" }
    }
    login: {
      __type: "Boolean"
      __args: { password: "String"; username: "String" }
    }
    logout: { __type: "Boolean" }
  }
  query: {
    __typename: { __type: "String!" }
    hello: { __type: "String" }
    itsme: { __type: "String!" }
    post: {
      __type: "PostsSelectItem"
      __args: { offset: "Int"; orderBy: "PostsOrderBy"; where: "PostsFilters" }
    }
    posts: {
      __type: "[PostsSelectItem!]!"
      __args: {
        limit: "Int"
        offset: "Int"
        orderBy: "PostsOrderBy"
        where: "PostsFilters"
      }
    }
  }
  subscription: {}
}

export interface PostsItem {
  __typename?: "PostsItem"
  author?: Maybe<ScalarsEnums["String"]>
  /**
   * JSON
   */
  content?: Maybe<ScalarsEnums["String"]>
  dateCreated?: Maybe<ScalarsEnums["String"]>
  id: ScalarsEnums["Int"]
  title?: Maybe<ScalarsEnums["String"]>
}

export interface PostsSelectItem {
  __typename?: "PostsSelectItem"
  author?: Maybe<ScalarsEnums["String"]>
  /**
   * JSON
   */
  content?: Maybe<ScalarsEnums["String"]>
  dateCreated?: Maybe<ScalarsEnums["String"]>
  id: ScalarsEnums["Int"]
  title?: Maybe<ScalarsEnums["String"]>
  user: (args?: { where?: Maybe<UsersFilters> }) => Maybe<PostsUserRelation>
}

export interface PostsUserRelation {
  __typename?: "PostsUserRelation"
  password: ScalarsEnums["String"]
  posts: (args?: {
    limit?: Maybe<ScalarsEnums["Int"]>
    offset?: Maybe<ScalarsEnums["Int"]>
    orderBy?: Maybe<PostsOrderBy>
    where?: Maybe<PostsFilters>
  }) => Array<PostsUserRelationPostsRelation>
  username: ScalarsEnums["String"]
}

export interface PostsUserRelationPostsRelation {
  __typename?: "PostsUserRelationPostsRelation"
  author?: Maybe<ScalarsEnums["String"]>
  /**
   * JSON
   */
  content?: Maybe<ScalarsEnums["String"]>
  dateCreated?: Maybe<ScalarsEnums["String"]>
  id: ScalarsEnums["Int"]
  title?: Maybe<ScalarsEnums["String"]>
}

export interface Mutation {
  __typename?: "Mutation"
  deleteFromPosts: (args?: { where?: Maybe<PostsFilters> }) => Array<PostsItem>
  insertIntoPostsSingle: (args: {
    values: PostsInsertInput
  }) => Maybe<PostsItem>
  login: (args?: {
    password?: Maybe<ScalarsEnums["String"]>
    username?: Maybe<ScalarsEnums["String"]>
  }) => Maybe<ScalarsEnums["Boolean"]>
  logout?: Maybe<ScalarsEnums["Boolean"]>
}

export interface Query {
  __typename?: "Query"
  hello?: Maybe<ScalarsEnums["String"]>
  itsme: ScalarsEnums["String"]
  post: (args?: {
    offset?: Maybe<ScalarsEnums["Int"]>
    orderBy?: Maybe<PostsOrderBy>
    where?: Maybe<PostsFilters>
  }) => Maybe<PostsSelectItem>
  posts: (args?: {
    limit?: Maybe<ScalarsEnums["Int"]>
    offset?: Maybe<ScalarsEnums["Int"]>
    orderBy?: Maybe<PostsOrderBy>
    where?: Maybe<PostsFilters>
  }) => Array<PostsSelectItem>
}

export interface Subscription {
  __typename?: "Subscription"
}

export interface GeneratedSchema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type ScalarsEnums =
  & {
    [Key in keyof Scalars]: Scalars[Key] extends { output: unknown }
      ? Scalars[Key]["output"]
      : never
  }
  & {
    OrderDirection: OrderDirection
  }
