//@flow
import React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import SeparatorItem from "./separator-item.js";
import ActionMenu from "./action-menu.js";

const keyCodes = {
    enter: 13,
    space: 32,
};

describe("ActionMenu", () => {
    let menu;
    const onClick = jest.fn();
    const onToggle = jest.fn();
    const onChange = jest.fn();

    beforeEach(() => {
        menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={(selectedValues) => onChange()}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={() => onClick()} />
                <SeparatorItem />
                <OptionItem
                    label="Toggle"
                    value="toggle"
                    onClick={() => onToggle()}
                />
            </ActionMenu>,
        );
    });

    afterEach(() => {
        unmountAll();
    });

    it("closes/opens the menu on mouse click, space, and enter", () => {
        const opener = menu.find("ActionMenuOpener");

        expect(menu.state("open")).toEqual(false);

        // Open menu with mouse
        opener.simulate("mousedown");
        opener.simulate("mouseup");
        opener.simulate("click");
        expect(menu.state("open")).toEqual(true);

        // Close menu with space
        opener.simulate("keydown", {keyCode: keyCodes.space});
        opener.simulate("keyup", {keyCode: keyCodes.space});
        expect(menu.state("open")).toEqual(false);

        // Open menu again with enter
        opener.simulate("keydown", {keyCode: keyCodes.enter});
        opener.simulate("keyup", {keyCode: keyCodes.enter});
        expect(menu.state("open")).toEqual(true);
    });

    it("triggers actions and toggles select items as expected", () => {
        menu.setState({open: true});

        const noop = jest.fn();
        const nativeEvent = {
            nativeEvent: {stopImmediatePropagation: noop},
        };
        const actionItem = menu.find(ActionItem);
        actionItem.simulate("mousedown");
        actionItem.simulate("mouseup", nativeEvent);
        actionItem.simulate("click");
        expect(onClick).toHaveBeenCalledTimes(1);

        const optionItem = menu.find(OptionItem);
        optionItem.simulate("mousedown");
        optionItem.simulate("mouseup", nativeEvent);
        optionItem.simulate("click", nativeEvent);
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
