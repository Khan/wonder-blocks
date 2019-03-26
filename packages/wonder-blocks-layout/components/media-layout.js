// @flow
import * as React from "react";
import type {StyleDeclaration} from "aphrodite";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import MediaLayoutContext from "./media-layout-context.js";
import type {MediaSize, MediaSpec} from "../util/types.js";
import type {Context} from "./media-layout-context.js";

const queries = [
    // normal queries
    "(max-width: 767px)", // small
    "(min-width: 768px) and (max-width: 1023px)", // medium
    "(min-width: 1024px)", // large

    // internal tools
    "(min-width: 1px)", // large

    // modal queries
    "(max-width: 767px)", // small
    "(min-width: 768px)", // large
];

const MEDIA_QUERY_LISTS: {[key: string]: MediaQueryList} = {};

// eslint-disable-next-line flowtype/require-exact-type
export type MockStyleSheet = {
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

type State = {|
    size?: MediaSize,
|};

// If for some reason we're not able to resolve the current media size we
// fall back to this state.
const DEFAULT_SIZE = "large";

type CombinedProps = {|...Props, ...Context|};

/**
 * `MediaLayout` is responsible for changing the rendering of contents at
 * differently sized viewports.  `MediaLayoutContext.Provider` can be used
 * to specify different breakpoint configurations.  By default it uses
 * `MEDIA_DEFAULT_SPEC`.  See media-layout-context.js for additiional options.
 */
class MediaLayoutInternal extends React.Component<CombinedProps, State> {
    cleanupThunks: Array<() => void>;

    constructor(props: CombinedProps) {
        super(props);
        this.state = {
            size: undefined,
        };
        this.cleanupThunks = [];
    }

    componentDidMount() {
        // TODO(WB-534): handle changes to mediaSpec prop
        for (const [size, spec] of ((Object.entries(
            this.props.mediaSpec,
        ): any): Array<[MediaSize, {query: string}]>)) {
            const mql = MEDIA_QUERY_LISTS[spec.query];
            // during SSR there are no MediaQueryLists
            if (!mql) {
                continue;
            }
            const listener = (e) => {
                if (e.matches) {
                    this.setState({size});
                }
            };
            mql.addListener(listener);
            this.cleanupThunks.push(() => mql.removeListener(listener));
        }
    }

    componentWillUnmount() {
        this.cleanupThunks.map((thunk) => thunk());
    }

    getCurrentSize(spec: MediaSpec): MediaSize {
        // If we have a state with the current size in it then we always want
        // to use that. This will happen if the viewport changes sizes after
        // we've already initialized.
        if (this.state.size) {
            return this.state.size;
        } else {
            for (const [size, spec] of ((Object.entries(
                this.props.mediaSpec,
            ): any): Array<[MediaSize, {query: string}]>)) {
                const mql = MEDIA_QUERY_LISTS[spec.query];
                if (mql.matches) {
                    return size;
                }
            }
        }

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
    // TODO(WB-533): move to util.js to make it easier to test
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
        const {children, mediaSpec, ssrSize, overrideSize} = this.props;

        // We need to create the MediaQueryLists during the first render in order
        // to query whether any of them match.
        for (const query of queries) {
            if (!MEDIA_QUERY_LISTS[query] && !this.isServerSide()) {
                MEDIA_QUERY_LISTS[query] = window.matchMedia(query);
            }
        }

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
    }
}

// gen-snapshot-tests.js only understands `export default class ...`
export default class MediaLayout extends React.Component<Props> {
    render() {
        // We listen to the MediaLayoutContext to see what defaults we're
        // being given (this can be overriden by wrapping this component in
        // a MediaLayoutContext.Consumer).
        return (
            <MediaLayoutContext.Consumer>
                {({overrideSize, ssrSize, mediaSpec}) => (
                    <MediaLayoutInternal
                        {...this.props}
                        overrideSize={overrideSize}
                        ssrSize={ssrSize}
                        mediaSpec={mediaSpec}
                    />
                )}
            </MediaLayoutContext.Consumer>
        );
    }
}
