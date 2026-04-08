/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * @khanacademy/wonder-blocks/no-custom-tab-role
 * Run `pnpm lint` in this directory to see the errors.
 */

// ✅ Valid: Other roles are allowed
export function ValidExample() {
    return <button role="button">Click me</button>;
}

// ❌ Invalid: role="tab" should trigger the rule
export function InvalidExampleTablistTab() {
    return (
        <ul role="tablist">
            <li role="tab">Tab 1</li>
            <li role="tab">Tab 2</li>
        </ul>
    );
}

// ❌ Invalid: role="tab" should trigger the rule with components
export function InvalidExampleWithWBComponents() {
    return (
        <>
            <Button role="tab">Tab 1</Button>
            <Clickable role="tab">Tab 1</Clickable>
            <View role="tab">Tab 1</View>
        </>
    );
}

// ❌ Invalid: role="tab" should trigger the rule with styled components
export function InvalidExampleStyledComponent() {
    return (
        <>
            <StyledButton role="tab">Tab 1</StyledButton>
            <StyledClickable role="tab">Tab 1</StyledClickable>
            <StyledDiv role="tab">Tab 1</StyledDiv>
        </>
    );
}

// ❌ Invalid: role="tab" should trigger the rule with html elements
export function InvalidExampleHtmlElement() {
    return (
        <>
            <button role="tab">Tab 1</button>
            <a role="tab">Tab 1</a>
            <div role="tab">Tab 1</div>
        </>
    );
}