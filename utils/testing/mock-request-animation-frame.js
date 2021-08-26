// @flow
/**
 * Mocks requestAnimationFrame so that the callback passed to it will be called
 * 17ms (1/60th of a second) after the request is made.
 *
 * The version of JSDOM that we're using doesn't support requestAnimationFrame
 * so we have to polyfill it ourselves.
 *
 * requestAnimationFrame by components using schedule.animationFrame(), one of
 * which is dropdown-core.js.
 */
const FRAME_DURATION = 17;

export const mockRequestAnimationFrame = () => {
    let frameId = 0;
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        frameId += 1;
        setTimeout(() => cb(frameId), FRAME_DURATION);
        return frameId;
    });
};
