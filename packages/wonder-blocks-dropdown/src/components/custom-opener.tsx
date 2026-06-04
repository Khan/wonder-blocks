/* eslint-disable @khanacademy/wonder-blocks/no-raw-button */
// This file implements CustomOpener — a blank-slate button primitive designed
// for use in dropdown opener render props. It intentionally wraps
// addStyle("button") as its underlying DOM element.
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";

const StyledButton = addStyle("button");

type Props = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "disabled" | "style"
> & {
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
     * Custom styles applied on top of the base button reset.
     * Use this to apply your visual design — layout, colors, borders, etc.
     * The WB focus ring is already included and does not need to be added here.
     */
    style?: StyleType;
    /**
     * Test ID for e2e testing.
     */
    testId?: string;
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
 * ## Usage
 *
 * ```tsx
 * import {SingleSelect, CustomOpener} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <SingleSelect
 *   placeholder="Choose an option"
 *   opener={({hovered, focused, text}) => (
 *     <CustomOpener style={styles.myOpener}>
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
        "aria-disabled": ariaDisabledProp,
        onClick,
        style,
        testId,
        ...restProps
    } = props;

    // Prefer an explicit aria-disabled prop (injected by DropdownOpener, which
    // also accounts for readOnly state), falling back to the disabled prop.
    const ariaDisabled = ariaDisabledProp ?? (disabled || undefined);

    return (
        <StyledButton
            {...restProps}
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            aria-disabled={ariaDisabled}
            onClick={disabled ? undefined : onClick}
            data-testid={testId}
            style={[styles.reset, disabled && styles.disabled, style]}
        >
            {children}
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
