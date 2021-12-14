//@flow
import * as React from "react";
import {VariableSizeList as List} from "react-window";
import {mount} from "enzyme";
import "jest-enzyme";

import OptionItem from "../option-item.js";
import SeparatorItem from "../separator-item.js";
import DropdownCoreVirtualized from "../dropdown-core-virtualized.js";
import SearchTextInput from "../search-text-input.js";

import {unmountAll} from "../../../../../utils/testing/enzyme-shim.js";

describe("DropdownCoreVirtualized", () => {
    beforeEach(() => {
        jest.useFakeTimers();

        // Jest doesn't fake out the animation frame API, so we're going to do
        // it here and map it to timeouts, that way we can use the fake timer
        // API to test our animation frame things.
        jest.spyOn(global, "requestAnimationFrame").mockImplementation((fn) =>
            setTimeout(fn, 0),
        );
        jest.spyOn(global, "cancelAnimationFrame").mockImplementation((id) =>
            clearTimeout(id),
        );
    });

    afterEach(() => {
        // We have to explicitly unmount before clearing mocks, otherwise jest
        // timers will throw because we'll try to clear an animation frame that
        // we set with a setTimeout but are clearing with clearAnimationFrame
        // because we restored the clearAnimationFrame mock (and we won't
        // have cleared the timeout we actually set!)
        unmountAll();
        jest.restoreAllMocks();
    });

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
        const firstLabel = wrapper.find(OptionItem).first().text();

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

        const wrapper = mount(
            <DropdownCoreVirtualized data={initialItems} width={300} />,
        );

        // Act
        // append items to update container height
        wrapper.setProps({data: [...initialItems, ...optionItems]});

        // Assert
        expect(wrapper.find(List)).toExist();
    });
});
