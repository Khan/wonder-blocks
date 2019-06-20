//@flow
import * as React from "react";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import SeparatorItem from "./separator-item.js";
import DropdownCore from "./dropdown-core.js";
import Dropdown from "./dropdown.js";
import {keyCodes} from "../util/constants.js";

describe("Dropdown Launcher", () => {
    window.scrollTo = jest.fn();
    window.getComputedStyle = jest.fn();
    let dropdownLauncher;

    beforeEach(() => {
        dropdownLauncher = mount(
            <Dropdown
                testId="teacher-menu"
                menuItems={[
                    <ActionItem
                        label="Profile"
                        href="http://khanacademy.org/profile"
                        testId="profile"
                    />,
                    <ActionItem
                        label="Teacher dashboard"
                        href="http://khanacademy.org/coach/dashboard"
                        testId="dashboard"
                    />,
                    <ActionItem
                        label="Settings (onClick)"
                        onClick={() => {}}
                        testId="settings"
                    />,
                    <ActionItem
                        label="Help"
                        disabled={true}
                        onClick={() => {}}
                        testId="help"
                    />,
                    <ActionItem
                        label="Feedback"
                        disabled={true}
                        href="/feedback"
                        testId="feedback"
                    />,
                    <SeparatorItem />,
                    <OptionItem label="Alex" value="alex" />,
                    <OptionItem label="Cathy" value="cathy" />,
                    <OptionItem label="Kumail" value="kumail" />,
                    <OptionItem label="Salman" value="salman" />,
                    <OptionItem label="Yan" value="yan" />,
                    <OptionItem label="Yash" value="yash" />,
                ]}
            >
                {(handleDropdown) => (
                    <IconButton
                        // eslint-disable-next-line react/jsx-handler-names
                        onClick={handleDropdown}
                        icon={icons.search}
                        aria-label="search"
                    />
                )}
            </Dropdown>,
        );
    });

    afterEach(() => {
        unmountAll();
    });

    it("opens when the anchor is clicked", () => {
        // Arrange
        const anchor = dropdownLauncher.find(IconButton);

        // Act
        anchor.simulate("click");

        // Assert
        expect(dropdownLauncher.state("open")).toBe(true);
    });

    it("can handle keyboard navigation", () => {
        // Arrange
        const anchor = dropdownLauncher.find(IconButton);
        anchor.simulate("click");
        const dropdown = dropdownLauncher.find(DropdownCore);

        // Act & Assert
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(0);

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(1);

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(2);
    });

    it("closes itself on escape", () => {
        // Arrange
        const anchor = dropdownLauncher.find(IconButton);
        anchor.simulate("click");
        const dropdown = dropdownLauncher.find(DropdownCore);

        // Act
        dropdown.simulate("keydown", {keyCode: keyCodes.escape});
        dropdown.simulate("keyup", {keyCode: keyCodes.escape});

        // Assert
        expect(dropdownLauncher.state("open")).toBe(false);
    });

    it("closes itself on tab", () => {
        // Arrange
        const anchor = dropdownLauncher.find(IconButton);
        anchor.simulate("click");
        const dropdown = dropdownLauncher.find(DropdownCore);

        // Act
        dropdown.simulate("keydown", {keyCode: keyCodes.tab});
        dropdown.simulate("keyup", {keyCode: keyCodes.tab});

        // Assert
        expect(dropdownLauncher.state("open")).toBe(false);
    });

    it("closes itself on an external mouse click", () => {
        // Arrange
        const anchor = dropdownLauncher.find(IconButton);
        anchor.simulate("click");

        // Act
        document.dispatchEvent(new MouseEvent("mouseup"));

        // Assert
        expect(dropdownLauncher.state("open")).toBe(false);
    });

    it("open on down key when focused", () => {
        // Arrange
        const anchor = dropdownLauncher.find(IconButton);
        anchor.simulate("click");

        // Act
        anchor.simulate("keydown", {keyCode: keyCodes.down});
        anchor.simulate("keyup", {keyCode: keyCodes.down});

        // Assert
        expect(dropdownLauncher.state("open")).toBe(true);
    });
});
