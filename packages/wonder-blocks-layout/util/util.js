// @flow

import * as React from "react";

import {MEDIA_DEFAULT_SPEC} from "./specs.js";

import type {MediaSize, MediaSpec} from "./types.js";

const defaultContext: {
    overrideSize?: MediaSize,
    ssrSize: MediaSize,
    mediaSpec: MediaSpec,
} = {
    ssrSize: "large",
    mediaSpec: MEDIA_DEFAULT_SPEC,
};

export const MediaLayoutContext = React.createContext(defaultContext);

export const matchesSize = (
    {
        small,
        medium,
        large,
        mdOrLarger,
        mdOrSmaller,
    }: {
        small: boolean,
        medium: boolean,
        large: boolean,
        mdOrLarger: boolean,
        mdOrSmaller: boolean,
    },
    mediaSize: MediaSize,
) =>
    (small && mdOrSmaller && mediaSize === "small") ||
    (medium && mdOrSmaller && mdOrLarger && mediaSize === "medium") ||
    (large && mdOrLarger && mediaSize === "large");
