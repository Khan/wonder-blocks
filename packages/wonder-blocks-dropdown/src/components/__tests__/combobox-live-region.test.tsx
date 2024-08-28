import * as React from "react";
import {render, screen} from "@testing-library/react";
import {ComboboxLiveRegion} from "../combobox-live-region";
import OptionItem from "../option-item";

const options = [
    <OptionItem key="1" label="Option 1" value="option1" />,
    <OptionItem key="2" label="Option 2" value="option2" />,
];

describe("ComboboxLiveRegion", () => {
    it("doesn't announce anything by default", () => {
        // Arrange

        // Act
        render(
            <ComboboxLiveRegion
                focusedIndex={-1}
                focusedMultiSelectIndex={-1}
                options={options}
                selectedLabels={[]}
                selected={null}
                opened={false}
            />,
        );

        // Assert
        expect(screen.getByRole("log")).toHaveTextContent("");
    });

    describe("multi-select", () => {
        it("announces when a pill is focused", () => {
            // Arrange

            // Act
            render(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={0}
                    options={options}
                    selected={["option2"]}
                    selectedLabels={["Option 2"]}
                    opened={true}
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Option 2 focused, 1 of 1. 1 selected options.",
            );
        });

        it("does not announce anything when there are no selected pills", () => {
            // Arrange
            const {rerender} = render(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selected={["option2"]}
                    selectedLabels={["Option 2"]}
                    opened={true}
                />,
            );

            // Act
            rerender(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selected={null}
                    selectedLabels={[]}
                    opened={true}
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent("");
        });

        it("announces when an item is selected", () => {
            // Arrange
            const options = [
                <OptionItem
                    key="1"
                    label="Option 1"
                    value="option1"
                    selected={true}
                />,
                <OptionItem key="2" label="Option 2" value="option2" />,
            ];

            // Act
            // select the first option
            render(
                <ComboboxLiveRegion
                    focusedIndex={0}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selected={["option1"]}
                    selectedLabels={["Option 1"]}
                    opened={true}
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Option 1 selected, 1 of 2. 2 results available.",
            );
        });

        it("announces when an item is unselected", () => {
            // Arrange
            // Focus on the first pill
            const {rerender} = render(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={1}
                    options={options}
                    selected={["option1", "option2"]}
                    selectedLabels={["Option 1", "Option 2"]}
                    opened={true}
                />,
            );

            // Act
            rerender(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={0}
                    options={options}
                    selected={["option1"]}
                    // Option 2 is removed
                    selectedLabels={["Option 1"]}
                    opened={true}
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Option 1 focused, 1 of 1. 1 selected options.",
            );
        });

        it("announces when it is closed", () => {
            // Arrange
            const {rerender} = render(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selectedLabels={[]}
                    selected={null}
                    selectionType="multiple"
                    opened={true}
                />,
            );

            // Act
            rerender(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selectedLabels={[]}
                    selected={null}
                    selectionType="multiple"
                    opened={false}
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Combobox is closed",
            );
        });
    });
});
