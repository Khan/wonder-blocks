import {RuleTester} from "@typescript-eslint/rule-tester";

import {rules} from "..";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 6,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

const ruleName = "no-raw-button";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    valid: [
        // Non-button elements are not flagged
        {code: `<div />`},
        {code: `<span>text</span>`},
        {code: `<input type="text" />`},
        // WB components are allowed
        {code: `<Button onClick={() => {}}>Click me</Button>`},
        {
            code: `<IconButton onClick={() => {}} icon={icon} aria-label="action" />`,
        },
        {code: `<ActivityButton onClick={() => {}}>Click me</ActivityButton>`},
        {
            code: `<Clickable onClick={() => {}}>{() => <div>Click me</div>}</Clickable>`,
        },
        // addStyle of non-button elements is allowed
        {
            code: `
                const StyledDiv = addStyle("div");
                function C() { return <StyledDiv />; }
            `,
        },
        {
            code: `
                const StyledA = addStyle("a");
                function C() { return <StyledA href="/path">Link</StyledA>; }
            `,
        },
        // JSX elements with "Button" in the name that are NOT addStyle("button")
        {code: `<RadioButton checked={true} />`},
        {code: `<ToggleButton pressed={false} />`},
    ],
    invalid: [
        // ── Raw HTML <button> ────────────────────────────────────────────
        {
            code: `<button>Click me</button>`,
            errors: [{messageId: "noRawButton"}],
        },
        {
            code: `<button type="submit">Submit</button>`,
            errors: [{messageId: "noRawButton"}],
        },
        {
            code: `<button onClick={() => {}} disabled>Click</button>`,
            errors: [{messageId: "noRawButton"}],
        },
        {
            code: `<button />`,
            errors: [{messageId: "noRawButton"}],
        },
        // ── addStyle("button") components ─────────────────────────────────
        {
            code: `
                const StyledButton = addStyle("button");
                function C() { return <StyledButton onClick={() => {}}>Click me</StyledButton>; }
            `,
            errors: [{messageId: "noRawButton"}],
        },
        {
            code: `
                const StyledBtn = addStyle("button");
                function C() { return <StyledBtn type="submit">Submit</StyledBtn>; }
            `,
            errors: [{messageId: "noRawButton"}],
        },
        {
            code: `
                const ButtonBase = addStyle("button");
                function C() { return <ButtonBase aria-label="action" />; }
            `,
            errors: [{messageId: "noRawButton"}],
        },
        // ── Multiple violations in one file ───────────────────────────────
        {
            code: `
                const StyledButton = addStyle("button");
                function C() {
                    return (
                        <>
                            <button>Raw</button>
                            <StyledButton>Styled</StyledButton>
                        </>
                    );
                }
            `,
            errors: [{messageId: "noRawButton"}, {messageId: "noRawButton"}],
        },
    ],
});
