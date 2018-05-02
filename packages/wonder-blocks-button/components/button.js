// @flow
import React from "react";
import {StyleSheet, css} from "aphrodite";
import ButtonCore from "./button-core.js";

import type {SharedProps} from "../types.js";

type Props = SharedProps & {
    /**
     * URL to navigate to.
     *
     * Note: Either href or onClick must be defined
     */
    href?: string,

    /**
     * Whether to use client-side navigation.
     *
     * If the URL passed to href is local to the client-side, e.g.
     * /math/algebra/eval-exprs, then use ReactRouter to do a client side
     * navigation by doing history.push(this.props.href) using
     * ReactRouter's history object
     */
    clientSideNav?: boolean,

    /**
     * Function to call when button is clicked.
     *
     * This callback should be used for things like marking BigBingo
     * conversions. It should NOT be used to redirect to a different URL or to
     * prevent navigation via e.preventDefault(). The event passed to this
     * handler will have its preventDefault() and stopPropagation() methods
     * stubbed out.
     *
     * Note: onClick is optional if href is present, but must be defined if
     * href is not
     */
    onClick?: (e: SyntheticEvent<MouseEvent | TouchEvent>) => void,
};

export default class Button extends React.Component<Props> {
    render() {
        return (
            <div
                onClick={this.props.onClick && this.props.onClick}
                href={this.props.href && this.props.href}
            >
                <ButtonCore
                    icon={this.props.icon ? this.props.icon : undefined}
                    // spinner={this.props.spinner} // TODO
                    color={this.props.color ? this.props.color : undefined}
                    kind={this.props.kind ? this.props.kind : undefined}
                    light={this.props.light ? this.props.light : undefined}
                    size={this.props.size ? this.props.size : undefined}
                    disabled={
                        this.props.disabled ? this.props.disabled : undefined
                    }
                    testId={this.props.testId}
                    style={this.props.style ? this.props.style : undefined}
                >
                    {this.props.children}
                </ButtonCore>
            </div>
        );
    }
}

const styles = StyleSheet.create({});
