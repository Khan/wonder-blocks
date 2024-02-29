/**
 * There are a number of components that share common behaviors due to their
 * use of ClickableBehavior.  It's not enough to test ClickableBehavior since
 * each of the components has to connect things correctly.  This set of tests
 * checks that the common behaviors exist on all of these components.
 */
import * as React from "react";
import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import plus from "@phosphor-icons/core/regular/plus.svg";
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {
    CheckboxGroup,
    Choice,
    RadioGroup,
} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Link from "@khanacademy/wonder-blocks-link";
import {CompactCell, DetailCell} from "@khanacademy/wonder-blocks-cell";

// We create a wrapper around Clickable since it expects a render function for
// is children while all of the other components do not.
const ClickableWrapper = (props: any) => {
    const {children, ...restProps} = props;
    return (
        <Clickable {...restProps}>
            {(clickableState: any) => children}
        </Clickable>
    );
};

const IconButtonWrapper = (props: any) => <IconButton {...props} icon={plus} />;

describe.each`
    Component           | name             | role
    ${Button}           | ${"Button"}      | ${"button"}
    ${ClickableWrapper} | ${"Clickable"}   | ${"link"}
    ${CompactCell}      | ${"CompactCell"} | ${"link"}
    ${DetailCell}       | ${"DetailCell"}  | ${"link"}
    ${Link}             | ${"Link"}        | ${"link"}
`("$name with an href", ({Component, name, role}: any) => {
    beforeEach(() => {
        // Note: window.location.assign and window.open need mock functions in
        // the testing environment
        // @ts-expect-error [FEI-5019] - TS2790 - The operand of a 'delete' operator must be optional.
        delete window.location;
        // @ts-expect-error [FEI-5019] - TS2740 - Type '{ assign: Mock<any, any, any>; }' is missing the following properties from type 'Location': ancestorOrigins, hash, host, hostname, and 8 more.
        window.location = {assign: jest.fn(), origin: "http://localhost"};
        window.open = jest.fn();
    });

    afterEach(() => {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'mockClear' does not exist on type '((url?: string | URL | undefined, target?: string | undefined, features?: string | undefined) => Window | null) & ((url?: string | URL | undefined, target?: string | undefined, features?: string | undefined) => Window | null)'.
        window.open.mockClear();
    });

    it("opens a new tab when target='_blank'", async () => {
        // Arrange
        render(
            <Component href="https://www.khanacademy.org" target="_blank">
                Click me
            </Component>,
        );

        // Act
        await userEvent.click(await screen.findByRole(role));

        // Assert
        expect(window.open).toHaveBeenCalledWith(
            "https://www.khanacademy.org",
            "_blank",
        );
    });

    it("sets the 'target' prop on the underlying element", async () => {
        // Arrange
        render(
            <Component href="https://www.khanacademy.org" target="_blank">
                Click me
            </Component>,
        );

        // Act
        const link = await screen.findByRole(role);
        await userEvent.click(link);

        // Assert
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("renders an <a> if the href is '#'", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <Component href="#">Click me</Component>
            </MemoryRouter>,
        );

        // Act
        const link = await screen.findByRole(role);

        // Assert
        expect(link.tagName).toBe("A");
    });
});

// NOTE: Link doesn't work without an href so it isn't included in this suite
describe.each`
    Component            | name             | role
    ${Button}            | ${"Button"}      | ${"button"}
    ${ClickableWrapper}  | ${"Clickable"}   | ${"button"}
    ${CompactCell}       | ${"CompactCell"} | ${"button"}
    ${DetailCell}        | ${"DetailCell"}  | ${"button"}
    ${IconButtonWrapper} | ${"IconButton"}  | ${"button"}
`("$name without an href", ({Component, name, role}: any) => {
    beforeEach(() => {
        // Note: window.location.assign and window.open need mock functions in
        // the testing environment, but JSDOM protects assign from being changed
        // so we need to replace the whole location object.
        window.location = {...window.location, assign: jest.fn()};
        window.open = jest.fn();
    });

    afterEach(() => {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'mockClear' does not exist on type '((url?: string | URL | undefined, target?: string | undefined, features?: string | undefined) => Window | null) & ((url?: string | URL | undefined, target?: string | undefined, features?: string | undefined) => Window | null)'.
        window.open.mockClear();
    });

    it("renders a button", async () => {
        // Arrange
        render(
            <MemoryRouter>
                <Component onClick={() => {}}>Click me</Component>
            </MemoryRouter>,
        );

        // Act
        const button = await screen.findByRole(role);

        // Assert
        expect(button).toBeInTheDocument();
    });

    it("responds to click events", async () => {
        // Arrange
        const clickHandler = jest.fn();
        render(
            <MemoryRouter>
                <Component onClick={clickHandler}>Click me</Component>
            </MemoryRouter>,
        );

        // Act
        await userEvent.click(await screen.findByRole(role));

        // Assert
        expect(clickHandler).toHaveBeenCalled();
    });
});

/* ******* tabIndex tests ******* */

// Components that wrap buttons or links should not have a tabIndex.
// Components that don't wrap an alreaady clickable component should
// have an added tabIndex of 0.
describe.each`
    Component            | name             | hasTabIndex
    ${Button}            | ${"Button"}      | ${false}
    ${ClickableWrapper}  | ${"Clickable"}   | ${false}
    ${CompactCell}       | ${"CompactCell"} | ${false}
    ${DetailCell}        | ${"DetailCell"}  | ${false}
    ${IconButtonWrapper} | ${"IconButton"}  | ${false}
    ${Link}              | ${"Link"}        | ${false}
`("$name", ({Component, name, hasTabIndex}: any) => {
    test("has expected existence of tabIndex", async () => {
        // Arrange

        // Act
        render(
            <Component onClick={jest.fn()} testId="clickable-component-test-id">
                Click me
            </Component>,
        );

        // Assert
        const component = await screen.findByTestId(
            "clickable-component-test-id",
        );
        if (hasTabIndex) {
            // These components should all wrap buttons or links, so they
            // should inherently be clickable and keyboard navigable. They
            // should not have a default tabIndex 0 as that would be redundant.
            expect(component).toHaveAttribute("tabIndex", "0");
        } else {
            // These components do not wrap an inherently clickable component,
            // so it is expected that they have a tabIndex of 0 so they can
            // be keyboard navigable.
            expect(component).not.toHaveAttribute("tabIndex");
        }
    });
});

// Form elements are inherently keyboard navigable. They should not have
// a default tabIndex.

describe("Choice", () => {
    test("doesn't have a redunant tabIndex of 0 (checkbox)", async () => {
        // Arrange

        // Act
        render(
            <CheckboxGroup
                label="some-label"
                groupName="some-group-name"
                onChange={jest.fn()}
                selectedValues={[]}
            >
                <Choice
                    label="Choice 1"
                    value="some-choice-value"
                    testId="checkbox-choice-clickable-test-id"
                />
                <Choice label="Choice 2" value="some-choice-value-2" />
            </CheckboxGroup>,
        );

        // Assert
        const checkbox = await screen.findByTestId(
            "checkbox-choice-clickable-test-id",
        );
        expect(checkbox).not.toHaveAttribute("tabIndex");
    });

    test("doesn't have a redunant tabIndex of 0 (radio)", async () => {
        // Arrange

        // Act
        render(
            <RadioGroup
                label="some-label"
                groupName="some-group-name"
                onChange={jest.fn()}
                selectedValue={""}
            >
                <Choice
                    label="Choice 1"
                    value="some-choice-value"
                    testId="radio-choice-clickable-test-id"
                />
                <Choice label="Choice 2" value="some-choice-value-2" />
            </RadioGroup>,
        );

        // Assert
        const checkbox = await screen.findByTestId(
            "radio-choice-clickable-test-id",
        );
        expect(checkbox).not.toHaveAttribute("tabIndex");
    });
});
