import * as React from "react";
import {render, screen} from "@testing-library/react";

import {
    WonderBlocksConfigProvider,
    defaultStringsEn,
} from "@khanacademy/wonder-blocks-config";

import Breadcrumbs from "../breadcrumbs";
import BreadcrumbsItem from "../breadcrumbs-item";

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

    it("should add data-testid if testId is set", () => {
        // Arrange, Act
        render(
            <Breadcrumbs testId="test">
                <BreadcrumbsItem>First</BreadcrumbsItem>
                <BreadcrumbsItem>Last</BreadcrumbsItem>
            </Breadcrumbs>,
        );

        // Assert
        expect(screen.getByRole("navigation")).toHaveAttribute(
            "data-testid",
            "test",
        );
    });

    describe("aria-label", () => {
        it("should use the default aria-label", () => {
            // Arrange
            render(
                <Breadcrumbs>
                    <BreadcrumbsItem>First</BreadcrumbsItem>
                </Breadcrumbs>,
            );

            // Act
            const nav = screen.getByRole("navigation");

            // Assert
            expect(nav).toHaveAttribute("aria-label", "Breadcrumbs");
        });

        it("should use the aria-label from the config provider", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{
                        strings: {
                            ...defaultStringsEn,
                            breadcrumbs: "translated text",
                        },
                        locale: "es",
                    }}
                >
                    <Breadcrumbs>
                        <BreadcrumbsItem>First</BreadcrumbsItem>
                    </Breadcrumbs>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const nav = screen.getByRole("navigation");

            // Assert
            expect(nav).toHaveAttribute("aria-label", "translated text");
        });

        it("should prefer the aria-label prop over the config provider", () => {
            // Arrange
            render(
                <WonderBlocksConfigProvider
                    i18n={{
                        strings: {
                            ...defaultStringsEn,
                            breadcrumbs: "translated text",
                        },
                        locale: "es",
                    }}
                >
                    <Breadcrumbs aria-label="overriding label">
                        <BreadcrumbsItem>First</BreadcrumbsItem>
                    </Breadcrumbs>
                </WonderBlocksConfigProvider>,
            );

            // Act
            const nav = screen.getByRole("navigation");

            // Assert
            expect(nav).toHaveAttribute("aria-label", "overriding label");
        });
    });
});
