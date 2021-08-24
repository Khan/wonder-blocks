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

import {defaultLabels, DROPDOWN_ITEM_HEIGHT} from "../util/constants.js";

type Labels = {|
    clearSearch: string,
    filter: string,
|};

type Props = {|
    /**
     * The object containing the custom labels used inside this component.
     */
    labels: Labels,

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
|};

type DefaultProps = {|
    labels: $PropertyType<Props, "labels">,
|};

type State = {|
    focused: boolean,

    /**
     * The object containing the custom labels used inside this component.
     */
    labels: Labels,
|};

export default class SearchTextInput extends React.Component<Props, State> {
    static isClassOf(instance: React.Element<any>): boolean {
        return (
            instance && instance.type && instance.type.__IS_SEARCH_TEXT_INPUT__
        );
    }

    static defaultProps: DefaultProps = {
        labels: {
            clearSearch: defaultLabels.clearSearch,
            filter: defaultLabels.filter,
        },
    };

    state: State = {
        focused: false,
        labels: {
            clearSearch: defaultLabels.clearSearch,
            filter: defaultLabels.filter,
            ...this.props.labels,
        },
    };

    componentDidUpdate(prevProps: Props) {
        if (this.props.labels !== prevProps.labels) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                labels: {...this.state.labels, ...this.props.labels},
            });
        }
    }

    static __IS_SEARCH_TEXT_INPUT__: boolean = true;

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

    handleBlur: (e: SyntheticInputEvent<>) => void = (e) => {
        this.setState({focused: false});
    };

    handleFocus: (e: SyntheticInputEvent<>) => void = (e) => {
        this.setState({focused: true});
    };

    maybeRenderDismissIconButton(): React.Node {
        const {searchText} = this.props;
        const {clearSearch} = this.state.labels; // ?

        if (searchText.length > 0) {
            return (
                <IconButton
                    icon={icons.dismiss}
                    kind="tertiary"
                    onClick={this.handleDismiss}
                    style={styles.dismissIcon}
                    aria-label={clearSearch}
                />
            );
        }
        return null;
    }

    render(): React.Node {
        const {onClick, itemRef, searchText, style, testId} = this.props;
        const {filter} = this.state.labels;

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
                    placeholder={filter}
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
