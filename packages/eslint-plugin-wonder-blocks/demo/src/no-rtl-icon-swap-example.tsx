/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-rtl-icon-swap`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import caretLeftIcon from "@phosphor-icons/core/regular/caret-left.svg";
import caretRightIcon from "@phosphor-icons/core/regular/caret-right.svg";
import caretDownIcon from "@phosphor-icons/core/regular/caret-down.svg";
import signInIcon from "@phosphor-icons/core/regular/sign-in.svg";
import signOutIcon from "@phosphor-icons/core/regular/sign-out.svg";

declare const isRTL: boolean;
declare const isExpanded: boolean;
declare const RequestInfo: {isRTL: boolean};

// ✅ Valid: pass the LTR glyph; PhosphorIcon mirrors whitelist icons in RTL.
export function ValidLtrGlyphOnly() {
    return <PhosphorIcon icon={caretRightIcon} />;
}

// ✅ Valid: expand/collapse swap is not an RTL icon swap.
export function ValidExpandCollapse() {
    const icon = isExpanded ? caretDownIcon : caretRightIcon;
    return <PhosphorIcon icon={icon} />;
}

// ❌ Invalid: RTL ternary on whitelist carets — double-flips under auto-mirror.
export function InvalidCaretSwap() {
    const icon = isRTL ? caretLeftIcon : caretRightIcon;
    return <PhosphorIcon icon={icon} />;
}

// ❌ Invalid: RequestInfo.isRTL with arrow/caret pair.
export function InvalidRequestInfoSwap() {
    return (
        <PhosphorIcon
            icon={RequestInfo.isRTL ? caretLeftIcon : caretRightIcon}
        />
    );
}

// ❌ Invalid: other whitelist icons (sign-in / sign-out) are covered too.
export function InvalidSignInOutSwap() {
    const icon = isRTL ? signInIcon : signOutIcon;
    return <PhosphorIcon icon={icon} />;
}
