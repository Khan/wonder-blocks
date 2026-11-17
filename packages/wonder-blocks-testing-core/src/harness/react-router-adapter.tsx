import * as React from "react";
import {useInRouterContext, useNavigate} from "react-router-dom-v5-compat";

import {WonderBlocksRouterProvider} from "@khanacademy/wonder-blocks-config";
import type {RouterConfig} from "@khanacademy/wonder-blocks-config";

type Props = {
    children: React.ReactNode;
};

function Adapter({children}: Props) {
    const navigate = useNavigate();

    // `useNavigate` returns a new function on each location change. Keep the
    // supplied function stable so that consumers do not render again.
    const navigateRef = React.useRef(navigate);
    navigateRef.current = navigate;
    const stableNavigate = React.useCallback<RouterConfig["navigate"]>(
        (href, options) => navigateRef.current(href, options),
        [],
    );

    return (
        <WonderBlocksRouterProvider navigate={stableNavigate}>
            {children}
        </WonderBlocksRouterProvider>
    );
}

/**
 * Supply the surrounding React Router to Wonder Blocks components.
 *
 * Render it inside a React Router v6 (or `CompatRouter`) context. Outside one,
 * it renders `children` only.
 */
export function ReactRouterAdapter({children}: Props) {
    const inRouterContext = useInRouterContext();
    return inRouterContext ? <Adapter>{children}</Adapter> : <>{children}</>;
}
