// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchTextInput from "../search-text-input.js";

describe("SearchTextInput", () => {
    test("text input container should be focused when focusing on the input", () => {
        // Arrange
        render(
            <SearchTextInput
                searchText=""
                testId="search-text-input"
                onChange={jest.fn()}
            />,
        );

        const input = screen.getByTestId("search-text-input");

        // Act
        input.focus();

        // Assert
        expect(input).toHaveFocus();
    });

    test("text input should not be focused when losing focus", () => {
        // Arrange
        render(
            <SearchTextInput
                searchText=""
                testId="search-text-input"
                onChange={jest.fn()}
            />,
        );

        const input = screen.getByTestId("search-text-input");
        // focus in
        input.focus();

        // Act
        // focus out
        input.blur();

        // Assert
        expect(input).not.toHaveFocus();
    });

    test("onChange should be invoked if text input changes", () => {
        // Arrange
        const onChangeMock = jest.fn();

        render(
            <SearchTextInput
                searchText=""
                testId="search-text-input"
                onChange={onChangeMock}
            />,
        );

        const input = screen.getByTestId("search-text-input");

        // Act
        userEvent.paste(input, "value");

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith("value");
    });

    test("displays the dismiss button when search text exists", () => {
        // Arrange
        const SearchFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <SearchTextInput
                    searchText={value}
                    testId="search-text-input"
                    onChange={setValue}
                />
            );
        };

        render(<SearchFieldWrapper />);

        const input = screen.getByTestId("search-text-input");

        // Act
        userEvent.paste(input, "value");

        // Assert
        const clearIconButton = screen.queryByRole("button");
        expect(clearIconButton).toBeInTheDocument();
    });

    test("search should be cleared if the clear icon is clicked", () => {
        // Arrange
        const SearchFieldWrapper = () => {
            const [value, setValue] = React.useState("initial value");
            return (
                <SearchTextInput
                    searchText={value}
                    testId="search-text-input"
                    onChange={setValue}
                />
            );
        };

        render(<SearchFieldWrapper />);

        const input = screen.getByTestId("search-text-input");
        const clearIconButton = screen.queryByRole("button");

        // Act
        userEvent.click(clearIconButton);

        // Assert
        expect(input).toHaveValue("");
    });

    test("placeholder should be updated by the parent component", () => {
        // Arrange
        const {rerender} = render(
            <SearchTextInput
                searchText="query"
                onChange={() => {}}
                labels={{
                    clearSearch: "Clear",
                    filter: "Filter",
                }}
                testId="search-text-input"
            />,
        );

        const input = screen.getByTestId("search-text-input");

        // Act
        rerender(
            <SearchTextInput
                searchText="query"
                onChange={() => {}}
                labels={{
                    clearSearch: "Dismiss",
                    filter: "Search",
                }}
                testId="search-text-input"
            />,
        );

        // Assert
        expect(input).toHaveAttribute("placeholder", "Search");
    });

    test("button label should be updated by the parent component", () => {
        // Arrange
        const {rerender} = render(
            <SearchTextInput
                searchText="query"
                onChange={() => {}}
                labels={{
                    clearSearch: "Clear",
                    filter: "Filter",
                }}
                testId="search-text-input"
            />,
        );

        const clearIconButton = screen.queryByRole("button");

        // Act
        rerender(
            <SearchTextInput
                searchText="query"
                onChange={() => {}}
                labels={{
                    clearSearch: "Dismiss",
                    filter: "Search",
                }}
                testId="search-text-input"
            />,
        );

        // Assert
        expect(clearIconButton).toHaveAttribute("aria-label", "Dismiss");
    });
});
