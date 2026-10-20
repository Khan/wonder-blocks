import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";

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
                "Option 2 focused, 1 of 1. 1 selected option.",
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
                "Option 1 focused, 1 of 1. 1 selected option.",
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

    describe("announcement strings", () => {
        it("announces a single result with singular grammar", () => {
            // Arrange
            const options = [
                <OptionItem key="1" label="Option 1" value="option1" />,
            ];

            // Act
            render(
                <ComboboxLiveRegion
                    focusedIndex={0}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selectedLabels={[]}
                    selected={null}
                    opened={true}
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Option 1, 1 of 1. 1 result available.",
            );
        });

        it("announces all of the states of the current item", () => {
            // Arrange
            const options = [
                <OptionItem
                    key="1"
                    label="Option 1"
                    value="option1"
                    disabled={true}
                    selected={true}
                />,
            ];

            // Act
            render(
                <ComboboxLiveRegion
                    focusedIndex={0}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selectedLabels={[]}
                    selected={null}
                    opened={true}
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Option 1 disabled selected, 1 of 1. 1 result available.",
            );
        });
    });

    describe("i18n strings", () => {
        const translatedStrings = {
            ...defaultStringsEn,
            noResults: "translated no results",
            srComboboxClosed: "translated combobox closed",
            srComboboxCurrentItemDetails: ({
                current,
                index,
                total,
            }: {
                current: string;
                index: number;
                total: number;
            }) => `translated ${current}, ${index} of ${total}`,
            srComboboxResultsTotal: ({num}: {num: number}) =>
                `translated ${num} results available`,
            srComboboxSelectedTotal: ({num}: {num: number}) =>
                `translated ${num} selected options`,
            srDisabled: "translated disabled",
            srFocused: "translated focused",
            srSelected: "translated selected",
            srItemsSelected: ({labels}: {labels: string}) =>
                `translated ${labels} selected`,
            srSelectionCleared: "translated selection cleared",
            srItemsNotSelected: ({labels}: {labels: string}) =>
                `translated ${labels} not selected`,
        };

        const ConfigProvider = ({children}: {children: React.ReactNode}) => (
            <WonderBlocksConfigProvider
                i18n={{strings: translatedStrings, locale: "es"}}
            >
                {children}
            </WonderBlocksConfigProvider>
        );

        describe("closedState", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected: "translated combobox closed",
                },
                {
                    case: "an empty label",
                    labels: {closedState: ""},
                    expected: "translated combobox closed",
                },
                {
                    case: "a custom label",
                    labels: {closedState: "Custom combobox closed"},
                    expected: "Custom combobox closed",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange

                // Act
                render(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selectedLabels={[]}
                        selected={null}
                        selectionType="multiple"
                        opened={false}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });
        });

        describe("liveRegionCurrentItem", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected:
                        "translated Option 1 translated disabled translated selected, 1 of 2",
                },
                {
                    case: "a custom label",
                    labels: {
                        liveRegionCurrentItem: ({
                            current,
                            index,
                            total,
                        }: {
                            current: string;
                            index: number;
                            total: number;
                        }) => `Custom ${current}, ${index + 1} of ${total}`,
                    },
                    expected: "Custom Option 1, 1 of 2",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange
                const options = [
                    <OptionItem
                        key="1"
                        label="Option 1"
                        value="option1"
                        disabled={true}
                        selected={true}
                    />,
                    <OptionItem key="2" label="Option 2" value="option2" />,
                ];

                // Act
                render(
                    <ComboboxLiveRegion
                        focusedIndex={0}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selectedLabels={[]}
                        selected={null}
                        opened={true}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });

            it("announces the focused pill with the focused string from the config provider", () => {
                // Arrange

                // Act
                render(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={1}
                        options={options}
                        selected={["option1", "option2"]}
                        selectedLabels={["Option 1", "Option 2"]}
                        opened={true}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(
                    "translated Option 2 translated focused, 2 of 2",
                );
            });
        });

        describe("liveRegionListboxTotal", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected: "translated 2 results available",
                },
                {
                    case: "a custom label",
                    labels: {
                        liveRegionListboxTotal: (total: number) =>
                            `Custom ${total} results`,
                    },
                    expected: "Custom 2 results",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange

                // Act
                render(
                    <ComboboxLiveRegion
                        focusedIndex={0}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selectedLabels={[]}
                        selected={null}
                        opened={true}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });
        });

        describe("liveRegionMultipleSelectionTotal", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected: "translated 2 selected options",
                },
                {
                    case: "a custom label",
                    labels: {
                        liveRegionMultipleSelectionTotal: (total: number) =>
                            `Custom ${total} selected`,
                    },
                    expected: "Custom 2 selected",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange

                // Act
                render(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={1}
                        options={options}
                        selected={["option1", "option2"]}
                        selectedLabels={["Option 1", "Option 2"]}
                        opened={true}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });
        });

        describe("noItems", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected: "translated no results",
                },
                {
                    case: "an empty label",
                    labels: {noItems: ""},
                    expected: "translated no results",
                },
                {
                    case: "a custom label",
                    labels: {noItems: "Custom no results"},
                    expected: "Custom no results",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange

                // Act
                render(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={-1}
                        options={[]}
                        selectedLabels={[]}
                        selected={null}
                        opened={true}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });
        });

        describe("selected", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected: "translated Option 1 selected",
                },
                {
                    case: "a custom label",
                    labels: {
                        selected: (labels: string) =>
                            `Custom ${labels} selected`,
                    },
                    expected: "Custom Option 1 selected",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange

                // Act
                render(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selected="option1"
                        selectedLabels={["Option 1"]}
                        opened={false}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });
        });

        describe("selectionCleared", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected: "translated selection cleared",
                },
                {
                    case: "an empty label",
                    labels: {selectionCleared: ""},
                    expected: "translated selection cleared",
                },
                {
                    case: "a custom label",
                    labels: {selectionCleared: "Custom selection cleared"},
                    expected: "Custom selection cleared",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange
                const {rerender} = render(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selected="option1"
                        selectedLabels={["Option 1"]}
                        opened={false}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Act
                rerender(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selected={null}
                        selectedLabels={[]}
                        opened={false}
                        labels={labels}
                    />,
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });
        });

        describe("unselected", () => {
            it.each([
                {
                    case: "no label",
                    labels: undefined,
                    expected: "translated Option 1 not selected",
                },
                {
                    case: "a custom label",
                    labels: {
                        unselected: (labels: string) =>
                            `Custom ${labels} not selected`,
                    },
                    expected: "Custom Option 1 not selected",
                },
            ])("announces $expected when given $case", ({labels, expected}) => {
                // Arrange
                const {rerender} = render(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selected={["option1", "option2"]}
                        selectedLabels={["Option 1", "Option 2"]}
                        opened={false}
                        labels={labels}
                    />,
                    {wrapper: ConfigProvider},
                );

                // Act
                rerender(
                    <ComboboxLiveRegion
                        focusedIndex={-1}
                        focusedMultiSelectIndex={-1}
                        options={options}
                        selected={["option1"]}
                        selectedLabels={["Option 1"]}
                        opened={false}
                        labels={labels}
                    />,
                );

                // Assert
                expect(screen.getByRole("log")).toHaveTextContent(expected);
            });
        });
    });
});
