import {describe, expect, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
import {IconButton} from "../icon-button";

describe("IconButton", () => {
    describe("Attributes", () => {
        describe("data-kind", () => {
            it("should set data-kind on the underlying button", async () => {
                // Arrange

                // Act
                render(
                    <IconButton
                        icon={magnifyingGlassIcon}
                        kind="primary"
                        onClick={() => {}}
                    />,
                );

                // Assert
                expect(await screen.findByRole("button")).toHaveAttribute(
                    "data-kind",
                    "primary",
                );
            });

            it("should set data-kind on the underlying internal link", async () => {
                // Arrange

                // Act
                render(
                    <IconButton
                        icon={magnifyingGlassIcon}
                        kind="secondary"
                        href="/bar"
                    />,
                );

                // Assert
                expect(await screen.findByRole("link")).toHaveAttribute(
                    "data-kind",
                    "secondary",
                );
            });

            it("should set data-kind on the underlying external link", async () => {
                // Arrange

                // Act
                render(
                    <IconButton
                        icon={magnifyingGlassIcon}
                        kind="secondary"
                        href="https://example.com"
                    />,
                );

                // Assert
                expect(await screen.findByRole("link")).toHaveAttribute(
                    "data-kind",
                    "secondary",
                );
            });
        });
    });
});
