import * as React from "react";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";

import Accordion from "../accordion";
import AccordionSection from "../accordion-section";

describe("Accordion", () => {
    test("renders", async () => {
        // Arrange

        // Act
        render(
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Assert
        expect(await screen.findByText("Section 1")).toBeVisible();
        expect(await screen.findByText("Section 2")).toBeVisible();
    });

    test("opens sections when clicked", async () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        const button1 = await screen.findByRole("button", {name: "Section 1"});
        const button2 = await screen.findByRole("button", {name: "Section 2"});

        // Act
        await userEvent.click(button1);
        await userEvent.click(button2);

        // Assert
        expect(await screen.findByText("Section 1 content")).toBeVisible();
        expect(await screen.findByText("Section 2 content")).toBeVisible();
    });

    test("closes sections when clicked", async () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        const button1 = await screen.findByRole("button", {name: "Section 1"});
        const button2 = await screen.findByRole("button", {name: "Section 2"});

        // Act
        // open
        button1.click();
        button2.click();
        // close
        button1.click();
        button2.click();

        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        expect(screen.queryByText("Section 2 content")).not.toBeVisible();
    });

    test("initialExpandedIndex opens the correct section", async () => {
        // Arrange
        render(
            <Accordion initialExpandedIndex={1}>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        expect(await screen.findByText("Section 2 content")).toBeVisible();
        expect(screen.queryByText("Section 3 content")).not.toBeVisible();
    });

    test("only allows one section to be open at a time when allowMultipleExpanded is false", async () => {
        // Arrange
        render(
            <Accordion initialExpandedIndex={1} allowMultipleExpanded={false}>
                <AccordionSection header="Section 1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const button = await screen.findByRole("button", {name: "Section 3"});
        await userEvent.click(button);

        // Assert
        expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        expect(screen.queryByText("Section 2 content")).not.toBeVisible();
        expect(await screen.findByText("Section 3 content")).toBeVisible();
    });

    test("calls child's onToggle when section is clicked", async () => {
        // Arrange
        const onToggleSpy = jest.fn();
        render(
            <Accordion>
                <AccordionSection header="Section 1" onToggle={onToggleSpy}>
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        const button = await screen.findByRole("button", {name: "Section 1"});

        // Act
        button.click();

        // Assert
        expect(onToggleSpy).toHaveBeenCalledTimes(1);
    });

    test("Other props are passed to the section", async () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1" testId="test-id-1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2" testId="test-id-2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const header1 = await screen.findByTestId("test-id-1-header");
        const header2 = await screen.findByTestId("test-id-2-header");

        // Assert
        expect(header1).toBeVisible();
        expect(header2).toBeVisible();
    });

    test("applies region role to sections when there are 6 or fewer", async () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1" testId="section-1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
                <AccordionSection header="Section 4">
                    Section 4 content
                </AccordionSection>
                <AccordionSection header="Section 5">
                    Section 5 content
                </AccordionSection>
                <AccordionSection header="Section 6">
                    Section 6 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section1ContentPanel = await screen.findByTestId(
            "section-1-content-panel",
        );

        // Assert
        expect(section1ContentPanel).toHaveAttribute("role", "region");
    });

    test("does not apply region role to sections when there are more than 6", async () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection header="Section 1" testId="section-1">
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
                <AccordionSection header="Section 3">
                    Section 3 content
                </AccordionSection>
                <AccordionSection header="Section 4">
                    Section 4 content
                </AccordionSection>
                <AccordionSection header="Section 5">
                    Section 5 content
                </AccordionSection>
                <AccordionSection header="Section 6">
                    Section 6 content
                </AccordionSection>
                <AccordionSection header="Section 7">
                    Section 7 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section1ContentPanel = await screen.findByTestId(
            "section-1-content-panel",
        );

        // Assert
        expect(section1ContentPanel).not.toHaveAttribute("role", "region");
    });

    test("appropriately sets aria-labelledby on the content panel", async () => {
        // Arrange
        render(
            <Accordion>
                <AccordionSection
                    id="accordion-section-id-for-test"
                    header="Section 1"
                    testId="section-1"
                >
                    Section 1 content
                </AccordionSection>
                <AccordionSection header="Section 2">
                    Section 2 content
                </AccordionSection>
            </Accordion>,
            {wrapper: RenderStateRoot},
        );

        // Act
        const section1ContentPanel = await screen.findByTestId(
            "section-1-content-panel",
        );

        // Assert
        expect(section1ContentPanel).toHaveAttribute(
            "aria-labelledby",
            "accordion-section-id-for-test-header",
        );
    });

    describe("keyboard navigation", () => {
        test("can open a section with the enter key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });

            // Act
            // Confirm that the section is closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();

            button1.focus();
            await userEvent.keyboard("{enter}");

            // Assert
            // Confirm that the section is now open.
            expect(await screen.findByText("Section 1 content")).toBeVisible();
        });

        test("can open a section with the space key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });

            // Act
            // Confirm that the section is closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();

            button1.focus();
            await userEvent.keyboard(" ");

            // Assert
            // Confirm that the section is now open.
            expect(await screen.findByText("Section 1 content")).toBeVisible();
        });

        test("can close a section with the enter key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });

            // Act
            // Confirm that the section is open.
            button1.click();
            expect(await screen.findByText("Section 1 content")).toBeVisible();

            button1.focus();
            await userEvent.keyboard("{enter}");

            // Assert
            // Confirm that the section is now closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        });

        test("can close a section with the space key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });

            // Act
            // Confirm that the section is open.
            button1.click();
            expect(await screen.findByText("Section 1 content")).toBeVisible();

            button1.focus();
            await userEvent.keyboard(" ");

            // Assert
            // Confirm that the section is now closed.
            expect(screen.queryByText("Section 1 content")).not.toBeVisible();
        });

        test("can navigate to the next section with the tab key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button2 = await screen.findByRole("button", {
                name: "Section 2",
            });

            // Act
            button1.focus();
            await userEvent.tab();

            // Assert
            expect(button2).toHaveFocus();
        });

        test("can navigate to the previous section with the shift+tab key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button2 = await screen.findByRole("button", {
                name: "Section 2",
            });

            // Act
            button2.focus();
            await userEvent.tab({shift: true});

            // Assert
            expect(button1).toHaveFocus();
        });

        test("can navigate to the next section with the arrow down key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button2 = await screen.findByRole("button", {
                name: "Section 2",
            });

            // Act
            button1.focus();
            await userEvent.keyboard("{arrowdown}");

            // Assert
            expect(button2).toHaveFocus();
        });

        test("can cycle to the first section with the arrow down key from the last section", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2" testId="section-2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button3 = await screen.findByRole("button", {
                name: "Section 3",
            });

            // Act
            button3.focus();
            await userEvent.keyboard("{arrowdown}");

            // Assert
            expect(button1).toHaveFocus();
            expect(button3).not.toHaveFocus();
        });

        test("can navigate to the previous section with the arrow up key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button2 = await screen.findByRole("button", {
                name: "Section 2",
            });

            // Act
            button2.focus();
            await userEvent.keyboard("{arrowup}");

            // Assert
            expect(button1).toHaveFocus();
        });

        test("can cycle to the last section with the arrow up key from the first section", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2" testId="section-2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button3 = await screen.findByRole("button", {
                name: "Section 3",
            });

            // Act
            button1.focus();
            await userEvent.keyboard("{arrowup}");

            // Assert
            expect(button3).toHaveFocus();
            expect(button1).not.toHaveFocus();
        });

        test("can navigate to the first section with the home key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button2 = await screen.findByRole("button", {
                name: "Section 2",
            });
            const button3 = await screen.findByRole("button", {
                name: "Section 3",
            });

            // Act
            button3.focus();
            await userEvent.keyboard("{home}");

            // Assert
            expect(button1).toHaveFocus();
            expect(button2).not.toHaveFocus();
            expect(button3).not.toHaveFocus();
        });

        test("can navigate to the last section with the end key", async () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            const button1 = await screen.findByRole("button", {
                name: "Section 1",
            });
            const button2 = await screen.findByRole("button", {
                name: "Section 2",
            });
            const button3 = await screen.findByRole("button", {
                name: "Section 3",
            });

            // Act
            button1.focus();
            await userEvent.keyboard("{end}");

            // Assert
            expect(button1).not.toHaveFocus();
            expect(button2).not.toHaveFocus();
            expect(button3).toHaveFocus();
        });

        test.each(["{end}", "{home}", "{arrowup}", "{arrowdown}"])(
            "cannot navigate when header not currently focused",
            async (key) => {
                // Arrange
                render(
                    <Accordion initialExpandedIndex={0}>
                        <AccordionSection header="Section 1">
                            <label>
                                Focus on this textbox!
                                <input />
                            </label>
                        </AccordionSection>
                        <AccordionSection header="Section 2">
                            Section 2 content
                        </AccordionSection>
                    </Accordion>,
                    {wrapper: RenderStateRoot},
                );

                const button1 = await screen.findByRole("button", {
                    name: "Section 1",
                });
                const button2 = await screen.findByRole("button", {
                    name: "Section 2",
                });

                // Act
                const button = await screen.findByRole("textbox");
                button.focus();
                await userEvent.keyboard(key);

                // Assert
                expect(button1).not.toHaveFocus();
                expect(button2).not.toHaveFocus();
            },
        );
    });

    describe("controlled mode", () => {
        it("expands the sections listed in expandedIndices", async () => {
            // Arrange
            render(
                <Accordion expandedIndices={[0, 2]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            const content = await screen.findByText("Section 3 content");

            // Assert
            expect(content).toBeVisible();
        });

        it("collapses the sections that are not listed in expandedIndices", async () => {
            // Arrange
            render(
                <Accordion expandedIndices={[0, 2]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            const content = await screen.findByText("Section 2 content");

            // Assert
            expect(content).not.toBeVisible();
        });

        it("keeps every section collapsed when expandedIndices is empty", async () => {
            // Arrange
            render(
                <Accordion expandedIndices={[]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 1"}),
            );

            // Assert
            expect(screen.getByText("Section 1 content")).not.toBeVisible();
        });

        it("does not change the expanded state when a section is clicked", async () => {
            // Arrange
            render(
                <Accordion expandedIndices={[1]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 2"}),
            );

            // Assert
            expect(screen.getByText("Section 2 content")).toBeVisible();
        });

        it("updates the expanded sections when expandedIndices changes", async () => {
            // Arrange
            const {rerender} = render(
                <Accordion expandedIndices={[0]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            rerender(
                <Accordion expandedIndices={[1]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
            );

            // Assert
            expect(screen.getByText("Section 2 content")).toBeVisible();
        });

        it("collapses a section when it is removed from expandedIndices", async () => {
            // Arrange
            const {rerender} = render(
                <Accordion expandedIndices={[0]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            rerender(
                <Accordion expandedIndices={[1]}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
            );

            // Assert
            expect(screen.getByText("Section 1 content")).not.toBeVisible();
        });

        it("expands the section that the consumer opens in response to onToggle", async () => {
            // Arrange
            const ControlledAccordion = () => {
                const [expandedIndices, setExpandedIndices] = React.useState<
                    Array<number>
                >([]);
                return (
                    <Accordion
                        expandedIndices={expandedIndices}
                        onToggle={(_, allExpandedIndices) =>
                            setExpandedIndices(allExpandedIndices)
                        }
                    >
                        <AccordionSection header="Section 1">
                            Section 1 content
                        </AccordionSection>
                        <AccordionSection header="Section 2">
                            Section 2 content
                        </AccordionSection>
                    </Accordion>
                );
            };
            render(<ControlledAccordion />, {wrapper: RenderStateRoot});

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 2"}),
            );

            // Assert
            expect(screen.getByText("Section 2 content")).toBeVisible();
        });
    });

    describe("onToggle", () => {
        it("is called with the index of the section that was toggled", async () => {
            // Arrange
            const onToggleSpy = jest.fn();
            render(
                <Accordion onToggle={onToggleSpy}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 2"}),
            );

            // Assert
            expect(onToggleSpy).toHaveBeenCalledWith(1, expect.anything());
        });

        it("is called with the indices of every expanded section", async () => {
            // Arrange
            const onToggleSpy = jest.fn();
            render(
                <Accordion initialExpandedIndex={0} onToggle={onToggleSpy}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                    <AccordionSection header="Section 3">
                        Section 3 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 3"}),
            );

            // Assert
            expect(onToggleSpy).toHaveBeenCalledWith(2, [0, 2]);
        });

        it("is called with the remaining expanded indices when a section is closed", async () => {
            // Arrange
            const onToggleSpy = jest.fn();
            render(
                <Accordion expandedIndices={[0, 1]} onToggle={onToggleSpy}>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 1"}),
            );

            // Assert
            expect(onToggleSpy).toHaveBeenCalledWith(0, [1]);
        });

        it("is called with only the newly expanded index when allowMultipleExpanded is false", async () => {
            // Arrange
            const onToggleSpy = jest.fn();
            render(
                <Accordion
                    expandedIndices={[0]}
                    allowMultipleExpanded={false}
                    onToggle={onToggleSpy}
                >
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 2"}),
            );

            // Assert
            expect(onToggleSpy).toHaveBeenCalledWith(1, [1]);
        });

        it("is called alongside the child's own onToggle", async () => {
            // Arrange
            const childOnToggleSpy = jest.fn();
            render(
                <Accordion onToggle={jest.fn()}>
                    <AccordionSection
                        header="Section 1"
                        onToggle={childOnToggleSpy}
                    >
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            await userEvent.click(
                await screen.findByRole("button", {name: "Section 1"}),
            );

            // Assert
            expect(childOnToggleSpy).toHaveBeenCalledExactlyOnceWith(true);
        });
    });

    describe("ids", () => {
        it("sets the id on the accordion list", () => {
            // Arrange
            render(
                <Accordion id="test-accordion">
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            const list = screen.getByRole("list");

            // Assert
            expect(list).toHaveAttribute("id", "test-accordion");
        });

        it.each([0, 1])(
            "gives the list item at index %i a unique id derived from the accordion id",
            (index) => {
                // Arrange
                render(
                    <Accordion id="test-accordion">
                        <AccordionSection header="Section 1">
                            Section 1 content
                        </AccordionSection>
                        <AccordionSection header="Section 2">
                            Section 2 content
                        </AccordionSection>
                    </Accordion>,
                    {wrapper: RenderStateRoot},
                );

                // Act
                const listItem = screen.getAllByRole("listitem")[index];

                // Assert
                expect(listItem).toHaveAttribute(
                    "id",
                    `test-accordion-section-${index}`,
                );
            },
        );

        it("does not set an id on the list items when the accordion has no id", () => {
            // Arrange
            render(
                <Accordion>
                    <AccordionSection header="Section 1">
                        Section 1 content
                    </AccordionSection>
                    <AccordionSection header="Section 2">
                        Section 2 content
                    </AccordionSection>
                </Accordion>,
                {wrapper: RenderStateRoot},
            );

            // Act
            const listItem = screen.getAllByRole("listitem")[0];

            // Assert
            expect(listItem).not.toHaveAttribute("id");
        });
    });

    describe("Accessibility", () => {
        describe("axe", () => {
            it("should not have any violations when sections are expanded", async () => {
                // Arrange
                const {container} = render(
                    <Accordion id="test-accordion" expandedIndices={[0, 1]}>
                        <AccordionSection header="Section 1">
                            Section 1 content
                        </AccordionSection>
                        <AccordionSection header="Section 2">
                            Section 2 content
                        </AccordionSection>
                    </Accordion>,
                    {wrapper: RenderStateRoot},
                );

                // Act

                // Assert
                await expect(container).toHaveNoA11yViolations();
            });
        });

        describe("ARIA", () => {
            it.each(["expandedIndices", "initialExpandedIndex"])(
                "does not forward the %s prop to the DOM",
                (propName) => {
                    // Arrange
                    render(
                        <Accordion expandedIndices={[0]}>
                            <AccordionSection header="Section 1">
                                Section 1 content
                            </AccordionSection>
                            <AccordionSection header="Section 2">
                                Section 2 content
                            </AccordionSection>
                        </Accordion>,
                        {wrapper: RenderStateRoot},
                    );

                    // Act
                    const list = screen.getByRole("list");

                    // Assert
                    expect(list).not.toHaveAttribute(propName.toLowerCase());
                },
            );
        });
    });
});
