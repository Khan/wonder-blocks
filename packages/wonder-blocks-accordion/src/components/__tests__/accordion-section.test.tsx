import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

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
        expect(screen.queryByText("Section content")).not.toBeVisible();
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

    test("calls onToggle when clicked (controlled)", async () => {
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
        await userEvent.click(button);

        // Assert
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    test("calls onToggle when clicked (uncontrolled: no expanded, includes onToggle)", async () => {
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
        await userEvent.click(button);

        // Assert
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    test("shows/hides panel when clicked (uncontrolled: includes expanded, no onToggle)", async () => {
        // Arrange
        render(
            <AccordionSection header="Title" expanded={true}>
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        // Make sure the section is open at first
        expect(screen.getByText("Section content")).toBeVisible();

        const button = screen.getByRole("button", {name: "Title"});
        await userEvent.click(button);

        // Assert
        // Make sure the section has closed after clicking
        expect(screen.queryByText("Section content")).not.toBeVisible();
        // Repeat clicking to confirm behavior
        await userEvent.click(button);
        expect(screen.getByText("Section content")).toBeVisible();
    });

    test("shows/hides panel when clicked (uncontrolled: no expanded, no onToggle)", async () => {
        // Arrange
        render(
            <AccordionSection header="Title">Section content</AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        // Make sure the section is closed at first
        expect(screen.queryByText("Section content")).not.toBeVisible();

        const button = screen.getByRole("button", {name: "Title"});
        await userEvent.click(button);

        // Assert
        // Make sure the section has opened after clicking
        expect(screen.getByText("Section content")).toBeVisible();
        // Repeat clicking to confirm behavior
        await userEvent.click(button);
        expect(screen.queryByText("Section content")).not.toBeVisible();
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

    test("uses the header's testId as button's data-testid", () => {
        // Arrange
        render(
            <AccordionSection header="Title" testId="accordion-section">
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const button = screen.getByRole("button", {name: "Title"});

        // Assert
        expect(button).toHaveAttribute(
            "data-testid",
            "accordion-section-header",
        );
    });

    test("aria-disabled is false by default", () => {
        // Arrange
        render(
            <AccordionSection header="Title">Section content</AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const button = screen.getByRole("button", {name: "Title"});

        // Assert
        expect(button).toHaveAttribute("aria-disabled", "false");
    });

    test("sets aria-disabled to true when collapsible prop is false", () => {
        // Arrange
        render(
            <AccordionSection header="Title" collapsible={false}>
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const button = screen.getByRole("button", {name: "Title"});

        // Assert
        expect(button).toHaveAttribute("aria-disabled", "true");
    });

    test("does not allow clicking when collapsible prop is false", async () => {
        // Arrange
        render(
            <AccordionSection header="Title" collapsible={false}>
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const button = screen.getByRole("button", {name: "Title"});
        button.click();

        // Assert
        // Confirm the content is still visible even though the
        // header button was clicked.
        expect(screen.queryByText("Section content")).toBeVisible();
    });

    test("includes transition when animated is true", () => {
        // Arrange
        render(
            <AccordionSection
                header="Title"
                animated={true}
                testId="accordion-section"
            >
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const wrapper = screen.getByTestId("accordion-section");
        const header = screen.getByTestId("accordion-section-header");

        // Assert
        expect(wrapper).toHaveStyle({
            transition: "grid-template-rows 300ms",
        });
        expect(header).toHaveStyle({
            transition: "border-radius 300ms",
        });
    });

    test("does not include transition when animated is false", () => {
        // Arrange
        render(
            <AccordionSection
                header="Title"
                animated={false}
                testId="accordion-section"
            >
                Section content
            </AccordionSection>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const wrapper = screen.getByTestId("accordion-section");
        const header = screen.getByTestId("accordion-section-header");

        // Assert
        expect(wrapper).not.toHaveStyle({
            transition: "grid-template-rows 300ms",
        });
        expect(header).not.toHaveStyle({
            transition: "border-radius 300ms",
        });
    });
});
