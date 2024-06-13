/* eslint-disable no-constant-condition */
/* eslint-disable max-lines */
import * as React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {
    userEvent as ue,
    PointerEventsCheckLevel,
} from "@testing-library/user-event";

import {ngettext} from "@khanacademy/wonder-blocks-i18n";

import OptionItem from "../option-item";
import MultiSelect from "../multi-select";
import {defaultLabels as builtinLabels} from "../../util/constants";

import type {Labels} from "../multi-select";

const doRender = (element: React.ReactElement) => {
    return {
        ...render(element),
        userEvent: ue.setup({
            advanceTimers: jest.advanceTimersByTime,
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        }),
    };
};

const defaultLabels: Labels = {
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
            await userEvent.click(await screen.findByRole("button"));

            // Assert
            expect(
                await screen.findByRole("listbox", {hidden: true}),
            ).toBeInTheDocument();
        });

        // TODO(FEI-5533): Key press events aren't working correctly with
        // user-event v14. We need to investigate and fix this.
        it.skip("closes the select on {escape}", async () => {
            // Arrange
            const {userEvent} = doRender(uncontrolledMultiSelect);

            await userEvent.tab();
            await userEvent.keyboard("{enter}"); // open

            // Act
            await userEvent.keyboard("{escape}");

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
            const opener = await screen.findByRole("button");

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
            expect(await screen.findByRole("button")).toHaveTextContent(
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
            expect(await screen.findByRole("button")).toHaveTextContent(
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
            expect(await screen.findByRole("button")).toHaveTextContent(
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
            expect(await screen.findByRole("button")).toHaveTextContent(
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
            expect(await screen.findByRole("button")).toHaveTextContent(
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
            expect(await screen.findByRole("button")).toHaveTextContent(
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
            const opener = await screen.findByRole("button");

            // Assert
            expect(opener).toHaveAttribute("data-testid", "some-test-id");
        });
    });

    describe("Controlled component", () => {
        type Props = {
            opened?: boolean;
            onToggle?: (opened: boolean) => unknown;
            shortcuts?: boolean;
        };

        const labels: Labels = {
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

        // NOTE(john): After upgrading to user-event v14 this test is failing.
        // We are unale to find the option with the specified text, even though
        // it exists in the document.
        it.skip("selects on item as expected", async () => {
            // Arrange
            const {userEvent} = doRender(<ControlledComponent />);

            const opener = await screen.findByTestId("multi-select-opener");
            await userEvent.click(opener);

            // Act
            // Grab the second item in the list
            const item = screen.getByRole("option", {
                name: "item 2",
                hidden: true,
            });
            userEvent.click(item);

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

            const opener = await screen.findByRole("button");
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
            await userEvent.click(await screen.findByRole("button"));

            // Act
            const searchInput = await screen.findByPlaceholderText("Filter");

            // Assert
            expect(searchInput).toBeInTheDocument();
        });

        it("displays SearchTextInput with dismiss button when search text exists", async () => {
            // Arrange
            const {userEvent} = doRender(filterableMultiSelect);
            // open the dropdown menu
            await userEvent.click(await screen.findByRole("button"));

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
            await userEvent.click(await screen.findByRole("button"));

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
            await userEvent.click(await screen.findByRole("button"));

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
            await userEvent.click(await screen.findByRole("button"));

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
            await userEvent.click(await screen.findByRole("button"));

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
            await userEvent.click(await screen.findByRole("button"));

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

            await userEvent.click(await screen.findByRole("button"));

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

        // NOTE(john): This isn't working after upgrading to user-event v14,
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
            await userEvent.click(await screen.findByRole("button"));

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
            await userEvent.click(await screen.findByRole("button"));

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
            const opener = await screen.findByRole("button");
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
            const labels: Labels = {
                ...builtinLabels,
                someSelected: (numOptions: number): string =>
                    ngettext("%(num)s planet", "%(num)s planets", numOptions),
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

        // NOTE(john): After upgrading to user-event v14, this test is failing.
        // The Venus option is still in the document.
        it.skip("should filter out an option if it's not part of the results", async () => {
            // Arrange
            const labels: Labels = {
                ...builtinLabels,
                someSelected: (numOptions: number): string =>
                    ngettext("%(num)s planet", "%(num)s planets", numOptions),
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

        it("passes the current label to the custom opener (no items selected)", async () => {
            // Arrange
            const labels: Labels = {
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

        it("passes the current label to the custom opener (1 item selected)", async () => {
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

        it("passes the current label to the custom opener (2 items selected)", async () => {
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

        it("passes the current label to the custom opener (all items selected)", async () => {
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

    describe("Custom labels", () => {
        it("passes the custom label to the opener", async () => {
            // Arrange
            const labels: Labels = {
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
            const labels: Labels = {
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

        it("passes the custom label to the opener (all items selected)", async () => {
            // Arrange
            const labels: Labels = {
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
            const labels: Labels = {
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
            const dismissIcon = await screen.findByLabelText(
                "Limpiar busqueda",
            );

            // Assert
            expect(dismissIcon).toBeInTheDocument();
        });

        it("passes the custom label to the search input field", async () => {
            // Arrange
            const labels: Labels = {
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

        it("passes the custom label to the no results label", async () => {
            // Arrange
            const labels: Labels = {
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
            const labels: Labels = {
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
            const labels: Labels = {
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
            const initialLabels: Labels = {
                ...defaultLabels,
                selectNoneLabel: "Deseleccionar todas las escuelas",
            };

            const TranslatedComponent = ({labels}: {labels: Labels}) => (
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
            const updatedLabels: Labels = {
                ...defaultLabels,
                selectNoneLabel: "Ninguna seleccionada",
            };

            rerender(<TranslatedComponent labels={updatedLabels} />);

            // Act
            const opener = await screen.findByRole("button");
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
        it("should announce the number of options when the listbox is open", async () => {
            // Arrange
            const labels: Labels = {
                ...builtinLabels,
                someSelected: (numOptions: number): string =>
                    ngettext("%(num)s school", "%(num)s schools", numOptions),
            };

            // Act
            const {container} = doRender(
                <MultiSelect
                    onChange={jest.fn()}
                    isFilterable={true}
                    labels={labels}
                    opened={true}
                >
                    <OptionItem label="school 1" value="1" />
                    <OptionItem label="school 2" value="2" />
                    <OptionItem label="school 3" value="3" />
                </MultiSelect>,
            );

            // Assert
            expect(container).toHaveTextContent("3 schools");
        });

        // NOTE(john): This fails after upgrading to user-event v14. The text
        // output is now: "2 planets0 items".
        it.skip("should change the number of options after using the search filter", async () => {
            // Arrange
            const labels: Labels = {
                ...builtinLabels,
                someSelected: (numOptions: number): string =>
                    ngettext("%(num)s planet", "%(num)s planets", numOptions),
            };

            const {container, userEvent} = doRender(
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
            await waitFor(() => {
                expect(container).toHaveTextContent("1 planet");
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
            const button = await screen.findByRole("button");
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
            const button = await screen.findByRole("button");
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
});
