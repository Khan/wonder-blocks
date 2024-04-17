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
 * - TooltipAnchor (provides hover/focus behaviors on anchored content)
 *   - TooltipPortalMounter (creates portal into which the callout is rendered)
 * --------------------------- [PORTAL BOUNDARY] ------------------------------
 * - TooltipPopper (provides positioning for the callout using react-popper)
 *   - TooltipBubble (renders the callout borders, background and shadow)
 *     - TooltipContent (renders the callout content; the actual information)
 *     - TooltipTail (renders the callout tail and shadow that points from the
 *                     callout to the anchor content)
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    UniqueIDProvider,
    IIdentifierFactory,
} from "@khanacademy/wonder-blocks-core";
import {maybeGetPortalMountedModalHostElement} from "@khanacademy/wonder-blocks-modal";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";

import TooltipAnchor from "./tooltip-anchor";
import TooltipBubble from "./tooltip-bubble";
import TooltipContent from "./tooltip-content";
import TooltipPopper from "./tooltip-popper";
import type {ContentStyle, Placement} from "../util/types";

type Props = AriaProps &
    Readonly<{
        /**
         * The content for anchoring the tooltip.
         * This component will be used to position the tooltip.
         */
        children: React.ReactElement<any> | string;
        /**
         * Optional title for the tooltip content.
         */
        title?: string | React.ReactElement<React.ComponentProps<Typography>>;

        /**
         * Whether the tooltip should update its position when the anchor
         * element changes size or position. Defaults to false.
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
        placement: Placement;
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
         * Optional custom styles for the tooltip content which are a subset of valid CSS styles.
         */
        contentStyle?: ContentStyle;
        /**
         * Optional background color.
         */
        backgroundColor?: keyof typeof color;
    }>;

type State = Readonly<{
    /**
     * Whether the tooltip is open by hovering/focusing on the anchor element.
     */
    active: boolean;
    /**
     * Whether the tooltip is open by hovering on the tooltip bubble.
     */
    activeBubble: boolean;
    /**
     * The element that activates the tooltip.
     */
    anchorElement?: HTMLElement;
}>;

type DefaultProps = {
    forceAnchorFocusivity: Props["forceAnchorFocusivity"];
    placement: Props["placement"];
};

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
export default class Tooltip extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        forceAnchorFocusivity: true,
        placement: "top",
    };

    /**
     * Used to sync the `opened` state when Tooltip acts as a controlled
     * component
     */
    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): Partial<State> | null {
        return {
            active:
                typeof props.opened === "boolean" ? props.opened : state.active,
        };
    }

    state: State = {
        active: false,
        activeBubble: false,
    };
    static ariaContentId = "aria-content";

    _updateAnchorElement(ref?: Element | null) {
        if (ref && ref !== this.state.anchorElement) {
            this.setState({anchorElement: ref as HTMLElement});
        }
    }

    _renderBubbleContent(): React.ReactElement<
        React.ComponentProps<typeof TooltipContent>
    > {
        const {title, content, contentStyle, testId} = this.props;
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
    }

    _renderPopper(ids?: IIdentifierFactory): React.ReactNode {
        const {id, backgroundColor} = this.props;
        const bubbleId = ids ? ids.get(Tooltip.ariaContentId) : id;
        if (!bubbleId) {
            throw new Error("Did not get an identifier factory nor a id prop");
        }

        const {placement} = this.props;
        return (
            <TooltipPopper
                anchorElement={this.state.anchorElement}
                placement={placement}
                autoUpdate={this.props.autoUpdate}
            >
                {(props) => (
                    <TooltipBubble
                        id={bubbleId}
                        style={props.style}
                        backgroundColor={backgroundColor}
                        tailOffset={props.tailOffset}
                        isReferenceHidden={props.isReferenceHidden}
                        placement={props.placement}
                        updateTailRef={props.updateTailRef}
                        updateBubbleRef={props.updateBubbleRef}
                        onActiveChanged={(active) =>
                            this.setState({activeBubble: active})
                        }
                    >
                        {this._renderBubbleContent()}
                    </TooltipBubble>
                )}
            </TooltipPopper>
        );
    }

    _getHost(): Element | null | undefined {
        const {anchorElement} = this.state;

        return (
            maybeGetPortalMountedModalHostElement(anchorElement) ||
            document.body
        );
    }

    _renderTooltipAnchor(ids?: IIdentifierFactory): React.ReactNode {
        const {autoUpdate, children, forceAnchorFocusivity} = this.props;
        const {active, activeBubble} = this.state;

        const popperHost = this._getHost();

        // Only render the popper if the anchor element is available so that we
        // can position the popper correctly. If autoUpdate is false, we don't
        // need to wait for the anchor element to render the popper.
        const shouldAnchorExist = autoUpdate ? this.state.anchorElement : true;
        const shouldBeVisible =
            popperHost && (active || activeBubble) && shouldAnchorExist;

        // TODO(kevinb): update to use ReactPopper's React 16-friendly syntax
        return (
            <React.Fragment>
                <TooltipAnchor
                    forceAnchorFocusivity={forceAnchorFocusivity}
                    anchorRef={(r) => this._updateAnchorElement(r)}
                    onActiveChanged={(active) => this.setState({active})}
                    ids={ids}
                >
                    {children}
                </TooltipAnchor>
                {shouldBeVisible &&
                    ReactDOM.createPortal(this._renderPopper(ids), popperHost)}
            </React.Fragment>
        );
    }

    render(): React.ReactNode {
        const {id} = this.props;
        if (id) {
            // Let's bypass the extra weight of an id provider since we don't
            // need it.
            return this._renderTooltipAnchor();
        } else {
            return (
                <UniqueIDProvider scope="tooltip" mockOnFirstRender={true}>
                    {(ids) => this._renderTooltipAnchor(ids)}
                </UniqueIDProvider>
            );
        }
    }
}
