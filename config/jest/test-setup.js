const {StyleSheetTestUtils} = require("aphrodite");

const {
    mockRequestAnimationFrame,
} = require("../../utils/testing/mock-request-animation-frame");
const {TextEncoder, TextDecoder} = require("util");
// The Fetch API isn't provided by jsdom, but React Router v6 data routers
// (createMemoryRouter) need it to run route `loader`s. node-fetch provides
// spec-compatible implementations.
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
