// @flow
/**
 * Wraps @testing-library/user-event so that they automatically advance timers so
 * that the timeout in mockRequestAnimationFrame will fire.
 *
 * The reason we can't use @testing-library's async methods to wait for things
 * is that we're using using fake timers for tests so we instead need to advance
 * the jest's fake timer in order for the callback passed to requestAnimationFrame
 * to fire.
 *
 * requestAnimationFrame by components using schedule.animationFrame(), one of
 * which is dropdown-core.js.
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
