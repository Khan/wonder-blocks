import * as React from "react";
import {render, screen} from "@testing-library/react";

import {userEvent} from "@testing-library/user-event";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import magnifyingGlassIcon from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";
import Switch from "../switch";

describe("Switch", () => {
    describe("trigger switch callback", () => {
        test("clicking the switch should call onChange", async () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(
                <RenderStateRoot>
                    <Switch checked={false} onChange={onChangeSpy} />
                </RenderStateRoot>,
            );

            // Act
            const switchComponent = await screen.findByRole("switch");
            switchComponent.click();

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });

        test("clicking a disabled switch should not call onChange", async () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(
                <RenderStateRoot>
                    <Switch
                        checked={false}
                        onChange={onChangeSpy}
                        disabled={true}
                    />
                </RenderStateRoot>,
            );

            // Act
            const switchComponent = await screen.findByRole("switch");
            switchComponent.click();

            // Assert
            expect(onChangeSpy).not.toHaveBeenCalled();
        });

        test("pressing the space key should call onChange", async () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(
                <RenderStateRoot>
                    <Switch checked={false} onChange={onChangeSpy} />
                </RenderStateRoot>,
            );

            // Act
            const switchComponent = await screen.findByRole("switch");
            await userEvent.tab();
            await userEvent.type(switchComponent, " ");

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });

        test("clicking a label for the switch should call onChange", async () => {
            // Arrange
            const onChangeSpy = jest.fn();
            render(
                <RenderStateRoot>
                    <Switch
                        id="switch-id"
                        checked={false}
                        onChange={onChangeSpy}
                    />
                    <label htmlFor="switch-id">Switch</label>
                </RenderStateRoot>,
            );

            // Act
            const label = await screen.findByText("Switch");
            label.click();

            // Assert
            expect(onChangeSpy).toHaveBeenCalled();
        });
    });

    describe("setting attributes", () => {
        it("should set the accessibility attributes accordingly", async () => {
            // Arrange
            render(
                <RenderStateRoot>
                    <Switch
                        aria-label="Gravity"
                        checked={true}
                        disabled={true}
                    />
                </RenderStateRoot>,
            );

            // Act
            const switchComponent = await screen.findByRole("switch");

            // Assert
            expect(switchComponent).toHaveAttribute("aria-label", "Gravity");
            expect(switchComponent).toHaveProperty("checked", true);
        });

        it("should render an icon if one is provided", async () => {
            // Arrange
            render(
                <RenderStateRoot>
                    <Switch
                        checked={false}
                        icon={
                            <PhosphorIcon
                                icon={magnifyingGlassIcon}
                                testId="test-icon"
                            />
                        }
                    />
                </RenderStateRoot>,
            );

            // Act
            const icon = await screen.findByTestId("test-icon");

            // Assert
            expect(icon).toBeInTheDocument();
        });

        it("should have set aria-disabled if disabled is set", async () => {
            // Arrange
            render(
                <RenderStateRoot>
                    <Switch
                        aria-label="Gravity"
                        checked={true}
                        disabled={true}
                    />
                </RenderStateRoot>,
            );

            // Act
            const switchComponent = await screen.findByRole("switch");

            // Assert
            expect(switchComponent).toHaveAttribute("aria-disabled", "true");
        });

        it("should receive focus even if disabled is set", async () => {
            // Arrange
            render(
                <RenderStateRoot>
                    <Switch
                        aria-label="Gravity"
                        checked={true}
                        disabled={true}
                    />
                </RenderStateRoot>,
            );

            // Act
            await userEvent.tab();

            // Assert
            const switchComponent = await screen.findByRole("switch");
            expect(switchComponent).toHaveFocus();
        });
    });
});
