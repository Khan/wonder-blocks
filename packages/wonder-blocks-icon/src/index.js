// @flow
import Icon from "./components/icon.js";
import * as iconAssets from "./util/icon-assets.js";
import type {IconAsset, IconSize} from "./util/icon-assets.js";

// $FlowIgnore[prop-missing]: Flow doesn't know about __esModule
const {__esModule: _, ...icons} = iconAssets;

export type {IconAsset, IconSize};
export {icons};
export default Icon;
