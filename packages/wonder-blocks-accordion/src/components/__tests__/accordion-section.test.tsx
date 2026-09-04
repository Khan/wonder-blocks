import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

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

    describe("nested heading warning", () => {
        // Spies aren't reset between tests in this repo.
        afterEach(() => {
            jest.restoreAllMocks();
        });

        test("warns when a Heading is passed as the header", () => {
            // Arrange
            const warnSpy = jest
                .spyOn(console, "warn")
                .mockImplementation(() => {});

            // Act
            render(
                // The misuse under test, so the lint rule is disabled here.
                // eslint-disable-next-line @khanacademy/wonder-blocks/no-heading-in-accordion-header
                <AccordionSection header={<Heading>Title</Heading>}>
                    Section content
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining(
                    "AccordionSection's header contains a heading",
                ),
            );
        });

        test("warns when a raw heading element is passed as the header", () => {
            // Arrange
            const warnSpy = jest
                .spyOn(console, "warn")
                .mockImplementation(() => {});

            // Act
            render(
                // The misuse under test, so the lint rule is disabled here.
                // eslint-disable-next-line @khanacademy/wonder-blocks/no-heading-in-accordion-header
                <AccordionSection header={<h3>Title</h3>}>
                    Section content
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(warnSpy).toHaveBeenCalledTimes(1);
        });

        test("warns when the header content uses role=heading", () => {
            // Arrange
            const warnSpy = jest
                .spyOn(console, "warn")
                .mockImplementation(() => {});

            // Act
            render(
                // The misuse under test, so the lint rule is disabled here.
                // eslint-disable-next-line @khanacademy/wonder-blocks/no-heading-in-accordion-header
                <AccordionSection header={<View role="heading">Title</View>}>
                    Section content
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(warnSpy).toHaveBeenCalledTimes(1);
        });

        test("warns when a Heading is nested inside the header content", () => {
            // Arrange
            const warnSpy = jest
                .spyOn(console, "warn")
                .mockImplementation(() => {});
            const CustomHeader = () => <Heading>Title</Heading>;

            // Act
            render(
                <AccordionSection header={<CustomHeader />}>
                    Section content
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(warnSpy).toHaveBeenCalledTimes(1);
        });

        test("does not warn for a Heading in the content panel", () => {
            // Arrange
            const warnSpy = jest
                .spyOn(console, "warn")
                .mockImplementation(() => {});

            // Act
            render(
                <AccordionSection header="Title">
                    <Heading>Panel heading</Heading>
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(warnSpy).not.toHaveBeenCalled();
        });

        test("does not warn for inline typography in the header", () => {
            // Arrange
            const warnSpy = jest
                .spyOn(console, "warn")
                .mockImplementation(() => {});

            // Act
            render(
                <AccordionSection
                    header={<BodyText tag="span">Title</BodyText>}
                >
                    Section content
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(warnSpy).not.toHaveBeenCalled();
        });
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

    describe("data-expanded", () => {
        // The expanded/collapsed row sizing is selected off this attribute
        // rather than by swapping classes, so it has to track the state.
        test("reflects the expanded state when it changes", async () => {
            // Arrange
            render(
                <AccordionSection header="Title" testId="accordion-section">
                    Section content
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );
            const wrapper = screen.getByTestId("accordion-section");
            expect(wrapper).toHaveAttribute("data-expanded", "false");

            // Act
            await userEvent.click(screen.getByRole("button"));

            // Assert
            expect(wrapper).toHaveAttribute("data-expanded", "true");
        });

        test("is true when the section is not collapsible", () => {
            // Arrange

            // Act
            render(
                <AccordionSection
                    header="Title"
                    collapsible={false}
                    testId="accordion-section"
                >
                    Section content
                </AccordionSection>,
                {wrapper: RenderStateRoot},
            );

            // Assert
            expect(screen.getByTestId("accordion-section")).toHaveAttribute(
                "data-expanded",
                "true",
            );
        });
    });
});
