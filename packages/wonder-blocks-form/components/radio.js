// @flow
// 🔘 A nicely styled radio button for all your non-AMFM radio button needs
import * as React from "react";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import RadioCore from "./radio-core.js";

import type {ChoiceProps} from "../util/types.js";

export default class Radio extends React.Component<ChoiceProps> {
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
                onClick={() => {
                    // Radio buttons cannot be unchecked and therefore only
                    // call onChange if they were not originally checked
                    if (!coreProps.checked) {
                        onChange(coreProps.checked);
                    }
                }}
            >
                {(state, handlers) => {
                    return (
                        <RadioCore {...coreProps} {...state} {...handlers} />
                    );
                }}
            </ClickableBehavior>
        );
    }
}
