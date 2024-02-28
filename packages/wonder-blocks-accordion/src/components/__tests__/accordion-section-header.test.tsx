import * as React from "react";
import {render, screen} from "@testing-library/react";

import AccordionSectionHeader from "../accordion-section-header";

describe("AccordionSectionHeader", () => {
    test("renders with string header, h2 by default", () => {
        // Arrange
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header="Title"
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={false}
                onClick={() => {}}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
            />,
        );

        // Act
        const header = screen.getByRole("heading", {level: 2, name: "Title"});

        // Assert
        expect(header).toBeVisible();
    });

    test("renders with the specified tag", () => {
        // Arrange
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header="Title"
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={false}
                onClick={() => {}}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
                tag="h3"
            />,
        );

        // Act
        const header = screen.getByRole("heading", {level: 3, name: "Title"});

        // Assert
        expect(header).toBeVisible();
    });

    test("renders with react element header", () => {
        // Arrange

        // Act
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header={<div>Section content</div>}
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={false}
                onClick={() => {}}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
            />,
        );

        // Assert
        expect(screen.getByText("Section content")).toBeVisible();
    });

    test("clicking on the header calls onClick", () => {
        // Arrange
        const onClickSpy = jest.fn();

        // Act
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header="Title"
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={false}
                onClick={onClickSpy}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
            />,
        );
        screen.getByText("Title").click();

        // Assert
        expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    test("includes transition styles when animated is true", () => {
        // Arrange
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header="Title"
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={true}
                onClick={() => {}}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
            />,
        );

        // Act
        const header = screen.getByRole("button");

        // Assert
        expect(header).toHaveStyle({
            transition: "border-radius 300ms",
        });
    });

    test("does not include transition styles when animated is false", () => {
        // Arrange
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header="Title"
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={false}
                onClick={() => {}}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
            />,
        );

        // Act
        const header = screen.getByRole("button");

        // Assert
        expect(header).not.toHaveStyle({
            transition: "border-radius 300ms",
        });
    });

    test("shows icon when collapsible is true", () => {
        // Arrange
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header="Title"
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={false}
                collapsible={true}
                onClick={() => {}}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
                testId="accordion-section-header"
            />,
        );

        // Act
        const icon = screen.queryByTestId(
            "accordion-section-header-caret-icon",
        );

        // Assert
        expect(icon).toBeInTheDocument();
    });

    test("does not show icon when collapsible is false", () => {
        // Arrange
        render(
            <AccordionSectionHeader
                id="accordion-section-header"
                header="Title"
                caretPosition="end"
                cornerKind="square"
                expanded={false}
                animated={false}
                collapsible={false}
                onClick={() => {}}
                sectionContentUniqueId="section-content-unique-id"
                isFirstSection={false}
                isLastSection={false}
                testId="accordion-section-header"
            />,
        );

        // Act
        const icon = screen.queryByTestId(
            "accordion-section-header-caret-icon",
        );

        // Assert
        expect(icon).not.toBeInTheDocument();
    });
});
