import * as React from "react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import type {
    IconButtonProps,
    IconButtonRef,
    IconButtonSize,
} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";
import styles from "./icon-button.module.css";

/**
 * Returns the phosphor icon component based on the size. This is necessary
 * so we can cast the icon to the correct type.
 */
function IconChooser({
    icon,
    size,
}: {
    icon: IconButtonProps["icon"];
    size: IconButtonSize;
}) {
    // The icon's box is sized by the `--wb-c-icon-button--icon-size` component
    // token, which the `size` class on the root element assigns. This keeps the
    // icon size theme-driven without the component having to read the theme
    // object in JS.

    // If the icon is not a string, it is a custom icon that can be rendered
    // directly with the corresponding styles
    if (typeof icon !== "string") {
        return React.cloneElement(icon, {
            style: [styles.icon],
        });
    }

    switch (size) {
        case "small":
            return (
                <PhosphorIcon
                    size="small"
                    color="currentColor"
                    icon={icon as PhosphorBold | PhosphorFill}
                    style={styles.icon}
                />
            );
        case "medium":
        default:
            return (
                <PhosphorIcon
                    size="medium"
                    color="currentColor"
                    icon={icon as PhosphorRegular | PhosphorFill}
                    style={styles.icon}
                />
            );
    }
}

/**
 * An `IconButton` is a button whose contents are an SVG image.
 *
 * To use, supply an `onClick` function, a Phosphor icon asset (see the
 * `Icon>PhosphorIcon` section) and an `aria-label` to describe the button
 * functionality. Optionally specify href (URL), clientSideNav, color (Wonder
 * Blocks Blue or Red), kind ("primary", "secondary", or "tertiary"), light
 * (whether the IconButton will be rendered on a dark background), disabled ,
 * test ID, and custom styling.
 *
 * The size of an `IconButton` is based on how the `size` prop is defined (see
 * `Sizes` below for more details). The focus ring which is displayed on hover
 * and focus is much larger but does not affect its size. This matches the
 * behavior of Button.
 *
 * IconButtons require a certain amount of space between them to ensure the
 * focus rings don't overlap. The minimum amount of spacing is 1.6rem, but you
 * should refer to the mocks provided by design.  Using the `gap` CSS property
 * in between IconButtons is the preferred way to for adding this spacing.
 *
 * Many layouts require alignment of visual left (or right) side of an
 * `IconButton`. This requires a little bit of pixel nudging since each icon as
 * a different amount of internal padding.
 *
 * See the Toolbar documentation for examples of `IconButton` use that follow
 * the best practices described above.
 *
 * ```js
 * import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import IconButton from "@khanacademy/wonder-blocks-icon-button";
 *
 * <IconButton
 *     icon={magnifyingGlassIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 *     size="medium"
 * />
 * ```
 */
export const IconButton: React.ForwardRefExoticComponent<
    IconButtonProps & React.RefAttributes<IconButtonRef>
> = React.forwardRef<IconButtonRef, IconButtonProps>(function IconButton(
    props: IconButtonProps,
    ref,
) {
    const {
        actionType = "progressive",
        disabled = false,
        icon,
        kind = "primary",
        size = "medium",
        style,
        type = "button",
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    // One class per variant axis. Each of these only assigns the
    // `--wb-c-icon-button--*` component tokens that its axis owns;
    // `styles.button` and the state rules in the module read those tokens.
    // `disabled` is selected in CSS via the `[aria-disabled="true"]` attribute
    // (set by `IconButtonUnstyled`), which keeps the element focusable.
    // Class-name strings are composed through the `style` prop —
    // `processStyleList` routes them to `className`.
    const buttonStyles = [
        styles.button,
        styles[kind],
        styles[actionType],
        styles[size],
        // Enable the press state for programmatic (keyboard) interaction
        // tracked by `IconButtonUnstyled`'s `onPress` callback.
        !disabled && pressed && styles.pressed,
        style,
    ];

    const handlePress = React.useCallback((isPressing: boolean) => {
        setPressed(isPressing);
    }, []);

    return (
        <IconButtonUnstyled
            {...restProps}
            disabled={disabled}
            kind={kind}
            onPress={handlePress}
            ref={ref}
            style={buttonStyles}
            type={type}
        >
            <IconChooser size={size} icon={icon} />
        </IconButtonUnstyled>
    );
});
