import * as React from "react";
import {describe, it} from "tstyche";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";
import Card from "../../components/card";

describe("Card", () => {
    it("accepts string children", () => {
        <Card>Hello, world!</Card>;
    });

    it("accepts element children", () => {
        <Card>
            <div>Some content</div>
        </Card>;
    });
});

describe("Card with Button and Link components", () => {
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
});

describe("Card style props", () => {
    it("accepts small style values", () => {
        <Card
            background="base-default"
            borderRadius="small"
            paddingSize="small"
            elevation="none"
        >
            Content
        </Card>;
    });

    it("accepts medium style values", () => {
        <Card
            background="base-subtle"
            borderRadius="medium"
            paddingSize="medium"
            elevation="low"
        >
            Content
        </Card>;
    });

    it("accepts paddingSize=none", () => {
        <Card paddingSize="none">Content</Card>;
    });

    it("rejects an invalid background value", () => {
        // @ts-expect-error Type '"invalid-background"' is not assignable
        <Card background="invalid-background">Content</Card>;
    });

    it("rejects an invalid borderRadius value", () => {
        // @ts-expect-error Type '"invalid-radius"' is not assignable
        <Card borderRadius="invalid-radius">Content</Card>;
    });

    it("rejects an invalid paddingSize value", () => {
        // @ts-expect-error Type '"invalid-padding"' is not assignable
        <Card paddingSize="invalid-padding">Content</Card>;
    });

    it("rejects an invalid elevation value", () => {
        // @ts-expect-error Type '"invalid-elevation"' is not assignable
        <Card elevation="invalid-elevation">Content</Card>;
    });
});

describe("Card dismiss functionality", () => {
    it("accepts onDismiss with labels", () => {
        <Card onDismiss={() => {}} labels={{dismissButtonAriaLabel: "Close card"}}>
            Content
        </Card>;
    });

    it("rejects onDismiss without labels", () => {
        // @ts-expect-error Property 'labels' is missing
        <Card onDismiss={() => {}}>Content</Card>;
    });

    it("rejects onDismiss with empty labels", () => {
        // @ts-expect-error Types of property 'labels' are incompatible
        <Card onDismiss={() => {}} labels={{}}>
            Content
        </Card>;
    });

    it("rejects onClick prop", () => {
        // @ts-expect-error Property 'onClick' does not exist
        <Card onClick={() => {}}>Content</Card>;
    });
});

describe("Card tag prop", () => {
    it("accepts tag=div", () => {
        <Card tag="div">Content</Card>;
    });

    it("rejects tag=button", () => {
        // @ts-expect-error Type '"button"' is not assignable
        <Card tag="button">Content</Card>;
    });

    it("rejects tag=a", () => {
        // @ts-expect-error Type '"a"' is not assignable
        <Card tag="a">Content</Card>;
    });

    it("accepts tag=section with labels", () => {
        <Card tag="section" labels={{cardAriaLabel: "Card section"}}>
            Content
        </Card>;
    });

    it("accepts tag=figure with labels", () => {
        <Card tag="figure" labels={{cardAriaLabel: "Card figure"}}>
            Content
        </Card>;
    });

    it("accepts tag=section with aria-label", () => {
        <Card tag="section" aria-label="Card section">
            Content
        </Card>;
    });

    it("accepts tag=figure with aria-label", () => {
        <Card tag="figure" aria-label="Card figure">
            Content
        </Card>;
    });

    it("accepts tag=section with aria-labelledby", () => {
        <Card tag="section" aria-labelledby="someId">
            <h2 id="someId">Card title</h2>
        </Card>;
    });

    it("accepts tag=figure with aria-labelledby", () => {
        <Card tag="figure" aria-labelledby="someId2">
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it("rejects tag=figure with both aria-labelledby and labels.cardAriaLabel", () => {
        // @ts-expect-error Types of property 'labels' are incompatible
        <Card
            tag="figure"
            aria-labelledby="someId2"
            labels={{cardAriaLabel: "preferred label"}}
        >
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it("rejects tag=section with both aria-labelledby and labels.cardAriaLabel", () => {
        // @ts-expect-error Types of property 'labels' are incompatible
        <Card
            tag="section"
            aria-labelledby="someId2"
            labels={{cardAriaLabel: "preferred label"}}
        >
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it("accepts tag=figure with both aria-labelledby and aria-label", () => {
        <Card tag="figure" aria-labelledby="someId2" aria-label="fallback label">
            <h2 id="someId2">Card title</h2>
        </Card>;
    });

    it("accepts tag=section with no accessible label", () => {
        <Card tag="section">Content</Card>;
    });

    it("accepts tag=figure with no accessible label", () => {
        <Card tag="figure">Content</Card>;
    });

    it("accepts tag=section with empty labels", () => {
        <Card tag="section" labels={{}}>
            Content
        </Card>;
    });

    it("accepts tag=figure with empty labels", () => {
        <Card tag="figure" labels={{}}>
            Content
        </Card>;
    });
});

describe("Card additional props", () => {
    it("accepts testId", () => {
        <Card testId="my-card">Content</Card>;
    });

    it("accepts inert", () => {
        <Card inert>Content</Card>;
    });

    it("accepts a ref", () => {
        <Card ref={React.createRef<HTMLDivElement>()}>Content</Card>;
    });

    it("accepts styles prop", () => {
        <Card styles={{root: {width: 200}, dismissButton: {position: "absolute"}}}>
            Content
        </Card>;
    });

    it("accepts tag=section with onDismiss and all labels", () => {
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
});

describe("Card with all props", () => {
    it("accepts all valid props together", () => {
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
