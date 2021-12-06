// @flow
import * as React from "react";

// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
import {RenderState, RenderStateContext} from "./render-state-context.js";

const {useEffect, useRef, useState} = React;

type Props = {|
    children: React.Node,
|};

export const RenderStateRoot = ({children}: Props): React.Node => {
    const initialRef = useRef<boolean>(true);
    const [, setMounted] = useState<boolean>(false);

    useEffect(() => {
        initialRef.current = false;
        setMounted(true);
    }, []);

    const value = initialRef.current
        ? RenderState.Initial
        : RenderState.Standard;

    return (
        <RenderStateContext.Provider value={value}>
            {children}
        </RenderStateContext.Provider>
    );
};
