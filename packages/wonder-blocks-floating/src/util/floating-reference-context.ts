import * as React from "react";

/**
 * Registers (or clears, when called with `null`) the element that a `Floating`
 * ancestor uses as its reference (anchor) element.
 */
export type FloatingReferenceSetter = (node: Element | null) => void;

const noop: FloatingReferenceSetter = () => {};

/**
 * Provides the reference setter of the closest `Floating` ancestor to whichever
 * component renders the trigger's DOM element.
 *
 * `Floating` only wraps the trigger with this context (never the floating
 * content), so a trigger rendered inside another floating element registers
 * with its own `Floating` instance rather than the outer one. This keeps
 * multiple simultaneously open (or nested) floating elements independent from
 * each other.
 *
 * Prefer the `useFloatingReference` hook over consuming this context directly.
 */
export const FloatingReferenceContext =
    React.createContext<FloatingReferenceSetter>(noop);

/**
 * Returns a ref callback that registers the element it is attached to as the
 * reference (anchor) element of the closest `Floating` ancestor.
 *
 * This lets a component act as a floating trigger without having to forward
 * refs, and without `Floating` rendering a wrapper element around it. Only the
 * component that renders the trigger's DOM element should use it: if several
 * components in the same trigger subtree register a node, the last one to
 * attach wins.
 *
 * Returns a no-op outside of a `Floating` component.
 *
 * ## Usage
 * ```tsx
 * function MyTrigger(props: {children: React.ReactNode}) {
 *     const setFloatingReference = useFloatingReference();
 *     return <button ref={setFloatingReference}>{props.children}</button>;
 * }
 * ```
 */
export function useFloatingReference(): FloatingReferenceSetter {
    return React.useContext(FloatingReferenceContext);
}
