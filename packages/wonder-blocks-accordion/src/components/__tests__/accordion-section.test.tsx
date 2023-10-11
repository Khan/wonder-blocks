import * as React from "react";
import {render, screen} from "@testing-library/react";

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import AccordionSection from "../accordion-section";

describe("AccordionSection", () => {
    test("renders without open panel when expanded is false", () => {
        // Arrange

        // Act
        render(
            <AccordionSection header="Title">Section content</AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Assert
        expect(screen.getByText("Title")).toBeVisible();
        expect(screen.queryByText("Section content")).not.toBeInTheDocument();
    });

    test("renders with open panel when expanded is true", () => {
        // Arrange

        // Act
        render(
            <AccordionSection header="Title" expanded={true}>
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Assert
        expect(screen.getByText("Title")).toBeVisible();
        expect(screen.queryByText("Section content")).toBeVisible();
    });

    test("renders children when child is a react element", () => {
        // Arrange

        // Act
        render(
            <AccordionSection header="Title" expanded={true}>
                <div>Section content</div>
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Assert
        expect(screen.getByText("Title")).toBeVisible();
        expect(screen.queryByText("Section content")).toBeVisible();
    });

    test("calls onToggle when clicked (controlled)", () => {
        // Arrange
        const onToggleSpy = jest.fn();

        render(
            <AccordionSection
                header="Title"
                expanded={false}
                onToggle={onToggleSpy}
            >
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        const button = screen.getByRole("button", {name: "Title"});

        // Act
        button.click();

        // Assert
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    test("calls onToggle when clicked (uncontrolled)", () => {
        // Arrange
        const onToggleSpy = jest.fn();

        render(
            <AccordionSection header="Title" onToggle={onToggleSpy}>
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        const button = screen.getByRole("button", {name: "Title"});

        // Act
        button.click();

        // Assert
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    test("shows/hides panel when clicked (uncontrolled)", () => {
        // Arrange
        render(
            <AccordionSection header="Title">Section content</AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        // Make sure the section is closed at first
        expect(screen.queryByText("Section content")).not.toBeInTheDocument();

        const button = screen.getByRole("button", {name: "Title"});
        button.click();

        // Assert
        // Make sure the section has opened after clicking
        expect(screen.getByText("Section content")).toBeVisible();
        // Repeat clicking to confirm behavior
        button.click();
        expect(screen.queryByText("Section content")).not.toBeInTheDocument();
    });

    test("is h2 by default", () => {
        // Arrange
        render(
            <AccordionSection header="Title">Section content</AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const header = screen.getByRole("heading", {level: 2});

        // Assert
        expect(header).toBeVisible();
    });

    test("uses provided tag", () => {
        // Arrange
        render(
            <AccordionSection header="Title" tag="h3">
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const header = screen.getByRole("heading", {level: 3});

        // Assert
        expect(header).toBeVisible();
    });

    test("uses headerTestId as button's data-test-id", () => {
        // Arrange
        render(
            <AccordionSection
                header="Title"
                headerTestId="accordion-section-header"
            >
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const button = screen.getByRole("button", {name: "Title"});

        // Assert
        expect(button).toHaveAttribute(
            "data-test-id",
            "accordion-section-header",
        );
    });

    test("wrapper style when cornerKind is square", () => {
        // Arrange
        render(
            <AccordionSection
                header="Title"
                cornerKind="square"
                testId="accordion-section-test-id"
            >
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const wrapper = screen.getByTestId("accordion-section-test-id");

        // Assert
        expect(wrapper).toHaveStyle({"border-radius": 0});
    });

    test("wrapper style when cornerKind is rounded", () => {
        // Arrange
        render(
            <AccordionSection
                header="Title"
                cornerKind="rounded"
                testId="accordion-section-test-id"
            >
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const wrapper = screen.getByTestId("accordion-section-test-id");

        // Assert
        expect(wrapper).toHaveStyle({
            borderStartStartRadius: "12px",
            borderStartEndRadius: "12px",
            borderEndStartRadius: "12px",
            borderEndEndRadius: "12px",
        });
    });

    test("wrapper style when cornerKind is rounded-per-section", () => {
        // Arrange
        render(
            <AccordionSection
                header="Title"
                cornerKind="rounded-per-section"
                testId="accordion-section-test-id"
            >
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const wrapper = screen.getByTestId("accordion-section-test-id");

        // Assert
        expect(wrapper).toHaveStyle({
            "border-radius": "12px",
        });
    });
});
