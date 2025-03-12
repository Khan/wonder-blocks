import * as React from "react";
import {render, screen} from "@testing-library/react";
import Link from "@khanacademy/wonder-blocks-link";
import {NavigationTabs} from "../navigation-tabs";
import {NavigationTabItem} from "../navigation-tab-item";

describe("NavigationTabs", () => {
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
    });
});
