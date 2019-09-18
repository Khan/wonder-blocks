//@flow
import React from "react";

import {ClickableBehavior} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import SelectOpener from "./select-opener.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import MultiSelect from "./multi-select.js";
import {keyCodes} from "../util/constants.js";
import SearchTextInput from "./search-text-input.js";

describe("MultiSelect", () => {
    let select;
    const allChanges = [];
    const saveUpdate = (update) => {
        allChanges.push(update);
    };
    const onChange = jest.fn();

    beforeEach(() => {
        window.scrollTo = jest.fn();
        select = mount(
            <MultiSelect
                onChange={(selectedValues) => {
                    saveUpdate(selectedValues);
                    onChange();
                }}
                placeholder="Choose"
                selectItemType="students"
                selectedValues={["2"]}
                shortcuts={true}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
                {false && <OptionItem label="item 4" value="4" />}
            </MultiSelect>,
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

    it("selects items as expected", () => {
        select.setState({open: true});
        const noop = jest.fn();
        const nativeEvent = {
            nativeEvent: {stopImmediatePropagation: noop},
        };

        expect(select.prop("selectedValues")).toEqual(["2"]);

        // Grab the second item in the list
        const item = select.find(OptionItem).at(0);
        expect(item.text()).toEqual("item 1");
        // Click the item 2, deselecting it
        item.simulate("mousedown");
        item.simulate("mouseup", nativeEvent);
        item.simulate("click");

        // Expect select's onChange callback to have been called
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(allChanges.length).toEqual(1);
        const currentlySelected = allChanges.pop();

        // Expected selected items are now 1 and 2
        expect(currentlySelected.length).toEqual(2);
        expect(currentlySelected.includes("1")).toEqual(true);
        expect(currentlySelected.includes("2")).toEqual(true);
        expect(currentlySelected.includes("3")).toEqual(false);

        // Now manually set the selectedValues like clients would
        select.setProps({selectedValues: ["1", "2"]});

        // This select should still be open afer a selection
        expect(select.state("open")).toEqual(true);

        // Select all of the items
        const selectAll = select.find(ActionItem).at(0);
        selectAll.simulate("mousedown");
        selectAll.simulate("mouseup", nativeEvent);
        selectAll.simulate("click");
        expect(allChanges.pop().length).toEqual(3);

        // Select none of the items
        const selectNone = select.find(ActionItem).at(1);
        selectNone.simulate("mousedown");
        selectNone.simulate("mouseup", nativeEvent);
        selectNone.simulate("click");
        expect(allChanges.pop().length).toEqual(0);

        // Menu should still be open
        expect(select.state("open")).toEqual(true);
    });

    it("displays correct text for opener", () => {
        const opener = select.find(SelectOpener);

        // No items are selected, display placeholder because there is one
        select.setProps({selectedValues: []});
        expect(opener.text()).toEqual("Choose");

        // One item is selected, display that item's label
        select.setProps({selectedValues: ["1"]});
        expect(opener.text()).toEqual("item 1");

        // More than one item is selected, display n itemTypes
        select.setProps({selectedValues: ["1", "2"]});
        expect(opener.text()).toEqual("2 students");

        // All items are selected
        select.setProps({selectedValues: ["1", "2", "3"]});
        expect(opener.text()).toEqual("All students");
    });

    it("displays All selected text when no items is selected for opener with implicitAllEnabled", () => {
        // Arrange, Act
        const opener = select.find(SelectOpener);
        select.setProps({implicitAllEnabled: true, selectedValues: []});

        // Assert
        expect(opener.text()).toEqual("All students");
    });

    it("verifies testId is added to the opener", () => {
        // Arrange
        const wrapper = mount(
            <MultiSelect
                selectItemType="students"
                selectedValues={["2"]}
                onChange={onChange}
                placeholder="Choose"
                testId="some-test-id"
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
            </MultiSelect>,
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
                        <MultiSelect
                            selectItemType="fruits"
                            onChange={onChange}
                            opened={this.state.opened}
                            onToggle={this.handleToggleMenu}
                        >
                            <OptionItem label="item 1" value="1" />
                            <OptionItem label="item 2" value="2" />
                            <OptionItem label="item 3" value="3" />
                        </MultiSelect>
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
            // click on the opener
            wrapper.find(SelectOpener).simulate("click");

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
            expect(wrapper.find(MultiSelect).prop("opened")).toBe(true);
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
            expect(wrapper.find(MultiSelect).prop("opened")).toBe(false);
        });
    });

    it("displays SearchTextInput when isFilterable is true", () => {
        // Arrange
        select.setProps({isFilterable: true});
        select.setState({open: true});

        // Act
        const searchInput = select.find(SearchTextInput);

        // Assert
        expect(searchInput.exists()).toBe(true);
    });

    it("displays SearchTextInput with dismiss button when search text exists", () => {
        // Arrange
        select.setProps({isFilterable: true});
        select.setState({open: true});

        // Act, Assert
        expect(select.find(IconButton).exists()).toBe(false);
        select.setState({searchText: "text"});
        expect(select.find(IconButton).exists()).toBe(true);
    });

    it("filters the items by the search input (case insensitive)", () => {
        // Arrange
        select.setProps({isFilterable: true});

        // Act
        select.setState({
            open: true,
            searchText: "Item 1",
        });

        // Assert
        expect(
            select
                .find(OptionItem)
                .at(0)
                .text(),
        ).toEqual("item 1");
        expect(
            select
                .find(OptionItem)
                .at(1)
                .exists(),
        ).toBe(false);
    });

    it("Hides shortcuts when there are any text in search text input", () => {
        // Arrange
        select.setProps({isFilterable: true});

        // Act
        select.setState({open: true});
        expect(
            select
                .find(ActionItem)
                .at(0)
                .exists(),
        ).toBe(true);

        // Assert
        select.setState({searchText: "2"});

        expect(
            select
                .find(ActionItem)
                .at(0)
                .exists(),
        ).toBe(false);
    });

    it("arrow up/down moves focus from the search text input like other items", () => {
        // Arrange
        select.setProps({isFilterable: true});
        select.setState({open: true});
        const searchInput = select.find(SearchTextInput);

        const selectAll = select
            .find(ActionItem)
            .at(0)
            .find(ClickableBehavior);
        const selectNone = select
            .find(ActionItem)
            .at(1)
            .find(ClickableBehavior);

        const item1 = select
            .find(OptionItem)
            .at(0)
            .find(ClickableBehavior);
        const item3 = select
            .find(OptionItem)
            .at(2)
            .find(ClickableBehavior);

        // Act and Assert
        // The focus is on opener. Press up (or down) should focus the input
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        expect(searchInput.state("focused")).toBe(true);

        // one more up should move focus to the last item
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        expect(item3.state("focused")).toBe(true);

        // two more up should move focus twice
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        expect(item1.state("focused")).toBe(true);

        // one more up should move focus to the select none
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        expect(selectNone.state("focused")).toBe(true);

        // one more up should move focus to the select all
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        expect(selectAll.state("focused")).toBe(true);

        // one more up should move focus to the input again.
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        expect(searchInput.state("focused")).toBe(true);

        // Press keyboard down arrow should move the focus down
        select.simulate("keydown", {keyCode: keyCodes.down});
        select.simulate("keyup", {keyCode: keyCodes.down});
        expect(selectAll.state("focused")).toBe(true);
    });

    it("Selected items are at the top of the items when isFilterable is true", () => {
        // Arrange
        const opener = select.find(SelectOpener);
        select.setProps({
            isFilterable: true,
            selectedValues: ["3"],
        });

        // Act
        opener.simulate("click");

        // Assert
        const item3 = select.find(OptionItem).at(0);
        expect(item3.text()).toEqual("item 3");
    });
});
