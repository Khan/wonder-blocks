// @flow
import * as React from "react";
import {shallow} from "enzyme";

import SearchTextInput from "../search-text-input.js";

describe("SearchTextInput", () => {
    it("text input container should be focused when focusing on the input", () => {
        // Arrange
        const wrapper = shallow(
            <SearchTextInput
                searchText=""
                testId="search-text-input"
                onChange={jest.fn()}
            />,
        );

        const input = wrapper.find(`[data-test-id="search-text-input"]`);

        // Act
        input.simulate("focus");

        // Assert
        expect(wrapper).toHaveState({focused: true});
    });

    it("text input should not be focused when losing focus", () => {
        // Arrange
        const wrapper = shallow(
            <SearchTextInput
                searchText=""
                testId="search-text-input"
                onChange={jest.fn()}
            />,
        );

        const input = wrapper.find(`[data-test-id="search-text-input"]`);
        // focus in
        input.simulate("focus");

        // Act
        // focus out
        input.simulate("blur");

        // Assert
        expect(wrapper).toHaveState({focused: false});
    });

    it("onChange should be invoked if text input changes", () => {
        // Arrange
        const onChangeMock = jest.fn();

        const wrapper = shallow(
            <SearchTextInput
                searchText=""
                testId="search-text-input"
                onChange={onChangeMock}
            />,
        );

        const input = wrapper.find(`[data-test-id="search-text-input"]`);

        // Act
        input.simulate("change", {
            target: {value: "query"},
            preventDefault: jest.fn(),
        });

        wrapper.update();

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith("query");
    });

    it("search should be dismissed if the close icon is clicked", () => {
        // Arrange
        const onClickMock = jest.fn();

        const wrapper = shallow(
            <SearchTextInput
                searchText="query"
                testId="search-text-input"
                onChange={() => jest.fn()}
                onClick={onClickMock}
            />,
        );

        const dismissBtn = wrapper.find("IconButton");

        // Act
        dismissBtn.simulate("click");

        wrapper.update();

        // Assert
        expect(onClickMock).toHaveBeenCalled();
    });

    it("labels should be updated by the parent component", () => {
        // Arrange
        const wrapper = shallow(
            <SearchTextInput
                searchText="query"
                testId="search-text-input"
                onChange={() => jest.fn()}
                labels={{
                    clearSearch: "Clear",
                    filter: "Filter",
                }}
            />,
        );

        // Act
        wrapper.setProps({labels: {clearSearch: "Dismiss", filter: "Search"}});

        wrapper.update();

        // Assert
        expect(wrapper).toHaveState({
            labels: {clearSearch: "Dismiss", filter: "Search"},
        });
    });
});
