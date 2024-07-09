import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle, useUniqueIdWithMock} from "@khanacademy/wonder-blocks-core";
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
     * Provide hints or examples of what to enter.
     */
    placeholder?: string;
    /**
     * Whether the text area should be disabled.
     */
    disabled?: boolean;
};

const StyledTextArea = addStyle("textarea");

export default function TextArea(props: TextAreaProps) {
    const {onChange, value, placeholder, disabled, id} = props;

    const ids = useUniqueIdWithMock("text-area");
    const uniqueId = id ?? ids.get("id");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };
    return (
        <div>
            <StyledTextArea
                id={uniqueId}
                style={[
                    styles.textarea,
                    styles.default,
                    typographyStyles.LabelMedium,
                    disabled && styles.disabled,
                ]}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
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
