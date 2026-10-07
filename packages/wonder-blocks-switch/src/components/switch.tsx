import * as React from "react";

import {AriaProps, View, addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {useId} from "react";
import styles from "./switch.module.css";

type Props = Pick<
    AriaProps,
    "aria-labelledby" | "aria-label" | "aria-describedby"
> & {
    /**
     * Whether this component is checked.
     */
    checked: boolean;
    /**
     * Whether the switch is disabled. Defaults to `false`.
     *
     * Internally, the `aria-disabled` attribute will be set so that the
     * element remains focusable and will be included in the tab order.
     */
    disabled?: boolean;
    /**
     * Optional icon to display on the slider.
     */
    icon?: React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>;
    /**
     * The unique identifier for the switch.
     */
    id?: string;
    /**
     * Function to call when the switch is clicked.
     * @param newCheckedValue
     * @returns {unknown}
     */
    onChange?: (newCheckedState: boolean) => unknown;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Adds CSS classes to the component.
     */
    className?: string;
};

const StyledSpan = addStyle("span");
const StyledInput = addStyle("input");

const Switch = React.forwardRef(function Switch(
    props: Props,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        checked,
        className,
        disabled = false,
        icon,
        id,
        onChange,
        testId,
    } = props;

    const generatedUniqueId = useId();
    const uniqueId = id ?? generatedUniqueId;

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };
    const handleChange = () => {};

    // The `root` class carries no styling of its own — every rule in the
    // module is qualified with it so this component's styles outrank the
    // single-class rules that `View` and `PhosphorIcon` ship in the same
    // `@layer shared`. See `switch.module.css`.
    const combinedStyles = [
        styles.root,
        styles.switch,
        checked && styles.checked,
        onChange !== undefined && styles.clickable,
        disabled && styles.disabled,
    ];

    let styledIcon:
        | React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>
        | undefined;
    if (icon) {
        styledIcon = React.cloneElement(icon, {
            size: "small",
            style: styles.icon,
            "aria-hidden": true,
        } as Partial<React.ComponentProps<typeof PhosphorIcon>>);
    }

    return (
        <View
            onClick={handleClick}
            style={combinedStyles}
            className={className}
            testId={testId}
        >
            <StyledInput
                aria-describedby={ariaDescribedBy}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                checked={checked}
                aria-disabled={disabled}
                id={uniqueId}
                // Need to specify because this is a controlled React component, but we
                // handle the clicks on the outer View
                onChange={handleChange}
                ref={ref}
                role="switch"
                // Input is visually hidden because we use a view and span to render
                // the actual switch. The input is used for accessibility.
                style={styles.hidden}
                type="checkbox"
            />
            {icon && styledIcon}
            <StyledSpan style={styles.slider} />
        </View>
    );
});

export default Switch;
