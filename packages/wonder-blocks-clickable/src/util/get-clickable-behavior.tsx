/**
 * Returns either the default ClickableBehavior or a react-router aware version.
 *
 * The react-router aware version is returned if `router` is a react-router-dom
 * router, `skipClientNav` is not `true`, and `href` is an internal URL.
 *
 * The `router` can be accessed via __RouterContext (imported from 'react-router')
 * from a component rendered as a descendant of a BrowserRouter.
 * See https://reacttraining.com/react-router/web/guides/basic-components.
 */
import * as React from "react";
import {useNavigate} from "react-router-dom-v5-compat";

import ClickableBehavior from "../components/clickable-behavior";
import {isClientSideUrl} from "./is-client-side-url";

// Create a wrapper component that uses useNavigate
function withRouter(Component: typeof ClickableBehavior) {
    function WithRouterWrapper(
        props: Omit<React.ComponentProps<typeof ClickableBehavior>, "navigate">,
    ) {
        const navigate = useNavigate();
        // @ts-expect-error Ignoring the type mismatch
        return <Component {...props} navigate={navigate} />;
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
     * Should we skip using the react router and go to the page directly.
     */
    skipClientNav?: boolean,
    /**
     * router object added to the React context object by react-router-dom.
     */
    router?: any,
): typeof ClickableBehavior {
    if (router && skipClientNav !== true && href && isClientSideUrl(href)) {
        return ClickableBehaviorWithRouter as unknown as typeof ClickableBehavior;
    }

    return ClickableBehavior;
}
