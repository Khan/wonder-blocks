// @flow
import React from "react";
import {StyleSheet, css} from "aphrodite";
import ButtonCore from "./button-core.js";

import type {SharedProps} from "../types.js";
type Props =
    | {|
          ...SharedProps,
          href: string,
      |}
    | {|
          ...SharedProps,
          onClick: (e: SyntheticEvent<MouseEvent | TouchEvent>) => void,
      |};

export default class Button extends React.Component<Props> {
    render() {
        return (
            <div
                onClick={this.props.onClick && this.props.onClick}
                href={this.props.href && this.props.href}
            >
                <ButtonCore
                    title={this.props.title}
                    icon={this.props.icon ? this.props.icon : undefined}
                    spinner={this.props.spinner}
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
