// @flow
/**
 * There are a number of components that share common behaviors due to their
 * use of ClickableBehavior.  It's not enough to test ClickableBehavior since
 * each of the components has to connect things correctly.  This set of tests
 * checks that the common behaviors exist on all of these components.
 */
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme";
import {MemoryRouter, Link as ReactRouterLink} from "react-router-dom";
import {render, screen} from "@testing-library/react";

import {ActionItem, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {
    Checkbox,
    CheckboxGroup,
    Choice,
    RadioGroup,
} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import Link from "@khanacademy/wonder-blocks-link";
import {CompactCell, DetailCell} from "@khanacademy/wonder-blocks-cell";

// We create a wrapper around Clickable since it expects a render function for
// is children while all of the other components do not.
const ClickableWrapper = (props: any) => {
    const {children, ...restProps} = props;
    return <Clickable {...restProps}>{(clickableState) => children}</Clickable>;
};

const IconButtonWrapper = (props: any) => (
    <IconButton {...props} icon={icons.search} />
);

describe.each`
    Component            | name
    ${ActionItem}        | ${"ActionItem"}
    ${Button}            | ${"Button"}
    ${ClickableWrapper}  | ${"Clickable"}
    ${CompactCell}       | ${"CompactCell"}
    ${DetailCell}        | ${"DetailCell"}
    ${IconButtonWrapper} | ${"IconButton"}
    ${Link}              | ${"Link"}
`("$name with an href", ({Component, name}) => {
    beforeEach(() => {
        // Note: window.location.assign and window.open need mock functions in
        // the testing environment
        delete window.location;
        window.location = {assign: jest.fn()};
        window.open = jest.fn();
    });

    afterEach(() => {
        window.open.mockClear();
    });

    it("opens a new tab when target='_blank'", () => {
        const wrapper = mount(
            <Component href="https://www.khanacademy.org" target="_blank">
                Click me
            </Component>,
        );
        wrapper.simulate("click");

        expect(window.open).toHaveBeenCalledWith(
            "https://www.khanacademy.org",
            "_blank",
        );
    });

    it("sets the 'target' prop on the underlying element", () => {
        const wrapper = mount(
            <Component href="https://www.khanacademy.org" target="_blank">
                Click me
            </Component>,
        );
        wrapper.simulate("click");

        expect(wrapper.find("a")).toHaveProp("target", "_blank");
    });

    it("renders a react-router Link if href is path", () => {
        const wrapper = mount(
            <MemoryRouter>
                <Component href="/foo/bar">Click me</Component>
            </MemoryRouter>,
        );

        expect(wrapper.find(ReactRouterLink)).toExist();
    });

    it("does not render a react-router Link if the href is an external URL", () => {
        const wrapper = mount(
            <MemoryRouter>
                <Component href="https://www.khanacademy.org/foo/bar">
                    Click me
                </Component>
            </MemoryRouter>,
        );

        expect(wrapper.find(ReactRouterLink)).not.toExist();
        expect(wrapper.find("a")).toExist();
    });

    it("renders an <a> if the href is '#'", () => {
        const wrapper = mount(
            <MemoryRouter>
                <Component href="#">Click me</Component>
            </MemoryRouter>,
        );

        expect(wrapper.find(ReactRouterLink)).not.toExist();
        expect(wrapper.find("a")).toExist();
    });
});

// NOTE: Link doesn't work without an href so it isn't included in this suite
describe.each`
    Component            | name
    ${ActionItem}        | ${"ActionItem"}
    ${Button}            | ${"Button"}
    ${ClickableWrapper}  | ${"Clickable"}
    ${CompactCell}       | ${"CompactCell"}
    ${DetailCell}        | ${"DetailCell"}
    ${IconButtonWrapper} | ${"IconButton"}
`("$name without an href", ({Component, name}) => {
    beforeEach(() => {
        // Note: window.location.assign and window.open need mock functions in
        // the testing environment, but JSDOM protects assign from being changed
        // so we need to replace the whole location object.
        window.location = {...window.location, assign: jest.fn()};
        window.open = jest.fn();
    });

    afterEach(() => {
        window.open.mockClear();
    });

    it("renders a button", () => {
        const wrapper = mount(
            <MemoryRouter>
                <Component onClick={() => {}}>Click me</Component>
            </MemoryRouter>,
        );

        expect(wrapper.find("button")).toExist();
    });

    it("responds to click events", () => {
        const clickHandler = jest.fn();
        const wrapper = mount(
            <MemoryRouter>
                <Component onClick={clickHandler}>Click me</Component>
            </MemoryRouter>,
        );

        wrapper.simulate("click");

        expect(clickHandler).toHaveBeenCalled();
    });
});

/* ******* tabIndex tests ******* */

// Components that wrap buttons or links should not have a tabIndex.
// Components that don't wrap an alreaady clickable component should
// have an added tabIndex of 0.
describe.each`
    Component            | name             | hasTabIndex
    ${ActionItem}        | ${"ActionItem"}  | ${false}
    ${Button}            | ${"Button"}      | ${false}
    ${ClickableWrapper}  | ${"Clickable"}   | ${false}
    ${CompactCell}       | ${"CompactCell"} | ${false}
    ${DetailCell}        | ${"DetailCell"}  | ${false}
    ${IconButtonWrapper} | ${"IconButton"}  | ${false}
    ${Link}              | ${"Link"}        | ${false}
    ${OptionItem}        | ${"OptionItem"}  | ${true}
`("$name", ({Component, name, hasTabIndex}) => {
    test("has expected existence of tabIndex", () => {
        // Arrange

        // Act
        render(
            <Component onClick={jest.fn()} testId="clickable-component-test-id">
                Click me
            </Component>,
        );

        // Assert
        const component = screen.getByTestId("clickable-component-test-id");
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
    test("doesn't have a redunant tabIndex of 0 (checkbox)", () => {
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
        const checkbox = screen.getByTestId(
            "checkbox-choice-clickable-test-id",
        );
        expect(checkbox).not.toHaveAttribute("tabIndex");
    });

    test("doesn't have a redunant tabIndex of 0 (radio)", () => {
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
        const checkbox = screen.getByTestId("radio-choice-clickable-test-id");
        expect(checkbox).not.toHaveAttribute("tabIndex");
    });
});

describe("Checkbox", () => {
    test("doesn't have a redundant tabIndex of 0", () => {
        // Arrange

        // Act
        render(
            <Checkbox
                checked={false}
                onChange={jest.fn()}
                testId="checkbox-clickable-test-id"
            />,
        );

        // Assert
        const checkbox = screen.getByTestId("checkbox-clickable-test-id");
        expect(checkbox).not.toHaveAttribute("tabIndex");
    });
});
