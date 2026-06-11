const {StyleSheetTestUtils} = require("aphrodite");

const {
    mockRequestAnimationFrame,
} = require("../../utils/testing/mock-request-animation-frame");
const {TextEncoder, TextDecoder} = require("util");
// React Router v6 data routers (createMemoryRouter) need the Fetch API
// `Request`/`Response`/`Headers` to run route `loader`s.
//
// Node itself provides these globals, but our tests run under
// jest-environment-jsdom: jest sandboxes the tests in a realm whose global
// object is the jsdom window, and that window doesn't implement the Fetch
// API. Node's native globals aren't reachable from inside that sandbox either
// (`global`, `globalThis`, and the realm global are all cut off from them), so
// the only way to get a `Request` here is to polyfill one. node-fetch provides
// spec-compatible implementations and is already a dependency.
const nodeFetch = require("node-fetch");

StyleSheetTestUtils.suppressStyleInjection();


const attachShims = (targetWindow) => {
    if (!targetWindow.TextEncoder) {
        targetWindow.TextEncoder = TextEncoder;
    }
    if (!targetWindow.TextDecoder) {
        targetWindow.TextDecoder = TextDecoder;
    }
    if (!targetWindow.Request) {
        targetWindow.Request = nodeFetch.Request;
    }
    if (!targetWindow.Response) {
        targetWindow.Response = nodeFetch.Response;
    }
    if (!targetWindow.Headers) {
        targetWindow.Headers = nodeFetch.Headers;
    }
};

const resetWindow = () => {
    attachShims(globalThis);
};
resetWindow();

beforeEach(() => {
    resetWindow();
    mockRequestAnimationFrame();
});
