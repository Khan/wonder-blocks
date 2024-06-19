import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

import SearchField from "../search-field";

describe("SearchField", () => {
    test("value is updated when text is entered into the field", async () => {
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
        const searchField = await screen.findByTestId("search-field-test");
        searchField.focus();
        await userEvent.type(searchField, "a");

        // Assert
        expect(searchField).toHaveValue("a");
    });

    test("aria props are passed down", async () => {
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
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("aria-label", "some-aria-label");
    });

    test("name is passed down", async () => {
        // Arrange

        // Act
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
                name="some-name"
            />,
        );

        // Assert
        const input = await screen.findByRole("textbox");
        expect(input).toHaveAttribute("name", "some-name");
    });

    test("receives focus on click", async () => {
        // Arrange
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
            />,
        );

        // Act
        const searchField = await screen.findByTestId("search-field-test");
        await userEvent.click(searchField);

        // Assert
        expect(searchField).toHaveFocus();
    });

    test("receives focus on tab", async () => {
        // Arrange
        render(
            <SearchField
                value=""
                onChange={() => {}}
                testId="search-field-test"
            />,
        );

        // Act
        await userEvent.tab();

        // Assert
        const searchField = await screen.findByTestId("search-field-test");
        expect(searchField).toHaveFocus();
    });

    test("loses focus if tabbed off", async () => {
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
        await userEvent.tab();
        // blur
        await userEvent.tab();

        // Assert
        const searchField = await screen.findByTestId("search-field-test");
        expect(searchField).not.toHaveFocus();
    });

    test("onFocus prop is called when field is focused", async () => {
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
        await userEvent.tab();

        // Assert
        expect(focusFn).toHaveBeenCalled();
    });

    test("onBlur prop is called when field is blurred", async () => {
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
        await userEvent.tab();
        // blur
        await userEvent.tab();

        // Assert
        expect(blurFn).toHaveBeenCalled();
    });

    test("does not have clear icon by default", async () => {
        // Arrange

        // Act
        render(<SearchField value="" onChange={() => {}} />);

        // Assert
        const dismissIcon = screen.queryByRole("button");
        expect(dismissIcon).not.toBeInTheDocument();
    });

    test("displays the clear icon button when a value is entered", async () => {
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
        const searchField = await screen.findByTestId("search-field-test");
        searchField.focus();
        await userEvent.type(searchField, "a");

        // Assert
        const dismissIcon = screen.queryByRole("button");
        expect(dismissIcon).toBeInTheDocument();
    });

    test("clear button clears any text in the field", async () => {
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
        const searchField = await screen.findByTestId("search-field-test");
        searchField.focus();
        await userEvent.type(searchField, "a");

        // Act
        const clearButton = await screen.findByRole("button", {
            name: "test-clear-label",
        });
        await userEvent.click(clearButton);

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
                />
            );
        };

        render(<SearchFieldWrapper />);

        // Type something so the clear button appears.
        const searchField = await screen.findByTestId("search-field-test");
        searchField.focus();
        await userEvent.type(searchField, "a");

        // Act
        const clearButton = await screen.findByRole("button", {
            name: "test-clear-label",
        });
        clearButton.focus();
        await userEvent.keyboard("{enter}");

        // Assert
        expect(searchField).toHaveFocus();
    });

    test("clearAriaLabel is applied to the clear button as its aria label", async () => {
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
        const searchField = await screen.findByTestId("search-field-test");
        searchField.focus();
        await userEvent.type(searchField, "a");

        // Act
        const clearButton = await screen.findByRole("button");
        await userEvent.click(clearButton);

        // Assert
        expect(clearButton).toHaveAttribute("aria-label", "test-clear-label");
    });

    test("forwards the ref to the input element", async () => {
        // Arrange
        const ref: React.RefObject<HTMLInputElement> = React.createRef();

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
        await waitFor(() => {
            expect(ref.current).toBeInstanceOf(HTMLInputElement);
        });
    });

    test("forwards the ref to the input element with the expected value", async () => {
        // Arrange
        const ref: React.RefObject<HTMLInputElement> = React.createRef();

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
        await waitFor(() => {
            expect(ref.current?.value).toBe("some-value");
        });
    });

    test("uses the passed in ID if one is provided", async () => {
        // Arrange
        render(
            <SearchField
                id="some-random-id"
                testId="search-field-test"
                onChange={() => {}}
                value=""
            />,
        );

        // Act
        const searchField = await screen.findByTestId("search-field-test");

        // Assert
        expect(searchField).toHaveAttribute("id", "some-random-id-field");
    });

    test("uses a unique ID if one is not provided", async () => {
        // Arrange
        render(
            <SearchField
                testId="search-field-test"
                onChange={() => {}}
                value=""
            />,
        );

        // Act
        const searchField = await screen.findByTestId("search-field-test");

        // Assert
        expect(searchField.getAttribute("id")).toMatch(
            /^uid-search-field.*-field$/,
        );
    });

    test("has focus if autoFocus is true", async () => {
        // Arrange
        render(
            <View>
                <Button onClick={() => {}}>
                    Some other focusable element.
                </Button>
                <SearchField
                    autoFocus
                    testId="search-field-test"
                    onChange={() => {}}
                    value=""
                />
                ,
            </View>,
        );

        // Act
        const searchField = await screen.findByTestId("search-field-test");

        // Assert
        expect(searchField).toHaveFocus();
    });

    test("does not have focus if autoFocus is undefined", async () => {
        // Arrange
        render(
            <View>
                <Button onClick={() => {}}>
                    Some other focusable element.
                </Button>
                <SearchField
                    testId="search-field-test"
                    onChange={() => {}}
                    value=""
                />
                ,
            </View>,
        );

        // Act
        const searchField = await screen.findByTestId("search-field-test");

        // Assert
        expect(searchField).not.toHaveFocus();
    });
});
