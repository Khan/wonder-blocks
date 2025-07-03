import * as React from "react";
import * as ReactDOM from "react-dom";

// Code from:
// https://gist.github.com/gaearon/adf9d5500e11a4e7b2c6f7ebf994fe56
// See: https://github.com/facebook/react/issues/11098

export default (element: React.ReactNode, expectedError: string) => {
    // Noop error boundary for testing.
    type Props = {
        children: React.ReactNode;
    };
    type State = {
        didError: boolean;
    };
    class TestBoundary extends React.Component<Props, State> {
        constructor(props: any) {
            super(props);
            this.state = {didError: false};
        }
        componentDidCatch(err: Error) {
            this.setState({didError: true});
        }
        render(): React.ReactNode {
            return this.state.didError ? null : this.props.children;
        }
    }

    // Record all errors.
    const topLevelErrors: Array<any> = [];
    function handleTopLevelError(event: any) {
        topLevelErrors.push(event.error);
        // Prevent logging
        event.preventDefault();
    }

    const div = document.createElement("div");
    window.addEventListener("error", handleTopLevelError);
    try {
        // eslint-disable-next-line react/no-deprecated, import/no-deprecated
        ReactDOM.render(<TestBoundary>{element}</TestBoundary>, div);
    } finally {
        window.removeEventListener("error", handleTopLevelError);
    }

    expect(topLevelErrors.length).toBe(1);
    expect(topLevelErrors[0].message).toContain(expectedError);
};
