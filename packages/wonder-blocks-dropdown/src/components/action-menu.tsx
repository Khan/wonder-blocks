import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";
import {type AriaProps, type StyleType} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Placement} from "@popperjs/core";
import DropdownOpener from "./dropdown-opener";
import ActionItem from "./action-item";
import OptionItem from "./option-item";
import DropdownCore from "./dropdown-core";

import ActionMenuOpenerCore from "./action-menu-opener-core";
import type {Item, DropdownItem, OpenerProps} from "../util/types";

type Props = AriaProps &
    Readonly<{
        /**
         * The items in this dropdown.
         */
        children?: Array<Item> | Item;
        /**
         * Text for the opener of this menu.
         */
        menuText: string;
        /**
         * Can be used to override the state of the ActionMenu by parent elements
         */
        opened?: boolean;
        /**
         * In controlled mode, use this prop in case the parent needs to be notified
         * when the menu opens/closes.
         */
        onToggle?: (opened: boolean) => unknown;
        /**
         * A callback that returns items that are newly selected. Use only if this
         * menu contains select items (and make sure selectedValues is defined).
         */
        onChange?: (selectedItems: Array<string>) => unknown;
        /**
         * The values of the items that are currently selected. Use only if this
         * menu contains select items (and make sure onChange is defined).
         */
        selectedValues?: Array<string>;
        /**
         * The alignment of the menu component in relation to the opener
         * component. Defaults to "left", which is below the opener and left
         * aligned. Any valid Popper placement is also supported.
         */
        alignment?: "left" | "right" | Placement;
        /**
         * Whether this component is disabled. A disabled dropdown may not be opened
         * and does not support interaction. Defaults to false.
         */
        disabled?: boolean;
        /**
         * Test ID used for e2e testing.
         */
        testId?: string;
        /**
         * Styling specific to the dropdown component that isn't part of the opener,
         * passed by the specific implementation of the dropdown menu,
         */
        dropdownStyle?: StyleType;
        /**
         * Optional styling for the entire dropdown component.
         */
        style?: StyleType;
        /**
         * Optional CSS classes for the entire dropdown component.
         */
        className?: string;
        /**
         * The child function that returns the anchor the ActionMenu will be
         * activated by. This function takes eventState, which allows the opener
         * element to access pointer event state.
         */
        opener?: (openerProps: OpenerProps) => React.ReactElement<any>;
        /**
         * Unique identifier attached to the menu dropdown. If used, we need to
         * guarantee that the ID is unique within everything rendered on a page.
         * If one is not provided, one is auto-generated. It is used for the
         * opener's `aria-controls` attribute for screenreaders.
         */
        dropdownId?: string;
        /**
         * Unique identifier attached to the field control.
         *
         * If this is used, we need to guarantee that the ID is unique within
         * everything rendered on a page. If one is not provided, one is
         * auto-generated.
         */
        id?: string;
    }>;

/**
 * A menu that consists of various types of items.
 *
 * ## Usage
 *
 * ```jsx
 * import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <ActionMenu menuText="Menu">
 *  <ActionItem href="/profile" label="Profile" />
 *  <ActionItem label="Settings" onClick={() => {}} />
 * </ActionMenu>
 * ```
 */
function ActionMenu({
    alignment = "left",
    "aria-label": ariaLabel,
    disabled = false,
    children,
    menuText,
    opened: openedProp,
    onToggle,
    onChange,
    selectedValues,
    testId,
    dropdownStyle,
    style,
    className,
    opener,
    dropdownId,
    id,
}: Props): React.ReactNode {
    const [internalOpened, setInternalOpened] = React.useState(false);
    const openerElementRef = React.useRef<HTMLElement | undefined>(undefined);
    const generatedUniqueOpenerId = React.useId();
    const generatedUniqueDropdownId = React.useId();
    const uniqueOpenerId = id ?? generatedUniqueOpenerId;
    const uniqueDropdownId = dropdownId ?? generatedUniqueDropdownId;

    // Support controlled and uncontrolled mode
    const opened =
        typeof openedProp === "boolean" ? openedProp : internalOpened;

    const handleOpenChanged = React.useCallback(
        (newOpened: boolean) => {
            setInternalOpened(newOpened);
            if (onToggle) {
                onToggle(newOpened);
            }
        },
        [onToggle],
    );

    const handleItemSelected = React.useCallback(() => {
        // close menu
        handleOpenChanged(false);

        // Bring focus back to the opener element.
        if (openerElementRef.current) {
            openerElementRef.current.focus();
        }
    }, [handleOpenChanged]);

    const handleOptionSelected = React.useCallback(
        (selectedValue: string) => {
            // If either of these are not defined, return.
            if (!onChange || !selectedValues) {
                return;
            }

            if (selectedValues.includes(selectedValue)) {
                const index = selectedValues.indexOf(selectedValue);
                const updatedSelection = [
                    ...selectedValues.slice(0, index),
                    ...selectedValues.slice(index + 1),
                ];
                onChange(updatedSelection);
            } else {
                // Item was newly selected
                onChange([...selectedValues, selectedValue]);
            }
            handleItemSelected();
        },
        [onChange, selectedValues, handleItemSelected],
    );

    const getMenuItems = React.useCallback((): Array<DropdownItem> => {
        const allChildren = React.Children.toArray(children).filter(Boolean);

        // verify if there's at least one OptionItem element to indent the
        // possible Action items
        const isOptionItemIncluded = allChildren.some((item) =>
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'ReactChild | ReactFragment | ReactPortal' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstructor<any>>'.
            OptionItem.isClassOf(item),
        );

        // @ts-expect-error [FEI-5019] - TS2322 - Type '({ readonly component: ReactChild | ReactFragment | ReactPortal; readonly focusable: boolean; readonly populatedProps: {}; } | { populatedProps: { ...; }; component: ReactChild | ... 1 more ... | ReactPortal; focusable: boolean; } | { ...; })[]' is not assignable to type 'DropdownItem[]'.
        return allChildren.map((item) => {
            // @ts-expect-error [FEI-5019] - TS2339 - Property 'props' does not exist on type 'ReactChild | ReactFragment | ReactPortal'.
            const {value, disabled} = item.props;
            const itemObject = {
                component: item,
                focusable:
                    // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'ReactChild | ReactFragment | ReactPortal' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstructor<any>>'. | TS2345 - Argument of type 'ReactChild | ReactFragment | ReactPortal' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstructor<any>>'.
                    ActionItem.isClassOf(item) || OptionItem.isClassOf(item)
                        ? !disabled
                        : false,
                populatedProps: {},
            } as const;
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'ReactChild | ReactFragment | ReactPortal' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstructor<any>>'.
            if (ActionItem.isClassOf(item)) {
                return {
                    ...itemObject,
                    populatedProps: {
                        indent: isOptionItemIncluded,
                        onClick: handleItemSelected,
                    },
                };
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'ReactChild | ReactFragment | ReactPortal' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstructor<any>>'.
            } else if (OptionItem.isClassOf(item)) {
                const selected = selectedValues
                    ? selectedValues.includes(value)
                    : false;
                return {
                    ...itemObject,
                    populatedProps: {
                        onToggle: handleOptionSelected,
                        selected,
                        variant: "check",
                        role: "menuitemcheckbox",
                        "aria-checked": selected,
                        "aria-selected": undefined,
                    },
                };
            } else {
                return itemObject;
            }
        });
    }, [children, selectedValues, handleItemSelected, handleOptionSelected]);

    const handleOpenerRef = React.useCallback((node?: any) => {
        // eslint-disable-next-line import/no-deprecated
        openerElementRef.current = ReactDOM.findDOMNode(node) as HTMLElement;
    }, []);

    const handleClick = React.useCallback(
        (e: React.SyntheticEvent) => {
            handleOpenChanged(!opened);
        },
        [handleOpenChanged, opened],
    );

    const renderOpener = (
        numItems: number,
        dropdownId: string,
    ): React.ReactElement<React.ComponentProps<typeof DropdownOpener>> => {
        return (
            <DropdownOpener
                id={uniqueOpenerId}
                aria-controls={dropdownId}
                aria-haspopup="menu"
                onClick={handleClick}
                disabled={numItems === 0 || disabled}
                text={menuText}
                ref={handleOpenerRef}
                testId={opener ? undefined : testId}
                opened={opened}
                role="button"
                aria-label={ariaLabel}
            >
                {opener
                    ? opener
                    : (openerProps) => {
                          const {
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              text,
                              opened,
                              ...eventState
                          } = openerProps;
                          return (
                              <ActionMenuOpenerCore
                                  {...eventState}
                                  disabled={disabled}
                                  opened={!!opened}
                                  testId={testId}
                              >
                                  {menuText}
                              </ActionMenuOpenerCore>
                          );
                      }}
            </DropdownOpener>
        );
    };

    const items = getMenuItems();

    return (
        <DropdownCore
            id={uniqueDropdownId}
            role="menu"
            style={style}
            className={className}
            opener={renderOpener(items.length, uniqueDropdownId)}
            alignment={alignment}
            open={opened}
            items={items}
            openerElement={openerElementRef.current}
            onOpenChanged={handleOpenChanged}
            dropdownStyle={[styles.menuTopSpace, dropdownStyle]}
            aria-labelledby={uniqueOpenerId}
        />
    );
}

const styles = StyleSheet.create({
    caret: {
        marginInlineStart: sizing.size_040,
    },
    // The design calls for additional offset around the opener.
    opener: {
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    // This is to adjust the space between the menu and the opener.
    menuTopSpace: {
        top: `calc(-1 * ${sizing.size_040})`,
    },
});

export default ActionMenu;
