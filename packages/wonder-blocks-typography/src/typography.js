// @flow
import React, {Component} from "react";
import {Text} from "wonder-blocks-core";

import styles from "./styles.js";

import type {Props} from "./types.js";

// TODO(kevinb): clear vertical padding from h1-h6 tags
export class Title extends Component {
    props: Props;

    render() {
        return (
            <Text tag="h1" style={[styles.Title, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class HeadingLarge extends Component {
    props: Props;

    render() {
        return (
            <Text tag="h2" style={[styles.HeadingLarge, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class HeadingMedium extends Component {
    props: Props;

    render() {
        return (
            <Text tag="h3" style={[styles.HeadingMedium, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class HeadingSmall extends Component {
    props: Props;

    render() {
        return (
            <Text tag="h4" style={[styles.HeadingSmall, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class HeadingXSmall extends Component {
    props: Props;

    render() {
        return (
            <Text tag="h4" style={[styles.HeadingXSmall, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

// TODO(kevinb): consider making labels block level elements
export class LabelLarge extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.LabelLarge, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class LabelMedium extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.LabelMedium, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class LabelSmall extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.LabelSmall, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}
