import React, {Component} from "react";
import logo from "./logo.svg";
import {StyleSheet} from "aphrodite";

import {View} from "wonder-blocks-core";
import Button from "wonder-blocks-button";

class App extends Component {
    render() {
        return (
            <View style={styles.pinkSquare}>
                <Button>Hello, world!</Button>
            </View>
        );
    }
}

const styles = {
    pinkSquare: {
        width: 500,
        height: 200,
        background: "pink",
    },
};

export default App;
