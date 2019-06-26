// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import PopoverContext from "./popover-context.js";

type Props = {|
    ...AriaProps,

    /**
     * Whether to display the light version of this component instead, for use
     * when the item is used on a dark background.
     */
    light?: boolean,

    /**
     * Called when the popover closes
     */
    onClose?: () => mixed,
|};

/**
 * This is the visual component rendering the close button that is rendered
 * inside the PopoverContentCore. It’s rendered if closeButtonVisible is set
 * true.
 */
export default class CloseButton extends React.Component<Props> {
    static defaultProps = {
        light: true,
        "aria-label": "Close Popover",
    };

    render() {
        const {light, onClose, "aria-label": ariaLabel} = this.props;
        return (
            <PopoverContext.Consumer>
                {({close}) => {
                    if (close && onClose) {
                        throw new Error(
                            "You've specified 'onClose' on the content when using Popover. Please specify 'onClose' on the Popover instead",
                        );
                    }
                    return (
                        <IconButton
                            icon={icons.dismiss}
                            aria-label={ariaLabel}
                            onClick={onClose || close}
                            kind={light ? "primary" : "tertiary"}
                            light={light}
                            style={styles.closeButton}
                        />
                    );
                }}
            </PopoverContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        right: Spacing.xSmall,
        top: Spacing.xSmall,
        // Allows the button to be above the title and/or custom content
        zIndex: 1,
    },
});
