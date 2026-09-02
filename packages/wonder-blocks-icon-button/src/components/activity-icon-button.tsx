import * as React from "react";
import {Link} from "react-router-dom-v5-compat";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import type {
    ActivityIconButtonActionType,
    ActivityIconButtonProps,
} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";
import styles from "./activity-icon-button.module.css";

type AriaLabelOnly = {
    /**
     * The alternative text for the icon button. Use `aria-label` for when
     * there's no visible label for the button, such as when the button only
     * contains an icon.
     */
    "aria-label": string;
    label?: never;
};

type LabelOnly = {
    "aria-label"?: never;
    /**
     * A label for the button that describes its action.
     *
     * NOTE: If `label` is set, then `aria-label` will be ignored.
     */
    label: string;
};

type Props = ActivityIconButtonProps &
    (AriaLabelOnly | LabelOnly) & {
        /**
         * The action type of the button. This determines the visual style of the
         * button.
         *
         * - `progressive` is used for actions that move the user forward in a flow.
         * - `neutral` is used for buttons that indicate a neutral action.
         */
        actionType?: ActivityIconButtonActionType;
    };

/**
 * `ActivityIconButton` is an icon button that is used for actions in the
 * context of learner activities. It uses a "chonky" design, which is a more
 * playful and engaging design that is suitable for learner activities
 *
 * ```tsx
 * import magnifyingGlassIcon from
 * "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import {ActivityIconButton} from "@khanacademy/wonder-blocks-icon-button";
 *
 * <ActivityIconButton
 *     icon={magnifyingGlassIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export const ActivityIconButton: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ActivityIconButton(props: Props, ref) {
    const {
        actionType = "progressive",
        disabled = false,
        icon,
        kind = "primary",
        styles: stylesProp,
        type = "button",
        // labeling
        "aria-label": ariaLabel,
        label,
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    // One class per variant axis. Each of these only assigns the
    // `--wb-c-activity-icon-button--*` component tokens that its axis owns;
    // `styles.button` / `styles.box` and the state rules in the module read
    // those tokens. `disabled` is selected in CSS via the
    // `[aria-disabled="true"]` attribute (set by `IconButtonUnstyled`), which
    // keeps the element focusable. Class-name strings are composed through the
    // `style` prop — `processStyleList` routes them to `className`.
    const buttonStyles = [
        styles.button,
        styles[actionType],
        styles[kind],
        // Enable the press state for programmatic (keyboard) interaction
        // tracked by `IconButtonUnstyled`'s `onPress` callback.
        !disabled && pressed && styles.pressed,
        stylesProp?.root,
    ];

    // The box's own rest / hover / press / disabled styling is driven by the
    // root's state selectors in the module, so this only needs the base class.
    const chonkyStyles = [styles.box, stylesProp?.box];

    const handlePress = React.useCallback((isPressing: boolean) => {
        setPressed(isPressing);
    }, []);

    const hasVisibleLabel = label !== undefined && label !== "";

    const iconElement = React.useMemo(() => {
        if (typeof icon === "string") {
            return (
                <PhosphorIcon size="medium" color="currentColor" icon={icon} />
            );
        }

        return icon;
    }, [icon]);

    return (
        <IconButtonUnstyled
            {...restProps}
            disabled={disabled}
            kind={kind}
            onPress={handlePress}
            ref={ref}
            style={buttonStyles}
            type={type}
            {...(!hasVisibleLabel ? {"aria-label": ariaLabel} : {})}
        >
            <>
                {/* NOTE: The plain `chonky` className is kept as a
                consumer/test hook. It no longer drives styling — the box is
                styled by descendant selectors from the root in the CSS
                module. */}
                <View style={chonkyStyles} className="chonky">
                    {iconElement}
                </View>
                {hasVisibleLabel && (
                    <BodyText
                        tag="span"
                        size="small"
                        weight="semi"
                        style={[styles.label, stylesProp?.label]}
                    >
                        {label}
                    </BodyText>
                )}
            </>
        </IconButtonUnstyled>
    );
});
