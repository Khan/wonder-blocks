import * as React from "react";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import caretDown from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {StyleSheet} from "aphrodite";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {TabsDropdownProps} from "./tabs-dropdown";

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
    /**
     * Optional test ID for e2e testing of the menu item.
     */
    testId?: string;
};

type NavigationTabsDropdownProps = {
    /**
     * The navigation tabs to render in the dropdown.
     */
    tabs: Array<NavigationTabDropdownItem>;
    /**
     * The id of the tab that is selected (current page).
     *
     * If the selectedTabId is not valid, the `labels.defaultOpenerLabel` will
     * be used to label the dropdown opener.
     */
    selectedTabId: string;
    /**
     * Called when a navigation tab is selected.
     */
    onTabSelected: (id: string) => unknown;
    /**
     * A unique id for the component. If not provided, a unique base id will be
     * generated automatically.
     *
     * Here is how the id is used for the different elements in the component:
     * - The root will have an id of `${id}`
     * - The opener will have an id of `${id}-opener`
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     *
     * Here is how the testId is used for the different elements in the component:
     * - The root will have a testId of `${testId}`
     * - The opener will have a testId of `${testId}-opener`
     */
    testId?: string;
    /**
     * Accessible label for the navigation element.
     *
     * It is important to provide a unique aria-label if there are multiple
     * navigation elements on the page.
     *
     * If there is a visual label for the navigation tabs already, use
     * `aria-labelledby` instead.
     */
    "aria-label"?: string;
    /**
     * If there is a visual label for the navigation tabs already, set
     * `aria-labelledby` to the `id` of the element that labels the navigation
     * tabs.
     */
    "aria-labelledby"?: string;
    /**
     * Labels for the dropdown.
     */
    labels?: {
        /**
         * The label used for the opener when there is no selected tab. Defaults
         * to an untranslated "Tabs" string.
         */
        defaultOpenerLabel?: string;
    };
    /**
     * Can be used to override the opened state for the dropdown.
     */
    opened?: boolean;
    /**
     * The HTML tag to use for the root element. Defaults to "nav".
     */
    tag?: keyof JSX.IntrinsicElements;
};

const defaultLabels: Required<TabsDropdownProps["labels"]> = {
    defaultOpenerLabel: "Tabs",
};

/**
 * The NavigationTabsDropdown component is used to represent navigation tabs
 * in an ActionMenu when there is not enough horizontal space to render the
 * tabs as a horizontal layout. Unlike TabsDropdown, this component uses links
 * for navigation instead of managing tab panels.
 */
export const NavigationTabsDropdown = React.forwardRef<
    HTMLElement,
    NavigationTabsDropdownProps
>((props, ref) => {
    const {
        tabs,
        selectedTabId,
        onTabSelected,
        id: idProp,
        testId,
        labels: labelsProp,
        opened,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        tag = "nav",
    } = props;

    const StyledTag = React.useMemo(() => addStyle(tag), [tag]);

    const labels = React.useMemo(() => {
        return {...defaultLabels, ...labelsProp};
    }, [labelsProp]);

    const selectedTabItem = React.useMemo(() => {
        return tabs.find(
            (tab: NavigationTabDropdownItem) => tab.id === selectedTabId,
        );
    }, [tabs, selectedTabId]);

    const generatedUniqueId = React.useId();
    const uniqueId = idProp ?? generatedUniqueId;
    const openerId = `${uniqueId}-opener`;

    if (tabs.length === 0) {
        return <React.Fragment />;
    }

    const menuText = selectedTabItem?.label || labels.defaultOpenerLabel;

    return (
        <StyledTag
            ref={ref}
            id={uniqueId}
            data-testid={testId}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
        >
            <ActionMenu
                opened={opened}
                // ActionMenu's id prop is used to set the id on the opener element
                id={openerId}
                menuText={menuText}
                opener={() => (
                    <Button
                        testId={testId ? `${testId}-opener` : undefined}
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
                            active={tab.id === selectedTabId}
                            testId={tab.testId}
                            onClick={
                                onTabSelected
                                    ? () => {
                                          onTabSelected(tab.id);
                                      }
                                    : undefined
                            }
                        />
                    );
                })}
            </ActionMenu>
        </StyledTag>
    );
});

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
