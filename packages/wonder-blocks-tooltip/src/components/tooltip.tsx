/**
 * The Tooltip component provides the means to anchor some additional
 * information to some content. The additional information is shown in a
 * callout that hovers above the page content. This additional information is
 * invoked by hovering over the anchored content, or focusing all or part of the
 * anchored content.
 *
 * This component is structured as follows:
 *
 * Tooltip (this component)
 * - Floating (positions the callout using floating-ui, renders it in a portal
 *             and draws its borders, background, shadow and tail)
 *   - TooltipAnchor (provides hover/focus behaviors on anchored content)
 * --------------------------- [PORTAL BOUNDARY] ------------------------------
 *   - TooltipBubble (exposes the callout as a tooltip and keeps it open while
 *                    hovered)
 *     - TooltipContent (renders the callout content; the actual information)
 */
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {Floating} from "@khanacademy/wonder-blocks-floating";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {color, semanticColor} from "@khanacademy/wonder-blocks-tokens";

import TooltipAnchor from "./tooltip-anchor";
import TooltipBubble from "./tooltip-bubble";
import TooltipContent from "./tooltip-content";
import type {ContentStyle, Placement, TooltipVariant} from "../util/types";

type Props = AriaProps &
    Readonly<{
        /**
         * The content for anchoring the tooltip.
         * This component will be used to position the tooltip.
         *
         * The anchored content has to either attach the ref it is given to its
         * element, or spread the props it is given onto it, for the tooltip to
         * be anchored to it. Strings are wrapped in an element that does both.
         */
        children: React.ReactElement<any> | string;
        /**
         * Optional title for the tooltip content.
         */
        title?: string | React.ReactElement<React.ComponentProps<Typography>>;

        /**
         * Whether the tooltip should update its position when the anchor
         * element changes size or position.
         *
         * @deprecated This prop is a no-op. The tooltip always keeps its
         * position in sync with the anchor element.
         */
        autoUpdate?: boolean;
        /**
         * The content to render in the tooltip.
         */
        content:
            | string
            | React.ReactElement<React.ComponentProps<typeof TooltipContent>>;
        /**
         * The unique identifier to give to the tooltip. Provide this in cases where
         * you want to override the default accessibility solution. This identifier
         * will be applied to the tooltip bubble content.
         *
         * By providing this identifier, the children that this tooltip anchors to
         * will not be automatically given the aria-desribedby attribute. Instead,
         * the accessibility solution is the responsibility of the caller.
         *
         * If this is not provided, the aria-describedby attribute will be added
         * to the children with a unique identifier pointing to the tooltip bubble
         * content.
         */
        id?: string;
        /**
         * When true, if a tabindex attribute is not already present on the element
         * wrapped by the anchor, the element will be given tabindex=0 to make it
         * keyboard focusable; otherwise, does not attempt to change the ability to
         * focus the anchor element.
         *
         * Defaults to true.
         *
         * One might set this to false in circumstances where the wrapped component
         * already can receive focus or contains an element that can.
         * Use good judgement when overriding this value, the tooltip content should
         * be accessible via keyboard in all circumstances where the tooltip would
         * appear using the mouse, so verify those use-cases.
         *
         * Also, note that the aria-describedby attribute is attached to the root
         * anchor element, so you may need to implement an additional accessibility
         * solution when overriding anchor focusivity.
         */
        forceAnchorFocusivity?: boolean;
        /**
         * Where the tooltip should appear in relation to the anchor element.
         * Defaults to "top".
         */
        placement?: Placement;
        /**
         * Renders the tooltip when true, renders nothing when false.
         *
         * Using this prop makes the component behave as a controlled component. The
         * parent is responsible for managing the opening/closing of the tooltip
         * when using this prop.
         */
        opened?: boolean;
        /**
         * Test ID used for e2e testing.
         */
        testId?: string;
        /**
         * The visual style of the tooltip.
         *
         * - `subtle` (default): the standard tooltip styling, used for most
         *   cases.
         * - `strong`: a higher-emphasis tooltip that uses an inverse/knockout
         *   treatment. Its colors are defined with semantic tokens, so they
         *   adapt to the active theme.
         *
         * Defaults to `subtle`.
         */
        variant?: TooltipVariant;
        /**
         * Optional custom styles for the tooltip content which are a subset of valid CSS styles.
         */
        contentStyle?: ContentStyle;
        /**
         * Optional background color.
         */
        backgroundColor?: keyof typeof color;
        /**
         * The padding (in pixels) kept between the tooltip and the edges of the
         * viewport when the tooltip is shifted to stay in view. If not provided,
         * default spacing of 12px is applied.
         */
        viewportPadding?: number;
    }>;

/**
 * Use a tooltip to help describe an on screen object.
 *
 * Tooltips:
 *  - contain text
 *  - (optional) contain small graphic elements to complement the text
 *  - appear on hover or focus (for non-assistive tech keyboard users)
 *  - must have a tail that points to a parent object
 *  - DO NOT include actions
 *
 * For more rich content see Popovers, for taking action on an object, see
 * Snackbars (proposed).
 *
 * This component uses the `Floating` component (powered by floating-ui) to
 * position the tooltip according to the element it is anchored to.
 *
 * ### Usage
 *
 * ```jsx
 * import Tooltip from "@khanacademy/wonder-blocks-tooltip";
 *
 * <Tooltip content="This is a text tooltip">
 *  Tooltip anchor
 * </Tooltip>
 * ```
 *
 */
export default function Tooltip(props: Props) {
    const {
        backgroundColor,
        children,
        content,
        contentStyle,
        forceAnchorFocusivity = true,
        id,
        opened,
        placement = "top",
        testId,
        title,
        variant = "subtle",
        viewportPadding,
    } = props;

    /**
     * Whether the tooltip is open by hovering/focusing on the anchor element.
     */
    const [anchorActive, setAnchorActive] = React.useState(false);
    /**
     * Whether the tooltip is open by hovering on the tooltip bubble.
     */
    const [bubbleActive, setBubbleActive] = React.useState(false);

    // The `opened` prop makes the tooltip a controlled component.
    const active = typeof opened === "boolean" ? opened : anchorActive;
    const isVisible = active || bubbleActive;

    const generatedUniqueId = React.useId();
    const uniqueId = id ?? generatedUniqueId;
    const ariaContentId = `${uniqueId}-aria-content`;

    const renderBubbleContent = (): React.ReactElement<
        React.ComponentProps<typeof TooltipContent>
    > => {
        if (typeof content === "string") {
            return (
                <TooltipContent
                    title={title}
                    contentStyle={contentStyle}
                    testId={testId ? `${testId}-content` : undefined}
                >
                    {content}
                </TooltipContent>
            );
        } else if (title) {
            return React.cloneElement(content, {title});
        } else {
            return content;
        }
    };

    const isStrong = variant === "strong";
    // A primitive `color` override takes precedence over the default
    // background. The strong variant takes precedence over both.
    //
    // NOTE: The override is applied as an inline style (which would beat the
    // strong variant's class), so it is skipped for the strong variant.
    const customBackgroundColor =
        backgroundColor !== undefined && !isStrong
            ? color[backgroundColor]
            : undefined;

    return (
        <Floating
            open={isVisible}
            // The tooltip is positioned relative to the viewport, so it isn't
            // clipped by scrolling or `overflow`-clipping ancestors.
            strategy="fixed"
            placement={placement}
            shiftPadding={viewportPadding}
            // Tooltips are not interactive, so focus stays on the anchor.
            focusManagerEnabled={false}
            content={
                <TooltipBubble
                    id={ariaContentId}
                    onActiveChanged={setBubbleActive}
                >
                    {renderBubbleContent()}
                </TooltipBubble>
            }
            styles={{
                root: [
                    styles.bubble,
                    !!customBackgroundColor && {
                        backgroundColor: customBackgroundColor,
                    },
                    isStrong && styles.bubbleStrong,
                ],
                arrow: isStrong
                    ? {
                          fill: semanticColor.feedback.neutral.strong
                              .background,
                          stroke: semanticColor.feedback.neutral.strong.border,
                      }
                    : {fill: customBackgroundColor},
            }}
        >
            <TooltipAnchor
                forceAnchorFocusivity={forceAnchorFocusivity}
                onActiveChanged={setAnchorActive}
                aria-describedby={isVisible ? ariaContentId : undefined}
            >
                {children}
            </TooltipAnchor>
        </Floating>
    );
}

const styles = StyleSheet.create({
    bubble: {
        maxInlineSize: 472,
    },

    /**
     * The strong variant uses a higher-emphasis inverse/knockout treatment.
     * The text color is set here so it cascades to the `TooltipContent`
     * typography, which inherits the CSS `color`.
     */
    bubbleStrong: {
        backgroundColor: semanticColor.feedback.neutral.strong.background,
        borderColor: semanticColor.feedback.neutral.strong.border,
        color: semanticColor.feedback.neutral.strong.text,
    },
});
