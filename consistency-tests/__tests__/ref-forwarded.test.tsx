import * as React from "react";
import {render, waitFor} from "@testing-library/react";
import {MemoryRouter, Link as ReactRouterLink} from "react-router-dom";
import * as ReactDOM from "react-dom";

import Breadcrumbs from "../../packages/wonder-blocks-breadcrumbs/src/components/breadcrumbs";
import BreadcrumbsItem from "../../packages/wonder-blocks-breadcrumbs/src/components/breadcrumbs-item";
import Link from "../../packages/wonder-blocks-link/src/components/link";
import Text from "../../packages/wonder-blocks-core/src/components/text";

// Typography imports
import Body from "../../packages/wonder-blocks-typography/src/components/body";
import BodyMonospace from "../../packages/wonder-blocks-typography/src/components/body-monospace";
import BodySerif from "../../packages/wonder-blocks-typography/src/components/body-serif";
import BodySerifBlock from "../../packages/wonder-blocks-typography/src/components/body-serif-block";
import Caption from "../../packages/wonder-blocks-typography/src/components/caption";
import Footnote from "../../packages/wonder-blocks-typography/src/components/footnote";
import HeadingLarge from "../../packages/wonder-blocks-typography/src/components/heading-large";
import HeadingMedium from "../../packages/wonder-blocks-typography/src/components/heading-medium";
import HeadingSmall from "../../packages/wonder-blocks-typography/src/components/heading-small";
import HeadingXSmall from "../../packages/wonder-blocks-typography/src/components/heading-xsmall";
import LabelLarge from "../../packages/wonder-blocks-typography/src/components/label-large";
import LabelMedium from "../../packages/wonder-blocks-typography/src/components/label-medium";
import LabelSmall from "../../packages/wonder-blocks-typography/src/components/label-small";
import LabelXSmall from "../../packages/wonder-blocks-typography/src/components/label-xsmall";
import Tagline from "../../packages/wonder-blocks-typography/src/components/tagline";
import Title from "../../packages/wonder-blocks-typography/src/components/title";
import View from "../../packages/wonder-blocks-core/src/components/view";

describe("Typography elements", () => {
    test.each`
        Component         | name                | type                  | typeName
        ${Text}           | ${"Text"}           | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Body}           | ${"Body"}           | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${BodyMonospace}  | ${"BodyMonospace"}  | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${BodySerif}      | ${"BodySerif"}      | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${BodySerifBlock} | ${"BodySerifBlock"} | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Caption}        | ${"Caption"}        | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Footnote}       | ${"Footnote"}       | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${HeadingLarge}   | ${"HeadingLarge"}   | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${HeadingMedium}  | ${"HeadingMedium"}  | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${HeadingSmall}   | ${"HeadingSmall"}   | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${HeadingXSmall}  | ${"HeadingXSmall"}  | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
        ${LabelLarge}     | ${"LabelLarge"}     | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelMedium}    | ${"LabelMedium"}    | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelSmall}     | ${"LabelSmall"}     | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${LabelXSmall}    | ${"LabelXSmall"}    | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Tagline}        | ${"Tagline"}        | ${HTMLSpanElement}    | ${"HTMLSpanElement"}
        ${Title}          | ${"Title"}          | ${HTMLHeadingElement} | ${"HTMLHeadingElement"}
    `("$name forwards ref to $typeName", async ({Component, type}: any) => {
        // Arrange
        const ref: React.RefObject<typeof type> = React.createRef();

        // Act
        render(<Component ref={ref}>This is a title</Component>);

        // Assert
        expect(ref.current).toBeInstanceOf(type);
    });
});

describe("Breadcrumbs elements", () => {
    test("Breadcrumbs forwards ref", () => {
        // Arrange
        const ref = React.createRef<HTMLElement>();

        // Act
        render(
            <Breadcrumbs ref={ref}>
                <BreadcrumbsItem>First</BreadcrumbsItem>
                <BreadcrumbsItem>Last</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    test("BreadcrumbsItem forwards ref", () => {
        // Arrange
        const ref: React.RefObject<HTMLLIElement> = React.createRef();

        // Act
        render(<BreadcrumbsItem ref={ref}>Page name</BreadcrumbsItem>);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });
});

describe("Link", () => {
    // Renders an anchor (<a>) element if it doesn't use a router or if
    // it skips client navigation.
    test("forwards ref to an HTMLAnchorElement", () => {
        // Arrange
        const ref: React.RefObject<HTMLAnchorElement> = React.createRef();

        // Act
        render(
            <Link href="/foo" skipClientNav={true} ref={ref}>
                Click me!
            </Link>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    // Renders an HTMLAnchorElement (the underlying ref for react-router-dom
    // Link element) if it uses a router and uses client navigation.
    test("forwards ref to react-router-dom Link which is an HTMLAnchorElement", () => {
        // Arrange
        const ref: React.RefObject<typeof ReactRouterLink> = React.createRef();

        // Act
        render(
            <MemoryRouter>
                <Link href="/foo" skipClientNav={false} ref={ref}>
                    Click me!
                </Link>
            </MemoryRouter>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
});

describe("View elements", () => {
    test.each`
        tag          | type              | typeName
        ${"div"}     | ${HTMLDivElement} | ${"HTMLDivElement"}
        ${"section"} | ${HTMLElement}    | ${"HTMLElement"}
        ${"article"} | ${HTMLElement}    | ${"HTMLElement"}
        ${"aside"}   | ${HTMLElement}    | ${"HTMLElement"}
        ${"nav"}     | ${HTMLElement}    | ${"HTMLElement"}
    `("View with $tag tag forwards ref to $typeName", ({tag, type}: any) => {
        // Arrange
        const ref: React.RefObject<typeof type> = React.createRef();

        // Act
        render(
            <View ref={ref} tag={tag}>
                This is a view
            </View>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(type);
    });

    test.each`
        tag          | type              | typeName
        ${"div"}     | ${HTMLDivElement} | ${"HTMLDivElement"}
        ${"section"} | ${HTMLElement}    | ${"HTMLElement"}
        ${"article"} | ${HTMLElement}    | ${"HTMLElement"}
        ${"aside"}   | ${HTMLElement}    | ${"HTMLElement"}
        ${"nav"}     | ${HTMLElement}    | ${"HTMLElement"}
    `(
        "View with $tag tag forwards ref to $typeName with callback ref",
        async ({tag, type}: any) => {
            // Arrange
            let ref: Element | Text | null;

            // Act
            render(
                <View
                    tag={tag}
                    ref={(node) => (ref = ReactDOM.findDOMNode(node))}
                />,
            );

            // Assert
            await waitFor(() => {
                expect(ref).toBeInstanceOf(type);
            });
        },
    );
});
