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

type Props = {|
    searchText: string,
    onChange: (searchText: string) => mixed,
    onClick: () => mixed,
    itemRef: {current: any},
    style?: StyleType,
|};

type State = {|
    focused: boolean,
|};

export default class SearchTextInput extends React.Component<Props, State> {
    state = {
        focused: false,
    };

    handleChange = (e: SyntheticInputEvent<>) => {
        e.preventDefault();
        this.props.onChange(e.target.value);
    };

    handleDismiss = () => {
        const {onClick, onChange} = this.props;
        // Empty the search text and focus the SearchTextInput
        onChange("");
        onClick();
    };

    handleBlur = (e: SyntheticInputEvent<>) => {
        this.setState({focused: false});
    };

    handleFocus = (e: SyntheticInputEvent<>) => {
        this.setState({focused: true});
    };

    maybeRenderDismissIconButton() {
        const {searchText} = this.props;
        if (searchText.length > 0) {
            return (
                <IconButton
                    icon={icons.dismiss}
                    kind="tertiary"
                    onClick={this.handleDismiss}
                    style={styles.dismissIcon}
                    aria-label="Clear search"
                />
            );
        }
    }

    render() {
        const {onClick, itemRef, searchText, style} = this.props;
        // TODO(jangmi): Use translated strings for "Filter", "Clear search"
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
                    placeholder="Filter"
                    value={searchText}
                    className={css(
                        styles.inputStyleReset,
                        typographyStyles.LabelMedium,
                    )}
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
        borderRadius: 4,
        alignItems: "center",
        // The height of the text input is 40 in design spec and we need to
        // specify the height as well as minHeight to make sure the search text
        // input takes enough height to render. (otherwise, it will get
        // squashed)
        height: 40,
        minHeight: 40,
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
