// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";

import {defaultLabels} from "../util/constants.js";

type Props = {|
    ...AriaProps,

    /**
     * ARIA label for the clear button. Defaults to "Clear search".
     */
    clearAriaLabel?: string,

    /**
     * The unique identifier for the input.
     */
    id: string,

    /**
     * The text input value.
     */
    value: string,

    /**
     * Provide hints or examples of what to enter. This shows up as
     * a grayed out text in the field before a value is entered.
     */
    placeholder?: string,

    /**
     * Makes a read-only input field that cannot be focused.
     * Defaults to false.
     */
    disabled?: boolean,

    /**
     * Changes the default focus ring color to fit a dark background.
     */
    light?: boolean,

    /**
     * Custom styles for the main wrapper.
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Called when the value has changed.
     */
    onChange: (newValue: string) => mixed,

    /**
     * Handler that is triggered when this component is clicked. For example,
     * use this to adjust focus in parent component.
     */
    onClick?: () => mixed,

    /**
     * Called when a key is pressed.
     */
    onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed,

    /**
     * Called when the element has been focused.
     */
    onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,

    /**
     * Called when the element has been blurred.
     */
    onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,
|};

type DefaultProps = {|
    clearAriaLabel: $PropertyType<Props, "clearAriaLabel">,
    disabled: $PropertyType<Props, "disabled">,
    light: $PropertyType<Props, "light">,
|};

type State = {|
    /**
     * The user focuses on this field.
     */
    focused: boolean,
|};

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
export default class SearchField extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        clearAriaLabel: defaultLabels.clearSearch,
        disabled: false,
        light: false,
    };

    state: State = {
        focused: false,
    };

    handleClear: () => void = () => {
        const {id, onChange} = this.props;

        // Empty the search text and focus the SearchField
        onChange("");

        // Focus back on the text field since the clear button disappears after
        // the field is cleared.
        const currentField = (ReactDOM.findDOMNode(
            document.getElementById(id),
        ): any);
        currentField.focus();
    };

    maybeRenderClearIconButton(): React.Node {
        const {clearAriaLabel, value} = this.props;

        if (!value.length) {
            return null;
        }

        return (
            <IconButton
                icon={icons.dismiss}
                kind="tertiary"
                onClick={this.handleClear}
                style={styles.dismissIcon}
                aria-label={clearAriaLabel}
            />
        );
    }

    handleFocus: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onFocus} = this.props;
        this.setState({focused: true}, () => {
            if (onFocus) {
                onFocus(event);
            }
        });
    };

    handleBlur: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onBlur} = this.props;
        this.setState({focused: false}, () => {
            if (onBlur) {
                onBlur(event);
            }
        });
    };

    render(): React.Node {
        const {
            disabled,
            id,
            light,
            onChange,
            onClick,
            placeholder,
            style,
            testId,
            value,
            // The following props are being included here to avoid
            // passing them down to the otherProps spread
            clearAriaLabel: _,
            onBlur: __,
            onFocus: ___,
            // Include Aria props and onKeyDown
            ...otherProps
        } = this.props;

        return (
            <View
                onClick={onClick}
                style={[
                    styles.inputContainer,
                    this.state.focused && styles.focused,
                    style,
                ]}
            >
                <Icon
                    icon={icons.search}
                    size="medium"
                    color={Color.offBlack64}
                    style={styles.searchIcon}
                    aria-hidden="true"
                />
                <TextField
                    id={id}
                    type="text"
                    disabled={disabled}
                    light={light}
                    onChange={onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    placeholder={placeholder}
                    value={value}
                    style={[
                        styles.inputStyleReset,
                        typographyStyles.LabelMedium,
                    ]}
                    testId={testId}
                    {...otherProps}
                />
                {this.maybeRenderClearIconButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        boxSizing: "border-box",
        flexDirection: "row",
        borderRadius: Spacing.xxxSmall_4,
        alignItems: "center",
        height: 40,
    },
    searchIcon: {
        marginLeft: Spacing.xSmall_8,
        marginRight: Spacing.xSmall_8,
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
        paddingLeft: Spacing.large_24 + Spacing.medium_16,
        paddingRight: Spacing.large_24 + Spacing.medium_16,
    },
});
