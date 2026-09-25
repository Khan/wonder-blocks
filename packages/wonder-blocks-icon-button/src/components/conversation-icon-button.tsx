import * as React from "react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

import type {
    ActivityIconButtonActionType,
    BaseIconButtonProps,
    IconButtonRef,
} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";
import styles from "./conversation-icon-button.module.css";

type Props = BaseIconButtonProps & {
    /**
     * The action type of the button. This determines the visual style of the
     * button.
     *
     * - `progressive` is used for actions that move the user forward in a flow.
     * - `neutral` is used for buttons that indicate a neutral action.
     */
    actionType?: ActivityIconButtonActionType;
    /**
     * The alternative text for the icon button. Use `aria-label` for when
     * there's no visible label for the button, such as when the button only
     * contains an icon.
     */
    "aria-label": string;
};

/**
 * `ConversationIconButton` is an icon button that is used in the context of
 * conversations, such as sending a message or performing an action related to a
 * conversation. This is useful in chat widgets, like the one used in Khanmigo.
 *
 * ```tsx
 * import microphone from "@phosphor-icons/core/bold/microphone-bold.svg";
 * import {ConversationIconButton} from "@khanacademy/wonder-blocks-icon-button";
 *
 * <ConversationIconButton
 *     icon={microphone}
 *     aria-label="Start a conversation"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export const ConversationIconButton: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<IconButtonRef>
> = React.forwardRef<IconButtonRef, Props>(function ConversationIconButton(
    props: Props,
    ref,
) {
    const {
        actionType = "progressive",
        disabled = false,
        icon,
        kind = "primary",
        style,
        type = "button",
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    // One class per variant axis. Each of these only assigns the
    // `--wb-c-conversation-icon-button--*` component tokens that its axis owns;
    // `styles.button` and the state rules in the module read those tokens.
    // `disabled` is selected in CSS via the `[aria-disabled="true"]` attribute
    // (set by `IconButtonUnstyled`), which keeps the element focusable.
    // Class-name strings are composed through the `style` prop —
    // `processStyleList` routes them to `className`.
    const buttonStyles = [
        styles.button,
        styles[kind],
        styles[actionType],
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
            {/* If the icon is not a string, it is a custom icon that can be
            rendered directly with the corresponding styles */}
            {typeof icon !== "string" ? (
                React.cloneElement(icon, {style: [styles.icon]})
            ) : (
                <PhosphorIcon size="small" color="currentColor" icon={icon} />
            )}
        </IconButtonUnstyled>
    );
});
