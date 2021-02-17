// @flow
import * as React from "react";
import ReactDOM from "react-dom";

// Code from:
// https://gist.github.com/gaearon/adf9d5500e11a4e7b2c6f7ebf994fe56
// See: https://github.com/facebook/react/issues/11098

export default (element: React.Node, expectedError: string) => {
    // Noop error boundary for testing.
    class TestBoundary extends React.Component<
        {|children: React.Node|},
        {|didError: boolean|},
    > {
        constructor(props) {
            super(props);
            this.state = {didError: false};
        }
        componentDidCatch(err) {
            this.setState({didError: true});
        }
        render(): React.Node {
            return this.state.didError ? null : this.props.children;
        }
    }

    // Record all errors.
    const topLevelErrors = [];
    function handleTopLevelError(event) {
        topLevelErrors.push(event.error);
        // Prevent logging
        event.preventDefault();
    }

    const div = document.createElement("div");
    window.addEventListener("error", handleTopLevelError);
    try {
        ReactDOM.render(<TestBoundary>{element}</TestBoundary>, div);
    } finally {
        window.removeEventListener("error", handleTopLevelError);
    }

    expect(topLevelErrors.length).toBe(1);
    expect(topLevelErrors[0].message).toContain(expectedError);
};
