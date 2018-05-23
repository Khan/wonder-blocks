import React, {Component} from "react";
import {StyleSheet} from "aphrodite";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {View} from "wonder-blocks-core";
import {Body, Title} from "wonder-blocks-typography";
import Button from "./components/button";
import Link from "./components/link";

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
                    </View>
                    <Body style={styles.body}>
                        Click{" "}
                        <Link href="/" clientNav>
                            Home
                        </Link>{" "}
                        to return to the homepage.
                    </Body>
                </View>
            </BrowserRouter>
        );
    }
}

const styles = StyleSheet.create({
    pinkSquare: {
        width: 500,
        height: 200,
        background: "#e0e0e0",
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
    body: {
        marginTop: 16,
    },
});

export default App;
