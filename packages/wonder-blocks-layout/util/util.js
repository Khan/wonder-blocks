// @flow

import * as React from "react";

import {MEDIA_DEFAULT_SPEC} from "./specs.js";

import type {MediaQuery, MediaSize, MediaSpec} from "./types.js";

type Context = {|
    overrideSize?: MediaSize,
    ssrSize: MediaSize,
    mediaSpec: MediaSpec,
|};

const defaultContext: Context = {
    ssrSize: "large",
    mediaSpec: MEDIA_DEFAULT_SPEC,
};

export const MediaLayoutContext = React.createContext<Context>(defaultContext);

export const queryMatchesSize = (mediaQuery: MediaQuery, mediaSize: MediaSize): boolean => {
    switch (mediaQuery) {
        case "all":
            return true;
        case "small":
            return mediaSize === "small";
        case "mdOrSmaller":
            return mediaSize === "medium" || mediaSize === "small";
        case "medium":
            return mediaSize === "medium";
        case "mdOrLarger":
            return mediaSize === "medium" || mediaSize === "large";
        case "large":
            return mediaSize === "large";
        default:
            throw new Error(`Unsupported mediaSize: ${mediaSize}`);
    }
}
