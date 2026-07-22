import * as React from "react";
import {render, screen, within} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {NavigationTabsDropdown} from "../navigation-tabs-dropdown";

jest.mock("react-popper", () => ({
    ...jest.requireActual("react-popper"),
    Popper: jest.fn().mockImplementation(({children}) => {
        // Mock `isReferenceHidden` to always return false (or true for testing visibility)
        return children({
            ref: jest.fn(),
            style: {},
            placement: "bottom",
            isReferenceHidden: false, // Mocking isReferenceHidden
        });
    }),
}));

const tabs = [
    {
        id: "tab-1",
        label: "Tab 1",
        href: "#tab-1",
    },
    {
        id: "tab-2",
        label: "Tab 2",
        href: "#tab-2",
    },
    {
        id: "tab-3",
        label: "Tab 3",
        href: "#tab-3",
    },
];

describe("NavigationTabsDropdown", () => {
    it("should set the ref", () => {
        // Arrange
        // Act
        const ref = React.createRef<HTMLElement>();
        const {container} = render(
            <NavigationTabsDropdown
                tabs={tabs}
                selectedTabId="tab-1"
                onTabSelected={jest.fn()}
                ref={ref}
            />,
        );

        // Assert
        // eslint-disable-next-line testing-library/no-node-access -- check ref is on root element
        expect(ref.current).toBe(container.firstChild);
    });

    describe("Props", () => {
        describe("tabs prop", () => {
            it("should render the tabs when the dropdown is opened", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.getByRole("menuitem", {name: "Tab 1"}),
                ).toBeInTheDocument();
                expect(
                    screen.getByRole("menuitem", {name: "Tab 2"}),
                ).toBeInTheDocument();
                expect(
                    screen.getByRole("menuitem", {name: "Tab 3"}),
                ).toBeInTheDocument();
            });

            it("should render nothing when there are no tabs", () => {
                // Arrange
                // Act
                const {container} = render(
                    <NavigationTabsDropdown
                        tabs={[]}
                        selectedTabId=""
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(container).toBeEmptyDOMElement();
            });

            it("should render tabs with correct href attributes", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.getByRole("menuitem", {name: "Tab 1"}),
                ).toHaveAttribute("href", "#tab-1");
                expect(
                    screen.getByRole("menuitem", {name: "Tab 2"}),
                ).toHaveAttribute("href", "#tab-2");
                expect(
                    screen.getByRole("menuitem", {name: "Tab 3"}),
                ).toHaveAttribute("href", "#tab-3");
            });

            describe("tab icon", () => {
                describe.each([
                    {
                        icon: (
                            <Icon>
                                <img src="icon.svg" alt="icon example" />
                            </Icon>
                        ),
                        name: "Icon component",
                    },
                    {
                        icon: (
                            <PhosphorIcon
                                icon="icon.svg"
                                aria-label="icon example"
                            />
                        ),
                        name: "PhosphorIcon component",
                    },
                ])(
                    "when the tab has an icon that is a $name and has an accessible name",
                    ({icon}) => {
                        it("should include the accessible name of the tab icon in the name for the dropdown menu item", async () => {
                            // Arrange
                            render(
                                <NavigationTabsDropdown
                                    tabs={[
                                        {
                                            id: "tab-1",
                                            label: "Tab 1",
                                            href: "#tab-1",
                                            icon,
                                        },
                                    ]}
                                    selectedTabId="tab-1"
                                    onTabSelected={jest.fn()}
                                />,
                            );

                            // Act
                            await userEvent.click(screen.getByRole("button"));

                            // Assert
                            // Expect the menu item includes the icon and the tab label
                            await screen.findByRole("menuitem", {
                                name: "icon example Tab 1",
                            });
                        });

                        it("should include the accessible name of the tab icon in the name of the dropdown opener when the tab is selected", async () => {
                            // Arrange
                            // Act
                            render(
                                <NavigationTabsDropdown
                                    tabs={[
                                        {
                                            id: "tab-1",
                                            label: "Tab 1",
                                            href: "#tab-1",
                                            icon,
                                        },
                                    ]}
                                    selectedTabId="tab-1"
                                    onTabSelected={jest.fn()}
                                />,
                            );

                            // Assert
                            await screen.findByRole("button", {
                                name: "icon example Tab 1",
                            });
                        });

                        it("should render the tab icon in the dropdown menu item", async () => {
                            // Arrange
                            render(
                                <NavigationTabsDropdown
                                    tabs={[
                                        {
                                            id: "tab-1",
                                            label: "Tab 1",
                                            href: "#tab-1",
                                            icon,
                                        },
                                    ]}
                                    selectedTabId="tab-1"
                                    onTabSelected={jest.fn()}
                                />,
                            );

                            // Act
                            await userEvent.click(screen.getByRole("button"));
                            const menuItem = await screen.findByRole(
                                "menuitem",
                                {
                                    name: "icon example Tab 1",
                                },
                            );

                            // Assert
                            expect(
                                within(menuItem).getByRole("img", {
                                    name: "icon example",
                                }),
                            ).toBeInTheDocument();
                        });

                        it("should render the tab icon in the dropdown menu opener", async () => {
                            // Arrange
                            render(
                                <NavigationTabsDropdown
                                    tabs={[
                                        {
                                            id: "tab-1",
                                            label: "Tab 1",
                                            href: "#tab-1",
                                            icon,
                                        },
                                    ]}
                                    selectedTabId="tab-1"
                                    onTabSelected={jest.fn()}
                                />,
                            );

                            // Act
                            const opener = screen.getByRole("button");

                            // Assert
                            expect(
                                within(opener).getByRole("img", {
                                    name: "icon example",
                                }),
                            ).toBeInTheDocument();
                        });
                    },
                );

                describe.each([
                    {
                        icon: (
                            <Icon>
                                <img src="icon.svg" alt="" />
                            </Icon>
                        ),
                        name: "Icon component",
                    },
                    {
                        icon: (
                            <PhosphorIcon
                                icon="icon.svg"
                                aria-hidden={true}
                                role="img"
                            />
                        ),
                        name: "PhosphorIcon component",
                    },
                ])(
                    "when the tab has an icon that is a $name and is presentational only",
                    ({icon}) => {
                        it("should not have an image role in the dropdown opener", async () => {
                            // Arrange
                            render(
                                <NavigationTabsDropdown
                                    tabs={[
                                        {
                                            id: "tab-1",
                                            label: "Tab 1",
                                            href: "#tab-1",
                                            icon,
                                        },
                                    ]}
                                    selectedTabId="tab-1"
                                    onTabSelected={jest.fn()}
                                />,
                            );

                            // Act
                            const image = screen.queryByRole("img");

                            // Assert
                            // Expect there to be no image role
                            expect(image).not.toBeInTheDocument();
                        });

                        it("should not have an image role in the dropdown menu items", async () => {
                            // Arrange
                            render(
                                <NavigationTabsDropdown
                                    tabs={[
                                        {
                                            id: "tab-1",
                                            label: "Tab 1",
                                            href: "#tab-1",
                                            icon,
                                        },
                                    ]}
                                    selectedTabId="tab-1"
                                    onTabSelected={jest.fn()}
                                />,
                            );

                            // Act
                            await userEvent.click(screen.getByRole("button"));
                            const image = screen.queryByRole("img");

                            // Assert
                            // Expect there to be no image role
                            expect(image).not.toBeInTheDocument();
                        });
                    },
                );
            });
        });

        describe("selectedTabId prop", () => {
            it("should display selected tab label in opener", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-2"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tab 2");
            });

            it("should mark selected tab as active in menu", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-2"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(
                    screen.getByRole("menuitem", {current: true}),
                ).toHaveTextContent("Tab 2");
            });

            it("should use default label when selectedTabId is invalid", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="invalid-id"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tabs");
            });
        });

        describe("id", () => {
            describe("when id is provided", () => {
                it("should use the provided id on the root element", () => {
                    // Arrange
                    // Act
                    const {container} = render(
                        <NavigationTabsDropdown
                            id="navigation-tabs-dropdown-id"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
                    expect(container.firstChild).toHaveAttribute(
                        "id",
                        "navigation-tabs-dropdown-id",
                    );
                });

                it("should use the provided id on the opener element with '-opener' suffix", () => {
                    // Arrange
                    // Act
                    render(
                        <NavigationTabsDropdown
                            id="navigation-tabs-dropdown-id"
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    expect(screen.getByRole("button")).toHaveAttribute(
                        "id",
                        "navigation-tabs-dropdown-id-opener",
                    );
                });
            });

            describe("when id is not provided", () => {
                it("should auto-generate an id on the root element", () => {
                    // Arrange
                    // Act
                    const {container} = render(
                        <NavigationTabsDropdown
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );

                    // Assert
                    // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
                    expect(container.firstChild).toHaveAttribute("id");
                });

                it("should auto-generate an id on the opener element with '-opener' suffix", () => {
                    // Arrange
                    render(
                        <NavigationTabsDropdown
                            tabs={tabs}
                            selectedTabId="tab-1"
                            onTabSelected={jest.fn()}
                        />,
                    );
                    // Act
                    const opener = screen.getByRole("button");

                    // Assert
                    expect(opener.id.endsWith("-opener")).toBe(true);
                });
            });
        });

        describe("testId", () => {
            it("should use the testId prop for the root element", () => {
                // Arrange
                // Act
                const {container} = render(
                    <NavigationTabsDropdown
                        testId="navigation-tabs-dropdown-test-id"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
                expect(container.firstChild).toHaveAttribute(
                    "data-testid",
                    "navigation-tabs-dropdown-test-id",
                );
            });

            it("should use the testId prop for the opener element with '-opener' suffix", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        testId="navigation-tabs-dropdown-test-id"
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveAttribute(
                    "data-testid",
                    "navigation-tabs-dropdown-test-id-opener",
                );
            });

            it("should use the testId prop on tab items for the menu items", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={[
                            {
                                id: "tab-1",
                                label: "Tab 1",
                                href: "#tab-1",
                                testId: "tab-1-test-id",
                            },
                        ]}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Act
                await userEvent.click(screen.getByRole("button"));

                // Assert
                expect(screen.getByTestId("tab-1-test-id")).toBeInTheDocument();
            });
        });

        describe("labels prop", () => {
            it("should use default 'Tabs' label when there is no selected tab and no custom label", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="invalid-id"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tabs");
            });

            it("should use custom defaultOpenerLabel when provided and there is no selected tab", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="invalid-id"
                        onTabSelected={jest.fn()}
                        labels={{defaultOpenerLabel: "Custom Navigation"}}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent(
                    "Custom Navigation",
                );
            });

            it("should prioritize selected tab label over default label", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-2"
                        onTabSelected={jest.fn()}
                        labels={{defaultOpenerLabel: "Custom Navigation"}}
                    />,
                );

                // Assert
                expect(screen.getByRole("button")).toHaveTextContent("Tab 2");
            });
        });

        describe("opened", () => {
            it("should not be opened by default", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                    />,
                );

                // Assert
                expect(screen.queryByRole("menu")).not.toBeInTheDocument();
            });

            it("should be opened when opened={true}", () => {
                // Arrange
                // Act
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                        opened={true}
                    />,
                );

                // Assert
                expect(screen.getByRole("menu")).toBeInTheDocument();
            });

            it("should render menu items when opened", async () => {
                // Arrange
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                        opened={true}
                    />,
                );

                // Assert
                expect(
                    screen.getByRole("menuitem", {name: "Tab 1"}),
                ).toBeInTheDocument();
                expect(
                    screen.getByRole("menuitem", {name: "Tab 2"}),
                ).toBeInTheDocument();
                expect(
                    screen.getByRole("menuitem", {name: "Tab 3"}),
                ).toBeInTheDocument();
            });
        });
    });

    describe("Events", () => {
        describe("onTabSelected", () => {
            it("should call the onTabSelected handler with the tab id when a tab is clicked", async () => {
                // Arrange
                const onTabSelected = jest.fn();
                render(
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={onTabSelected}
                    />,
                );
                await userEvent.click(screen.getByRole("button"));

                // Act
                await userEvent.click(
                    screen.getByRole("menuitem", {name: "Tab 2"}),
                );

                // Assert
                expect(onTabSelected).toHaveBeenCalledWith("tab-2");
            });
        });
    });

    describe("Accessibility", () => {
        it("should render root as a nav element by default", () => {
            // Arrange
            // Act
            const {container} = render(
                <NavigationTabsDropdown
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                    aria-label="Navigation tabs"
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
            expect(container.firstChild?.nodeName).toBe("NAV");
        });

        it("should set aria-label on navigation when provided", () => {
            // Arrange
            // Act
            render(
                <NavigationTabsDropdown
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                    aria-label="Main navigation"
                />,
            );

            // Assert
            expect(
                screen.getByRole("navigation", {name: "Main navigation"}),
            ).toBeInTheDocument();
        });

        it("should set aria-labelledby on navigation when provided", () => {
            // Arrange
            // Act
            render(
                <>
                    <h1 id="nav-heading">Site Navigation</h1>
                    <NavigationTabsDropdown
                        tabs={tabs}
                        selectedTabId="tab-1"
                        onTabSelected={jest.fn()}
                        aria-labelledby="nav-heading"
                    />
                </>,
            );

            // Assert
            expect(
                screen.getByRole("navigation", {name: "Site Navigation"}),
            ).toHaveAttribute("aria-labelledby", "nav-heading");
        });

        it("should render as custom tag when tag prop is provided", () => {
            // Arrange
            // Act
            const {container} = render(
                <NavigationTabsDropdown
                    tabs={tabs}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                    tag="div"
                />,
            );

            // Assert
            // eslint-disable-next-line testing-library/no-node-access -- explicitly checking the root element
            expect(container.firstChild?.nodeName).toBe("DIV");
        });

        it("should set aria-label on a tab item when provided", async () => {
            // Arrange
            render(
                <NavigationTabsDropdown
                    aria-label="Navigation tabs"
                    tabs={[
                        {
                            id: "tab-1",
                            label: "Tab 1",
                            href: "#tab-1",
                            "aria-label": "Tab 1 aria-label",
                        },
                    ]}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Act
            await userEvent.click(screen.getByRole("button"));

            // Assert
            expect(
                screen.getByRole("menuitem", {name: "Tab 1 aria-label"}),
            ).toHaveAttribute("aria-label", "Tab 1 aria-label");
        });

        it("should use the tab item aria label for the opener when that tab is selected", () => {
            // Arrange
            // Act
            render(
                <NavigationTabsDropdown
                    aria-label="Navigation tabs"
                    tabs={[
                        {
                            id: "tab-1",
                            label: "Tab 1",
                            href: "#tab-1",
                            "aria-label": "Tab 1 aria-label",
                        },
                    ]}
                    selectedTabId="tab-1"
                    onTabSelected={jest.fn()}
                />,
            );

            // Assert
            expect(screen.getByRole("button")).toHaveAttribute(
                "aria-label",
                "Tab 1 aria-label",
            );
        });
    });
});
