import * as React from "react";
import {render, screen} from "@testing-library/react";

import OptionItem from "../option-item";
import SeparatorItem from "../separator-item";
import DropdownCoreVirtualized from "../dropdown-core-virtualized";

describe("DropdownCoreVirtualized", () => {
    it("should sort the items on first load", () => {
        // Arrange
        const optionItems = ["a", "bb", "ccc"].map((item: any, i: any) => ({
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
        const optionItems = new Array(10)
            .fill(null)
            .map((item: any, i: any) => ({
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
