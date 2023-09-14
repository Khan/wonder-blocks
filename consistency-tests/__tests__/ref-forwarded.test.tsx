import * as React from "react";
import {render, waitFor} from "@testing-library/react";
import {MemoryRouter, Link as ReactRouterLink} from "react-router-dom";
import * as ReactDOM from "react-dom";

import {icons} from "@khanacademy/wonder-blocks-icon";

import Accordion from "../../packages/wonder-blocks-accordion/src/components/accordion";
import AccordionSection from "../../packages/wonder-blocks-accordion/src/components/accordion-section";
import Breadcrumbs from "../../packages/wonder-blocks-breadcrumbs/src/components/breadcrumbs";
import BreadcrumbsItem from "../../packages/wonder-blocks-breadcrumbs/src/components/breadcrumbs-item";
import Button from "../../packages/wonder-blocks-button/src/components/button";
import Icon from "../../packages/wonder-blocks-icon/src/components/icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Link from "../../packages/wonder-blocks-link/src/components/link";
import Pill from "../../packages/wonder-blocks-pill/src/components/pill";
import Switch from "../../packages/wonder-blocks-switch/src/components/switch";
import Text from "../../packages/wonder-blocks-core/src/components/text";
import View from "../../packages/wonder-blocks-core/src/components/view";

// Form imports
import Checkbox from "../../packages/wonder-blocks-form/src/components/checkbox";
import CheckboxGroup from "../../packages/wonder-blocks-form/src/components/checkbox-group";
import Choice from "../../packages/wonder-blocks-form/src/components/choice";
import Radio from "../../packages/wonder-blocks-form/src/components/radio";
import RadioGroup from "../../packages/wonder-blocks-form/src/components/radio-group";

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
import {RenderStateRoot} from "../../packages/wonder-blocks-core/src/components/render-state-root";

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

describe("Accordion elements", () => {
    test("Accordion forwards ref", () => {
        // Arrange
        const ref: React.RefObject<HTMLUListElement> = React.createRef();

        // Act
        render(
            <Accordion ref={ref}>
                <AccordionSection header="First section">
                    This is the information present in the first section
                </AccordionSection>
                <AccordionSection header="Second section">
                    This is the information present in the second section
                </AccordionSection>
                <AccordionSection header="Third section">
                    This is the information present in the third section
                </AccordionSection>
            </Accordion>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    test("AccordionSection forwards ref", () => {
        // Arrange
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        // Act
        render(
            <AccordionSection header="Section" ref={ref}>
                This is the information present in the first section
            </AccordionSection>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
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

describe("Button", () => {
    // Renders a button (<button>) element if it doesn't have an href.
    test("forwards ref to an HTMLButtonElement", () => {
        // Arrange
        const ref: React.RefObject<HTMLButtonElement> = React.createRef();

        // Act
        render(<Button ref={ref}>This is a button</Button>);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    // Renders an anchor (<a>) element if it doesn't use a router or if
    // it skips client navigation.
    test("forwards ref to an HTMLAnchorElement", () => {
        // Arrange
        const ref: React.RefObject<HTMLAnchorElement> = React.createRef();

        // Act
        render(
            <Button href="/foo" skipClientNav={true} ref={ref}>
                This is a button
            </Button>,
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

describe("IconButton", () => {
    // Renders a button (<button>) element if it doesn't have an href.
    test("forwards ref to an HTMLButtonElement", () => {
        // Arrange
        const ref: React.RefObject<HTMLButtonElement> = React.createRef();

        // Act
        render(<IconButton ref={ref} icon={icons.add} />);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    // Renders an anchor (<a>) element if it doesn't use a router or if
    // it skips client navigation.
    test("forwards ref to an HTMLAnchorElement", () => {
        // Arrange
        const ref: React.RefObject<HTMLAnchorElement> = React.createRef();

        // Act
        render(
            <IconButton
                href="/foo"
                skipClientNav={true}
                ref={ref}
                icon={icons.add}
            />,
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
                <IconButton
                    href="/foo"
                    skipClientNav={false}
                    ref={ref}
                    icon={icons.add}
                />
                ,
            </MemoryRouter>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
});

describe("Form elements", () => {
    test.each`
        Component   | name
        ${Checkbox} | ${"Checkbox"}
        ${Radio}    | ${"Radio (internal)"}
        ${Choice}   | ${"Choice"}
    `("$name forwards ref to an HTMLInputElement", ({Component}: any) => {
        // Arrange
        const ref: React.RefObject<HTMLInputElement> = React.createRef();

        // Act
        render(<Component ref={ref} checked={false} onChange={() => {}} />);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    test("CheckboxGroup forwards ref to an HTMLFieldSetElement", () => {
        // Arrange
        const ref: React.RefObject<HTMLFieldSetElement> = React.createRef();

        // Act
        render(
            <CheckboxGroup
                groupName="some-group-name"
                selectedValues={[]}
                onChange={() => {}}
                ref={ref}
            >
                <Choice label="Some choice" value="some-choice" />
                <Choice label="Some other choice" value="some-other-choice" />
            </CheckboxGroup>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
    });

    test("RadioGroup forwards ref to an HTMLFieldSetElement", () => {
        // Arrange
        const ref: React.RefObject<HTMLFieldSetElement> = React.createRef();

        // Act
        render(
            <RadioGroup
                groupName="some-group-name"
                selectedValue={""}
                onChange={() => {}}
                ref={ref}
            >
                <Choice label="Some choice" value="some-choice" />
                <Choice label="Some other choice" value="some-other-choice" />
            </RadioGroup>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
    });

    describe("Switch", () => {
        test("forwards ref to an HTMLInputElement", () => {
            // Arrange
            const ref: React.RefObject<HTMLInputElement> = React.createRef();

            // Act
            render(
                <RenderStateRoot>
                    <Switch checked={false} ref={ref} />
                </RenderStateRoot>,
            );

            // Assert
            expect(ref.current).toBeInstanceOf(HTMLInputElement);
        });
    });
});

describe("Icon", () => {
    test("forwards ref to an SVGElement", () => {
        // Arrange
        const ref: React.RefObject<SVGSVGElement> = React.createRef();

        // Act
        render(<Icon ref={ref} icon={icons.add} />);

        // Assert
        expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });
});

describe("Pill", () => {
    test("forwards ref to an HTMLElement when there's no onClick", () => {
        // Arrange
        const ref: React.RefObject<HTMLElement> = React.createRef();

        // Act
        render(<Pill ref={ref}>This is a pill</Pill>);

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    test("forwards ref to an HTMLButtonElement when there's an onClick", () => {
        // Arrange
        const ref: React.RefObject<HTMLButtonElement> = React.createRef();

        // Act
        render(
            <Pill ref={ref} onClick={() => {}}>
                This is a pill
            </Pill>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
});
