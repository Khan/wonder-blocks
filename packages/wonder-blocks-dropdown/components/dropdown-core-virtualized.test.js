//@flow
import * as React from "react";
import {shallow} from "enzyme";
import {VariableSizeList as List} from "react-window";
import {mount} from "../../../utils/testing/mount.js";

import OptionItem from "./option-item.js";
import SeparatorItem from "./separator-item.js";
import DropdownCoreVirtualized from "./dropdown-core-virtualized.js";
import SearchTextInput from "./search-text-input.js";

describe("DropdownCoreVirtualized", () => {
    it("should render the non-virtualized list on first load", () => {
        // Arrange
        const optionItems = new Array(20).fill(null).map((item, i) => ({
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
                component: <SeparatorItem />,
                focusable: false,
                populatedProps: {},
            },
        ];

        // Act
        const wrapper = shallow(
            <DropdownCoreVirtualized
                data={[...initialItems, ...optionItems]}
            />,
            {disableLifecycleMethods: true},
        );

        // Assert
        expect(wrapper).toMatchSnapshot();
    });

    it("should render a virtualized list", () => {
        // Arrange
        const optionItems = new Array(20).fill(null).map((item, i) => ({
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

        const wrapper = mount(
            <DropdownCoreVirtualized
                data={[...initialItems, ...optionItems]}
            />,
        );

        // Act
        // add a fixed width to render the virtualized version
        wrapper.setState({width: 300});

        // Assert
        expect(wrapper.find(List)).toExist();
    });
});
