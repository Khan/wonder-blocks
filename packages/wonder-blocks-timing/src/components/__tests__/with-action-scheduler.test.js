// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import withActionScheduler from "../with-action-scheduler.js";

import type {WithActionSchedulerProps} from "../../util/types.js";

describe("withActionScheduler", () => {
    it("should provide wrapped component with IScheduleActions instance", () => {
        // Arrange
        const Component = (props) =>
            props.schedule != null ? "true" : "false";

        // Act
        const WithScheduler = withActionScheduler(Component);
        render(<WithScheduler />);

        // Assert
        expect(screen.getByText("true")).toBeInTheDocument();
    });

    it("should forward a ref", () => {
        // Arrange
        class Component extends React.Component<WithActionSchedulerProps> {
            render(): React.Node {
                return <div>Hello, world!</div>;
            }
        }
        const TestComponent = withActionScheduler(Component);
        let ref: mixed = null;

        // Act
        render(<TestComponent ref={(node) => (ref = node)} />);

        // Assert
        expect(ref).toBeInstanceOf(Component);
    });
});
