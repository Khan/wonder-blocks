//@flow
import React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import SelectBox from "./select-box";
import SelectItem from "./select-item";
import SingleSelectMenu from "./single-select-menu.js";

const keyCodes = {
    enter: 13,
    space: 32,
};

describe("SingleSelectMenu", () => {
    let menu;
    const onClick = jest.fn();

    beforeEach(() => {
        menu = mount(
            <SingleSelectMenu
                items={[
                    {
                        type: "select",
                        label: "item 1",
                        value: "1",
                    },
                    {
                        type: "select",
                        label: "item 2",
                        value: "2",
                    },
                    {
                        type: "select",
                        label: "item 3",
                        value: "3",
                    },
                ]}
                onChange={(selectedValue) => onClick()}
                placeholder="Choose"
            />,
        );
    });

    afterEach(() => {
        unmountAll();
    });

    it("closes/opens the menu on mouse click, space, and enter", () => {
        const opener = menu.find(SelectBox);
        expect(menu.state("open")).toEqual(false);

        // Open menu with mouse
        opener.simulate("mousedown");
        opener.simulate("mouseup");
        opener.simulate("click");
        expect(menu.state("open")).toEqual(true);

        // Close menu with space
        opener.simulate("keydown", {keyCode: keyCodes.space});
        opener.simulate("keyup", {keyCode: keyCodes.space});
        opener.simulate("click", {preventDefault: jest.fn()});
        expect(menu.state("open")).toEqual(false);

        // Open menu again with enter
        opener.simulate("keydown", {keyCode: keyCodes.enter});
        opener.simulate("click", {preventDefault: jest.fn()});
        opener.simulate("keyup", {keyCode: keyCodes.enter});
        expect(menu.state("open")).toEqual(true);
    });

    it("displays selected item label as expected", () => {
        menu.setState({open: true});
        const opener = menu.find(SelectBox);
        const noop = jest.fn();
        const nativeEvent = {
            nativeEvent: {stopImmediatePropagation: noop},
        };

        // Grab the second item in the list
        const item = menu.find(SelectItem).at(1);
        expect(item.text()).toEqual("item 2");

        // Click the item
        item.simulate("mousedown");
        item.simulate("mouseup", nativeEvent);
        item.simulate("click");

        // Expect menu's onChange callback to have been called
        expect(onClick).toHaveBeenCalledTimes(1);

        // This menu should close afer a single item selection
        expect(menu.state("open")).toEqual(false);

        // Selected is still false because the client of SingleSelectMenu is
        // expected to change the props on SingleSelectMenu
        expect(item.prop("selected")).toEqual(false);

        // Let's set it manually here via selectedValue on SingleSelectMenu
        menu.setProps({selectedValue: "2"});

        // Now the SelectBox should display the label of the selected item
        // instead of the placeholder
        expect(opener.text()).toEqual("item 2");
    });
});
