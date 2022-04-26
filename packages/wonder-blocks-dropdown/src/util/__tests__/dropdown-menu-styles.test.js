// @flow
import * as React from "react";
import OptionItem from "../../components/option-item.js";
import SearchTextInput from "../../components/search-text-input.js";
import SeparatorItem from "../../components/separator-item.js";

import {getDropdownMenuHeight} from "../dropdown-menu-styles.js";

const optionItems = [
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

const searchFieldItem = {
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
};

const separatorItem = {
    component: <SeparatorItem />,
    focusable: false,
    populatedProps: {},
};

describe("getDropdownMenuHeight", () => {
    it("should get a valid height for a dropdown with 3 items", () => {
        // Arrange
        const items = optionItems;

        // Act
        const height = getDropdownMenuHeight(items);

        // Assert
        // 3 option items
        expect(height).toBe(120);
    });

    it("should include an initial min height", () => {
        // Arrange
        const items = optionItems;

        // Act
        const height = getDropdownMenuHeight(items, 10);

        // Assert
        // 3 option items + initial height (e.g. padding)
        expect(height).toBe(130);
    });

    it("should get a valid height for a filterable dropdown", () => {
        // Arrange
        const items = [searchFieldItem, ...optionItems];

        // Act
        const height = getDropdownMenuHeight(items);

        // Assert
        // search field + 3 option items
        expect(height).toBe(172);
    });

    it("should get a valid height for a dropdown with a SeparatorItem", () => {
        // Arrange
        const items = [separatorItem, ...optionItems];

        // Act
        const height = getDropdownMenuHeight(items);

        // Assert
        // separator item + 3 option items
        expect(height).toBe(129);
    });
});
