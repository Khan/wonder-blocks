//@flow
import React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import SeparatorItem from "./separator-item.js";
import ActionMenu from "./action-menu.js";
import {keyCodes} from "../util/constants.js";

describe("ActionMenu", () => {
    const onClick = jest.fn();
    const onToggle = jest.fn();
    const onChange = jest.fn();

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo.mockClear();
        unmountAll();
    });

    it("closes/opens the menu on mouse click, space, and enter", () => {
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

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
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

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

        // Have to reopen menu because menu closes after an item is selected
        menu.setState({open: true});

        const optionItem = menu.find(OptionItem);
        optionItem.simulate("mousedown");
        optionItem.simulate("mouseup", nativeEvent);
        optionItem.simulate("click", nativeEvent);
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("deselects selected OptionItems", () => {
        let selectedValues = ["toggle_a", "toggle_b"];

        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={(values) => (selectedValues = values)}
                selectedValues={selectedValues}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );

        menu.setState({open: true});

        // toggle second OptionItem
        const optionItem = menu.find(OptionItem).at(1);
        optionItem.props().onToggle("toggle_b");

        expect(selectedValues).toEqual(["toggle_a"]);
    });

    it("doesn't break with OptionItems but no onChange callback", () => {
        const selectedValues = ["toggle_a", "toggle_b"];

        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                selectedValues={selectedValues}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );

        menu.setState({open: true});

        // toggle second OptionItem
        const optionItem = menu.find(OptionItem).at(1);
        optionItem.props().onToggle("toggle_b");

        expect(selectedValues).toEqual(["toggle_a", "toggle_b"]);
    });

    it("works with extra selected values", () => {
        let selectedValues = ["toggle_a", "toggle_z"];

        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={(values) => (selectedValues = values)}
                selectedValues={selectedValues}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );

        menu.setState({open: true});

        // toggle second OptionItem
        const optionItem = menu.find(OptionItem).at(0);
        optionItem.props().onToggle("toggle_a");

        expect(selectedValues).toEqual(["toggle_z"]);
    });

    it("can have a menu with a single item", () => {
        const menu = mount(
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Action" />
            </ActionMenu>,
        );

        menu.setState({open: true});

        expect(menu.find(ActionItem)).toHaveLength(1);
    });

    it("can have a menu with no items", () => {
        const menu = mount(<ActionMenu menuText={"Action menu!"} />);

        menu.setState({open: true});

        expect(menu.find(ActionItem)).toHaveLength(0);
    });

    it("can have falsy items", () => {
        const showDeleteAction = false;
        const menu = mount(
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Create" />
                {showDeleteAction && <ActionItem label="Delete" />}
            </ActionMenu>,
        );

        menu.setState({open: true});

        expect(menu.find(ActionItem)).toHaveLength(1);
        expect(menu.find(ActionItem).at(0)).toHaveProp("label", "Create");
    });
});
