// @flow
import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";

import {GqlRouter, useGql} from "@khanacademy/wonder-blocks-data";
import {mockGqlFetch} from "../mock-gql-fetch.js";

describe("#mockGqlFetch", () => {
    it("should work with GqlRouter and useGql", async () => {
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

    describe("mockOperationResolved", () => {
        it.todo(
            "should match any similar operation when no variables or context provided",
        );
        it.todo(
            "should match any similar operation when variables also match and no context provided",
        );
        it.todo(
            "should match any similar operation when context also matches and no variables provided",
        );
        it.todo("should match operation when variables and context match");
        it.todo("should resolve to the matching data");
        it.todo("should match for all call matches");
    });

    describe("mockOperationResolvedOnce", () => {
        it.todo(
            "should match any similar operation when no variables or context provided",
        );
        it.todo(
            "should match any similar operation when variables also match and no context provided",
        );
        it.todo(
            "should match any similar operation when context also matches and no variables provided",
        );
        it.todo("should match operation when variables and context match");
        it.todo("should resolve to the matching data");
        it.todo("should only match the first call match");
    });

    describe("mockOperationRejected", () => {
        it.todo(
            "should match any similar operation when no variables or context provided",
        );
        it.todo(
            "should match any similar operation when variables also match and no context provided",
        );
        it.todo(
            "should match any similar operation when context also matches and no variables provided",
        );
        it.todo("should match operation when variables and context match");
        it.todo("should reject with the matching error response");
        it.todo("should match for all call matches");
    });

    describe("mockOperationRejectedOnce", () => {
        it.todo(
            "should match any similar operation when no variables or context provided",
        );
        it.todo(
            "should match any similar operation when variables also match and no context provided",
        );
        it.todo(
            "should match any similar operation when context also matches and no variables provided",
        );
        it.todo("should match operation when variables and context match");
        it.todo("should reject with the matching error response");
        it.todo("should only match the first call match");
    });
});
