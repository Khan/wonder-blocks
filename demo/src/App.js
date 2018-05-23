import React, {Component} from "react";
import {StyleSheet} from "aphrodite";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {View} from "wonder-blocks-core";
// TODO(kevinb) add this code inside javascript/node_modules/wonder-blocks-button
// TODO(kevinb) update the update-wonder-blocks-shims.js to handle this
import Button from "./client-button";
import {Title} from "wonder-blocks-typography";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <View style={styles.pinkSquare}>
                    <Switch>
                        <Route path="/" exact>
                            <Title style={styles.title}>Demo App</Title>
                        </Route>
                        <Route path="/foo">
                            <Title style={styles.title}>Foo</Title>
                        </Route>
                        <Route path="/bar">
                            <Title style={styles.title}>Bar</Title>
                        </Route>
                    </Switch>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} href="/foo" clientNav>
                            Foo
                        </Button>
                        <Button style={styles.button} href="/bar" clientNav>
                            Bar
                        </Button>
                        <Button style={styles.button} href="/" clientNav>
                            Home
                        </Button>
                    </View>
                </View>
            </BrowserRouter>
        );
    }
}

const styles = StyleSheet.create({
    pinkSquare: {
        width: 500,
        height: 200,
        background: "pink",
        padding: 16,
    },
    title: {
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: -16,
    },
    button: {
        marginRight: 16,
        flex: 1,
    },
});

export default App;
