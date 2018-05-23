// @flow
import {Link} from "react-router-dom";

import Button from "wonder-blocks-button";
import {addStyle, addClientNav} from "wonder-blocks-core";

// TODO(kevinb) add this code inside javascript/node_modules/wonder-blocks-button
// and update update-wonder-blocks-shims.js to handle this situation
export default addClientNav(Button, addStyle(Link));
