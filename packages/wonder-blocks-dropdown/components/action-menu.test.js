//@flow
import React from "react";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import SeparatorItem from "./separator-item.js";
import ActionMenu from "./action-menu.js";
import {keyCodes} from "../util/constants.js";
import Dropdown from "./dropdown.js";

jest.mock("./dropdown-core-virtualized.js");

describe("ActionMenu", () => {
    const onClick = jest.fn();
    const onToggle = jest.fn();
    const onChange = jest.fn();
    let ClickableBehavior;

    beforeEach(() => {
        ClickableBehavior = getClickableBehavior();
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
                testId="fail-test"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        const opener = menu.find(ClickableBehavior);
        expect(menu.state("opened")).toEqual(false);

        // Open menu with mouse
        opener.simulate("click");
        expect(menu.find(Dropdown).state("opened")).toEqual(true);

        // Close menu with space
        opener.simulate("keydown", {keyCode: keyCodes.space});
        opener.simulate("keyup", {keyCode: keyCodes.space});
        expect(menu.find(Dropdown).state("opened")).toEqual(false);

        // Open menu again with enter
        opener.simulate("keydown", {keyCode: keyCodes.enter});
        opener.simulate("keyup", {keyCode: keyCodes.enter});
        expect(menu.find(Dropdown).state("opened")).toEqual(true);
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
        menu.find(ClickableBehavior).simulate("click");

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
        menu.find(ClickableBehavior).simulate("click");

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
        menu.find(ClickableBehavior).simulate("click");

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
        menu.find(ClickableBehavior).simulate("click");

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
        menu.find(ClickableBehavior).simulate("click");

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
        menu.find(ClickableBehavior).simulate("click");

        // Assert
        expect(menu.find(ActionItem)).toHaveLength(1);
    });

    it("can have a menu with no items", () => {
        // Arrange, Act
        const menu = mount(<ActionMenu menuText={"Action menu!"} />);
        menu.find(ClickableBehavior).simulate("click");

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
        menu.find(ClickableBehavior).simulate("click");

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
        const opener = menu.find(ClickableBehavior).find("button");

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
            state = {
                opened: this.props.opened,
            };

            handleToggleMenu = (opened) => {
                this.setState({
                    opened: opened,
                });

                this.props.onToggle && this.props.onToggle(opened);
            };

            render() {
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
            wrapper
                .find(ActionItem)
                .at(0)
                .simulate("click");

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });

        it("opens the menu when the anchor is clicked once", () => {
            // Arrange
            const wrapper = mount(<ControlledComponent />);

            // Act
            // click on the anchor
            wrapper.find(ClickableBehavior).simulate("click");

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
            wrapper
                .find(ActionItem)
                .at(0)
                .simulate("click");

            // Assert
            expect(wrapper.find(ActionMenu).prop("opened")).toBe(false);
        });
    });
});
