import * as React from "react";
import {render, screen, within} from "@testing-library/react";

import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";
import FlexibleDialog from "../flexible-dialog";

describe("FlexibleDialog", () => {
    test("testId should be set in the Dialog element", () => {
        // Arrange
        render(
            <FlexibleDialog
                title="Dialog with content"
                content={<div>dummy content</div>}
                testId="flexible-dialog-example"
            />,
        );

        // Act
        const dialog = screen.getByRole("dialog");

        // Assert
        expect(dialog).toHaveAttribute(
            "data-testid",
            "flexible-dialog-example",
        );
    });

    test("role can be overriden to alertdialog", () => {
        // Arrange
        render(
            <FlexibleDialog
                title="Dialog with content"
                content={<div>dummy content</div>}
                testId="flexible-dialog-example"
                role="alertdialog"
            />,
        );

        // Act
        const dialog = screen.getByRole("alertdialog");

        // Assert
        expect(dialog).toBeInTheDocument();
    });

    describe("title for main heading", () => {
        it("converts a title string into a Heading", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title="Rainier McCheddarton"
                    content={({title}) => (
                        <div>
                            {title}
                            <p id="description">cool dialog</p>
                        </div>
                    )}
                />,
            );

            // Act
            const heading = screen.getByRole("heading", {
                name: "Rainier McCheddarton",
            });

            // Assert
            expect(heading).toBeInTheDocument();
        });

        it("applies title component in a content slot", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title={<Heading>Bagley The Cat</Heading>}
                    content={({title}) => (
                        <div>
                            {title}
                            <p id="description">cool dialog</p>
                        </div>
                    )}
                />,
            );

            // Act
            const dialog = screen.getByRole("dialog");

            // Assert
            expect(
                within(dialog).getByText("Bagley The Cat"),
            ).toBeInTheDocument();
        });
    });

    describe("Names and descriptions", () => {
        it("applies title string as the accessible name in a modal", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title="Mystery mission"
                    content={<p id="description">cool dialog</p>}
                />,
            );

            // Act
            const dialog = screen.getByRole("dialog");

            // Assert
            expect(dialog).toHaveAccessibleName("Mystery mission");
        });

        it("applies title component as the accessible name for a modal", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title={<Heading>Mystery mission</Heading>}
                    content={<p id="description">cool dialog</p>}
                />,
            );

            // Act
            const dialog = screen.getByRole("dialog");

            // Assert
            expect(dialog).toHaveAccessibleName("Mystery mission");
        });

        it("applies titleId to title component", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title={<Heading>Mystery mission</Heading>}
                    titleId="heading-1"
                    content={<p id="description">cool dialog</p>}
                />,
            );

            // Act
            const heading = screen.getByTestId("title-heading-wrapper");

            // Assert
            expect(heading).toHaveAttribute("id", "heading-1");
        });

        it("applies title component in a content slot as the accessible name for a modal", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title={<Heading>Scooby Doo</Heading>}
                    content={({title}) => (
                        <div>
                            {title}
                            <p id="description">cool dialog</p>
                        </div>
                    )}
                />,
            );

            // Act
            const dialog = screen.getByRole("dialog");

            // Assert
            expect(dialog).toHaveAccessibleName("Scooby Doo");
        });

        it("applies aria-label to the modal", () => {
            // Arrange
            render(
                <FlexibleDialog
                    aria-label="Accessible name"
                    content={<p id="description">cool dialog</p>}
                />,
            );

            // Act
            const dialog = screen.getByRole("dialog");

            // Assert
            expect(dialog).toHaveAccessibleName("Accessible name");
        });

        it("applies aria-labelledby from titleId and title component", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title={<Heading>Mystery missionz</Heading>}
                    titleId="heading-1"
                    content={<p id="description">cool dialog</p>}
                />,
            );

            // Act
            const dialog = screen.getByRole("dialog");

            // Assert
            expect(dialog).toHaveAccessibleName("Mystery missionz");
        });

        it("binds aria-labelledby to a title with its own id", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title={<Heading id="a-heading">Mystery mission 2</Heading>}
                    aria-labelledby="a-heading"
                    content={<p id="description">cool dialog</p>}
                />,
            );

            // Act
            const dialog = screen.getByRole("dialog");

            // Assert
            expect(dialog).toHaveAccessibleName("Mystery mission 2");
        });

        it("applies aria-describedby to the modal", () => {
            // Arrange
            render(
                <FlexibleDialog
                    title="unused"
                    content={<BodyText id="description">cool dialog</BodyText>}
                    aria-describedby="description"
                />,
            );

            // Act
            const modal = screen.getByRole("dialog");

            // Assert
            expect(modal).toHaveAccessibleDescription(/cool dialog/i);
        });
    });
});
