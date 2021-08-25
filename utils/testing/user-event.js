// @flow
/**
 * Wraps @testing-library/user-event so that they automatically advance timers so
 * that the timeout in mockRequestAnimationFrame will fire.
 */
import userEvent from "@testing-library/user-event";

const FRAME_DURATION = 17;

const userEventWrapper: typeof userEvent = {
    ...userEvent,
    click: (...args) => {
        userEvent.click(...args);
        jest.advanceTimersByTime(FRAME_DURATION);
    },
    keyboard: (...args) => {
        userEvent.keyboard(...args);
        jest.advanceTimersByTime(FRAME_DURATION);
    },
};

export default userEventWrapper;
