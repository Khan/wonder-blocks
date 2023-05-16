import * as React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import OptionItem from "../option-item";
import DropdownCore from "../dropdown-core";

const items = [
    {
        component: <OptionItem label="item 0" value="0" key="0" />,
        focusable: true,
        populatedProps: {},
    },
    {
        component: <OptionItem label="item 1" value="1" key="1" />,
        focusable: true,
        populatedProps: {},
    },
    {
        component: <OptionItem label="item 2" value="2" key="2" />,
        focusable: true,
        populatedProps: {},
    },
];

describe("DropdownCore", () => {
    it("should throw for invalid role", () => {
        // Arrange
        // Passing an invalid role will throw an error.
        jest.spyOn(console, "error").mockImplementation(() => {});

        // Act
        const underTest = () =>
            render(
                <div>
                    <button data-test-id="external-button" />
                    <DropdownCore
                        initialFocusedIndex={0}
                        // mock the items
                        items={[]}
                        role={"invalid" as any}
                        open={true}
                        // mock the opener elements
                        opener={<button />}
                        onOpenChanged={jest.fn()}
                    />
                </div>,
            );

        // Assert
        expect(underTest).toThrow();
    });

    it("focus on the correct option", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        const item = screen.getByRole("option", {name: "item 0"});

        // Assert
        expect(item).toHaveFocus();
    });

    it("handles basic keyboard navigation as expected", () => {
        // Arrange
        const dummyOpener = <button />;
        const openChanged = jest.fn();

        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={dummyOpener}
                onOpenChanged={openChanged}
            />,
        );

        // Act
        // navigate down two times
        userEvent.keyboard("{arrowdown}"); // 0 -> 1
        userEvent.keyboard("{arrowdown}"); // 1 -> 2

        // Assert
        expect(screen.getByRole("option", {name: "item 2"})).toHaveFocus();
    });

    it("keyboard works backwards as expected", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
                isFilterable={false}
            />,
        );

        // Act
        // navigate down tree times
        userEvent.keyboard("{arrowdown}"); // 0 -> 1
        userEvent.keyboard("{arrowdown}"); // 1 -> 2
        userEvent.keyboard("{arrowdown}"); // 2 -> 0

        // navigate up back two times
        userEvent.keyboard("{arrowup}"); // 0 -> 2
        userEvent.keyboard("{arrowup}"); // 2 -> 1

        // Assert
        expect(screen.getByRole("option", {name: "item 1"})).toHaveFocus();
    });

    it("keyboard works backwards with the search field included", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={0}
                onSearchTextChanged={jest.fn()}
                searchText=""
                isFilterable={true}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // navigate down four times
        userEvent.keyboard("{arrowdown}"); // 0 -> 1
        userEvent.keyboard("{arrowdown}"); // 1 -> 2
        userEvent.keyboard("{arrowdown}"); // 2 -> search field
        userEvent.keyboard("{arrowdown}"); // search field -> 0

        // navigate up back three times
        userEvent.keyboard("{arrowup}"); // 0 -> search field
        userEvent.keyboard("{arrowup}"); // search field -> 2
        userEvent.keyboard("{arrowup}"); // 2 -> 1

        // Assert
        expect(screen.getByRole("option", {name: "item 1"})).toHaveFocus();
    });

    it("closes on tab as expected", () => {
        // Arrange
        const handleOpenChangedMock = jest.fn();

        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        // Act
        // close the dropdown by tabbing out
        userEvent.tab();

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, false);
    });

    it("closes on escape as expected", () => {
        // Arrange
        const handleOpenChangedMock = jest.fn();

        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        // Act
        // close the dropdown by pressing "Escape"
        userEvent.keyboard("{escape}");

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, false);
    });

    it("closes on external mouse click", () => {
        // Arrange
        const handleOpenChangedMock = jest.fn();

        const {container} = render(
            <div>
                <button data-test-id="external-button" />
                <DropdownCore
                    initialFocusedIndex={0}
                    // mock the items
                    items={items}
                    role="listbox"
                    open={true}
                    // mock the opener elements
                    opener={<button />}
                    onOpenChanged={handleOpenChangedMock}
                />
            </div>,
        );

        // Act
        // close the dropdown by clicking outside the dropdown
        userEvent.click(container);

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, false);
    });

    it("doesn't close on external mouse click if already closed", () => {
        // Arrange
        const handleOpenChangedMock = jest.fn();

        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={items}
                role="listbox"
                open={false}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        // Act
        // click outside the dropdown
        userEvent.click(document.body);

        // Assert
        expect(handleOpenChangedMock).toHaveBeenCalledTimes(0);
    });

    it("opens on down key as expected", () => {
        // Arrange
        const handleOpenChangedMock = jest.fn();
        const opener = <button data-test-id="opener" />;

        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={items}
                role="listbox"
                open={false}
                // mock the opener elements
                opener={opener}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        const openerElement = screen.getByRole("button");
        openerElement.focus();

        // Act
        userEvent.keyboard("{arrowdown}");

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, true);
    });

    it("selects correct item when starting off at an undefined index", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={undefined}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Assert
        expect(screen.getByRole("option", {name: "item 0"})).toHaveFocus();
    });

    it("selects correct item when starting off at a different index and a searchbox", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={1}
                searchText=""
                isFilterable={true}
                // mock the items
                items={[
                    {
                        component: (
                            <OptionItem label="item 1" value="1" key="1" />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem label="item 2" value="2" key="2" />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        const firstItem = screen.getByRole("option", {name: "item 2"});

        // Assert
        expect(firstItem).toHaveFocus();
    });

    it("selects correct item when starting off at a different index", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={2}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // navigate down
        userEvent.keyboard("{arrowdown}"); // 2 -> 0

        // Assert
        expect(screen.getByRole("option", {name: "item 0"})).toHaveFocus();
    });

    it("focuses correct item with clicking/pressing with initial focused of not 0", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={2}
                // mock the items
                items={items}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        userEvent.click(screen.getByRole("option", {name: "item 1"}));
        // navigate down
        userEvent.keyboard("{arrowdown}"); // 1 -> 2

        // Assert
        expect(screen.getByRole("option", {name: "item 2"})).toHaveFocus();
    });

    it("focuses correct item with a disabled item", () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={[
                    {
                        component: (
                            <OptionItem label="item 0" value="0" key="0" />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                label="item 1"
                                value="1"
                                key="1"
                                disabled={true}
                            />
                        ),
                        focusable: false,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem label="item 2" value="2" key="2" />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button data-test-id="opener" />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // navigate down
        userEvent.keyboard("{arrowdown}"); // 0 -> 2 (1 is disabled)

        // Assert
        expect(screen.getByRole("option", {name: "item 2"})).toHaveFocus();
    });

    it("calls correct onclick for an option item", () => {
        // Arrange
        const onClick1 = jest.fn();
        render(
            <DropdownCore
                initialFocusedIndex={0}
                // mock the items
                items={[
                    {
                        component: (
                            <OptionItem label="item 0" value="0" key="0" />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                label="item 1"
                                value="1"
                                key="1"
                                onClick={onClick1}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem label="item 2" value="2" key="2" />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        userEvent.click(screen.getByRole("option", {name: "item 1"}));

        // Assert
        expect(onClick1).toHaveBeenCalledTimes(1);
    });

    it("Displays no results when no items are left with filter", () => {
        // Arrange
        const handleSearchTextChanged = jest.fn();

        // Act
        render(
            <DropdownCore
                onSearchTextChanged={handleSearchTextChanged}
                searchText="ab"
                isFilterable={true}
                items={[]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Assert
        expect(screen.getByText("No results")).toBeInTheDocument();
    });

    it("SearchField should be focused when opened and there's no selection", () => {
        // Arrange

        // Act
        render(
            <DropdownCore
                initialFocusedIndex={undefined}
                onOpenChanged={jest.fn()}
                onSearchTextChanged={jest.fn()}
                searchText="ab"
                isFilterable={true}
                items={[]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
            />,
        );

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("SearchField should trigger change when the user types in", () => {
        // Arrange
        const onSearchTextChangedMock = jest.fn();

        render(
            <DropdownCore
                initialFocusedIndex={undefined}
                onOpenChanged={jest.fn()}
                onSearchTextChanged={onSearchTextChangedMock}
                searchText=""
                isFilterable={true}
                items={[]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
            />,
        );

        // Act
        const searchField = screen.getByRole("textbox");
        userEvent.type(searchField, "option 1");

        // Assert
        expect(onSearchTextChangedMock).toHaveBeenCalled();
    });

    it("When SearchField has input and focused, tab key should not close the select", async () => {
        // Arrange
        const handleOpen = jest.fn();

        render(
            <DropdownCore
                onOpenChanged={handleOpen}
                onSearchTextChanged={jest.fn()}
                searchText="ab"
                isFilterable={true}
                items={[]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
            />,
        );

        // Act
        userEvent.tab();

        // Assert
        expect(handleOpen).toHaveBeenCalledTimes(0);
        await waitFor(() => {
            expect(
                screen.getByRole("button", {name: "Clear search"}),
            ).toHaveFocus();
        });
    });

    it("When SearchField exists and focused, space key pressing should be allowed", () => {
        // Arrange
        const preventDefaultMock = jest.fn();

        render(
            <DropdownCore
                onSearchTextChanged={jest.fn()}
                searchText="ab"
                isFilterable={true}
                items={[]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        const searchInput = screen.getByRole("textbox");
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyDown(searchInput, {
            keyCode: 32,
            preventDefault: preventDefaultMock,
        });
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.keyUp(searchInput, {
            keyCode: 32,
            preventDefault: preventDefaultMock,
        });

        // Assert
        expect(preventDefaultMock).toHaveBeenCalledTimes(0);
    });

    describe("VirtualizedList", () => {
        const optionItems = new Array(200).fill(null).map((_: any, i: any) => ({
            component: (
                <OptionItem
                    key={i}
                    value={(i + 1).toString()}
                    label={`Fruit # ${i + 1}`}
                    testId={`item-${i}`}
                />
            ),
            focusable: true,
            populatedProps: {},
        }));

        it("should render a virtualized list of options and focus on the search field", async () => {
            // Arrange
            render(
                <DropdownCore
                    initialFocusedIndex={undefined}
                    onSearchTextChanged={jest.fn()}
                    searchText=""
                    isFilterable={true}
                    // mock the items
                    items={optionItems}
                    role="listbox"
                    open={true}
                    // mock the opener elements
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            await screen.findByRole("listbox");

            // Act
            const searchField = await screen.findByPlaceholderText("Filter");

            // Assert
            await waitFor(() => {
                expect(searchField).toHaveFocus();
            });
        });

        it("should focus on the item after clicking on it", async () => {
            // Arrange
            render(
                <DropdownCore
                    initialFocusedIndex={undefined}
                    onSearchTextChanged={jest.fn()}
                    searchText=""
                    isFilterable={true}
                    // mock the items
                    items={optionItems}
                    role="listbox"
                    open={true}
                    // mock the opener elements
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            await screen.findByRole("listbox");

            // Act
            const item = await screen.findByTestId("item-1");
            userEvent.click(item);

            // Assert
            await waitFor(() => {
                expect(item).toHaveFocus();
            });
        });
    });

    describe("a11y > Live region", () => {
        it("should render a live region announcing the number of options", () => {
            // Arrange

            // Act
            const {container} = render(
                <DropdownCore
                    initialFocusedIndex={undefined}
                    onSearchTextChanged={jest.fn()}
                    // mock the items (3 options)
                    items={items}
                    role="listbox"
                    open={true}
                    // mock the opener elements
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Assert
            expect(container).toHaveTextContent("3 items");
        });
    });
});
