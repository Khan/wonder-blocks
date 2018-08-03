// @flow
import * as React from "react";

import {MEDIA_DEFAULT_SPEC, VALID_MEDIA_SIZES} from "../util/specs.js";
import {mediaContextTypes} from "../util/util.js";

import type {MediaSize, MediaSpec} from "../util/types.js";

type Props = {|
    /**
     * Force the MediaLayout to be a particular size (ignoring the actual
     * dimensions of the viewport).
     */
    size?: MediaSize,

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
 * A MediaLayout wraps all parts of a page and tracks the browser viewport, toggling
 * the layout of the page based on viewport width changes. MediaLayout doesn't
 * impart any styling or layout, all of that is deferred to individual components
 * such as Row, Cell, FlexCell, and FixedWidthCell - or custom ones defined with
 * View or Text.
 *
 * By default the MediaLayout should be used with no properties. Optionally you can
 * specify the `size` of the layout. In doing so you will disable all readjustments
 * based on the size of the viewport (this property is mostly used for testing).
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
export default class MediaLayout extends React.Component<
    Props,
    {
        size: MediaSize,
    },
> {
    watchHandlers: {
        [query: string]: any,
    };

    static WATCHERS: {
        [query: string]: any,
    } = {};

    static defaultProps = {
        ssrSize: "large",
        spec: MEDIA_DEFAULT_SPEC,
    };

    constructor(props: Props) {
        super(props);

        const {ssrSize, size, spec} = props;

        // If a size was explicitly defined then we use that
        if (size) {
            this.state = {size};
            return;
        }

        // If we're rendering this on the server then we use the server-side
        // size (which defaults to "large")
        if (ssrSize && this.isServerSide()) {
            this.state = {
                size: ssrSize,
            };
            return;
        }

        // We then go through and set up matchMedia watchers for each breakpoint
        // (if they haven't been created already) and we add listeners to
        // watch for when the viewport changes size.
        this.watchHandlers = {};

        for (const size of VALID_MEDIA_SIZES) {
            if (!spec[size]) {
                continue;
            }

            const {query} = spec[size];

            // Don't watch sizes that don't have an associated query
            if (!query) {
                continue;
            }

            // Create a new matchMedia watcher if one doesn't exist yet
            if (!MediaLayout.WATCHERS[query]) {
                MediaLayout.WATCHERS[query] = window.matchMedia(query);
            }

            const watcher = MediaLayout.WATCHERS[query];

            // Attach a handler that watches for the change, saving a
            // references to it so we can remove it later
            const handler = (this.watchHandlers[query] = (e) => {
                if (e.matches) {
                    this.setState({size});
                }
            });

            watcher.addListener(handler);

            // If the watcher already matches then we set the size immediately
            if (watcher.matches) {
                this.state = {size};
            }
        }

        // If a size was never defined, or matched, then we complain!
        if (!this.state || !this.state.size) {
            throw new Error("Matching media query not found for MediaLayout.");
        }
    }

    componentWillUnmount() {
        if (this.isServerSide()) {
            return;
        }

        // We go through the component and remove all of the listeners
        // that this MediaLayout attached.
        for (const query of Object.keys(MediaLayout.WATCHERS)) {
            const watcher = MediaLayout.WATCHERS[query];
            if (watcher) {
                const handler = this.watchHandlers[query];
                watcher.removeListener(handler);
                delete this.watchHandlers[query];
            }
        }
    }

    isServerSide() {
        return typeof window === "undefined" || !window.matchMedia;
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {ssrSize, size, children, ...otherProps} = this.props;
        return (
            <MediaLayoutContext {...otherProps} size={this.state.size}>
                {children}
            </MediaLayoutContext>
        );
    }
}

/**
 * MediaLayoutContext is used to set the Context for all descendent children
 * to be able to adjust their rendering based on the viewport size.
 */
class MediaLayoutContext extends React.Component<{
    // The size of the layout to display (determined by the MediaLayout component)
    size: MediaSize,

    // The spec of the possible sizes of the layout to display (determined by
    // the MediaLayout component)
    spec: MediaSpec,

    // The components that will make up the layout
    children: React.Node,
}> {
    static childContextTypes = mediaContextTypes;

    getChildContext() {
        return {
            mediaSize: this.props.size,
            mediaSpec: this.props.spec,
        };
    }

    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}
