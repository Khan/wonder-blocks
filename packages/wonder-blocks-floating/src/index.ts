export {default as Floating} from "./components/floating";

// The attribute `Floating` injects into its trigger to identify the trigger's
// element in the DOM. Components that render another component's trigger (e.g.
// PopoverAnchor) pass it along to that trigger.
export {FloatingReferenceAttributeName} from "./util/constants";
