// @flow
import Icon from "./components/icon";
import * as iconAssets from "./util/icon-assets";
import type {IconAsset, IconSize} from "./util/icon-assets";

// $FlowIgnore[prop-missing]: Flow doesn't know about __esModule
const {__esModule: _, ...icons} = iconAssets;

export type {IconAsset, IconSize};
export {icons};
export default Icon;
