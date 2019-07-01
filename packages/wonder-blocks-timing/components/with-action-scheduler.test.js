// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../utils/testing/mount.js";

import withActionScheduler from "./with-action-scheduler.js";

describe("withActionScheduler", () => {
    afterEach(() => {
        unmountAll();
    });

    it("should provide wrapped component with IScheduleActions instance", () => {
        // Arrange
        const Component = (props) =>
            props.schedule != null ? "true" : "false";

        // Act
        const WithScheduler = withActionScheduler(Component);
        const wrapper = mount(<WithScheduler />);

        // Assert
        expect(wrapper.text()).toBe("true");
    });
});
