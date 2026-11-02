/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import ActionItem from "../action-item";
import ActionMenu from "../action-menu";
import Combobox from "../combobox";
import {CustomOpener} from "../custom-opener";
import Listbox from "../listbox";
import MultiSelect from "../multi-select";
import OptionItem from "../option-item";
import SeparatorItem from "../separator-item";
import SingleSelect from "../single-select";

jest.mock("react-popper", () => ({
    ...jest.requireActual("react-popper"),
    Popper: jest.fn().mockImplementation(({children}) => {
        return children({
            ref: jest.fn(),
            style: {},
            placement: "bottom",
            isReferenceHidden: false,
        });
    }),
}));

describe("data-wb-component", () => {
    describe.each([
        [
            "SingleSelect",
            (opened: boolean) => (
                <SingleSelect
                    placeholder="Choose"
                    onChange={() => {}}
                    opened={opened}
                    onToggle={() => {}}
                >
                    <OptionItem label="Option" value="option" />
                    <OptionItem label="Option 2" value="option-2" />
                </SingleSelect>
            ),
        ],
        [
            "MultiSelect",
            (opened: boolean) => (
                <MultiSelect
                    onChange={() => {}}
                    opened={opened}
                    onToggle={() => {}}
                >
                    <OptionItem label="Option" value="option" />
                    <OptionItem label="Option 2" value="option-2" />
                </MultiSelect>
            ),
        ],
        [
            "ActionMenu",
            (opened: boolean) => (
                <ActionMenu menuText="Menu" opened={opened} onToggle={() => {}}>
                    <ActionItem label="Action" />
                </ActionMenu>
            ),
        ],
    ])("%s", (name, renderDropdown) => {
        it("should set the name on the root element", () => {
            // Arrange
            const {container} = render(renderDropdown(false));

            // Act
            // NOTE: The root element doesn't expose a role or a test id.
            const root = container.firstChild;

            // Assert
            expect(root).toHaveAttribute("data-wb-component", name);
        });

        it("should set the name on the dropdown menu", () => {
            // Arrange
            render(renderDropdown(true));

            // Act
            const menu = screen.getByTestId("dropdown-core-container");

            // Assert
            expect(menu).toHaveAttribute("data-wb-component", name);
        });
    });

    it.each([
        [
            "OptionItem",
            "option",
            <SingleSelect
                key="1"
                placeholder="Choose"
                onChange={() => {}}
                opened={true}
                onToggle={() => {}}
            >
                <OptionItem label="Option" value="option" />
                <OptionItem label="Option 2" value="option-2" />
            </SingleSelect>,
        ],
        [
            "ActionItem",
            "menuitem",
            <ActionMenu
                key="2"
                menuText="Menu"
                opened={true}
                onToggle={() => {}}
            >
                <ActionItem label="Action" />
            </ActionMenu>,
        ],
    ] as const)("should set the %s name on the item", (name, role, element) => {
        // Arrange
        render(element);

        // Act
        const item = screen.getAllByRole(role)[0];

        // Assert
        expect(item).toHaveAttribute("data-wb-component", name);
    });

    it("should set the SeparatorItem name on the root element", () => {
        // Arrange
        const {container} = render(<SeparatorItem />);

        // Act
        // NOTE: The separator is hidden and doesn't expose a test id.
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "SeparatorItem");
    });

    it("should set the Listbox name on the root element", () => {
        // Arrange
        render(
            <Listbox aria-label="Listbox" selectionType="single">
                <OptionItem label="Option" value="option" />
                <OptionItem label="Option 2" value="option-2" />
            </Listbox>,
        );

        // Act
        const root = screen.getByRole("listbox");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Listbox");
    });

    it("should set the Combobox name on the root element", () => {
        // Arrange
        const {container} = render(
            <Combobox selectionType="single" value="">
                <OptionItem label="Option" value="option" />
                <OptionItem label="Option 2" value="option-2" />
            </Combobox>,
        );

        // Act
        // NOTE: The root element doesn't expose a role or a test id.
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Combobox");
    });

    it("should set the CustomOpener name on the root element", () => {
        // Arrange
        render(<CustomOpener>Opener</CustomOpener>);

        // Act
        const root = screen.getByRole("button");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "CustomOpener");
    });
});
