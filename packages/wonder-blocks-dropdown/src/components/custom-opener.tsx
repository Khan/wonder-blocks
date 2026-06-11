/* eslint-disable @khanacademy/wonder-blocks/no-raw-button */
// This file implements CustomOpener — a blank-slate button primitive designed
// for use in dropdown opener render props. It intentionally wraps
// addStyle("button") as its underlying DOM element.
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

const StyledButton = addStyle("button");

type Props = Partial<Omit<AriaProps, "aria-disabled">> & {
    /**
     * Content to render inside the button.
     */
    children: React.ReactNode;
    /**
     * Whether the opener is disabled.
     *
     * Internally, `aria-disabled` is used so the element remains focusable
     * and included in the tab order.
     */
    disabled?: boolean;
    /**
     * Adds CSS classes to the opener element.
     */
    className?: string;
    /**
     * An optional id attribute.
     */
    id?: string;
    /**
     * Set the tabindex attribute on the opener element.
     */
    tabIndex?: number;
    /**
     * Test ID for e2e testing.
     */
    testId?: string;
    /**
     * Called when the opener is clicked.
     */
    onClick?: (e: React.MouseEvent) => unknown;
    /**
     * Called when the opener receives keyboard input.
     */
    onKeyDown?: (e: React.KeyboardEvent) => unknown;
    /**
     * Called when a keyboard key is released on the opener.
     */
    onKeyUp?: (e: React.KeyboardEvent) => unknown;
    /**
     * Called when the opener receives focus.
     */
    onFocus?: (e: React.FocusEvent) => unknown;
    /**
     * Called when the opener loses focus.
     */
    onBlur?: (e: React.FocusEvent) => unknown;
    /**
     * Called when the pointer enters the opener.
     */
    onMouseEnter?: (e: React.MouseEvent) => unknown;
    /**
     * Called when the pointer leaves the opener.
     */
    onMouseLeave?: (e: React.MouseEvent) => unknown;
    /**
     * Optional custom styles for sub-elements within `CustomOpener`.
     *
     * - `root`: Styles applied to the root `<button>` element. Use this to
     *   apply your visual design — layout, colors, borders, etc. The WB
     *   focus ring is already included and does not need to be added here.
     * - `label`: Styles applied to the `BodyText` element that wraps
     *   `children`. Use this to customize typography (e.g. font weight,
     *   color) without replacing the component entirely.
     */
    styles?: {
        root?: StyleType;
        label?: StyleType;
    };
};

/**
 * A blank-slate button primitive for use inside the `opener` render prop of
 * `SingleSelect`, `MultiSelect`, and `ActionMenu`.
 *
 * `CustomOpener` provides:
 * - A real `<button>` element (correct semantics, tab order, keyboard
 *   activation via Space/Enter)
 * - The WB focus ring via `:focus-visible`, baked in — no need to import
 *   `focusStyles` yourself
 * - `aria-disabled` instead of the native `disabled` attribute, keeping the
 *   element focusable
 * - Ref forwarding, which is required by the dropdown opener wiring
 * - A CSS reset as a starting point so you control all visual styling
 *
 * The `hovered`, `focused`, and `pressed` values from the `opener` render
 * prop are available to pass to child content if your design needs them.
 *
 * ## Disabled styling
 *
 * `CustomOpener` sets `cursor: not-allowed` when `disabled` is true, but you
 * are responsible for applying visual disabled styles (e.g. reduced opacity or
 * muted colors using `semanticColor` disabled tokens) via `styles.root`.
 * The default opener handles this automatically, which is one reason it is
 * preferred over custom implementations.
 *
 * ## Usage
 *
 * ```tsx
 * import {SingleSelect, CustomOpener} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <SingleSelect
 *   placeholder="Choose an option"
 *   opener={({hovered, focused, text}) => (
 *     <CustomOpener styles={{root: styles.myOpener}}>
 *       <MyOpenerContent hovered={hovered} focused={focused} text={text} />
 *     </CustomOpener>
 *   )}
 *   onChange={handleChange}
 * >
 *   <OptionItem label="Option 1" value="1" />
 * </SingleSelect>
 * ```
 *
 * ## Ref forwarding note
 *
 * `CustomOpener` **must be the direct return value** of the `opener` render
 * prop. The dropdown internals use `ReactDOM.findDOMNode` on the ref injected
 * via `cloneElement` to locate the opener element for focus management. This
 * only works correctly when the ref reaches an `HTMLElement` — which
 * `CustomOpener` ensures by forwarding directly to its underlying `<button>`.
 *
 * If you wrap `CustomOpener` in your own function component, that wrapper
 * **must** use `React.forwardRef` and pass the ref through to `CustomOpener`,
 * otherwise the dropdown will lose focus management on close.
 */
export const CustomOpener = React.forwardRef(function CustomOpener(
    props: Props,
    ref: React.Ref<HTMLButtonElement>,
) {
    const {
        children,
        disabled,
        onClick,
        styles: stylesProp,
        testId,
        ...restProps
    } = props;

    // DropdownOpener injects `aria-disabled` via React.cloneElement at runtime,
    // bypassing the public Props type. We read it off the spread props here so
    // we can prefer it over the `disabled` prop (it also encodes readOnly state).
    const injectedAriaDisabled = (
        restProps as {"aria-disabled"?: boolean | undefined}
    )["aria-disabled"];

    // Prefer an explicit aria-disabled (injected by DropdownOpener, which
    // also accounts for readOnly state), falling back to the disabled prop.
    const ariaDisabled = injectedAriaDisabled ?? (disabled || undefined);

    return (
        <StyledButton
            {...restProps}
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            aria-disabled={ariaDisabled}
            onClick={disabled ? undefined : onClick}
            data-testid={testId}
            style={[
                styles.reset,
                disabled && styles.disabled,
                stylesProp?.root,
            ]}
        >
            <BodyText tag="span" style={stylesProp?.label}>
                {children}
            </BodyText>
        </StyledButton>
    );
});

CustomOpener.displayName = "CustomOpener";

const styles = StyleSheet.create({
    reset: {
        // CSS button reset — consumers start from a blank slate
        appearance: "none",
        background: "none",
        border: "none",
        boxSizing: "border-box",
        cursor: "pointer",
        font: "inherit",
        margin: 0,
        padding: 0,
        textAlign: "inherit",
        // Removes the 300ms tap delay on mobile browsers
        touchAction: "manipulation",
        // WB focus ring — always applied, no need to add it yourself
        ...focusStyles.focus,
    },
    disabled: {
        cursor: "not-allowed",
    },
});
