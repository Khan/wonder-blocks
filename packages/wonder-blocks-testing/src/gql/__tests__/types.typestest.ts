import {GqlOperation} from "@khanacademy/wonder-blocks-data";
import {RespondWith} from "@khanacademy/wonder-blocks-testing-core";
import {describe, it} from "tstyche";
import type {GqlFetchMockFn} from "../types";

type SomeGqlData = {
    a: string;
    b: number;
};

type SomeGqlVariables = {
    a: string;
    b: number;
};

const fakeOperation: GqlOperation<SomeGqlData, SomeGqlVariables> = {} as any;

const mockFetch: GqlFetchMockFn = (() => {}) as any;

describe("GqlFetchMockFn", () => {
    describe("mockOperation", () => {
        it("should accept a call with no GraphQL variables", () => {
            mockFetch.mockOperation(
                {
                    operation: fakeOperation,
                },
                RespondWith.graphQLData({
                    a: "string",
                    b: 42,
                }),
            );
        });

        it("should accept a call with valid GraphQL variables", () => {
            mockFetch.mockOperation(
                {
                    operation: fakeOperation,
                    variables: {
                        a: "string",
                        b: 42,
                    },
                },
                RespondWith.graphQLData({
                    a: "string",
                    b: 42,
                }),
            );
        });

        it("should reject incorrect GraphQL variable types", () => {
            mockFetch.mockOperation(
                {
                    operation: fakeOperation,
                    variables: {
                        // @ts-expect-error Type 'number' is not assignable to type 'string'
                        a: 42,
                        // @ts-expect-error Type 'string' is not assignable to type 'number'
                        b: "not a number",
                    },
                },
                RespondWith.graphQLData({
                    a: "string",
                    b: 42,
                }),
            );
        });

        it("should reject unknown GraphQL variables", () => {
            mockFetch.mockOperation(
                {
                    operation: fakeOperation,
                    variables: {
                        // @ts-expect-error Object literal may only specify known properties, and 'notAValidKey' does not exist
                        notAValidKey: 42,
                    },
                },
                RespondWith.graphQLData({
                    a: "string",
                    b: 42,
                }),
            );
        });

        it("should reject a non-GraphQL mock response", () => {
            mockFetch.mockOperation(
                {
                    operation: fakeOperation,
                },
                // @ts-expect-error Argument of type 'MockResponse<string>' is not assignable to parameter of type 'MockResponse<GraphQLJson<SomeGqlData>>'.
                RespondWith.text("Hello, I'm not a GraphQL response at all!"),
            );
        });

        it("should reject GraphQL response data with wrong field types", () => {
            mockFetch.mockOperation(
                {
                    operation: fakeOperation,
                },
                // @ts-expect-error Argument of type 'MockResponse<GraphQLJson<{ a: number; b: string; }>>' is not assignable to parameter of type 'MockResponse<GraphQLJson<SomeGqlData>>'.
                RespondWith.graphQLData({
                    a: 42,
                    b: "string",
                }),
            );
        });
    });
});
