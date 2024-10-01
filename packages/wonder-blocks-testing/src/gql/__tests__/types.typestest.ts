/* eslint-disable @typescript-eslint/no-unused-vars */
import {GqlContext, GqlOperation} from "@khanacademy/wonder-blocks-data";
import {RespondWith} from "@khanacademy/wonder-blocks-testing-core";
import type {
    GqlFetchMockFn,
    GqlMockOperation,
    MutableGqlMockOperation,
} from "../types";
import {matchGql} from "../match-gql";

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

// -> GqlFetchMockFn tests
// mockOperation tests
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

// configure tests
// should be ok
mockFetch.configure({hardFailOnUnmockedRequests: true});

// should error; invalid configuration
mockFetch.configure({
    // @ts-expect-error Type 'boolean' is not assignable to type 'number'.
    hardFailOnUnmockedRequests: 4,
});

// -> matchGql tests
// should be ok, no variables or context
matchGql(fakeOperation);

// should be ok, with variables
matchGql(fakeOperation).withVariables({
    a: "string",
    b: 42,
});

// should be ok, with context
matchGql(fakeOperation).withContext({
    locale: "en",
});

// should be ok, with variables and context
matchGql(fakeOperation)
    .withVariables({
        a: "string",
        b: 42,
    })
    .withContext({
        locale: "en",
    });

// should be ok, returns a GqlMockOperation
const x1: GqlMockOperation<
    GqlOperation<SomeGqlData, SomeGqlVariables>,
    GqlContext
> = matchGql(fakeOperation);

// should be ok, returns a GqlMockOperation
const x2: GqlMockOperation<
    GqlOperation<SomeGqlData, SomeGqlVariables>,
    GqlContext
> = matchGql(fakeOperation).withVariables({
    a: "string",
    b: 42,
});

// should be ok, returns a GqlMockOperation
const x3: GqlMockOperation<
    GqlOperation<SomeGqlData, SomeGqlVariables>,
    GqlContext
> = matchGql(fakeOperation).withContext({
    locale: "en",
});

// should error; not a valid operation
// @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'GqlOperation<any, any>'.
matchGql("not an operation");

// should error; invalid variables
matchGql(fakeOperation).withVariables({
    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    a: 42,
    b: 42,
});

// should error; invalid context
matchGql(fakeOperation).withContext({
    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    locale: 42,
});

// should error; invalid variables and context
matchGql(fakeOperation)
    .withVariables({
        // @ts-expect-error Type 'number' is not assignable to type 'string'.
        a: 42,
        b: 42,
    })
    .withContext({
        // @ts-expect-error Type 'number' is not assignable to type 'string'.
        locale: 42,
    });
