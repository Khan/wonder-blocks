//@flow
import * as React from "react";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {ClickableBehavior} from "@khanacademy/wonder-blocks-core";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import DropdownCore from "./dropdown-core.js";
import Dropdown from "./dropdown.js";
import {keyCodes} from "../util/constants.js";

type Props = {|
    selectionType?: "single" | "multi",
    opened?: boolean,
    onToggle?: (opened: boolean) => mixed,
|};
type State = {|
    selectedValues: Array<*>,
    opened?: boolean,
|};

describe("Dropdown", () => {
    window.scrollTo = jest.fn();
    window.getComputedStyle = jest.fn();
    let dropdown;

    beforeEach(() => {
        dropdown = mount(
            <Dropdown
                testId="teacher-menu"
                selectedValues={["A"]}
                menuItems={[
                    <OptionItem label="A" value="A" />,
                    <OptionItem label="B" value="B" />,
                    <OptionItem label="C" value="C" />,
                    <ActionItem
                        label="Profile"
                        href="http://khanacademy.org/profile"
                        testId="profile"
                    />,
                    <ActionItem
                        label="Teacher dashboard"
                        href="http://khanacademy.org/coach/dashboard"
                        testId="dashboard"
                    />,
                    <ActionItem
                        label="Settings (onClick)"
                        onClick={() => {}}
                        testId="settings"
                    />,
                    <ActionItem
                        label="Help"
                        disabled={true}
                        onClick={() => {}}
                        testId="help"
                    />,
                    <ActionItem
                        label="Feedback"
                        disabled={true}
                        href="/feedback"
                        testId="feedback"
                    />,
                ]}
            >
                {(state) => (
                    <IconButton icon={icons.search} aria-label="search" />
                )}
            </Dropdown>,
        );
    });

    afterEach(() => {
        unmountAll();
    });

    it("opens when the anchor is clicked", () => {
        // Arrange
        const anchor = dropdown.find(IconButton);

        // Act
        anchor.simulate("click");

        // Assert
        expect(dropdown.state("opened")).toBe(true);
    });

    it("should navigate to the first item when pressing down", () => {
        // Arrange
        const anchor = dropdown.find(IconButton);
        anchor.simulate("click");
        const dropdownCore = dropdown.find(DropdownCore);

        // Act & Assert
        dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
        dropdownCore.simulate("keyup", {keyCode: keyCodes.down});

        // Assert
        expect(dropdownCore.instance().focusedIndex).toBe(0);
    });
    it("should navigate from one item to the next when pressing down", () => {
        // Arrange
        const anchor = dropdown.find(IconButton);
        anchor.simulate("click");
        const dropdownCore = dropdown.find(DropdownCore);

        // Act
        dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
        dropdownCore.simulate("keyup", {keyCode: keyCodes.down});
        dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
        dropdownCore.simulate("keyup", {keyCode: keyCodes.down});
        dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
        dropdownCore.simulate("keyup", {keyCode: keyCodes.down});

        // Assert
        expect(dropdownCore.instance().focusedIndex).toBe(2);
    });

    it("closes itself on escape", () => {
        // Arrange
        const anchor = dropdown.find(IconButton);
        anchor.simulate("click");
        const dropdownCore = dropdown.find(DropdownCore);

        // Act
        dropdownCore.simulate("keydown", {keyCode: keyCodes.escape});
        dropdownCore.simulate("keyup", {keyCode: keyCodes.escape});

        // Assert
        expect(dropdown.state("opened")).toBe(false);
    });

    it("closes itself on tab", () => {
        // Arrange
        const anchor = dropdown.find(IconButton);
        anchor.simulate("click");
        const dropdownCore = dropdown.find(DropdownCore);

        // Act
        dropdownCore.simulate("keydown", {keyCode: keyCodes.tab});
        dropdownCore.simulate("keyup", {keyCode: keyCodes.tab});

        // Assert
        expect(dropdown.state("opened")).toBe(false);
    });

    it("closes itself on an external mouse click", () => {
        // Arrange
        const anchor = dropdown.find(IconButton);
        anchor.simulate("click");

        // Act
        document.dispatchEvent(new MouseEvent("mouseup"));

        // Assert
        expect(dropdown.state("opened")).toBe(false);
    });

    it("open on down key when focused", () => {
        // Arrange
        const anchor = dropdown.find(IconButton);
        const clickableBehavior = dropdown.find(ClickableBehavior).at(0);
        clickableBehavior.simulate("click");

        // Act
        anchor.simulate("keydown", {keyCode: keyCodes.down});
        anchor.simulate("keyup", {keyCode: keyCodes.down});

        // Assert
        expect(dropdown.state("opened")).toBe(true);
    });

    describe("use controlled components", () => {
        window.scrollTo = jest.fn();
        window.getComputedStyle = jest.fn();
        class ControlledComponent extends React.Component<Props, State> {
            state = {
                selectedValues: ["A"],
                opened: this.props.opened,
            };

            handleChange = (update) =>
                this.setState({
                    selectedValues: update,
                });

            handleToggleMenu = (opened) => {
                this.setState({
                    opened,
                });

                this.props.onToggle && this.props.onToggle(opened);
            };

            render() {
                const dropdownItems = [
                    <OptionItem label="A" value="A" />,
                    <OptionItem label="B" value="B" />,
                    <OptionItem label="C" value="C" />,
                    <OptionItem label="D" value="D" />,
                ];

                return (
                    <Dropdown
                        menuItems={dropdownItems}
                        opened={this.state.opened}
                        onToggle={this.handleToggleMenu}
                        onChange={this.handleChange}
                        selectionType={this.props.selectionType}
                        selectedValues={this.state.selectedValues}
                        testId="dropdown"
                    >
                        {(state) => (
                            <h1 onClick={this.handleToggleMenu}>
                                Manage students
                            </h1>
                        )}
                    </Dropdown>
                );
            }
        }

        afterEach(() => {
            unmountAll();
        });
        it("updates selectedValues when OptionItem clicked", () => {
            // Arrange
            const controlledComponent = mount(<ControlledComponent />);
            controlledComponent.simulate("click");
            const dropdownCore = controlledComponent.find(DropdownCore);

            // Act
            dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
            dropdownCore.simulate("keyup", {keyCode: keyCodes.down});
            expect(dropdownCore.instance().focusedIndex).toBe(0);

            const optionItem = controlledComponent.find(OptionItem).at(1);
            optionItem.simulate("click");

            // Assert
            expect(controlledComponent.state("selectedValues").length).toBe(2);
        });

        it("removes selected values from selectedValues", () => {
            // Arrange
            const controlledComponent = mount(<ControlledComponent />);
            controlledComponent.simulate("click");
            const dropdownCore = controlledComponent.find(DropdownCore);

            // Act
            dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
            dropdownCore.simulate("keyup", {keyCode: keyCodes.down});

            const optionItem = controlledComponent.find(OptionItem).at(0);
            optionItem.simulate("click");

            // Assert
            expect(controlledComponent.state("selectedValues").length).toBe(0);
        });

        it("does nothing when optionItem selected if selectedValues is null", () => {
            // Arrange
            const controlledComponent = mount(<ControlledComponent />);
            controlledComponent.simulate("click");
            controlledComponent.setState({selectedValues: null});
            const dropdownCore = controlledComponent.find(DropdownCore);

            // Act
            dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
            dropdownCore.simulate("keyup", {keyCode: keyCodes.down});

            const optionItem = controlledComponent.find(OptionItem).at(0);
            optionItem.simulate("click");

            // Assert
            expect(controlledComponent.state("selectedValues")).toBeFalsy();
        });

        it("only single selects OptionItems if singleSelectOption is passed", () => {
            // Arrange
            const controlledComponent = mount(
                <ControlledComponent selectionType={"single"} />,
            );
            controlledComponent.simulate("click");
            controlledComponent.setState({selectedValues: ["B"]});
            const dropdownCore = controlledComponent.find(DropdownCore);

            // Act
            dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
            dropdownCore.simulate("keyup", {keyCode: keyCodes.down});

            const optionItem = controlledComponent.find(OptionItem).at(0);
            optionItem.simulate("click");

            // Assert
            expect(controlledComponent.state("selectedValues")).toHaveLength(1);
        });

        it("closes Dropdown if an OptionItem is selected when singleSelectOption is passed", () => {
            // Arrange
            const controlledComponent = mount(
                <ControlledComponent selectionType={"single"} />,
            );
            controlledComponent.simulate("click");
            controlledComponent.setState({selectedValues: ["B"]});
            const dropdownCore = controlledComponent.find(DropdownCore);

            dropdownCore.simulate("keydown", {keyCode: keyCodes.down});
            dropdownCore.simulate("keyup", {keyCode: keyCodes.down});

            // Act
            const optionItem = controlledComponent.find(OptionItem).at(0);
            optionItem.simulate("click");

            // Assert
            expect(controlledComponent.find(Dropdown).state("opened")).toBe(
                false,
            );
        });

        it("opens the Controlled Dropdown when the anchor is clicked", () => {
            // Arrange
            const controlledComponent = mount(<ControlledComponent />);

            // Act
            // click on dropdown anchor
            controlledComponent
                .find(Dropdown)
                .find(`[data-test-id="dropdown"]`)
                .simulate("click");

            // Assert
            expect(controlledComponent.find(Dropdown).prop("opened")).toBe(
                true,
            );
        });

        it("updates the Controlled Dropdown state if the menu is closed", () => {
            // Arrange
            const controlledComponent = mount(
                <ControlledComponent opened={true} />,
            );

            // Act
            const optionItem = controlledComponent.find(OptionItem).at(0);
            optionItem.simulate("click");

            // Assert
            expect(controlledComponent.find(Dropdown).prop("opened")).toBe(
                false,
            );
        });

        it("calls onToggleMock after the menu is closed", () => {
            // Arrange
            const onToggleMock = jest.fn();

            const controlledComponent = mount(
                <ControlledComponent opened={true} onToggle={onToggleMock} />,
            );

            // Act
            const optionItem = controlledComponent.find(OptionItem).at(0);
            optionItem.simulate("click");

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });
    });
});
