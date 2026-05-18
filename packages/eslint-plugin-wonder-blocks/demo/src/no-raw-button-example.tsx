/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-raw-button`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

import Button from "@khanacademy/wonder-blocks-button";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import plusIcon from "@phosphor-icons/core/regular/plus.svg";

// ✅ Valid: WB Button handles focus styles, keyboard nav, and theming
export function ValidButtonExample() {
    return <Button onClick={() => {}}>Save changes</Button>;
}

// ✅ Valid: WB IconButton for icon-only actions
export function ValidIconButtonExample() {
    return <IconButton icon={plusIcon} aria-label="Add item" onClick={() => {}} />;
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
