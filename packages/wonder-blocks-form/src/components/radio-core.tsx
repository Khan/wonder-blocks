import * as React from "react";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import type {ChoiceCoreProps} from "../util/types";

import styles from "./radio-core.module.css";

const StyledInput = addStyle("input");
const StyledSpan = addStyle("span");

/**
 * The internal stateless 🔘 Radio button
 */ const RadioCore = React.forwardRef(function RadioCore(
    props: ChoiceCoreProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const innerRef = React.useRef<HTMLInputElement>(null);

    const handleChange = () => {
        // Empty because change is handled by ClickableBehavior
        return;
    };

    const {checked, disabled, error, groupName, id, testId, ...sharedProps} =
        props;

    const defaultStyle = [
        styles.input,
        checked && styles.checked,
        disabled && styles.disabled,
        error && styles.error,
    ];

    // The `root` class carries no styling of its own — every rule in the
    // module is qualified with it so this component's styles outrank the
    // single-class rule that `View` ships in the same `@layer shared`. See
    // `radio-core.module.css`.
    const wrapperStyle = [styles.root, styles.wrapper];

    const handleWrapperClick = (e: React.MouseEvent) => {
        // forward event from wrapper Div
        if (!disabled && e.target !== innerRef?.current) {
            innerRef?.current?.click();
        }
    };

    return (
        <React.Fragment>
            <View style={wrapperStyle} onClick={handleWrapperClick}>
                <StyledInput
                    {...sharedProps}
                    type="radio"
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
                    ref={(node) => {
                        // @ts-expect-error: current is not actually read-only
                        innerRef.current = node;
                        if (typeof ref === "function") {
                            ref(node);
                        } else if (ref != null) {
                            ref.current = node;
                        }
                    }}
                />
                {disabled && checked && (
                    <StyledSpan
                        style={[
                            styles.disabledChecked,
                            error && styles.disabledCheckedError,
                        ]}
                    />
                )}
            </View>
        </React.Fragment>
    );
});

export default RadioCore;
