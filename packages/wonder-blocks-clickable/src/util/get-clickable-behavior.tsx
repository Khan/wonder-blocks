/**
 * Returns either the default ClickableBehavior or a router aware version.
 *
 * The router aware version is returned if the app supplies a router,
 * `skipClientNav` is not `true`, and `href` is an internal URL.
 *
 * The app supplies a router with `WonderBlocksRouterProvider`.
 */
import * as React from "react";

import {useWonderBlocksRouter} from "@khanacademy/wonder-blocks-config";

import ClickableBehavior from "../components/clickable-behavior";
import {isClientSideUrl} from "./is-client-side-url";

// Create a wrapper component that gets `navigate` from the app's router
function withRouter(Component: typeof ClickableBehavior) {
    function WithRouterWrapper(
        props: Omit<React.ComponentProps<typeof ClickableBehavior>, "navigate">,
    ) {
        const router = useWonderBlocksRouter();
        // @ts-expect-error Ignoring the type mismatch
        return <Component {...props} navigate={router?.navigate} />;
    }
    WithRouterWrapper.displayName = "withRouter(ClickableBehavior)";
    return WithRouterWrapper;
}

const ClickableBehaviorWithRouter = withRouter(ClickableBehavior);

export default function getClickableBehavior(
    /**
     * The URL to navigate to.
     */
    href?: string,
    /**
     * Should we skip the app's router and go to the page directly.
     */
    skipClientNav?: boolean,
    /**
     * Whether the app supplies a router.
     */
    inRouterContext?: boolean,
): typeof ClickableBehavior {
    if (
        inRouterContext &&
        skipClientNav !== true &&
        href &&
        isClientSideUrl(href)
    ) {
        return ClickableBehaviorWithRouter as unknown as typeof ClickableBehavior;
    }

    return ClickableBehavior;
}
