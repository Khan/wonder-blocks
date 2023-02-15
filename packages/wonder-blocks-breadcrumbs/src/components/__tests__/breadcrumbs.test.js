// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import Breadcrumbs from "../breadcrumbs.js";
import BreadcrumbsItem from "../breadcrumbs-item.js";

describe("Breadcrumbs", () => {
    it("should set aria-current to the last item", () => {
        // Arrange
        render(
            <Breadcrumbs>
                <BreadcrumbsItem>First</BreadcrumbsItem>
                <BreadcrumbsItem>Last</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Act
        const lastItem = screen.getAllByRole("listitem")[1];

        // Assert
        expect(lastItem).toHaveAttribute("aria-current", "page");
    });

    it("should add data-test-id if testId is set", () => {
        // Arrange, Act
        render(
            <Breadcrumbs testId="test">
                <BreadcrumbsItem>First</BreadcrumbsItem>
                <BreadcrumbsItem>Last</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Assert
        expect(screen.getByRole("navigation")).toHaveAttribute(
            "data-test-id",
            "test",
        );
    });
});
