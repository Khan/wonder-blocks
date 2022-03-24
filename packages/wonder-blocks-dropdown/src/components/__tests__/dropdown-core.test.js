// @flow
import * as React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "../../../../../utils/testing/user-event.js";

import OptionItem from "../option-item.js";
import SearchTextInput from "../search-text-input.js";
import DropdownCore from "../dropdown-core.js";

jest.mock("../dropdown-core-virtualized.js");

const items = [
    {
        component: (
            <OptionItem testId="item-0" label="item 0" value="0" key="0" />
        ),
        focusable: true,
        populatedProps: {},
    },
    {
        component: (
            <OptionItem testId="item-1" label="item 1" value="1" key="1" />
        ),
        focusable: true,
        populatedProps: {},
    },
    {
        component: (
            <OptionItem testId="item-2" label="item 2" value="2" key="2" />
        ),
        focusable: true,
        populatedProps: {},
    },
];

describe("DropdownCore", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
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
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // Assert
        waitFor(() => {
            expect(screen.getByTestId("item-0")).toHaveFocus();
        });
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
                openerElement={null}
                onOpenChanged={openChanged}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // RTL's focuses on `document.body` by default, so we need to focus on
        // the dropdown menu
        userEvent.tab();

        // Act
        // navigate down two times
        userEvent.keyboard("{arrowdown}"); // 0 -> 1
        userEvent.keyboard("{arrowdown}"); // 1 -> 2

        // Assert
        expect(screen.queryByTestId("item-2")).toHaveFocus();
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
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // RTL's focuses on `document.body` by default, so we need to focus on
        // the dropdown menu
        userEvent.tab();

        // Act
        // navigate down tree times
        userEvent.keyboard("{arrowdown}"); // 0 -> 1
        userEvent.keyboard("{arrowdown}"); // 1 -> 2
        userEvent.keyboard("{arrowdown}"); // 2 -> 0

        // navigate up back two times
        userEvent.keyboard("{arrowup}"); // 0 -> 2
        userEvent.keyboard("{arrowup}"); // 2 -> 1

        // Assert
        expect(screen.getByTestId("item-1")).toHaveFocus();
    });

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
                openerElement={null}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // RTL's focuses on `document.body` by default, so we need to focus on
        // the dropdown menu
        userEvent.tab();

        // Act
        // close the dropdown by tabbing out
        userEvent.tab();

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
                openerElement={null}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // RTL's focuses on `document.body` by default, so we need to focus on
        // the dropdown menu
        userEvent.tab();

        // Act
        // close the dropdown by pressing "Escape"
        userEvent.keyboard("{escape}");

        // Assert
        expect(handleOpenChangedMock).toHaveBeenNthCalledWith(1, false);
    });

    it("closes on external mouse click", async () => {
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
                    openerElement={null}
                    onOpenChanged={handleOpenChangedMock}
                />
            </div>,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");
        userEvent.tab();
        userEvent.keyboard("arrowdown");

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
                openerElement={null}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        // Act
        // click outside the dropdown
        userEvent.click(document.body);

        // Assert
        expect(handleOpenChangedMock).toHaveBeenCalledTimes(0);
    });

    it("opens on down key as expected", async () => {
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
                openerElement={null}
                onOpenChanged={handleOpenChangedMock}
            />,
        );

        const openerElement = await screen.findByTestId("opener");
        openerElement.focus();

        // Act
        userEvent.keyboard("{arrowdown}");

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
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // Assert
        waitFor(() => {
            expect(screen.queryByTestId("item-0")).toHaveFocus();
        });
    });

    it("selects correct item when starting off at an undefined index and a searchbox", async () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={undefined}
                searchText=""
                // mock the items
                items={[
                    {
                        component: (
                            <SearchTextInput
                                testId="item-0"
                                key="search-text-input"
                                onChange={jest.fn()}
                                searchText={""}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // Assert
        waitFor(() => {
            expect(screen.queryByTestId("item-0")).toHaveFocus();
        });
    });

    it("selects correct item when starting off at a different index and a searchbox", async () => {
        // Arrange
        render(
            <DropdownCore
                initialFocusedIndex={1}
                searchText=""
                // mock the items
                items={[
                    {
                        component: (
                            <SearchTextInput
                                testId="search"
                                key="search-text-input"
                                onChange={jest.fn()}
                                searchText={""}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                testId="item-0"
                                label="item 1"
                                value="1"
                                key="1"
                            />
                        ),
                        focusable: false,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                testId="item-1"
                                label="item 2"
                                value="2"
                                key="2"
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Act
        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // Assert
        waitFor(() => {
            expect(screen.queryByTestId("item-1")).toHaveFocus();
        });
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
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // RTL's focuses on `document.body` by default, so we need to focus on
        // the dropdown menu
        userEvent.tab();

        // Act
        // navigate down
        userEvent.keyboard("{arrowdown}"); // 2 -> 0

        // Assert
        expect(screen.getByTestId("item-0")).toHaveFocus();
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
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // RTL's focuses on `document.body` by default, so we need to focus on
        // the dropdown menu
        userEvent.tab();

        // Act
        userEvent.click(screen.getByTestId("item-1"));
        // navigate down
        userEvent.keyboard("{arrowdown}"); // 1 -> 2

        // Assert
        expect(screen.getByTestId("item-2")).toHaveFocus();
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
                            <OptionItem
                                testId="item-0"
                                label="item 0"
                                value="0"
                                key="0"
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                testId="item-1"
                                label="item 1"
                                value="1"
                                key="1"
                            />
                        ),
                        focusable: false,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                testId="item-2"
                                label="item 2"
                                value="2"
                                key="2"
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // RTL's focuses on `document.body` by default, so we need to focus on
        // the dropdown menu
        userEvent.tab();

        // Act
        // navigate down
        userEvent.keyboard("{arrowdown}"); // 0 -> 2 (1 is disabled)

        // Assert
        expect(screen.getByTestId("item-2")).toHaveFocus();
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
                            <OptionItem
                                label="item 0"
                                value="0"
                                key="0"
                                testId="item-0"
                            />
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
                                testId="item-1"
                                onClick={onClick1}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                    {
                        component: (
                            <OptionItem
                                label="item 2"
                                testId="item-2"
                                value="2"
                                key="2"
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // Act
        userEvent.click(screen.getByTestId("item-1"));

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
                items={[
                    {
                        component: (
                            <SearchTextInput
                                key="search-text-input"
                                onChange={handleSearchTextChanged}
                                searchText={""}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Assert
        expect(
            screen.getByTestId("dropdown-core-no-results"),
        ).toBeInTheDocument();
    });

    it("SearchTextInput should be focused when opened", async () => {
        // Arrange
        const handleSearchTextChanged = jest.fn();
        const handleOpen = jest.fn();

        // Act
        render(
            <DropdownCore
                initialFocusedIndex={0}
                onOpenChanged={handleOpen}
                onSearchTextChanged={handleSearchTextChanged}
                searchText="ab"
                items={[
                    {
                        component: (
                            <SearchTextInput
                                testId="item-0"
                                key="search-text-input"
                                onChange={handleSearchTextChanged}
                                searchText={""}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // Assert
        waitFor(() => {
            expect(screen.getByPlaceholderText("Filter")).toHaveFocus();
        });
    });

    it("When SearchTextInput has input and focused, tab key should not close the select", async () => {
        // Arrange
        const handleSearchTextChanged = jest.fn();
        const handleOpen = jest.fn();

        render(
            <DropdownCore
                onOpenChanged={handleOpen}
                onSearchTextChanged={handleSearchTextChanged}
                searchText="ab"
                items={[
                    {
                        component: (
                            <SearchTextInput
                                testId="item-0"
                                key="search-text-input"
                                onChange={handleSearchTextChanged}
                                searchText={""}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");

        // Act
        userEvent.keyboard("{tab}");

        // Assert
        expect(handleOpen).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId("item-0")).toHaveFocus();
    });

    it("When SearchTextInput exists and focused, space key pressing should be allowed", async () => {
        // Arrange
        const handleSearchTextChanged = jest.fn();
        const preventDefaultMock = jest.fn();

        render(
            <DropdownCore
                onSearchTextChanged={jest.fn()}
                searchText="ab"
                items={[
                    {
                        component: (
                            <SearchTextInput
                                testId="item-0"
                                key="search-text-input"
                                onChange={handleSearchTextChanged}
                                searchText={"ab"}
                            />
                        ),
                        focusable: true,
                        populatedProps: {},
                    },
                ]}
                role="listbox"
                open={true}
                // mock the opener elements
                opener={<button />}
                openerElement={null}
                onOpenChanged={jest.fn()}
            />,
        );

        // Wait until the dropdown is open
        await screen.findByRole("listbox");
        userEvent.tab();

        // Act
        const searchInput = await screen.findByTestId("item-0");
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
});
