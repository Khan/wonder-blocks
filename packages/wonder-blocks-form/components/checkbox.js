// @flow

import * as React from "react";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import CheckboxCore from "./checkbox-core.js";

import type {ChoiceComponentProps} from "../util/types.js";

/**
 * ☑️ A nicely styled checkbox for all your checking needs.
 *
 * If you wish to use a single Checkbox for a settings-like item or as part of a
 * group of Checkbox[es], see the ChoiceField and CheckboxGroup components.
 */
export default class Checkbox extends React.Component<ChoiceComponentProps> {
    static defaultProps = {
        disabled: false,
        error: false,
    };

    render() {
        const {onChange, ...coreProps} = this.props;
        const ClickableBehavior = getClickableBehavior();

        return (
            <ClickableBehavior
                disabled={coreProps.disabled}
                onClick={() => onChange(!coreProps.checked)}
            >
                {(state, handlers) => {
                    return (
                        <CheckboxCore {...coreProps} {...state} {...handlers} />
                    );
                }}
            </ClickableBehavior>
        );
    }
}
