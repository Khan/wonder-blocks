// Fetch mocking framework
export {mockFetch} from "./fetch/mock-fetch";
export {mockRequester} from "./mock-requester";
export {RespondWith} from "./respond-with";
export {SettleController} from "./settle-controller";
export type {MockResponse} from "./respond-with";
export type {FetchMockFn, FetchMockOperation} from "./fetch/types";
export type {
    GraphQLJson,
    MockFn,
    OperationMock,
    OperationMatcher,
    MockOperationFn,
    MockConfiguration,
    ConfigureFn,
} from "./types";

// Test harness framework
export * from "./harness/types";
export * as harnessAdapters from "./harness/adapters/adapters";
// The router adapter's config type is exported so that packages depending on
// the harness can name it. Its data-routes mode references React Router types
// that can't be inlined portably, so without this export their generated type
// definitions would import it from this package's source.
export type {Config as RouterAdapterConfig} from "./harness/adapters/router";
export {makeHookHarness} from "./harness/make-hook-harness";
export {makeTestHarness} from "./harness/make-test-harness";
export {hookHarness} from "./harness/hook-harness";
export {testHarness} from "./harness/test-harness";

// React testing utilities
export {renderHookStatic} from "./render-hook-static";
