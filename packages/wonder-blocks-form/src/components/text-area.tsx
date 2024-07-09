import * as React from "react";
import {StyleSheet} from "aphrodite";
import {addStyle} from "@khanacademy/wonder-blocks-core";

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
     * Provide hints or examples of what to enter.
     */
    placeholder?: string;
};

const StyledTextArea = addStyle("textarea");

export default function TextArea(props: TextAreaProps) {
    const {onChange, value, placeholder} = props;
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };
    return (
        <StyledTextArea
            style={[styles.textarea]}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}

const styles = StyleSheet.create({
    textarea: {},
});
