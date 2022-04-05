// @flow

// We need a version of Response. When we're in Jest JSDOM environment or a
// version of Node that supports the fetch API (17 and up, possibly with
// --experimental-fetch flag), then we're good, but otherwise we need an
// implementation, so this uses node-fetch as a peer dependency and uses that
// to provide the implementation if we don't already have one.
export const ResponseImpl: typeof Response =
    typeof Response === "undefined" ? require("node-fetch").Response : Response;
