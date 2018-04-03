// @flow
import React, {Component} from "react";
import {Text} from "wonder-blocks-core";

import styles from "./styles.js";

import type {Props} from "./types.js";

// TODO(alex): Once style prop validation works, if all of the style prop flow
//             types are the same then switch to using functional components.
export class Title extends Component {
    props: Props;

    static defaultProps = {
        tag: "h1",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.Title, style]}>
                {children}
            </Text>
        );
    }
}

export class Tagline extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.Tagline, style]}>
                {children}
            </Text>
        );
    }
}

export class HeadingLarge extends Component {
    props: Props;

    static defaultProps = {
        tag: "h2",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.HeadingLarge, style]}>
                {children}
            </Text>
        );
    }
}

export class HeadingMedium extends Component {
    props: Props;

    static defaultProps = {
        tag: "h3",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.HeadingMedium, style]}>
                {children}
            </Text>
        );
    }
}

export class HeadingSmall extends Component {
    props: Props;

    static defaultProps = {
        tag: "h4",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.HeadingSmall, style]}>
                {children}
            </Text>
        );
    }
}

export class HeadingXSmall extends Component {
    props: Props;

    static defaultProps = {
        tag: "h4",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.HeadingXSmall, style]}>
                {children}
            </Text>
        );
    }
}

export class BodySerifBlock extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.BodySerifBlock, style]}>
                {children}
            </Text>
        );
    }
}

export class BodySerif extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.BodySerif, style]}>
                {children}
            </Text>
        );
    }
}

export class BodyMonospace extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.BodyMonospace, style]}>
                {children}
            </Text>
        );
    }
}

export class Body extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.Body, style]}>
                {children}
            </Text>
        );
    }
}

// TODO(kevinb): consider making labels block level elements
export class LabelLarge extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.LabelLarge, style]}>
                {children}
            </Text>
        );
    }
}

export class LabelMedium extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.LabelMedium, style]}>
                {children}
            </Text>
        );
    }
}

export class LabelSmall extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.LabelSmall, style]}>
                {children}
            </Text>
        );
    }
}

export class LabelXSmall extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.LabelXSmall, style]}>
                {children}
            </Text>
        );
    }
}

export class Caption extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.Caption, style]}>
                {children}
            </Text>
        );
    }
}

export class Footnote extends Component {
    props: Props;

    static defaultProps = {
        tag: "span",
    };

    render() {
        const {tag, style, children} = this.props;
        return (
            <Text tag={tag} style={[styles.Footnote, style]}>
                {children}
            </Text>
        );
    }
}
