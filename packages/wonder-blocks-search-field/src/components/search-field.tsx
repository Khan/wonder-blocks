import * as React from "react";
import {StyleSheet} from "aphrodite";

import xIcon from "@phosphor-icons/core/regular/x.svg";
import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {View, IDProvider} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import Color from "@khanacademy/wonder-blocks-color";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
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
     * Changes the default focus ring color to fit a dark background.
     */
    light?: boolean;
    /**
     * Custom styles for the main wrapper.
     */
    style?: StyleType;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
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
        light = false,
        id,
        value,
        placeholder,
        style,
        testId,
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
        if (!value.length) {
            return null;
        }

        return (
            <IconButton
                icon={xIcon}
                kind="tertiary"
                onClick={handleClear}
                style={styles.dismissIcon}
                aria-label={clearAriaLabel}
            />
        );
    };

    return (
        <IDProvider id={id} scope="search-field">
            {(uniqueId) => (
                <View onClick={onClick} style={[styles.inputContainer, style]}>
                    <PhosphorIcon
                        icon={magnifyingGlassIcon}
                        size="medium"
                        color={Color.offBlack64}
                        style={styles.searchIcon}
                        aria-hidden="true"
                    />
                    <TextField
                        id={`${uniqueId}-field`}
                        type="text"
                        autoFocus={autoFocus}
                        disabled={disabled}
                        light={light}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder={placeholder}
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
        </IDProvider>
    );
});

const styles = StyleSheet.create({
    inputContainer: {
        boxSizing: "border-box",
        flexDirection: "row",
        borderRadius: spacing.xxxSmall_4,
        alignItems: "center",
        height: 40,
    },
    searchIcon: {
        marginLeft: spacing.xSmall_8,
        marginRight: spacing.xSmall_8,
        position: "absolute",
    },
    dismissIcon: {
        margin: 0,
        position: "absolute",
        right: 0,
        ":hover": {
            border: "none",
        },
    },
    inputStyleReset: {
        display: "flex",
        flex: 1,
        "::placeholder": {
            color: Color.offBlack64,
        },
        width: "100%",
        color: "inherit",
        paddingLeft: spacing.large_24 + spacing.medium_16,
        paddingRight: spacing.large_24 + spacing.medium_16,
    },
});

export default SearchField;
