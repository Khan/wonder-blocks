// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import {shallow} from "enzyme";
// import "jest-enzyme";

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
        render(
            <SearchTextInput
                searchText="query"
                testId="search-text-input"
                onChange={() => jest.fn()}
                onClick={() => jest.fn()}
            />,
        );

        const input = screen.getByTestId("search-text-input");

        // Act
        userEvent.paste(input, "value");

        // Assert
        const clearIconButton = screen.queryByRole("button");
        expect(clearIconButton).toBeInTheDocument();
    });

    test("search should be cleared if the clear icon is clicked", () => {
        // Arrange

        render(
            <SearchTextInput
                searchText="query"
                onChange={() => jest.fn()}
                testId="search-text-input"
            />,
        );

        const input = screen.getByTestId("search-text-input");
        const clearIconButton = screen.queryByRole("button");

        userEvent.paste(input, "value");

        // Act
        userEvent.click(clearIconButton);

        // Assert
        expect(input).toHaveValue("");
    });

    //     it("labels should be updated by the parent component", () => {
    //         // Arrange
    //         const wrapper = shallow(
    //             <SearchTextInput
    //                 searchText="query"
    //                 onChange={() => jest.fn()}
    //                 labels={{
    //                     clearSearch: "Clear",
    //                     filter: "Filter",
    //                 }}
    //             />,
    //         );

    //         // Act
    //         wrapper.setProps({labels: {clearSearch: "Dismiss", filter: "Search"}});

    //         wrapper.update();

    //         // Assert
    //         expect(wrapper).toHaveState({
    //             labels: {clearSearch: "Dismiss", filter: "Search"},
    //         });
    //     });
});
