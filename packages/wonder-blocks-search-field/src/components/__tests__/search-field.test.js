// @flow
import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchField from "../search-field.js";

describe("SearchField", () => {
    test("value is updated when text is entered into the field", () => {
        // Arrange
        const SearchFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <SearchField
                    value={value}
                    onChange={setValue}
                    testId="search-field-test"
                />
            );
        };

        render(<SearchFieldWrapper />);

        // Act
        // Type something so the clear button appears.
        const searchField = screen.getByTestId("search-field-test");
        searchField.focus();
        userEvent.paste(searchField, "a");

        // Assert
        expect(searchField).toHaveValue("a");
    });

    test("aria props are passed down", () => {
        // Arrange

        // Act
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
                aria-label="some-aria-label"
            />,
        );

        // Assert
        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("aria-label", "some-aria-label");
    });

    test("receives focus on click", () => {
        // Arrange
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
            />,
        );

        // Act
        const searchField = screen.getByTestId("search-field-test");
        userEvent.click(searchField);

        // Assert
        expect(searchField).toHaveFocus();
    });

    test("receives focus on tab", () => {
        // Arrange
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
            />,
        );

        // Act
        userEvent.tab();

        // Assert
        const searchField = screen.getByTestId("search-field-test");
        expect(searchField).toHaveFocus();
    });

    test("loses focus if tabbed off", () => {
        // Arrange
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
            />,
        );

        // Act
        // focus
        userEvent.tab();
        // blur
        userEvent.tab();

        // Assert
        const searchField = screen.getByTestId("search-field-test");
        expect(searchField).not.toHaveFocus();
    });

    test("onFocus prop is called when field is focused", () => {
        // Arrange
        const focusFn = jest.fn(() => {});
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
                onFocus={focusFn}
            />,
        );

        // Act
        userEvent.tab();

        // Assert
        expect(focusFn).toHaveBeenCalled();
    });

    test("onBlur prop is called when field is blurred", () => {
        // Arrange
        const blurFn = jest.fn(() => {});
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
                onBlur={blurFn}
            />,
        );

        // Act
        // focus
        userEvent.tab();
        // blur
        userEvent.tab();

        // Assert
        expect(blurFn).toHaveBeenCalled();
    });

    test("does not have clear icon by default", () => {
        // Arrange

        // Act
        render(<SearchField value="" onChange={() => {}} />);

        // Assert
        const dismissIcon = screen.queryByRole("button");
        expect(dismissIcon).not.toBeInTheDocument();
    });

    test("displays the clear icon button when a value is entered", () => {
        // Arrange
        const SearchFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <SearchField
                    value={value}
                    onChange={setValue}
                    testId="search-field-test"
                />
            );
        };

        render(<SearchFieldWrapper />);

        // Act
        const searchField = screen.getByTestId("search-field-test");
        searchField.focus();
        userEvent.paste(searchField, "a");

        // Assert
        const dismissIcon = screen.queryByRole("button");
        expect(dismissIcon).toBeInTheDocument();
    });

    test("clear button clears any text in the field", () => {
        // Arrange
        const SearchFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <SearchField
                    value={value}
                    onChange={setValue}
                    testId="search-field-test"
                    clearAriaLabel="test-clear-label"
                />
            );
        };

        render(<SearchFieldWrapper />);

        // Type something so the clear button appears.
        const searchField = screen.getByTestId("search-field-test");
        searchField.focus();
        userEvent.paste(searchField, "a");

        // Act
        const clearButton = screen.getByRole("button", {
            name: "test-clear-label",
        });
        userEvent.click(clearButton);

        // Assert
        expect(searchField).toHaveValue("");
    });

    test("focus is returned to text field after pressing clear button", async () => {
        // Arrange
        const SearchFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <SearchField
                    value={value}
                    onChange={setValue}
                    testId="search-field-test"
                    clearAriaLabel="test-clear-label"
                    id="something"
                />
            );
        };

        render(<SearchFieldWrapper />);

        // Type something so the clear button appears.
        const searchField = screen.getByTestId("search-field-test");
        searchField.focus();
        userEvent.paste(searchField, "a");

        // Act
        const clearButton = screen.getByRole("button", {
            name: "test-clear-label",
        });
        clearButton.focus();
        userEvent.keyboard("{enter}");

        // Assert
        expect(searchField).toHaveFocus();
    });

    test("clearAriaLabel is applied to the clear button as its aria label", () => {
        // Arrange
        const SearchFieldWrapper = () => {
            const [value, setValue] = React.useState("");
            return (
                <SearchField
                    value={value}
                    onChange={setValue}
                    testId="search-field-test"
                    clearAriaLabel="test-clear-label"
                />
            );
        };

        render(<SearchFieldWrapper />);

        // Type something so the clear button appears.
        const searchField = screen.getByTestId("search-field-test");
        searchField.focus();
        userEvent.paste(searchField, "a");

        // Act
        const clearButton = screen.getByRole("button");
        userEvent.click(clearButton);

        // Assert
        expect(clearButton).toHaveAttribute("aria-label", "test-clear-label");
    });

    test("forwards the ref to the input element", async () => {
        // Arrange
        const ref = React.createRef();

        // Act
        render(
            <SearchField
                value="some-value"
                onChange={() => {}}
                testId="search-field-test"
                ref={ref}
            />,
        );

        // Assert
        waitFor(() => {
            expect(ref.current).toBeInstanceOf(HTMLInputElement);
        });
    });

    test("forwards the ref to the input element with the expected value", async () => {
        // Arrange
        const ref = React.createRef();

        // Act
        render(
            <SearchField
                value="some-value"
                onChange={() => {}}
                testId="search-field-test"
                ref={ref}
            />,
        );

        // Assert
        waitFor(() => {
            expect(ref.current?.value).toBe("some-value");
        });
    });

    test("uses the passed in ID if one is provided", () => {
        // Arrange
        render(
            <SearchField
                id={"some-random-id"}
                testId="search-field-test"
                onChange={() => {}}
                value=""
            />,
        );

        // Act
        const searchField = screen.getByTestId("search-field-test");

        // Assert
        expect(searchField).toHaveAttribute("id", "some-random-id-field");
    });

    test("uses a unique ID if one is not provided", () => {
        render(
            <SearchField
                testId="search-field-test"
                onChange={() => {}}
                value=""
            />,
        );

        const searchField = screen.getByTestId("search-field-test");

        expect(searchField.getAttribute("id")).toMatch(/^uid-.*-field$/);
    });
});
