// @flow
import * as React from "react";

type ContextType = {|
    closeModal?: () => mixed,
|};

const defaultContext: ContextType = {
    closeModal: undefined,
};

export default (React.createContext<ContextType>(
    defaultContext,
): React.Context<ContextType>);
