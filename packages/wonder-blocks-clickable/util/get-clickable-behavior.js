// @flow
/**
 * Returns either the default ClickableBehavior or a react-router aware version.
 *
 * The react-router aware version is returned if `router` is a react-router-dom
 * router, `skipClientNav` is not `true`, and `href` is an internal URL.
 *
 * The `router` can be accessed via this.context.router from a component rendered
 * as a descendant of a BrowserRouter.
 * See https://reacttraining.com/react-router/web/guides/basic-components.
 */
import * as React from "react";
import {withRouter} from "react-router-dom";

import ClickableBehavior from "../components/clickable-behavior.js";
import isExternalUrl from "./is-external-url.js";

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
): React.ComponentType<React.ElementConfig<typeof ClickableBehavior>> {
    if (router && skipClientNav !== true && href && !isExternalUrl(href)) {
        // We cast to `any` here since the type of ClickableBehaviorWithRouter
        // is slightly different from the return type of this function.
        // TODO(WB-1037): Always return the wrapped version once all routes have
        // been ported to the app-shell in webapp.
        return (ClickableBehaviorWithRouter: any);
    }

    return ClickableBehavior;
}
