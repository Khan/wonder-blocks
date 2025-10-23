import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    hide,
    shift,
    arrow,
} from "@floating-ui/react-dom";
import {StyleSheet, css} from "aphrodite";
import {
    border,
    boxShadow,
    semanticColor,
} from "@khanacademy/wonder-blocks-tokens";
import maybeGetPortalMountedModalHostElement from "../util/maybe-get-portal-mounted-modal-host-element";

type FloatingProps = {
    /**
     * The arrow element to display on the floating element.
     */
    arrow?: React.ReactNode;
    /**
     * The content to display in the floating element.
     */
    content: React.ReactNode;
    /**
     * The trigger element that the floating element will be positioned relative to.
     */
    children: React.ReactElement;
    /**
     * The placement of the floating element relative to the reference element.
     * @default "top"
     */
    placement?: "top" | "right" | "bottom" | "left";
    /**
     * Whether the floating element is open by default.
     * @default false
     */
    defaultOpen?: boolean;

    /**
     * Whether to show the arrow on the floating element.
     * @default true
     */
    showArrow?: boolean;
    /**
     * When enabled, user can hide the popover content by pressing the `esc` key
     * or clicking/tapping outside of it.
     * @default false
     */
    dismissEnabled?: boolean;

    /**
     * The element that will receive focus when the floating element is opened.
     */
    initialFocus?: React.MutableRefObject<HTMLElement | null>;

    /**
     * Whether to render the floating element in a portal.
     * @default true
     */
    portal?: boolean | HTMLElement | null | undefined;

    /**
     * Whether to use the FocusManager component to manage the focus of the
     * floating element.
     * @default true
     */
    useFocusManager?: boolean;
};

/**
 * A component that uses the Floating UI library to position a floating element
 * relative to a reference element. The floating element appears on hover or focus.
 */
export default function Floating({
    arrow: arrowElement,
    content,
    children,
    portal = true,
    placement = "top",
    defaultOpen = false,
    // dismissEnabled = false,
    // initialFocus,
    showArrow = true,
    useFocusManager = true,
}: FloatingProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const arrowRef = React.useRef(null);

    React.useEffect(() => {
        setIsOpen(defaultOpen);
    }, [defaultOpen]);

    const {refs, elements, floatingStyles, middlewareData} = useFloating({
        // open: isOpen,
        // onOpenChange: setIsOpen,
        placement,
        // Ensure the floating element stays in sync with the reference element
        whileElementsMounted: autoUpdate,
        middleware: [
            hide(),
            // Add offset from the reference element
            offset(20),
            // Flip to the opposite side if there's not enough space
            flip(),
            // Shift along the axis to keep it in view
            shift({padding: 12}),
            ...(showArrow ? [arrow({element: arrowRef})] : []),
        ],
    });

    // Clone the child element and add the ref and props
    const trigger = React.useMemo(
        () =>
            React.cloneElement(children, {
                ref: refs.setReference,
                ...children.props,
            }),
        [children, refs.setReference],
    );

    const floatingContainer = (
        <div
            ref={refs.setFloating}
            style={{
                ...floatingStyles,
                visibility: middlewareData.hide?.referenceHidden
                    ? "hidden"
                    : "visible",
            }}
            className={css(styles.floating)}
        >
            {content}
            {showArrow && (
                <div
                    ref={arrowRef}
                    style={{
                        position: "absolute",
                        left: middlewareData.arrow?.x,
                        top: middlewareData.arrow?.y,
                    }}
                >
                    {arrowElement}
                </div>
            )}
        </div>
    );

    let renderedContent = null;
    if (portal) {
        const root =
            (maybeGetPortalMountedModalHostElement(
                elements.reference as HTMLElement,
            ) as HTMLElement) || document.body;

        renderedContent = ReactDOM.createPortal(floatingContainer, root);
    } else {
        renderedContent = floatingContainer;
    }

    return (
        <>
            {trigger}
            {isOpen && renderedContent}
        </>
    );
}

const styles = StyleSheet.create({
    floating: {
        background: semanticColor.core.background.base.default,
        border: `solid ${border.width.thin} ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
        maxWidth: 288,
        boxShadow: boxShadow.mid,
        justifyContent: "center",
    },
});
