// @flow
import * as React from "react";
import {mount} from "enzyme";
import "jest-enzyme"; // eslint-disable-line import/no-unassigned-import

import ActionSchedulerProvider from "../action-scheduler-provider.js";
import ActionScheduler from "../../util/action-scheduler.js";

jest.mock("../../util/action-scheduler.js");

describe("ActionSchedulerProvider", () => {
    it("should render children with action scheduler instance", () => {
        // Arrange
        const childrenMock = jest.fn().mockReturnValueOnce(null);

        // Act
        mount(
            <ActionSchedulerProvider>{childrenMock}</ActionSchedulerProvider>,
        );

        // Assert
        expect(childrenMock).toHaveBeenCalledWith(expect.any(ActionScheduler));
    });

    it("should call disable on the action scheduler at unmount", () => {
        // Arrange
        const childrenMock = jest.fn().mockReturnValueOnce(null);
        const wrapper = mount(
            <ActionSchedulerProvider>{childrenMock}</ActionSchedulerProvider>,
        );

        // Act
        wrapper.unmount();

        // Assert
        // $FlowIgnore[prop-missing]
        expect(childrenMock.mock.calls[0][0].disable).toHaveBeenCalledTimes(1);
    });
});
