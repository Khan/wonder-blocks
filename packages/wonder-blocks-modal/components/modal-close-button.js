// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

type Props = {|
    /**
     * Whether the button icon should be dark (for light backgrounds), or light
     * (for dark backgrounds).
     */
    color: "dark" | "light",

    /** Called when the button is clicked. */
    onClick: () => void,
|};

/** A close button for modals. */
export default class ModalCloseButton extends React.Component<Props> {
    static defaultProps = {
        color: "dark",
    };

    render() {
        return (
            <IconButton
                icon={icons.dismiss}
                style={[
                    styles.button,
                    this.props.color === "dark" && styles.dark,
                    this.props.color === "light" && styles.light,
                ]}
                // TODO(mdr): Translate this string for i18n.
                aria-label="Close modal"
                onClick={this.props.onClick}
            />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        // Reset <button> styles to be more like <div>.
        background: "none",
        border: "none",
        font: "inherit",
        padding: 0,

        cursor: "pointer",
        fontSize: 24,
        lineHeight: "48px",
        width: 48,
        height: 48,
    },

    dark: {
        color: Color.offBlack50,
    },

    light: {
        color: Color.white,
    },
});
