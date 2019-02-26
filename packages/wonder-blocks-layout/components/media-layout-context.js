// @flow
import * as React from "react";

import {MEDIA_DEFAULT_SPEC} from "../util/specs.js";
import type {MediaSize, MediaSpec} from "../util/types.js";

type Context = {|
    /**
     * Force the MediaLayout to be a particular size (ignoring the actual
     * dimensions of the viewport).
     */
    overrideSize?: MediaSize,

    /**
     * Set the size of the MediaLayout to be rendered when doing SSR
     * (Server-Side Rendering) of the component.  Defaults to "large".
     */
    ssrSize: MediaSize,

    /**
     * If you wish to use a different set of layout sizes you can specify them as
     * part of the `mediaSpec` property. The Core package exports a couple of the
     * most commonly used ones:
     *
     *  **Default Layout Spec (`MEDIA_DEFAULT_SPEC`)**
     *
     * | Size   | Columns | Gutter | Margin | Breakpoint                                                                                                                         |
     * | ------ | ------- | ------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
     * | small  | 4       | 16px   | 16px   | `max-width: 767px`                                                                                                                 |
     * | medium | 8       | 32px   | 24px   | `min-width: 768px and max-width: 1023px`                                                                                           |
     * | large  | 12      | 32px   | 24px   | `min-width: 1024px` (maximum content width: `1120px`, after which the margins will continue to expand and content remain centered) |
     *
     * Additionally, the following layout size specs are also available:
     *
     * **Internal Tools (`MEDIA_INTERNAL_SPEC`)**
     *
     * | Size  | Columns | Gutter | Margin | Breakpoint                                   |
     * | ----- | ------- | ------ | ------ | -------------------------------------------- |
     * | large | 12      | 32px   | 16px   | `min-width: 1px` (No maximum content width.) |
     *
     * **12-Column Modal (`MEDIA_MODAL_SPEC`)**
     *
     * | Size  | Columns | Gutter | Margin | Breakpoint                                     |
     * | ----- | ------- | ------ | ------ | ---------------------------------------------- |
     * | small | 4       | 16px   | 16px   | `max-width: 767px`                             |
     * | large | 12      | 32px   | 64px   | `min-width: 768px` (No maximum content width.) |
     */
    mediaSpec: MediaSpec,
|};

const defaultContext: Context = {
    ssrSize: "large",
    mediaSpec: MEDIA_DEFAULT_SPEC,
};

export default React.createContext<Context>(defaultContext);
