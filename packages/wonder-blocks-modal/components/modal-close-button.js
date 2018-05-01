// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "wonder-blocks-color";

type Props = {
    /**
     * Whether the button icon should be dark (for light backgrounds), or light
     * (for dark backgrounds).
     */
    color: "dark" | "light",

    /** Called when the button is clicked. */
    onClick: () => void,
};

/** A close button for modals. */
export default class ModalCloseButton extends React.Component<Props> {
    static defaultProps = {
        color: "dark",
    };

    render() {
        return (
            // TODO(mdr): This should be a Wonder Blocks `IconButton`, with the
            //     cross icon. Instead, I'm just using a plain text
            //     multiplication sign.
            <button
                type="button"
                className={css(
                    styles.button,
                    this.props.color === "dark" && styles.dark,
                    this.props.color === "light" && styles.light,
                )}
                // TODO(mdr): Translate this string for i18n.
                aria-label="Close modal"
                onClick={this.props.onClick}
            >
                {"\xd7"}
            </button>
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

        // TODO(mdr): The modal should specify light or dark.
        color: Color.white,
        fontSize: 24,
        lineHeight: 1,
    },

    dark: {
        color: Color.offBlack50,
    },

    light: {
        color: Color.white,
    },
});
