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
// the only way to get a `Request` here is to polyfill one. undici is the
// implementation Node's own fetch globals come from, so these shims match
// native behavior exactly.
//
// undici expects a number of other web platform globals to exist when it
// loads (text codecs, streams, Blob/File, MessagePort), so those shims have
// to be in place before it is required. They all come from Node built-in
// modules, which the sandbox can still require.
const {ReadableStream, WritableStream, TransformStream} = require("stream/web");
const {Blob, File} = require("buffer");
const {MessagePort, MessageChannel} = require("worker_threads");
for (const [name, impl] of Object.entries({
    TextEncoder,
    TextDecoder,
    ReadableStream,
    WritableStream,
    TransformStream,
    Blob,
    File,
    MessagePort,
    MessageChannel,
})) {
    if (!globalThis[name]) {
        globalThis[name] = impl;
    }
}
const undici = require("undici");

StyleSheetTestUtils.suppressStyleInjection();

const attachShims = (targetWindow) => {
    if (!targetWindow.TextEncoder) {
        targetWindow.TextEncoder = TextEncoder;
    }
    if (!targetWindow.TextDecoder) {
        targetWindow.TextDecoder = TextDecoder;
    }
    if (!targetWindow.Request) {
        targetWindow.Request = undici.Request;
    }
    if (!targetWindow.Response) {
        targetWindow.Response = undici.Response;
    }
    if (!targetWindow.Headers) {
        targetWindow.Headers = undici.Headers;
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
