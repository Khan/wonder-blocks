// @flow
import type {
    DocumentNode,
    DefinitionNode,
    VariableDefinitionNode,
    OperationDefinitionNode,
} from "./graphql-types.js";
import {DataError, DataErrors} from "./data-error.js";

export const DocumentTypes = Object.freeze({
    query: "query",
    mutation: "mutation",
});

export type DocumentType = $Values<typeof DocumentTypes>;

export interface IDocumentDefinition {
    type: DocumentType;
    name: string;
    variables: $ReadOnlyArray<VariableDefinitionNode>;
}

const cache = new Map<DocumentNode, IDocumentDefinition>();

/**
 * Parse a GraphQL document node to determine some info about it.
 *
 * This is based on:
 * https://github.com/apollographql/react-apollo/blob/3bc993b2ea91704bd6a2667f42d1940656c071ff/src/parser.ts
 */
export function graphQLDocumentNodeParser(
    document: DocumentNode,
): IDocumentDefinition {
    const cached = cache.get(document);
    if (cached) {
        return cached;
    }

    /**
     * Saftey check for proper usage.
     */
    if (!document?.kind) {
        if (process.env.NODE_ENV === "production") {
            throw new DataError("Bad DocumentNode", DataErrors.InvalidInput);
        } else {
            throw new DataError(
                `Argument of ${JSON.stringify(
                    document,
                )} passed to parser was not a valid GraphQL ` +
                    `DocumentNode. You may need to use 'graphql-tag' or another method ` +
                    `to convert your operation into a document`,
                DataErrors.InvalidInput,
            );
        }
    }

    const fragments = document.definitions.filter(
        (x: DefinitionNode) => x.kind === "FragmentDefinition",
    );

    const queries = document.definitions.filter(
        (x: DefinitionNode) =>
            // $FlowIgnore[prop-missing]
            x.kind === "OperationDefinition" && x.operation === "query",
    );

    const mutations = document.definitions.filter(
        (x: DefinitionNode) =>
            // $FlowIgnore[prop-missing]
            x.kind === "OperationDefinition" && x.operation === "mutation",
    );

    const subscriptions = document.definitions.filter(
        (x: DefinitionNode) =>
            // $FlowIgnore[prop-missing]
            x.kind === "OperationDefinition" && x.operation === "subscription",
    );

    if (fragments.length && !queries.length && !mutations.length) {
        if (process.env.NODE_ENV === "production") {
            throw new DataError("Fragment only", DataErrors.InvalidInput);
        } else {
            throw new DataError(
                `Passing only a fragment to 'graphql' is not supported. ` +
                    `You must include a query or mutation as well`,
                DataErrors.InvalidInput,
            );
        }
    }

    if (subscriptions.length) {
        if (process.env.NODE_ENV === "production") {
            throw new DataError("No subscriptions", DataErrors.InvalidInput);
        } else {
            throw new DataError(
                `We do not support subscriptions. ` +
                    `${JSON.stringify(document)} had ${
                        subscriptions.length
                    } subscriptions`,
                DataErrors.InvalidInput,
            );
        }
    }

    if (queries.length + mutations.length > 1) {
        if (process.env.NODE_ENV === "production") {
            throw new DataError("Too many ops", DataErrors.InvalidInput);
        } else {
            throw new DataError(
                `We only support one query or mutation per component. ` +
                    `${JSON.stringify(document)} had ${
                        queries.length
                    } queries and ` +
                    `${mutations.length} mutations. `,
                DataErrors.InvalidInput,
            );
        }
    }

    const type = queries.length ? DocumentTypes.query : DocumentTypes.mutation;
    const definitions = queries.length ? queries : mutations;

    const definition: OperationDefinitionNode = (definitions[0]: any);
    const variables = definition.variableDefinitions || [];

    // fallback to using data if no name
    const name =
        definition.name?.kind === "Name" ? definition.name.value : "data";

    const payload: IDocumentDefinition = {name, type, variables};
    cache.set(document, payload);
    return payload;
}
