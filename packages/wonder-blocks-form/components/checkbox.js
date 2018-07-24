// @flow
// ☑️ A nicely styled checkbox for all your checkbox-y needs

import * as React from "react";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import CheckboxCore from "./checkbox-core.js";

import type {ChoiceComponentProps} from "../util/types.js";

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
