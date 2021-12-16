// @flow
import * as React from "react";

// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
import {RenderState, RenderStateContext} from "./render-state-context.js";

const {useContext, useEffect, useState} = React;

type Props = {|
    children: React.Node,

    /**
     * Whether the component should throw when nested.  Defaults to `true`.
     */
    throwIfNested?: boolean,
|};

export const RenderStateRoot = ({
    children,
    throwIfNested,
}: Props): React.Node => {
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const contextValue = useContext(RenderStateContext);
    useEffect(() => {
        setFirstRender(false);
    }, []); // This effect will only run once.

    if (contextValue !== RenderState.Root) {
        if (throwIfNested) {
            throw new Error(
                "There's already a <RenderStateRoot> above this instance in " +
                    "the render tree.  This instance should be removed.",
            );
        }
        // Avoid rendering multiple providers if this RenderStateRoot
        // is nested inside another one.
        return children;
    }

    const value = firstRender ? RenderState.Initial : RenderState.Standard;

    return (
        <RenderStateContext.Provider value={value}>
            {children}
        </RenderStateContext.Provider>
    );
};

RenderStateRoot.defaultProps = {
    throwIfNested: true,
};
