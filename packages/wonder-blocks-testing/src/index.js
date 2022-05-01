// @flow

// Fixtures framework
export * as fixtureAdapters from "./fixtures/adapters/adapters.js";
export {fixtures} from "./fixtures/fixtures.js";
export {setup as setupFixtures} from "./fixtures/setup.js";
export type {
    CustomMountProps,
    FixturesAdapter,
    FixturesAdapterFactory,
    FixturesAdapterFixtureOptions,
    FixturesAdapterGroup,
    FixturesAdapterGroupOptions,
    FixturesAdapterOptions,
    FixturesConfiguration,
    FixturesOptions,
    GetPropsOptions,
} from "./fixtures/types.js";

// Fetch mocking framework
export {mockFetch} from "./fetch/mock-fetch.js";
export {mockGqlFetch} from "./gql/mock-gql-fetch.js";
export {RespondWith} from "./make-mock-response.js";
export type {MockResponse} from "./make-mock-response.js";
export type {FetchMockFn, FetchMockOperation} from "./fetch/types.js";
export type {GqlFetchMockFn, GqlMockOperation} from "./gql/types.js";

// Test harness framework
export * from "./harness/types.js";
export * as harnessAdapters from "./harness/adapters/adapters.js";
export {makeHookHarness} from "./harness/make-hook-harness.js";
export {makeTestHarness} from "./harness/make-test-harness.js";
export {hookHarness} from "./harness/hook-harness.js";
export {testHarness} from "./harness/test-harness.js";
