// @flow
import * as React from "react";
import {render} from "@testing-library/react";

import ActionSchedulerProvider from "../action-scheduler-provider.js";
import ActionScheduler from "../../util/action-scheduler.js";

jest.mock("../../util/action-scheduler.js");

describe("ActionSchedulerProvider", () => {
    it("should render children with action scheduler instance", () => {
        // Arrange
        const childrenMock = jest.fn().mockReturnValueOnce(null);

        // Act
        render(
            <ActionSchedulerProvider>{childrenMock}</ActionSchedulerProvider>,
        );

        // Assert
        expect(childrenMock).toHaveBeenCalledWith(expect.any(ActionScheduler));
    });

    it("should call disable on the action scheduler at unmount", () => {
        // Arrange
        const childrenMock = jest.fn().mockReturnValueOnce(null);
        const {unmount} = render(
            <ActionSchedulerProvider>{childrenMock}</ActionSchedulerProvider>,
        );

        // Act
        unmount();

        // Assert
        // $FlowIgnore[prop-missing]
        expect(childrenMock.mock.calls[0][0].disable).toHaveBeenCalledTimes(1);
    });
});
