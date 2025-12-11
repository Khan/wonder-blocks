import * as React from "react";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import caretDown from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {StyleSheet} from "aphrodite";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import checkCircleIcon from "@phosphor-icons/core/fill/check-circle-fill.svg";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {StyleType, View} from "@khanacademy/wonder-blocks-core";

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
};

type Props = {
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
    };
};

const defaultLabels: Required<Props["labels"]> = {
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
export const TabsDropdown = React.forwardRef<HTMLDivElement, Props>(
    (props, ref) => {
        const {
            tabs,
            selectedTabId,
            onTabSelected,
            labels: labelsProp,
            opened,
            id: idProp,
            testId,
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

        if (tabs.length === 0) {
            return <React.Fragment />;
        }

        return (
            <View
                ref={ref}
                id={uniqueId}
                data-testid={testId}
                style={stylesProp?.root}
            >
                <ActionMenu
                    opened={opened}
                    // ActionMenu's id prop is used to set the id on the opener element
                    id={openerId}
                    menuText="Tabs"
                    opener={() => (
                        <Button
                            kind="tertiary"
                            endIcon={caretDown}
                            style={[styles.opener, stylesProp?.opener]}
                        >
                            {selectedTabItem?.label ||
                                labels.defaultOpenerLabel}
                        </Button>
                    )}
                    style={[styles.actionMenu, stylesProp?.actionMenu]}
                >
                    {tabs.map((tab: TabDropdownItem) => {
                        return (
                            <ActionItem
                                key={tab.id}
                                label={tab.label}
                                onClick={() => {
                                    onTabSelected(tab.id);
                                }}
                                active={tab.id === selectedTabId}
                                rightAccessory={
                                    tab.id === selectedTabId ? (
                                        <PhosphorIcon
                                            icon={checkCircleIcon}
                                            size="medium"
                                        />
                                    ) : undefined
                                }
                            />
                        );
                    })}
                </ActionMenu>
                <View id={panelId}>{selectedTabItem?.panel}</View>
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
    },
});
