// @flow
import * as React from "react";

import {mount, unmountAll} from "../../../../utils/testing/mount.js";

import withActionScheduler from "../with-action-scheduler.js";

import type {WithActionSchedulerProps} from "../../util/types.js";

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

    it("should forward a ref", () => {
        // Arrange
        class Component extends React.Component<WithActionSchedulerProps> {
            render() {
                return <div>Hello, world!</div>;
            }
        }
        const TestComponent = withActionScheduler(Component);
        let ref: mixed = null;

        // Act
        mount(<TestComponent ref={(node) => (ref = node)} />);

        // Assert
        expect(ref).toBeInstanceOf(Component);
    });
});
