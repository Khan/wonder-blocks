import * as React from "react";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import caretDown from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {StyleSheet} from "aphrodite";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import checkCircleIcon from "@phosphor-icons/core/fill/check-circle-fill.svg";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {View, StyleType} from "@khanacademy/wonder-blocks-core";
import {AriaLabelOrAriaLabelledby} from "./types";

type TabDropdownItem = {
    /**
     * The label of the tab
     */
    label: string;
    /**
     * The id of the tab
     */
    id: string;
    /**
     * The contents for the tab
     */
    panel: React.ReactNode;
    /**
     * Optional test ID for e2e testing of the menu item.
     */
    testId?: string;
    /**
     * Optional aria-label for the tab.
     */
    "aria-label"?: string;
    /**
     * Optional icon to display in the tab. Should be a PhosphorIcon or Icon component.
     */
    icon?: React.ReactElement;
};

export type TabsDropdownProps = AriaLabelOrAriaLabelledby & {
    /**
     * A unique id for the component. If not provided, a unique base id will be
     * generated automatically.
     *
     * Here is how the id is used for the different elements in the component:
     * - The root will have an id of `${id}`
     * - The opener will have an id of `${id}-opener`
     * - The panel will have an id of `${id}-panel`
     */
    id?: string;
    /**
     * Optional test ID for e2e testing.
     *
     * Here is how the testId is used for the different elements in the component:
     * - The root will have a testId of `${testId}`
     * - The opener will have a testId of `${testId}-opener`
     * - The panel will have a testId of `${testId}-panel`
     */
    testId?: string;
    /**
     * The tabs to render in the dropdown.
     */
    tabs: Array<TabDropdownItem>;
    /**
     * The id of the tab that is selected.
     *
     * If the selectedTabId is not valid, the `labels.defaultOpenerLabel` will
     * be used to label the dropdown opener.
     */
    selectedTabId: string;
    /**
     * Called when a tab is selected.
     */
    onTabSelected: (id: string) => unknown;

    /**
     * Labels for the dropdown.
     */
    labels?: {
        // The label used for the opener when there is no selected tab. Defaults
        // to an untranslated "Tabs" string.
        defaultOpenerLabel?: string;
    };

    /**
     * Can be used to override the opened state for the dropdown
     */
    opened?: boolean;

    /**
     * Styling for the tabs dropdown.
     */
    styles?: {
        // Styling for the root element.
        root?: StyleType;

        // Styling for the action menu.
        actionMenu?: StyleType;

        // Styling for the opener.
        opener?: StyleType;

        // Styling for the tab panel wrapper. If styles need to be applied to a
        // specific tab panel, set the style on the `panel` content for the
        // `tabs` prop.
        tabPanel?: StyleType;
    };
};

const defaultLabels: Required<TabsDropdownProps["labels"]> = {
    defaultOpenerLabel: "Tabs",
};

/**
 * The TabsDropdown component is used to represent tabs in an ActionMenu when
 * there is not enough horizontal space to render the tabs as a horizontal layout.
 *
 * Note: This component is meant to be used internally to address responsiveness
 * in the ResponsiveTabs component. Please reach out to the WB team if there is
 * a need to use this component directly.
 */
export const TabsDropdown = React.forwardRef<HTMLDivElement, TabsDropdownProps>(
    (props, ref) => {
        const {
            tabs,
            selectedTabId,
            onTabSelected,
            labels: labelsProp,
            opened,
            id: idProp,
            testId,
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledby,
            styles: stylesProp,
        } = props;

        const labels = React.useMemo(() => {
            return {...defaultLabels, ...labelsProp};
        }, [labelsProp]);

        const generatedUniqueId = React.useId();
        const uniqueId = idProp ?? generatedUniqueId;
        const openerId = `${uniqueId}-opener`;
        const panelId = `${uniqueId}-panel`;

        const selectedTabItem = React.useMemo(() => {
            return tabs.find(
                (tab: TabDropdownItem) => tab.id === selectedTabId,
            );
        }, [tabs, selectedTabId]);

        // Memoize the processed tabs with cloned icons to avoid cloning on every render
        const processedTabs = React.useMemo(() => {
            return tabs.map((tab) => ({
                ...tab,
                leftAccessory: tab.icon
                    ? React.cloneElement(tab.icon, {
                          // By default, use the medium size for icon components
                          size: tab.icon.props.size ?? "medium",
                      })
                    : undefined,
                handleClick: () => {
                    onTabSelected(tab.id);
                },
            }));
        }, [tabs, onTabSelected]);

        if (tabs.length === 0) {
            return <React.Fragment />;
        }

        const menuText = selectedTabItem?.label || labels.defaultOpenerLabel;

        return (
            <View
                ref={ref}
                id={uniqueId}
                testId={testId}
                style={stylesProp?.root}
                role="region"
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
                            style={[styles.opener, stylesProp?.opener]}
                            labelStyle={styles.labelStyle}
                            // If the selected tab has an aria-label, use it for
                            // the opener when it is selected
                            aria-label={selectedTabItem?.["aria-label"]}
                            startIcon={selectedTabItem?.icon}
                        >
                            {menuText}
                        </Button>
                    )}
                    style={[styles.actionMenu, stylesProp?.actionMenu]}
                >
                    {processedTabs.map((tab) => {
                        return (
                            <ActionItem
                                key={tab.id}
                                label={tab.label}
                                aria-label={tab["aria-label"]}
                                onClick={tab.handleClick}
                                active={tab.id === selectedTabId}
                                testId={tab.testId}
                                rightAccessory={
                                    tab.id === selectedTabId ? (
                                        <PhosphorIcon
                                            icon={checkCircleIcon}
                                            size="medium"
                                            aria-hidden="true"
                                        />
                                    ) : undefined
                                }
                                leftAccessory={tab.leftAccessory}
                            />
                        );
                    })}
                </ActionMenu>
                <View
                    id={panelId}
                    role="group"
                    aria-labelledby={openerId}
                    testId={testId ? `${testId}-panel` : undefined}
                    style={stylesProp?.tabPanel}
                >
                    {selectedTabItem?.panel}
                </View>
            </View>
        );
    },
);

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
        gap: sizing.size_020,
    },
    labelStyle: {
        flexGrow: 1,
        maxWidth: "100%",
        textAlign: "start",
    },
});
