import * as React from "react";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusIcon from "@phosphor-icons/core/bold/minus-bold.svg";

import type {ChoiceCoreProps, Checked} from "../util/types";

import styles from "./checkbox-core.module.css";

// `AriaChecked` and `mapCheckedToAriaChecked()` are used to convert the
// `checked` prop value to a value that a screen reader can understand via the
// `aria-checked` attribute
type AriaChecked = "true" | "false" | "mixed";

function mapCheckedToAriaChecked(value: Checked): AriaChecked {
    switch (value) {
        case true:
            return "true";
        case false:
            return "false";
        default:
            return "mixed";
    }
}

const StyledInput = addStyle("input");

/**
 * The internal stateless ☑️ Checkbox
 */
const CheckboxCore = React.forwardRef(function CheckboxCore(
    props: ChoiceCoreProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {checked, disabled, error, groupName, id, testId, ...sharedProps} =
        props;

    const innerRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        // Keep the indeterminate state in sync with the checked prop
        if (innerRef.current != null) {
            innerRef.current.indeterminate = checked == null;
        }
    }, [checked, innerRef]);

    const handleChange: () => void = () => {
        // Empty because change is handled by ClickableBehavior
        return;
    };

    const isCheckedOrIndeterminate = checked || checked == null;

    const defaultStyle = [
        styles.input,
        isCheckedOrIndeterminate && styles.checked,
        disabled && styles.disabled,
        error && styles.error,
    ];

    // The `root` class carries no styling of its own — every rule in the
    // module is qualified with it so this component's styles outrank the
    // single-class rules that `View` and `PhosphorIcon` ship in the same
    // `@layer shared`. See `checkbox-core.module.css`.
    const wrapperStyle = [styles.root, styles.wrapper];

    const checkboxIcon = (
        <PhosphorIcon
            // The icon masks its glyph with `currentColor`, so the colour (and
            // the smaller check size) is set by the `icon` class.
            icon={checked ? checkIcon : minusIcon}
            size="small"
            style={[styles.icon, disabled && styles.iconDisabled]}
        />
    );

    const ariaChecked = mapCheckedToAriaChecked(checked);

    const handleWrapperClick = (e: React.MouseEvent) => {
        // forward event from wrapper Div
        if (!disabled && e.target !== innerRef.current) {
            innerRef.current?.click();
        }
    };

    return (
        <React.Fragment>
            <View
                style={wrapperStyle}
                onClick={handleWrapperClick}
                testId="wb-checkbox-wrapper"
            >
                <StyledInput
                    {...sharedProps}
                    ref={(node) => {
                        // @ts-expect-error: current is not actually read-only
                        innerRef.current = node;
                        if (typeof ref === "function") {
                            ref(node);
                        } else if (ref != null) {
                            ref.current = node;
                        }
                    }}
                    type="checkbox"
                    aria-checked={ariaChecked}
                    aria-invalid={error}
                    checked={checked ?? undefined}
                    disabled={disabled}
                    id={id}
                    name={groupName}
                    // Need to specify because this is a controlled React form
                    // component, but we handle the click via ClickableBehavior
                    onChange={handleChange}
                    style={defaultStyle}
                    data-testid={testId}
                />
                {isCheckedOrIndeterminate ? checkboxIcon : <></>}
            </View>
        </React.Fragment>
    );
});

export default CheckboxCore;
