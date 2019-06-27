// @flow
import * as React from "react";

import {ClickableBehavior} from "@khanacademy/wonder-blocks-core";
import type {AriaProps} from "@khanacademy/wonder-blocks-core";
import ActionMenuOpenerCore from "./action-menu-opener-core.js";

export type SharedProps = {|
    ...$Rest<AriaProps, {|"aria-disabled": "true" | "false" | void|}>,

    /**
     * Display text for the opener.
     */
    children: string,

    /**
     * Whether the opener is disabled. If disabled, disallows interaction.
     */
    disabled: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Whether the dropdown is open.
     */
    opened: boolean,
|};

type Props = {|
    ...SharedProps,
    /**˜
     * Callback for when the opener is pressed.
     */
    onOpenChanged: (open: boolean, keyboard: boolean) => mixed,
|};

export default class ActionMenuOpener extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
    };

    handleClick = (e: SyntheticEvent<>) => {
        const {opened} = this.props;
        this.props.onOpenChanged(!opened, e.type === "keyup");
    };

    render() {
        /* eslint-disable-next-line no-unused-vars */
        const {children, disabled, onOpenChanged, ...sharedProps} = this.props;

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={this.handleClick}
                role="menu"
            >
                {(state) => {
                    return (
                        <ActionMenuOpenerCore
                            {...sharedProps}
                            {...state}
                            opened={this.props.opened}
                            disabled={disabled}
                        >
                            {children}
                        </ActionMenuOpenerCore>
                    );
                }}
            </ClickableBehavior>
        );
    }
}
