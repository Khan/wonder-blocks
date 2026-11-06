import * as React from "react";
import {render, screen} from "@testing-library/react";

import Breadcrumbs from "../breadcrumbs";
import BreadcrumbsItem from "../breadcrumbs-item";

describe("data-wb-component", () => {
    it("should set the Breadcrumbs name on the root element", () => {
        // Arrange
        render(
            <Breadcrumbs testId="root">
                <BreadcrumbsItem>First</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Breadcrumbs");
    });

    it("should set the BreadcrumbsItem name on the root element", () => {
        // Arrange
        render(
            <Breadcrumbs>
                <BreadcrumbsItem testId="item">First</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Act
        const root = screen.getByTestId("item");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "BreadcrumbsItem");
    });
});
