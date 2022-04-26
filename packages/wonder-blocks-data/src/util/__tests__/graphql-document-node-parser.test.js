// @flow
import {graphQLDocumentNodeParser} from "../graphql-document-node-parser.js";

describe("#graphQLDocumentNodeParser", () => {
    describe("in production - shorter error messages", () => {
        const NODE_ENV = process.env.NODE_ENV;
        beforeEach(() => {
            process.env.NODE_ENV = "production";
        });

        afterEach(() => {
            if (NODE_ENV != null) {
                process.env.NODE_ENV = NODE_ENV;
            } else {
                delete process.env.NODE_ENV;
            }
        });

        it("should throw if the document lacks the kind property", () => {
            // Arrange
            const documentNode = ({}: any);

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Bad DocumentNode"`,
            );
        });

        it("should throw if the document contains only fragments", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "FragmentDefinition",
                        name: {
                            kind: "Name",
                            value: "fragment",
                        },
                        typeCondition: {
                            kind: "NamedType",
                            name: {
                                kind: "Name",
                                value: "Query",
                            },
                        },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "test",
                                    },
                                },
                            ],
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Fragment only"`,
            );
        });

        it("should throw if the document contains subscriptions", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "subscription",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "subscription",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"No subscriptions"`,
            );
        });

        it("should throw if the document contains more than one query", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "query",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "query",
                        },
                    },
                    {
                        kind: "OperationDefinition",
                        operation: "query",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "query",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Too many ops"`,
            );
        });

        it("should throw if the document contains more than one mutation", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "mutation",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "mutation",
                        },
                    },
                    {
                        kind: "OperationDefinition",
                        operation: "mutation",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "mutation",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Too many ops"`,
            );
        });

        it("should throw if the document is a combination of query and mutation", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "query",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "query",
                        },
                    },
                    {
                        kind: "OperationDefinition",
                        operation: "mutation",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "mutation",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Too many ops"`,
            );
        });
    });

    describe("not in production - more informative error messages", () => {
        it("should throw if the document lacks the kind property", () => {
            // Arrange
            const documentNode = ({}: any);

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Argument of {} passed to parser was not a valid GraphQL DocumentNode. You may need to use 'graphql-tag' or another method to convert your operation into a document"`,
            );
        });

        it("should throw if the document contains only fragments", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "FragmentDefinition",
                        name: {
                            kind: "Name",
                            value: "fragment",
                        },
                        typeCondition: {
                            kind: "NamedType",
                            name: {
                                kind: "Name",
                                value: "Query",
                            },
                        },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "test",
                                    },
                                },
                            ],
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Passing only a fragment to 'graphql' is not supported. You must include a query or mutation as well"`,
            );
        });

        it("should throw if the document contains subscriptions", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "subscription",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "subscription",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"We do not support subscriptions. {\\"kind\\":\\"Document\\",\\"definitions\\":[{\\"kind\\":\\"OperationDefinition\\",\\"operation\\":\\"subscription\\",\\"variableDefinitions\\":[],\\"name\\":{\\"kind\\":\\"Name\\",\\"value\\":\\"subscription\\"}}]} had 1 subscriptions"`,
            );
        });

        it("should throw if the document contains more than one query", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "query",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "query",
                        },
                    },
                    {
                        kind: "OperationDefinition",
                        operation: "query",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "query",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"We only support one query or mutation per component. {\\"kind\\":\\"Document\\",\\"definitions\\":[{\\"kind\\":\\"OperationDefinition\\",\\"operation\\":\\"query\\",\\"variableDefinitions\\":[],\\"name\\":{\\"kind\\":\\"Name\\",\\"value\\":\\"query\\"}},{\\"kind\\":\\"OperationDefinition\\",\\"operation\\":\\"query\\",\\"variableDefinitions\\":[],\\"name\\":{\\"kind\\":\\"Name\\",\\"value\\":\\"query\\"}}]} had 2 queries and 0 mutations. "`,
            );
        });

        it("should throw if the document contains more than one mutation", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "mutation",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "mutation",
                        },
                    },
                    {
                        kind: "OperationDefinition",
                        operation: "mutation",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "mutation",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"We only support one query or mutation per component. {\\"kind\\":\\"Document\\",\\"definitions\\":[{\\"kind\\":\\"OperationDefinition\\",\\"operation\\":\\"mutation\\",\\"variableDefinitions\\":[],\\"name\\":{\\"kind\\":\\"Name\\",\\"value\\":\\"mutation\\"}},{\\"kind\\":\\"OperationDefinition\\",\\"operation\\":\\"mutation\\",\\"variableDefinitions\\":[],\\"name\\":{\\"kind\\":\\"Name\\",\\"value\\":\\"mutation\\"}}]} had 0 queries and 2 mutations. "`,
            );
        });

        it("should throw if the document is a combination of query and mutation", () => {
            // Arrange
            const documentNode = {
                kind: "Document",
                definitions: [
                    {
                        kind: "OperationDefinition",
                        operation: "query",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "query",
                        },
                    },
                    {
                        kind: "OperationDefinition",
                        operation: "mutation",
                        variableDefinitions: [],
                        name: {
                            kind: "Name",
                            value: "mutation",
                        },
                    },
                ],
            };

            // Act
            const underTest = () => graphQLDocumentNodeParser(documentNode);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"We only support one query or mutation per component. {\\"kind\\":\\"Document\\",\\"definitions\\":[{\\"kind\\":\\"OperationDefinition\\",\\"operation\\":\\"query\\",\\"variableDefinitions\\":[],\\"name\\":{\\"kind\\":\\"Name\\",\\"value\\":\\"query\\"}},{\\"kind\\":\\"OperationDefinition\\",\\"operation\\":\\"mutation\\",\\"variableDefinitions\\":[],\\"name\\":{\\"kind\\":\\"Name\\",\\"value\\":\\"mutation\\"}}]} had 1 queries and 1 mutations. "`,
            );
        });
    });

    it("should return the operation name, type, and variables for a query", () => {
        // Arrange
        const documentNode: any = {
            kind: "Document",
            definitions: [
                {
                    kind: "OperationDefinition",
                    operation: "query",
                    variableDefinitions: [
                        {
                            kind: "VariableDefinition",
                            variable: {
                                kind: "Variable",
                                name: {
                                    kind: "Name",
                                    value: "variable",
                                },
                            },
                            type: {
                                kind: "NamedType",
                                name: {
                                    kind: "Name",
                                    value: "String",
                                },
                            },
                            defaultValue: {
                                kind: "StringValue",
                                value: "defaultValue",
                            },
                        },
                    ],
                    name: {
                        kind: "Name",
                        value: "myQuery",
                    },
                },
            ],
        };

        // Act
        const result = graphQLDocumentNodeParser(documentNode);

        // Assert
        expect(result).toEqual({
            name: "myQuery",
            type: "query",
            variables: documentNode.definitions[0].variableDefinitions,
        });
    });

    it("should return the operation name, type, and variables for a mutation", () => {
        // Arrange
        const documentNode: any = {
            kind: "Document",
            definitions: [
                {
                    kind: "OperationDefinition",
                    operation: "mutation",
                    variableDefinitions: [
                        {
                            kind: "VariableDefinition",
                            variable: {
                                kind: "Variable",
                                name: {
                                    kind: "Name",
                                    value: "variable",
                                },
                            },
                            type: {
                                kind: "NamedType",
                                name: {
                                    kind: "Name",
                                    value: "String",
                                },
                            },
                            defaultValue: {
                                kind: "StringValue",
                                value: "defaultValue",
                            },
                        },
                    ],
                    name: {
                        kind: "Name",
                        value: "myMutation",
                    },
                },
            ],
        };

        // Act
        const result = graphQLDocumentNodeParser(documentNode);

        // Assert
        expect(result).toEqual({
            name: "myMutation",
            type: "mutation",
            variables: documentNode.definitions[0].variableDefinitions,
        });
    });

    it("should use name of data if no name in document", () => {
        // Arrange
        const documentNode: any = {
            kind: "Document",
            definitions: [
                {
                    kind: "OperationDefinition",
                    operation: "query",
                },
            ],
        };

        // Act
        const result = graphQLDocumentNodeParser(documentNode);

        // Assert
        expect(result).toEqual({
            name: "data",
            type: "query",
            variables: [],
        });
    });

    it("should cache the output", () => {
        // Arrange
        const documentNode: any = {
            kind: "Document",
            definitions: [
                {
                    kind: "OperationDefinition",
                    operation: "query",
                    name: {
                        kind: "Name",
                        value: "myQuery",
                    },
                },
            ],
        };

        // Act
        const initialResult = graphQLDocumentNodeParser(documentNode);
        const secondResult = graphQLDocumentNodeParser(documentNode);

        // Assert
        expect(initialResult).toBe(secondResult);
    });
});
