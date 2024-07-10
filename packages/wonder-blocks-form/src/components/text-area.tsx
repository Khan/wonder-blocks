import * as React from "react";
import {StyleSheet} from "aphrodite";

import {
    StyleType,
    addStyle,
    useUniqueIdWithMock,
} from "@khanacademy/wonder-blocks-core";
import {border, color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

type TextAreaProps = {
    /**
     * The text area value.
     */
    value: string;
    /**
     * Called when the value has changed.
     */
    onChange: (newValue: string) => unknown;
    /**
     * An optional unique identifier for the TextArea.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     */
    testId?: string;
    /**
     * Custom styles for the text area.
     */
    style?: StyleType;
    /**
     * Provide hints or examples of what to enter.
     */
    placeholder?: string;
    /**
     * Whether the text area should be disabled.
     */
    disabled?: boolean;
    /**
     * Specifies if the text area is read-only.
     */
    readOnly?: boolean;
    /**
     * Specifies if the text area allows autocomplete.
     */
    autoComplete?: string;
    /**
     * The name for the text area control. This is submitted along with
     * the form data.
     */
    name?: string;
    /**
     * CSS classes for the textarea element. It is recommended that the style prop is used instead where possible
     */
    className?: string;
    /**
     * Whether this field should autofocus on page load.
     */
    autoFocus?: boolean;
    /**
     * The number of visible lines of text for the textarea.
     * By default, 2 rows are shown.
     * `rows` is ignored if a height is applied to the textarea using CSS.
     * The number of rows can change if the resize control is used by the user.
     */
    rows?: number;
};

const StyledTextArea = addStyle("textarea");

export default function TextArea(props: TextAreaProps) {
    const {
        onChange,
        value,
        placeholder,
        disabled,
        id,
        testId,
        style,
        readOnly,
        autoComplete,
        name,
        className,
        autoFocus,
        rows,
    } = props;

    const ids = useUniqueIdWithMock("text-area");
    const uniqueId = id ?? ids.get("id");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };
    return (
        <div>
            <StyledTextArea
                id={uniqueId}
                data-testid={testId}
                className={className}
                style={[
                    styles.textarea,
                    styles.default,
                    typographyStyles.LabelMedium,
                    disabled && styles.disabled,
                    style,
                ]}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoComplete={autoComplete}
                name={name}
                autoFocus={autoFocus}
                rows={rows}
            />
        </div>
    );
}

const styles = StyleSheet.create({
    textarea: {
        width: "100%",
        borderRadius: border.radius.medium_4,
        boxSizing: "border-box",
        padding: `10px ${spacing.medium_16}px`, // TODO(bea): token for 10px?
        minHeight: "1em",
    },
    default: {
        background: color.white,
        border: `1px solid ${color.offBlack50}`,
        color: color.offBlack,
        "::placeholder": {
            color: color.offBlack64,
        },
    },
    disabled: {
        background: color.offWhite,
        border: `1px solid ${color.offBlack16}`,
        color: color.offBlack64,
        "::placeholder": {
            color: color.offBlack64,
        },
        cursor: "not-allowed",
    },
});
