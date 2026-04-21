/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * `@khanacademy/wonder-blocks/no-invalid-bodytext-parent`
 * Run `pnpm lint` in this directory to see the errors.
 */

import * as React from "react";

import {Checkbox, Choice} from "@khanacademy/wonder-blocks-form";
import {
    Heading,
    HeadingLarge,
    BodyText,
} from "@khanacademy/wonder-blocks-typography";
import {addStyle} from "@khanacademy/wonder-blocks-core";

const StyledButton = addStyle("button");
const StyledP = addStyle("p");
const StyledLabel = addStyle("label");
const StyledH1 = addStyle("h1");

// ✅ Valid: BodyText with an inline tag is safe anywhere
export function ValidExamples() {
    return (
        <>
            {/* Inline tag inside a heading */}
            <h1>
                Title <BodyText tag="sup">1</BodyText>
            </h1>

            {/* Inline tag inside a button */}
            <button>
                <BodyText tag="span">Click me</BodyText>
            </button>

            {/* Inline tag inside a form component prop */}
            <Choice label={<BodyText tag="span">Option A</BodyText>} value="" />

            {/* Standalone BodyText in a block container */}
            <div>
                <BodyText>Paragraph text</BodyText>
            </div>
        </>
    );
}

// ❌ Invalid: BodyText (renders as <p>) inside WB form component props
export function InvalidFormComponents() {
    return (
        <>
            <Choice value="" label={<BodyText>Option A</BodyText>} />
            <Choice value="" label="" description={<BodyText>More details</BodyText>} />
            <Checkbox
                checked={false}
                onChange={() => {}}
                label={<BodyText>Check me</BodyText>}
            />
        </>
    );
}

// ❌ Invalid: BodyText inside button elements
export function InvalidButtonElements() {
    return (
        <>
            <button>
                <BodyText>Click me</BodyText>
            </button>
            <StyledButton>
                <BodyText>Click me</BodyText>
            </StyledButton>
        </>
    );
}

// ❌ Invalid: BodyText inside paragraph elements
export function InvalidParagraphElements() {
    return (
        <>
            <p>
                <BodyText>Nested paragraph</BodyText>
            </p>
            <StyledP>
                <BodyText>Nested paragraph</BodyText>
            </StyledP>
        </>
    );
}

// ❌ Invalid: BodyText inside label elements
export function InvalidLabelElements() {
    return (
        <>
            <label>
                <BodyText>Label text</BodyText>
            </label>
            <StyledLabel>
                <BodyText>Label text</BodyText>
            </StyledLabel>
        </>
    );
}

// ❌ Invalid: BodyText inside heading elements
export function InvalidHeadingElements() {
    return (
        <>
            <Heading>
                <BodyText>Sub text</BodyText>
            </Heading>
            <HeadingLarge>
                <BodyText>Sub text</BodyText>
            </HeadingLarge>
            <h1>
                <BodyText>Sub text</BodyText>
            </h1>
            <StyledH1>
                <BodyText>Sub text</BodyText>
            </StyledH1>
        </>
    );
}

// ❌ Invalid: BodyText nested inside another BodyText (both render as <p>)
export function InvalidNestedBodyText() {
    return (
        <BodyText>
            Outer <BodyText>inner</BodyText>
        </BodyText>
    );
}
