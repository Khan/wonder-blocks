// @flow
const FRAME_DURATION = 17;

export const mockRequestAnimationFrame = () => {
    let frameId = 0;
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        frameId += 1;
        setTimeout(() => cb(frameId), FRAME_DURATION);
        return frameId;
    });
};
