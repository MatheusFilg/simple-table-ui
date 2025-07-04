/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query getAllFirstName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        firstName\n      }\n    }\n": typeof types.GetAllFirstNameDocument,
    "\n    query getAllLastName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        lastName\n      }\n    }\n": typeof types.GetAllLastNameDocument,
    "\nquery getAllUsers($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n  userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    firstName\n    lastName\n    email\n    contact\n    profession\n  }\n}\n": typeof types.GetAllUsersDocument,
};
const documents: Documents = {
    "\n    query getAllFirstName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        firstName\n      }\n    }\n": types.GetAllFirstNameDocument,
    "\n    query getAllLastName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        lastName\n      }\n    }\n": types.GetAllLastNameDocument,
    "\nquery getAllUsers($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n  userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    firstName\n    lastName\n    email\n    contact\n    profession\n  }\n}\n": types.GetAllUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAllFirstName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        firstName\n      }\n    }\n"): (typeof documents)["\n    query getAllFirstName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        firstName\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAllLastName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        lastName\n      }\n    }\n"): (typeof documents)["\n    query getAllLastName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n        lastName\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getAllUsers($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n  userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    firstName\n    lastName\n    email\n    contact\n    profession\n  }\n}\n"): (typeof documents)["\nquery getAllUsers($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {\n  userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {\n    id\n    firstName\n    lastName\n    email\n    contact\n    profession\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;