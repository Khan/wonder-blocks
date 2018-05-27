// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";
import Button from "wonder-blocks-button";
import {Title} from "wonder-blocks-typography";
import {ModalLauncher, OneColumnModal} from "wonder-blocks-modal";

class App extends React.Component<*> {
    render() {
        const modal = (
            <OneColumnModal content={<Title>Hello, from modal</Title>} />
        );

        return (
            <View style={styles.pinkSquare}>
                <View style={styles.content}>
                    <Title>Hello, world!</Title>
                </View>
                <View style={styles.row}>
                    <ModalLauncher modal={modal}>
                        {({openModal}) => (
                            <Button onClick={openModal}>Open modal</Button>
                        )}
                    </ModalLauncher>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pinkSquare: {
        width: 500,
        height: 200,
        background: "pink",
        borderRadius: 4,
        padding: 16,
    },
    content: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});

export default App;
