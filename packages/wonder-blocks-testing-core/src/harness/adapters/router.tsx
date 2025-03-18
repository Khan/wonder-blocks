import * as React from "react";

import {MemoryRouter, Route, Routes, useLocation} from "react-router-dom";
import {StaticRouter} from "react-router-dom/server";

import type {LocationDescriptor} from "history";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {TestHarnessAdapter} from "../types";

type MemoryRouterProps = PropsFor<typeof MemoryRouter>;

/**
 * Configuration for the withLocation test harness adapter.
 */
type Config =
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
    // The initial location to use.
    | string;

/**
 * The default configuration for this adapter.
 */
export const defaultConfig = {location: "/"} as const;

const MaybeWithRoute = ({
    children,
    path,
    configLocation,
}: {
    children: React.ReactNode;
    path: string | null | undefined;
    configLocation: LocationDescriptor;
}): React.ReactElement => {
    const actualLocation = useLocation();
    const configuredLocation =
        typeof configLocation === "string"
            ? configLocation
            : configLocation.pathname;

    if (path == null) {
        return <>{children}</>;
    }

    return (
        <Routes>
            <Route path={path}>{children}</Route>
            <Route
                path="*"
                loader={() => {
                    throw new Error(
                        `The current location '${actualLocation.pathname}' ` +
                            `does not match the configured path '${path}'. ` +
                            `Did you provide the correct configured ` +
                            `location, '${configuredLocation}', or did the ` +
                            `routing lead to a different place than you ` +
                            `expected?`,
                    );
                }}
            />
        </Routes>
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

    if ("forceStatic" in config && config.forceStatic) {
        /**
         * There may be times (SSR testing comes to mind) where we will be
         * really strict about not permitting client-side navigation events.
         */
        return (
            <StaticRouter location={config.location}>
                <MaybeWithRoute
                    path={config.path}
                    configLocation={config.location}
                >
                    {children}
                </MaybeWithRoute>
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
                <MaybeWithRoute
                    path={config.path}
                    configLocation={config.location}
                >
                    {children}
                </MaybeWithRoute>
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

    return (
        <MemoryRouter {...routerProps}>
            <MaybeWithRoute
                path={config.path}
                configLocation={entries[config.initialIndex ?? 0]}
            >
                {children}
            </MaybeWithRoute>
        </MemoryRouter>
    );
};
