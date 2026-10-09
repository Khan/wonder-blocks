import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";

import {defaultComboboxLabels} from "../../util/constants";
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
            srComboboxClosed: "El combobox está cerrado",
            srComboboxCurrentItem: ({
                current,
                index,
                total,
            }: {
                current: string;
                index: number;
                total: number;
            }) => `${current}, ${index} de ${total}.`,
            srComboboxResultsTotal: ({total}: {total: number}) =>
                `${total} resultados disponibles.`,
            srComboboxSelectedTotal: ({total}: {total: number}) =>
                `${total} opciones seleccionadas.`,
            srItemDisabled: "deshabilitado",
            srItemFocused: "enfocado",
            srItemSelected: "seleccionado",
            srSelected: ({labels}: {labels: string}) =>
                `${labels} seleccionado`,
            srSelectionCleared: "Selección borrada",
        };

        const ConfigProvider = ({children}: {children: React.ReactNode}) => (
            <WonderBlocksConfigProvider
                i18n={{strings: translatedStrings, locale: "es"}}
            >
                {children}
            </WonderBlocksConfigProvider>
        );

        it("announces the current item using the strings from the config provider", () => {
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
                />,
                {wrapper: ConfigProvider},
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Option 1 deshabilitado seleccionado, 1 de 2. 2 resultados disponibles.",
            );
        });

        it("announces the focused pill using the strings from the config provider", () => {
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
                "Option 2 enfocado, 2 de 2. 2 opciones seleccionadas.",
            );
        });

        it("announces the selected item using the string from the config provider", () => {
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
                />,
                {wrapper: ConfigProvider},
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Option 1 seleccionado",
            );
        });

        it("announces the cleared selection using the string from the config provider", () => {
            // Arrange
            const {rerender} = render(
                <ComboboxLiveRegion
                    focusedIndex={-1}
                    focusedMultiSelectIndex={-1}
                    options={options}
                    selected="option1"
                    selectedLabels={["Option 1"]}
                    opened={false}
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
                />,
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Selección borrada",
            );
        });

        it("announces the closed state using the string from the config provider", () => {
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
                />,
                {wrapper: ConfigProvider},
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "El combobox está cerrado",
            );
        });

        it("uses the labels prop over the strings from the config provider", () => {
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
                    labels={{
                        ...defaultComboboxLabels,
                        closedState: "Closed override",
                    }}
                />,
                {wrapper: ConfigProvider},
            );

            // Assert
            expect(screen.getByRole("log")).toHaveTextContent(
                "Closed override",
            );
        });
    });
});
