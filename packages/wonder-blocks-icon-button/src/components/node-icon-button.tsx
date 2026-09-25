import * as React from "react";
import {Link} from "react-router-dom-v5-compat";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import type {BaseIconButtonProps} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";
import {mapTokensToVariables} from "../util/map-tokens-to-variables";
import styles from "./node-icon-button.module.css";

/**
 * The prefix for the CSS variables used in the NodeIconButton component.
 *
 * This allows us to avoid collisions with other CSS variables in the
 * application.
 */
const VAR_PREFIX = "--wb-c-node-icon-button--";

type Props = Omit<BaseIconButtonProps, "kind" | "style"> & {
    /**
     * The action type of the button. This determines the visual style of
     * the button. Defaults to `notStarted`.
     *
     * - `complete` is used for buttons that indicate a complete action.
     */
    actionType?: "notStarted" | "attempted" | "complete";
    /**
     * The alternative text for the icon button. Required for accessibility.
     */
    "aria-label": string;

    /**
     * The size of the icon button.
     * One of `small` (24) or `large` (68).
     * Defaults to `large`.
     */
    size?: "small" | "large";

    /**
     * Custom styles for the elements in the NodeIconButton component.
     * - `root`: Styles the root element (button)
     * - `box`: Styles the "chonky" box element
     * - `icon`: Styles the icon element
     */
    styles?: {
        root?: StyleType;
        box?: StyleType;
        icon?: StyleType;
    };

    /**
     * The token object that contains the CSS variables that can be overridden
     * to customize the appearance of the NodeIconButton component.
     */
    tokens?: {
        boxForeground?: string;
        boxBackground?: string;
        boxShadowColor?: string;
        boxPadding?: string | number;
        boxShadowYRest?: string | number;
        boxShadowYHover?: string | number;
        boxShadowYPress?: string | number;
        iconSize?: string | number;
    };
};

/**
 * Node buttons are visual representations of activities along in a Learning
 * Path. When a represented Node is a button that launches the activity. Nodes
 * use the Chonky shadow style.
 *
 * ```tsx
 * import pencilSimpleIcon from "@phosphor-icons/core/regular/pencil-simple.svg";
 * import {NodeIconButton} from "@khanacademy/wonder-blocks-icon-button";
 *
 * <NodeIconButton
 *     icon={pencilSimpleIcon}
 *     aria-label="Edit"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export const NodeIconButton: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function NodeIconButton(props: Props, ref) {
    const {
        actionType = "notStarted",
        disabled = false,
        icon,
        size = "large",
        styles: stylesProp,
        tokens,
        type = "button",
        // labeling
        "aria-label": ariaLabel,
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    // One class per variant axis. Each of these only assigns the
    // `--wb-c-node-icon-button--*` component tokens that its axis owns;
    // `styles.button` / `styles.box` / `styles.icon` and the state rules in the
    // module read those tokens. `disabled` is selected in CSS via the
    // `[aria-disabled="true"]` attribute (set by `IconButtonUnstyled`), which
    // keeps the element focusable. Class-name strings are composed through the
    // `style` prop — `processStyleList` routes them to `className`.
    //
    // The `tokens` prop stays last so its declarations (which are emitted
    // unlayered) override the variant classes.
    const buttonStyles = React.useMemo(
        () => [
            styles.button,
            styles[size],
            styles[actionType],
            // Enable the press state for programmatic (keyboard) interaction
            // tracked by `IconButtonUnstyled`'s `onPress` callback.
            !disabled && pressed && styles.pressed,
            stylesProp?.root,
            // Token overrides.
            tokens && mapTokensToVariables(tokens, VAR_PREFIX),
        ],
        [actionType, disabled, pressed, size, stylesProp?.root, tokens],
    );

    // The box's own hover / press / disabled styling is driven by the root's
    // state selectors in the module, so this only needs the base class.
    const chonkyStyles = [styles.box, stylesProp?.box];

    const handlePress = React.useCallback((isPressing: boolean) => {
        setPressed(isPressing);
    }, []);

    const iconElement = React.useMemo(() => {
        if (typeof icon === "string") {
            return (
                <PhosphorIcon
                    style={[styles.icon, stylesProp?.icon]}
                    color="currentColor"
                    icon={icon}
                />
            );
        }

        return React.cloneElement(icon, {
            style: [styles.icon, stylesProp?.icon],
        });
    }, [icon, stylesProp?.icon]);

    return (
        <IconButtonUnstyled
            {...restProps}
            disabled={disabled}
            onPress={handlePress}
            ref={ref}
            style={buttonStyles as StyleType}
            type={type}
            aria-label={ariaLabel}
        >
            <>
                {/* NOTE: The plain `chonky` className is kept as a
                consumer/test hook. It no longer drives styling — the box is
                styled by descendant selectors from the root in the CSS
                module. */}
                <View style={chonkyStyles} className="chonky">
                    {iconElement}
                </View>
            </>
        </IconButtonUnstyled>
    );
});
