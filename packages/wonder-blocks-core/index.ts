// @flow
import {ClickableHandlers} from "./components/clickable-behavior";
import {AriaProps, IIdentifierFactory, StyleType} from "./util/types";
import {Intersection} from "./util/get-element-intersection";

export {default as ClickableBehavior} from "./components/clickable-behavior";
export {default as Text} from "./components/text";
export {default as View} from "./components/view";
export {
    default as WithSSRPlaceholder,
} from "./components/with-ssr-placeholder";
export {default as UniqueIDProvider} from "./components/unique-id-provider";
export {default as addStyle} from "./util/add-style";
export {
    default as getClickableBehavior,
} from "./util/get-clickable-behavior";
export {
    default as getElementIntersection,
} from "./util/get-element-intersection";

export {
    AriaProps,
    ClickableHandlers,
    Intersection,
    IIdentifierFactory,
    StyleType,
};
