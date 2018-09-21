// @flow
import * as React from "react";

type ContextType = {|
    closeModal?: () => void,
|};

const defaultContext: ContextType = {
    closeModal: undefined,
};

export default React.createContext(defaultContext);
