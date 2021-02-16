/* eslint-disable max-lines */
//@flow
import * as React from "react";

import {ClickableBehavior} from "@khanacademy/wonder-blocks-clickable";
import IconButton from "@khanacademy/wonder-blocks-icon-button";

import {mount, unmountAll} from "../../../../utils/testing/mount.js";
import DropdownOpener from "../dropdown-opener.js";
import SelectOpener from "../select-opener.js";
import ActionItem from "../action-item.js";
import OptionItem from "../option-item.js";
import MultiSelect from "../multi-select.js";
import {keyCodes} from "../../util/constants.js";
import SearchTextInput from "../search-text-input.js";

import type {Labels} from "../multi-select.js";

jest.useFakeTimers();

jest.mock("../dropdown-core-virtualized.js");

describe("MultiSelect", () => {
    let select;
    const allChanges = [];
    const saveUpdate = (update) => {
        allChanges.push(update);
    };
    const onChange = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();

        // Jest doesn't fake out the animation frame API, so we're going to do
        // it here and map it to timeouts, that way we can use the fake timer
        // API to test our animation frame things.
        jest.spyOn(global, "requestAnimationFrame").mockImplementation((fn) =>
            setTimeout(fn, 0),
        );
        jest.spyOn(global, "cancelAnimationFrame").mockImplementation((id) =>
            clearTimeout(id),
        );

        const labels: $Shape<Labels> = {
            selectAllLabel: (numOptions) => `Sellect all (${numOptions})`,
            noneSelected: "Choose",
            someSelected: (numSelectedValues) =>
                `${numSelectedValues} students`,
            allSelected: "All students",
        };

        select = mount(
            <MultiSelect
                onChange={(selectedValues) => {
                    saveUpdate(selectedValues);
                    onChange();
                }}
                selectedValues={["2"]}
                shortcuts={true}
                labels={labels}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
                {false && <OptionItem label="item 4" value="4" />}
            </MultiSelect>,
        );
    });

    afterEach(() => {
        unmountAll();
        jest.restoreAllMocks();
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
                selectedValues={["2"]}
                onChange={onChange}
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

        const labels: $Shape<Labels> = {
            selectAllLabel: (numOptions) => `Select all (${numOptions})`,
            allSelected: "All fruits",
            someSelected: (numSelectedValues) => `${numSelectedValues} fruits`,
        };

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
                        <MultiSelect
                            labels={labels}
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
        expect(select.find(IconButton).exists()).toBe(false);

        // Act
        select.setState({searchText: "text"});

        // Assert
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
        expect(select.find(OptionItem).at(0).text()).toEqual("item 1");
        expect(select.find(OptionItem).at(1).exists()).toBe(false);
    });

    it("Hides shortcuts when there are any text in search text input", () => {
        // Arrange
        select.setProps({isFilterable: true});

        // Act
        select.setState({open: true});
        expect(select.find(ActionItem).at(0).exists()).toBe(true);

        // Assert
        select.setState({searchText: "2"});

        expect(select.find(ActionItem).at(0).exists()).toBe(false);
    });

    it("Pressing arrow up from search input moves focus to previous focusable item", () => {
        // Arrange
        select.setProps({isFilterable: true, shortcuts: false});
        select.setState({open: true});
        const searchInput = select.find(SearchTextInput);
        const lastOption = select
            .find(OptionItem)
            .at(2)
            .find(ClickableBehavior);
        // The focus is on opener. Press up (or down) should focus the input
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        jest.runAllTimers();
        expect(searchInput.state("focused")).toBe(true);

        // Act
        select.simulate("keydown", {keyCode: keyCodes.up});
        select.simulate("keyup", {keyCode: keyCodes.up});
        jest.runAllTimers();

        // Assert
        expect(lastOption.state("focused")).toBe(true);
    });

    it("Pressing arrow down from search input moves focus to previous focusable item", () => {
        // Arrange
        select.setProps({isFilterable: true});
        select.setState({open: true});
        const searchInput = select.find(SearchTextInput);
        const selectAll = select.find(ActionItem).at(0).find(ClickableBehavior);
        // The focus is on opener. Press up (or down) should focus the input
        select.simulate("keydown", {keyCode: keyCodes.down});
        select.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();
        expect(searchInput.state("focused")).toBe(true);

        // Act
        select.simulate("keydown", {keyCode: keyCodes.down});
        select.simulate("keyup", {keyCode: keyCodes.down});
        jest.runAllTimers();

        // Assert
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

    it("Type something in SearchTextInput should update searchText in MultiSelect", () => {
        // Arrange
        select.setProps({isFilterable: true});
        select.setState({open: true});
        const searchInput = select.find(SearchTextInput).find("input");

        // Act
        searchInput.simulate("change", {target: {value: "Item 1"}});

        // Assert
        expect(select.state("searchText")).toEqual("Item 1");
    });

    it("Click dismiss button should clear the searchText in MultiSelect", () => {
        // Arrange
        select.setProps({isFilterable: true});
        select.setState({open: true, searchText: "Should be cleared"});
        const dismissBtn = select.find(IconButton);

        // Act
        dismissBtn.simulate("click");

        // Assert
        expect(select.state("searchText")).toEqual("");
    });

    it("Open MultiSelect should clear the searchText", () => {
        // Arrange
        select.setProps({isFilterable: true});
        select.setState({searchText: "some text"});
        const opener = select.find(SelectOpener);

        // Act
        opener.simulate("click");

        // Assert
        expect(select.state("searchText")).toEqual("");
    });

    describe("Custom Opener", () => {
        it("opens the menu when clicking on the custom opener", () => {
            // Arrange
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    opener={(eventState) => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
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
                <MultiSelect
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={onClickMock} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
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
                <MultiSelect
                    onChange={onChange}
                    opener={() => (
                        <button
                            data-test-id="custom-opener"
                            aria-label="Custom opener"
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener).find("button");

            // Assert
            expect(opener.prop("data-test-id")).toBe("custom-opener");
        });

        it("verifies testId is not passed from the parent element", () => {
            // Arrange
            const menu = mount(
                <MultiSelect
                    onChange={onChange}
                    testId="custom-opener"
                    opener={() => <button aria-label="Custom opener" />}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener).find("button");

            // Assert
            expect(opener.prop("data-test-id")).not.toBeDefined();
        });

        it("passes the current label to the custom opener (no items selected)", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                noneSelected: "No items selected",
            };
            const menu = mount(
                <MultiSelect
                    labels={labels}
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
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            // open dropdown
            opener.simulate("click");
            const openerElement = menu.find(`[data-test-id="custom-opener"]`);

            // Assert
            expect(openerElement).toHaveText("No items selected");
        });

        it("passes the current label to the custom opener (1 item selected)", () => {
            // Arrange
            const menu = mount(
                <MultiSelect
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
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            // open dropdown
            opener.simulate("click");
            // select the first item manually via selectedValues on MultiSelect
            menu.setProps({selectedValues: ["1"]});
            const openerElement = menu.find(`[data-test-id="custom-opener"]`);

            // Assert
            expect(openerElement).toHaveText("item 1");
        });

        it("passes the current label to the custom opener (2 items selected)", () => {
            // Arrange
            const menu = mount(
                <MultiSelect
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
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            // open dropdown
            opener.simulate("click");
            // select the first and second items manually via selectedValues on
            // MultiSelect
            menu.setProps({selectedValues: ["1", "2"]});
            const openerElement = menu.find(`[data-test-id="custom-opener"]`);

            // Assert
            expect(openerElement).toHaveText("2 items");
        });

        it("passes the current label to the custom opener (all items selected)", () => {
            // Arrange
            const menu = mount(
                <MultiSelect
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
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = menu.find(DropdownOpener);
            // open dropdown
            opener.simulate("click");
            // select all items manually via selectedValues on MultiSelect
            menu.setProps({selectedValues: ["1", "2", "3"]});
            const openerElement = menu.find(`[data-test-id="custom-opener"]`);

            // Assert
            expect(openerElement).toHaveText("All items");
        });
    });

    describe("Custom labels", () => {
        it("passes the custom label to the opener", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                noneSelected: "0 escuelas",
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper
                .find(`[data-test-id="translated-multi-select"]`)
                .last();

            // Assert
            expect(opener).toHaveText("0 escuelas");
        });

        it("passes the custom label to the opener (2 items selected)", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                someSelected: (numSelectedValues) =>
                    `${numSelectedValues} escuelas`,
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // select the first and second items manually via selectedValues on
            // MultiSelect
            wrapper.setProps({selectedValues: ["1", "2"]});
            const openerElement = wrapper
                .find(`[data-test-id="translated-multi-select"]`)
                .last();

            // Assert
            expect(openerElement).toHaveText("2 escuelas");
        });

        it("passes the custom label to the opener (all items selected)", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                allSelected: "Todas las escuelas",
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // select all items manually via selectedValues on MultiSelect
            wrapper.setProps({selectedValues: ["1", "2", "3"]});
            const openerElement = wrapper
                .find(`[data-test-id="translated-multi-select"]`)
                .last();

            // Assert
            expect(openerElement).toHaveText("Todas las escuelas");
        });

        it("passes the custom label to the dismiss icon", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                clearSearch: "Limpiar busqueda",
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // search text
            wrapper.setState({searchText: "text"});
            // get icon instance
            const searchIcon = wrapper.find(SearchTextInput).find(IconButton);

            // Assert
            expect(searchIcon).toHaveProp("aria-label", "Limpiar busqueda");
        });

        it("passes the custom label to the search input field", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                filter: "Filtrar",
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // search text
            wrapper.setState({searchText: "text"});
            // get text field instance
            const searchInput = wrapper.find(SearchTextInput).find("input");

            // Assert
            expect(searchInput).toHaveProp("placeholder", "Filtrar");
        });

        it("passes the custom label to the no results label", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                noResults: "No hay resultados",
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // search text
            wrapper.setState({searchText: "text"});
            // get dropdown instance
            const noResultsLabel = wrapper.find(
                `[data-test-id="dropdown-core-no-results"]`,
            );

            // Assert
            expect(noResultsLabel).toHaveText("No hay resultados");
        });

        it("passes the custom label to the select all shortcut", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                selectAllLabel: (numOptions) =>
                    `Seleccionar todas las escuelas (${numOptions})`,
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    shortcuts={true}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // `select all` shortcut
            const selectAllItem = wrapper.find(ActionItem).at(0);

            // Assert
            expect(selectAllItem).toHaveText(
                "Seleccionar todas las escuelas (3)",
            );
        });

        it("passes the custom label to the select none shortcut", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                selectNoneLabel: "Deseleccionar todas las escuelas",
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    shortcuts={true}
                    testId="translated-multi-select"
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // `select none` shortcut
            const selectNoneItem = wrapper.find(ActionItem).at(1);

            // Assert
            expect(selectNoneItem).toHaveText(
                "Deseleccionar todas las escuelas",
            );
        });

        it("verifies a custom label is updated when props change", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                selectNoneLabel: "Deseleccionar todas las escuelas",
            };
            const wrapper = mount(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    shortcuts={true}
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = wrapper.find(SelectOpener);
            // open dropdown
            opener.simulate("click");
            // update label value
            wrapper.setProps({
                labels: {
                    selectNoneLabel: "Ninguna seleccionada",
                },
            });
            // `select none` shortcut
            const selectNoneItem = wrapper.find(ActionItem).at(1);

            // Assert
            expect(selectNoneItem).toHaveText("Ninguna seleccionada");
        });
    });
});
