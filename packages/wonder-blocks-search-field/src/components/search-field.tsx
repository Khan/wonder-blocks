import * as React from "react";
import {StyleSheet} from "aphrodite";

import xIcon from "@phosphor-icons/core/regular/x.svg";
import magnifyingGlassIcon from "@phosphor-icons/core/bold/magnifying-glass-bold.svg";

import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {View, Id} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {
    border,
    semanticColor,
    spacing,
} from "@khanacademy/wonder-blocks-tokens";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";

import {defaultLabels} from "../util/constants";

type Props = AriaProps & {
    /**
     * ARIA label for the clear button. Defaults to "Clear search".
     */
    clearAriaLabel?: string;
    /**
     * The unique identifier for the input. If one is not provided,
     * a unique id will be generated.
     */
    id?: string;
    /**
     * The text input value.
     */
    value: string;
    /**
     * The name for the input control. This is submitted along with
     * the form data.
     */
    name?: string;
    /**
     * Provide hints or examples of what to enter. This shows up as
     * a grayed out text in the field before a value is entered.
     */
    placeholder?: string;
    /**
     * Whether this field should autofocus on page load.
     */
    autoFocus?: boolean;
    /**
     * Makes a read-only input field that cannot be focused.
     * Defaults to false.
     */
    disabled?: boolean;
    /**
     * Custom styles for the main wrapper.
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
    /**
     * Whether the search field is in an error state.
     */
    error?: boolean;
    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     *
     * Use this for errors that are shown to the user while they are filling out
     * a form.
     */
    validate?: (value: string) => string | null | void;
    /**
     * Called right after the SearchField is validated.
     */
    onValidate?: (errorMessage?: string | null | undefined) => unknown;
    /**
     * If true, SearchField is validated as the user types (onChange). If false,
     * it is validated when the user's focus moves out of the field (onBlur).
     * It is preferred that instantValidation is set to `false`, however, it
     * defaults to `true` for consistency with form components like TextField
     * and TextArea.
     */
    instantValidation?: boolean;
    /**
     * Called when the value has changed.
     */
    onChange: (newValue: string) => unknown;
    /**
     * Handler that is triggered when this component is clicked. For example,
     * use this to adjust focus in parent component.
     */
    onClick?: () => unknown;
    /**
     * Called when a key is pressed.
     */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => unknown;
    /**
     * Called when a key is released.
     */
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => unknown;
    /**
     * Called when the element has been focused.
     */
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
    /**
     * Called when the element has been blurred.
     */
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
};

/**
 * Search Field. A TextField with a search icon on its left side
 * and an X icon on its right side.
 *
 * Make sure to provide a label for the field. This can be done by either:
 * - (recommended) Using the **LabeledField** component to provide a label,
 * description, and/or error message for the field
 * - Using a `label` html tag with the `htmlFor` prop set to the unique id of
 * the field
 * - Using an `aria-label` attribute on the field
 * - Using an `aria-labelledby` attribute on the field
 *
 * ### Usage
 * ```jsx
 * import {SearchField} from "@khanacademy/wonder-blocks-search-field";
 *
 * const [value, setValue] = React.useState("");
 *
 * const handleChange = (newValue: string) => {
 *     setValue(newValue);
 * };
 *
 * <SearchField
 *     id="some-id"
 *     value={value}
 *     onChange={handleChange}
 * />
 * ```
 */
const SearchField: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLInputElement>
> = React.forwardRef<HTMLInputElement, Props>(function SearchField(
    props: Props,
    ref,
) {
    const {
        clearAriaLabel = defaultLabels.clearSearch,
        autoFocus,
        disabled = false,
        id,
        value,
        placeholder,
        style,
        testId,
        error,
        instantValidation = true,
        validate,
        onValidate,
        onClick,
        onChange,
        onFocus,
        onBlur,
        ...otherProps
    } = props;

    // We can't just use ref.current to clear the input because ref isn't
    // always being passed in, so we use an innerRef to allow the
    // handleClear() function to focus on the input element ref.
    const innerRef = React.useRef<HTMLInputElement | null | undefined>(null);

    const handleClear: () => void = () => {
        // Empty the search text.
        onChange("");

        // Focus back on the text field since the clear button disappears after
        // the field is cleared.
        innerRef?.current?.focus();
    };

    // @ts-expect-error [FEI-5019] - TS2322 - Type '() => JSX.Element | null' is not assignable to type '() => ReactElement<any, string | JSXElementConstructor<any>>'.
    const maybeRenderClearIconButton: () => React.ReactElement = () => {
        if (!value.length || disabled) {
            return null;
        }

        return (
            <IconButton
                icon={xIcon}
                size="small"
                kind="tertiary"
                actionType="neutral"
                onClick={handleClear}
                style={styles.dismissIcon}
                aria-label={clearAriaLabel}
            />
        );
    };

    return (
        <Id id={id}>
            {(uniqueId) => (
                <View onClick={onClick} style={[styles.inputContainer, style]}>
                    <PhosphorIcon
                        icon={magnifyingGlassIcon}
                        size="small"
                        color={
                            disabled
                                ? semanticColor.icon.disabled
                                : semanticColor.icon.primary
                        }
                        style={styles.searchIcon}
                        aria-hidden="true"
                    />
                    <TextField
                        id={uniqueId}
                        type="text"
                        autoFocus={autoFocus}
                        disabled={disabled}
                        instantValidation={instantValidation}
                        validate={validate}
                        onValidate={onValidate}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        error={error}
                        ref={(node) => {
                            // We have to set the value of both refs to
                            // the HTMLInputElement from TextField.
                            if (ref) {
                                // @ts-expect-error [FEI-5019] - TS2339 - Property 'current' does not exist on type 'MutableRefObject<Props | null> | ((instance: Props | null) => void)'.
                                ref.current = node;
                            }
                            innerRef.current = node;
                        }}
                        value={value}
                        style={[
                            styles.inputStyleReset,
                            typographyStyles.LabelMedium,
                        ]}
                        testId={testId}
                        {...otherProps}
                    />
                    {maybeRenderClearIconButton()}
                </View>
            )}
        </Id>
    );
});

const styles = StyleSheet.create({
    inputContainer: {
        boxSizing: "border-box",
        flexDirection: "row",
        borderRadius: border.radius.radius_040,
        alignItems: "center",
        height: 40,
    },
    searchIcon: {
        marginLeft: spacing.xSmall_8,
        marginRight: spacing.xSmall_8,
        position: "absolute",
        zIndex: 1,
    },
    dismissIcon: {
        margin: 0,
        position: "absolute",
        right: spacing.xxxSmall_4,
    },
    inputStyleReset: {
        display: "flex",
        flex: 1,
        width: "100%",
        paddingLeft: spacing.xLarge_32,
        paddingRight: spacing.large_24 + spacing.medium_16,
    },
});

export default SearchField;
