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
     * The padding to apply between the floating element and its boundary.
     * @default 8
     */
    boundaryPadding?: number;

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
     * The flip strategy to use.
     * @default true
     */
    flip?: boolean;

    /**
     * Whether to hide the floating element when the reference element is hidden.
     * @default true
     */
    hide?: boolean;

    /**
     * The offset of the floating element from the reference element.
     * @default 20
     */
    offset?: number;

    /**
     * The shift strategy to use.
     * @default true
     */
    shift?: boolean;

    /**
     * Whether to show the arrow on the floating element.
     * @default true
     */
    showArrow?: boolean;

    // TODO(WB-2111.3): Add props for dismissEnabled, portal and useFocusManager
};

/**
 * A component that uses the Floating UI library to position a floating element
 * relative to a reference element. The floating element appears on hover or
 * focus.
 */
export default function Floating({
    content,
    children,
    boundaryPadding = 8,
    placement = "top",
    open = false,
    onOpenChange,
    strategy = "absolute",
    testId,
    // middleware specific
    hide: hideProp = true,
    offset: offsetProp = 20,
    flip: flipProp = true,
    shift: shiftProp = true,
    showArrow = true,
}: FloatingProps) {
    const arrowRef = React.useRef(null);
    const prevOpenRef = React.useRef(open ?? false);

    // Calculate the floating styles and context
    const {refs, floatingStyles, context, middlewareData} = useFloating({
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
                      padding: boundaryPadding,
                      crossAxis: true,
                  })
                : undefined,
            showArrow ? arrow({element: arrowRef}) : undefined,
            hideProp ? hide() : undefined,
        ],
    });

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
        });
    }, [children, refs.setReference]);

    return (
        <>
            {trigger}
            {open && (
                <StyledDiv
                    data-testid={testId}
                    data-placement={placement}
                    ref={refs.setFloating}
                    style={[
                        styles.floating,
                        floatingStyles,
                        {
                            visibility: middlewareData.hide?.referenceHidden
                                ? "hidden"
                                : "visible",
                        },
                    ]}
                >
                    {content}
                    {showArrow && <Arrow ref={arrowRef} context={context} />}
                </StyledDiv>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    floating: {
        background: semanticColor.core.background.base.default,
        border: `solid ${border.width.thin} ${semanticColor.core.border.neutral.subtle}`,
        borderRadius: border.radius.radius_040,
        maxInlineSize: 288,
        // Allow the floating element to be at least as tall as the arrow. We
        // set inline size to ensure that it works with inline placements.
        minBlockSize: ARROW_SIZE_INLINE,
        boxShadow: boxShadow.mid,
        justifyContent: "center",
    },
});
