//@flow
import React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import SelectBox from "./select-box";
import ActionItem from "./action-item";
import SelectItem from "./select-item";
import MultiSelectMenu from "./multi-select-menu.js";

const keyCodes = {
    enter: 13,
    space: 32,
};

describe("MultiSelectMenu", () => {
    let menu;
    const allChanges = [];
    const saveUpdate = (update) => {
        allChanges.push(update);
    };
    const onClick = jest.fn();

    beforeEach(() => {
        menu = mount(
            <MultiSelectMenu
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
                onChange={(selectedValues) => {
                    saveUpdate(selectedValues);
                    onClick();
                }}
                placeholder="Choose"
                selectItemType="students"
                selectedValues={["2"]}
                shortcuts={true}
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

    it("selects items as expected", () => {
        menu.setState({open: true});
        const noop = jest.fn();
        const nativeEvent = {
            nativeEvent: {stopImmediatePropagation: noop},
        };

        expect(menu.prop("selectedValues")).toEqual(["2"]);

        // Grab the second item in the list
        const item = menu.find(SelectItem).at(0);
        expect(item.text()).toEqual("item 1");
        // Click the item 2, deselecting it
        item.simulate("mousedown");
        item.simulate("mouseup", nativeEvent);
        item.simulate("click");

        // Expect menu's onChange callback to have been called
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(allChanges.length).toEqual(1);
        const currentlySelected = allChanges.pop();

        // Expected selected items are now 1 and 2
        expect(currentlySelected.length).toEqual(2);
        expect(currentlySelected.includes("1")).toEqual(true);
        expect(currentlySelected.includes("2")).toEqual(true);
        expect(currentlySelected.includes("3")).toEqual(false);

        // Now manually set the selectedValues like clients would
        menu.setProps({selectedValues: ["1", "2"]});

        // This menu should still be open afer a selection
        expect(menu.state("open")).toEqual(true);

        // Select all of the items
        const selectAll = menu.find(ActionItem).at(0);
        selectAll.simulate("mousedown");
        selectAll.simulate("mouseup", nativeEvent);
        selectAll.simulate("click");
        expect(allChanges.pop().length).toEqual(3);

        // Select none of the items
        const selectNone = menu.find(ActionItem).at(1);
        selectNone.simulate("mousedown");
        selectNone.simulate("mouseup", nativeEvent);
        selectNone.simulate("click");
        expect(allChanges.pop().length).toEqual(0);

        // Menu should still be open
        expect(menu.state("open")).toEqual(true);
    });

    it("displays correct text for opener", () => {
        const opener = menu.find(SelectBox);

        // No items are selected, display placeholder because there is one
        menu.setProps({selectedValues: []});
        expect(opener.text()).toEqual("Choose");

        // One item is selected, display that item's label
        menu.setProps({selectedValues: ["1"]});
        expect(opener.text()).toEqual("item 1");

        // More than one item is selected, display n itemTypes
        menu.setProps({selectedValues: ["1", "2"]});
        expect(opener.text()).toEqual("2 students");

        // All items are selected
        menu.setProps({selectedValues: ["1", "2", "3"]});
        expect(opener.text()).toEqual("All students");
    });
});
