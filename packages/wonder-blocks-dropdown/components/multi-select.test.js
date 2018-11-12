//@flow
import React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import SelectOpener from "./select-opener.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import MultiSelect from "./multi-select.js";
import {keyCodes} from "../util/constants.js";

describe("MultiSelect", () => {
    let select;
    const allChanges = [];
    const saveUpdate = (update) => {
        allChanges.push(update);
    };
    const onChange = jest.fn();

    beforeEach(() => {
        window.scrollTo = jest.fn();
        select = mount(
            <MultiSelect
                onChange={(selectedValues) => {
                    saveUpdate(selectedValues);
                    onChange();
                }}
                placeholder="Choose"
                selectItemType="students"
                selectedValues={["2"]}
                shortcuts={true}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
            </MultiSelect>,
        );
    });

    afterEach(() => {
        window.scrollTo.mockClear();
        unmountAll();
    });

    it("closes/opens the select on mouse click, space, and enter", () => {
        const opener = select.find(SelectOpener);
        expect(select.state("open")).toEqual(false);

        // Open select with mouse
        opener.simulate("mousedown");
        opener.simulate("mouseup");
        opener.simulate("click");
        expect(select.state("open")).toEqual(true);

        // Close select with space
        opener.simulate("keydown", {keyCode: keyCodes.space});
        opener.simulate("keyup", {keyCode: keyCodes.space});
        expect(select.state("open")).toEqual(false);

        // Should open with enter
        opener.simulate("keydown", {keyCode: keyCodes.enter});
        opener.simulate("keyup", {keyCode: keyCodes.enter});
        expect(select.state("open")).toEqual(true);
    });

    it("selects items as expected", () => {
        select.setState({open: true});
        const noop = jest.fn();
        const nativeEvent = {
            nativeEvent: {stopImmediatePropagation: noop},
        };

        expect(select.prop("selectedValues")).toEqual(["2"]);

        // Grab the second item in the list
        const item = select.find(OptionItem).at(0);
        expect(item.text()).toEqual("item 1");
        // Click the item 2, deselecting it
        item.simulate("mousedown");
        item.simulate("mouseup", nativeEvent);
        item.simulate("click");

        // Expect select's onChange callback to have been called
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(allChanges.length).toEqual(1);
        const currentlySelected = allChanges.pop();

        // Expected selected items are now 1 and 2
        expect(currentlySelected.length).toEqual(2);
        expect(currentlySelected.includes("1")).toEqual(true);
        expect(currentlySelected.includes("2")).toEqual(true);
        expect(currentlySelected.includes("3")).toEqual(false);

        // Now manually set the selectedValues like clients would
        select.setProps({selectedValues: ["1", "2"]});

        // This select should still be open afer a selection
        expect(select.state("open")).toEqual(true);

        // Select all of the items
        const selectAll = select.find(ActionItem).at(0);
        selectAll.simulate("mousedown");
        selectAll.simulate("mouseup", nativeEvent);
        selectAll.simulate("click");
        expect(allChanges.pop().length).toEqual(3);

        // Select none of the items
        const selectNone = select.find(ActionItem).at(1);
        selectNone.simulate("mousedown");
        selectNone.simulate("mouseup", nativeEvent);
        selectNone.simulate("click");
        expect(allChanges.pop().length).toEqual(0);

        // Menu should still be open
        expect(select.state("open")).toEqual(true);
    });

    it("displays correct text for opener", () => {
        const opener = select.find(SelectOpener);

        // No items are selected, display placeholder because there is one
        select.setProps({selectedValues: []});
        expect(opener.text()).toEqual("Choose");

        // One item is selected, display that item's label
        select.setProps({selectedValues: ["1"]});
        expect(opener.text()).toEqual("item 1");

        // More than one item is selected, display n itemTypes
        select.setProps({selectedValues: ["1", "2"]});
        expect(opener.text()).toEqual("2 students");

        // All items are selected
        select.setProps({selectedValues: ["1", "2", "3"]});
        expect(opener.text()).toEqual("All students");
    });
});
