// @flow
import type {ClickableHandlers} from "./components/clickable-behavior.js";
import type {
    AriaProps,
    IIdentifierFactory,
    TextTag,
    StyleType,
} from "./util/types.js";
import type {Intersection} from "./util/get-element-intersection.js";

export {default as ClickableBehavior} from "./components/clickable-behavior.js";
export {default as Text} from "./components/text.js";
export {default as View} from "./components/view.js";
export {
    default as WithSSRPlaceholder,
} from "./components/with-ssr-placeholder.js";
export {default as UniqueIDProvider} from "./components/unique-id-provider.js";
export {default as addStyle} from "./util/add-style.js";
export {
    default as getClickableBehavior,
} from "./util/get-clickable-behavior.js";
export {
    default as getElementIntersection,
} from "./util/get-element-intersection.js";

export type {
    AriaProps,
    ClickableHandlers,
    Intersection,
    IIdentifierFactory,
    TextTag,
    StyleType,
};
