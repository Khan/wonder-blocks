import * as React from "react";
import {render, screen} from "@testing-library/react";

import withActionScheduler from "../with-action-scheduler";

import type {WithActionSchedulerProps} from "../../util/types";

describe("withActionScheduler", () => {
    it("should provide wrapped component with IScheduleActions instance", () => {
        // Arrange
        const Component = (props: WithActionSchedulerProps) => (
            <>{props.schedule != null ? "true" : "false"}</>
        );

        // Act
        const WithScheduler = withActionScheduler(Component);
        render(<WithScheduler />);

        // Assert
        expect(screen.getByText("true")).toBeInTheDocument();
    });
});
