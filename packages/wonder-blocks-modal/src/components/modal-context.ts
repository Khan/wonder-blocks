import * as React from "react";

type ContextType = {
    closeModal?: () => unknown;
};

const defaultContext: ContextType = {
    closeModal: undefined,
};

export default React.createContext<ContextType>(
    defaultContext,
) as React.Context<ContextType>;
