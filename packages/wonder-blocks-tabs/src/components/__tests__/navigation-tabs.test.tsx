import * as React from "react";
import {render, screen} from "@testing-library/react";
import Link from "@khanacademy/wonder-blocks-link";
import {NavigationTabs} from "../navigation-tabs";
import {NavigationTabItem} from "../navigation-tab-item";

describe("NavigationTabs", () => {
    const children = [
        <NavigationTabItem key="link-1">
            <Link href="/link-1">Link 1</Link>
        </NavigationTabItem>,
        <NavigationTabItem key="link-2">
            <Link href="/link-2">Link 2</Link>
        </NavigationTabItem>,
    ];

    it("should render a navigation element", async () => {
        // Arrange
        render(
            <NavigationTabs>
                <NavigationTabItem>
                    <Link href="/link-1">Link 1</Link>
                </NavigationTabItem>
                <NavigationTabItem>
                    <Link href="/link-2">Link 2</Link>
                </NavigationTabItem>
            </NavigationTabs>,
        );

        // Act
        const nav = await screen.findByRole("navigation");

        // Assert
        expect(nav).toBeInTheDocument();
    });

    it("should render a list element", async () => {
        // Arrange
        render(
            <NavigationTabs>
                <NavigationTabItem>
                    <Link href="/link-1">Link 1</Link>
                </NavigationTabItem>
                <NavigationTabItem>
                    <Link href="/link-2">Link 2</Link>
                </NavigationTabItem>
            </NavigationTabs>,
        );

        // Act
        const nav = await screen.findByRole("list");

        // Assert
        expect(nav).toBeInTheDocument();
    });

    it("should render the provided children", async () => {
        // Arrange
        render(
            <NavigationTabs>
                <NavigationTabItem>
                    <Link href="/link-1">Link 1</Link>
                </NavigationTabItem>
                <NavigationTabItem>
                    <Link href="/link-2">Link 2</Link>
                </NavigationTabItem>
            </NavigationTabs>,
        );

        // Act
        const link1 = await screen.findByRole("link", {name: "Link 1"});
        const link2 = await screen.findByRole("link", {name: "Link 2"});

        // Assert
        expect(link1).toBeInTheDocument();
        expect(link2).toBeInTheDocument();
    });

    describe("props", () => {
        it("should use the id prop for the nav element", async () => {
            // Arrange
            const id = "unique-id";
            render(<NavigationTabs id={id}>{children}</NavigationTabs>);

            // Act
            const nav = await screen.findByRole("navigation");

            // Assert
            expect(nav).toHaveAttribute("id", id);
        });

        it("should use the testId prop for the nav element", async () => {
            // Arrange
            const testId = "test-id";
            render(<NavigationTabs testId={testId}>{children}</NavigationTabs>);

            // Act
            const nav = await screen.findByRole("navigation");

            // Assert
            expect(nav).toHaveAttribute("data-testid", testId);
        });
    });

    describe("a11y", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    <NavigationTabs>
                        <NavigationTabItem>
                            <Link href="/link-1">Link 1</Link>
                        </NavigationTabItem>
                        <NavigationTabItem>
                            <Link href="/link-2">Link 2</Link>
                        </NavigationTabItem>
                    </NavigationTabs>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set aria props on the navigation element", async () => {
                // Arrange
                const ariaDescribedBy = "aria-describedby-value";
                render(
                    <NavigationTabs aria-describedby={ariaDescribedBy}>
                        {children}
                    </NavigationTabs>,
                );

                // Act
                const nav = await screen.findByRole("navigation");

                // Assert
                expect(nav).toHaveAttribute(
                    "aria-describedby",
                    ariaDescribedBy,
                );
            });

            it("should set aria-label on the navigation element", async () => {
                // Arrange
                const ariaLabel = "Secondary navigation";
                render(
                    <NavigationTabs aria-label={ariaLabel}>
                        {children}
                    </NavigationTabs>,
                );

                // Act
                const nav = await screen.findByRole("navigation");

                // Assert
                expect(nav).toHaveAttribute("aria-label", ariaLabel);
            });
        });
    });
});
