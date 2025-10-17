// import {afterEach, describe, expect, it} from "@jest/globals";
// import {renderHook} from "@testing-library/react";

// import {hookTestHarness} from "~/testing/with-test-harness.ts";

// import {useMediaQuery} from "../use-media-query";

// describe("useMediaQuery", () => {
//     const defaultMatchMedia = globalThis.window.matchMedia;

//     afterEach(() => {
//         globalThis.window.matchMedia = defaultMatchMedia;
//     });

//     it("should return false when no query is provided", () => {
//         // Arrange
//         const mockMatchMedia = jest.fn().mockReturnValue({
//             addEventListener: () => {},
//             removeEventListener: () => {},
//             matches: false,
//         });

//         // Act
//         const {result} = renderHook(() => useMediaQuery(""), {
//             wrapper: hookTestHarness({}),
//         });

//         // Assert
//         expect(result.current).toBe(false);
//         expect(mockMatchMedia).not.toHaveBeenCalled();
//     });

//     it("should return false when media query doesn't match", () => {
//         // Arrange
//         const mockMatchMedia = jest.fn().mockReturnValue({
//             addEventListener: () => {},
//             removeEventListener: () => {},
//             matches: false,
//         });
//         globalThis.window.matchMedia = mockMatchMedia;

//         // Act
//         const {result} = renderHook(() => useMediaQuery("(min-width: 768px)"), {
//             wrapper: hookTestHarness({}),
//         });

//         // Assert
//         expect(result.current).toBe(false);
//     });

//     it("should return true when media query matches", () => {
//         // Arrange
//         const mockMatchMedia = jest.fn().mockReturnValue({
//             addEventListener: () => {},
//             removeEventListener: () => {},
//             matches: true,
//         });
//         globalThis.window.matchMedia = mockMatchMedia;

//         // Act
//         const {result} = renderHook(() => useMediaQuery("(min-width: 768px)"), {
//             wrapper: hookTestHarness({}),
//         });

//         // Assert
//         expect(result.current).toBe(true);
//     });

//     it("should clean up event listeners on unmount", () => {
//         // Arrange
//         const mockRemoveEventListener = jest.fn();
//         const mockMatchMedia = jest.fn().mockReturnValue({
//             addEventListener: () => {},
//             removeEventListener: mockRemoveEventListener,
//             matches: false,
//         });
//         globalThis.window.matchMedia = mockMatchMedia;

//         // Act
//         const {unmount} = renderHook(
//             () => useMediaQuery("(min-width: 768px)"),
//             {
//                 wrapper: hookTestHarness({}),
//             },
//         );
//         unmount();

//         // Assert
//         expect(mockRemoveEventListener).toHaveBeenCalledWith(
//             "change",
//             expect.any(Function),
//         );
//     });
// });
