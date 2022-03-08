// @flow
// A TextField with a search icon on its left side and X icon on its right side

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import type {StyleType, AriaProps} from "@khanacademy/wonder-blocks-core";

import {defaultLabels, DROPDOWN_ITEM_HEIGHT} from "../util/constants.js";

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
     * Called when the input value is changed
     */
    onChange: (searchText: string) => mixed,

    /**
     * Handler that is triggered when this component is clicked. For example,
     * use this to adjust focus in parent component. This gets called when we
     * click the dismiss icon button within the SearchTextInput.
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

export default class SearchTextInput extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        clearAriaLabel: defaultLabels.clearSearch,
        disabled: false,
        light: false,
    };

    state: State = {
        focused: false,
    };

    handleChange: (e: SyntheticInputEvent<>) => void = (e) => {
        e.preventDefault();
        this.props.onChange(e.target.value);
    };

    handleDismiss: () => void = () => {
        const {onClick, onChange} = this.props;
        // Empty the search text and focus the SearchTextInput
        onChange("");
        if (onClick) {
            onClick();
        }
    };

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

    maybeRenderDismissIconButton(): React.Node {
        const {clearAriaLabel, value} = this.props;

        if (value.length > 0) {
            return (
                <IconButton
                    icon={icons.dismiss}
                    kind="tertiary"
                    onClick={this.handleDismiss}
                    style={styles.dismissIcon}
                    aria-label={clearAriaLabel}
                />
            );
        }
        return null;
    }

    render(): React.Node {
        const {disabled, id, light, onClick, placeholder, style, testId, value} = this.props;

        return (
            <View
                id={id}
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
                    type="text"
                    disabled={disabled}
                    light={light}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    placeholder={placeholder}
                    value={value}
                    style={[
                        styles.inputStyleReset,
                        typographyStyles.LabelMedium,
                    ]}
                    testId={testId}
                />
                {this.maybeRenderDismissIconButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        border: `1px solid ${Color.offBlack16}`,
        borderRadius: Spacing.xxxSmall_4,
        alignItems: "center",
        // The height of the text input is 40 in design spec and we need to
        // specify the height as well as minHeight to make sure the search text
        // input takes enough height to render. (otherwise, it will get
        // squashed)
        height: DROPDOWN_ITEM_HEIGHT,
        minHeight: DROPDOWN_ITEM_HEIGHT,
    },
    focused: {
        border: `1px solid ${Color.blue}`,
    },
    searchIcon: {
        marginLeft: Spacing.xSmall_8,
        marginRight: Spacing.xSmall_8,
    },
    dismissIcon: {
        margin: 0,
        ":hover": {
            border: "none",
        },
    },
    inputStyleReset: {
        display: "flex",
        flex: 1,
        background: "inherit",
        border: "none",
        outline: "none",
        "::placeholder": {
            color: Color.offBlack64,
        },
        width: "100%",
        color: "inherit",
    },
});
