// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

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

export default class CloseButton extends React.Component<Props> {
    static defaultProps = {
        light: true,
        "aria-label": "Close Popover",
    };

    render() {
        const {light, onClose, "aria-label": ariaLabel} = this.props;
        return (
            <IconButton
                icon={icons.dismiss}
                aria-label={ariaLabel}
                onClick={onClose}
                kind={light ? "primary" : "tertiary"}
                light={light}
                style={styles.closeButton}
            />
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
