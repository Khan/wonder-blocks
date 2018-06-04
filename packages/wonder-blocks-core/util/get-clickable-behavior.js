// @flow
/**
 * Returns either the default ClickableBehavior or a react-router aware version.
 *
 * The react-router aware version is return if the following conditions are met:
 *
 * - `href` is an external URL
 * - `clientNav` is `true`
 * - `router` is a react-router-dom router.
 *
 * The `router` can be accessed via this.context.router from a component rendered
 * as a descendant of a BrowserRouter.
 * See https://reacttraining.com/react-router/web/guides/basic-components.
 */
import {withRouter} from "react-router-dom";

import ClickableBehavior from "../components/clickable-behavior.js";

function isExternalUrl(url: string) {
    return /^https?:\/\//i.test(url);
}

const ClickableBehaviorWithRouter = withRouter(ClickableBehavior);

export default function getClickableBehavior(
    href?: string,
    clientNav?: boolean,
    /**
     * router object added to the React context object by react-router-dom.
     */
    router: any,
) {
    if (!href) {
        return ClickableBehavior;
    } else if (isExternalUrl(href)) {
        return ClickableBehavior;
    } else if (clientNav != null) {
        if (clientNav) {
            return ClickableBehaviorWithRouter;
        } else {
            return ClickableBehavior;
        }
    } else if (router) {
        return ClickableBehaviorWithRouter;
    } else {
        return ClickableBehavior;
    }
}
