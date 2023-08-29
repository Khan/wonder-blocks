import * as React from "react";

import {RenderState, RenderStateContext} from "./render-state-context";
import {useRenderState} from "../hooks/use-render-state";

const {useEffect, useState} = React;

type Props = {
    children: React.ReactNode;
    /**
     * Whether the component should throw when nested.  Defaults to `true`.
     */
    throwIfNested?: boolean;
};

const RenderStateRoot = ({
    children,
    throwIfNested = true,
}: Props): React.ReactElement => {
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const renderState = useRenderState();
    useEffect(() => {
        setFirstRender(false);
    }, []); // This effect will only run once.

    if (renderState !== RenderState.Root) {
        if (throwIfNested) {
            throw new Error(
                "There's already a <RenderStateRoot> above this instance in " +
                    "the render tree.  This instance should be removed.",
            );
        }
        // Avoid rendering multiple providers if this RenderStateRoot
        // is nested inside another one.
        return <>{children}</>;
    }

    const value = firstRender ? RenderState.Initial : RenderState.Standard;

    return (
        <RenderStateContext.Provider value={value}>
            {children}
        </RenderStateContext.Provider>
    );
};

export {RenderStateRoot};
