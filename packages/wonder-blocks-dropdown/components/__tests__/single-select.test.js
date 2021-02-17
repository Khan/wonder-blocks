//@flow
import * as React from "react";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import DropdownOpener from "../dropdown-opener.js";
import SelectOpener from "../select-opener.js";
import OptionItem from "../option-item.js";
import SingleSelect from "../single-select.js";
import {keyCodes} from "../../util/constants.js";
import SearchTextInput from "../search-text-input.js";

jest.mock("../dropdown-core-virtualized.js");

describe("SingleSelect", () => {
    let select;
    const onChange = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();

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
            wrapper.find(OptionItem).at(0).simulate("click");

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
                    opener={() => (
                        <button
                            data-test-id="custom-opener"
                            aria-label="Custom opener"
                            onClick={onClickMock}
                        />
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

        it("verifies testId is passed from the custom opener", () => {
            // Arrange
            const menu = mount(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose"
                    opener={() => (
                        <button
                            data-test-id="custom-opener"
                            aria-label="Custom opener"
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener).find("button");

            // Assert
            expect(opener.prop("data-test-id")).toBe("custom-opener");
        });

        it("verifies testId is not passed from the parent element", () => {
            // Arrange
            const menu = mount(
                <SingleSelect
                    onChange={onChange}
                    placeholder="Choose"
                    testId="custom-opener"
                    opener={() => <button aria-label="Custom opener" />}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </SingleSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener).find("button");

            // Assert
            expect(opener.prop("data-test-id")).not.toBeDefined();
        });

        it("passes the placeholder text to the custom opener", () => {
            // Arrange
            const menu = mount(
                <SingleSelect
                    placeholder="Custom placeholder"
                    testId="openTest"
                    onChange={jest.fn()}
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
                </SingleSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            // open dropdown
            opener.simulate("click");
            const openerElement = menu.find(`[data-test-id="custom-opener"]`);

            // Assert
            expect(openerElement).toHaveText("Custom placeholder");
        });

        it("passes the selected label to the custom opener", () => {
            // Arrange
            const menu = mount(
                <SingleSelect
                    placeholder="Custom placeholder"
                    testId="openTest"
                    onChange={jest.fn()}
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
                </SingleSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            // open dropdown
            opener.simulate("click");
            // select the second item manually via selectedValue on SingleSelect
            menu.setProps({selectedValue: "toggle_b"});
            const openerElement = menu.find(`[data-test-id="custom-opener"]`);

            // Assert
            expect(openerElement).toHaveText("Toggle B");
        });
    });

    describe("isFilterable", () => {
        it("displays SearchTextInput when isFilterable is true", () => {
            // Arrange
            const wrapper = mount(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );
            wrapper.setState({open: true});

            // Act
            const searchInput = wrapper.find(SearchTextInput);

            // Assert
            expect(searchInput.exists()).toBe(true);
        });

        it("filters the items by the search input (case insensitive)", () => {
            // Arrange
            const wrapper = mount(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            // Act
            wrapper.setState({
                open: true,
                searchText: "Item 2",
            });

            // Assert
            expect(wrapper.find(OptionItem).at(0).text()).toEqual("item 2");
            expect(wrapper.find(OptionItem).at(1).exists()).toBe(false);
        });

        it("Type something in SearchTextInput should update searchText in SingleSelect", () => {
            // Arrange
            const wrapper = mount(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            wrapper.setState({open: true});
            const searchInput = wrapper.find(SearchTextInput).find("input");

            // Act
            searchInput.simulate("change", {target: {value: "Item 1"}});

            // Assert
            expect(wrapper).toHaveState({searchText: "Item 1"});
        });

        it("Click dismiss button should clear the searchText in SingleSelect", () => {
            // Arrange
            const wrapper = mount(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            wrapper.setState({open: true, searchText: "Should be cleared"});
            const dismissBtn = wrapper.find(IconButton);

            // Act
            dismissBtn.simulate("click");

            // Assert
            expect(wrapper).toHaveState({searchText: ""});
        });

        it("Open SingleSelect should clear the searchText", () => {
            // Arrange
            const wrapper = mount(
                <SingleSelect
                    onChange={onChange}
                    isFilterable={true}
                    placeholder="Choose"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </SingleSelect>,
            );

            wrapper.setState({searchText: "some text"});
            const opener = wrapper.find(SelectOpener);

            // Act
            opener.simulate("click");

            // Assert
            expect(wrapper).toHaveState({searchText: ""});
        });
    });
});
