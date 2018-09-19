// @flow
import * as React from "react";

// babel-plugin-strip-flow-types doesn't know how to deal with
// React.createContext<Context>(); where Context is a flow type.
export default React.createContext({closeModal: undefined});
