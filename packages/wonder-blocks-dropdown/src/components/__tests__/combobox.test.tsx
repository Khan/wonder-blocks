import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import {PointerEventsCheckLevel, userEvent} from "@testing-library/user-event";
import Combobox from "../combobox";
import OptionItem from "../option-item";

const doRender = (element: React.ReactElement) => {
    render(element, {wrapper: RenderStateRoot});
    return userEvent.setup({
        pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
};

describe("Combobox", () => {
    it("should render the combobox", () => {
        // Arrange

        // Act
        doRender(
            <Combobox selectionType="single" value={null}>
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Assert
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should assign the correct value when passed in", () => {
        // Arrange

        // Act
        doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Assert
        expect(screen.getByRole("combobox")).toHaveValue("option2");
    });

    it("should open the listbox when the button is clicked", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        await screen.findByRole("listbox", {hidden: true});
    });

    it("should not open the listbox when disabled", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2" disabled={true}>
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Act
        // Focus the combobox
        await userEvent.tab();

        // Assert
        await waitFor(() => {
            expect(
                screen.queryByRole("listbox", {hidden: true}),
            ).not.toBeInTheDocument();
        });
    });

    it("should close the listbox when the button is clicked again", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        await userEvent.click(screen.getByRole("button"));
        await screen.findByRole("listbox", {hidden: true});

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        expect(
            screen.queryByRole("listbox", {hidden: true}),
        ).not.toBeInTheDocument();
    });

    it("should close the listbox when the user presses Escape", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();
        await screen.findByRole("listbox", {hidden: true});

        // Act
        await userEvent.keyboard("{Escape}");

        // Assert
        expect(
            screen.queryByRole("listbox", {hidden: true}),
        ).not.toBeInTheDocument();
    });

    it("should reopen the listbox when the user presses ArrowDown", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();
        await screen.findByRole("listbox", {hidden: true});
        // Close the listbox
        await userEvent.keyboard("{Escape}");

        // Act
        await userEvent.keyboard("{ArrowDown}");

        // Assert
        await screen.findByRole("listbox", {hidden: true});
    });

    it("should call the onChange callback when the value changes", async () => {
        // Arrange
        const onChange = jest.fn();
        const userEvent = doRender(
            <Combobox
                selectionType="single"
                value="option2"
                onChange={onChange}
            >
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        await userEvent.click(screen.getByRole("button"));
        await screen.findByRole("listbox", {hidden: true});

        // Act
        const options = screen.getAllByRole("option", {hidden: true});
        await userEvent.click(options[2]);

        // Assert
        expect(onChange).toHaveBeenCalledWith("option3");
    });

    it("should focus on the correct option when typing", async () => {
        // Arrange
        const onChange = jest.fn();
        const userEvent = doRender(
            <Combobox
                selectionType="single"
                value=""
                onChange={onChange}
                id="combobox"
            >
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Act
        await userEvent.type(screen.getByRole("combobox"), "3");

        // Assert
        const combobox = screen.getByRole("combobox");
        // Make sure the combobox has DOM focus.
        expect(combobox).toHaveFocus();
        // Verify that the option has visual focus.
        expect(combobox).toHaveAttribute(
            "aria-activedescendant",
            "combobox-option-2",
        );
    });

    it("should search for the correct option when typing", async () => {
        // Arrange
        const onChange = jest.fn();
        const userEvent = doRender(
            <Combobox selectionType="single" value="" onChange={onChange}>
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        await userEvent.type(screen.getByRole("combobox"), "3");

        // Act
        await userEvent.keyboard("{enter}");

        // Assert
        expect(screen.getByRole("combobox")).toHaveValue("option 3");
    });

    it("should blur the combobox when tabbing out", async () => {
        // Arrange
        const userEvent = doRender(
            <Combobox selectionType="single" value="option2">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Combobox>,
        );

        // Focus the combobox
        await userEvent.tab();

        // Act
        // Tab out of the combobox
        await userEvent.tab();

        // Assert
        expect(screen.getByRole("combobox")).not.toHaveFocus();
    });
});
