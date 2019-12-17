//@flow
import React from "react";
import {mount, unmountAll} from "../../../utils/testing/mount.js";

import DropdownOpener from "./dropdown-opener.js";
import SelectOpener from "./select-opener.js";
import OptionItem from "./option-item.js";
import SingleSelect from "./single-select.js";
import {keyCodes} from "../util/constants.js";

jest.mock("./dropdown-core-virtualized.js");

describe("SingleSelect", () => {
    let select;
    const onChange = jest.fn();

    beforeEach(() => {
        window.scrollTo = jest.fn();
        select = mount(
            <SingleSelect onChange={onChange} placeholder="Choose">
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
            </SingleSelect>,
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
        expect(onChange).toHaveBeenCalledTimes(1);

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

    it("verifies testId is added to the opener", () => {
        // Arrange
        const wrapper = mount(
            <SingleSelect
                onChange={onChange}
                placeholder="Choose"
                testId="some-test-id"
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
            </SingleSelect>,
        );

        // Act
        const opener = wrapper.find(SelectOpener).find("button");

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
                        <SingleSelect
                            opened={this.state.opened}
                            onToggle={this.handleToggleMenu}
                            onChange={onChange}
                            placeholder="Choose"
                        >
                            <OptionItem label="item 1" value="1" />
                            <OptionItem label="item 2" value="2" />
                            <OptionItem label="item 3" value="3" />
                        </SingleSelect>
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
            // Arrange
            const onToggleMock = jest.fn();
            const wrapper = mount(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            // open the menu from the outside
            wrapper.find(`[data-test-id="parent-button"]`).simulate("click");
            // click on first item
            wrapper
                .find(OptionItem)
                .at(0)
                .simulate("click");

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });

        it("should still allow the opener to open the menu", () => {
            // Arrange
            const onToggleMock = jest.fn();
            const wrapper = mount(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            wrapper.find(SelectOpener).simulate("click");

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("opens the menu when the anchor is clicked once", () => {
            // Arrange
            const wrapper = mount(<ControlledComponent />);

            // Act
            // click on the anchor
            wrapper.find(SelectOpener).simulate("click");

            // Assert
            expect(wrapper.find(SingleSelect).prop("opened")).toBe(true);
        });

        it("closes the menu when the anchor is clicked", () => {
            // Arrange
            const wrapper = mount(<ControlledComponent />);

            // Act
            // open the menu from the outside
            wrapper.find(`[data-test-id="parent-button"]`).simulate("click");
            // click on the dropdown anchor to hide the menu
            wrapper.find(SelectOpener).simulate("click");

            // Assert
            expect(wrapper.find(SingleSelect).prop("opened")).toBe(false);
        });
    });

    describe("Custom Opener", () => {
        it("opens the menu when clicking on the custom opener", () => {
            // Arrange
            const wrapper = mount(
                <SingleSelect
                    onChange={jest.fn()}
                    placeholder="custom opener"
                    testId="openTest"
                    opener={(eventState) => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const opener = wrapper.find(DropdownOpener);
            opener.simulate("click");

            // Assert
            expect(wrapper.state("open")).toBe(true);
        });

        it("calls the custom onClick handler", () => {
            // Arrange
            const onClickMock = jest.fn();

            const wrapper = mount(
                <SingleSelect
                    onChange={jest.fn()}
                    placeholder="custom opener"
                    testId="openTest"
                    opener={(eventState) => (
                        <button aria-label="Search" onClick={onClickMock} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            const opener = wrapper.find(DropdownOpener);
            opener.simulate("click");

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });
    });
});
