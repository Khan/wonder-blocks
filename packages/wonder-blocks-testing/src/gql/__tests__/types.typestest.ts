import {GqlOperation} from "@khanacademy/wonder-blocks-data";
import {RespondWith} from "@khanacademy/wonder-blocks-testing-core";
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

// should be ok, no variables
mockFetch.mockOperation(
    {
        operation: fakeOperation,
    },
    RespondWith.graphQLData({
        a: "string",
        b: 42,
    }),
);

// should be ok, with variables
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

// should error; incorrect variable values and keys
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

// should error; incorrect variable keys
mockFetch.mockOperation(
    {
        operation: fakeOperation,
        variables: {
            // @ts-expect-error Type '{ notAValidKey: number; }' is not assignable to type 'SomeGqlVariables'.
            // Object literal may only specify known properties, and 'notAValidKey' does not exist in type 'SomeGqlVariables'.
            notAValidKey: 42,
        },
    },
    RespondWith.graphQLData({
        a: "string",
        b: 42,
    }),
);

// should error; wrong mock response type
mockFetch.mockOperation(
    {
        operation: fakeOperation,
    },
    // @ts-expect-error Argument of type 'MockResponse<string>' is not assignable to parameter of type 'MockResponse<GraphQLJson<SomeGqlData>>'.
    RespondWith.text("Hello, I'm not a GraphQL response at all!"),
);

// should error; invalid graphQL data
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
