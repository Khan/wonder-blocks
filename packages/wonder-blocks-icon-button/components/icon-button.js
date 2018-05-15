// @flow
import React from "react";

import Color from "wonder-blocks-color";
import {ClickableBehavior} from "wonder-blocks-core";
import type {ValidTints} from "wonder-blocks-color";
import IconButtonCore from "./icon-button-core.js";

export type SharedProps = {
    /**
     * An icon, supplied as an svg path string.
     */
    icon: string,

    /**
     * Text to display as the title of the svg element.
     */
    alt: string,

    /**
     * The color of the button, either blue or red.
     */
    color: ValidTints,

    /**
     * The kind of the button, either primary, secondary, or tertiary.
     *
     * In default state:
     * - Primary buttons have background colors
     * - Secondary buttons have a border and no background color
     * - Tertiary buttons have no background or border
     */
    kind: "primary" | "secondary" | "tertiary",

    /**
     * Whether the button is on a dark/colored background.
     *
     * Sets primary button background color to white, and secondary and
     * tertiary button title to color.
     */
    light: boolean,

    /**
     * Whether the button is disabled.
     */
    disabled: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

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

type Props = SharedProps & {
    /**
     * Function to call when the IconButton is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     */
    onClick: (e: SyntheticEvent<>) => void,
};

/**
 * An IconButton is a button whose contents are an SVG image.
 *
 * To use, supply an onClick function, the path (string) of your SVG image, and
 * alt-text for your image. Optionally specify color (Wonder Blocks Blue or
 * Red), kind ("primary", "secondary", or "tertiary"), light (whether the
 * IconButton will be rendered on a dark background), disabled (whether the
 * button should be disabled), test ID, and custom styling.
 *
 * ```js
 * <IconButton
 *     icon={anIcon}
 *     alt="An Icon"
 *     onClick={console.log("Hello, world!")}
 * />
 * ```
 * @version 1.0
 * @since 1.0
 */
export default class IconButton extends React.Component<Props> {
    static defaultProps = {
        color: Color.blue,
        kind: "primary",
        light: false,
        disabled: false,
    };

    render() {
        const {onClick, ...sharedProps} = this.props;
        return (
            <ClickableBehavior
                disabled={sharedProps.disabled}
                onClick={onClick}
            >
                {(state, handlers) => {
                    return (
                        <IconButtonCore
                            {...sharedProps}
                            {...state}
                            {...handlers}
                        />
                    );
                }}
            </ClickableBehavior>
        );
    }
}
