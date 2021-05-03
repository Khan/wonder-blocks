// @flow
import type {
    ChildrenProps,
    ClickableState,
    ClickableRole,
} from "./components/clickable-behavior.js";
import Clickable from "./components/clickable.js";

export {default as ClickableBehavior} from "./components/clickable-behavior.js";
export {default as getClickableBehavior} from "./util/get-clickable-behavior.js";
export {isClientSideUrl} from "./util/is-client-side-url.js";

export {Clickable as default};

export type {ChildrenProps, ClickableState, ClickableRole};
