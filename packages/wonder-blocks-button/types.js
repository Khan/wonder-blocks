// @flow
import React from "react";
import type {Element} from "react";

import type {ValidTints} from "wonder-blocks-color";

export type SharedProps = {
    /**
     * Text to appear on the button.
     */
    children: string,

    /**
     * An icon, displayed to the left of the title.
     */
    icon?: string,

    /**
     * If true, replaces the contents with a spinner.
     */
    // TODO(yejia): Implement once spinner is implemented.
    // spinner: boolean,

    /**
     * The color of the button, either blue (default) or red.
     */
    color?: ValidTints,

    /**
     * The kind of the button, either primary, secondary, or tertiary.
     *
     * In default state:
     * - Primary buttons (default) have background colors
     * - Secondary buttons have a border and no background color
     * - Tertiary buttons have no background or border
     */
    kind?: "primary" | "secondary" | "tertiary",

    /**
     * Whether the button is on a dark/colored background. Default is false.
     *
     * Sets primary button background color to white, and secondary and
     * tertiary button title to color.
     */
    light?: boolean,

    /**
     * The size of the button.
     *
     * default = height: 40, small = height: 32
     */
    size?: "default" | "small",

    /**
     * Whether the button is disabled. Default is false.
     */
    disabled?: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId: string,

    /**
     * Callback that will be fired regardless of whether the button uses a URL
     * or an onClick handler.
     *
     * This callback can be used for firing BigBingo conversions.
     */
    // onAction: () => void,

    /**
     * The content of the modal, appearing between the titlebar and footer.
     */
    style?: any,
    // TODO(yejia): use this if ADR #47 has been implemented
    /*
    style?: Style<Exact<{
        width?: number | string
        position: Position,
        ...MarginStyles,
        ...FlexItemStyles,
    }>>,
    */
};
