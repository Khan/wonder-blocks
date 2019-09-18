//@flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import OptionItem from "./option-item.js";
import SearchTextInput from "./search-text-input.js";
import DropdownCore from "./dropdown-core.js";
import {keyCodes} from "../util/constants.js";

describe("DropdownCore", () => {
    window.scrollTo = jest.fn();
    window.getComputedStyle = jest.fn();

    let dropdown;

    beforeEach(() => {
        const dummyOpener = <button />;
        const openChanged = jest.fn();
        dropdown = mount(
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
                keyboard={true}
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
        unmountAll();
    });

    it("handles basic keyboard navigation as expected", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            initialFocusedIndex: 0,
            keyboard: true,
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        expect(dropdown.instance().focusedIndex).toBe(0);

        // navigate down three times
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(1);

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(2);

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(0);

        // navigate up back to last item
        dropdown.simulate("keydown", {keyCode: keyCodes.up});
        dropdown.simulate("keyup", {keyCode: keyCodes.up});
        expect(dropdown.instance().focusedIndex).toBe(2);
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
                    keyboard={true}
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

    it("selects correct item when starting off at a different index", () => {
        const handleOpen = jest.fn();
        dropdown.setProps({
            initialFocusedIndex: 2,
            keyboard: true,
            onOpenChanged: (open) => handleOpen(open),
            open: true,
        });

        expect(dropdown.instance().focusedIndex).toBe(2);

        // navigate down
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(0);
    });

    it("focuses correct item when opened with click, then switching to keyboard", () => {
        dropdown.setProps({
            initialFocusedIndex: 1,
            keyboard: false,
            open: true,
        });

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(1);
    });

    it("focuses correct item after clicking on option, then switching to keyboard", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            keyboard: false,
            open: true,
        });

        const option1 = dropdown.find("OptionItem").at(1);

        // Click on item at index 1
        option1.simulate("click");

        // When starting to use keyboard behavior, should move to next item
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(2);
    });

    it("focuses correct item with clicking/pressing with initial focused of not 0", () => {
        // Same as the previous test, expect initialFocusedIndex is 2 now
        dropdown.setProps({
            initialFocusedIndex: 2,
            keyboard: false,
            open: true,
        });

        const option1 = dropdown.find("OptionItem").at(1);

        // Click on item at index 1
        option1.simulate("click");

        // When starting to use keyboard behavior, should move to next item
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(2);
    });

    it("focuses correct item with a disabled item", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            items: [
                {
                    component: <OptionItem label="item 0" value="0" key="0" />,
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: <OptionItem label="item 1" value="1" key="1" />,
                    focusable: false,
                    populatedProps: {},
                },
                {
                    component: <OptionItem label="item 2" value="2" key="2" />,
                    focusable: true,
                    populatedProps: {},
                },
            ],
            keyboard: true,
            open: true,
        });

        expect(dropdown.instance().focusedIndex).toBe(0);

        // Should select option2
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(1);
        expect(dropdown.instance().focusedOriginalIndex).toBe(2);

        // Should select option0
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(0);
        expect(dropdown.instance().focusedOriginalIndex).toBe(0);
    });

    it("focuses correct item after different items become focusable", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            keyboard: true,
            open: true,
        });

        expect(dropdown.instance().focusedIndex).toBe(0);

        // Should select option1
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(1);

        dropdown.setProps({
            items: [
                {
                    component: <OptionItem label="item 0" value="0" key="0" />,
                    focusable: false,
                    populatedProps: {},
                },
                {
                    component: <OptionItem label="item 1" value="1" key="1" />,
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: <OptionItem label="item 2" value="2" key="2" />,
                    focusable: true,
                    populatedProps: {},
                },
            ],
        });

        // Should figure out that option1, which is now at index 0, is selected
        expect(dropdown.instance().focusedIndex).toBe(0);
    });

    it("focuses first item after currently focused item is no longer focusable", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            open: true,
        });

        expect(dropdown.instance().focusedIndex).toBe(0);

        const option0 = dropdown.find("OptionItem").at(0);
        option0.simulate("click");
        expect(dropdown.instance().focusedIndex).toBe(0);

        dropdown.setProps({
            items: [
                {
                    component: <OptionItem label="item 0" value="0" key="0" />,
                    focusable: false,
                    populatedProps: {},
                },
                {
                    component: <OptionItem label="item 1" value="1" key="1" />,
                    focusable: true,
                    populatedProps: {},
                },
                {
                    component: <OptionItem label="item 2" value="2" key="2" />,
                    focusable: true,
                    populatedProps: {},
                },
            ],
        });

        // Should figure out that option1 is now selected
        expect(dropdown.instance().focusedIndex).toBe(0);
        expect(dropdown.instance().focusedOriginalIndex).toBe(1);
    });

    it("doesn't immediately turn on keyboard navigation on item selection", () => {
        dropdown.setProps({
            initialFocusedIndex: 0,
            keyboard: false,
            open: true,
        });

        expect(dropdown.instance().focusedIndex).toBe(0);

        const option0 = dropdown.find("OptionItem").at(0);
        option0.simulate("click");

        // Keyboard nav isn't on, but itemsClicked is
        expect(dropdown.instance().keyboardNavOn).toBe(false);
        expect(dropdown.instance().itemsClicked).toBe(true);
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

    it("shows SearchTextInput when onSearchTextChanged and searchText is provided", () => {
        // Arrange, Act
        const handleSearchTextChanged = jest.fn();
        dropdown.setProps({
            onSearchTextChanged: (text) => handleSearchTextChanged(text),
            searchText: "",
            open: true,
        });
        // Assert
        expect(dropdown.find(SearchTextInput).exists()).toBe(true);
    });

    it("Displays no results when no items are left with filter", () => {
        // Arrange, Act
        const handleSearchTextChanged = jest.fn();
        dropdown.setProps({
            onSearchTextChanged: (text) => handleSearchTextChanged(text),
            searchText: "ab",
            items: [],
            open: true,
        });

        // Assert
        expect(dropdown.find("InnerPopper").text()).toContain("No results");
    });
});
