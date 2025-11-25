import * as React from "react";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    hide,
    shift,
    arrow,
    Placement,
    useDismiss,
    useInteractions,
    FloatingFocusManager,
} from "@floating-ui/react";
import {StyleSheet} from "aphrodite";
import {
    border,
    boxShadow,
    semanticColor,
} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {ARROW_SIZE_INLINE} from "../util/constants";
import {Arrow} from "./floating-arrow";
import {Portal} from "./floating-portal";

const StyledDiv = addStyle("div");

type FloatingProps = {
    /**
     * The reference (or anchored) element that is used to calculate the
     * position of the floating element.
     */
    children: React.ReactElement;
    /**
     * The content to display in the floating element.
     */
    content: React.ReactNode;

    /**
     * The placement of the floating element relative to the reference element.
     * @default "top"
     * @see https://floating-ui.com/docs/useFloating#placement
     */
    placement?: Placement;

    /**
     * The strategy to use for positioning the floating element.
     * @default "absolute"
     * @see https://floating-ui.com/docs/useFloating#strategy
     */
    strategy?: "fixed" | "absolute";

    /**
     * Whether the floating element is open.
     * @default false
     */
    open: boolean;
    /**
     * Callback for when the floating element is opened or closed.
     */
    onOpenChange?: (open: boolean) => void;

    /**
     * The test ID to use for the floating element.
     */
    testId?: string;

    // ----- Middleware specific props -----
    /**
     * Whether to flip the floating element to the opposite side if there's not
     * enough space.
     *
     * This middleware hanges the placement of the floating element to keep it
     * in view.
     * @default true
     */
    flip?: boolean;

    /**
     * Whether to hide the floating element when the reference element is
     * hidden.
     *
     * Allows to visually hide the floating element when it is out of bounds.
     * @default true
     */
    hide?: boolean;

    /**
     * The offset of the floating element from the reference element.
     * @default 20
     */
    offset?: number;

    /**
     * Whether to shift the floating element along the axis to keep it in view.
     * @default true
     */
    shift?: boolean;

    /**
     * Whether to show the arrow on the floating element.
     * @default true
     */
    showArrow?: boolean;

    /**
     * Whether to render the floating element in a portal.
     *
     * This is useful when the floating element needs to be rendered outside the
     * current DOM hierarchy and instead be rendered in the uppermost DOM
     * hierarchy. This allows us to prevent clipping issues with the floating
     * element.
     *
     * @default true
     */
    portal?: boolean;

    /**
     * When enabled, user can hide the floating element by pressing the `esc`
     * key or clicking/tapping outside of it.
     * @default false
     */
    dismissEnabled?: boolean;
};

type FocusManagerProps =
    | {
          /**
           * Whether to enable the FocusManager component to manage the focus of
           * the floating element.
           *
           * When enabled, the focus will continue flowing from the reference
           * element to the floating element and back to the reference element
           * when the floating element is closed.
           *
           * This should be enabled in most cases, but it can be disabled if you
           * want to handle the focus manually or use it in a non-interactive
           * context (e.g. tooltips).
           *
           * NOTE: FloatingUI might not preserve tab order with FloatingPortal.
           * @see https://github.com/floating-ui/floating-ui/issues/2988
           *
           * @default true
           */
          focusManagerEnabled?: true;
          /**
           * The element that will receive focus when the floating element is
           * opened.
           *
           * This is useful when you want to set the initial focus to an element
           * inside the floating element when it is opened.
           *
           * If not provided, the first focusable element inside the floating
           * element will receive focus when it is opened.
           */
          initialFocusRef?: React.RefObject<HTMLElement>;
      }
    | {
          focusManagerEnabled: false;
          initialFocusRef?: never;
      };

type Props = FloatingProps & FocusManagerProps;

/**
 * The padding to use for the shift middleware. This is useful to avoid the
 * floating element to be near the edges of the viewport.
 */
const SHIFT_PADDING = 12;

/**
 * A component that uses the Floating UI library to position a floating element
 * relative to a reference element.
 *
 * Please take a look at the
 * [Accessibility](?path=/docs/packages-floating-accessibility--docs)
 * section for more information.
 *
 * ## Usage
 * ```tsx
 * import {Floating} from "@khanacademy/wonder-blocks-floating";
 *
 * <Floating content="Floating content" open={true}>
 *     <Button>Trigger</Button>
 * </Floating>
 * ```
 */
export default function Floating({
    content,
    children,
    placement = "top",
    open = false,
    onOpenChange,
    portal = true,
    strategy = "absolute",
    testId,
    // focus management
    focusManagerEnabled = true,
    initialFocusRef,
    dismissEnabled = false,
    // middleware specific
    hide: hideProp = true,
    offset: offsetProp = 20,
    flip: flipProp = true,
    shift: shiftProp = true,
    showArrow = true,
}: Props) {
    const arrowRef = React.useRef(null);
    const prevOpenRef = React.useRef(open ?? false);

    // Calculate the floating styles and context
    const {elements, refs, floatingStyles, context, middlewareData} =
        useFloating({
            open,
            onOpenChange,
            placement,
            strategy,
            // Ensure the floating element stays in sync with the reference element
            whileElementsMounted: autoUpdate,
            middleware: [
                // Add offset from the reference element
                offset({mainAxis: offsetProp}),
                // Flip to the opposite side if there's not enough space
                flipProp ? flip() : undefined,
                // Shift along the axis to keep it in view
                shiftProp
                    ? shift({
                          padding: SHIFT_PADDING,
                          crossAxis: true,
                      })
                    : undefined,
                showArrow ? arrow({element: arrowRef}) : undefined,
                hideProp ? hide() : undefined,
            ],
        });

    // Closes the floating element when a dismissal is requested.
    const dismiss = useDismiss(context, {
        enabled: dismissEnabled,
    });

    const {getReferenceProps, getFloatingProps} = useInteractions([dismiss]);

    // call onOpenChange when the floating element is opened or closed
    React.useEffect(() => {
        // only trigger when the open value changes and is controlled mode
        if (prevOpenRef.current !== open) {
            onOpenChange?.(open);
            // update the previous open value
            prevOpenRef.current = open;
        }
    }, [onOpenChange, open]);

    // Clone the child element and add the ref
    const trigger = React.useMemo(() => {
        return React.cloneElement(children, {
            ref: refs.setReference,
            ...getReferenceProps(),
        });
    }, [children, refs.setReference, getReferenceProps]);

    return (
        <>
            {trigger}
            {open && elements.reference && (
                <Portal
                    portal={portal}
                    reference={elements.reference as Element}
                >
                    <FloatingFocusManager
                        disabled={!focusManagerEnabled}
                        context={context}
                        modal={false}
                        initialFocus={initialFocusRef}
                        // TODO(WB-1987): Determine if we want to close the
                        // floating element when the user focuses outside of it.
                        closeOnFocusOut={false}
                        visuallyHiddenDismiss={dismissEnabled}
                    >
                        <StyledDiv
                            data-testid={testId}
                            data-placement={placement}
                            ref={refs.setFloating}
                            style={[
                                styles.floating,
                                floatingStyles,
                                {
                                    visibility: middlewareData.hide
                                        ?.referenceHidden
                                        ? "hidden"
                                        : "visible",
                                },
                            ]}
                            {...getFloatingProps()}
                        >
                            {content}
                            {showArrow && (
                                <Arrow ref={arrowRef} context={context} />
                            )}
                        </StyledDiv>
                    </FloatingFocusManager>
                </Portal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    floating: {
        background: semanticColor.core.background.base.default,
        border: `solid ${border.width.thin} ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
        // NOTE: Adapted from Tooltip.
        maxInlineSize: 472,
        // Allow the floating element to be at least as tall as the arrow. We
        // set inline size to ensure that it works with inline placements.
        minBlockSize: ARROW_SIZE_INLINE,
        boxShadow: boxShadow.mid,
        justifyContent: "center",
        // Prevent the floating element from receiving focus when it is clicked.
        outline: "none",
    },
});
