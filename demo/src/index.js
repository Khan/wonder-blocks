import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./third-party/registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}
