import {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

type IconOnly = {
    icon: React.ReactElement;
    label?: never;
};

type LabelOnly = {
    icon?: never;
    label: string;
};

type IconAndLabel = {
    /**
     * The icon to display in the badge. It should be a `PhosphorIcon` or `Icon`
     * component.
     */
    icon: React.ReactElement;
    /**
     * The label to display in the badge.
     */
    label: string;
};

/**
 * The props for the icon and label in the badge.
 * - Icon: The icon to display in the badge. It can be a PhosphorIcon, a custom svg,
 *   or `img` element. Considerations:
 *   - If the icon conveys meaning, set the alt text on the icon being used
 *   - If the icon is an `img` element, it may need width: 100% and height: 100%
 *     to render properly in the badge.
 * - Label: The label to display in the badge.
 */
export type IconLabelProps = IconOnly | LabelOnly | IconAndLabel;

type ShowIconOnly = {
    showIcon: true;
    label?: never;
    iconAriaLabel: string;
};

type ShowIconLabelOnly = {
    showIcon?: never;
    label: string;
    iconAriaLabel?: never;
};

type ShowIconAndLabel = {
    /**
     * Whether to show the icon. Defaults to `false`.
     */
    showIcon: boolean;
    /**
     * The label to display in the badge.
     */
    label: string;
    /**
     * Aria label for the icon.
     */
    iconAriaLabel?: string;
};

export type ShowIconProps = ShowIconOnly | ShowIconLabelOnly | ShowIconAndLabel;

export type BaseBadgeProps = AriaProps & {
    /**
     * The id for the badge.
     */
    id?: string;
    /**
     * The test id for the badge.
     */
    testId?: string;
    /**
     * Custom styles for the elements in the Badge component.
     * - `root`: Styles the root element
     * - `icon`: Styles the icon element
     */
    styles?: {
        root?: StyleType;
        icon?: StyleType;
    };
    /**
     * The HTML tag to render. Defaults to `div`.
     */
    tag?: keyof JSX.IntrinsicElements;
};
