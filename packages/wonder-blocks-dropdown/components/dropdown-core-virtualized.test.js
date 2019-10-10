//@flow
import * as React from "react";
import {VariableSizeList as List} from "react-window";
import {mount} from "../../../utils/testing/mount.js";

import OptionItem from "./option-item.js";
import SeparatorItem from "./separator-item.js";
import DropdownCoreVirtualized from "./dropdown-core-virtualized.js";
import SearchTextInput from "./search-text-input.js";

jest.useFakeTimers();

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

        const wrapper = mount(
            <DropdownCoreVirtualized
                data={[...initialItems, ...optionItems]}
            />,
        );

        jest.runAllTimers();

        // Act
        const firstLabel = wrapper
            .find(OptionItem)
            .first()
            .text();

        // Assert
        // make sure we are rendering the longest item first
        expect(firstLabel).toEqual("ccc");
    });

    it("should render a virtualized list", () => {
        // Arrange
        const optionItems = new Array(10).fill(null).map((item, i) => ({
            component: (
                <OptionItem
                    key={i}
                    value={(i + 1).toString()}
                    label={`School ${i + 1} in Wizarding World`}
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

        const wrapper = mount(<DropdownCoreVirtualized data={initialItems} />);

        // Act
        // append items to update container height
        wrapper.setProps({data: [...initialItems, ...optionItems]});
        // add a fixed width to render the virtualized version
        wrapper.setState({width: 300});

        // Assert
        expect(wrapper.find(List)).toExist();
    });
});
