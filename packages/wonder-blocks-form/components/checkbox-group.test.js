//@flow
import React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import CheckboxGroup from "./checkbox-group.js";
import Choice from "./choice.js";

describe("CheckboxGroup", () => {
    let group;
    const onChange = jest.fn();

    beforeEach(() => {
        group = mount(
            <CheckboxGroup
                label="Test"
                description="test description"
                groupName="test"
                onChange={onChange}
                selectedValues={["a", "b"]}
            >
                <Choice label="a" value="a" />
                <Choice label="b" value="b" />
                <Choice label="c" value="c" />
            </CheckboxGroup>,
        );
    });

    afterEach(() => {
        unmountAll();
    });

    it("has the correct items checked", () => {
        const a = group.find(Choice).at(0);
        const b = group.find(Choice).at(1);
        const c = group.find(Choice).at(2);

        // a starts off checked
        expect(a.prop("checked")).toEqual(true);
        expect(b.prop("checked")).toEqual(true);
        expect(c.prop("checked")).toEqual(false);
    });

    it("changes selection when selectedValue changes", () => {
        group.setProps({selectedValues: ["b"]});
        const a = group.find(Choice).at(0);
        const b = group.find(Choice).at(1);
        const c = group.find(Choice).at(2);

        // now only b is checked
        expect(a.prop("checked")).toEqual(false);
        expect(b.prop("checked")).toEqual(true);
        expect(c.prop("checked")).toEqual(false);
    });

    it("displays error state for all Choice children", () => {
        group.setProps({errorMessage: "there's an error"});
        const a = group.find(Choice).at(0);
        const b = group.find(Choice).at(1);
        const c = group.find(Choice).at(2);

        expect(a.prop("error")).toEqual(true);
        expect(b.prop("error")).toEqual(true);
        expect(c.prop("error")).toEqual(true);
    });

    it("calls onChange for each new selection", () => {
        // a is clicked
        const a = group.find(Choice).at(0);
        const aTarget = a.find("clickable_behavior_ClickableBehavior");
        aTarget.simulate("click");
        expect(onChange).toHaveBeenCalledTimes(1);

        // now b is clicked, onChange should also be called
        const b = group.find(Choice).at(1);
        const bTarget = b.find("clickable_behavior_ClickableBehavior");
        bTarget.simulate("click");
        expect(onChange).toHaveBeenCalledTimes(2);
    });
});
