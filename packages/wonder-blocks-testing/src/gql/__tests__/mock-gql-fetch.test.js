// @flow
import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";

import {GqlRouter, useGql} from "@khanacademy/wonder-blocks-data";
import {RespondWith} from "../../make-mock-response.js";
import {mockGqlFetch} from "../mock-gql-fetch.js";

describe("#mockGqlFetch", () => {
    describe("with GqlRouter and useGql", () => {
        it("should reject when there are no mocks", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const RenderError = () => {
                const [result, setResult] = React.useState(null);
                const gqlFetch = useGql();
                React.useEffect(() => {
                    gqlFetch({
                        type: "query",
                        id: "getMyStuff",
                    }).catch((e) => {
                        setResult(e.message);
                    });
                }, [gqlFetch]);

                return <div data-test-id="result">{result}</div>;
            };

            // Act
            render(
                <GqlRouter defaultContext={{}} fetch={mockFetch}>
                    <RenderError />
                </GqlRouter>,
            );
            const result = screen.getByTestId("result");

            // Assert
            await waitFor(() =>
                expect(result).toHaveTextContent(
                    "No matching GraphQL mock response found for request",
                ),
            );
        });

        it("should provide data when response gives data", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const query = {
                type: "query",
                id: "getMyStuff",
            };
            const data = {myStuff: "stuff"};
            const RenderData = () => {
                const [result, setResult] = React.useState(null);
                const gqlFetch = useGql();
                React.useEffect(() => {
                    // eslint-disable-next-line promise/catch-or-return
                    gqlFetch(query).then((r) => {
                        setResult(JSON.stringify(r ?? "(null)"));
                        return;
                    });
                }, [gqlFetch]);

                return <div data-test-id="result">{result}</div>;
            };

            // Act
            mockFetch.mockOperation({operation: query}, RespondWith.data(data));
            render(
                <GqlRouter defaultContext={{}} fetch={mockFetch}>
                    <RenderData />
                </GqlRouter>,
            );
            const result = screen.getByTestId("result");

            // Assert
            await waitFor(() =>
                expect(result).toHaveTextContent(JSON.stringify(data)),
            );
        });

        it("should reject when request aborted", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const query = {
                type: "query",
                id: "getMyStuff",
            };
            const RenderError = () => {
                const [result, setResult] = React.useState(null);
                const gqlFetch = useGql();
                React.useEffect(() => {
                    // eslint-disable-next-line promise/catch-or-return
                    gqlFetch(query).catch((e) => {
                        setResult(e.message);
                        return;
                    });
                }, [gqlFetch]);

                return <div data-test-id="result">{result}</div>;
            };

            // Act
            mockFetch.mockOperation(
                {operation: query},
                RespondWith.abortedRequest(),
            );
            render(
                <GqlRouter defaultContext={{}} fetch={mockFetch}>
                    <RenderError />
                </GqlRouter>,
            );
            const result = screen.getByTestId("result");

            // Assert
            await waitFor(() => expect(result).toHaveTextContent("aborted"));
        });

        it("should reject when request gives failed error code", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const query = {
                type: "query",
                id: "getMyStuff",
            };
            const RenderError = () => {
                const [result, setResult] = React.useState(null);
                const gqlFetch = useGql();
                React.useEffect(() => {
                    // eslint-disable-next-line promise/catch-or-return
                    gqlFetch(query).catch((e) => {
                        setResult(e.message);
                    });
                }, [gqlFetch]);

                return <div data-test-id="result">{result}</div>;
            };

            // Act
            mockFetch.mockOperation(
                {operation: query},
                RespondWith.errorStatusCode(404),
            );
            render(
                <GqlRouter defaultContext={{}} fetch={mockFetch}>
                    <RenderError />
                </GqlRouter>,
            );
            const result = screen.getByTestId("result");

            // Assert
            await waitFor(() =>
                expect(result).toHaveTextContent("Response unsuccessful"),
            );
        });
    });

    it("should reject with a useful error when there are no matching mocks", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();

        // Act
        const result = mockFetch(
            {
                type: "query",
                id: "getMyStuff",
            },
            {a: "variable"},
            {my: "context"},
        );

        // Assert
        await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(`
                    "No matching GraphQL mock response found for request:
                        Operation: query getMyStuff
                        Variables: {
                      \\"a\\": \\"variable\\"
                    }
                        Context: {
                      \\"my\\": \\"context\\"
                    }"
                `);
    });

    describe("mockOperation", () => {
        it("should match a similar operation when no variables or context in mock", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation({operation}, RespondWith.data(data));
            const result = mockFetch(
                operation,
                {a: "variable"},
                {my: "context"},
            );

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should not match a different operation when no variables or context in mock", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation({operation}, RespondWith.data(data));
            const result = mockFetch(
                {type: "mutation", id: "putMyStuff"},
                {a: "variable"},
                {my: "context"},
            );

            // Assert
            await expect(result).rejects.toThrowError();
        });

        it("should match a similar operation when variables also match and no context in mock", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const variables = {
                a: "variable",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation(
                {operation, variables},
                RespondWith.data(data),
            );
            const result = mockFetch(operation, variables, {my: "context"});

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should not match a similar operation when variables do not match and no context in mock", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const variables = {
                a: "variable",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation(
                {operation, variables},
                RespondWith.data(data),
            );
            const result = mockFetch(
                operation,
                {b: "different variable"},
                {my: "context"},
            );

            // Assert
            await expect(result).rejects.toThrowError();
        });

        it("should match any similar operation when context also matches and no variables in mock", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const context = {
                my: "context",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation(
                {operation, context},
                RespondWith.data(data),
            );
            const result = mockFetch(operation, {a: "variable"}, context);

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should not match any similar operation when context does not match and no variables in mock", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const context = {
                my: "context",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation(
                {operation, context},
                RespondWith.data(data),
            );
            const result = mockFetch(
                operation,
                {a: "variable"},
                {different: "context"},
            );

            // Assert
            await expect(result).rejects.toThrowError();
        });

        it("should match operation when variables and context match the mock", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const variables = {
                a: "variable",
            };
            const context = {
                my: "context",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation(
                {operation, variables, context},
                RespondWith.data(data),
            );
            const result = mockFetch(operation, variables, context);

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should resolve to provide the matching data", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const variables = {
                a: "variable",
            };
            const context = {
                my: "context",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation(
                {operation, variables, context},
                RespondWith.data(data),
            );
            const response = await mockFetch(operation, variables, context);
            const result = await response.text();

            // Assert
            expect(result).toBe(JSON.stringify({data}));
        });

        it("should match all call matches", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperation({operation}, RespondWith.data(data));
            const result = Promise.all([
                mockFetch(operation, {a: "variable"}, {my: "context"}),
                mockFetch(operation, {b: "variable"}, {another: "context"}),
            ]);

            // Assert
            await expect(result).resolves.toStrictEqual([
                expect.any(Object),
                expect.any(Object),
            ]);
        });
    });

    describe("mockOperationOnce", () => {
        it("should match once", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperationOnce({operation}, RespondWith.data(data));
            const result = mockFetch(
                operation,
                {a: "variable"},
                {my: "context"},
            );

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should only match once", async () => {
            // Arrange
            const mockFetch = mockGqlFetch();
            const operation = {
                type: "query",
                id: "getMyStuff",
            };
            const data = {
                myStuff: "stuff",
            };

            // Act
            mockFetch.mockOperationOnce({operation}, RespondWith.data(data));
            const result = Promise.all([
                mockFetch(operation, {a: "variable"}, {my: "context"}),
                mockFetch(operation, {b: "variable"}, {another: "context"}),
            ]);

            // Assert
            await expect(result).rejects.toThrowError();
        });
    });
});
