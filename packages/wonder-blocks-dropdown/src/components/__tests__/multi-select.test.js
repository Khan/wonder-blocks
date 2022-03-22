/* eslint-disable max-lines */
//@flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import userEvent from "../../../../../utils/testing/user-event.js";

import OptionItem from "../option-item.js";
import MultiSelect from "../multi-select.js";

import type {Labels} from "../multi-select.js";

jest.mock("../dropdown-core-virtualized.js");

const labels: $Shape<Labels> = {
    selectAllLabel: (numOptions) => `Sellect all (${numOptions})`,
    noneSelected: "Choose",
    someSelected: (numSelectedValues) => `${numSelectedValues} students`,
    allSelected: "All students",
};

describe("MultiSelect", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    describe("uncontrolled", () => {
        const onChange = jest.fn();
        const uncontrolledSingleSelect = (
            <MultiSelect
                onChange={onChange}
                selectedValues={[]}
                labels={labels}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
                {false && <OptionItem label="item 4" value="4" />}
            </MultiSelect>
        );

        it("opens the select on mouse click", () => {
            // Arrange
            render(uncontrolledSingleSelect);

            // Act
            userEvent.click(screen.getByRole("button"));

            // Assert
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        it("closes the select on {escape}", () => {
            // Arrange
            render(uncontrolledSingleSelect);

            userEvent.tab();
            userEvent.keyboard("{enter}"); // open

            // Act
            userEvent.keyboard("{escape}");

            // Assert
            expect(onChange).not.toHaveBeenCalled();
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("displays correct text for opener", () => {
            // Arrange
            render(uncontrolledSingleSelect);

            // Act
            const opener = screen.getByRole("button");

            // Assert
            // No items are selected, display placeholder because there is one
            expect(opener).toHaveTextContent("Choose");
        });

        it("displays correct text for opener when there's one item selected", () => {
            // Arrange

            // Act
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1"]}
                    labels={labels}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(screen.getByRole("button")).toHaveTextContent("item 1");
        });

        it("displays correct text for opener when there's more than one item selected", () => {
            // Arrange

            // Act
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1", "2"]}
                    labels={labels}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            // More than one item is selected, display n itemTypes
            expect(screen.getByRole("button")).toHaveTextContent("2 students");
        });

        it("displays correct text for opener when all items are selected", () => {
            // Arrange

            // Act
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1", "2", "3"]}
                    labels={labels}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            // All items are selected
            expect(screen.getByRole("button")).toHaveTextContent(
                "All students",
            );
        });

        it("displays All selected text when no items is selected for opener with implicitAllEnabled", () => {
            // Arrange

            // Act
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={[]}
                    labels={labels}
                    implicitAllEnabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(screen.getByRole("button")).toHaveTextContent(
                "All students",
            );
        });

        it("verifies testId is added to the opener", () => {
            // Arrange
            render(
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
            const opener = screen.getByRole("button");

            // Assert
            expect(opener).toHaveAttribute("data-test-id", "some-test-id");
        });
    });

    describe("Controlled component", () => {
        type Props = {|
            opened?: boolean,
            onToggle?: (opened: boolean) => mixed,
            shortcuts?: boolean,
        |};

        const labels: $Shape<Labels> = {
            selectAllLabel: (numOptions) => `Select all (${numOptions})`,
            allSelected: "All fruits",
            someSelected: (numSelectedValues) => `${numSelectedValues} fruits`,
        };

        function ControlledComponent(props: Props) {
            const [opened, setOpened] = React.useState(props.opened ?? false);
            const [selectedValues, setSelectedValues] = React.useState([]);

            const handleToggleMenu = (opened) => {
                setOpened(opened);
                props.onToggle && props.onToggle(opened);
            };

            const handleChange = (newValues) => {
                setSelectedValues(newValues);
            };

            return (
                <React.Fragment>
                    <MultiSelect
                        labels={labels}
                        onChange={handleChange}
                        opened={opened}
                        onToggle={handleToggleMenu}
                        testId="multi-select-opener"
                        selectedValues={selectedValues}
                        shortcuts={props.shortcuts}
                    >
                        <OptionItem label="item 1" value="1" />
                        <OptionItem label="item 2" value="2" />
                        <OptionItem label="item 3" value="3" />
                    </MultiSelect>
                    <button
                        data-test-id="parent-button"
                        onClick={() => handleToggleMenu(true)}
                    />
                </React.Fragment>
            );
        }

        it("opens the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            userEvent.click(screen.getByTestId("parent-button"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            // open the menu from the outside
            userEvent.click(screen.getByTestId("parent-button"));
            // click on the opener
            userEvent.click(screen.getByTestId("multi-select-opener"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledTimes(2);
            expect(onToggleMock).toHaveBeenNthCalledWith(1, true);
            expect(onToggleMock).toHaveBeenNthCalledWith(2, false);
        });

        it("should still allow the opener to open the menu", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            // click on the opener
            userEvent.click(screen.getByTestId("multi-select-opener"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("opens the menu when the anchor is clicked once", () => {
            // Arrange
            render(<ControlledComponent />);

            // Act
            userEvent.click(screen.getByTestId("multi-select-opener"));

            // Assert
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        it("closes the menu when the anchor is clicked", () => {
            // Arrange
            render(<ControlledComponent />);

            // Act
            // open the menu from the outside
            userEvent.click(screen.getByTestId("parent-button"));
            // click on the dropdown anchor to hide the menu
            userEvent.click(screen.getByTestId("multi-select-opener"));

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("selects on item as expected", async () => {
            // Arrange
            render(<ControlledComponent />);

            const opener = screen.getByTestId("multi-select-opener");
            userEvent.click(opener);

            // Act
            // Grab the second item in the list
            const item = await screen.findByRole("option", {
                name: "item 2",
            });
            userEvent.click(item, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Assert
            expect(item).toHaveAttribute("aria-selected", "true");
            expect(opener).toHaveTextContent("item 2");
        });

        it("dropdown menu is still open after selection", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            const opener = screen.getByTestId("multi-select-opener");
            userEvent.click(opener);

            // Act
            // Grab the second item in the list
            const item = await screen.findByRole("option", {
                name: "item 2",
            });
            userEvent.click(item, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Assert
            expect(onToggleMock).toHaveBeenCalledTimes(1);
            // expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        it("selects two items as expected", () => {
            // Arrange
            render(<ControlledComponent />);

            const opener = screen.getByTestId("multi-select-opener");
            userEvent.click(opener);

            // Act
            // Select the second and third items in the list
            const secondOption = screen.getByText("item 2");
            userEvent.click(secondOption, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });
            const thirdOption = screen.getByText("item 3");
            userEvent.click(thirdOption, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Assert
            expect(opener).toHaveTextContent("2 fruits");

            // // Select none of the items
            // const selectNone = select.find(ActionItem).at(1);
            // selectNone.simulate("mousedown");
            // selectNone.simulate("mouseup", nativeEvent);
            // selectNone.simulate("click");
            // expect(allChanges.pop().length).toEqual(0)
        });

        it("selects two items, then unselect one as expected", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            const opener = screen.getByTestId("multi-select-opener");
            userEvent.click(opener);

            // Select the second and third items in the list
            const secondOption = screen.getByText("item 2");
            userEvent.click(secondOption, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });
            const thirdOption = screen.getByText("item 3");
            userEvent.click(thirdOption, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Act
            // Unselect the first item selected
            userEvent.click(secondOption, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Assert
            expect(opener).toHaveTextContent("item 3");
        });

        it("selects all the items when the 'All items' shortcut is selected", () => {
            // Arrange
            render(<ControlledComponent shortcuts={true} />);

            const opener = screen.getByTestId("multi-select-opener");
            userEvent.click(opener);

            // Act
            // Select all of the items
            const selectAll = screen.getByText(/Select all/i);
            userEvent.click(selectAll, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Assert
            expect(opener).toHaveTextContent("All fruits");
        });

        it("deselects all the items when the 'Select none' shortcut is selected", () => {
            // Arrange
            render(<ControlledComponent shortcuts={true} />);

            const opener = screen.getByTestId("multi-select-opener");
            userEvent.click(opener);

            // First, select all of the items
            const selectAll = screen.getByText(/Select all/i);
            userEvent.click(selectAll, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Act
            const selectNone = screen.getByText(/Select none/i);
            userEvent.click(selectNone, undefined, {
                skipPointerEventsCheck: true, // Popper compatibility
            });

            // Assert
            expect(opener).toHaveTextContent("0 items");
        });
    });

    describe("isFilterable", () => {
        const onChange = jest.fn();

        const filterableSingleSelect = (
            <MultiSelect
                onChange={onChange}
                selectedValues={[]}
                labels={labels}
                isFilterable={true}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
                {false && <OptionItem label="item 4" value="4" />}
            </MultiSelect>
        );

        it("displays SearchTextInput when isFilterable is true", () => {
            // Arrange
            render(filterableSingleSelect);
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            // Act
            const searchInput = screen.getByPlaceholderText("Filter");

            // Assert
            expect(searchInput).toBeInTheDocument();
        });

        it("displays SearchTextInput with dismiss button when search text exists", () => {
            // Arrange
            render(filterableSingleSelect);
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            const searchInput = screen.getByPlaceholderText("Filter");

            // Act
            userEvent.type(searchInput, "text");

            // Assert
            expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
        });

        it("filters the items by the search input (case insensitive)", () => {
            // Arrange
            render(filterableSingleSelect);
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            const searchInput = screen.getByPlaceholderText("Filter");

            // Act
            userEvent.type(searchInput, "Item 1");

            // Assert
            expect(screen.getAllByRole("option")).toHaveLength(1);
        });

        it("Hides shortcuts when there are any text in search text input", () => {
            // Arrange
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={[]}
                    labels={labels}
                    isFilterable={true}
                    shortcuts={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            const searchInput = screen.getByPlaceholderText("Filter");

            // Act
            userEvent.type(searchInput, "2");

            // Assert
            expect(screen.queryByText(/Select all/i)).not.toBeInTheDocument();
        });

        it("should focus on the search input after opening the dropdown", () => {
            // Arrange
            render(filterableSingleSelect);
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            // Act
            const searchInput = screen.getByPlaceholderText("Filter");

            // Assert
            expect(searchInput).toHaveFocus();
        });

        it("Selected items are at the top of the items when isFilterable is true", () => {
            // Arrange
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["3"]}
                    labels={labels}
                    isFilterable={true}
                    shortcuts={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            // Assert
            expect(screen.getByRole("listbox")).toHaveTextContent(
                /item 3.*item 1.*item 2/i,
            );
        });

        it("Type something in SearchTextInput should update searchText in MultiSelect", () => {
            // Arrange
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={[]}
                    labels={labels}
                    isFilterable={true}
                    shortcuts={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            userEvent.click(screen.getByRole("button"));

            const searchInput = screen.getByPlaceholderText("Filter");
            userEvent.paste(searchInput, "Item 2");

            // Act
            userEvent.clear(searchInput);
            userEvent.paste(searchInput, "Item 1");

            // Assert
            const options = screen.getAllByRole("option");
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent("item 1");
        });

        it("should move focus to the dismiss button after pressing {tab} on the text input", () => {
            // Arrange
            render(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1"]}
                    labels={labels}
                    isFilterable={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            const searchInput = screen.getByPlaceholderText("Filter");
            userEvent.paste(searchInput, "some text");

            // Act
            userEvent.tab();

            // Assert
            const dismissBtn = screen.getByLabelText("Clear search");
            expect(dismissBtn).toHaveFocus();
        });

        it("Click dismiss button should clear the searchText in MultiSelect", () => {
            // Arrange
            render(filterableSingleSelect);
            // open the dropdown menu
            userEvent.click(screen.getByRole("button"));

            const searchInput = screen.getByPlaceholderText("Filter");
            userEvent.paste(searchInput, "Should be cleared");

            const dismissBtn = screen.getByLabelText("Clear search");

            // Act
            userEvent.click(dismissBtn);

            // Assert
            expect(searchInput).toHaveValue("");
        });

        it("Open MultiSelect should clear the searchText", () => {
            // Arrange
            render(filterableSingleSelect);
            // open the dropdown menu
            const opener = screen.getByRole("button");
            userEvent.click(opener);

            const searchInput = screen.getByPlaceholderText("Filter");
            userEvent.paste(searchInput, "Should be cleared");

            // Close the dropdown menu
            userEvent.click(opener);

            // Act
            // Reopen it
            userEvent.click(opener);

            // Assert
            expect(screen.getByPlaceholderText("Filter")).toHaveValue("");
        });
    });

    describe("Custom Opener", () => {
        it("opens the menu when clicking on the custom opener", () => {
            // Arrange
            render(
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
            const opener = screen.getByLabelText("Search");
            userEvent.click(opener);

            // Assert
            expect(screen.getByRole("listbox")).toBeInTheDocument();
        });

        it("calls the custom onClick handler", () => {
            // Arrange
            const onClickMock = jest.fn();

            render(
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
            const opener = screen.getByLabelText("Search");
            userEvent.click(opener);

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("verifies testId is passed from the custom opener", () => {
            // Arrange
            const onChange = jest.fn();

            render(
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
            const opener = screen.getByLabelText("Custom opener");

            // Assert
            expect(opener).toHaveAttribute("data-test-id", "custom-opener");
        });

        it("verifies testId is not passed from the parent element", () => {
            // Arrange
            const onChange = jest.fn();

            render(
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
            const opener = screen.getByLabelText("Custom opener");

            // Assert
            expect(opener).not.toHaveAttribute("data-test-id", "custom-opener");
        });

        it("passes the current label to the custom opener (no items selected)", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                noneSelected: "No items selected",
            };

            render(
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
            const opener = screen.getByTestId("custom-opener");

            // Assert
            expect(opener).toHaveTextContent("No items selected");
        });

        it("passes the current label to the custom opener (1 item selected)", async () => {
            // Arrange
            const ControlledMultiSelect = () => {
                const [selected, setSelected] = React.useState([]);
                return (
                    <MultiSelect
                        testId="openTest"
                        onChange={(values) => {
                            setSelected(values);
                        }}
                        selectedValues={selected}
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
                    </MultiSelect>
                );
            };

            render(<ControlledMultiSelect />);

            const opener = screen.getByTestId("custom-opener");
            // open dropdown
            userEvent.click(opener);

            // Act
            const option = screen.getByText("item 1");
            userEvent.click(option);

            // Assert
            expect(opener).toHaveTextContent("item 1");
        });

        it("passes the current label to the custom opener (2 items selected)", () => {
            // Arrange
            const ControlledMultiSelect = () => {
                const [selected, setSelected] = React.useState([]);
                return (
                    <MultiSelect
                        testId="openTest"
                        onChange={(values) => {
                            setSelected(values);
                        }}
                        selectedValues={selected}
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
                    </MultiSelect>
                );
            };

            render(<ControlledMultiSelect />);

            const opener = screen.getByTestId("custom-opener");
            // open dropdown
            userEvent.click(opener);

            // Act
            userEvent.click(screen.getByText("item 1"));
            userEvent.click(screen.getByText("item 2"));

            // Assert
            expect(opener).toHaveTextContent("2 items");
        });

        it("passes the current label to the custom opener (all items selected)", () => {
            // Arrange
            const ControlledMultiSelect = () => {
                const [selected, setSelected] = React.useState([]);
                return (
                    <MultiSelect
                        testId="openTest"
                        onChange={(values) => {
                            setSelected(values);
                        }}
                        selectedValues={selected}
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
                    </MultiSelect>
                );
            };

            render(<ControlledMultiSelect />);

            const opener = screen.getByTestId("custom-opener");
            // open dropdown
            userEvent.click(opener);

            // Act
            userEvent.click(screen.getByText("item 1"));
            userEvent.click(screen.getByText("item 2"));
            userEvent.click(screen.getByText("item 3"));

            // Assert
            expect(opener).toHaveTextContent("All items");
        });
    });

    describe("Custom labels", () => {
        it("passes the custom label to the opener", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                noneSelected: "0 escuelas",
            };
            render(
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
            const opener = screen.getByTestId("translated-multi-select");

            // Assert
            expect(opener).toHaveTextContent("0 escuelas");
        });

        it("passes the custom label to the opener (2 items selected)", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                someSelected: (numSelectedValues) =>
                    `${numSelectedValues} escuelas`,
            };
            render(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="translated-multi-select"
                    labels={labels}
                    selectedValues={["1", "2"]}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = screen.getByTestId("translated-multi-select");

            // Assert
            expect(opener).toHaveTextContent("2 escuelas");
        });

        it("passes the custom label to the opener (all items selected)", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                allSelected: "Todas las escuelas",
            };
            render(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="translated-multi-select"
                    labels={labels}
                    selectedValues={["1", "2", "3"]}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = screen.getByTestId("translated-multi-select");

            // Assert
            expect(opener).toHaveTextContent("Todas las escuelas");
        });

        it("passes the custom label to the dismiss icon", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                clearSearch: "Limpiar busqueda",
            };
            render(
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
            const opener = screen.getByTestId("translated-multi-select");
            // open dropdown
            userEvent.click(opener);
            // search text
            userEvent.type(screen.getByPlaceholderText("Filter"), "school");
            // get icon instance
            const dismissIcon = screen.getByLabelText("Limpiar busqueda");

            // Assert
            expect(dismissIcon).toBeInTheDocument();
        });

        it("passes the custom label to the search input field", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                filter: "Filtrar",
            };
            render(
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
            const opener = screen.getByTestId("translated-multi-select");
            // open dropdown
            userEvent.click(opener);

            const searchInput = screen.getByPlaceholderText("Filtrar");

            // Assert
            expect(searchInput).toBeInTheDocument();
        });

        it("passes the custom label to the no results label", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                noResults: "No hay resultados",
            };
            render(
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

            const opener = screen.getByTestId("translated-multi-select");
            // open dropdown
            userEvent.click(opener);

            // Act
            userEvent.type(screen.getByPlaceholderText("Filter"), "other");

            // Assert
            expect(screen.getByRole("listbox")).toHaveTextContent(
                "No hay resultados",
            );
        });

        it("passes the custom label to the select all shortcut", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                selectAllLabel: (numOptions) =>
                    `Seleccionar todas las escuelas (${numOptions})`,
            };
            render(
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
            const opener = screen.getByTestId("translated-multi-select");
            // open dropdown
            userEvent.click(opener);

            // Assert
            expect(
                screen.getByText("Seleccionar todas las escuelas (3)"),
            ).toBeInTheDocument();
        });

        it("passes the custom label to the select none shortcut", () => {
            // Arrange
            const labels: $Shape<Labels> = {
                selectNoneLabel: "Deseleccionar todas las escuelas",
            };
            render(
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
            const opener = screen.getByTestId("translated-multi-select");
            // open dropdown
            userEvent.click(opener);

            // Assert
            expect(
                screen.getByText("Deseleccionar todas las escuelas"),
            ).toBeInTheDocument();
        });

        it("verifies a custom label is updated when props change", () => {
            // Arrange
            const initialLabels: $Shape<Labels> = {
                selectNoneLabel: "Deseleccionar todas las escuelas",
            };

            const TranslatedComponent = ({
                labels,
            }: {|
                labels: $Shape<Labels>,
            |}) => (
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    shortcuts={true}
                    labels={labels}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>
            );

            const {rerender} = render(
                <TranslatedComponent labels={initialLabels} />,
            );

            // update label value
            const updatedLabels: $Shape<Labels> = {
                selectNoneLabel: "Ninguna seleccionada",
            };

            rerender(<TranslatedComponent labels={updatedLabels} />);

            // Act
            const opener = screen.getByRole("button");
            // open dropdown
            userEvent.click(opener);

            // Assert
            expect(
                screen.getByText(updatedLabels.selectNoneLabel),
            ).toBeInTheDocument();
        });
    });
});
