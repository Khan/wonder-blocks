/* eslint-disable no-constant-condition */
/* eslint-disable max-lines */
import * as React from "react";
import {
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import {
    userEvent as ue,
    PointerEventsCheckLevel,
    UserEvent,
} from "@testing-library/user-event";

import {PropsFor} from "@khanacademy/wonder-blocks-core";
import OptionItem from "../option-item";
import MultiSelect from "../multi-select";
import {defaultLabels as builtinLabels} from "../../util/constants";

import type {LabelsValues} from "../multi-select";

const doRender = (element: React.ReactElement) => {
    return {
        ...render(element),
        userEvent: ue.setup({
            advanceTimers: jest.advanceTimersByTime,
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        }),
    };
};

const defaultLabels: LabelsValues = {
    ...builtinLabels,
    selectAllLabel: (numOptions: any) => `Select all (${numOptions})`,
    noneSelected: "Choose",
    someSelected: (numSelectedValues: any) =>
        numSelectedValues > 1 ? `${numSelectedValues} students` : "1 student",
    allSelected: "All students",
};

describe("MultiSelect", () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();

        // We mock console.error() because React logs a bunch of errors pertaining
        // to the use href="javascript:void(0);".
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.useFakeTimers();
    });

    afterEach(() => {
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'mockClear' does not exist on type '{ (options?: ScrollToOptions | undefined): void; (x: number, y: number): void; } & { (options?: ScrollToOptions | undefined): void; (x: number, y: number): void; }'.
        window.scrollTo.mockClear();
        jest.spyOn(console, "error").mockReset();
    });

    describe("uncontrolled", () => {
        const onChange = jest.fn();
        const uncontrolledMultiSelect = (
            <MultiSelect
                onChange={onChange}
                selectedValues={[]}
                labels={defaultLabels}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
                {false ? <OptionItem label="item 4" value="4" /> : null}
            </MultiSelect>
        );

        it("opens the select on mouse click", async () => {
            // Arrange
            const {userEvent} = doRender(uncontrolledMultiSelect);

            // Act
            await userEvent.click(await screen.findByRole("combobox"));

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toBeInTheDocument();
        });

        it("should not submit a surrounding form when clicked", async () => {
            // Arrange
            const submit = jest.fn();
            const {userEvent} = doRender(
                <form
                    onSubmit={() => {
                        submit();
                    }}
                >
                    <MultiSelect
                        aria-label="Choose"
                        onChange={jest.fn()}
                        selectedValues={["toggle_a"]}
                        showOpenerLabelAsText={false}
                    >
                        <OptionItem
                            label={<div>custom item A</div>}
                            value="toggle_a"
                            labelAsText="Plain Toggle A"
                        />
                        <OptionItem
                            label={<div>custom item B</div>}
                            value="toggle_b"
                            labelAsText="Plain Toggle B"
                        />
                    </MultiSelect>
                </form>,
            );
            const opener = await screen.findByRole("combobox");

            // Act
            await userEvent.click(opener);

            // Assert
            expect(submit).not.toHaveBeenCalled();
        });

        it("closes the select on {Escape}", async () => {
            // Arrange
            const {userEvent} = doRender(uncontrolledMultiSelect);

            await userEvent.tab();
            await userEvent.keyboard("{Enter}"); // open

            // Act
            await userEvent.keyboard("{Escape}");

            // Assert
            expect(onChange).not.toHaveBeenCalled();
            expect(
                screen.queryByRole("listbox", {hidden: true}),
            ).not.toBeInTheDocument();
        });

        it("displays correct text for opener", async () => {
            // Arrange
            doRender(uncontrolledMultiSelect);

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            // No items are selected, display placeholder because there is one
            expect(opener).toHaveTextContent("Choose");
        });

        it("displays correct text for opener when there's one item selected", async () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1"]}
                    labels={defaultLabels}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(await screen.findByRole("combobox")).toHaveTextContent(
                "item 1",
            );
        });

        it("displays correct text for opener when there's one custom item selected", async () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1"]}
                    labels={defaultLabels}
                >
                    <OptionItem label={<div>custom item 1</div>} value="1" />
                    <OptionItem label={<div>custom item 2</div>} value="2" />
                    <OptionItem label={<div>custom item 3</div>} value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(await screen.findByRole("combobox")).toHaveTextContent(
                "1 student",
            );
        });

        it("displays correct text for opener when an invalid selection is provided", async () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["not-found"]}
                    labels={defaultLabels}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(await screen.findByRole("combobox")).toHaveTextContent(
                "Choose",
            );
        });

        it("displays correct text for opener when there's more than one item selected", async () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1", "2"]}
                    labels={defaultLabels}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            // More than one item is selected, display n itemTypes
            expect(await screen.findByRole("combobox")).toHaveTextContent(
                "2 students",
            );
        });

        it("displays correct text for opener when all items are selected", async () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1", "2", "3"]}
                    labels={defaultLabels}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            // All items are selected
            expect(await screen.findByRole("combobox")).toHaveTextContent(
                "All students",
            );
        });

        it("displays All selected text when no items is selected for opener with implicitAllEnabled", async () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={[]}
                    labels={defaultLabels}
                    implicitAllEnabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(await screen.findByRole("combobox")).toHaveTextContent(
                "All students",
            );
        });

        it("verifies testId is added to the opener", async () => {
            // Arrange
            doRender(
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
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("data-testid", "some-test-id");
        });

        it("can render a Node as a label", async () => {
            // Arrange
            doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1"]}
                    showOpenerLabelAsText={false}
                >
                    <OptionItem label={<div>custom item 1</div>} value="1" />
                    <OptionItem label={<div>custom item 2</div>} value="2" />
                    <OptionItem label={<div>custom item 3</div>} value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");
            const menuLabel = within(opener).getByText("custom item 1");

            // Assert
            expect(menuLabel).toBeVisible();
        });

        it("applies an aria-label to the opener", async () => {
            doRender(
                <MultiSelect onChange={jest.fn()} aria-label="Select a school">
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAccessibleName("Select a school");
        });

        it("keeps the original aria-label when items are selected", async () => {
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    selectedValues={["1", "2"]}
                    labels={defaultLabels}
                    aria-label="Select a school"
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAccessibleName("Select a school");
        });
    });

    describe("Controlled component", () => {
        type Props = {
            opened?: boolean;
            onToggle?: (opened: boolean) => unknown;
            shortcuts?: boolean;
        };

        const labels: LabelsValues = {
            ...builtinLabels,
            selectAllLabel: (numOptions: any) => `Select all (${numOptions})`,
            allSelected: "All fruits",
            someSelected: (numSelectedValues: any) =>
                `${numSelectedValues} fruits`,
        };

        const ControlledComponent = function (
            props: Props,
        ): React.ReactElement {
            const [opened, setOpened] = React.useState(props.opened ?? false);
            const [selectedValues, setSelectedValues] = React.useState([]);

            const handleToggleMenu = (opened: any) => {
                setOpened(opened);
                props.onToggle?.(opened);
            };

            const handleChange = (newValues: any) => {
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
                        data-testid="parent-button"
                        onClick={() => handleToggleMenu(true)}
                    />
                </React.Fragment>
            );
        };

        it("opens the menu when the parent updates its state", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            await userEvent.click(await screen.findByTestId("parent-button"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            // open the menu from the outside
            await userEvent.click(await screen.findByTestId("parent-button"));
            // click on the opener
            await userEvent.click(
                await screen.findByTestId("multi-select-opener"),
            );

            // Assert
            expect(onToggleMock).toHaveBeenCalledTimes(2);
            expect(onToggleMock).toHaveBeenNthCalledWith(1, true);
            expect(onToggleMock).toHaveBeenNthCalledWith(2, false);
        });

        it("should still allow the opener to open the menu", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            // Act
            // click on the opener
            await userEvent.click(
                await screen.findByTestId("multi-select-opener"),
            );

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("opens the menu when the anchor is clicked once", async () => {
            // Arrange
            const {userEvent} = doRender(<ControlledComponent />);

            // Act
            await userEvent.click(
                await screen.findByTestId("multi-select-opener"),
            );

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toBeInTheDocument();
        });

        it("closes the menu when the anchor is clicked", async () => {
            // Arrange
            const {userEvent} = doRender(<ControlledComponent />);

            // Act
            // open the menu from the outside
            await userEvent.click(await screen.findByTestId("parent-button"));
            // click on the dropdown anchor to hide the menu
            await userEvent.click(
                await screen.findByTestId("multi-select-opener"),
            );

            // Assert
            expect(
                screen.queryByRole("listbox", {hidden: true}),
            ).not.toBeInTheDocument();
        });

        // NOTE(john) FEI-5533: After upgrading to user-event v14 this test is failing.
        // We are unale to find the option with the specified text, even though
        // it exists in the document.
        it.skip("selects on item as expected", async () => {
            // Arrange
            const {userEvent} = doRender(<ControlledComponent />);

            const opener = await screen.findByTestId("multi-select-opener");
            await userEvent.click(opener);

            // Act
            // Grab the second item in the list
            const item = await screen.findByRole("option", {
                name: "item 2",
                hidden: true,
            });
            await userEvent.click(item);

            // Assert
            expect(item).toHaveAttribute("aria-selected", "true");
            expect(opener).toHaveTextContent("item 2");
        });

        it("dropdown menu is still open after selection", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            const opener = await screen.findByTestId("multi-select-opener");
            await userEvent.click(opener);

            // Act
            // Grab the second item in the list
            const item = await screen.findByText("item 2");
            await userEvent.click(item);

            // Assert
            expect(onToggleMock).toHaveBeenCalledTimes(1);
        });

        it("selects two items as expected", async () => {
            // Arrange
            const {userEvent} = doRender(<ControlledComponent />);

            const opener = await screen.findByTestId("multi-select-opener");
            await userEvent.click(opener);

            // Act
            // Select the second and third items in the list
            const secondOption = await screen.findByText("item 2");
            await userEvent.click(secondOption);
            const thirdOption = await screen.findByText("item 3");
            await userEvent.click(thirdOption);

            // Assert
            expect(opener).toHaveTextContent("2 fruits");

            // // Select none of the items
            // const selectNone = select.find(ActionItem).at(1);
            // selectNone.simulate("mousedown");
            // selectNone.simulate("mouseup", nativeEvent);
            // selectNone.simulate("click");
            // expect(allChanges.pop().length).toEqual(0)
        });

        it("selects two items, then unselect one as expected", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            const {userEvent} = doRender(
                <ControlledComponent onToggle={onToggleMock} />,
            );

            const opener = await screen.findByTestId("multi-select-opener");
            await userEvent.click(opener);

            // Select the second and third items in the list
            const secondOption = await screen.findByText("item 2");
            await userEvent.click(secondOption);
            const thirdOption = await screen.findByText("item 3");
            await userEvent.click(thirdOption);

            // Act
            // Unselect the first item selected
            await userEvent.click(secondOption);

            // Assert
            expect(opener).toHaveTextContent("item 3");
        });

        it("selects all the enabled items when the 'All items' shortcut is selected", async () => {
            // Arrange
            const ControlledMultiSelect = function (
                props: Props,
            ): React.ReactElement {
                const [selectedValues, setSelectedValues] = React.useState([]);
                const handleChange = (newValues: any) => {
                    setSelectedValues(newValues);
                };

                return (
                    <MultiSelect
                        labels={labels}
                        onChange={handleChange}
                        opened={props.opened}
                        onToggle={props.onToggle}
                        selectedValues={selectedValues}
                        shortcuts={true}
                    >
                        <OptionItem label="item 1" value="1" />
                        {/* The second option item shouldn't be selectable */}
                        <OptionItem label="item 2" value="2" disabled={true} />
                        <OptionItem label="item 3" value="3" />
                    </MultiSelect>
                );
            };

            const {userEvent} = doRender(<ControlledMultiSelect />);

            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            // Act
            // Select all of the items
            const selectAll = await screen.findByText(/Select all/i);
            await userEvent.click(selectAll);

            // Assert
            expect(opener).toHaveTextContent("All fruits");
        });

        it("selects all the items when the 'All items' shortcut is selected", async () => {
            // Arrange
            const {userEvent} = doRender(
                <ControlledComponent shortcuts={true} />,
            );

            const opener = await screen.findByTestId("multi-select-opener");
            await userEvent.click(opener);

            // Act
            // Select all of the items
            const selectAll = await screen.findByText(/Select all/i);
            await userEvent.click(selectAll);

            // Assert
            expect(opener).toHaveTextContent("All fruits");
        });

        it("deselects all the items when the 'Select none' shortcut is selected", async () => {
            // Arrange
            const {userEvent} = doRender(
                <ControlledComponent shortcuts={true} />,
            );

            const opener = await screen.findByTestId("multi-select-opener");
            await userEvent.click(opener);

            // First, select all of the items
            const selectAll = await screen.findByText(/Select all/i);
            await userEvent.click(selectAll);

            // Act
            const selectNone = await screen.findByText(/Select none/i);
            await userEvent.click(selectNone);

            // Assert
            expect(opener).toHaveTextContent("0 items");
        });
    });

    describe("isFilterable", () => {
        const onChange = jest.fn();

        const filterableMultiSelect = (
            <MultiSelect
                onChange={onChange}
                selectedValues={[]}
                labels={defaultLabels}
                isFilterable={true}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
                {false ? <OptionItem label="item 4" value="4" /> : null}
            </MultiSelect>
        );

        it("displays SearchTextInput when isFilterable is true", async () => {
            // Arrange
            const {userEvent} = doRender(filterableMultiSelect);
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            // Act
            const searchInput = await screen.findByPlaceholderText("Filter");

            // Assert
            expect(searchInput).toBeInTheDocument();
        });

        it("displays SearchTextInput with dismiss button when search text exists", async () => {
            // Arrange
            const {userEvent} = doRender(filterableMultiSelect);
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            const searchInput = await screen.findByPlaceholderText("Filter");

            // Act
            await userEvent.type(searchInput, "text");

            // Assert
            expect(
                await screen.findByLabelText("Clear search"),
            ).toBeInTheDocument();
        });

        it("filters the items by the search input (case insensitive)", async () => {
            // Arrange
            const {userEvent} = doRender(filterableMultiSelect);
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            const searchInput = await screen.findByPlaceholderText("Filter");

            // Act
            await userEvent.type(searchInput, "Item 1");

            // Assert
            expect(screen.getAllByRole("option", {hidden: true})).toHaveLength(
                1,
            );
        });

        it("Allows selecting all the enabled items", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={() => {}}
                    selectedValues={[]}
                    labels={defaultLabels}
                    shortcuts={true}
                >
                    <OptionItem label="item 1" value="1" />
                    {/* The second option item shouldn't be selectable */}
                    <OptionItem label="item 2" value="2" disabled={true} />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            // Assert
            expect(
                await screen.findByText("Select all (2)"),
            ).toBeInTheDocument();
        });

        it("Hides shortcuts when there are any text in search text input", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={[]}
                    labels={defaultLabels}
                    isFilterable={true}
                    shortcuts={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            const searchInput = await screen.findByPlaceholderText("Filter");

            // Act
            await userEvent.type(searchInput, "2");

            // Assert
            expect(screen.queryByText(/Select all/i)).not.toBeInTheDocument();
        });

        it("should focus on the search input after opening the dropdown", async () => {
            // Arrange
            const {userEvent} = doRender(filterableMultiSelect);
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            // Act
            const searchInput = await screen.findByPlaceholderText("Filter");

            // Assert
            expect(searchInput).toHaveFocus();
        });

        it("Selected items are at the top of the items when isFilterable is true", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["3"]}
                    labels={defaultLabels}
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
            await userEvent.click(await screen.findByRole("combobox"));

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toHaveTextContent(/item 3.*item 1.*item 2/i);
        });

        it("Type something in SearchTextInput should update searchText in MultiSelect", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={[]}
                    labels={defaultLabels}
                    isFilterable={true}
                    shortcuts={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            await userEvent.click(await screen.findByRole("combobox"));

            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "Item 2");

            // Act
            await userEvent.clear(searchInput);
            await userEvent.type(searchInput, "Item 1");

            // Assert
            const options = screen.getAllByRole("option", {hidden: true});
            expect(options).toHaveLength(1);
            expect(options[0]).toHaveTextContent("item 1");
        });

        // NOTE(john) FEI-5533: This isn't working after upgrading to user-event v14,
        // the focus is moving to the body instead of the Clear search button.
        it.skip("should move focus to the dismiss button after pressing {tab} on the text input", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={onChange}
                    selectedValues={["1"]}
                    labels={defaultLabels}
                    isFilterable={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "some text");

            // Act
            await userEvent.tab();

            // Assert
            const dismissBtn = await screen.findByLabelText("Clear search");
            expect(dismissBtn).toHaveFocus();
        });

        it("Click dismiss button should clear the searchText in MultiSelect", async () => {
            // Arrange
            const {userEvent} = doRender(filterableMultiSelect);
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("combobox"));

            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "Should be cleared");

            const dismissBtn = await screen.findByLabelText("Clear search");

            // Act
            await userEvent.click(dismissBtn);

            // Assert
            expect(searchInput).toHaveValue("");
        });

        it("Open MultiSelect should clear the searchText", async () => {
            // Arrange
            const {userEvent} = doRender(filterableMultiSelect);
            // open the dropdown menu
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            const searchInput = await screen.findByPlaceholderText("Filter");
            await userEvent.type(searchInput, "Should be cleared");

            // Close the dropdown menu
            await userEvent.click(opener);

            // Act
            // Reopen it
            await userEvent.click(opener);

            // Assert
            expect(await screen.findByPlaceholderText("Filter")).toHaveValue(
                "",
            );
        });

        it("should find an option after using the search filter", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                someSelected: (numOptions: number): string =>
                    numOptions <= 1
                        ? `${numOptions} planet`
                        : `${numOptions} planets`,
            };

            const {userEvent} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    shortcuts={true}
                    labels={labels}
                    opened={true}
                >
                    <OptionItem label="Earth" value="earth" />
                    <OptionItem label="Venus" value="venus" />
                    <OptionItem label="Mars" value="mars" />
                </MultiSelect>,
            );

            // Act
            await userEvent.type(await screen.findByRole("textbox"), "ear");

            // Assert
            const filteredOption = await screen.findByText("Earth");
            expect(filteredOption).toBeInTheDocument();
        });

        it("should filter out an option if it's not part of the results", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                someSelected: (numOptions: number): string =>
                    numOptions <= 1
                        ? `${numOptions} planet`
                        : `${numOptions} planets`,
            };

            const {userEvent} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    shortcuts={true}
                    labels={labels}
                    opened={true}
                >
                    <OptionItem label="Earth" value="earth" />
                    <OptionItem label="Venus" value="venus" />
                    <OptionItem label="Mars" value="mars" />
                </MultiSelect>,
            );

            // Act
            await userEvent.type(await screen.findByRole("textbox"), "ear");

            // Assert
            await waitFor(() => {
                const filteredOption = screen.queryByText("Venus");
                expect(filteredOption).not.toBeInTheDocument();
            });
        });
    });

    describe("Custom Opener", () => {
        it("labels the custom opener with `aria-label` on MultiSelect", async () => {
            // Arrange
            doRender(
                <MultiSelect
                    aria-label="Search"
                    onChange={jest.fn()}
                    opener={(eventState: any) => <button onClick={jest.fn()} />}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAccessibleName("Search");
        });

        it("prioritizes `aria-label` on the custom opener", async () => {
            // Arrange
            doRender(
                <MultiSelect
                    aria-label="Not winning the label race"
                    onChange={jest.fn()}
                    opener={(eventState: any) => (
                        <button
                            aria-label="Search button"
                            onClick={jest.fn()}
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAccessibleName("Search button");
        });

        it("opens the menu when clicking on the custom opener", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    opener={(eventState: any) => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toBeInTheDocument();
        });

        it("should not submit a surrounding form when a custom opener is clicked", async () => {
            // Arrange
            const submit = jest.fn();
            const {userEvent} = doRender(
                <form
                    onSubmit={() => {
                        submit();
                    }}
                >
                    <MultiSelect
                        aria-label="Choose"
                        onChange={jest.fn()}
                        selectedValues={["toggle_a"]}
                        showOpenerLabelAsText={false}
                        opener={(eventState: any) => (
                            <button aria-label="Search" onClick={jest.fn()} />
                        )}
                    >
                        <OptionItem
                            label={<div>custom item A</div>}
                            value="toggle_a"
                            labelAsText="Plain Toggle A"
                        />
                        <OptionItem
                            label={<div>custom item B</div>}
                            value="toggle_b"
                            labelAsText="Plain Toggle B"
                        />
                    </MultiSelect>
                </form>,
            );
            const opener = await screen.findByRole("combobox");

            // Act
            await userEvent.click(opener);

            // Assert
            expect(submit).not.toHaveBeenCalled();
        });

        it("calls the custom onClick handler", async () => {
            // Arrange
            const onClickMock = jest.fn();

            const {userEvent} = doRender(
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
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("verifies testId is passed from the custom opener", async () => {
            // Arrange
            const onChange = jest.fn();

            doRender(
                <MultiSelect
                    onChange={onChange}
                    opener={() => (
                        <button
                            data-testid="custom-opener"
                            aria-label="Custom opener"
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Custom opener");

            // Assert
            expect(opener).toHaveAttribute("data-testid", "custom-opener");
        });

        it("verifies testId is not passed from the parent element", async () => {
            // Arrange
            const onChange = jest.fn();

            doRender(
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
            const opener = await screen.findByLabelText("Custom opener");

            // Assert
            expect(opener).not.toHaveAttribute("data-testid", "custom-opener");
        });

        it("passes the current value to the custom opener (no items selected)", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                noneSelected: "No items selected",
            };

            doRender(
                <MultiSelect
                    labels={labels}
                    testId="openTest"
                    onChange={jest.fn()}
                    opener={({text}: any) => (
                        <button onClick={jest.fn()} data-testid="custom-opener">
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
            const opener = await screen.findByTestId("custom-opener");

            // Assert
            expect(opener).toHaveTextContent("No items selected");
        });

        it("passes the current value to the custom opener (1 item selected)", async () => {
            // Arrange
            const ControlledMultiSelect = () => {
                const [selected, setSelected] = React.useState([]);
                return (
                    <MultiSelect
                        testId="openTest"
                        onChange={(values: any) => {
                            setSelected(values);
                        }}
                        selectedValues={selected}
                        opener={({text}: any) => (
                            <button
                                onClick={jest.fn()}
                                data-testid="custom-opener"
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

            const {userEvent} = doRender(<ControlledMultiSelect />);

            const opener = await screen.findByTestId("custom-opener");
            // open dropdown
            await userEvent.click(opener);

            // Act
            const option = await screen.findByText("item 1");
            await userEvent.click(option);

            // Assert
            expect(opener).toHaveTextContent("item 1");
        });

        it("passes the current value to the custom opener (2 items selected)", async () => {
            // Arrange
            const ControlledMultiSelect = () => {
                const [selected, setSelected] = React.useState([]);
                return (
                    <MultiSelect
                        testId="openTest"
                        onChange={(values: any) => {
                            setSelected(values);
                        }}
                        selectedValues={selected}
                        opener={({text}: any) => (
                            <button
                                onClick={jest.fn()}
                                data-testid="custom-opener"
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

            const {userEvent} = doRender(<ControlledMultiSelect />);

            const opener = await screen.findByTestId("custom-opener");
            // open dropdown
            await userEvent.click(opener);

            // Act
            await userEvent.click(await screen.findByText("item 1"));
            await userEvent.click(await screen.findByText("item 2"));

            // Assert
            expect(opener).toHaveTextContent("2 items");
        });

        it("passes the current value to the custom opener (all items selected)", async () => {
            // Arrange
            const ControlledMultiSelect = () => {
                const [selected, setSelected] = React.useState([]);
                return (
                    <MultiSelect
                        testId="openTest"
                        onChange={(values: any) => {
                            setSelected(values);
                        }}
                        selectedValues={selected}
                        opener={({text}: any) => (
                            <button
                                onClick={jest.fn()}
                                data-testid="custom-opener"
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

            const {userEvent} = doRender(<ControlledMultiSelect />);

            const opener = await screen.findByTestId("custom-opener");
            // open dropdown
            await userEvent.click(opener);

            // Act
            await userEvent.click(await screen.findByText("item 1"));
            await userEvent.click(await screen.findByText("item 2"));
            await userEvent.click(await screen.findByText("item 3"));

            // Assert
            expect(opener).toHaveTextContent("All items");
        });
    });

    describe("Custom labels and values", () => {
        it("passes the custom value to the opener", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                noneSelected: "0 escuelas",
            };
            doRender(
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
            const opener = await screen.findByTestId("translated-multi-select");

            // Assert
            expect(opener).toHaveTextContent("0 escuelas");
        });

        it("passes the custom label to the opener (2 items selected)", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                someSelected: (numSelectedValues: any) =>
                    `${numSelectedValues} escuelas`,
            };
            doRender(
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
            const opener = await screen.findByTestId("translated-multi-select");

            // Assert
            expect(opener).toHaveTextContent("2 escuelas");
        });

        it("passes the custom value to the opener (all items selected)", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                allSelected: "Todas las escuelas",
            };
            doRender(
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
            const opener = await screen.findByTestId("translated-multi-select");

            // Assert
            expect(opener).toHaveTextContent("Todas las escuelas");
        });

        it("passes the custom label to the dismiss icon", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                clearSearch: "Limpiar busqueda",
            };
            const {userEvent} = doRender(
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
            const opener = await screen.findByTestId("translated-multi-select");
            // open dropdown
            await userEvent.click(opener);
            // search text
            await userEvent.type(
                await screen.findByPlaceholderText("Filter"),
                "school",
            );
            // get icon instance
            const dismissIcon =
                await screen.findByLabelText("Limpiar busqueda");

            // Assert
            expect(dismissIcon).toBeInTheDocument();
        });

        it("passes the custom label to the search input field", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                filter: "Filtrar",
            };
            const {userEvent} = doRender(
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
            const opener = await screen.findByTestId("translated-multi-select");
            // open dropdown
            await userEvent.click(opener);

            const searchInput = await screen.findByPlaceholderText("Filtrar");

            // Assert
            expect(searchInput).toBeInTheDocument();
        });

        it("passes the custom value for no results", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                noResults: "No hay resultados",
            };
            const {userEvent} = doRender(
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

            const opener = await screen.findByTestId("translated-multi-select");
            // open dropdown
            await userEvent.click(opener);

            // Act
            await userEvent.type(
                await screen.findByPlaceholderText("Filter"),
                "other",
            );

            // Assert
            expect(
                await screen.findByText("No hay resultados"),
            ).toBeInTheDocument();
        });

        it("passes the custom label to the select all shortcut", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                selectAllLabel: (numOptions: any) =>
                    `Seleccionar todas las escuelas (${numOptions})`,
            };
            const {userEvent} = doRender(
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
            const opener = await screen.findByTestId("translated-multi-select");
            // open dropdown
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByText("Seleccionar todas las escuelas (3)"),
            ).toBeInTheDocument();
        });

        it("passes the custom label to the select none shortcut", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                selectNoneLabel: "Deseleccionar todas las escuelas",
            };
            const {userEvent} = doRender(
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
            const opener = await screen.findByTestId("translated-multi-select");
            // open dropdown
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByText("Deseleccionar todas las escuelas"),
            ).toBeInTheDocument();
        });

        it("verifies a custom label is updated when props change", async () => {
            // Arrange
            const initialLabels: LabelsValues = {
                ...defaultLabels,
                selectNoneLabel: "Deseleccionar todas las escuelas",
            };

            const TranslatedComponent = ({labels}: {labels: LabelsValues}) => (
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

            const {rerender, userEvent} = doRender(
                <TranslatedComponent labels={initialLabels} />,
            );

            // update label value
            const updatedLabels: LabelsValues = {
                ...defaultLabels,
                selectNoneLabel: "Ninguna seleccionada",
            };

            rerender(<TranslatedComponent labels={updatedLabels} />);

            // Act
            const opener = await screen.findByRole("combobox");
            // open dropdown
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByText(updatedLabels.selectNoneLabel),
            ).toBeInTheDocument();
        });

        // TODO(FEI-5533): Key press events aren't working correctly with
        // user-event v14. We need to investigate and fix this.
        describe.skip("keyboard", () => {
            it("should find and focus an item using the keyboard", async () => {
                // Arrange
                const onChangeMock = jest.fn();

                const {userEvent} = doRender(
                    <MultiSelect onChange={onChangeMock}>
                        <OptionItem label="Mercury" value="mercury" />
                        <OptionItem label="Venus" value="venus" />
                        <OptionItem label="Mars" value="mars" />
                    </MultiSelect>,
                );
                await userEvent.tab();

                // Act
                // find first occurrence
                await userEvent.keyboard("v");
                jest.advanceTimersByTime(501);

                // Assert
                const filteredOption = await screen.findByRole("option", {
                    name: /Venus/i,
                    hidden: true,
                });
                // Verify that the element found is focused.
                expect(filteredOption).toHaveFocus();
                // And also verify that the listbox is opened.
                expect(
                    await screen.findByRole("listbox", {hidden: true}),
                ).toBeInTheDocument();
            });
        });
    });

    describe("a11y > Live region", () => {
        let announceMessageSpy: any;

        beforeAll(() => {
            announceMessageSpy = jest.spyOn(
                require("@khanacademy/wonder-blocks-announcer"),
                "announceMessage",
            );
        });

        afterAll(() => {
            announceMessageSpy.mockRestore();
        });

        it("should announce the number of options when the listbox is open", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                someSelected: (numOptions: number): string =>
                    numOptions <= 1
                        ? `${numOptions} school`
                        : `${numOptions} schools`,
            };

            const {userEvent} = doRender(
                <MultiSelect onChange={jest.fn()} labels={labels} opened={true}>
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );
            const opener = await screen.findByRole("combobox");

            // Act
            await userEvent.click(opener);

            // Assert
            await expect(announceMessageSpy).toHaveBeenCalledWith({
                message: "3 schools",
            });
        });

        it("should change the number of options after using the search filter", async () => {
            // Arrange
            const labels: LabelsValues = {
                ...builtinLabels,
                noneSelected: "0 planets",
                someSelected: (numOptions: number): string =>
                    numOptions <= 1
                        ? `${numOptions} planet`
                        : `${numOptions} planets`,
            };

            const {userEvent} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    shortcuts={true}
                    labels={labels}
                    opened={true}
                >
                    <OptionItem label="Earth" value="earth" />
                    <OptionItem label="Venus" value="venus" />
                    <OptionItem label="Mars" value="mars" />
                </MultiSelect>,
            );

            // Act
            const textbox = await screen.findByRole("textbox");
            await userEvent.click(textbox);
            await userEvent.paste("ear");

            // Assert
            await expect(announceMessageSpy).toHaveBeenCalledWith({
                message: "1 planet",
            });
        });
    });

    describe("a11y > Focusable", () => {
        it("should be focusable", () => {
            // Arrange
            doRender(
                <MultiSelect onChange={jest.fn()} testId="select-focus-test">
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const multiSelect = screen.getByTestId("select-focus-test");
            multiSelect.focus();

            // Assert
            expect(multiSelect).toHaveFocus();
        });

        it("should be focusable when disabled", () => {
            // Arrange
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const multiSelect = screen.getByTestId("select-focus-test");
            multiSelect.focus();

            // Assert
            expect(multiSelect).toHaveFocus();
        });
    });

    describe("Disabled state", () => {
        it("should set the `aria-disabled` attribute to `true` if `disabled` prop is `true`", () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );
            const multiSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(multiSelect).toHaveAttribute("aria-disabled", "true");
        });

        it("should not set the `disabled` attribute if `disabled` prop is `true` since `aria-disabled` is used instead", () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );
            const multiSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(multiSelect).not.toHaveAttribute("disabled");
        });

        it("should not be opened if it is disabled and `open` prop is set to true", () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect onChange={jest.fn()} disabled={true} opened={true}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("should not be able to open the select using the keyboard if there are no items", async () => {
            // Arrange
            doRender(<MultiSelect onChange={jest.fn()} />);

            // Act
            // Press the button
            const button = await screen.findByRole("combobox");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                keyCode: 40,
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                keyCode: 40,
            });

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });

        it("should not be able to open the select using the keyboard if all items are disabled", async () => {
            // Arrange
            doRender(
                <MultiSelect onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" disabled={true} />
                    <OptionItem label="item 2" value="2" disabled={true} />
                </MultiSelect>,
            );

            // Act
            // Press the button
            const button = await screen.findByRole("combobox");
            // NOTE: we need to use fireEvent here because await userEvent doesn't
            // support keyUp/Down events and we use these handlers to override
            // the default behavior of the button.
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyDown(button, {
                keyCode: 40,
            });
            // eslint-disable-next-line testing-library/prefer-user-event
            fireEvent.keyUp(button, {
                keyCode: 40,
            });

            // Assert
            expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        });
    });

    describe("a11y > Focusable", () => {
        it("should be focusable", () => {
            // Arrange
            doRender(
                <MultiSelect onChange={jest.fn()} testId="select-focus-test">
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const multiSelect = screen.getByTestId("select-focus-test");
            multiSelect.focus();

            // Assert
            expect(multiSelect).toHaveFocus();
        });

        it("should be focusable when disabled", () => {
            // Arrange
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );

            // Act
            const multiSelect = screen.getByTestId("select-focus-test");
            multiSelect.focus();

            // Assert
            expect(multiSelect).toHaveFocus();
        });
    });

    describe("Disabled state", () => {
        it("should set the `aria-disabled` attribute to `true` if `disabled` prop is `true`", () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );
            const multiSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(multiSelect).toHaveAttribute("aria-disabled", "true");
        });

        it("should not set the `disabled` attribute if `disabled` prop is `true` since `aria-disabled` is used instead", () => {
            // Arrange

            // Act
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    testId="select-focus-test"
                    disabled={true}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                    <OptionItem label="item 3" value="3" />
                </MultiSelect>,
            );
            const multiSelect = screen.getByTestId("select-focus-test");

            // Assert
            expect(multiSelect).not.toHaveAttribute("disabled");
        });
    });

    describe("Ids", () => {
        it("Should auto-generate an id for the opener if `id` prop is not provided", async () => {
            // Arrange
            doRender(
                <MultiSelect onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("id", expect.any(String));
        });

        it("Should use the `id` prop if provided", async () => {
            // Arrange
            const id = "test-id";
            doRender(
                <MultiSelect onChange={jest.fn()} id={id}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("id", id);
        });

        it("Should auto-generate an id for the dropdown if `dropdownId` prop is not provided", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            // Open the dropdown
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toHaveAttribute("id", expect.any(String));
        });

        it("Should use the `dropdownId` prop if provided", async () => {
            // Arrange
            const dropdownId = "test-id";
            const {userEvent} = doRender(
                <MultiSelect onChange={jest.fn()} dropdownId={dropdownId}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            // Open the dropdown
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toHaveAttribute("id", dropdownId);
        });
    });

    describe("a11y > aria-controls", () => {
        it("Should set the `aria-controls` attribute on the default opener to the provided dropdownId prop", async () => {
            // Arrange
            const dropdownId = "test-id";
            const {userEvent} = doRender(
                <MultiSelect onChange={jest.fn()} dropdownId={dropdownId}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", dropdownId);
        });

        it("Should set the `aria-controls` attribute on the default opener to the auto-generated dropdownId", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", expect.any(String));
        });

        it("Should set the `aria-controls` attribute on the custom opener to the provided dropdownId prop", async () => {
            // Arrange
            const dropdownId = "test-id";
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    dropdownId={dropdownId}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", dropdownId);
        });

        it("Should set the `aria-controls` attribute on the custom opener to the auto-generated dropdownId", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("listbox", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", expect.any(String));
        });
    });

    describe("a11y > aria-haspopup", () => {
        it("should have aria-haspopup set on the opener", async () => {
            // Arrange
            doRender(
                <MultiSelect onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("aria-haspopup", "listbox");
        });

        it("should have aria-haspopup set on the custom opener", async () => {
            // Arrange
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");

            // Assert
            expect(opener).toHaveAttribute("aria-haspopup", "listbox");
        });
    });

    describe("a11y > aria-expanded", () => {
        it("should have aria-expanded=false when closed", async () => {
            // Arrange
            doRender(
                <MultiSelect onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "false");
        });

        it("updates the aria-expanded value when opening", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect onChange={jest.fn()}>
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByRole("combobox");
            await userEvent.click(opener);

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "true");
        });

        it("should have aria-expanded=false when closed and using a custom opener", async () => {
            // Arrange
            doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "false");
        });

        it("updates the aria-expanded value when opening and using a custom opener", async () => {
            // Arrange
            const {userEvent} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);

            // Assert
            expect(opener).toHaveAttribute("aria-expanded", "true");
        });
    });

    describe("a11y > aria-invalid", () => {
        it.each([
            {error: true, ariaInvalid: "true"},
            {error: false, ariaInvalid: "false"},
            {error: undefined, ariaInvalid: "false"},
        ])(
            "should set aria-invalid to $ariaInvalid if error is $error",
            async ({error, ariaInvalid}) => {
                // Arrange
                doRender(<MultiSelect onChange={jest.fn()} error={error} />);

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveAttribute("aria-invalid", ariaInvalid);
            },
        );

        it.each([
            {error: true, ariaInvalid: "true"},
            {error: false, ariaInvalid: "false"},
            {error: undefined, ariaInvalid: "false"},
        ])(
            "should set aria-invalid to $ariaInvalid if error is $error and there is a custom opener",
            async ({error, ariaInvalid}) => {
                // Arrange
                doRender(
                    <MultiSelect
                        onChange={jest.fn()}
                        error={error}
                        opener={() => (
                            <button aria-label="Search" onClick={jest.fn()} />
                        )}
                    />,
                );

                // Act
                const opener = await screen.findByRole("combobox");

                // Assert
                expect(opener).toHaveAttribute("aria-invalid", ariaInvalid);
            },
        );
    });

    describe("a11y > violations", () => {
        afterEach(() => {
            jest.useFakeTimers();
        });

        it("should not have any violations", async () => {
            // Arrange
            const {container} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    opened={true}
                    aria-label="Item selector"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            // Flush any pending timers before switching to real timers
            // https://testing-library.com/docs/using-fake-timers/
            jest.runOnlyPendingTimers();
            // Use real timers for the jest-axe check otherwise the test will timeout
            // https://github.com/dequelabs/axe-core/issues/3055
            jest.useRealTimers();

            // Assert
            await expect(container).toHaveNoA11yViolations();
        });

        it("should not have any violations when it is open", async () => {
            // Arrange
            const {container} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    opened={true}
                    aria-label="Item selector"
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>,
            );

            // Act
            // Flush any pending timers before switching to real timers
            // https://testing-library.com/docs/using-fake-timers/
            jest.runOnlyPendingTimers();
            // Use real timers for the jest-axe check otherwise the test will timeout
            // https://github.com/dequelabs/axe-core/issues/3055
            jest.useRealTimers();

            // Assert
            await expect(container).toHaveNoA11yViolations();
        });
    });

    describe("validation", () => {
        const ControlledMultiSelect = (
            props: Partial<PropsFor<typeof MultiSelect>>,
        ) => {
            const [values, setValues] = React.useState<string[] | undefined>(
                props.selectedValues || undefined,
            );
            return (
                <MultiSelect
                    {...props}
                    selectedValues={values}
                    onChange={setValues}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </MultiSelect>
            );
        };
        describe.each([
            {
                closingMethod: "clicking the opener",
                closingAction: async (
                    userEvent: UserEvent,
                    opener: HTMLElement,
                ) => {
                    await userEvent.click(opener);
                },
            },
            {
                closingMethod: "pressing Escape",
                closingAction: async (userEvent: UserEvent) => {
                    await userEvent.keyboard("{escape}");
                },
            },
        ])(
            "when a value is selected and the dropdown is closed by $closingMethod",
            ({closingAction}) => {
                it("should call validate prop", async () => {
                    // Arrange
                    const validate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledMultiSelect validate={validate} />,
                    );
                    const opener = await screen.findByRole("combobox");
                    await userEvent.click(opener);
                    await userEvent.click(screen.getByText("item 1"));
                    validate.mockClear(); // Clear any calls

                    // Act
                    await closingAction(userEvent, opener); // Close the dropdown

                    // Assert
                    expect(validate).toHaveBeenCalledExactlyOnceWith(["1"]);
                });

                it("should call onValidate prop", async () => {
                    // Arrange
                    const errorMessage = "error";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            validate={() => errorMessage}
                            onValidate={onValidate}
                        />,
                    );
                    const opener = await screen.findByRole("combobox");
                    await userEvent.click(opener);
                    await userEvent.click(screen.getByText("item 1"));
                    onValidate.mockClear(); // Clear any calls

                    // Act
                    await userEvent.click(opener); // Close the dropdown

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        errorMessage,
                    );
                });

                it("should be in an error state when validation fails", async () => {
                    // Arrange
                    const {userEvent} = doRender(
                        <ControlledMultiSelect validate={() => "Error"} />,
                    );
                    const opener = await screen.findByRole("combobox");
                    await userEvent.click(opener);
                    await userEvent.click(screen.getByText("item 1"));

                    // Act
                    await userEvent.click(opener); // Close the dropdown

                    // Assert
                    expect(opener).toHaveAttribute("aria-invalid", "true");
                });

                it("should be in an error state when validation fails with a custom opener", async () => {
                    // Arrange
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            validate={() => "Error"}
                            opener={() => (
                                <button
                                    aria-label="Search"
                                    onClick={jest.fn()}
                                />
                            )}
                        />,
                    );
                    const opener = await screen.findByLabelText("Search");
                    await userEvent.click(opener);
                    await userEvent.click(screen.getByText("item 1"));

                    // Act
                    await userEvent.click(opener); // Close the dropdown

                    // Assert
                    expect(opener).toHaveAttribute("aria-invalid", "true");
                });
            },
        );

        describe("when selected values are updated and the dropdown isn't closed yet", () => {
            it("should not call validate prop", async () => {
                // Arrange
                const validate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledMultiSelect validate={validate} />,
                );
                const opener = await screen.findByRole("combobox");
                await userEvent.click(opener);

                // Act
                await userEvent.click(screen.getByText("item 1"));

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            it("should call onValidate prop with null to clear any errors", async () => {
                // Arrange
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={() => "Error"}
                        onValidate={onValidate}
                    />,
                );
                const opener = await screen.findByRole("combobox");
                await userEvent.click(opener);

                // Act
                await userEvent.click(screen.getByText("item 1"));

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should not be in an error state", async () => {
                // Arrange
                const {userEvent} = doRender(
                    <ControlledMultiSelect validate={() => "Error"} />,
                );
                const opener = await screen.findByRole("combobox");
                await userEvent.click(opener);

                // Act
                await userEvent.click(screen.getByText("item 1"));

                // Assert
                expect(opener).toHaveAttribute("aria-invalid", "false");
            });
        });

        describe("validation on mount", () => {
            it("should validate twice when first rendered if there is a selected value (once on initalization, once after mount)", () => {
                // Arrange
                const validate = jest.fn();

                // Act
                doRender(
                    <ControlledMultiSelect
                        validate={validate}
                        selectedValues={["1"]}
                    />,
                );
                // Assert
                expect(validate.mock.calls).toStrictEqual([[["1"]], [["1"]]]);
            });

            it("should be in an error state on mount if there is an invalid selected value", async () => {
                // Arrange
                // Act
                doRender(
                    <ControlledMultiSelect
                        validate={(values) => {
                            if (values.includes("1")) {
                                return "Error";
                            }
                        }}
                        selectedValues={["1"]}
                    />,
                );
                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });

            it("should not be in an error state on mount if there is a valid selected value", async () => {
                // Arrange
                // Act
                doRender(
                    <ControlledMultiSelect
                        validate={(values) => {
                            if (values.includes("1")) {
                                return "Error";
                            }
                        }}
                        selectedValues={["2"]}
                    />,
                );
                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });

            it("should not validate on mount if there is no selected value", () => {
                // Arrange
                // Act
                const validate = jest.fn();
                doRender(
                    <ControlledMultiSelect
                        validate={validate}
                        selectedValues={undefined}
                    />,
                );

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            it("should not be in an error state on mount if there is no selected value", async () => {
                // Arrange
                // Act
                doRender(
                    <ControlledMultiSelect
                        validate={() => "Error"}
                        selectedValues={undefined}
                    />,
                );
                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });
        });

        describe("interactions after there is a validation error", () => {
            it("should still be in an error state before values are updated", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                    />,
                );

                // Act
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });

            it("should not be in an error state once values are updated", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                // Act
                await userEvent.click(await screen.findByText("item 2")); // Pick a value

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });

            it("should be in an error state once closed if the new values still includes invalid values", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown
                await userEvent.click(await screen.findByText("item 2")); // Pick a value

                // Act
                await userEvent.click(await screen.findByRole("combobox")); // Close the dropdown

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });

            it("should call onValidate with null once values are updated", async () => {
                // Arrange
                const errorMessage = "Error message";
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                        onValidate={onValidate}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown
                onValidate.mockClear(); // Clear any calls

                // Act
                await userEvent.click(await screen.findByText("item 2")); // Pick a value

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should still be in an error state if an invalid value is unselected and selected again", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                        testId="multi-select"
                    />,
                );
                // Open the dropdown
                await userEvent.click(await screen.findByRole("combobox"));
                // Need to find item text within the listbox since the item text is also used on the opener
                const listbox = await screen.findByRole("listbox", {
                    hidden: true,
                });
                // Unselect the invalid value
                await userEvent.click(
                    await within(listbox).findByText("item 1"),
                );
                // Select the invalid value again
                await userEvent.click(
                    await within(listbox).findByText("item 1"),
                );

                // Act
                // Close the dropdown
                await userEvent.click(await screen.findByRole("combobox"));

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });

            it("should call onValidate with null if values are cleared using the 'select none' shortcut", async () => {
                // Arrange
                const errorMessage = "Error message";
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                        onValidate={onValidate}
                        shortcuts={true}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown
                onValidate.mockClear(); // Clear any calls

                // Act
                await userEvent.click(await screen.findByText("Select none")); // Select none

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should not be in an error state if values are cleared using the 'select none' shortcut", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                        shortcuts={true}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                // Act
                await userEvent.click(await screen.findByText("Select none")); // Select none

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });

            it("should call onValidate with null if values are changed using the 'select all' shortcut", async () => {
                // Arrange
                const errorMessage = "Error message";
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                        onValidate={onValidate}
                        shortcuts={true}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown
                onValidate.mockClear(); // Clear any calls

                // Act
                await userEvent.click(
                    await screen.findByText("Select all (2)"),
                ); // Select all

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
            });

            it("should not be in an error state if values are changed using the 'select all' shortcut", async () => {
                // Arrange
                const errorMessage = "Error message";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        validate={(values) =>
                            values.includes("1") ? errorMessage : undefined
                        }
                        selectedValues={["1"]}
                        shortcuts={true}
                    />,
                );
                await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                // Act
                await userEvent.click(
                    await screen.findByText("Select all (2)"),
                ); // Select all

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "false",
                );
            });
        });

        describe("required", () => {
            describe("tabbing through without picking a value", () => {
                it("should call onValidate prop", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );
                    await userEvent.tab(); // focus on the select

                    // Act
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect required={requiredMessage} />,
                    );
                    await userEvent.tab(); // focus on the select

                    // Act
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(screen.getByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should call onValidate prop with a custom opener", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                            opener={() => (
                                <button
                                    aria-label="Search"
                                    onClick={jest.fn()}
                                />
                            )}
                        />,
                    );
                    await userEvent.tab(); // focus on the select

                    // Act
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state with a custom opener", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            opener={() => (
                                <button
                                    aria-label="Search"
                                    onClick={jest.fn()}
                                />
                            )}
                            required={requiredMessage}
                        />,
                    );
                    await userEvent.tab(); // focus on the select

                    // Act
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(screen.getByLabelText("Search")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should not call onValidate prop if it is disabled", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                            disabled={true}
                        />,
                    );
                    await userEvent.tab(); // focus on the select

                    // Act
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(onValidate).not.toHaveBeenCalled();
                });

                it("should not be in an error state if it is disabled", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            required={requiredMessage}
                            disabled={true}
                        />,
                    );
                    await userEvent.tab(); // focus on the select

                    // Act
                    await userEvent.tab(); // leave the select

                    // Assert
                    expect(screen.getByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "false",
                    );
                });
            });

            describe("opening and closing the dropdown without picking a value", () => {
                it("should call the onValidate prop when it is closed", async () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Close the dropdown

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state when it is closed", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect required={requiredMessage} />,
                    );
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Close the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should not call the onValidate prop when it is only opened", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            required={requiredMessage}
                            onValidate={onValidate}
                        />,
                    );

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Assert
                    expect(onValidate).not.toHaveBeenCalled();
                });

                it("should not be in an error state when it is only opened", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect required={requiredMessage} />,
                    );

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "false",
                    );
                });
            });

            describe("opening and closing the dropdown by pressing escape without picking a value", () => {
                it("should call the onValidate prop", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    const {userEvent} = doRender(
                        <ControlledMultiSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );
                    await userEvent.tab();
                    await userEvent.keyboard("{Enter}"); // Open the dropdown

                    // Act
                    await userEvent.keyboard("{Escape}"); // Close the dropdown

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredMessage,
                    );
                });

                it("should be in an error state", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect required={requiredMessage} />,
                    );
                    await userEvent.tab();
                    await userEvent.keyboard("{Enter}"); // Open the dropdown

                    // Act
                    await userEvent.keyboard("{Escape}"); // Close the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });
            });

            describe("initial render", () => {
                it("should not call onValidate if there is no selected value on the initial render", () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();
                    // Act
                    doRender(
                        <ControlledMultiSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                        />,
                    );

                    // Assert
                    expect(onValidate).not.toHaveBeenCalled();
                });
                it("should call onValidate with null if there is a selected value on the initial render", () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const onValidate = jest.fn();

                    // Act
                    doRender(
                        <ControlledMultiSelect
                            onValidate={onValidate}
                            required={requiredMessage}
                            selectedValues={["1"]}
                        />,
                    );

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
                });
            });

            describe("interactions after there was an error", () => {
                it("should still be in an error state before a value is picked", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect required={requiredMessage} />,
                    );
                    await userEvent.tab();
                    await userEvent.tab(); // Tab through the select to trigger error

                    // Act
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "true",
                    );
                });

                it("should not be in an error state once a value is picked", async () => {
                    // Arrange
                    const requiredMessage = "Required field";
                    const {userEvent} = doRender(
                        <ControlledMultiSelect required={requiredMessage} />,
                    );
                    await userEvent.tab();
                    await userEvent.tab(); // Tab through the select to trigger error
                    await userEvent.click(await screen.findByRole("combobox")); // Open the dropdown

                    // Act
                    await userEvent.click(await screen.findByText("item 1")); // Pick a value

                    // Assert
                    expect(await screen.findByRole("combobox")).toHaveAttribute(
                        "aria-invalid",
                        "false",
                    );
                });
            });

            it("should use the default required error message if required is set to true", async () => {
                // Arrange
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        onValidate={onValidate}
                        required={true}
                    />,
                );
                await userEvent.tab();

                // Act
                await userEvent.tab();

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    "This field is required.",
                );
            });
        });

        describe("validate and required props", () => {
            it("should be in an error state if validate succeeds and required is set", async () => {
                // Arrange
                const requiredMessage = "Required field";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        required={requiredMessage}
                        validate={() => {}}
                        selectedValues={["1"]}
                    />,
                );
                // Open the dropdown
                await userEvent.click(await screen.findByRole("combobox"));

                // Unselect selected option
                const listbox = await screen.findByRole("listbox", {
                    hidden: true,
                });
                await userEvent.click(
                    await within(listbox).findByText("item 1"),
                );

                // Act
                // Close the dropdown
                await userEvent.click(await screen.findByRole("combobox"));

                // Assert
                expect(await screen.findByRole("combobox")).toHaveAttribute(
                    "aria-invalid",
                    "true",
                );
            });

            it("should call the onValidate prop with null and the required error message if validate succeeds and required is set", async () => {
                // Arrange
                const onValidate = jest.fn();
                const requiredMessage = "Required field";
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        onValidate={onValidate}
                        required={requiredMessage}
                        validate={() => {}}
                        selectedValues={["1"]}
                    />,
                );
                // Open the dropdown
                await userEvent.click(await screen.findByRole("combobox"));

                // Unselect selected option
                const listbox = await screen.findByRole("listbox", {
                    hidden: true,
                });
                await userEvent.click(
                    await within(listbox).findByText("item 1"),
                );
                onValidate.mockClear(); // Clear the mock

                // Act
                // Close the dropdown
                await userEvent.click(await screen.findByRole("combobox"));

                // Assert
                expect(onValidate.mock.calls).toStrictEqual([
                    [null], // onValidate is called with null when `validate` is called, this clears any existing errors
                    [requiredMessage], // onValidate is called with the required error message if it is required
                ]);
            });

            it("should call the onValidate prop with the validate error message", async () => {
                // Arrange
                const errorMessage = "Error message";
                const onValidate = jest.fn();
                const {userEvent} = doRender(
                    <ControlledMultiSelect
                        onValidate={onValidate}
                        validate={() => errorMessage}
                        required={true}
                        selectedValues={["1"]}
                    />,
                );
                // Open the dropdown
                await userEvent.click(await screen.findByRole("combobox"));
                // Unselect selected option
                const listbox = await screen.findByRole("listbox", {
                    hidden: true,
                });
                await userEvent.click(
                    await within(listbox).findByText("item 1"),
                );
                onValidate.mockClear(); // Clear the mock

                // Act
                // Close the dropdown
                await userEvent.click(await screen.findByRole("combobox"));

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    errorMessage,
                );
            });
        });
    });
});
