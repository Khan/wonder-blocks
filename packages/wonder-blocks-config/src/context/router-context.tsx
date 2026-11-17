import * as React from "react";
import {useContext, useMemo} from "react";

/**
 * Options for a client-side navigation.
 */
export type NavigateOptions = {
    /**
     * Wrap the navigation in a View Transition, if the router supports it.
     */
    viewTransition?: boolean;
    /**
     * State to attach to the next location, if the router supports it.
     */
    state?: unknown;
};

/**
 * The routing contract between Wonder Blocks components and the app's router.
 *
 * The app implements it with the router it uses. Wonder Blocks components
 * never import a router.
 */
export type RouterConfig = {
    /**
     * Navigate to `href` without a full page load.
     */
    navigate: (href: string, options?: NavigateOptions) => void;
    /**
     * Return the value for the `href` attribute of a link to `href`.
     *
     * Supply this when the router changes hrefs, e.g. to add a basename.
     */
    resolveHref?: (href: string) => string;
};

/**
 * Context for the app's router.
 *
 * `null` when the app supplies no router. Wonder Blocks components then do
 * full page navigation.
 */
export const WonderBlocksRouterContext =
    React.createContext<RouterConfig | null>(null);
WonderBlocksRouterContext.displayName = "WonderBlocksRouterContext";

type Props = React.PropsWithChildren<RouterConfig>;

/**
 * Provide the app's router to Wonder Blocks components.
 *
 * Render it where the router is available. For a router that exposes
 * navigation only through hooks, that is inside the router.
 *
 * ```tsx
 * const navigate = useNavigate();
 *
 * <WonderBlocksRouterProvider navigate={navigate}>
 *     <App />
 * </WonderBlocksRouterProvider>
 * ```
 */
export function WonderBlocksRouterProvider({
    children,
    navigate,
    resolveHref,
}: Props) {
    const value = useMemo(
        () => ({navigate, resolveHref}),
        [navigate, resolveHref],
    );

    return (
        <WonderBlocksRouterContext.Provider value={value}>
            {children}
        </WonderBlocksRouterContext.Provider>
    );
}

/**
 * Get the app's router.
 *
 * @returns The router, or `null` if the app supplies none.
 */
export const useWonderBlocksRouter = () =>
    useContext(WonderBlocksRouterContext);
