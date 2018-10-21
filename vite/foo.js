// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

type Props = {|
    children: React.Node,
    msg: string,
    log?: boolean,
|};

export default class Foo extends React.Component<Props> {
    render() {
        // intentionally not covered in tests to check that coverage is working
        if (this.props.log) {
            // eslint-disable-next-line no-console
            console.log(this.props.msg);
        }
        return (
            <div className={css(styles.container)}>
                <h1>{this.props.children}</h1>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        background: "orange",
        width: 320,
        height: 200,
    },
});
