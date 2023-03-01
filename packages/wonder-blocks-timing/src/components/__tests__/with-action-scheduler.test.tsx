import * as React from "react";
import {render, screen} from "@testing-library/react";

import withActionScheduler from "../with-action-scheduler";

import type {WithActionSchedulerProps} from "../../util/types";

describe("withActionScheduler", () => {
    it("should provide wrapped component with IScheduleActions instance", () => {
        // Arrange
        const Component = (props: any) => (
            <>{props.schedule != null ? "true" : "false"}</>
        );

        // Act
        const WithScheduler = withActionScheduler(Component);
        render(<WithScheduler />);

        // Assert
        expect(screen.getByText("true")).toBeInTheDocument();
    });

    it("should forward a ref", () => {
        // Arrange
        class Component extends React.Component<WithActionSchedulerProps> {
            render(): React.ReactElement {
                return <div>Hello, world!</div>;
            }
        }
        const TestComponent = withActionScheduler(Component);
        let ref: unknown = null;

        // Act
        render(<TestComponent ref={(node: any) => (ref = node)} />);

        // Assert
        expect(ref).toBeInstanceOf(Component);
    });
});
