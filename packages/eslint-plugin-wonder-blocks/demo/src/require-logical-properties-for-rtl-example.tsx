/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/require-logical-properties-for-rtl`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

// ✅ Valid: logical properties work in both LTR and RTL writing modes.
export function ValidExample() {
    return (
        <div
            style={{
                marginInlineStart: "10px",
                paddingInlineEnd: "8px",
                textAlign: "start",
            }}
        />
    );
}

// ❌ Invalid: physical properties don't flip in RTL languages.
//    Auto-fix will rewrite each property name to its logical equivalent
//    and swap `textAlign: "left"` to `textAlign: "start"`.
export function InvalidExample() {
    return (
        <div
            style={{
                marginLeft: "10px",
                paddingRight: "8px",
                textAlign: "left",
            }}
        />
    );
}
