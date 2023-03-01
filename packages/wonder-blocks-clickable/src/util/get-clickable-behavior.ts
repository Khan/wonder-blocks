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
import {withRouter} from "react-router-dom";

import ClickableBehavior from "../components/clickable-behavior";
import {isClientSideUrl} from "./is-client-side-url";

// @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'typeof ClickableBehavior' is not assignable to parameter of type 'ComponentType<RouteComponentProps<any, StaticContext, unknown>>'.
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
): React.ComponentType<
    JSX.LibraryManagedAttributes<
        typeof ClickableBehavior,
        React.ComponentProps<typeof ClickableBehavior>
    >
> {
    if (router && skipClientNav !== true && href && isClientSideUrl(href)) {
        // We cast to `any` here since the type of ClickableBehaviorWithRouter
        // is slightly different from the return type of this function.
        // TODO(WB-1037): Always return the wrapped version once all routes have
        // been ported to the app-shell in webapp.
        return ClickableBehaviorWithRouter as any;
    }

    // @ts-expect-error [FEI-5019] - TS2322 - Type 'typeof ClickableBehavior' is not assignable to type 'ComponentType<Pick<Props, "children" | "href" | "tabIndex" | "role" | "target" | "type" | "rel" | "onKeyDown" | "onKeyUp" | "onClick" | "history" | "skipClientNav" | "safeWithNav" | "beforeNav"> & InexactPartial<...> & InexactPartial<...>>'.
    return ClickableBehavior;
}
