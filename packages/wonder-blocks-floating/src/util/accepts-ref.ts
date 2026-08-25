import * as React from "react";

const REACT_FORWARD_REF = Symbol.for("react.forward_ref");
const REACT_MEMO = Symbol.for("react.memo");

/**
 * Whether a `ref` can be injected into an element without React warning about
 * it (`Function components cannot be given refs`).
 *
 * Host elements (e.g. `<button>`), class components and `React.forwardRef`
 * components can all receive a ref. Plain function components can't, so they
 * register themselves as the reference element through
 * `FloatingReferenceContext` instead.
 */
export function acceptsRef(element: React.ReactElement): boolean {
    const type = element.type as any;

    // Host elements (e.g. `<button>`, `<div>`).
    if (typeof type === "string") {
        return true;
    }

    // `React.memo(...)` forwards to the component it wraps.
    const component = type?.$$typeof === REACT_MEMO ? type.type : type;

    return (
        component?.$$typeof === REACT_FORWARD_REF ||
        // Class components expose their instance through refs.
        component?.prototype?.isReactComponent != null
    );
}
