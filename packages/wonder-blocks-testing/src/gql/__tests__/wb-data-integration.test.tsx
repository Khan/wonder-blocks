import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";

import {GqlRouter, useGql} from "@khanacademy/wonder-blocks-data";
import {RespondWith} from "../../respond-with";
import {mockGqlFetch} from "../mock-gql-fetch";

describe("integrating mockGqlFetch, RespondWith, GqlRouter and useGql", () => {
    it("should reject with error indicating there are no mocks", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();
        const RenderError = () => {
            const [result, setResult] = React.useState<any>(null);
            const gqlFetch = useGql();
            React.useEffect(() => {
                gqlFetch({
                    type: "query",
                    id: "getMyStuff",
                }).catch((e: any) => {
                    setResult(e.message);
                });
            }, [gqlFetch]);

            return <div data-testid="result">{result}</div>;
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
                "No matching mock response found for request",
            ),
        );
    });

    it("should resolve with data for RespondWith.graphQLData", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();
        const query = {
            type: "query",
            id: "getMyStuff",
        } as const;
        const data = {myStuff: "stuff"} as const;
        const RenderData = () => {
            const [result, setResult] = React.useState<any>(null);
            const gqlFetch = useGql();
            React.useEffect(() => {
                // eslint-disable-next-line promise/catch-or-return
                gqlFetch(query).then((r: any) => {
                    setResult(JSON.stringify(r ?? "(null)"));
                    return;
                });
            }, [gqlFetch]);

            return <div data-testid="result">{result}</div>;
        };

        // Act
        mockFetch.mockOperation(
            {operation: query},
            RespondWith.graphQLData(data),
        );
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

    it("should reject with AbortError for RespondWith.abortedRequest", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();
        const query = {
            type: "query",
            id: "getMyStuff",
        } as const;
        const RenderError = () => {
            const [result, setResult] = React.useState<any>(null);
            const gqlFetch = useGql();
            React.useEffect(() => {
                // eslint-disable-next-line promise/catch-or-return
                gqlFetch(query).catch((e: any) => {
                    setResult(e.message);
                    return;
                });
            }, [gqlFetch]);

            return <div data-testid="result">{result}</div>;
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

    it("should reject with unsuccessful response error for RespondWith.errorStatusCode", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();
        const query = {
            type: "query",
            id: "getMyStuff",
        } as const;
        const RenderError = () => {
            const [result, setResult] = React.useState<any>(null);
            const gqlFetch = useGql();
            React.useEffect(() => {
                // eslint-disable-next-line promise/catch-or-return
                gqlFetch(query).catch((e: any) => {
                    setResult(e.message);
                });
            }, [gqlFetch]);

            return <div data-testid="result">{result}</div>;
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

    it("should reject with parse error for RespondWith.unparseableBody", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();
        const query = {
            type: "query",
            id: "getMyStuff",
        } as const;
        const RenderError = () => {
            const [result, setResult] = React.useState<any>(null);
            const gqlFetch = useGql();
            React.useEffect(() => {
                // eslint-disable-next-line promise/catch-or-return
                gqlFetch(query).catch((e: any) => {
                    setResult(e.message);
                });
            }, [gqlFetch]);

            return <div data-testid="result">{result}</div>;
        };

        // Act
        mockFetch.mockOperation(
            {operation: query},
            RespondWith.unparseableBody(),
        );
        render(
            <GqlRouter defaultContext={{}} fetch={mockFetch}>
                <RenderError />
            </GqlRouter>,
        );
        const result = screen.getByTestId("result");

        // Assert
        await waitFor(() =>
            expect(result).toHaveTextContent("Failed to parse response"),
        );
    });

    it("should reject with missing response error for RespondWith.nonGraphQLBody", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();
        const query = {
            type: "query",
            id: "getMyStuff",
        } as const;
        const RenderError = () => {
            const [result, setResult] = React.useState<any>(null);
            const gqlFetch = useGql();
            React.useEffect(() => {
                // eslint-disable-next-line promise/catch-or-return
                gqlFetch(query).catch((e: any) => {
                    setResult(e.message);
                });
            }, [gqlFetch]);

            return <div data-testid="result">{result}</div>;
        };

        // Act
        mockFetch.mockOperation(
            {operation: query},
            RespondWith.nonGraphQLBody(),
        );
        render(
            <GqlRouter defaultContext={{}} fetch={mockFetch}>
                <RenderError />
            </GqlRouter>,
        );
        const result = screen.getByTestId("result");

        // Assert
        await waitFor(() =>
            expect(result).toHaveTextContent("Server response missing"),
        );
    });

    it("should reject with GraphQL error for RespondWith.graphQLErrors", async () => {
        // Arrange
        const mockFetch = mockGqlFetch();
        const query = {
            type: "query",
            id: "getMyStuff",
        } as const;
        const RenderError = () => {
            const [result, setResult] = React.useState<any>(null);
            const gqlFetch = useGql();
            React.useEffect(() => {
                // eslint-disable-next-line promise/catch-or-return
                gqlFetch(query).catch((e: any) => {
                    setResult(e.message);
                });
            }, [gqlFetch]);

            return <div data-testid="result">{result}</div>;
        };

        // Act
        mockFetch.mockOperation(
            {operation: query},
            RespondWith.graphQLErrors(["error 1", "error 2"]),
        );
        render(
            <GqlRouter defaultContext={{}} fetch={mockFetch}>
                <RenderError />
            </GqlRouter>,
        );
        const result = screen.getByTestId("result");

        // Assert
        await waitFor(() => expect(result).toHaveTextContent("GraphQL errors"));
    });
});
