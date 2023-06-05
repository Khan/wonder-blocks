import * as React from "react";

type ContextType = {
    closeModal?: () => unknown;
};

const defaultContext: ContextType = {
    closeModal: undefined,
};

const ModalContext = React.createContext<ContextType>(
    defaultContext,
) as React.Context<ContextType>;
ModalContext.displayName = "ModalContext";

export default ModalContext;
