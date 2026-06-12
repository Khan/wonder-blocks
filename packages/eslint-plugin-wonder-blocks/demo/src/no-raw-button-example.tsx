/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-raw-button`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {
    SingleSelect,
    OptionItem,
    CustomOpener,
} from "@khanacademy/wonder-blocks-dropdown";
import plusIcon from "@phosphor-icons/core/regular/plus.svg";

// ✅ Valid: WB Button handles focus styles, keyboard nav, and theming
export function ValidButtonExample() {
    return <Button onClick={() => {}}>Save changes</Button>;
}

// ✅ Valid: WB Button with style override — no raw button needed for custom visuals
export function ValidStyledButtonExample() {
    return (
        <Button kind="tertiary" style={styles.customButton} onClick={() => {}}>
            Save changes
        </Button>
    );
}

// ✅ Valid: WB IconButton for icon-only actions
export function ValidIconButtonExample() {
    return <IconButton icon={plusIcon} aria-label="Add item" onClick={() => {}} />;
}

// ✅ Valid: CustomOpener for custom-styled dropdown openers
export function ValidCustomOpenerExample() {
    return (
        <SingleSelect
            placeholder="Choose an option"
            opener={({hovered, focused, text}) => (
                <CustomOpener styles={{root: styles.myOpener}}>
                    {String(text)}
                </CustomOpener>
            )}
            onChange={() => {}}
        >
            {[
                <OptionItem key="1" label="Option 1" value="1" />,
                <OptionItem key="2" label="Option 2" value="2" />,
            ]}
        </SingleSelect>
    );
}

// ❌ Invalid: raw HTML <button> bypasses WB focus styles and theming
export function InvalidRawButtonExample() {
    return <button onClick={() => {}}>Save changes</button>;
}

// ❌ Invalid: raw <button> with type="submit"
export function InvalidSubmitButtonExample() {
    return <button type="submit">Submit form</button>;
}

// ❌ Invalid: addStyle("button") creates a raw button wrapper
const StyledButton = addStyle("button");
export function InvalidStyledButtonExample() {
    return (
        <StyledButton onClick={() => {}}>Save changes</StyledButton>
    );
}

// ❌ Invalid: addStyle("button") regardless of what you name the variable
const PrimaryButton = addStyle("button");
export function InvalidRenamedStyledButtonExample() {
    return <PrimaryButton onClick={() => {}}>Save changes</PrimaryButton>;
}

const styles = StyleSheet.create({
    customButton: {
        borderRadius: 20,
    },
    myOpener: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        border: "1px solid currentColor",
        borderRadius: 4,
    },
});
