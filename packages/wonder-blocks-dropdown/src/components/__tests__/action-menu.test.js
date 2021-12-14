//@flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import ActionItem from "../action-item.js";
import OptionItem from "../option-item.js";
import SeparatorItem from "../separator-item.js";
import ActionMenu from "../action-menu.js";
import DropdownOpener from "../dropdown-opener.js";
import {keyCodes} from "../../util/constants.js";
import ActionMenuOpenerCore from "../action-menu-opener-core.js";

jest.mock("../dropdown-core-virtualized.js");

describe("ActionMenu", () => {
    const onClick = jest.fn();
    const onToggle = jest.fn();
    const onChange = jest.fn();

    it("opens the menu on mouse click", () => {
        // Arrange
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        const opener = menu.find(DropdownOpener);
        opener.simulate("click");

        // Assert
        expect(menu.state("opened")).toBe(true);
    });

    it("opens the menu on enter", () => {
        // Arrange
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        const opener = menu.find(DropdownOpener);
        opener.simulate("keydown", {keyCode: keyCodes.enter});
        opener.simulate("keyup", {keyCode: keyCodes.enter});

        // Assert
        expect(menu.state("opened")).toBe(true);
    });

    it("closes itself on escape", () => {
        // Arrange
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        const opener = menu.find(DropdownOpener);
        // open using the mouse
        opener.simulate("click");
        // use keyboard to simulate the ESC key
        opener.simulate("keydown", {keyCode: keyCodes.escape});
        opener.simulate("keyup", {keyCode: keyCodes.escape});

        // Assert
        expect(menu.state("opened")).toBe(false);
    });

    it("closes itself on tab", () => {
        // Arrange
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        const opener = menu.find(DropdownOpener);
        // open using the mouse
        opener.simulate("click");
        // use keyboard to simulate the TAB key
        opener.simulate("keydown", {keyCode: keyCodes.tab});
        opener.simulate("keyup", {keyCode: keyCodes.tab});

        // Assert
        expect(menu.state("opened")).toBe(false);
    });

    it("closes itself on an external mouse click", () => {
        // Arrange
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        const opener = menu.find(DropdownOpener);
        // open using the mouse
        opener.simulate("click");
        // trigger body click
        document.dispatchEvent(new MouseEvent("mouseup"));

        // Assert
        expect(menu.state("opened")).toBe(false);
    });

    it("updates the aria-expanded value when opening and closing", () => {
        // Arrange
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        let opener = menu.find(DropdownOpener);
        let openerCore = menu.find(ActionMenuOpenerCore);
        expect(openerCore.prop("opened")).toBe(false);
        expect(opener.find("[aria-expanded='false']")).toExist();

        // Act
        opener.simulate("keydown", {keyCode: keyCodes.enter});
        opener.simulate("keyup", {keyCode: keyCodes.enter});
        menu.update();
        openerCore = menu.find(ActionMenuOpenerCore);
        opener = menu.find(DropdownOpener);

        // Assert
        expect(openerCore.prop("opened")).toBe(true);
        expect(opener.find("[aria-expanded='true']")).toExist();
    });

    it("triggers actions", () => {
        // Arrange
        const onChange = jest.fn();
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={["toggle_a", "toggle_b"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );
        menu.find(DropdownOpener).simulate("click");

        // Act
        // toggle second OptionItem
        const optionItem = menu.find(OptionItem).at(1);
        optionItem.props().onToggle("toggle_b");

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a"]);
    });

    it("toggles select items", () => {
        // Arrange
        const onChange = jest.fn();
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={[]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );
        menu.find(DropdownOpener).simulate("click");

        // Act
        const optionItem = menu.find(OptionItem).at(0);
        optionItem.props().onToggle("toggle_a");

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a"]);
    });

    it("deselects selected OptionItems", () => {
        // Arrange
        const onChange = jest.fn();
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={["toggle_a", "toggle_b"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );
        menu.find(DropdownOpener).simulate("click");

        // Act
        // toggle second OptionItem
        const optionItem = menu.find(OptionItem).at(1);
        optionItem.props().onToggle("toggle_b");

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a"]);
    });

    it("doesn't break with OptionItems but no onChange callback", () => {
        // Arrange
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                selectedValues={["toggle_a", "toggle_b"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );
        menu.find(DropdownOpener).simulate("click");

        // Act, Assert
        expect(() => {
            // toggle second OptionItem
            // eslint-disable-next-line no-console
            const optionItem = menu.find(OptionItem).at(1);
            optionItem.props().onToggle("toggle_b");
        }).not.toThrow();
    });

    it("works with extra selected values", () => {
        // Arrange
        const onChange = jest.fn();
        const menu = mount(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={["toggle_a", "toggle_z"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );
        menu.find(DropdownOpener).simulate("click");

        // Act
        // toggle second OptionItem
        const optionItem = menu.find(OptionItem).at(0);
        optionItem.props().onToggle("toggle_a");

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_z"]);
    });

    it("can have a menu with a single item", () => {
        // Arrange, Act
        const menu = mount(
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Action" />
            </ActionMenu>,
        );
        menu.find(DropdownOpener).simulate("click");

        // Assert
        expect(menu.find(ActionItem)).toHaveLength(1);
    });

    it("can have a menu with no items", () => {
        // Arrange, Act
        const menu = mount(<ActionMenu menuText={"Action menu!"} />);
        menu.find(DropdownOpener).simulate("click");

        // Assert
        expect(menu.find(ActionItem)).toHaveLength(0);
    });

    it("can have falsy items", () => {
        // Arrange, Act
        const showDeleteAction = false;
        const menu = mount(
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Create" />
                {showDeleteAction && <ActionItem label="Delete" />}
            </ActionMenu>,
        );
        menu.find(DropdownOpener).simulate("click");

        // Assert
        expect(menu.find(ActionItem)).toHaveLength(1);
        expect(menu.find(ActionItem).first()).toHaveProp("label", "Create");
    });

    it("verifies testId is added to the opener", () => {
        // Arrange
        const menu = mount(
            <ActionMenu menuText={"Action menu!"} testId="some-test-id">
                <ActionItem label="Create" />
            </ActionMenu>,
        );

        // Act
        const opener = menu.find(DropdownOpener).find("button");

        // Assert
        expect(opener.prop("data-test-id")).toBe("some-test-id");
    });

    describe("Controlled component", () => {
        type Props = {|
            opened?: boolean,
            onToggle?: (opened: boolean) => mixed,
        |};

        type State = {|
            opened?: boolean,
        |};
        class ControlledComponent extends React.Component<Props, State> {
            state: State = {
                opened: this.props.opened,
            };

            handleToggleMenu = (opened) => {
                this.setState({
                    opened: opened,
                });

                this.props.onToggle && this.props.onToggle(opened);
            };

            render(): React.Node {
                return (
                    <React.Fragment>
                        <ActionMenu
                            opened={this.state.opened}
                            onToggle={this.handleToggleMenu}
                            menuText={"Action menu!"}
                        >
                            <ActionItem label="Create" />
                            <ActionItem label="Delete" />
                        </ActionMenu>
                        <button
                            data-test-id="parent-button"
                            onClick={() => this.handleToggleMenu(true)}
                        />
                    </React.Fragment>
                );
            }
        }

        it("opens the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            const wrapper = mount(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            wrapper.find(`[data-test-id="parent-button"]`).simulate("click");

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", () => {
            const onToggleMock = jest.fn();
            const wrapper = mount(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            // open the menu from the outside
            wrapper.find(`[data-test-id="parent-button"]`).simulate("click");
            // click on first item
            wrapper.find(ActionItem).at(0).simulate("click");

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });

        it("opens the menu when the anchor is clicked once", () => {
            // Arrange
            const wrapper = mount(<ControlledComponent />);

            // Act
            // click on the anchor
            wrapper.find(DropdownOpener).simulate("click");

            // Assert
            expect(wrapper.find(ActionMenu).prop("opened")).toBe(true);
        });

        it("closes the menu when an option is clicked", () => {
            // Arrange
            const wrapper = mount(<ControlledComponent />);

            // Act
            // open the menu from the outside
            wrapper.find(`[data-test-id="parent-button"]`).simulate("click");
            // pick an option to close the menu
            wrapper.find(ActionItem).at(0).simulate("click");

            // Assert
            expect(wrapper.find(ActionMenu).prop("opened")).toBe(false);
        });
    });

    describe("Custom Opener", () => {
        it("opens the menu when clicking on the custom opener", () => {
            // Arrange
            const menu = mount(
                <ActionMenu
                    menuText={"Action menu!"}
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <ActionItem label="Action" onClick={onClick} />
                </ActionMenu>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            opener.simulate("click");

            // Assert
            expect(menu.state("opened")).toBe(true);
        });

        it("calls the custom onClick handler", () => {
            // Arrange
            const onClickMock = jest.fn();

            const menu = mount(
                <ActionMenu
                    menuText={"Action menu!"}
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={(eventState) => (
                        <button aria-label="Search" onClick={onClickMock} />
                    )}
                >
                    <ActionItem label="Action" onClick={onClick} />
                </ActionMenu>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            opener.simulate("click");

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("verifies testId is passed from the custom opener", () => {
            // Arrange
            const menu = mount(
                <ActionMenu
                    onChange={onChange}
                    menuText="Action menu!"
                    opener={() => (
                        <button
                            data-test-id="custom-opener"
                            aria-label="Custom opener"
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </ActionMenu>,
            );

            // Act
            const opener = menu.find(DropdownOpener).find("button");

            // Assert
            expect(opener.prop("data-test-id")).toBe("custom-opener");
        });

        it("verifies testId is not passed from the parent element", () => {
            // Arrange
            const menu = mount(
                <ActionMenu
                    onChange={onChange}
                    menuText="Action menu!"
                    testId="custom-opener"
                    opener={() => <button aria-label="Custom opener" />}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </ActionMenu>,
            );

            // Act
            const opener = menu.find(DropdownOpener).find("button");

            // Assert
            expect(opener.prop("data-test-id")).not.toBeDefined();
        });

        it("passes the menu text to the custom opener", () => {
            // Arrange
            const menu = mount(
                <ActionMenu
                    menuText="Action menu!"
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={({text}) => (
                        <button
                            onClick={jest.fn()}
                            data-test-id="custom-opener"
                        >
                            {text}
                        </button>
                    )}
                >
                    <OptionItem label="Toggle A" value="toggle_a" />
                    <OptionItem label="Toggle B" value="toggle_b" />
                </ActionMenu>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            // open dropdown
            opener.simulate("click");
            const openerElement = menu.find(`[data-test-id="custom-opener"]`);

            // Assert
            expect(openerElement).toHaveText("Action menu!");
        });
    });
});
