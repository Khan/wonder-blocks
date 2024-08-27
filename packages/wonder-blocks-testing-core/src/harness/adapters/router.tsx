import * as React from "react";

import {StaticRouter, MemoryRouter, Route, Switch} from "react-router-dom";

import type {LocationDescriptor} from "history";
import type {TestHarnessAdapter} from "../types";

type MemoryRouterProps = JSX.LibraryManagedAttributes<
    typeof MemoryRouter,
    React.ComponentProps<typeof MemoryRouter>
>;

/**
 * Configuration for the withLocation test harness adapter.
 */
type Config = // The initial location to use.

        | Readonly<
              | {
                    /**
                     * See MemoryRouter prop for initialEntries.
                     */
                    initialEntries: MemoryRouterProps["initialEntries"];
                    /**
                     * See MemoryRouter prop for initialIndex.
                     */
                    initialIndex?: MemoryRouterProps["initialIndex"];
                    /**
                     * See MemoryRouter prop for getUserConfirmation.
                     */
                    getUserConfirmation?: MemoryRouterProps["getUserConfirmation"];
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
                    path?: string;
                }
              | {
                    /**
                     * The location to use.
                     */
                    location: LocationDescriptor;
                    /**
                     * Force the use of a StaticRouter, instead of MemoryRouter.
                     */
                    forceStatic: true;
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
                    path?: string;
                }
              | {
                    /**
                     * The initial location to use.
                     */
                    location: LocationDescriptor;
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
                    path?: string;
                }
          >
        | string;

/**
 * The default configuration for this adapter.
 */
export const defaultConfig = {location: "/"} as const;

const maybeWithRoute = (
    children: React.ReactNode,
    path?: string | null,
): React.ReactElement => {
    if (path == null) {
        return <>{children}</>;
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
    children: React.ReactNode,
    config: Config,
): React.ReactElement<any> => {
    if (typeof config === "string") {
        config = {
            location: config,
        };
    }

    // Wrap children with the various contexts and routes, as per the config.
    const wrappedWithRoute = maybeWithRoute(children, config.path);
    if ("forceStatic" in config && config.forceStatic) {
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
    if ("location" in config && config.location !== undefined) {
        return (
            <MemoryRouter initialEntries={[config.location]}>
                {wrappedWithRoute}
            </MemoryRouter>
        );
    }

    /**
     * If it's not the easy one, it should be the complex one.
     * Let's make sure we have good data (also keeps TypeScript happy).
     */
    if (!("initialEntries" in config) || config.initialEntries === undefined) {
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

    // Memory router doesn't allow us to pass maybe types in its TypeScript types.
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
