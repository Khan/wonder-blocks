//@flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import OptionItem from "../option-item.js";
import SeparatorItem from "../separator-item.js";
import DropdownCoreVirtualized from "../dropdown-core-virtualized.js";
import SearchTextInput from "../search-text-input.js";

describe("DropdownCoreVirtualized", () => {
    it("should sort the items on first load", () => {
        // Arrange
        const optionItems = ["a", "bb", "ccc"].map((item, i) => ({
            component: <OptionItem key={i} value={item} label={item} />,
            focusable: true,
            onClick: jest.fn(),
            role: "option",
            populatedProps: {
                selected: false,
                variant: "checkbox",
            },
        }));

        const initialItems = [
            {
                component: (
                    <SearchTextInput onChange={jest.fn()} searchText="" />
                ),
                focusable: true,
                populatedProps: {},
            },
            {
                component: <SeparatorItem />,
                focusable: false,
                populatedProps: {},
            },
        ];

        // Act
        const {container} = render(
            <DropdownCoreVirtualized
                data={[...initialItems, ...optionItems]}
            />,
        );

        // Assert make sure we are rendering from the longest item to the
        // shortest item.
        expect(container).toHaveTextContent(/ccc.*bb.*a/i);
    });

    it("should render a virtualized list", () => {
        // Arrange
        const optionItems = new Array(10).fill(null).map((item, i) => ({
            component: (
                <OptionItem
                    key={i}
                    value={(i + 1).toString()}
                    label={`School ${i + 1}`}
                />
            ),
            focusable: true,
            onClick: jest.fn(),
            role: "option",
            populatedProps: {
                selected: false,
                variant: "checkbox",
            },
        }));

        const initialItems = [
            {
                component: (
                    <SearchTextInput onChange={jest.fn()} searchText="" />
                ),
                focusable: true,
                populatedProps: {},
            },
            {
                component: <SeparatorItem />,
                focusable: false,
                populatedProps: {},
            },
        ];

        const {rerender} = render(
            <DropdownCoreVirtualized data={initialItems} width={300} />,
        );

        // Act
        // append items to update container height
        rerender(
            <DropdownCoreVirtualized
                data={[...initialItems, ...optionItems]}
                width={300}
            />,
        );

        const option = screen.getAllByRole("option")[0];

        // Assert
        // `left` is only injected by the virtualized list
        expect(option).toHaveStyle("left: 0px");
    });
});
