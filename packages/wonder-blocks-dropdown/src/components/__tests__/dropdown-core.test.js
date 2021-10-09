// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import OptionItem from "../option-item.js";
import SearchTextInput from "../search-text-input.js";
import DropdownCore from "../dropdown-core.js";
import {keyCodes} from "../../util/constants.js";

jest.mock("../dropdown-core-virtualized.js");

const elementAtIndex = (wrapper, index) =>
    wrapper.find(`[data-test-id="item-${index}"]`).first().getDOMNode();

describe("DropdownCore", () => {
    window.getComputedStyle = jest.fn();

    let dropdown;

    beforeEach(() => {
        jest.useFakeTimers();

        // Jest doesn't fake out the animation frame API, so we're going to do
        // it here and map it to timeouts, that way we can use the fake timer
        // API to test our animation frame things.
        jest.spyOn(global, "requestAnimationFrame").mockImplementation((fn) =>
            setTimeout(fn, 0),
        );
        jest.spyOn(global, "cancelAnimationFrame").mockImplementation((id) =>
            clearTimeout(id),
        );

        const dummyOpener = <button />;
        const openChanged = jest.fn();
        dropdown = mount(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={[
                    {
                        component: (
                            <OptionItem
                                testId="item-0"
                                label="item 0"
                                value="0"
                                key="0"
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                testId="item-1"
                                label="item 1"
                                value="1"
                                key="1"
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                testId="item-2"
                                label="item 2"
                                value="2"
                                key="2"
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                light={false}
                open={false}
                // mock the opener elements
                opener={dummyOpener}
                openerElement={null}
                onOpenChanged={openChanged}
            />,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("handles basic keyboard navigation as expected", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            initialFocusedIndex: 0,
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));

        // navigate down three times
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 1));

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 2));

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));

        // navigate up back two times
        // to last item
        dropdown.simulate("keydown", {keyCode: keyCodes.up});
        dropdown.simulate("keyup", {keyCode: keyCodes.up});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 2));
        // to the previous one
        dropdown.simulate("keydown", {keyCode: keyCodes.up});
        dropdown.simulate("keyup", {keyCode: keyCodes.up});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 1));
    });

    it("doesn't close on touch interaction with option", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        const option0 = dropdown.find("OptionItem").at(0);
        // This is the full order of events fired when tapping an element
        // on mobile
        // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent#Event_order
        option0.simulate("touchstart");
        option0.simulate("touchend");
        option0.simulate("mousemove");
        option0.simulate("mousedown");
        option0.simulate("mouseup");
        option0.simulate("click");

        expect(handleOpen).toHaveBeenCalledTimes(0);
    });

    it("closes on tab and escape as expected", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        // "close" some menus
        dropdown.simulate("keydown", {keyCode: keyCodes.tab});
        dropdown.simulate("keyup", {keyCode: keyCodes.tab});
        dropdown.simulate("keydown", {keyCode: keyCodes.escape});
        dropdown.simulate("keyup", {keyCode: keyCodes.escape});
        expect(handleOpen).toHaveBeenCalledTimes(2);
        // Test that we pass "false" to handleOpenChanged both times
        expect(handleOpen.mock.calls[0][0]).toBe(false);
        expect(handleOpen.mock.calls[1][0]).toBe(false);
    });

    it("closes on external mouse click", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        const event = new MouseEvent("mouseup");
        document.dispatchEvent(event);

        expect(handleOpen).toHaveBeenCalledTimes(1);
        expect(handleOpen.mock.calls[0][0]).toBe(false);
    });

    it("closes on external mouse click on an element inside document.body", () => {
        const handleOpen = jest.fn();
        const container = document.createElement("container");
        if (!document.body) {
            throw new Error("No document.body");
        }
        document.body.appendChild(container);

        /**
         * According to https://stackoverflow.com/questions/36803733/jsdom-dispatchevent-addeventlistener-doesnt-seem-to-work
         * Enzyme uses renderIntoDocument from React.TestUtils which doesn't actually
         * render the component into document.body so testing behavior that relies
         * on bubbling won't work.  This test works around this limitation by using
         * ReactDOM.render() to render our test component into a container that lives
         * in document.body.
         */

        ReactDOM.render(
            <div>
                <h1 id="foo">DropdownCore test</h1>
                <DropdownCore
                    initialFocusedIndex={0}
                    // mock the items
                    items={[
                        {
                            component: (
                                <OptionItem label="item 0" value="0" key="0" />
                            ),
                            focusable: true,
                            populatedProps: {},
                        },
                        {
                            component: (
                                <OptionItem label="item 1" value="1" key="1" />
                            ),
                            focusable: true,
                            populatedProps: {},
                        },
                        {
                            component: (
                                <OptionItem label="item 2" value="2" key="2" />
                            ),
                            focusable: true,
                            populatedProps: {},
                        },
                    ]}
                    role="listbox"
                    light={false}
                    open={true}
                    // mock the opener elements
                    opener={<button />}
                    openerElement={null}
                    onOpenChanged={(open) => handleOpen(open)}
                />
            </div>,
            container,
        );

        const title = document.querySelector("#foo");
        if (!title) {
            throw new Error("Couldn't find title");
        }
        const event = new MouseEvent("mouseup", {bubbles: true});
        title.dispatchEvent(event);

        expect(handleOpen).toHaveBeenCalledTimes(1);
        expect(handleOpen.mock.calls[0][0]).toBe(false);

        // cleanup
        ReactDOM.unmountComponentAtNode(container);
        if (!document.body) {
            throw new Error("No document.body");
        }
        document.body.removeChild(container);
    });

    it("doesn't close on external mouse click if already closed", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            onOpenChanged: (open) => handleOpen(open),
            open: false,
        });

        const event = new MouseEvent("mouseup");
        document.dispatchEvent(event);

        expect(handleOpen).toHaveBeenCalledTimes(0);
    });

    it("opens on down key as expected", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            onOpenChanged: (open) => handleOpen(open),
        });

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});

        expect(handleOpen).toHaveBeenCalledTimes(1);
        expect(handleOpen.mock.calls[0][0]).toBe(true);
    });

    it("selects correct item when starting off at an undefined index", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            initialFocusedIndex: undefined,
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));
    });

    it("selects correct item when starting off at an undefined index and a searchbox", () => {
        const handleOpen = jest.fn();
        const handleSearchTextChanged = jest.fn();
        dropdown.setProps({
            initialFocusedIndex: undefined,
            onOpenChanged: (open) => handleOpen(open),
            searchText: "",
            items: [
                {
                    component: (
                        <SearchTextInput
                            testId="item-0"
                            key="search-text-input"
                            onChange={handleSearchTextChanged}
                            searchText={""}
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
            open: true,
        });
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));
    });

    it("selects correct item when starting off at a different index and a searchbox", () => {
        const handleOpen = jest.fn();
        const handleSearchTextChanged = jest.fn();
        dropdown.setProps({
            initialFocusedIndex: 1,
            onOpenChanged: (open) => handleOpen(open),
            searchText: "",
            items: [
                {
                    component: (
                        <SearchTextInput
                            testId="search"
                            key="search-text-input"
                            onChange={handleSearchTextChanged}
                            searchText={""}
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-0"
                            label="item 1"
                            value="1"
                            key="1"
                        />
                    ),
                    focusable: false,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-1"
                            label="item 2"
                            value="2"
                            key="2"
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
            open: true,
        });
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 1));
    });

    it("selects correct item when starting off at a different index", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            initialFocusedIndex: 2,
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 2));

        // navigate down
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));
    });

    it("focuses correct item with clicking/pressing with initial focused of not 0", () => {
        // Same as the previous test, expect initialFocusedIndex is 2 now
        dropdown.setProps({
            initialFocusedIndex: 2,
            open: true,
        });

        const option1 = dropdown.find("OptionItem").at(1);

        // Click on item at index 1
        option1.simulate("click");

        // should move to next item
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 2));
    });

    it("focuses correct item with a disabled item", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            items: [
                {
                    component: (
                        <OptionItem
                            testId="item-0"
                            label="item 0"
                            value="0"
                            key="0"
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-1"
                            label="item 1"
                            value="1"
                            key="1"
                        />
                    ),
                    focusable: false,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-2"
                            label="item 2"
                            value="2"
                            key="2"
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
            open: true,
        });

        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));

        // Should select option2
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 2));

        // Should select option0
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));
    });

    it("focuses correct item after different items become focusable", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            open: true,
        });

        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));

        // Should select option1
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 1));

        dropdown.setProps({
            items: [
                {
                    component: (
                        <OptionItem
                            testId="item-0"
                            label="item 0"
                            value="0"
                            key="0"
                        />
                    ),
                    focusable: false,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-1"
                            label="item 1"
                            value="1"
                            key="1"
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-2"
                            label="item 2"
                            value="2"
                            key="2"
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
        });

        // Should figure out that option1, which is now at index 0, is selected
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 1));
    });

    it("focuses first item after currently focused item is no longer focusable", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            open: true,
        });

        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));

        const option0 = dropdown.find("OptionItem").at(0);
        option0.simulate("click");
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));

        dropdown.setProps({
            items: [
                {
                    component: (
                        <OptionItem
                            testId="item-0"
                            label="item 0"
                            value="0"
                            key="0"
                        />
                    ),
                    focusable: false,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-1"
                            label="item 1"
                            value="1"
                            key="1"
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            testId="item-2"
                            label="item 2"
                            value="2"
                            key="2"
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
        });

        // Should figure out that option1 is now selected
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 1));
    });

    it("calls correct onclick for an option item", () => {
        const onClick0 = jest.fn();
        const onClick1 = jest.fn();
        dropdown.setProps({
            items: [
                {
                    component: (
                        <OptionItem
                            label="item 0"
                            value="0"
                            key="0"
                            onClick={onClick0}
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: (
                        <OptionItem
                            label="item 1"
                            value="1"
                            key="1"
                            onClick={onClick1}
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: <OptionItem label="item 2" value="2" key="2" />,
                    focusable: true,
                    populatedProps: {},
                },
            ],
            open: true,
        });

        const option1 = dropdown.find("OptionItem").at(1);

        option1.simulate("click");
        expect(onClick1).toHaveBeenCalledTimes(1);
    });

    it("Displays no results when no items are left with filter", () => {
        // Arrange
        const handleSearchTextChanged = jest.fn();

        // Act
        dropdown.setProps({
            onSearchTextChanged: (text) => handleSearchTextChanged(text),
            searchText: "ab",
            items: [
                {
                    component: (
                        <SearchTextInput
                            key="search-text-input"
                            onChange={handleSearchTextChanged}
                            searchText={""}
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
            open: true,
        });

        // Assert
        expect(dropdown).toContainMatchingElement(
            `[data-test-id="dropdown-core-no-results"]`,
        );
    });

    it("When SearchTextInput has input and focused, tab key should not close the select", () => {
        // Arrange
        const handleSearchTextChanged = jest.fn();
        const handleOpen = jest.fn();

        dropdown.setProps({
            onOpenChanged: (open) => handleOpen(open),
            onSearchTextChanged: (text) => handleSearchTextChanged(text),
            searchText: "ab",
            open: true,
            items: [
                {
                    component: (
                        <SearchTextInput
                            testId="item-0"
                            key="search-text-input"
                            onChange={handleSearchTextChanged}
                            searchText={""}
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
        });
        // SearchTextInput should be focused
        const searchInput = dropdown.find(SearchTextInput);
        jest.runAllTimers();

        expect(searchInput.state("focused")).toBe(true);

        // Act
        dropdown.simulate("keydown", {keyCode: keyCodes.tab});
        jest.runAllTimers();

        // Assert
        expect(handleOpen).toHaveBeenCalledTimes(0);
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));
    });

    it("When SearchTextInput exists and focused, space key pressing should be allowed", () => {
        // Arrange
        const handleSearchTextChanged = jest.fn();
        const preventDefaultMock = jest.fn();
        dropdown.setProps({
            onSearchTextChanged: (text) => handleSearchTextChanged(text),
            searchText: "",
            items: [
                {
                    component: (
                        <SearchTextInput
                            testId="item-0"
                            key="search-text-input"
                            onChange={handleSearchTextChanged}
                            searchText={""}
                        />
                    ),
                    focusable: true,
                    populatedProps: {},
                },
            ],
            open: true,
        });
        // SearchTextInput should be focused
        const searchInput = dropdown.find(SearchTextInput).find("input");
        jest.runAllTimers();
        expect(document.activeElement).toBe(elementAtIndex(dropdown, 0));

        // Act
        searchInput.simulate("keydown", {
            keyCode: keyCodes.space,
            preventDefault: preventDefaultMock,
        });
        searchInput.simulate("keyup", {
            keyCode: keyCodes.space,
            preventDefault: preventDefaultMock,
        });

        // Assert
        expect(preventDefaultMock).toHaveBeenCalledTimes(0);
    });
});
