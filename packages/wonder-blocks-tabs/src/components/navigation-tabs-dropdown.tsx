import * as React from "react";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import caretDown from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {StyleSheet} from "aphrodite";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";

type NavigationTabDropdownItem = {
    /**
     * The label of the navigation tab
     */
    label: string;
    /**
     * The id of the navigation tab
     */
    id: string;
    /**
     * The URL to navigate to
     */
    href: string;
};

type NavigationTabsDropdownProps = {
    /**
     * The navigation tabs to render in the dropdown.
     */
    tabs: Array<NavigationTabDropdownItem>;
};

/**
 * The NavigationTabsDropdown component is used to represent navigation tabs
 * in an ActionMenu when there is not enough horizontal space to render the
 * tabs as a horizontal layout. Unlike TabsDropdown, this component uses links
 * for navigation instead of managing tab panels.
 */
export const NavigationTabsDropdown = (props: NavigationTabsDropdownProps) => {
    const {tabs} = props;

    if (tabs.length === 0) {
        return <React.Fragment />;
    }

    // Use first tab label as default opener text
    // TODO: update default menuText
    const menuText = tabs[0]?.label || "Tabs";

    return (
        <View>
            <ActionMenu
                menuText={menuText}
                opener={() => (
                    <Button
                        kind="tertiary"
                        endIcon={caretDown}
                        style={styles.opener}
                    >
                        {menuText}
                    </Button>
                )}
                style={styles.actionMenu}
            >
                {tabs.map((tab: NavigationTabDropdownItem) => {
                    return (
                        <ActionItem
                            key={tab.id}
                            label={tab.label}
                            href={tab.href}
                        />
                    );
                })}
            </ActionMenu>
        </View>
    );
};

const styles = StyleSheet.create({
    actionMenu: {
        width: "100%",
        alignItems: "flex-start",
        borderBlockEnd: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
    },
    opener: {
        position: "relative",
        height: "unset",
        paddingBlockStart: sizing.size_120,
        paddingBlockEnd: sizing.size_140,
        paddingInline: sizing.size_180,
        width: "100%",
        justifyContent: "space-between",
    },
});
