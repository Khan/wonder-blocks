// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    Breadcrumbs,
    BreadcrumbsItem,
} from "@khanacademy/wonder-blocks-breadcrumbs";

import ModalHeader from "../modal-header.js";

const exampleBreadcrumbs: React.Element<typeof Breadcrumbs> = (
    <Breadcrumbs>
        <BreadcrumbsItem>breadcrumb item</BreadcrumbsItem>
    </Breadcrumbs>
);

describe("ModalHeader", () => {
    test("renders the title by default", () => {
        // Arrange, Act
        render(<ModalHeader title="Title" titleId="modal-title" />);

        // Assert
        expect(screen.getByText("Title")).toBeInTheDocument();
    });

    test("using only `breadcrumbs` should render the header", () => {
        // Arrange, Act
        render(
            <ModalHeader
                title="Title"
                breadcrumbs={exampleBreadcrumbs}
                titleId="modal-title"
            />,
        );

        // Assert
        expect(screen.getByText("breadcrumb item")).toBeInTheDocument();
    });

    test("using only `subtitle` should render the header", () => {
        // Arrange, Act
        render(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                titleId="modal-title"
            />,
        );

        // Assert
        expect(screen.getByText("Subtitle")).toBeInTheDocument();
    });

    test("testId should be added to the title", () => {
        // Arrange
        render(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                testId="test-example-header"
                titleId="modal-title"
            />,
        );

        // Act
        const title = screen.getByText("Title");

        // Assert
        expect(title).toHaveAttribute(
            "data-test-id",
            "test-example-header-title",
        );
    });

    test("testId should be added to the subtitle", () => {
        // Arrange
        render(
            <ModalHeader
                title="Title"
                subtitle="Subtitle"
                testId="test-example-header"
                titleId="modal-title"
            />,
        );

        // Act
        const subtitle = screen.getByText("Subtitle");

        // Assert
        expect(subtitle).toHaveAttribute(
            "data-test-id",
            "test-example-header-subtitle",
        );
    });
});
