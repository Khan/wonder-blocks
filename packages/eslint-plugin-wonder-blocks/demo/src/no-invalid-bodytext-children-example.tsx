/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-invalid-bodytext-children`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    Heading,
    HeadingLarge,
    BodyText,
} from "@khanacademy/wonder-blocks-typography";

// ✅ Valid: inline/phrasing-content children
export function ValidExamples() {
    return (
        <>
            {/* Plain text */}
            <BodyText>Hello world</BodyText>

            {/* Inline HTML elements */}
            <BodyText>
                Text with <strong>bold</strong> and <em>emphasis</em>.
            </BodyText>

            {/* block-container tag allows block children */}
            <BodyText tag="div">
                <div>block content is fine here</div>
            </BodyText>

            {/* Inner BodyText with inline tag */}
            <BodyText>
                Outer <BodyText tag="span">inline nested</BodyText>
            </BodyText>
        </>
    );
}

// ❌ Invalid: View is never valid inside BodyText
export function InvalidViewChild() {
    return (
        <BodyText>
            <View>layout</View>
        </BodyText>
    );
}

// ❌ Invalid: block-level HTML elements inside a default BodyText (<p>)
export function InvalidBlockChildren() {
    return (
        <>
            <BodyText>
                <div>block content</div>
            </BodyText>
            <BodyText>
                <p>nested paragraph</p>
            </BodyText>
            <BodyText>
                <section>section content</section>
            </BodyText>
        </>
    );
}

// ❌ Invalid: BodyText nested inside BodyText (both default to <p>)
export function InvalidNestedBodyText() {
    return (
        <BodyText>
            <BodyText>nested</BodyText>
        </BodyText>
    );
}

// ❌ Invalid: WB Heading components render as block-level headings
export function InvalidHeadingChildren() {
    return (
        <>
            <BodyText>
                <Heading>Title</Heading>
            </BodyText>
            <BodyText>
                <HeadingLarge>Title</HeadingLarge>
            </BodyText>
        </>
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
