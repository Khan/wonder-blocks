//@flow
import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActionItem from "../action-item.js";
import OptionItem from "../option-item.js";
import SeparatorItem from "../separator-item.js";
import ActionMenu from "../action-menu.js";

describe("ActionMenu", () => {
    const onClick = jest.fn();
    const onToggle = jest.fn();
    const onChange = jest.fn();

    it("opens the menu on mouse click", () => {
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
        const opener = screen.getByRole("button");
        userEvent.click(opener);

        // Assert
        expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("opens the menu on enter", () => {
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
        userEvent.tab();
        userEvent.keyboard("{enter}");

        // Assert
        expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("closes itself on escape", () => {
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

        userEvent.tab();
        userEvent.keyboard("{enter}");

        // Act
        userEvent.keyboard("{escape}");

        // Assert
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("closes itself on tab", () => {
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

        userEvent.tab();
        userEvent.keyboard("{enter}");

        // Act
        userEvent.tab();

        // Assert
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("closes itself on an external mouse click", () => {
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

        const opener = screen.getByRole("button");
        // open using the mouse
        userEvent.click(opener);

        // Act
        // trigger body click
        userEvent.click(container);

        // Assert
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("updates the aria-expanded value when opening", () => {
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
        const opener = screen.getByRole("button");
        userEvent.click(opener);

        // Assert
        expect(opener).toHaveAttribute("aria-expanded", "true");
    });

    it("triggers actions", () => {
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

        userEvent.click(screen.getByRole("button"));

        // Act
        // toggle second OptionItem
        const optionItem = screen.getByText("Toggle B");
        userEvent.click(optionItem);

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a", "toggle_b"]);
    });

    it("toggles select items", () => {
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
        userEvent.click(screen.getByRole("button"));

        // Act
        const optionItem = screen.getByText("Toggle A");
        userEvent.click(optionItem);

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a"]);
    });

    it("deselects selected OptionItems", () => {
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

        userEvent.click(screen.getByRole("button"));

        // Act
        // Deselect second OptionItem
        const optionItem = screen.getByText("Toggle B");
        userEvent.click(optionItem);

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_a"]);
    });

    it("doesn't break with OptionItems but no onChange callback", () => {
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

        userEvent.click(screen.getByRole("button"));

        // Act, Assert
        expect(() => {
            // toggle second OptionItem
            // eslint-disable-next-line no-console
            const optionItem = screen.getByText("Toggle B");
            userEvent.click(optionItem);
        }).not.toThrow();
    });

    it("works with extra selected values", () => {
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
        userEvent.click(screen.getByRole("button"));

        // Act
        // toggle second OptionItem
        const optionItem = screen.getByText("Toggle A");
        userEvent.click(optionItem);

        // Assert
        expect(onChange).toHaveBeenCalledWith(["toggle_z"]);
    });

    it("can have a menu with a single item", () => {
        // Arrange
        render(
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Action" />
            </ActionMenu>,
        );

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(screen.getAllByRole("menuitem")).toHaveLength(1);
    });

    it("can have a menu with no items", () => {
        // Arrange
        render(<ActionMenu menuText={"Action menu!"} />);

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
    });

    it("can have falsy items", () => {
        // Arrange
        const showDeleteAction = false;
        render(
            <ActionMenu menuText={"Action menu!"}>
                <ActionItem label="Create" />
                {showDeleteAction && <ActionItem label="Delete" />}
            </ActionMenu>,
        );

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(screen.getAllByRole("menuitem")).toHaveLength(1);
        expect(screen.getByText("Create")).toBeInTheDocument();
    });

    it("verifies testId is added to the opener", () => {
        // Arrange
        render(
            <ActionMenu menuText={"Action menu!"} testId="some-test-id">
                <ActionItem label="Create" />
            </ActionMenu>,
        );

        // Act
        const opener = screen.getByRole("button");

        // Assert
        expect(opener).toHaveAttribute("data-test-id", "some-test-id");
    });

    describe("Controlled component", () => {
        type Props = {|
            opened?: boolean,
            onToggle?: (opened: boolean) => mixed,
        |};

        function ControlledComponent(props: Props) {
            const [opened, setOpened] = React.useState(props.opened);

            const handleToggleMenu = (opened) => {
                setOpened(opened);
                props.onToggle && props.onToggle(opened);
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
                        data-test-id="parent-button"
                        onClick={() => handleToggleMenu(true)}
                    />
                </React.Fragment>
            );
        }

        it("opens the menu when the parent updates its state", () => {
            // Arrange
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            userEvent.click(screen.getByTestId("parent-button"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(true);
        });

        it("closes the menu when the parent updates its state", () => {
            const onToggleMock = jest.fn();
            render(<ControlledComponent onToggle={onToggleMock} />);

            // Act
            // open the menu from the outside
            userEvent.click(screen.getByTestId("parent-button"));
            // click on first item
            userEvent.click(screen.getByText("Create"));

            // Assert
            expect(onToggleMock).toHaveBeenCalledWith(false);
        });

        it("closes the menu when an option is clicked", () => {
            // Arrange
            render(<ControlledComponent />);

            // Act
            // open the menu from the outside
            userEvent.click(screen.getByTestId("parent-button"));
            // pick an option to close the menu
            userEvent.click(screen.getByText("Create"));

            // Assert
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });
    });

    describe("Custom Opener", () => {
        it("opens the menu when clicking on the custom opener", () => {
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
            userEvent.click(screen.getByLabelText("Search"));

            // Assert
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });

        it("calls the custom onClick handler", () => {
            // Arrange
            const onClickMock = jest.fn();

            render(
                <ActionMenu
                    menuText={"Action menu!"}
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={(eventState) => (
                        <button aria-label="Search" onClick={onClickMock} />
                    )}
                >
                    <ActionItem label="Action" onClick={onClick} />
                </ActionMenu>,
            );

            // Act
            userEvent.click(screen.getByLabelText("Search"));

            // Assert
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it("verifies testId is passed from the custom opener", () => {
            // Arrange
            render(
                <ActionMenu
                    onChange={onChange}
                    menuText="Action menu!"
                    opener={() => (
                        <button
                            data-test-id="custom-opener"
                            aria-label="Custom opener"
                        />
                    )}
                >
                    <OptionItem label="item 1" value="1" />
                    <OptionItem label="item 2" value="2" />
                </ActionMenu>,
            );

            // Act
            const opener = screen.getByLabelText("Custom opener");

            // Assert
            expect(opener).toHaveAttribute("data-test-id", "custom-opener");
        });

        it("verifies testId is not passed from the parent element", () => {
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
            const opener = screen.getByLabelText("Custom opener");

            // Assert
            expect(opener).not.toHaveAttribute("data-test-id");
        });

        it("passes the menu text to the custom opener", () => {
            // Arrange
            render(
                <ActionMenu
                    menuText="Action menu!"
                    testId="openTest"
                    onChange={onChange}
                    selectedValues={[]}
                    opener={({text}) => (
                        <button
                            onClick={jest.fn()}
                            data-test-id="custom-opener"
                        >
                            {text}
                        </button>
                    )}
                >
                    <OptionItem label="Toggle A" value="toggle_a" />
                    <OptionItem label="Toggle B" value="toggle_b" />
                </ActionMenu>,
            );

            // Act
            const opener = screen.getByTestId("custom-opener");

            // Assert
            expect(opener).toHaveTextContent("Action menu!");
        });
    });
});
