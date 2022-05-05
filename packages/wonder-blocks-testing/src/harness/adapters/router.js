// @flow
import * as React from "react";

import {StaticRouter, MemoryRouter, Route, Switch} from "react-router-dom";

import type {LocationShape, Location} from "react-router-dom";
import type {TestHarnessAdapter} from "../types.js";

type MemoryRouterProps = React.ElementConfig<typeof MemoryRouter>;

/**
 * Configuration for the withLocation test harness adapter.
 */
type Config =
    | $ReadOnly<
          | {|
                /**
                 * See MemoryRouter prop for initialEntries.
                 */
                initialEntries: MemoryRouterProps["initialEntries"],

                /**
                 * See MemoryRouter prop for initialIndex.
                 */
                initialIndex?: MemoryRouterProps["initialIndex"],

                /**
                 * See MemoryRouter prop for getUserConfirmation.
                 */
                getUserConfirmation?: MemoryRouterProps["getUserConfirmation"],

                /**
                 * A path match to use.
                 *
                 * When this is specified, the harnessed component will be
                 * rendered inside a `Route` handler with this path.
                 *
                 * If the path matches the location, then the route will
                 * render the component.
                 *
                 * If the path does not match the location, then the route
                 * will not render the component.
                 */
                path?: string,
            |}
          | {|
                /**
                 * The location to use.
                 */
                location: string | Location,

                /**
                 * Force the use of a StaticRouter, instead of MemoryRouter.
                 */
                forceStatic: true,

                /**
                 * A path match to use.
                 *
                 * When this is specified, the harnessed component will be
                 * rendered inside a `Route` handler with this path.
                 *
                 * If the path matches the location, then the route will
                 * render the component.
                 *
                 * If the path does not match the location, then the route
                 * will not render the component.
                 */
                path?: string,
            |}
          | {|
                /**
                 * The initial location to use.
                 */
                location: string | LocationShape,

                /**
                 * A path match to use.
                 *
                 * When this is specified, the harnessed component will be
                 * rendered inside a `Route` handler with this path.
                 *
                 * If the path matches the location, then the route will
                 * render the component.
                 *
                 * If the path does not match the location, then the route
                 * will not render the component.
                 */
                path?: string,
            |},
      >
    // The initial location to use.
    | string;

/**
 * The default configuration for this adapter.
 */
export const defaultConfig = {location: "/"};

const maybeWithRoute = (children: React.Node, path: ?string): React.Node => {
    if (path == null) {
        return children;
    }

    return (
        <Switch>
            <Route exact={true} path={path}>
                {children}
            </Route>
            <Route
                path="*"
                render={() => {
                    throw new Error(
                        "The configured path must match the configured location or your harnessed component will not render.",
                    );
                }}
            />
        </Switch>
    );
};

/**
 * Adapter that sets up a router and AppShell location-specific contexts.
 *
 * This allows you to ensure that components are being tested in the
 * AppShell world.
 *
 * NOTE(somewhatabstract): The AppShell component itself already does
 * the work of setting up routing and the AppShellContext and so using this
 * adapter with the App component will have zero-effect since AppShell will
 * override it.
 */
export const adapter: TestHarnessAdapter<Config> = (
    children: React.Node,
    config: Config,
): React.Element<any> => {
    if (typeof config === "string") {
        config = {
            location: config,
        };
    }

    // Wrap children with the various contexts and routes, as per the config.
    const wrappedWithRoute = maybeWithRoute(children, config.path);
    if (config.forceStatic) {
        /**
         * There may be times (SSR testing comes to mind) where we will be
         * really strict about not permitting client-side navigation events.
         */
        return (
            <StaticRouter location={config.location} context={{}}>
                {wrappedWithRoute}
            </StaticRouter>
        );
    }

    /**
     * OK, we must be OK with a memory router.
     *
     * There are two flavors of config for this. The easy one with just a
     * location, and the complex one for those gnarlier setups.
     *
     * First, the easy one.
     */
    if (typeof config.location !== "undefined") {
        return (
            <MemoryRouter initialEntries={[config.location]}>
                {wrappedWithRoute}
            </MemoryRouter>
        );
    }

    /**
     * If it's not the easy one, it should be the complex one.
     * Let's make sure we have good data (also keeps flow happy).
     */
    if (typeof config.initialEntries === "undefined") {
        throw new Error(
            "A location or initial history entries must be provided.",
        );
    }

    /**
     * What should happen if no entries were in the array?
     * It likely uses the root one anyway, but a consistent API is what
     * we want, so let's ensure we always have our default location at least.
     */
    const entries =
        config.initialEntries.length === 0
            ? [defaultConfig.location]
            : config.initialEntries;

    // Memory router doesn't allow us to pass maybe types in its flow types.
    // So let's build props then spread them.
    const routerProps: MemoryRouterProps = {
        initialEntries: entries,
    };
    if (config.initialIndex != null) {
        routerProps.initialIndex = config.initialIndex;
    }
    if (config.getUserConfirmation != null) {
        routerProps.getUserConfirmation = config.getUserConfirmation;
    }

    return <MemoryRouter {...routerProps}>{wrappedWithRoute}</MemoryRouter>;
};
