// We allow raw buttons in this test since DropdownCore is a low-level component.
import * as React from "react";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import ActionItem from "../action-item";
import OptionItem from "../option-item";
import SeparatorItem from "../separator-item";
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

// Returns `items` with the item at `disabledIndex` made non-focusable (as if it
// were disabled).
const itemsWithDisabled = (disabledIndex: number) =>
    items.map((item, index) => ({
        ...item,
        focusable: index !== disabledIndex,
    }));

describe("DropdownCore", () => {
    it("should throw for invalid role", async () => {
        // Arrange
        // Passing an invalid role will throw an error.
        jest.spyOn(console, "error").mockImplementation(() => {});

        // Act
        const underTest = () =>
            render(
                <div>
                    <button data-testid="external-button" />
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

    it("focus on the correct option", async () => {
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
        const item = await screen.findByRole("option", {name: "item 0"});

        // Assert
        expect(item).toHaveFocus();
    });

    it("handles basic keyboard navigation as expected", async () => {
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
        await userEvent.keyboard("{ArrowDown}"); // 0 -> 1
        await userEvent.keyboard("{ArrowDown}"); // 1 -> 2

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 2"}),
        ).toHaveFocus();
    });

    it("keyboard works backwards as expected", async () => {
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
        await userEvent.keyboard("{ArrowDown}"); // 0 -> 1
        await userEvent.keyboard("{ArrowDown}"); // 1 -> 2
        await userEvent.keyboard("{ArrowDown}"); // 2 -> 0

        // navigate up back two times
        await userEvent.keyboard("{ArrowUp}"); // 0 -> 2
        await userEvent.keyboard("{ArrowUp}"); // 2 -> 1

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 1"}),
        ).toHaveFocus();
    });

    it("keyboard works backwards with the search field included", async () => {
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
        await userEvent.keyboard("{ArrowDown}"); // 0 -> 1
        await userEvent.keyboard("{ArrowDown}"); // 1 -> 2
        await userEvent.keyboard("{ArrowDown}"); // 2 -> search field
        await userEvent.keyboard("{ArrowDown}"); // search field -> 0

        // navigate up back three times
        await userEvent.keyboard("{ArrowUp}"); // 0 -> search field
        await userEvent.keyboard("{ArrowUp}"); // search field -> 2
        await userEvent.keyboard("{ArrowUp}"); // 2 -> 1

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 1"}),
        ).toHaveFocus();
    });

    it("navigates from search field to items when search field is initially focused", async () => {
        // Arrange
        // Don't set initialFocusedIndex so focus goes to search field
        render(
            <DropdownCore
                onSearchTextChanged={jest.fn()}
                searchText=""
                isFilterable={true}
                items={items}
                role="listbox"
                open={true}
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // Verify search field has focus initially
        const searchField = await screen.findByRole("textbox");
        expect(searchField).toHaveFocus();

        // Navigate down from search field to first item
        await userEvent.keyboard("{ArrowDown}");

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 0"}),
        ).toHaveFocus();
    });

    it("navigates from search field to last item with ArrowUp", async () => {
        // Arrange
        render(
            <DropdownCore
                onSearchTextChanged={jest.fn()}
                searchText=""
                isFilterable={true}
                items={items}
                role="listbox"
                open={true}
                opener={<button />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        const searchField = await screen.findByRole("textbox");
        expect(searchField).toHaveFocus();

        // Navigate up from search field to last item
        await userEvent.keyboard("{ArrowUp}");

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 2"}),
        ).toHaveFocus();
    });

    // NOTE(john): This fails after upgrading to user-event v14, it's not clear
    // what's wrong exactly, but tabbing no longer triggers the change, which
    // makes me think that the initial focus is different now.
    it("closes on tab as expected", async () => {
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
        await userEvent.tab();

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, false);
    });

    it("closes on escape as expected", async () => {
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
        await userEvent.keyboard("{Escape}");

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, false);
    });

    it("closes on external mouse click", async () => {
        // Arrange
        const handleOpenChangedMock = jest.fn();

        const {container} = render(
            <div>
                <button data-testid="external-button" />
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
        await userEvent.click(container);

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, false);
    });

    it("doesn't close on external mouse click if already closed", async () => {
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
        await userEvent.click(document.body);

        // Assert
        expect(handleOpenChangedMock).toHaveBeenCalledTimes(0);
    });

    it("opens on down key as expected", async () => {
        // Arrange
        const handleOpenChangedMock = jest.fn();
        const opener = <button data-testid="opener" />;

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

        const openerElement = await screen.findByRole("button");
        openerElement.focus();

        // Act
        await userEvent.keyboard("{ArrowDown}");

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, true);
    });

    it("selects correct item when starting off at an undefined index", async () => {
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
        expect(
            await screen.findByRole("option", {name: "item 0"}),
        ).toHaveFocus();
    });

    it("selects correct item when starting off at a different index and a searchbox", async () => {
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
        const firstItem = await screen.findByRole("option", {name: "item 2"});

        // Assert
        expect(firstItem).toHaveFocus();
    });

    it("selects correct item when starting off at a different index", async () => {
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
        await userEvent.keyboard("{ArrowDown}"); // 2 -> 0

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 0"}),
        ).toHaveFocus();
    });

    it("focuses correct item with clicking/pressing with initial focused of not 0", async () => {
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
        await userEvent.click(
            await screen.findByRole("option", {name: "item 1"}),
        );
        // navigate down
        await userEvent.keyboard("{ArrowDown}"); // 1 -> 2

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 2"}),
        ).toHaveFocus();
    });

    it("focuses correct item with a disabled item", async () => {
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
                opener={<button data-testid="opener" />}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // navigate down
        await userEvent.keyboard("{ArrowDown}"); // 0 -> 2 (1 is disabled)

        // Assert
        expect(
            await screen.findByRole("option", {name: "item 2"}),
        ).toHaveFocus();
    });

    it("calls correct onclick for an option item", async () => {
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
        await userEvent.click(
            await screen.findByRole("option", {name: "item 1"}),
        );

        // Assert
        expect(onClick1).toHaveBeenCalledTimes(1);
    });

    it("Displays no results when no items are left with filter", async () => {
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
        expect(await screen.findByText("No results")).toBeInTheDocument();
    });

    it("SearchField should be focused when opened and there's no selection", async () => {
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
        expect(await screen.findByRole("textbox")).toHaveFocus();
    });

    it("SearchField should trigger change when the user types in", async () => {
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
        const searchField = await screen.findByRole("textbox");
        await userEvent.type(searchField, "option 1");

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
        await userEvent.tab();

        // Assert
        expect(handleOpen).toHaveBeenCalledTimes(0);
        await waitFor(async () => {
            expect(
                await screen.findByRole("button", {name: "Clear search"}),
            ).toHaveFocus();
        });
    });

    it("When SearchField exists and focused, space key pressing should be allowed", async () => {
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
        const searchInput = await screen.findByRole("textbox");
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
            const item = await screen.findByRole("option", {name: "Fruit # 2"});
            await userEvent.click(item);

            // Assert
            await waitFor(() => {
                expect(item).toHaveFocus();
            });
        });
    });

    describe("focus timeout behavior for ARIA performance", () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it("should delay focus by 1ms when navigating to next item", async () => {
            // Arrange
            const focusSpy = jest.spyOn(HTMLElement.prototype, "focus");
            render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            focusSpy.mockClear();

            // Act
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            await user.keyboard("{ArrowDown}");
            // Assert
            await waitFor(() => {
                expect(focusSpy).toHaveBeenCalled();
            });
            focusSpy.mockRestore();
        });
    });

    describe("onOpenChanged", () => {
        it("Should be triggered when the down key is pressed and the menu is closed", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <DropdownCore
                    initialFocusedIndex={undefined}
                    onSearchTextChanged={jest.fn()}
                    // mock the items (3 options)
                    items={items}
                    role="listbox"
                    open={false}
                    // mock the opener elements
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
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
            expect(onOpenMock).toHaveBeenCalledTimes(1);
            expect(onOpenMock).toHaveBeenCalledWith(true);
        });

        it("Should not be triggered when the dropdown is disabled and the down key is pressed and the menu is closed", async () => {
            // Arrange
            const onOpenMock = jest.fn();

            render(
                <DropdownCore
                    initialFocusedIndex={undefined}
                    onSearchTextChanged={jest.fn()}
                    // mock the items (3 options)
                    items={items}
                    role="listbox"
                    open={false}
                    // mock the opener elements
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                    disabled={true}
                />,
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
            expect(onOpenMock).toHaveBeenCalledTimes(0);
        });

        it("should return focus to the opener element when closed with Escape", async () => {
            // Arrange
            const props = {
                initialFocusedIndex: 0,
                items,
                role: "listbox",
                open: true,
                opener: <button>opener</button>,
                onOpenChanged: jest.fn(),
            } as const;
            const {rerender} = render(<DropdownCore {...props} />);
            const openerElement = await screen.findByRole("button", {
                name: "opener",
            });
            rerender(<DropdownCore {...props} openerElement={openerElement} />);

            // Act
            await userEvent.keyboard("{Escape}");

            // Assert
            expect(openerElement).toHaveFocus();
        });

        it("should not be triggered when clicking on the opener while open", async () => {
            // Arrange
            const onOpenMock = jest.fn();
            render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button>opener</button>}
                    onOpenChanged={onOpenMock}
                />,
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "opener"}),
            );

            // Assert
            expect(onOpenMock).not.toHaveBeenCalled();
        });

        it("should not be triggered when clicking on an item inside the dropdown", async () => {
            // Arrange
            const onOpenMock = jest.fn();
            render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );

            // Act
            await userEvent.click(
                await screen.findByRole("option", {name: "item 1"}),
            );

            // Assert
            expect(onOpenMock).not.toHaveBeenCalled();
        });

        it("should be triggered on external mouse click after the menu is opened via props", async () => {
            // Arrange
            const onOpenMock = jest.fn();
            const {rerender} = render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={false}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );
            rerender(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );

            // Act
            await userEvent.click(document.body);

            // Assert
            expect(onOpenMock).toHaveBeenCalledExactlyOnceWith(false);
        });

        it("should not be triggered on external mouse click after the menu is closed via props", async () => {
            // Arrange
            const onOpenMock = jest.fn();
            const {rerender} = render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );
            rerender(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={false}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );

            // Act
            await userEvent.click(document.body);

            // Assert
            expect(onOpenMock).not.toHaveBeenCalled();
        });

        it("should not be triggered on external mouse click after unmounting", async () => {
            // Arrange
            const onOpenMock = jest.fn();
            const {unmount} = render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );
            unmount();

            // Act
            await userEvent.click(document.body);

            // Assert
            expect(onOpenMock).not.toHaveBeenCalled();
        });
    });

    describe("focus when opening", () => {
        it("should focus the initial item when the menu is opened via props", async () => {
            // Arrange
            const {rerender} = render(
                <DropdownCore
                    initialFocusedIndex={1}
                    items={items}
                    role="listbox"
                    open={false}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Act
            rerender(
                <DropdownCore
                    initialFocusedIndex={1}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Assert
            expect(
                await screen.findByRole("option", {name: "item 1"}),
            ).toHaveFocus();
        });

        describe("with fake timers", () => {
            beforeEach(() => {
                jest.useFakeTimers();
            });

            afterEach(() => {
                jest.useRealTimers();
            });

            it("should not focus any item when autoFocus is false", async () => {
                // Arrange

                // Act
                render(
                    <DropdownCore
                        autoFocus={false}
                        initialFocusedIndex={0}
                        items={items}
                        role="listbox"
                        open={true}
                        opener={<button />}
                        onOpenChanged={jest.fn()}
                    />,
                );
                act(() => {
                    jest.runAllTimers();
                });

                // Assert
                expect(document.body).toHaveFocus();
            });
        });
    });

    describe("when the focusable items change while open", () => {
        it("should continue keyboard navigation from the focused item when a different item stops being focusable", async () => {
            // Arrange
            const {rerender} = render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            await userEvent.keyboard("{ArrowDown}"); // 0 -> 1
            rerender(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={itemsWithDisabled(0)}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Act
            await userEvent.keyboard("{ArrowDown}"); // 1 -> 2

            // Assert
            await waitFor(async () => {
                expect(
                    await screen.findByRole("option", {name: "item 2"}),
                ).toHaveFocus();
            });
        });

        it("should focus the first focusable item when the focused item stops being focusable", async () => {
            // Arrange
            const {rerender} = render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            await userEvent.keyboard("{ArrowDown}"); // 0 -> 1

            // Act
            rerender(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={itemsWithDisabled(1)}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Assert
            await waitFor(async () => {
                expect(
                    await screen.findByRole("option", {name: "item 0"}),
                ).toHaveFocus();
            });
        });

        it("should let keyboard navigation reach an item added while open", async () => {
            // Arrange
            const itemsWithExtra = [
                ...items,
                {
                    component: <OptionItem label="item 3" value="3" key="3" />,
                    focusable: true,
                    populatedProps: {},
                },
            ];
            const {rerender} = render(
                <DropdownCore
                    initialFocusedIndex={2}
                    items={items}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            rerender(
                <DropdownCore
                    initialFocusedIndex={2}
                    items={itemsWithExtra}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Act
            await userEvent.keyboard("{ArrowDown}"); // 2 -> 3

            // Assert
            expect(
                await screen.findByRole("option", {name: "item 3"}),
            ).toHaveFocus();
        });
    });

    describe("type-ahead", () => {
        const fruitItems = ["apple", "banana", "cherry"].map((fruit) => ({
            component: <OptionItem label={fruit} value={fruit} key={fruit} />,
            focusable: true,
            populatedProps: {},
        }));

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            act(() => {
                jest.runOnlyPendingTimers();
            });
            jest.useRealTimers();
        });

        it("should focus the item that starts with the typed characters", async () => {
            // Arrange
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={fruitItems}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            await user.keyboard("ch");

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.getByRole("option", {name: "cherry"})).toHaveFocus();
        });

        it("should not move focus when no item starts with the typed characters", async () => {
            // Arrange
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    initialFocusedIndex={1}
                    items={fruitItems}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            act(() => {
                jest.runOnlyPendingTimers();
            });
            await user.keyboard("z");

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.getByRole("option", {name: "banana"})).toHaveFocus();
        });

        it("should not move focus when enableTypeAhead is false", async () => {
            // Arrange
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    enableTypeAhead={false}
                    initialFocusedIndex={0}
                    items={fruitItems}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            act(() => {
                jest.runOnlyPendingTimers();
            });
            await user.keyboard("ch");

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(screen.getByRole("option", {name: "apple"})).toHaveFocus();
        });

        it("should not match items that aren't options when typing", async () => {
            // Arrange
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    initialFocusedIndex={1}
                    items={[
                        {
                            component: <ActionItem label="apple" key="apple" />,
                            focusable: true,
                            populatedProps: {},
                        },
                        ...fruitItems.slice(1),
                    ]}
                    role="menu"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            act(() => {
                jest.runOnlyPendingTimers();
            });
            await user.keyboard("a");

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(
                screen.getByRole("menuitem", {name: "banana"}),
            ).toHaveFocus();
        });

        it("should call onOpenChanged(true) when a letter matching an item is typed while closed", async () => {
            // Arrange
            const letterMatchingAnItem = "b";
            const onOpenMock = jest.fn();
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    items={fruitItems}
                    role="listbox"
                    open={false}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );
            screen.getByRole("button").focus();
            await user.keyboard(letterMatchingAnItem);

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(onOpenMock).toHaveBeenCalledWith(true);
        });

        it("should not call onOpenChanged when a letter matching no item is typed while closed", async () => {
            // Arrange
            const letterMatchingNoItem = "z";
            const onOpenMock = jest.fn();
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    items={fruitItems}
                    role="listbox"
                    open={false}
                    opener={<button />}
                    onOpenChanged={onOpenMock}
                />,
            );
            screen.getByRole("button").focus();
            await user.keyboard(letterMatchingNoItem);

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect(onOpenMock).not.toHaveBeenCalled();
        });

        // NOTE: This pins the current behavior. The code intends to also
        // select the matching item for single selection, but the item refs
        // don't exist yet while the menu is closed, so it only opens the menu.
        it("should only open the menu and not select the matching item when typing while closed", async () => {
            // Arrange
            const onOpenMock = jest.fn();
            const onItemClick = jest.fn();
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            const ControlledDropdown = () => {
                const [open, setOpen] = React.useState(false);
                return (
                    <DropdownCore
                        items={fruitItems.map((item) => ({
                            ...item,
                            populatedProps: {onClick: onItemClick},
                        }))}
                        role="listbox"
                        open={open}
                        opener={<button />}
                        onOpenChanged={(isOpen) => {
                            onOpenMock(isOpen);
                            setOpen(isOpen);
                        }}
                    />
                );
            };
            render(<ControlledDropdown />);
            screen.getByRole("button").focus();
            await user.keyboard("b");

            // Act
            act(() => {
                jest.runAllTimers();
            });

            // Assert
            expect({
                onOpenChangedCalls: onOpenMock.mock.calls,
                itemClicked: onItemClick.mock.calls.length > 0,
            }).toEqual({onOpenChangedCalls: [[true]], itemClicked: false});
        });
    });

    // NOTE: These pin the current behavior. Changes to the `labels` prop are
    // only merged into the search field labels when the set of focusable items
    // also changes while the menu is open. When there are no focusable items
    // (e.g. no results), that check always passes, so the labels always update.
    describe("when the labels prop changes while open", () => {
        const labelsA = {
            clearSearch: "Clear A",
            filter: "Filter A",
            noResults: "No results A",
            someResults: (numOptions: number) => `${numOptions} results A`,
        };
        const labelsB = {
            clearSearch: "Clear B",
            filter: "Filter B",
            noResults: "No results B",
            someResults: (numOptions: number) => `${numOptions} results B`,
        };
        const baseProps = {
            onSearchTextChanged: jest.fn(),
            searchText: "",
            isFilterable: true,
            role: "listbox",
            open: true,
            opener: <button />,
            onOpenChanged: jest.fn(),
        } as const;

        it("should keep the initial search field labels when the focusable items don't change", async () => {
            // Arrange
            const {rerender} = render(
                <DropdownCore {...baseProps} items={items} labels={labelsA} />,
            );

            // Act
            rerender(
                <DropdownCore {...baseProps} items={items} labels={labelsB} />,
            );

            // Assert
            expect(
                await screen.findByPlaceholderText("Filter A"),
            ).toBeInTheDocument();
        });

        it("should update the search field labels when the focusable items also change", async () => {
            // Arrange
            const {rerender} = render(
                <DropdownCore {...baseProps} items={items} labels={labelsA} />,
            );

            // Act
            rerender(
                <DropdownCore
                    {...baseProps}
                    items={itemsWithDisabled(0)}
                    labels={labelsB}
                />,
            );

            // Assert
            expect(
                await screen.findByPlaceholderText("Filter B"),
            ).toBeInTheDocument();
        });

        it("should update the no results message", async () => {
            // Arrange
            const {rerender} = render(
                <DropdownCore {...baseProps} items={[]} labels={labelsA} />,
            );

            // Act
            rerender(
                <DropdownCore {...baseProps} items={[]} labels={labelsB} />,
            );

            // Assert
            expect(await screen.findByText("No results B")).toBeInTheDocument();
        });
    });

    describe("rendering", () => {
        it("should render the items with the menuitem role when role is menu", async () => {
            // Arrange

            // Act
            render(
                <DropdownCore
                    items={items}
                    role="menu"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Assert
            expect(await screen.findAllByRole("menuitem")).toHaveLength(3);
        });

        describe("custom labels", () => {
            const customLabels = {
                clearSearch: "Clear the fruit search",
                filter: "Search fruits",
                noResults: "Nothing here",
                someResults: (numOptions: number) => `${numOptions} fruits`,
            };

            it("should use the filter label as the search field placeholder", async () => {
                // Arrange

                // Act
                render(
                    <DropdownCore
                        labels={customLabels}
                        onSearchTextChanged={jest.fn()}
                        searchText=""
                        isFilterable={true}
                        items={items}
                        role="listbox"
                        open={true}
                        opener={<button />}
                        onOpenChanged={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    await screen.findByPlaceholderText("Search fruits"),
                ).toBeInTheDocument();
            });

            it("should use the noResults label when there are no items", async () => {
                // Arrange

                // Act
                render(
                    <DropdownCore
                        labels={customLabels}
                        onSearchTextChanged={jest.fn()}
                        searchText="xyz"
                        isFilterable={true}
                        items={[]}
                        role="listbox"
                        open={true}
                        opener={<button />}
                        onOpenChanged={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    await screen.findByText("Nothing here"),
                ).toBeInTheDocument();
            });

            it("should use the clearSearch label for the search field's clear button", async () => {
                // Arrange

                // Act
                render(
                    <DropdownCore
                        labels={customLabels}
                        onSearchTextChanged={jest.fn()}
                        searchText="app"
                        isFilterable={true}
                        items={items}
                        role="listbox"
                        open={true}
                        opener={<button />}
                        onOpenChanged={jest.fn()}
                    />,
                );

                // Assert
                expect(
                    await screen.findByRole("button", {
                        name: "Clear the fruit search",
                    }),
                ).toBeInTheDocument();
            });
        });

        it("should skip separators when navigating with the keyboard", async () => {
            // Arrange
            render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={[
                        items[0],
                        {
                            component: <SeparatorItem key="separator" />,
                            focusable: false,
                            populatedProps: {},
                        },
                        items[1],
                    ]}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Act
            await userEvent.keyboard("{ArrowDown}");

            // Assert
            await waitFor(async () => {
                expect(
                    await screen.findByRole("option", {name: "item 1"}),
                ).toHaveFocus();
            });
        });

        it("should call the populated onClick handler when an item is clicked", async () => {
            // Arrange
            const onClick = jest.fn();
            render(
                <DropdownCore
                    items={[{...items[0], populatedProps: {onClick}}]}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );

            // Act
            await userEvent.click(
                await screen.findByRole("option", {name: "item 0"}),
            );

            // Assert
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe("VirtualizedList keyboard navigation", () => {
        const optionItems = new Array(200).fill(null).map((_: any, i: any) => ({
            component: (
                <OptionItem
                    key={i}
                    value={(i + 1).toString()}
                    label={`Fruit # ${i + 1}`}
                />
            ),
            focusable: true,
            populatedProps: {},
        }));

        beforeEach(() => {
            // The virtualized list focuses items via animation frames and
            // timeouts, so we use fake timers to make this deterministic.
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        // Advance the timers in small steps, so that the virtualized list can
        // re-render between each of the scheduled animation frames.
        const advanceFrames = () => {
            for (let i = 0; i < 10; i++) {
                act(() => {
                    jest.advanceTimersByTime(20);
                });
            }
        };

        it("should focus the next item when pressing ArrowDown", async () => {
            // Arrange
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={optionItems}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            advanceFrames();

            // Act
            await user.keyboard("{ArrowDown}");
            advanceFrames();

            // Assert
            expect(
                screen.getByRole("option", {name: "Fruit # 2"}),
            ).toHaveFocus();
        });

        it("should skip a non-focusable item when pressing ArrowDown", async () => {
            // Arrange
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
            render(
                <DropdownCore
                    initialFocusedIndex={0}
                    items={optionItems.map((item, index) => ({
                        ...item,
                        focusable: index !== 1,
                    }))}
                    role="listbox"
                    open={true}
                    opener={<button />}
                    onOpenChanged={jest.fn()}
                />,
            );
            advanceFrames();

            // Act
            await user.keyboard("{ArrowDown}");
            advanceFrames();

            // Assert
            expect(
                screen.getByRole("option", {name: "Fruit # 3"}),
            ).toHaveFocus();
        });
    });
});
