// @flow
import * as React from "react";
import {mount} from "enzyme";

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

    it("should call clearAll on the action scheduler at unmount", () => {
        // Arrange
        const childrenMock = jest.fn().mockReturnValueOnce(null);
        const wrapper = mount(
            <ActionSchedulerProvider>{childrenMock}</ActionSchedulerProvider>,
        );

        // Act
        wrapper.unmount();

        // Assert
        // $FlowIgnore[method-unbinding]
        expect(childrenMock.mock.calls[0][0].clearAll).toHaveBeenCalledTimes(1);
    });
});
