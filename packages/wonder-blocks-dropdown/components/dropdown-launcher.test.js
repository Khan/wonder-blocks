/* eslint-disable no-console */
//@flow
import * as React from "react";
// import * as ReactDOM from "react-dom";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {mount, unmountAll} from "../../../utils/testing/mount.js";
import ActionItem from "./action-item.js";
import SeparatorItem from "./separator-item.js";
// import OptionItem from "./option-item.js";
import Dropdown from "./dropdown.js";
import DropdownLauncher from "./dropdown-launcher.js";
import {keyCodes} from "../util/constants.js";

describe("Dropdown Launcher", () => {
    window.scrollTo = jest.fn();
    window.getComputedStyle = jest.fn();
    let dropdownLauncher;

    beforeEach(() => {
        // const dummyOpener = <button />;
        // const openChanged = jest.fn();
        dropdownLauncher = mount(
            <DropdownLauncher
                menuText="Betsy Appleseed"
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
                        onClick={() => console.log("user clicked on settings")}
                        testId="settings"
                    />,
                    <ActionItem
                        label="Help"
                        disabled={true}
                        onClick={() => console.log("this item is disabled...")}
                        testId="help"
                    />,
                    <ActionItem
                        label="Feedback"
                        disabled={true}
                        href="/feedback"
                        testId="feedback"
                    />,
                    <SeparatorItem />,
                    <ActionItem
                        label="Log out"
                        href="http://khanacademy.org/logout"
                        testId="logout"
                    />,
                ]}
            >
                {(openDropdown) => (
                    <IconButton
                        // eslint-disable-next-line react/jsx-handler-names
                        onClick={openDropdown}
                        icon={icons.search}
                        aria-label="search"
                    />
                )}
            </DropdownLauncher>,
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
        const dropdown = dropdownLauncher.find(Dropdown);

        // Act
        expect(dropdown.instance().focusedIndex).toBe(0);

        // navigate down three times
        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(1);

        dropdown.simulate("keydown", {keyCode: keyCodes.down});
        dropdown.simulate("keyup", {keyCode: keyCodes.down});
        expect(dropdown.instance().focusedIndex).toBe(2);
    });
});
