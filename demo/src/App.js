// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {View} from "@khanacademy/wonder-blocks-core";
import {Body, Title} from "@khanacademy/wonder-blocks-typography";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";

class App extends React.Component<{}> {
    render() {
        return (
            <BrowserRouter>
                <View style={styles.container}>
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
                        <Button style={styles.button} href="/foo">
                            Foo
                        </Button>
                        <Button style={styles.button} href="/bar">
                            Bar
                        </Button>
                        <Button
                            style={styles.button}
                            href="https://khanacademy.org"
                        >
                            Khan Academy
                        </Button>
                    </View>
                    <Body style={styles.body}>
                        Click <Link href="/">Home</Link> to return to the
                        homepage.
                    </Body>
                </View>
            </BrowserRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 600,
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
    },
    button: {
        flexBasis: 180,
    },
    body: {
        marginTop: 16,
    },
});

export default App;
