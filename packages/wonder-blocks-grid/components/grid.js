// @flow
import * as React from "react";
import {View} from "wonder-blocks-core";

import styles from "../util/styles.js";
import {GRID_DEFAULT_SPEC, VALID_GRID_SIZES} from "../util/specs.js";
import {gridContextTypes} from "../util/utils.js";

import type {GridSize, GridSpec} from "../util/types.js";
import typeof Row from "./row.js";

type Props = {
    /**
     * Force the grid to be a particular size (ignoring the actual
     * dimensions of the viewport).
     */
    size?: GridSize,

    /**
     * Set the size of the grid to be rendered when doing SSR
     * (Server-Side Rendering) of the component.
     */
    ssrSize: GridSize,

    /**
     * The spec of the possible sizes of the grid system. Used to define a
     * number of different layouts to display the grid at. Includes the number
     * of columns and the size of the margins and gutters are each size.
     */
    spec: GridSpec,

    /** The `<Row>` components that will make up the grid */
    children: React.Node,
};

/**
 * A Grid wraps all parts of a grid and tracks the browser viewport, toggling
 * the layout of the grid based on viewport width changes. A Grid will hold
 * the [Row](#row) components used for rendering the grid. The grid doesn't
 * impart any styling or layout, all of that is deferred to the Rows and Cells.
 *
 * By default the Grid should be used with no properties. Optionally you can
 * specify the `size` of the Grid. In doing so you will disable all readjustments
 * based on the size of the viewport (this property is mostly used for testing).
 *
 * Additionally you can specify `ssrSize` which will render a specific size of
 * grid when this component is Server-Side Renderered. Defaults to "large".
 *
 * If you wish to use a different set of grid sizes you can specify them as
 * part of the `spec` property. The Grid package exports a couple of the most
 * commonly used ones:
 *
 *  * `GRID_DEFAULT_SPEC` (the default)
 *  * `GRID_INTERNAL_SPEC` (for internal tools)
 *  * `GRID_MODAL_12_SPEC` (12-column Modals)
 *  * `GRID_MODAL_11_SPEC` (11-column Modals)
 *  * `GRID_MODAL_8_SPEC` (8-column Modals)
 *
 * @version 1.0
 * @since 1.0
 */
export default class Grid extends React.Component<
    Props,
    {
        size: GridSize,
    },
> {
    static WATCHERS: {
        [query: string]: any,
    } = {};

    static defaultProps = {
        ssrSize: "large",
        spec: GRID_DEFAULT_SPEC,
    };

    watchHandlers: {
        [size: GridSize]: any,
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

        for (const size of VALID_GRID_SIZES) {
            // Skip sizes that aren't defined
            if (!spec[size]) {
                continue;
            }

            const {query} = spec[size];

            // Don't watch sizes that don't have an associated query
            if (!query) {
                continue;
            }

            // Create a new matchMedia watcher if one doesn't exist yet
            if (!Grid.WATCHERS[query]) {
                Grid.WATCHERS[query] = window.matchMedia(query);
            }

            const watcher = Grid.WATCHERS[query];

            // Attach a handler that watches for the change, saving a
            // references to it so we can remove it later
            const handler = (this.watchHandlers[size] = (e) => {
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
            throw new Error("Matching media query not found for Grid.");
        }
    }

    isServerSide() {
        return typeof window === "undefined" || !window.matchMedia;
    }

    componentWillUnmount() {
        if (this.isServerSide()) {
            return;
        }

        const {spec} = this.props;

        // We go through the component and remove all of the listeners
        // that this Grid attached.
        for (const size of VALID_GRID_SIZES) {
            // Skip sizes that aren't defined
            if (!spec[size]) {
                continue;
            }

            const {query} = spec[size];
            const watcher = Grid.WATCHERS[query];

            if (watcher) {
                const handler = this.watchHandlers[size];
                watcher.removeListener(handler);
                delete this.watchHandlers[size];
            }
        }
    }

    render() {
        return (
            <GridContext size={this.state.size} spec={this.props.spec}>
                {this.props.children}
            </GridContext>
        );
    }
}

/**
 * GridContext is used to set the Context for all descendent children
 * to be able to adjust their rendering based on the viewport size.
 */
class GridContext extends React.Component<{
    // The size of the grid to display (determined by the Grid component)
    size: GridSize,

    // The spec of the possible sizes of the grid to display (determined by
    // the Grid component)
    spec: GridSpec,

    // The Row components that will make up the grid
    children: React.Node,
}> {
    static childContextTypes = gridContextTypes;

    getChildContext() {
        return {
            gridSize: this.props.size,
            gridSpec: this.props.spec,
        };
    }

    render() {
        // TODO(jeresig): Switch to be a React.Fragment once we upgrade to
        // React 16.2+.
        return <View>{this.props.children}</View>;
    }
}
