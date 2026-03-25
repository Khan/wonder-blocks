import * as React from "react";
import {
    attachAnnouncerToModal,
    detachAnnouncerFromModal,
} from "@khanacademy/wonder-blocks-announcer";

/**
 * Attaches Announcer live regions to an `aria-modal` element so that
 * `announceMessage` calls are audible while the dialog is open.
 *
 * Returns a ref callback to place on the `aria-modal` element. When a
 * forwarded ref is provided it is also populated, so callers don't need
 * a separate ref-merging step.
 *
 * ### Usage
 *
 * ```tsx
 * const MyDialog = React.forwardRef(function MyDialog(props, ref) {
 *     const {ariaModalRef} = useModalAnnouncer(ref);
 *     return <div role="dialog" aria-modal="true" ref={ariaModalRef} />;
 * });
 * ```
 */
export function useModalAnnouncer<T extends HTMLElement>(
    forwardedRef?: React.ForwardedRef<T>,
): {ariaModalRef: (node: T | null) => void} {
    const internalRef = React.useRef<T | null>(null);

    React.useEffect(() => {
        const el = internalRef.current;
        if (!el) {
            return;
        }
        attachAnnouncerToModal(el);
        return () => {
            detachAnnouncerFromModal(el);
        };
    }, []);

    const ariaModalRef = React.useCallback(
        (node: T | null) => {
            internalRef.current = node;
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        },
        // forwardedRef is intentionally excluded — ref objects are stable and
        // ref callbacks from React.forwardRef don't change between renders.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return {ariaModalRef};
}
