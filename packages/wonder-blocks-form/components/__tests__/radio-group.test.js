//@flow
import * as React from "react";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import RadioGroup from "../radio-group.js";
import Choice from "../choice.js";

describe("RadioGroup", () => {
    let group;
    const onChange = jest.fn();

    beforeEach(() => {
        group = mount(
            <RadioGroup
                label="Test"
                description="test description"
                groupName="test"
                onChange={onChange}
                selectedValue="a"
            >
                <Choice label="a" value="a" aria-labelledby="test-a" />
                <Choice label="b" value="b" aria-labelledby="test-b" />
                <Choice label="c" value="c" aria-labelledby="test-c" />
            </RadioGroup>,
        );
    });

    afterEach(() => {
        unmountAll();
    });

    it("selects only one item at a time", () => {
        const a = group.find(Choice).at(0);
        const b = group.find(Choice).at(1);
        const c = group.find(Choice).at(2);

        // a starts off checked
        expect(a.prop("checked")).toEqual(true);
        expect(b.prop("checked")).toEqual(false);
        expect(c.prop("checked")).toEqual(false);
    });

    it("changes selection when selectedValue changes", () => {
        group.setProps({selectedValue: "b"});
        const a = group.find(Choice).at(0);
        const b = group.find(Choice).at(1);
        const c = group.find(Choice).at(2);

        // now b is checked
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

    it("doesn't change when an already selected item is reselected", () => {
        // a is already selected, onChange shouldn't be called
        const a = group.find(Choice).at(0);
        const aTarget = a.find("ClickableBehavior");
        aTarget.simulate("click");
        expect(onChange).toHaveBeenCalledTimes(0);

        // now b is clicked, onChange should be called
        const b = group.find(Choice).at(1);
        const bTarget = b.find("ClickableBehavior");
        bTarget.simulate("click");
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("checks that aria attributes have been added correctly", () => {
        const a = group.find(Choice).at(0);
        const b = group.find(Choice).at(1);
        const c = group.find(Choice).at(2);
        expect(a.find("input").prop("aria-labelledby")).toEqual("test-a");
        expect(b.find("input").prop("aria-labelledby")).toEqual("test-b");
        expect(c.find("input").prop("aria-labelledby")).toEqual("test-c");
    });
});
