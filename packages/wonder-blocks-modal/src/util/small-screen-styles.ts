import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {breakpoint} from "@khanacademy/wonder-blocks-tokens";

import theme from "../theme";
import {modalMediaQuery} from "./constants";

/**
 * Small-screen overrides for the modal elements a consumer can style
 * (`OnePaneDialog` / `ModalDialog` `style`, `ModalPanel` `style`,
 * `ModalContent` / `FlexibleDialog` `styles.content`, `DrawerDialog`
 * `styles.root`).
 *
 * These stay plain style objects, not CSS Modules rules, on purpose: a
 * consumer's `style` still goes through Aphrodite (unlayered and
 * `!important`), which outranks every rule in `@layer shared`, media queries
 * included. `processStyleList` merges plain objects into an Aphrodite style
 * after the consumer's `StyleSheet` styles, and Aphrodite emits `@media`
 * blocks after the base declarations, so these keep beating a consumer's base
 * styles on small screens, as they did before the CSS Modules migration.
 *
 * `processStyleList` merges plain objects shallowly, so two objects that share
 * a media-query key replace each other's block. That's why `OnePaneDialog`
 * uses one object that includes the wrapper's rules. Key order is emission
 * order: the small-height block comes before the narrow-width block, as
 * Aphrodite emitted them.
 *
 * TODO [WB-2137]: standardize media query breakpoint tokens
 */

/** `ModalDialog`'s wrapper (the element that receives its `style`). */
export const wrapperSmallScreenStyles = {
    [modalMediaQuery.smMinOrSmallerHeight]: {
        overflow: "auto",
    },
    [modalMediaQuery.midOrSmaller]: {
        flexDirection: "column",
    },
} as unknown as StyleType;

/**
 * `OnePaneDialog`'s dialog size, on the same element as the wrapper. Includes
 * the wrapper's rules because it replaces `wrapperSmallScreenStyles` (see
 * above). When both queries match, `overflow: hidden` wins.
 */
export const onePaneDialogSmallScreenStyles = {
    [modalMediaQuery.smMinOrSmallerHeight]: {
        overflow: "auto",
    },
    [modalMediaQuery.midOrSmaller]: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
} as unknown as StyleType;

/** `ModalPanel`'s wrapper. */
export const panelSmallScreenStyles = {
    [modalMediaQuery.smMinOrSmallerHeight]: {
        overflow: "auto",
    },
} as unknown as StyleType;

/** `ModalContent`'s content element. */
export const contentSmallScreenStyles = {
    [modalMediaQuery.midOrSmaller]: {
        paddingInline: theme.panel.layout.gap.small,
    },
} as unknown as StyleType;

/**
 * `ModalContent`'s content element, unless `applySmallHeightStyles` is false
 * (`FlexibleDialog` / `DrawerDialog`).
 */
export const contentSmallHeightStyles = {
    [modalMediaQuery.smMinOrSmallerHeight]: {
        flex: "unset",
        minBlockSize: "unset",
        overflow: "unset",
    },
} as unknown as StyleType;

/** `DrawerDialog`'s root: unset the minimum/maximum widths on smaller screens. */
export const drawerSmallScreenStyles = {
    [breakpoint.mediaQuery.smOrSmaller]: {
        minInlineSize: "unset",
        maxInlineSize: "unset",
    },
} as unknown as StyleType;

/** `DrawerDialog`'s root with `alignment="blockEnd"`. */
export const drawerBlockEndSmallScreenStyles = {
    [breakpoint.mediaQuery.smOrSmaller]: {
        minInlineSize: "unset",
        maxInlineSize: "unset",
        height: "auto",
    },
} as unknown as StyleType;
