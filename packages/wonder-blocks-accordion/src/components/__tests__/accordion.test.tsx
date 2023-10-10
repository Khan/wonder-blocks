import * as React from "react";
import {render, screen} from "@testing-library/react";

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
        expect(screen.queryByText("Section 1 content")).not.toBeInTheDocument();
        expect(screen.queryByText("Section 2 content")).not.toBeInTheDocument();
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
        );

        // Act
        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeInTheDocument();
        expect(screen.getByText("Section 2 content")).toBeVisible();
        expect(screen.queryByText("Section 3 content")).not.toBeInTheDocument();
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
        );

        // Act
        const button = screen.getByRole("button", {name: "Section 3"});
        button.click();

        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeInTheDocument();
        expect(screen.queryByText("Section 2 content")).not.toBeInTheDocument();
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
        );

        const button = screen.getByRole("button", {name: "Section 1"});

        // Act
        button.click();

        // Assert
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    test("Uses the correct tag for the headers", () => {
        // Arrange
        render(
            <Accordion tag="h3">
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
        );

        // Act
        // Assert
        const headers = screen.getAllByRole("heading", {level: 3});
        expect(headers).toHaveLength(2);
    });

    test("Uses the child's tag for the headers when the child tag is set", () => {
        // Arrange
        render(
            <Accordion tag="h3">
                <AccordionSection header="Section 1" tag="h4">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
            </Accordion>,
        );

        // Act
        // Assert
        const headers = screen.getAllByRole("heading", {level: 3});
        const headerWithProp = screen.getByRole("heading", {level: 4});
        expect(headers).toHaveLength(2);
        expect(headerWithProp).toBeVisible();
    });

    test("Other props are passed to the section", () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection
                    header="Section 1"
                    headerTestId="header-test-id-1"
                >
                    Section 1 content
                </AccordionSection>
                <AccordionSection
                    header="Section 2"
                    headerTestId="header-test-id-2"
                >
                    Section 2 content
                </AccordionSection>
            </Accordion>,
        );

        // Act
        const header1 = screen.getByTestId("header-test-id-1");
        const header2 = screen.getByTestId("header-test-id-2");

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
                    <AccordionSection
                        header="Title"
                        headerTestId="section-header-test-id"
                    >
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
        );

        // Act
        const sectionHeader = screen.getByTestId("section-header-test-id");

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
                    <AccordionSection
                        header="Title"
                        headerTestId="section-header-test-id"
                    >
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
        );

        // Act
        const sectionHeader = screen.getByTestId("section-header-test-id");

        // Assert
        expect(sectionHeader).toHaveStyle({
            flexDirection: "row",
        });
    });

    test("prioritizes the parent's caretPosition prop", () => {
        // Arrange
        render(
            <Accordion caretPosition="start">
                {[
                    <AccordionSection
                        header="Title"
                        caretPosition="end"
                        headerTestId="section-header-test-id"
                    >
                        Section content
                    </AccordionSection>,
                ]}
            </Accordion>,
        );

        // Act
        const sectionHeader = screen.getByTestId("section-header-test-id");

        // Assert
        expect(sectionHeader).toHaveStyle({
            flexDirection: "row-reverse",
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
        );

        // Act
        const wrapper = screen.getByRole("list");

        // Assert
        expect(wrapper).toHaveStyle({color: "red"});
    });
});
