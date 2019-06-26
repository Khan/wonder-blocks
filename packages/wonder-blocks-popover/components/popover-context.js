// @flow
import * as React from "react";

type ContextType = {|
    close?: () => mixed,
|};

const defaultContext: ContextType = {
    close: undefined,
};

export default React.createContext<ContextType>(defaultContext);
