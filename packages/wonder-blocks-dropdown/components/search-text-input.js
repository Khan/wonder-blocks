// @flow
// A TextField with a search icon on its left side and X icon on its right side

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {DROPDOWN_ITEM_HEIGHT} from "../util/constants.js";

type TranslatedLabels = {|
    clearSearch?: string,
    filter?: string,
|};

type Props = {|
    /**
     * the text input
     */
    searchText: string,

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
     * Used to handle the focus order in its parent component. The itemRef is
     * applied to the input directly.
     */
    itemRef?: {|current: any|},

    /**
     * Custom styles for the main wrapper
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * The object containing the translated labels used inside this component.
     */
    translatedLabels?: TranslatedLabels,
|};

type State = {|
    focused: boolean,
|};

export default class SearchTextInput extends React.Component<Props, State> {
    static isClassOf(instance: React.Element<any>) {
        return (
            instance && instance.type && instance.type.__IS_SEARCH_TEXT_INPUT__
        );
    }

    state = {
        focused: false,
    };

    static __IS_SEARCH_TEXT_INPUT__ = true;

    handleChange = (e: SyntheticInputEvent<>) => {
        e.preventDefault();
        this.props.onChange(e.target.value);
    };

    handleDismiss = () => {
        const {onClick, onChange} = this.props;
        // Empty the search text and focus the SearchTextInput
        onChange("");
        if (onClick) {
            onClick();
        }
    };

    handleBlur = (e: SyntheticInputEvent<>) => {
        this.setState({focused: false});
    };

    handleFocus = (e: SyntheticInputEvent<>) => {
        this.setState({focused: true});
    };

    maybeRenderDismissIconButton() {
        const {searchText} = this.props;
        const {clearSearch} = this.props.translatedLabels || {};

        if (searchText.length > 0) {
            return (
                <IconButton
                    icon={icons.dismiss}
                    kind="tertiary"
                    onClick={this.handleDismiss}
                    style={styles.dismissIcon}
                    aria-label={clearSearch || "Clear search"}
                />
            );
        }
    }

    render() {
        const {onClick, itemRef, searchText, style, testId} = this.props;
        const {filter} = this.props.translatedLabels || {};
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
                <input
                    type="text"
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    ref={itemRef}
                    placeholder={filter || "Filter"}
                    value={searchText}
                    className={css(
                        styles.inputStyleReset,
                        typographyStyles.LabelMedium,
                    )}
                    data-test-id={testId}
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
        borderRadius: Spacing.xxxSmall,
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
        marginLeft: Spacing.xSmall,
        marginRight: Spacing.xSmall,
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
