import * as React from "react";
import {render, screen} from "@testing-library/react";
import Link from "@khanacademy/wonder-blocks-link";
import {NavigationTabItem} from "../navigation-tab-item";

describe("NavigationTabItem", () => {
    const children = <Link href="/link-1">Link 1</Link>;

    it("should render a list item element", async () => {
        // Arrange
        render(
            <NavigationTabItem>
                <Link href="/link-1">Link 1</Link>
            </NavigationTabItem>,
        );

        // Act
        const listItem = await screen.findByRole("listitem");

        // Assert
        expect(listItem).toBeInTheDocument();
    });

    it("should render the provided children", async () => {
        // Arrange
        render(
            <NavigationTabItem>
                <Link href="/link-1">Link 1</Link>
            </NavigationTabItem>,
        );

        // Act
        const link1 = await screen.findByRole("link", {name: "Link 1"});

        // Assert
        expect(link1).toBeInTheDocument();
    });

    describe("children render function", () => {
        it("should call it with the link props", () => {
            // Arrange
            const childrenMock = jest.fn();

            // Act
            render(
                <NavigationTabItem current={true}>
                    {childrenMock}
                </NavigationTabItem>,
            );

            // Assert
            expect(childrenMock).toHaveBeenCalledWith(
                expect.objectContaining({"aria-current": "page"}),
            );
        });

        it("should apply aria-current to the Link component when it is wrapped by another element", async () => {
            // Arrange
            render(
                <NavigationTabItem current={true}>
                    {(linkProps) => (
                        <div>
                            <Link {...linkProps} href="/link-1">
                                Link 1
                            </Link>
                        </div>
                    )}
                </NavigationTabItem>,
            );

            // Act
            const link = await screen.findByRole("link");

            // Assert
            expect(link).toHaveAttribute("aria-current", "page");
        });
    });

    describe("props", () => {
        it("should use the id prop for the listitem element", async () => {
            // Arrange
            const id = "unique-id";
            render(<NavigationTabItem id={id}>{children}</NavigationTabItem>);

            // Act
            const listitem = await screen.findByRole("listitem");

            // Assert
            expect(listitem).toHaveAttribute("id", id);
        });

        it("should use the testId prop for the listitem element", async () => {
            // Arrange
            const testId = "test-id";
            render(
                <NavigationTabItem testId={testId}>
                    {children}
                </NavigationTabItem>,
            );

            // Act
            const listItem = await screen.findByRole("listitem");

            // Assert
            expect(listItem).toHaveAttribute("data-testid", testId);
        });

        it("should forward the ref to the listitem element", async () => {
            // Arrange
            const ref = React.createRef<HTMLLIElement>();

            // Act
            render(<NavigationTabItem ref={ref}>{children}</NavigationTabItem>);

            // Assert
            expect(await screen.findByRole("listitem")).toBe(ref.current);
        });
    });

    describe("a11y", () => {
        describe("axe", () => {
            it("should have no a11y violations", async () => {
                // Arrange
                // Act
                const {container} = render(
                    // Wrap NavigationTabItem in <ul> since NavigationTabs
                    // renders the list element
                    <ul>
                        <NavigationTabItem>
                            <Link href="/link-1">Link 1</Link>
                        </NavigationTabItem>
                    </ul>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should have no a11y violations when it is the current navigation tab item", async () => {
                // Arrange
                // Act
                const {container} = render(
                    // Wrap NavigationTabItem in <ul> since NavigationTabs
                    // renders the list element
                    <ul>
                        <NavigationTabItem current={true}>
                            <Link href="/link-1">Link 1</Link>
                        </NavigationTabItem>
                    </ul>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });

            it("should have no a11y violations when the children render function is used", async () => {
                // Arrange
                const {container} = render(
                    // Wrap NavigationTabItem in <ul> since NavigationTabs
                    // renders the list element
                    <ul>
                        <NavigationTabItem current={true}>
                            {(linkProps) => (
                                <div>
                                    <Link {...linkProps} href="/link-1">
                                        Link 1
                                    </Link>
                                </div>
                            )}
                        </NavigationTabItem>
                    </ul>,
                );

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it("should set aria props on the listitem element", async () => {
                // Arrange
                const ariaDescribedBy = "aria-describedby-value";
                render(
                    <NavigationTabItem aria-describedby={ariaDescribedBy}>
                        {children}
                    </NavigationTabItem>,
                );

                // Act
                const listItem = await screen.findByRole("listitem");

                // Assert
                expect(listItem).toHaveAttribute(
                    "aria-describedby",
                    ariaDescribedBy,
                );
            });

            it("should set aria-current=page on the link if the current prop is set to true", async () => {
                // Arrange
                render(
                    <NavigationTabItem current={true}>
                        {children}
                    </NavigationTabItem>,
                );
                // Act
                const link = await screen.findByRole("link");

                // Assert
                expect(link).toHaveAttribute("aria-current", "page");
            });

            it.each([{current: undefined}, {current: false}])(
                "should not have aria-current set on the link if the current prop is $current",
                async ({current}) => {
                    // Arrange
                    render(
                        <NavigationTabItem current={current}>
                            {children}
                        </NavigationTabItem>,
                    );
                    // Act
                    const link = await screen.findByRole("link");

                    // Assert
                    expect(link).not.toHaveAttribute("aria-current");
                },
            );
        });
    });
});
