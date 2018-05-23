// @flow
import {Link} from "react-router-dom";

import WBLink from "wonder-blocks-link";
import {addStyle, addClientNav} from "wonder-blocks-core";

// TODO(kevinb) add this code inside javascript/node_modules/wonder-blocks-link
// and update update-wonder-blocks-shims.js to handle this situation
export default addClientNav(WBLink, addStyle(Link));
