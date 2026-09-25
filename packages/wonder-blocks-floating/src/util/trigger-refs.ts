import * as React from "react";

/**
 * Whether the element's type can receive a ref.
 *
 * Host elements (e.g. `<button>`) and `React.forwardRef` components can, while
 * plain function components can't: giving one a ref in React 18 logs an error
 * and the ref is never attached. Class components can receive a ref too, but it
 * points at the component instance rather than at a DOM element, so they are
 * not included here.
 *
 * This is used by components that inject a ref into a trigger they don't own
 * (`Floating`, and `PopoverAnchor` on its behalf), so that the ref is only
 * injected when the trigger can actually receive it. Triggers that can't are
 * resolved from the DOM instead (see `FloatingReferenceAttributeName`).
 */
export function canAcceptRef(element: React.ReactElement): boolean {
    const type = element.type as any;

    // Host elements (e.g. `<button>`).
    if (typeof type === "string") {
        return true;
    }

    // `React.forwardRef` and `React.memo` components. `memo` is transparent
    // here: it can receive a ref as long as the component it wraps can.
    if (typeof type === "object" && type !== null) {
        if (type.$$typeof === Symbol.for("react.forward_ref")) {
            return true;
        }

        if (type.$$typeof === Symbol.for("react.memo")) {
            return canAcceptRef({...element, type: type.type});
        }
    }

    // Plain function components, class components, fragments and everything
    // else.
    return false;
}

/**
 * The ref an element was created with, if any.
 *
 * Where to read it from is version-specific: React 19 moved the ref into the
 * element's props and warns when `element.ref` is accessed, while React 18 and
 * earlier keep it on the element itself.
 *
 * NOTE: floating-ui reads a child's ref as `element.props.ref` (see
 * `CompositeItem`), which only finds it on React 19, so we can't use it here
 * while we're on React 18.
 */
export function getElementRef<T>(
    element: React.ReactElement,
): React.Ref<T> | undefined {
    if (parseInt(React.version, 10) >= 19) {
        return (element.props as {ref?: React.Ref<T>})?.ref ?? undefined;
    }

    return (element as any).ref ?? undefined;
}
