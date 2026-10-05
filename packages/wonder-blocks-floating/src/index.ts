export {default as Floating} from "./components/floating";

// The attribute `Floating` injects into its trigger to identify the trigger's
// element in the DOM. Components that render another component's trigger (e.g.
// PopoverAnchor) pass it along to that trigger.
export {FloatingReferenceAttributeName} from "./util/constants";

// Helpers for components that render a trigger on behalf of a consumer (e.g.
// PopoverAnchor), so they can pass the ref `Floating` injects along to that
// trigger the same way `Floating` itself does.
export {canAcceptRef, getElementRef} from "./util/trigger-refs";

// Re-exported (rather than used directly) so that those components don't need a
// dependency on `@floating-ui/react` of their own; this package is the only one
// that depends on floating-ui.
export {useMergeRefs} from "@floating-ui/react";
