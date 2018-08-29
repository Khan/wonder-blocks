// @flow
import * as React from "react";

import {MEDIA_DEFAULT_SPEC} from "../util/specs.js";
import {MediaLayoutContext} from "../util/util.js";

import type {MediaSize, MediaSpec} from "../util/types.js";

type Props = {|
    /**
     * Force the MediaLayout to be a particular size (ignoring the actual
     * dimensions of the viewport).
     */
    overrideSize?: MediaSize,

    /**
     * Set the size of the MediaLayout to be rendered when doing SSR
     * (Server-Side Rendering) of the component.
     */
    ssrSize: MediaSize,

    /**
     * The spec of the possible sizes of the MediaLayout system. Used to define a
     * number of different layouts to display the layout at. Includes the number
     * of columns and the size of the margins and gutters are each size.
     */
    spec: MediaSpec,

    /** The contents of the page */
    children: React.Node,
|};

/**
 * A MediaLayout can wrap all parts of a page and initialize specific media layout
 * specifications or default sizes. MediaLayout doesn't impart any styling or
 * layout itself, all of that is deferred to the Layout component.
 *
 * If you're not specifying any properties to MediaLayout then you don't need to
 * use it, Layout will work automatically.
 *
 * Optionally you can specify the `size` of the layout. In doing so you will
 * disable all readjustments based on the size of the viewport (this property is
 * mostly used for testing).
 *
 * Additionally you can specify `ssrSize` which will render a specific size of
 * layout when this component is Server-Side Renderered. Defaults to "large".
 *
 * If you wish to use a different set of layout sizes you can specify them as
 * part of the `spec` property. The Core package exports a couple of the most
 * commonly used ones:
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
export default class MediaLayout extends React.Component<Props> {
    static defaultProps = {
        ssrSize: "large",
        spec: MEDIA_DEFAULT_SPEC,
    };

    render() {
        const {overrideSize, ssrSize, spec, children} = this.props;

        return (
            <MediaLayoutContext.Provider
                value={{
                    overrideSize,
                    ssrSize,
                    mediaSpec: spec,
                }}
            >
                {children}
            </MediaLayoutContext.Provider>
        );
    }
}
