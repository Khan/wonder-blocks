import * as React from "react";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import caretDown from "@phosphor-icons/core/bold/caret-down-bold.svg";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import Button from "@khanacademy/wonder-blocks-button";
import {StyleSheet} from "aphrodite";
import okIcon from "@phosphor-icons/core/fill/check-circle-fill.svg";
import {PropsFor} from "@khanacademy/wonder-blocks-core";
import {NavigationTabsProps} from "./types";

function getLabelFromNavigationTabItem(navTabItem: React.ReactElement): string {
    const link = navTabItem.props.children;
    const label = link.props.children;
    return label;
}

function getActionItemProps(
    navTabItem: React.ReactElement,
): PropsFor<typeof ActionItem> {
    const link = navTabItem.props.children;
    const label = link.props.children;
    const href = link.props.href;
    return {
        href,
        label,
        onClick: link.props.onClick,
        active: navTabItem.props.current,
    };
}

export const NavigationTabsDropdown = React.forwardRef(
    function NavigationTabsDropdown(
        props: NavigationTabsProps,
        ref: React.ForwardedRef<HTMLElement>,
    ) {
        const {ariaLabel} = props;
        const children = React.useMemo(
            () =>
                Array.isArray(props.children)
                    ? props.children
                    : [props.children],
            [props.children],
        );

        const currentTabItemLabel = React.useMemo(() => {
            const currentTabItem = children.find(
                (navTabItem: React.ReactElement) => navTabItem.props.current,
            );
            return currentTabItem
                ? getLabelFromNavigationTabItem(currentTabItem)
                : ariaLabel;
        }, [children, ariaLabel]);

        return (
            <ActionMenu
                menuText="Navigation Tabs"
                {...props}
                opener={() => (
                    <Button
                        kind="tertiary"
                        endIcon={caretDown}
                        style={styles.opener}
                    >
                        {currentTabItemLabel}
                    </Button>
                )}
            >
                {children.map((navTabItem: React.ReactElement) => {
                    const actionItemProps = getActionItemProps(navTabItem);
                    return (
                        <ActionItem
                            key={actionItemProps.href}
                            {...actionItemProps}
                            rightAccessory={
                                actionItemProps.active ? (
                                    <PhosphorIcon icon={okIcon} size="medium" />
                                ) : undefined
                            }
                        />
                    );
                })}
            </ActionMenu>
        );
    },
);

const styles = StyleSheet.create({
    opener: {
        position: "relative",
        height: "unset",
        paddingBlockStart: sizing.size_120,
        paddingBlockEnd: sizing.size_140,
        paddingInline: sizing.size_180,

        ":after": {
            borderBlockEnd: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
            content: "''",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
        },
    },
});
