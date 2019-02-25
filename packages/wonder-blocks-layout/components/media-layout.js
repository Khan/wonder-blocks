// @flow
import * as React from "react";
import type {StyleDeclaration} from "aphrodite";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import MediaLayoutContext from "./media-layout-context.js";
import {VALID_MEDIA_SIZES} from "../util/specs.js";
import type {MediaSize, MediaSpec} from "../util/types.js";

// eslint-disable-next-line flowtype/require-exact-type
type MockStyleSheet = {
    [key: string]: StyleType,
};

type Props = {|
    /**
     * The contents to display. Alternatively, a function can be specified
     * that takes three arguments and should return some nodes to display.
     *
     *   - mediaSize: The current size of the viewport (small/medium/large)
     *   - mediaSpec: The current spec being used to manage the selection of
     *                the mediaSize.
     *   - styles: An Aphrodite stylesheet representing the current
     *                  stylesheet for this mediaSize (as specified in the
     *                  styleSheets prop).
     */
    children: ({
        mediaSize: MediaSize,
        mediaSpec: MediaSpec,
        styles: MockStyleSheet,
    }) => React.Node,

    /**
     * Aphrodite stylesheets to pass through to the styles prop. The
     * stylesheets to render is based on the media size. "all" is always
     * rendered.
     */
    styleSheets?: {
        all?: StyleDeclaration,
        mdOrLarger?: StyleDeclaration,
        mdOrSmaller?: StyleDeclaration,
        [mediaSize: MediaSize]: StyleDeclaration,
    },
|};

// If for some reason we're not able to resolve the current media size we
// fall back to this state.
const DEFAULT_SIZE = "large";

/**
 * MediaLayout is responsible for changing the rendering of contents at
 * differently sized viewports.  MediaLayoutContext.Provider can be used
 * to specific different breakpoint configurations.  By default it uses
 * MEDIA_DEFAULT_SPEC.
 */
export default class MediaLayout extends React.Component<
    Props,
    {
        size?: MediaSize,
    },
> {
    watchHandlers: {
        [query: string]: any,
    };

    static WATCHERS: {
        [query: string]: any,
    } = {};

    state = {
        size: undefined,
    };

    componentWillUnmount() {
        // We go through the component and remove all of the listeners
        // that getCurrentSize attached.
        for (const query of Object.keys(MediaLayout.WATCHERS)) {
            const watcher = MediaLayout.WATCHERS[query];
            if (watcher) {
                const handler = this.watchHandlers[query];
                watcher.removeListener(handler);
                delete this.watchHandlers[query];
            }
        }
    }

    getCurrentSize(spec: MediaSpec) {
        // If we have a state with the current size in it then we always want
        // to use that. This will happen if the viewport changes sizes after
        // we've already initialized.
        if (this.state.size) {
            return this.state.size;
        }

        // watchHandlers should never be undefined when state.size is also
        // undefined, but just in case we fall back to the default size
        if (this.watchHandlers) {
            return DEFAULT_SIZE;
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
            // TODO(kevinb): move this to componentWillMount
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
                return size;
            }
        }

        // If a size was never defined, or matched, then we return the default
        // media layout size
        return DEFAULT_SIZE;
    }

    // We assume that we're running on the server (or, at least, an unsupported
    // environment) if there is no window object or matchMedia function
    // available.
    isServerSide() {
        return typeof window === "undefined" || !window.matchMedia;
    }

    // Generate a mock Aphrodite StyleSheet based upon the current mediaSize
    // We do this by looking at all of the stylesheets specified in the
    // styleSheets prop and then all of the individual styles. We merge the
    // styles together
    getMockStyleSheet(mediaSize: MediaSize) {
        const {styleSheets} = this.props;

        const mockStyleSheet: MockStyleSheet = {};

        // If no stylesheets were specified then we just return an empty object
        if (!styleSheets) {
            return mockStyleSheet;
        }

        // Go through all of the stylesheets that were specified
        for (const styleSize of Object.keys(styleSheets)) {
            const styleSheet = styleSheets[styleSize];

            if (!styleSheet) {
                continue;
            }

            // And then through each key of each stylesheet
            for (const name of Object.keys(styleSheet)) {
                if (mockStyleSheet.hasOwnProperty(name)) {
                    continue;
                }

                // We create an entry that combines the values from all of
                // the stylesheets together in least-specific to most-specific
                // priority (thus small/medium/large styles will always have
                // precedence over "all" or mdOrSmaller/mdOrLarger/etc.).
                mockStyleSheet[name] = [
                    styleSheets.all && styleSheets.all[name],
                    mediaSize === "small" && [
                        styleSheets.mdOrSmaller &&
                            styleSheets.mdOrSmaller[name],
                        styleSheets.small && styleSheets.small[name],
                    ],
                    mediaSize === "medium" && [
                        styleSheets.mdOrSmaller &&
                            styleSheets.mdOrSmaller[name],
                        styleSheets.mdOrLarger && styleSheets.mdOrLarger[name],
                        styleSheets.medium && styleSheets.medium[name],
                    ],
                    mediaSize === "large" && [
                        styleSheets.mdOrLarger && styleSheets.mdOrLarger[name],
                        styleSheets.large && styleSheets.large[name],
                    ],
                ];
            }
        }

        return mockStyleSheet;
    }

    render() {
        const {children} = this.props;

        // We listen to the MediaLayoutContext to see what defaults we're
        // being given (this can be overriden by wrapping this component in
        // a MediaLayoutContext.Consumer).
        return (
            <MediaLayoutContext.Consumer>
                {({overrideSize, ssrSize, mediaSpec}) => {
                    // We need to figure out what the current media size is
                    // If an override has been specified, we use that.
                    // If we're rendering on the server then we use the default
                    // SSR rendering size.
                    // Otherwise we attempt to get the current size based on
                    // the current MediaSpec.
                    const mediaSize =
                        overrideSize ||
                        (this.isServerSide() && ssrSize) ||
                        this.getCurrentSize(mediaSpec);

                    // Generate a mock stylesheet
                    const styles = this.getMockStyleSheet(mediaSize);

                    return children({mediaSize, mediaSpec, styles});
                }}
            </MediaLayoutContext.Consumer>
        );
    }
}
