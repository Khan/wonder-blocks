import * as React from "react";
import {render} from "@testing-library/react";

import ActionSchedulerProvider from "../action-scheduler-provider";
import ActionScheduler from "../../util/action-scheduler";

jest.mock("../../util/action-scheduler");

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
        expect(childrenMock.mock.calls[0][0].disable).toHaveBeenCalledTimes(1);
    });
});
