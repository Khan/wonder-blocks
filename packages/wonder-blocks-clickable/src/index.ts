import type {
    ChildrenProps,
    ClickableState,
    ClickableRole,
} from "./components/clickable-behavior";
import Clickable from "./components/clickable";

export {default as ClickableBehavior} from "./components/clickable-behavior";
export {default as getClickableBehavior} from "./util/get-clickable-behavior";
export {isClientSideUrl} from "./util/is-client-side-url";

export {Clickable as default};

export type {ChildrenProps, ClickableState, ClickableRole};
