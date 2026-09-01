import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";

import type {Placement} from "../util/types";

import PopoverContent from "./popover-content";
import PopoverContentCore from "./popover-content-core";

type Props = AriaProps & {
    /**
     * The content to render inside the dialog.
     */
    children:
        | React.ReactElement<React.ComponentProps<typeof PopoverContent>>
        | React.ReactElement<React.ComponentProps<typeof PopoverContentCore>>;
    /**
     * The unique identifier to give to the popover content.
     */
    id?: string;
    /**
     * The current placement of the popover, reflected on the `data-placement`
     * attribute.
     */
    placement: Placement;
};

/**
 * This is an internal component that we use to render the dialog wrapper that
 * appears when a popover shows. It wraps the popover content (of type
 * [PopoverContent](#PopoverContent) or
 * [PopoverContentCore](#PopoverContentCore)) and provides the `dialog` role
 * along with its accessibility wiring.
 *
 * Positioning and the tail/arrow are handled by the `Floating` component, so
 * this component only provides the semantic dialog container.
 */
const PopoverDialog = React.forwardRef<HTMLElement, Props>(
    function PopoverDialog(props: Props, ref) {
        const {
            children,
            id,
            placement,
            "aria-describedby": ariaDescribedby,
            "aria-labelledby": ariaLabelledBy,
            "aria-label": ariaLabel,
        } = props;

        return (
            <View
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
                aria-labelledby={ariaLabelledBy}
                id={id}
                role="dialog"
                ref={ref}
                data-placement={placement}
            >
                {children}
            </View>
        );
    },
);

PopoverDialog.displayName = "PopoverDialog";

export default PopoverDialog;
