import * as React from "react";
import {describe, it} from "tstyche";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";
import Card from "../../components/card";

describe("Card", () => {
    it("should accept string children", () => {
        <Card>Hello, world!</Card>;
    });

    it("should accept element children", () => {
        <Card>
            <div>Some content</div>
        </Card>;
    });

    it("can contain a Button", () => {
        <Card>
            <Button onClick={() => {}}>Click me</Button>
        </Card>;
    });

    it("can contain a Link", () => {
        <Card>
            <Link href="/foo">Click me</Link>
        </Card>;
    });

    it("should accept valid styling props", () => {
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
    });

    it(`should accept paddingSize="none"`, () => {
        <Card paddingSize="none">Content</Card>;
    });

    it("should reject an invalid background value", () => {
        // @ts-expect-error Type '"invalid-background"' is not assignable
        <Card background="invalid-background">Content</Card>;
    });

    it("should reject an invalid borderRadius value", () => {
        // @ts-expect-error Type '"invalid-radius"' is not assignable
        <Card borderRadius="invalid-radius">Content</Card>;
    });

    it("should reject an invalid paddingSize value", () => {
        // @ts-expect-error Type '"invalid-padding"' is not assignable
        <Card paddingSize="invalid-padding">Content</Card>;
    });

    it("should reject an invalid elevation value", () => {
        // @ts-expect-error Type '"invalid-elevation"' is not assignable
        <Card elevation="invalid-elevation">Content</Card>;
    });

    it("should accept onDismiss when dismissButtonAriaLabel is provided", () => {
        <Card
            onDismiss={() => {}}
            labels={{dismissButtonAriaLabel: "Close card"}}
        >
            Content
        </Card>;
    });

    it("should reject onDismiss when no labels prop is set", () => {
        // @ts-expect-error Property 'labels' is missing
        <Card onDismiss={() => {}}>Content</Card>;
    });

    it("should reject onDismiss when no labels are provided", () => {
        // @ts-expect-error Types of property 'labels' are incompatible
        <Card onDismiss={() => {}} labels={{}}>
            Content
        </Card>;
    });

    it("should reject onClick prop", () => {
        // @ts-expect-error Property 'onClick' does not exist
        <Card onClick={() => {}}>Content</Card>;
    });

    it(`should accept tag="div"`, () => {
        <Card tag="div">Content</Card>;
    });

    it(`should reject tag="button"`, () => {
        // @ts-expect-error Type '"button"' is not assignable
        <Card tag="button">Content</Card>;
    });

    it(`should reject tag="a"`, () => {
        // @ts-expect-error Type '"a"' is not assignable
        <Card tag="a">Content</Card>;
    });

    it(`should accept tag="section" when cardAriaLabel is provided`, () => {
        <Card tag="section" labels={{cardAriaLabel: "Card section"}}>
            Content
        </Card>;
    });

    it(`should accept tag="figure" when cardAriaLabel is provided`, () => {
        <Card tag="figure" labels={{cardAriaLabel: "Card figure"}}>
            Content
        </Card>;
    });

    it(`should accept tag="section" when aria-label is provided`, () => {
        <Card tag="section" aria-label="Card section">
            Content
        </Card>;
    });

    it(`should accept tag="figure" when aria-label is provided`, () => {
        <Card tag="figure" aria-label="Card figure">
            Content
        </Card>;
    });

    it(`should accept tag="section" when aria-labelledby is provided`, () => {
        <Card tag="section" aria-labelledby="someId">
            <h2 id="someId">Card title</h2>
        </Card>;
    });

    it(`should accept tag="figure" when aria-labelledby is provided`, () => {
        <Card tag="figure" aria-labelledby="someId2">
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it(`should reject conflicting aria-labelledby and labels.cardAriaLabel when tag is "figure"`, () => {
        // @ts-expect-error Types of property 'labels' are incompatible
        <Card
            tag="figure"
            aria-labelledby="someId2"
            labels={{cardAriaLabel: "preferred label"}}
        >
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it(`should reject conflicting aria-labelledby and labels.cardAriaLabel when tag is "section"`, () => {
        // @ts-expect-error Types of property 'labels' are incompatible
        <Card
            tag="section"
            aria-labelledby="someId2"
            labels={{cardAriaLabel: "preferred label"}}
        >
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it("should accept combined aria-labelledby and aria-label", () => {
        <Card
            tag="figure"
            aria-labelledby="someId2"
            aria-label="fallback label"
        >
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it(`should accept tag="section" with no accessible label`, () => {
        <Card tag="section">Content</Card>;
    });

    it(`should accept tag="figure" with no accessible label`, () => {
        <Card tag="figure">Content</Card>;
    });

    it(`should accept tag="section" with empty labels`, () => {
        <Card tag="section" labels={{}}>
            Content
        </Card>;
    });

    it(`should accept tag="figure" with empty labels`, () => {
        <Card tag="figure" labels={{}}>
            Content
        </Card>;
    });

    it("should accept testId", () => {
        <Card testId="my-card">Content</Card>;
    });

    it("should accept inert", () => {
        <Card inert>Content</Card>;
    });

    it("should accept a ref", () => {
        <Card ref={React.createRef<HTMLDivElement>()}>Content</Card>;
    });

    it("should accept styles", () => {
        <Card
            styles={{root: {width: 200}, dismissButton: {position: "absolute"}}}
        >
            Content
        </Card>;
    });

    it(`should accept tag="section" with onDismiss and all labels`, () => {
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
    });

    it("should accept all valid props together", () => {
        <Card
            aria-busy={true}
            aria-roledescription="A custom card"
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
            role="status"
        >
            <div>Complex content</div>
        </Card>;
    });
});
