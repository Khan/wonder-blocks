// @flow
import {graphQLDocumentNodeParser} from "./graphql-document-node-parser.js";
import type {GqlOperation} from "./gql-types.js";
import type {DocumentNode} from "./graphql-types.js";

/**
 * Convert a GraphQL DocumentNode to a base Wonder Blocks Data GqlOperation.
 *
 * If you want to include the query/mutation body, extend the result of this
 * method and use the `graphql/language/printer` like:
 *
 * ```js
 * import {print} from "graphql/language/printer";
 *
 * const gqlOpWithBody = {
 *     ...toGqlOperation(documentNode),
 *     query: print(documentNode),
 * };
 * ```
 *
 * If you want to enforce inclusion of __typename properties, then you can use
 * `apollo-utilities` first to modify the document:
 *
 * ```js
 * import {print} from "graphql/language/printer";
 * import {addTypenameToDocument} from "apollo-utilities";
 *
 * const documentWithTypenames = addTypenameToDocument(documentNode);
 * const gqlOpWithBody = {
 *     ...toGqlOperation(documentWithTypenames),
 *     query: print(documentWithTypenames),
 * };
 * ```
 */
export const toGqlOperation = <TData, TVariables: {...}>(
    documentNode: DocumentNode,
): GqlOperation<TData, TVariables> => {
    const definition = graphQLDocumentNodeParser(documentNode);
    const wbDataOperation: GqlOperation<TData, TVariables> = {
        id: definition.name,
        type: definition.type,
    };
    return wbDataOperation;
};
