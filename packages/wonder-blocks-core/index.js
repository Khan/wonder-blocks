// @flow
import ClickableBehavior, {
    getClickableBehavior,
} from "./components/clickable-behavior.js";
import Text from "./components/text.js";
import View from "./components/view.js";
import addStyle from "./util/add-style.js";
import type {ClickableHandlers} from "./components/clickable-behavior.js";
import type {TextTag} from "./util/types.js";

export {ClickableBehavior, Text, View, addStyle, getClickableBehavior};
export type {ClickableHandlers, TextTag};
