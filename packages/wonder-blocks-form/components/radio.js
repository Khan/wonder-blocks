// @flow
// 🔘 A nicely styled radio button for all your non-AMFM radio button needs.
// This component should not really be used by itself because radio buttons are
// often grouped together. See RadioGroup.
import * as React from "react";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import RadioCore from "./radio-core.js";

import type {ChoiceComponentProps} from "../util/types.js";

export default class Radio extends React.Component<ChoiceComponentProps> {
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
                        onChange(!coreProps.checked);
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
