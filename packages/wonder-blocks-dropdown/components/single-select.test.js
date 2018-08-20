//@flow
import React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import SelectOpener from "./select-opener.js";
import OptionItem from "./option-item.js";
import SingleSelect from "./single-select.js";

const keyCodes = {
    enter: 13,
    space: 32,
};

describe("SingleSelect", () => {
    let select;
    const onClick = jest.fn();

    beforeEach(() => {
        select = mount(
            <SingleSelect
                onChange={(selectedValue) => onClick()}
                placeholder="Choose"
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
            </SingleSelect>,
        );
    });

    afterEach(() => {
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

        // Shouldn't open with enter
        opener.simulate("keydown", {keyCode: keyCodes.enter});
        opener.simulate("keyup", {keyCode: keyCodes.enter});
        expect(select.state("open")).toEqual(false);
    });

    it("displays selected item label as expected", () => {
        select.setState({open: true});
        const opener = select.find(SelectOpener);
        const noop = jest.fn();
        const nativeEvent = {
            nativeEvent: {stopImmediatePropagation: noop},
        };

        // Grab the second item in the list
        const item = select.find(OptionItem).at(1);
        expect(item.text()).toEqual("item 2");
        // Click the item
        item.simulate("mousedown");
        item.simulate("mouseup", nativeEvent);
        item.simulate("click");

        // Expect select's onChange callback to have been called
        expect(onClick).toHaveBeenCalledTimes(1);

        // This select should close afer a single item selection
        expect(select.state("open")).toEqual(false);

        // Selected is still false because the client of SingleSelect is
        // expected to change the props on SingleSelect
        expect(item.prop("selected")).toEqual(false);

        // Let's set it manually here via selectedValue on SingleSelect
        select.setProps({selectedValue: "2"});

        // Now the SelectOpener should display the label of the selected item
        // instead of the placeholder
        expect(opener.text()).toEqual("item 2");
    });
});
