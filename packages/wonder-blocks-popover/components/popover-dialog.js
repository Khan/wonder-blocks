// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {TooltipTail} from "@khanacademy/wonder-blocks-tooltip";
import Color from "@khanacademy/wonder-blocks-color";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import type {
    Placement,
    PopperElementProps,
} from "@khanacademy/wonder-blocks-tooltip";

import PopoverContent from "./popover-content.js";
import PopoverContentCore from "./popover-content-core.js";

type Props = {|
    ...AriaProps,

    /**
     * Required to correctly position the elements inside the dialog
     * @ignore
     */
    ...PopperElementProps,

    /**
     * The content to render inside the dialog.
     */
    children:
        | React.Element<typeof PopoverContent>
        | React.Element<typeof PopoverContentCore>,

    /**
     * The unique identifier to give to the popover content.
     */
    id?: string,

    /**
     * Called when popper changes its placement
     */
    onUpdate: (placement: Placement) => mixed,
|};

/**
 * This is an internal component that we use to render the stuff that appears
 * when a popover shows. It's composed by two elements: The popover content,
 * that can be of type [PopoverContent](#PopoverContent) or
 * [PopoverContentCore](#PopoverContentCore), and the
 * [TooltipTail](#TooltipTail).
 *
 * The main difference with [TooltipBubble](#TooltipBubble) is that bubble
 * handles hover states and PopoverDialog doesn't need to handle any states at
 * all (for now). Also, PopoverDialog needs to coordinate different background
 * colors for the content and tail components.
 *
 * Note that without explicit positioning, the tail will not be centered.
 */
export default class PopoverDialog extends React.Component<Props> {
    componentDidUpdate(prevProps: Props) {
        // if the placement has changed, then we need to notify this to the
        // parent component (`Popover`). This way, the context will update its
        // `placement` value.
        if (prevProps.placement !== this.props.placement) {
            this.props.onUpdate(this.props.placement);
        }
    }

    render() {
        const {
            placement,
            children,
            id,
            outOfBoundaries,
            updateBubbleRef,
            updateTailRef,
            tailOffset,
            style,
            "aria-describedby": ariaDescribedby,
        } = this.props;

        const contentProps = (children.props: any);

        // extract the background color from the popover content
        const color: $Keys<typeof Color> = contentProps.emphasized
            ? "blue"
            : contentProps.color;

        return (
            <React.Fragment>
                <View
                    aria-describedby={ariaDescribedby}
                    id={id}
                    ref={updateBubbleRef}
                    data-placement={placement}
                    style={[
                        outOfBoundaries && styles.hide,
                        styles[`content-${placement}`],
                        style,
                    ]}
                >
                    {children}
                    <TooltipTail
                        color={color}
                        updateRef={updateTailRef}
                        placement={placement}
                        offset={tailOffset}
                    />
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    /**
     * The hide style ensures that the bounds of the popover stay unchanged.
     * This is because popper.js calculates the bubble position based off its
     * bounds and if we stopped rendering it entirely, it wouldn't know where to
     * place it when it reappeared.
     */
    hide: {
        pointerEvents: "none",
        opacity: 0,
        backgroundColor: "transparent",
        color: "transparent",
    },

    /**
     * Ensure the content and tail are properly arranged.
     */
    "content-top": {
        flexDirection: "column",
    },
    "content-right": {
        flexDirection: "row-reverse",
    },
    "content-bottom": {
        flexDirection: "column-reverse",
    },
    "content-left": {
        flexDirection: "row",
    },
});
