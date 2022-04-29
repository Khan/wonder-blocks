// @flow
// A TextField with a search icon on its left side and X icon on its right side

import * as React from "react";

import SearchField from "@khanacademy/wonder-blocks-search-field";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {defaultLabels} from "../util/constants.js";

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

    /**
     * Automatically focus on this search field on mount.
     * TODO(WB-1310): Remove the autofocus prop after making
     * the search field sticky in dropdowns.
     */
    autofocus?: boolean,
|};

type DefaultProps = {|
    labels: $PropertyType<Props, "labels">,
|};

export default class SearchTextInput extends React.Component<Props> {
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

    // TODO(WB-1310): Remove `componentDidMount` autofocus on the search field
    // after making the search field sticky.
    componentDidMount() {
        // We need to re-focus on the text input after it mounts because of
        // the case in which the dropdown switches between virtualized and
        // non-virtualized. It can rerender the search field as the user is
        // typing based on the number of search results, which results
        // in losing focus on the field so the user can't type anymore.
        // To work around this issue, this temporary fix auto-focuses on the
        // search field on mount.
        if (this.props.autofocus) {
            this.props.itemRef?.current.focus();
        }
    }

    static __IS_SEARCH_TEXT_INPUT__: boolean = true;

    render(): React.Node {
        const {labels, onChange, onClick, itemRef, searchText, style, testId} =
            this.props;

        return (
            <SearchField
                clearAriaLabel={labels.clearSearch}
                onChange={onChange}
                onClick={onClick}
                placeholder={labels.filter}
                ref={itemRef}
                style={style}
                testId={testId}
                value={searchText}
            />
        );
    }
}
