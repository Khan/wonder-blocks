import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import Accordion from "../accordion";
import AccordionSection from "../accordion-section";

describe("Accordion", () => {
    test("renders", () => {
        // Arrange

        // Act
        render(
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Assert
        expect(screen.getByText("Section 1")).toBeVisible();
        expect(screen.getByText("Section 2")).toBeVisible();
    });

    test("opens sections when clicked", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        const button1 = screen.getByRole("button", {name: "Section 1"});
        const button2 = screen.getByRole("button", {name: "Section 2"});

        // Act
        button1.click();
        button2.click();

        // Assert
        expect(screen.getByText("Section 1 content")).toBeVisible();
        expect(screen.getByText("Section 2 content")).toBeVisible();
    });

    test("closes sections when clicked", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        const button1 = screen.getByRole("button", {name: "Section 1"});
        const button2 = screen.getByRole("button", {name: "Section 2"});

        // Act
        // open
        button1.click();
        button2.click();
        // close
        button1.click();
        button2.click();

        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        expect(screen.queryByText("Section 2 content")).not.toBeVisible();
    });

    test("initialExpandedIndex opens the correct section", () => {
        // Arrange
        render(
            <Accordion initialExpandedIndex={1}>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        expect(screen.getByText("Section 2 content")).toBeVisible();
        expect(screen.queryByText("Section 3 content")).not.toBeVisible();
    });

    test("only allows one section to be open at a time when allowMultipleExpanded is false", () => {
        // Arrange
        render(
            <Accordion initialExpandedIndex={1} allowMultipleExpanded={false}>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const button = screen.getByRole("button", {name: "Section 3"});
        button.click();

        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        expect(screen.queryByText("Section 2 content")).not.toBeVisible();
        expect(screen.getByText("Section 3 content")).toBeVisible();
    });

    test("calls child's onToggle when section is clicked", () => {
        // Arrange
        const onToggleSpy = jest.fn();
        render(
            <Accordion>
                <AccordionSection header="Section 1" onToggle={onToggleSpy}>
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        const button = screen.getByRole("button", {name: "Section 1"});

        // Act
        button.click();

        // Assert
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    test("Other props are passed to the section", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1" testId="test-id-1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2" testId="test-id-2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const header1 = screen.getByTestId("test-id-1-header");
        const header2 = screen.getByTestId("test-id-2-header");

        // Assert
        expect(header1).toBeVisible();
        expect(header2).toBeVisible();
    });

    test("Styles the corners based on the square cornerKind", () => {
        // Arrange
        render(
            <Accordion cornerKind="square">
                {[
                    <AccordionSection header="Title" testId="section-test-id">
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section = screen.getByTestId("section-test-id");

        // Assert
        expect(section).toHaveStyle({
            borderRadius: 0,
        });
    });

    test("Styles the corners based on the rounded cornerKind", () => {
        // Arrange
        render(
            <Accordion cornerKind="rounded">
                {[
                    <AccordionSection header="Title" testId="section-test-id">
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section = screen.getByTestId("section-test-id");

        // Assert
        expect(section).toHaveStyle({
            borderStartStartRadius: "12px",
            borderStartEndRadius: "12px",
            borderEndStartRadius: "12px",
            borderEndEndRadius: "12px",
        });
    });

    test("Styles the corners based on the rounded-per-section cornerKind", () => {
        // Arrange
        render(
            <Accordion cornerKind="rounded-per-section">
                {[
                    <AccordionSection header="Title" testId="section-test-id">
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section = screen.getByTestId("section-test-id");

        // Assert
        expect(section).toHaveStyle({
            borderRadius: "12px",
        });
    });

    test("prioritizes the child's cornerKind prop", () => {
        // Arrange
        render(
            <Accordion cornerKind="square">
                {[
                    <AccordionSection
                        header="Title"
                        cornerKind="rounded-per-section"
                        testId="section-test-id"
                    >
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section = screen.getByTestId("section-test-id");

        // Assert
        expect(section).toHaveStyle({
            borderRadius: "12px",
        });
    });

    test("puts the caret first when caretPosition is start", () => {
        // Arrange
        render(
            <Accordion caretPosition="start">
                {[
                    <AccordionSection header="Title" testId="section-test-id">
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const sectionHeader = screen.getByTestId("section-test-id-header");

        // Assert
        expect(sectionHeader).toHaveStyle({
            flexDirection: "row-reverse",
        });
    });

    test("puts the caret last when caretPosition is end", () => {
        // Arrange
        render(
            <Accordion caretPosition="end">
                {[
                    <AccordionSection header="Title" testId="section-test-id">
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const sectionHeader = screen.getByTestId("section-test-id-header");

        // Assert
        expect(sectionHeader).toHaveStyle({
            flexDirection: "row",
        });
    });

    test("prioritizes the child's caretPosition prop", () => {
        // Arrange
        render(
            <Accordion caretPosition="end">
                {[
                    <AccordionSection
                        header="Title"
                        caretPosition="start"
                        testId="section-test-id"
                    >
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const sectionHeader = screen.getByTestId("section-test-id-header");

        // Assert
        expect(sectionHeader).toHaveStyle({
            flexDirection: "row-reverse",
        });
    });

    test("prioritizes the child's animated prop", () => {
        // Arrange
        render(
            <Accordion animated={false}>
                {[
                    <AccordionSection
                        header="Title"
                        animated={true}
                        testId="section-test-id"
                    >
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const sectionHeader = screen.getByTestId("section-test-id-header");

        // Assert
        // The child has animated=true, so the parent's animated=false
        // should be overridden.
        expect(sectionHeader).toHaveStyle({
            // The existence of the transition style means that the
            // accordion is animated.
            transition: "border-radius 300ms",
        });
    });

    test("applies style to the wrapper", () => {
        // Arrange
        render(
            <Accordion style={{color: "red"}}>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const wrapper = screen.getByRole("list");

        // Assert
        expect(wrapper).toHaveStyle({color: "red"});
    });

    test("applies region role to sections when there are 6 or fewer", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1" testId="section-1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
                <AccordionSection header="Section 4">
                    Section 4 content
                </AccordionSection>
                <AccordionSection header="Section 5">
                    Section 5 content
                </AccordionSection>
                <AccordionSection header="Section 6">
                    Section 6 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section1ContentPanel = screen.getByTestId(
            "section-1-content-panel",
        );

        // Assert
        expect(section1ContentPanel).toHaveAttribute("role", "region");
    });

    test("does not apply region role to sections when there are more than 6", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1" testId="section-1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
                <AccordionSection header="Section 4">
                    Section 4 content
                </AccordionSection>
                <AccordionSection header="Section 5">
                    Section 5 content
                </AccordionSection>
                <AccordionSection header="Section 6">
                    Section 6 content
                </AccordionSection>
                <AccordionSection header="Section 7">
                    Section 7 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section1ContentPanel = screen.getByTestId(
            "section-1-content-panel",
        );

        // Assert
        expect(section1ContentPanel).not.toHaveAttribute("role", "region");
    });

    test("appropriately sets aria-labelledby on the content panel", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection
                    id="accordion-section-id-for-test"
                    header="Section 1"
                    testId="section-1"
                >
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section1ContentPanel = screen.getByTestId(
            "section-1-content-panel",
        );

        // Assert
        expect(section1ContentPanel).toHaveAttribute(
            "aria-labelledby",
            "accordion-section-id-for-test-header",
        );
    });

    describe("keyboard navigation", () => {
        test("can open a section with the enter key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});

            // Act
            // Confirm that the section is closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();

            button1.focus();
            userEvent.keyboard("{enter}");

            // Assert
            // Confirm that the section is now open.
            expect(screen.getByText("Section 1 content")).toBeVisible();
        });

        test("can open a section with the space key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});

            // Act
            // Confirm that the section is closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();

            button1.focus();
            userEvent.keyboard("{space}");

            // Assert
            // Confirm that the section is now open.
            expect(screen.getByText("Section 1 content")).toBeVisible();
        });

        test("can close a section with the enter key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});

            // Act
            // Confirm that the section is open.
            button1.click();
            expect(screen.getByText("Section 1 content")).toBeVisible();

            button1.focus();
            userEvent.keyboard("{enter}");

            // Assert
            // Confirm that the section is now closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        });

        test("can close a section with the space key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});

            // Act
            // Confirm that the section is open.
            button1.click();
            expect(screen.getByText("Section 1 content")).toBeVisible();

            button1.focus();
            userEvent.keyboard("{space}");

            // Assert
            // Confirm that the section is now closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        });

        test("can navigate to the next section with the tab key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button2 = screen.getByRole("button", {name: "Section 2"});

            // Act
            button1.focus();
            userEvent.tab();

            // Assert
            expect(button2).toHaveFocus();
        });

        test("can navigate to the previous section with the shift+tab key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button2 = screen.getByRole("button", {name: "Section 2"});

            // Act
            button2.focus();
            userEvent.tab({shift: true});

            // Assert
            expect(button1).toHaveFocus();
        });

        test("can navigate to the next section with the arrow down key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button2 = screen.getByRole("button", {name: "Section 2"});

            // Act
            button1.focus();
            userEvent.keyboard("{arrowdown}");

            // Assert
            expect(button2).toHaveFocus();
        });

        test("can cycle to the first section with the arrow down key from the last section", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2" testId="section-2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button3 = screen.getByRole("button", {name: "Section 3"});

            // Act
            button3.focus();
            userEvent.keyboard("{arrowdown}");

            // Assert
            expect(button1).toHaveFocus();
            expect(button3).not.toHaveFocus();
        });

        test("can navigate to the previous section with the arrow up key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button2 = screen.getByRole("button", {name: "Section 2"});

            // Act
            button2.focus();
            userEvent.keyboard("{arrowup}");

            // Assert
            expect(button1).toHaveFocus();
        });

        test("can cycle to the last section with the arrow up key from the first section", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2" testId="section-2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button3 = screen.getByRole("button", {name: "Section 3"});

            // Act
            button1.focus();
            userEvent.keyboard("{arrowup}");

            // Assert
            expect(button3).toHaveFocus();
            expect(button1).not.toHaveFocus();
        });

        test("can navigate to the first section with the home key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button2 = screen.getByRole("button", {name: "Section 2"});
            const button3 = screen.getByRole("button", {name: "Section 3"});

            // Act
            button3.focus();
            userEvent.keyboard("{home}");

            // Assert
            expect(button1).toHaveFocus();
            expect(button2).not.toHaveFocus();
            expect(button3).not.toHaveFocus();
        });

        test("can navigate to the last section with the end key", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = screen.getByRole("button", {name: "Section 1"});
            const button2 = screen.getByRole("button", {name: "Section 2"});
            const button3 = screen.getByRole("button", {name: "Section 3"});

            // Act
            button1.focus();
            userEvent.keyboard("{end}");

            // Assert
            expect(button1).not.toHaveFocus();
            expect(button2).not.toHaveFocus();
            expect(button3).toHaveFocus();
        });
    });
});
