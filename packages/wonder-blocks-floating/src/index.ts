export {default as Floating} from "./components/floating";

// Allows a component to register the trigger's DOM element as the reference
// (anchor) element of the closest `Floating` ancestor, without having to forward
// refs and without `Floating` rendering a wrapper element around the trigger.
export {
    useFloatingReference,
    FloatingReferenceContext,
} from "./util/floating-reference-context";
export type {FloatingReferenceSetter} from "./util/floating-reference-context";

// Re-exported from `@floating-ui/react` so consumers (e.g. Popover) can merge
// the reference setter with their own refs without needing a direct dependency
// on `@floating-ui/react`.
// @see https://floating-ui.com/docs/react-utils#usemergerefs
export {useMergeRefs} from "@floating-ui/react";
