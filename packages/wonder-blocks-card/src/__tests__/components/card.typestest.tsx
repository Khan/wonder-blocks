import * as React from "react";

import Card from "../../components/card";

/**
 * Basic Card usage
 */

<Card>Hello, world!</Card>;

<Card>
    <div>Some content</div>
</Card>;

/**
 * Card with all style props
 */

<Card
    background="base-default"
    borderRadius="small"
    paddingSize="small"
    elevation="none"
>
    Content
</Card>;

<Card
    background="base-subtle"
    borderRadius="medium"
    paddingSize="medium"
    elevation="low"
>
    Content
</Card>;

<Card paddingSize="none">Content</Card>;

// @ts-expect-error - invalid background value
<Card background="invalid-background">Content</Card>;

// @ts-expect-error - invalid borderRadius value
<Card borderRadius="invalid-radius">Content</Card>;

// @ts-expect-error - invalid paddingSize value
<Card paddingSize="invalid-padding">Content</Card>;

// @ts-expect-error - invalid elevation value
<Card elevation="invalid-elevation">Content</Card>;

/**
 * Card with dismiss functionality
 */

<Card onDismiss={() => {}} labels={{dismissButtonAriaLabel: "Close card"}}>
    Content
</Card>;

// @ts-expect-error - onDismiss requires dismissButtonAriaLabel
<Card onDismiss={() => {}}>Content</Card>;

// @ts-expect-error - onDismiss requires dismissButtonAriaLabel
<Card onDismiss={() => {}} labels={{}}>
    Content
</Card>;

// @ts-expect-error - onClick is not allowed on Card wrapper
<Card onClick={() => {}}>Content</Card>;

/**
 * Card with different HTML tags
 */

<Card tag="div">Content</Card>;

<Card tag="section" labels={{cardAriaLabel: "Card section"}}>
    Content
</Card>;

<Card tag="figure" labels={{cardAriaLabel: "Card figure"}}>
    Content
</Card>;

// @ts-expect-error - section tag requires cardAriaLabel
<Card tag="section">Content</Card>;

// @ts-expect-error - figure tag requires cardAriaLabel
<Card tag="figure">Content</Card>;

// @ts-expect-error - section tag requires cardAriaLabel in labels
<Card tag="section" labels={{}}>
    Content
</Card>;

// @ts-expect-error - figure tag requires cardAriaLabel in labels
<Card tag="figure" labels={{}}>
    Content
</Card>;

/**
 * Card with additional props
 */

<Card testId="my-card">Content</Card>;

<Card inert>Content</Card>;

<Card ref={React.createRef<HTMLDivElement>()}>Content</Card>;

<Card styles={{root: {width: 200}, dismissButton: {position: "absolute"}}}>
    Content
</Card>;

/**
 * Card with dismiss and section tag (complex case)
 */

<Card
    tag="section"
    onDismiss={() => {}}
    labels={{
        cardAriaLabel: "Card section",
        dismissButtonAriaLabel: "Close card",
    }}
>
    Content
</Card>;

/**
 * Card with all props
 */

<Card
    background="base-subtle"
    borderRadius="medium"
    paddingSize="medium"
    elevation="low"
    tag="figure"
    onDismiss={() => {}}
    labels={{
        cardAriaLabel: "Card figure",
        dismissButtonAriaLabel: "Close card",
    }}
    testId="complex-card"
    inert
    styles={{
        root: {width: 300},
        dismissButton: {top: 10, right: 10},
    }}
    ref={React.createRef<HTMLElement>()}
>
    <div>Complex content</div>
</Card>;
