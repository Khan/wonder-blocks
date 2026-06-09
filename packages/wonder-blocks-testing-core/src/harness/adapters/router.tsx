import * as React from "react";

import {StaticRouter, MemoryRouter, Switch, Route} from "react-router-dom";
import {
    CompatRouter,
    RouterProvider,
    createMemoryRouter,
    matchRoutes,
    useLocation,
} from "react-router-dom-v5-compat";

import type {LocationDescriptor} from "history";
import type {RouteObject} from "react-router-dom-v5-compat";
import type {TestHarnessAdapter} from "../types";

type MemoryRouterProps = JSX.LibraryManagedAttributes<
    typeof MemoryRouter,
    React.ComponentProps<typeof MemoryRouter>
>;

/**
 * The options accepted by `createMemoryRouter` (RR v6 data router).
 */
type DataRouterOptions = NonNullable<Parameters<typeof createMemoryRouter>[1]>;

/**
 * A single entry in a data router's `initialEntries` list.
 */
type InitialEntry = NonNullable<DataRouterOptions["initialEntries"]>[number];

/**
 * A tree of RR v6 route objects for the data-routes mode.
 */
type DataRoutes = ReadonlyArray<RouteObject>;

/**
 * Keys that only exist in data-routes mode.
 *
 * They are forbidden (typed as `never`) in context mode so the two modes can
 * never be combined: passing a context-mode `location` alongside `routes` is a
 * type error.
 */
type NotDataRoutes = {
    routes?: never;
    hydrationData?: never;
};

/**
 * Configuration for the data-routes mode of the `router` adapter.
 *
 * Selected by the presence of `routes`. Renders a RR v6 data router
 * (`createMemoryRouter` + `RouterProvider`) so that route `loader`s run and
 * `errorElement`s render — unlike context mode, which only provides routing
 * context.
 */
type DataRoutesConfig = {
    /**
     * The RR v6 route tree to render.
     *
     * Provide either:
     *
     * - A function `(children) => routes` for full control over where the
     *   harnessed component is mounted (e.g. as a route's `errorElement`).
     * - An array of route objects, in which case the harnessed component is
     *   mounted as the `element` of the route that matches the initial
     *   location. In this form the matched leaf route must not define its own
     *   `element`.
     */
    routes: DataRoutes | ((children: React.ReactNode) => DataRoutes);
    /**
     * The initial history entries for the data router.
     *
     * Defaults to the adapter's default location when absent or empty.
     */
    initialEntries?: DataRouterOptions["initialEntries"];
    /**
     * The index of `initialEntries` to render first.
     */
    initialIndex?: DataRouterOptions["initialIndex"];
    /**
     * Pre-resolved loader data and errors.
     *
     * When provided, the data router starts already initialized: route
     * `loader`s do not run and the tree renders synchronously. This is the
     * robust choice for asserting on loader-resolved or error states, as it
     * avoids running loaders (which require the Fetch API in the test
     * environment) and the associated render loop.
     *
     * NOTE: This is the data-routes analog of context mode's `forceStatic`.
     * The server data-router APIs (`createStaticHandler`/`createStaticRouter`/
     * `StaticRouterProvider`) aren't reachable through `react-router-dom-v5-compat`,
     * so `hydrationData` provides the same "pre-resolved, synchronous, no
     * loaders run" guarantee that `forceStatic` provides in context mode.
     */
    hydrationData?: DataRouterOptions["hydrationData"];
    /**
     * Context-mode-only keys, forbidden here so the two modes can't mix.
     *
     * `forceStatic`/`disableCompatRouter` are context-router concepts;
     * data-routes mode uses `hydrationData` for pre-resolved rendering instead.
     */
    location?: never;
    path?: never;
    forceStatic?: never;
    disableCompatRouter?: never;
};

/**
 * Configuration for the router test harness adapter.
 *
 * There are two modes, selected purely by the shape of the config:
 *
 * - Context mode (a location string / `{location}` / `{initialEntries}`)
 *   renders a `MemoryRouter` or `StaticRouter` around the harnessed component.
 *   Use it for components that consume routing (`useNavigate`, `useParams`,
 *   `<Link>`). This is the common case.
 * - Data-routes mode (a config including `routes`) renders a RR v6 data router
 *   (`createMemoryRouter` + `RouterProvider`). Use it when a route `loader` or
 *   `errorElement` needs to run for the test.
 */
type Config =
    | Readonly<
          | (NotDataRoutes & {
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
            })
          | (NotDataRoutes & {
                /**
                 * The location to use.
                 */
                location: LocationDescriptor;
                /**
                 * Force the use of a StaticRouter, instead of MemoryRouter.
                 */
                forceStatic: true;
                /**
                 * If true, then we will not use a CompatRouter.
                 *
                 * NOTE(john): There are cases where we don't want a CompatRouter
                 * here as it uses useLayoutEffect, which causes issues in our
                 * test environment. Namely, that it generates a warning about
                 * the use of useLayoutEffect, which causes an error.
                 */
                disableCompatRouter?: boolean;
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
            })
          | (NotDataRoutes & {
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
            })
          | DataRoutesConfig
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
    if (path == null) {
        return <>{children}</>;
    }

    const ErrorElement = () => {
        const actualLocation = useLocation();
        const configuredLocation =
            typeof configLocation === "string"
                ? configLocation
                : configLocation.pathname;
        const errorMessage =
            `The current location '${actualLocation.pathname}' ` +
            `does not match the configured path '${path}'. ` +
            `Did you provide the correct configured ` +
            `location, '${configuredLocation}', or did the ` +
            `routing lead to a different place than you ` +
            `expected?`;
        throw new Error(errorMessage);
    };

    // NOTE(john): We want to use a Switch here because we want to ensure that
    // we're still rendering RRv5-style routes. If we were to use Routes here
    // then we would be rendering RRv6-style routes and that would break any
    // usage of RRv5-style APIs happening inside the component we're testing.
    // When we fully adopt v6, we can (and must) switch to using Routes.
    return (
        <Switch>
            <Route path={path} render={() => <>{children}</>} />
            <Route path="*" component={ErrorElement} />
        </Switch>
    );
};

/**
 * Describe a location entry for use in error messages.
 */
const describeLocation = (location: InitialEntry): string =>
    typeof location === "string" ? location : (location.pathname ?? "");

/**
 * Mount the harnessed component into an array of route objects.
 *
 * The component is placed as the `element` of the route that matches the
 * initial location, with the rest of the array supplying ancestors/siblings
 * (loaders, `errorElement`s, …).
 *
 * @throws If no route matches the location, or if the matched leaf route
 * already defines its own `element`. In either case the function form of
 * `routes` should be used for full control.
 */
const injectChildrenIntoRoutes = (
    routes: DataRoutes,
    children: React.ReactNode,
    location: InitialEntry,
): Array<RouteObject> => {
    const matches = matchRoutes(routes as Array<RouteObject>, location);
    if (matches == null || matches.length === 0) {
        throw new Error(
            `No route in \`routes\` matches the location ` +
                `'${describeLocation(location)}'. In array \`routes\` mode the ` +
                `harnessed component is mounted as the matched leaf route's ` +
                `\`element\`, so a route must match the location. Use the ` +
                `function form \`routes: (children) => [...]\` to place the ` +
                `component yourself.`,
        );
    }

    const leafRoute = matches[matches.length - 1].route;
    const element = <>{children}</>;

    const cloneWithChildren = (routeList: DataRoutes): Array<RouteObject> =>
        routeList.map((route): RouteObject => {
            if (route === leafRoute) {
                if (route.element != null) {
                    throw new Error(
                        `The route matching the location already defines an ` +
                            `\`element\`. In array \`routes\` mode the harnessed ` +
                            `component is mounted there, so the matched leaf must ` +
                            `not set its own \`element\`. Use the function form ` +
                            `\`routes: (children) => [...]\` for full control.`,
                    );
                }
                return {...route, element};
            }
            if (route.children != null) {
                return {...route, children: cloneWithChildren(route.children)};
            }
            return {...route};
        });

    return cloneWithChildren(routes);
};

/**
 * Render the harnessed component inside a RR v6 data router.
 *
 * This is the data-routes mode of the adapter: it exercises route `loader`s,
 * `errorElement`s, `useRouteError`/`useLoaderData`, redirects, and deferred
 * data, none of which the context-mode routers can do.
 */
const renderDataRoutes = (
    children: React.ReactNode,
    config: DataRoutesConfig,
): React.ReactElement => {
    // Default/normalize the initial history entries, mirroring the
    // context-mode behaviour: an absent or empty list falls back to the
    // default location.
    const initialEntries: NonNullable<DataRouterOptions["initialEntries"]> =
        config.initialEntries == null || config.initialEntries.length === 0
            ? [defaultConfig.location]
            : config.initialEntries;

    // Resolve the route tree, placing the harnessed component into it.
    const routes =
        typeof config.routes === "function"
            ? [...config.routes(children)]
            : injectChildrenIntoRoutes(
                  config.routes,
                  children,
                  initialEntries[
                      config.initialIndex ?? initialEntries.length - 1
                  ],
              );

    // Data routers run `loader`s using the Fetch API, whose `Request` global
    // isn't available in every test environment (e.g. jsdom). When loaders
    // will actually run (i.e. there's no pre-resolved `hydrationData`), surface
    // a clear, actionable error instead of a cryptic `Request is not defined`.
    if (config.hydrationData == null && typeof Request === "undefined") {
        throw new Error(
            "Data-routes mode runs route `loader`s, which require the Fetch " +
                "API `Request` global. Polyfill `Request`/`Response` in your " +
                "test environment, or pass `hydrationData` to pre-resolve " +
                "loaders without running them.",
        );
    }

    const router = createMemoryRouter(routes, {
        initialEntries,
        ...(config.initialIndex != null
            ? {initialIndex: config.initialIndex}
            : {}),
        ...(config.hydrationData != null
            ? {hydrationData: config.hydrationData}
            : {}),
    });

    return <RouterProvider router={router} />;
};

/**
 * Whether a config selects the data-routes mode.
 */
const isDataRoutesConfig = (
    config: Exclude<Config, string>,
): config is DataRoutesConfig =>
    "routes" in config && (config as DataRoutesConfig).routes != null;

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

    /**
     * Data-routes mode is selected purely by the presence of `routes`. It
     * renders a RR v6 data router so that loaders and errorElements run.
     */
    if (isDataRoutesConfig(config)) {
        return renderDataRoutes(children, config);
    }

    if ("forceStatic" in config && config.forceStatic) {
        /**
         * There may be times (SSR testing comes to mind) where we will be
         * really strict about not permitting client-side navigation events.
         */
        if (config.disableCompatRouter) {
            return (
                <StaticRouter location={config.location} context={{}}>
                    <MaybeWithRoute
                        path={config.path}
                        configLocation={config.location}
                    >
                        {children}
                    </MaybeWithRoute>
                </StaticRouter>
            );
        }

        return (
            <StaticRouter location={config.location} context={{}}>
                <CompatRouter>
                    <MaybeWithRoute
                        path={config.path}
                        configLocation={config.location}
                    >
                        {children}
                    </MaybeWithRoute>
                </CompatRouter>
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
                <CompatRouter>
                    <MaybeWithRoute
                        path={config.path}
                        configLocation={config.location}
                    >
                        {children}
                    </MaybeWithRoute>
                </CompatRouter>
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
            <CompatRouter>
                <MaybeWithRoute
                    path={config.path}
                    configLocation={entries[config.initialIndex ?? 0]}
                >
                    {children}
                </MaybeWithRoute>
            </CompatRouter>
        </MemoryRouter>
    );
};
