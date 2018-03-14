// @flow
import React, {Component} from "react";
import {Text} from "wonder-blocks-core";

import styles from "./styles.js";

import type {Props} from "./types.js";

// TODO(alex): Once style prop validation works, if all of the style prop flow
//             types are the same then switch to using functional components.
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

export class Tagline extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.Tagline, this.props.style]}>
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

export class BodySerifBlock extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.BodySerifBlock, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class BodySerif extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.BodySerif, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class BodyMonospace extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.BodyMonospace, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class Body extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.Body, this.props.style]}>
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

export class LabelXSmall extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.LabelXSmall, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class Caption extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.Caption, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export class Footnote extends Component {
    props: Props;

    render() {
        return (
            <Text style={[styles.Footnote, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}
