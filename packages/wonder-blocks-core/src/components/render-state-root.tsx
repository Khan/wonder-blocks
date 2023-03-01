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

const RenderStateRoot: React.FC<Props> = ({
    children,
    throwIfNested,
}): React.ReactElement => {
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
        // @ts-expect-error [FEI-5019] - TS2322 - Type 'ReactNode' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
        return children;
    }

    const value = firstRender ? RenderState.Initial : RenderState.Standard;

    return (
        <RenderStateContext.Provider value={value}>
            {children}
        </RenderStateContext.Provider>
    );
};

// We can set `defaultProps` on a functional component if we move the `export` to appear
// afterwards.
RenderStateRoot.defaultProps = {
    throwIfNested: true,
};

export {RenderStateRoot};
