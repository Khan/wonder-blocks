import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";

import DrawerLauncher from "../drawer-launcher";
import DrawerDialog from "../drawer-dialog";
import type {DrawerAlignment} from "../../util/types";

describe("DrawerDialog - Alignment Prop Passing", () => {
    beforeEach(() => {
        jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const createTestModal = (alignment: DrawerAlignment, testId: string) => (
        <DrawerDialog
            title="Test Drawer"
            content={
                <BodyText>Test content for {alignment} alignment</BodyText>
            }
            alignment={alignment}
            testId={testId}
        />
    );

    const alignmentValues: DrawerAlignment[] = [
        "inlineStart",
        "inlineEnd",
        "blockEnd",
    ];

    describe.each(alignmentValues)("with %s alignment", (alignment) => {
        test("renders drawer dialog correctly", async () => {
            // Arrange
            const testId = `drawer-dialog-${alignment}`;
            const modal = createTestModal(alignment, testId);

            render(
                <DrawerLauncher
                    alignment={alignment}
                    modal={modal}
                    testId="drawer-launcher"
                >
                    {({openModal}) => (
                        <Button onClick={openModal}>
                            {`Open ${alignment} Drawer`}
                        </Button>
                    )}
                </DrawerLauncher>,
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: `Open ${alignment} Drawer`}),
            );

            // Assert
            await waitFor(() => {
                expect(screen.getByRole("dialog")).toBeInTheDocument();
            });
        });

        test("dialog has correct accessibility structure", async () => {
            // Arrange
            const testId = `drawer-dialog-${alignment}`;
            const modal = createTestModal(alignment, testId);

            render(
                <DrawerLauncher
                    alignment={alignment}
                    modal={modal}
                    testId="drawer-launcher"
                >
                    {({openModal}) => (
                        <Button onClick={openModal}>Open Drawer</Button>
                    )}
                </DrawerLauncher>,
            );

            // Act
            await userEvent.click(screen.getByRole("button"));

            // Assert
            const dialog = await screen.findByRole("dialog");
            expect(dialog).toHaveAccessibleName("Test Drawer");
        });
    });

    test("renders backdrop with drawer content", async () => {
        // Arrange
        const alignment: DrawerAlignment = "inlineStart";
        const modal = createTestModal(alignment, "test-drawer");

        render(
            <DrawerLauncher
                alignment={alignment}
                modal={modal}
                testId="drawer-launcher"
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Open Drawer</Button>
                )}
            </DrawerLauncher>,
        );

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        await waitFor(() => {
            expect(screen.getByTestId("drawer-launcher")).toBeInTheDocument();
        });
    });

    test("updates when alignment prop changes", async () => {
        // Arrange
        const TestComponent = () => {
            const [currentAlignment, setCurrentAlignment] =
                React.useState<DrawerAlignment>("inlineStart");

            return (
                <View>
                    <Button
                        onClick={() => setCurrentAlignment("inlineEnd")}
                        testId="change-alignment"
                    >
                        Change Alignment
                    </Button>
                    <DrawerLauncher
                        alignment={currentAlignment}
                        modal={createTestModal(currentAlignment, "test-drawer")}
                        testId="drawer-launcher"
                    >
                        {({openModal}) => (
                            <Button onClick={openModal}>Open Drawer</Button>
                        )}
                    </DrawerLauncher>
                </View>
            );
        };

        render(<TestComponent />);

        // Act - Open modal with initial alignment
        await userEvent.click(
            screen.getByRole("button", {name: "Open Drawer"}),
        );

        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });

        // Close modal
        await userEvent.keyboard("{Escape}");

        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });

        // Change alignment and reopen
        await userEvent.click(screen.getByTestId("change-alignment"));
        await userEvent.click(
            screen.getByRole("button", {name: "Open Drawer"}),
        );

        // Assert
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });

    test("receives alignment from DrawerLauncher context when not explicitly set", async () => {
        // Arrange
        const modal = (
            <DrawerDialog
                title="Test Drawer"
                content={<BodyText>Test content</BodyText>}
                testId="test-drawer"
            />
        );

        render(
            <DrawerLauncher
                alignment="inlineEnd"
                modal={modal}
                testId="drawer-launcher"
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Open Drawer</Button>
                )}
            </DrawerLauncher>,
        );

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });

    test("renders dialog when nested inside wrapper components", async () => {
        // Arrange - Create a nested component that wraps DrawerDialog
        const NestedWrapper = ({
            children,
            wrapperProp,
        }: {
            children: React.ReactNode;
            wrapperProp?: string;
        }) => <View testId={`wrapper-${wrapperProp}`}>{children}</View>;

        const nestedModal = (
            <NestedWrapper wrapperProp="test">
                <DrawerDialog
                    title="Nested Test Drawer"
                    content={<BodyText>Nested content</BodyText>}
                    testId="nested-drawer"
                />
            </NestedWrapper>
        );

        render(
            <DrawerLauncher
                alignment="blockEnd"
                modal={nestedModal}
                testId="drawer-launcher"
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Open Nested Drawer</Button>
                )}
            </DrawerLauncher>,
        );

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        });
    });

    test("preserves wrapper components when rendering nested modal", async () => {
        // Arrange
        const NestedWrapper = ({
            children,
            wrapperProp,
        }: {
            children: React.ReactNode;
            wrapperProp?: string;
        }) => <View testId={`wrapper-${wrapperProp}`}>{children}</View>;

        const nestedModal = (
            <NestedWrapper wrapperProp="test">
                <DrawerDialog
                    title="Nested Test Drawer"
                    content={<BodyText>Nested content</BodyText>}
                    testId="nested-drawer"
                />
            </NestedWrapper>
        );

        render(
            <DrawerLauncher
                alignment="blockEnd"
                modal={nestedModal}
                testId="drawer-launcher"
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Open Nested Drawer</Button>
                )}
            </DrawerLauncher>,
        );

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        expect(screen.getByTestId("wrapper-test")).toBeInTheDocument();
    });
});
