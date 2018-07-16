// @flow
export {default as ClickableBehavior} from "./components/clickable-behavior.js";
export {default as MediaLayout} from "./components/media-layout.js";
export {default as Text} from "./components/text.js";
export {default as View} from "./components/view.js";
export {default as NoSSR} from "./components/no-ssr.js";
export {default as UniqueIDProvider} from "./components/unique-id-provider.js";
export {default as addStyle} from "./util/add-style.js";
export {
    default as getClickableBehavior,
} from "./util/get-clickable-behavior.js";
export {
    default as getElementIntersection,
} from "./util/get-element-intersection.js";
export * from "./util/specs.js";
export {MediaLayoutWrapper} from "./util/util.js";

import type {ClickableHandlers} from "./components/clickable-behavior.js";
import type {
    AriaProps,
    IIdentifierFactory,
    TextTag,
    MediaSize,
    MediaSpec,
} from "./util/types.js";
import type {Intersection} from "./util/get-element-intersection.js";
export type {
    AriaProps,
    ClickableHandlers,
    Intersection,
    IIdentifierFactory,
    TextTag,
    MediaSize,
    MediaSpec,
};
