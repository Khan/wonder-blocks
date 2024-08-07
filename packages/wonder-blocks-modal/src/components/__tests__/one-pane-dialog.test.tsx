import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";
import OnePaneDialog from "../one-pane-dialog";

describe("OnePaneDialog", () => {
    test("testId should be set in the Dialog element", () => {
        // Arrange
        render(
            <OnePaneDialog
                title="Dialog with multi-step footer"
                content="dummy content"
                testId="one-pane-dialog-example"
            />,
        );

        // Act
        const dialog = screen.getByRole("dialog");

        // Assert
        expect(dialog).toHaveAttribute(
            "data-testid",
            "one-pane-dialog-example",
        );
    });

    test("role can be overriden to alertdialog", () => {
        // Arrange
        render(
            <OnePaneDialog
                title="Dialog with multi-step footer"
                subtitle="Dialog subtitle"
                content="dummy content"
                testId="one-pane-dialog-example"
                role="alertdialog"
            />,
        );

        // Act
        const dialog = screen.getByRole("alertdialog");

        // Assert
        expect(dialog).toBeInTheDocument();
    });

    test("should include breadcrumbs", () => {
        // Arrange
        render(
            <OnePaneDialog
                title="Dialog with multi-step footer"
                breadcrumbs={
                    <Breadcrumbs>
                        <BreadcrumbsItem>test</BreadcrumbsItem>
                    </Breadcrumbs>
                }
                content="dummy content"
                testId="one-pane-dialog-example"
            />,
        );

        // Act

        // Assert
        expect(screen.getByLabelText("Breadcrumbs")).toBeInTheDocument();
    });

    it("applies aria-describedby to the modal", () => {
        // Arrange
        render(
            <OnePaneDialog
                title="unused"
                content={<p id="description">cool dialog</p>}
                aria-describedby="description"
            />,
        );

        // Act
        const modal = screen.getByRole("dialog");

        // Assert
        expect(modal).toHaveDescription(/cool dialog/i);
    });
});
