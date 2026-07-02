/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-excessive-bodytext-children`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

import {BodyText} from "@khanacademy/wonder-blocks-typography";

// ✅ Valid: five or fewer direct child elements
export function ValidFewChildren() {
    return (
        <BodyText>
            <span>one</span>
            <span>two</span>
            <span>three</span>
            <span>four</span>
            <span>five</span>
        </BodyText>
    );
}

// ✅ Valid: text nodes do not count toward the limit
export function ValidTextNodes() {
    return (
        <BodyText>
            Some text <strong>bold</strong> more text <em>emphasis</em> and
            more text <span>inline</span> even more text <code>code</code> and
            finally <a href="#">a link</a>.
        </BodyText>
    );
}

// ❌ Invalid: too many direct child elements (default max: 5)
export function InvalidTooManyChildren() {
    return (
        <BodyText>
            <span>one</span>
            <span>two</span>
            <span>three</span>
            <span>four</span>
            <span>five</span>
            <span>six</span>
        </BodyText>
    );
}
