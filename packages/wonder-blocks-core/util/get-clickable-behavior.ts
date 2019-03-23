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
import {withRouter} from "react-router-dom";

import ClickableBehavior from "../components/clickable-behavior";
import isExternalUrl from "./is-external-url";

const ClickableBehaviorWithRouter = withRouter<any>(ClickableBehavior);

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
) {
    if (router && skipClientNav !== true && href && !isExternalUrl(href)) {
        return ClickableBehaviorWithRouter;
    }

    return ClickableBehavior;
}
