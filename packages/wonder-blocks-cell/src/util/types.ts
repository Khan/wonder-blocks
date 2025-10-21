import * as React from "react";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import type {Typography} from "@khanacademy/wonder-blocks-typography";
import {ClickableRole} from "@khanacademy/wonder-blocks-clickable";

/**
 * A set of values that can be used to configure the horizontal rule appearance.
 */
export type HorizontalRuleVariant = "full-width" | "inset" | "none";

/**
 * An element or component that represents an accessory within a cell.
 */
type Accessory = React.ReactNode;

/**
 * A union that allows using  plain text or WB Typography elements.
 */
export type TypographyText =
    | string
    | React.ReactElement<React.ComponentProps<Typography>>;

/**
 * Common properties for all cells.
 */
export type CellProps = {
    /**
     * The title / main content of the cell. You can either provide a string or
     * a Typography component. If a string is provided, typography defaults to
     * LabelLarge.
     */
    title: TypographyText;
    /**
     * If provided, this adds a left accessory to the cell. Left
     * Accessories can be defined using WB components such as Icon,
     * IconButton, or it can even be used for a custom node/component if
     * needed. What ever is passed in will occupy the "LeftAccessory” area
     * of the Cell.
     */
    leftAccessory?: Accessory;
    /**
     * If provided, this adds a right accessory to the cell. Right
     * Accessories can be defined using WB components such as Icon,
     * IconButton, or it can even be used for a custom node/component if
     * needed. What ever is passed in will occupy the “RightAccessory”
     * area of the Cell.
     */
    rightAccessory?: Accessory;
    /**
     * Adds a horizontal rule at the bottom of the cell that can be used to
     * separate cells within groups such as lists. Defaults to `inset`.
     */
    horizontalRule?: HorizontalRuleVariant;

    /**
     * A custom role for the cell.
     */
    role?: ClickableRole;
    /**
     * Custom styles for the elements of Cell. Useful if there are
     * specific cases where spacing between elements needs to be customized.
     */
    styles?: {
        root?: StyleType;
        content?: StyleType;
        // NOTE: This can only be used if leftAccessory is set.
        leftAccessory?: StyleType;
        // NOTE: This can only be used if rightAccessory is set.
        rightAccessory?: StyleType;
    };
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Called when the cell is clicked.
     *
     * If not provided, the Cell can’t be hovered and/or pressed (highlighted on
     * hover).
     */
    onClick?: (e: React.SyntheticEvent) => unknown;
    /**
     * Whether the cell is active (or currently selected).
     */
    active?: boolean;
    /**
     * Whether the cell is disabled.
     */
    disabled?: boolean;
    /**
     * Used to announce the cell's content to screen readers.
     */
    "aria-label"?: string;
    /**
     * Used to indicate the current element is selected.
     */
    "aria-selected"?: AriaProps["aria-selected"];
    /**
     * Used to indicate the current item is checked.
     */
    "aria-checked"?: AriaProps["aria-checked"];
    /**
     * Optinal href which Cell should direct to, uses client-side routing
     * by default if react-router is present.
     */
    href?: string;
    /**
     * A target destination window for a link to open in. Should only be used
     * when `href` is specified.
     *
     * TODO(WB-1262): only allow this prop when `href` is also set.t
     */
    target?: "_blank";

    /**
     * Set the tabindex attribute on the rendered element.
     */
    tabIndex?: number;
};
