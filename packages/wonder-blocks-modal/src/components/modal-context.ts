import * as React from "react";

type ContextType = {
    closeModal?: () => unknown;
    /**
     * Whether the modal plays enter/exit animations. Provided by ModalLauncher
     * and consumed by ModalDialog (dialog float) and ModalBackdrop (scrim fade).
     */
    animated?: boolean;
    /**
     * True while the modal is playing its exit animation (before unmount).
     * Consumers use this to swap enter styles for exit styles.
     */
    isExiting?: boolean;
};

const defaultContext: ContextType = {
    closeModal: undefined,
    animated: undefined,
    isExiting: undefined,
};

const ModalContext = React.createContext<ContextType>(
    defaultContext,
) as React.Context<ContextType>;
ModalContext.displayName = "ModalContext";

export default ModalContext;
