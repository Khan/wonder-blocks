import * as React from "react";

import {TestHarnessAdapter} from "../types";

type ErrorInfo = {
    componentStack: string;
};

type Config = (
    error: Error | null | undefined,
    errorInfo: ErrorInfo,
) => React.ReactNode;

/**
 * Default configuration is to not use this adapter.
 */
export const defaultConfig: Config | null = null;

type Props = {
    onError: Config;
    children: React.ReactNode;
};

type State = {
    renderError: boolean;
    lastErrorUx?: React.ReactNode;
};

class ErrorBoundary extends React.Component<Props, State> {
    static getDerivedStateFromError(error: Error | null | undefined): State {
        return {renderError: true};
    }

    state: State = {renderError: false};

    componentDidCatch(error: Error | null | undefined, errorInfo: ErrorInfo) {
        const lastErrorUx = this.props.onError(error, errorInfo);
        this.setState({lastErrorUx});
    }

    render() {
        return this.state.renderError
            ? this.state.lastErrorUx ?? "An error occurred"
            : this.props.children;
    }
}

/**
 * Test harness adapter to add error boundary to capture errors during render.
 */
export const adapter: TestHarnessAdapter<Config> = (
    children: React.ReactNode,
    config: Config,
): React.ReactElement<any> => (
    <ErrorBoundary onError={config}>{children}</ErrorBoundary>
);
