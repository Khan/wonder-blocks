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
