import * as React from "react";
import {render, screen} from "@testing-library/react";

import {userEvent} from "@testing-library/user-event";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import Listbox from "../listbox";
import OptionItem from "../option-item";

describe("Listbox", () => {
    it("should render the listbox", () => {
        // Arrange

        // Act
        render(
            <Listbox value={null} selectionType="single">
                <OptionItem label="option 1" value="option1" />
                <OptionItem label="option 2" value="option2" />
                <OptionItem label="option 3" value="option3" />
            </Listbox>,
            {wrapper: RenderStateRoot},
        );

        // Assert
        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    describe("focus", () => {
        it("should focus on the listbox when tabbing", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option2">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.tab();

            // Assert
            expect(screen.getByRole("listbox")).toHaveFocus();
        });

        it("should blur the listbox when tabbing out", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option2">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.tab();
            await userEvent.tab();

            // Assert
            expect(screen.getByRole("listbox")).not.toHaveFocus();
        });

        it("should give visual focus on the selected option item", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option2" id="listbox">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.tab();

            // Assert
            expect(screen.getByRole("listbox")).toHaveAttribute(
                "aria-activedescendant",
                "listbox-option-1",
            );
        });
    });

    describe("keyboard navigation", () => {
        it("should focus on the first option item", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option2" id="listbox">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{home}");

            // Assert
            expect(screen.getByRole("listbox")).toHaveAttribute(
                "aria-activedescendant",
                "listbox-option-0",
            );
        });

        it("should focus on the last option item", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option1" id="listbox">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{end}");

            // Assert
            expect(screen.getByRole("listbox")).toHaveAttribute(
                "aria-activedescendant",
                "listbox-option-2",
            );
        });
        it("should focus on the next option item", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option2" id="listbox">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{arrowdown}");

            // Assert
            expect(screen.getByRole("listbox")).toHaveAttribute(
                "aria-activedescendant",
                "listbox-option-2",
            );
        });

        it("should focus on the previous option item", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option2" id="listbox">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{arrowup}");

            // Assert
            expect(screen.getByRole("listbox")).toHaveAttribute(
                "aria-activedescendant",
                "listbox-option-0",
            );
        });

        it("should navigate to the first option item when pressing arrow down on the last item", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option3" id="listbox">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{arrowdown}");

            // Assert
            expect(screen.getByRole("listbox")).toHaveAttribute(
                "aria-activedescendant",
                "listbox-option-0",
            );
        });

        it("should navigate to the first option item when pressing arrow up on the first item", async () => {
            // Arrange
            render(
                <Listbox selectionType="single" value="option1" id="listbox">
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{arrowup}");

            // Assert
            expect(screen.getByRole("listbox")).toHaveAttribute(
                "aria-activedescendant",
                "listbox-option-2",
            );
        });
    });

    describe("single selection", () => {
        it("should select an option item when pressing Enter", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <Listbox selectionType="single" value="" onChange={onChange}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{enter}");

            // Assert
            expect(onChange).toHaveBeenCalledWith("option1");
        });

        it("should select an item when pressing space", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <Listbox selectionType="single" value="" onChange={onChange}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard(" ");

            // Assert
            expect(onChange).toHaveBeenCalledWith("option1");
        });

        it("should set the selected option item with aria-selected", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <Listbox selectionType="single" value="" onChange={onChange}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{enter}");

            // Assert
            expect(
                screen.getByRole("option", {name: "option 1"}),
            ).toHaveAttribute("aria-selected", "true");
        });

        it("should select an option item when clicking on it", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <Listbox selectionType="single" value="" onChange={onChange}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                screen.getByRole("option", {name: "option 3"}),
            );

            // Assert
            expect(onChange).toHaveBeenCalledWith("option3");
        });

        it("should not allow selecting an option item when disabled", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <Listbox
                    selectionType="single"
                    value={null}
                    onChange={onChange}
                    disabled
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" disabled />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                screen.getByRole("option", {name: "option 3"}),
            );

            // Assert
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe("multiple selection", () => {
        it("should select multiple option items when pressing Enter", async () => {
            // Arrange
            const onChange = jest.fn();
            render(
                <Listbox selectionType="multiple" onChange={onChange}>
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Focus on the listbox
            await userEvent.tab();

            // Act
            await userEvent.keyboard("{enter}");
            await userEvent.keyboard("{arrowdown}");
            await userEvent.keyboard("{enter}");

            // Assert
            expect(onChange).toHaveBeenCalledWith(["option1", "option2"]);
        });
    });

    describe("aria", () => {
        it("should announce aria-labelledby correctly", () => {
            // Arrange
            render(
                <>
                    <Listbox
                        value={null}
                        selectionType="single"
                        aria-labelledby="label"
                    >
                        <OptionItem label="option 1" value="option1" />
                        <OptionItem label="option 2" value="option2" />
                        <OptionItem label="option 3" value="option3" />
                    </Listbox>
                    <div id="label">Accessible label</div>
                </>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(
                screen.getByRole("listbox", {
                    name: "Accessible label",
                }),
            ).toBeInTheDocument();
        });

        it("should announce aria-label correctly", () => {
            // Arrange
            render(
                <Listbox
                    value={null}
                    selectionType="single"
                    aria-label="Accessible label"
                >
                    <OptionItem label="option 1" value="option1" />
                    <OptionItem label="option 2" value="option2" />
                    <OptionItem label="option 3" value="option3" />
                </Listbox>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(
                screen.getByRole("listbox", {
                    name: "Accessible label",
                }),
            ).toBeInTheDocument();
        });
    });
});
