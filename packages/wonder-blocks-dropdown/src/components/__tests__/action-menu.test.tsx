import * as React from "react";
import {render, screen} from "@testing-library/react";
import {PointerEventsCheckLevel, userEvent} from "@testing-library/user-event";

import ActionItem from "../action-item";
import OptionItem from "../option-item";
import SeparatorItem from "../separator-item";
import ActionMenu from "../action-menu";

describe("ActionMenu", () => {
    const onClick = jest.fn();
    const onToggle = jest.fn();
    const onChange = jest.fn();

    it("opens the menu on mouse click", async () => {
        // Arrange
        render(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        const opener = await screen.findByRole("button");
        await userEvent.click(opener);

        // Assert
        expect(
            await screen.findByRole("menu", {hidden: true}),
        ).toBeInTheDocument();
    });

    // TODO(FEI-5533): Key press events aren't working correctly with
    // user-event v14. We need to investigate and fix this.
    it.skip("opens the menu on enter", async () => {
        // Arrange
        render(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        await userEvent.tab();
        await userEvent.keyboard("{enter}");

        // Assert
        expect(
            await screen.findByRole("menu", {hidden: true}),
        ).toBeInTheDocument();
    });

    // TODO(FEI-5533): Key press events aren't working correctly with
    // user-event v14. We need to investigate and fix this.
    it.skip("closes itself on escape", async () => {
        // Arrange
        render(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        await userEvent.tab();
        await userEvent.keyboard("{enter}");

        // Act
        await userEvent.keyboard("{escape}");

        // Assert
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    // TODO(FEI-5533): Key press events aren't working correctly with
    // user-event v14. We need to investigate and fix this.
    it.skip("closes itself on tab", async () => {
        // Arrange
        render(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        await userEvent.tab();
        await userEvent.keyboard("{enter}");

        // Act
        await userEvent.tab();

        // Assert
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("closes itself on an external mouse click", async () => {
        // Arrange
        const {container} = render(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        const opener = await screen.findByRole("button");
        // open using the mouse
        await userEvent.click(opener);

        // Act
        // trigger body click
        await userEvent.click(container);

        // Assert
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("updates the aria-expanded value when opening", async () => {
        // Arrange
        render(
            <ActionMenu
                menuText={"Action menu!"}
                testId="openTest"
                onChange={onChange}
                selectedValues={[]}
            >
                <ActionItem label="Action" onClick={onClick} />
                <SeparatorItem />
                <OptionItem label="Toggle" value="toggle" onClick={onToggle} />
            </ActionMenu>,
        );

        // Act
        const opener = await screen.findByRole("button");
        await userEvent.click(opener);

        // Assert
        expect(opener).toHaveAttribute("aria-expanded", "true");
    });

    it("triggers actions", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={["toggle_a"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );

        await userEvent.click(await screen.findByRole("button"), {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Act
        // toggle second OptionItem
        const optionItem = await screen.findByText("Toggle B");
        await userEvent.click(optionItem, {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a", "toggle_b"]);
    });

    it("toggles select items", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={[]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );
        await userEvent.click(await screen.findByRole("button"), {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Act
        const optionItem = await screen.findByText("Toggle A");
        await userEvent.click(optionItem, {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a"]);
    });

    it("deselects selected OptionItems", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={["toggle_a", "toggle_b"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );

        await userEvent.click(await screen.findByRole("button"), {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Act
        // Deselect second OptionItem
        const optionItem = await screen.findByText("Toggle B");
        await userEvent.click(optionItem, {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a"]);
    });

    it("doesn't break with OptionItems but no onChange callback", async () => {
        // Arrange
        render(
            <ActionMenu
                menuText={"Action menu!"}
                selectedValues={["toggle_a", "toggle_b"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );

        await userEvent.click(await screen.findByRole("button"));

        // Act, Assert
        expect(async () => {
            // toggle second OptionItem
            // eslint-disable-next-line no-console
            const optionItem = await screen.findByText("Toggle B");
            await userEvent.click(optionItem, {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });
        }).not.toThrow();
    });

    it("works with extra selected values", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <ActionMenu
                menuText={"Action menu!"}
                onChange={onChange}
                selectedValues={["toggle_a", "toggle_z"]}
            >
                <OptionItem label="Toggle A" value="toggle_a" />
                <OptionItem label="Toggle B" value="toggle_b" />
            </ActionMenu>,
        );
        await userEvent.click(await screen.findByRole("button"), {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Act
        // toggle second OptionItem
        const optionItem = await screen.findByText("Toggle A");
        await userEvent.click(optionItem, {
            pointerEventsCheck: PointerEventsCheckLevel.Never,
        });

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_z"]);
    });

    it("can have a menu with a single item", async () => {
        // Arrange
        render(
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Action" />
            </ActionMenu>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(screen.getAllByRole("menuitem", {hidden: true})).toHaveLength(1);
    });

    it("can have a menu with no items", async () => {
        // Arrange
        render(<ActionMenu menuText={"Action menu!"} />);

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });

    it("can have falsy items", async () => {
        // Arrange
        const showDeleteAction = false;
        render(
            // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Create" />
                {showDeleteAction && <ActionItem label="Delete" />}
            </ActionMenu>,
        );

        // Act
        await userEvent.click(await screen.findByRole("button"));

        // Assert
        expect(screen.getAllByRole("menuitem", {hidden: true})).toHaveLength(1);
        expect(await screen.findByText("Create")).toBeInTheDocument();
    });

    it("verifies testId is added to the opener", async () => {
        // Arrange
        render(
            <ActionMenu menuText={"Action menu!"} testId="some-test-id">
                <ActionItem label="Create" />
            </ActionMenu>,
        );

        // Act
        const opener = await screen.findByRole("button");

        // Assert
        expect(opener).toHaveAttribute("data-testid", "some-test-id");
    });

    describe("Controlled component", () => {
        type Props = {
            opened?: boolean;
            onToggle?: (opened: boolean) => unknown;
        };

        const ControlledComponent = function (
            props: Props,
        ): React.ReactElement {
            const [opened, setOpened] = React.useState(props.opened);

            const handleToggleMenu = (opened: any) => {
                setOpened(opened);
                props.onToggle?.(opened);
            };

            return (
                <React.Fragment>
                    <ActionMenu
                        opened={opened}
                        onToggle={handleToggleMenu}
                        menuText={"Action menu!"}
                    >
                        <ActionItem label="Create" />
                        <ActionItem label="Delete" />
                    </ActionMenu>
                    <button
                        data-testid="parent-button"
                        onClick={() => handleToggleMenu(true)}
                    />
                </React.Fragment>
            );
        };

        it("opens the menu when the parent updates its state", async () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            await userEvent.click(await screen.findByTestId("parent-button"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", async () => {
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            // open the menu from the outside
            await userEvent.click(await screen.findByTestId("parent-button"), {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });
            // click on first item
            await userEvent.click(await screen.findByText("Create"), {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });

        it("closes the menu when an option is clicked", async () => {
            // Arrange
            render(<ControlledComponent />);

            // Act
            // open the menu from the outside
            await userEvent.click(await screen.findByTestId("parent-button"), {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });
            // pick an option to close the menu
            await userEvent.click(await screen.findByText("Create"), {
                pointerEventsCheck: PointerEventsCheckLevel.Never,
            });

            // Assert
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });
    });

    describe("Custom Opener", () => {
        it("opens the menu when clicking on the custom opener", async () => {
            // Arrange
            render(
                <ActionMenu
                    menuText={"Action menu!"}
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <ActionItem label="Action" onClick={onClick} />
                </ActionMenu>,
            );

            // Act
            await userEvent.click(await screen.findByLabelText("Search"));

            // Assert
            expect(
                await screen.findByRole("menu", {hidden: true}),
            ).toBeInTheDocument();
        });

        it("calls the custom onClick handler", async () => {
            // Arrange
            const onClickMock = jest.fn();

            render(
                <ActionMenu
                    menuText={"Action menu!"}
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={(eventState: any) => (
                        <button aria-label="Search" onClick={onClickMock} />
                    )}
                >
                    <ActionItem label="Action" onClick={onClick} />
                </ActionMenu>,
            );

            // Act
            await userEvent.click(await screen.findByLabelText("Search"));

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("verifies testId is passed from the custom opener", async () => {
            // Arrange
            render(
                <ActionMenu
                    onChange={onChange}
                    menuText="Action menu!"
                    opener={() => (
                        <button
                            data-testid="custom-opener"
                            aria-label="Custom opener"
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByLabelText("Custom opener");

            // Assert
            expect(opener).toHaveAttribute("data-testid", "custom-opener");
        });

        it("verifies testId is not passed from the parent element", async () => {
            // Arrange
            render(
                <ActionMenu
                    onChange={onChange}
                    menuText="Action menu!"
                    testId="custom-opener"
                    opener={() => <button aria-label="Custom opener" />}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByLabelText("Custom opener");

            // Assert
            expect(opener).not.toHaveAttribute("data-testid");
        });

        it("passes the menu text to the custom opener", async () => {
            // Arrange
            render(
                <ActionMenu
                    menuText="Action menu!"
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={({text}: any) => (
                        <button onClick={jest.fn()} data-testid="custom-opener">
                            {text}
                        </button>
                    )}
                >
                    <OptionItem label="Toggle A" value="toggle_a" />
                    <OptionItem label="Toggle B" value="toggle_b" />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByTestId("custom-opener");

            // Assert
            expect(opener).toHaveTextContent("Action menu!");
        });
    });
    describe("Ids", () => {
        it("Should auto-generate an id for the opener if `id` prop is not provided", async () => {
            // Arrange
            render(
                <ActionMenu menuText={"Action menu!"}>
                    <ActionItem label="Create" />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByRole("button");

            // Assert
            // Expect autogenerated id to be in the form uid-action-menu-opener-[number]-wb-id
            expect(opener).toHaveAttribute(
                "id",
                expect.stringMatching(/^uid-action-menu-opener-\d+-wb-id$/),
            );
        });

        it("Should use the `id` prop if provided", async () => {
            // Arrange
            const id = "test-id";
            render(
                <ActionMenu menuText={"Action menu!"} id={id}>
                    <ActionItem label="Create" />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByRole("button");

            // Assert
            expect(opener).toHaveAttribute("id", id);
        });
        it("Should auto-generate an id for the dropdown if `dropdownId` prop is not provided", async () => {
            // Arrange
            render(
                <ActionMenu menuText={"Action menu!"}>
                    <ActionItem label="Create" />
                </ActionMenu>,
            );

            // Act
            // Open the dropdown
            const opener = await screen.findByRole("button");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("menu", {hidden: true}),
            ).toHaveAttribute(
                "id",
                expect.stringMatching(/^uid-action-menu-dropdown-\d+-wb-id$/),
            );
        });

        it("Should use the `dropdownId` prop if provided", async () => {
            // Arrange
            const dropdownId = "test-id";
            render(
                <ActionMenu menuText={"Action menu!"} dropdownId={dropdownId}>
                    <ActionItem label="Create" />
                </ActionMenu>,
            );

            // Act
            // Open the dropdown
            const opener = await screen.findByRole("button");
            await userEvent.click(opener);

            // Assert
            expect(
                await screen.findByRole("menu", {hidden: true}),
            ).toHaveAttribute("id", dropdownId);
        });
    });

    describe("a11y > aria-controls", () => {
        it("Should set the `aria-controls` attribute on the default opener to the provided dropdownId prop", async () => {
            // Arrange
            const dropdownId = "test-id";
            render(
                <ActionMenu menuText={"Action menu!"} dropdownId={dropdownId}>
                    <ActionItem label="Create" />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByRole("button");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("menu", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", dropdownId);
        });

        it("Should set the `aria-controls` attribute on the default opener to the auto-generated dropdownId", async () => {
            // Arrange
            render(
                <ActionMenu menuText={"Action menu!"}>
                    <ActionItem label="Create" />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByRole("button");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("menu", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute(
                "aria-controls",
                expect.stringMatching(/^uid-action-menu-dropdown-\d+-wb-id$/),
            );
        });

        it("Should set the `aria-controls` attribute on the custom opener to the provided dropdownId prop", async () => {
            // Arrange
            const dropdownId = "test-id";
            render(
                <ActionMenu
                    menuText={"Action menu!"}
                    dropdownId={dropdownId}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <ActionItem label="Action" onClick={onClick} />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("menu", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute("aria-controls", dropdownId);
        });

        it("Should set the `aria-controls` attribute on the custom opener to the auto-generated dropdownId", async () => {
            // Arrange
            render(
                <ActionMenu
                    menuText={"Action menu!"}
                    opener={() => (
                        <button aria-label="Search" onClick={jest.fn()} />
                    )}
                >
                    <ActionItem label="Action" onClick={onClick} />
                </ActionMenu>,
            );

            // Act
            const opener = await screen.findByLabelText("Search");
            await userEvent.click(opener);
            const dropdown = await screen.findByRole("menu", {hidden: true});

            // Assert
            expect(opener).toHaveAttribute("aria-controls", dropdown.id);
            expect(opener).toHaveAttribute(
                "aria-controls",
                expect.stringMatching(/^uid-action-menu-dropdown-\d+-wb-id$/),
            );
        });
    });
});
