import {describe, it, expect, beforeEach, afterEach} from "@jest/globals";
import {renderHook} from "@testing-library/react";
import * as React from "react";

import {useCloseOnOutsideClick} from "../use-close-on-outside-click";

describe("useCloseOnOutsideClick", () => {
    let refWrapper: React.MutableRefObject<HTMLDivElement | null>;
    let datePickerRef: React.MutableRefObject<HTMLElement | null>;
    let close: ReturnType<typeof jest.fn>;

    beforeEach(() => {
        refWrapper = {current: null};
        datePickerRef = {current: null};
        close = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        document.body.innerHTML = "";
    });

    it("registers mouseup listener when showOverlay and closeOnSelect are true", () => {
        // Arrange
        refWrapper.current = document.createElement("div");
        datePickerRef.current = document.createElement("div");
        const addSpy = jest.spyOn(document, "addEventListener");

        // Act
        renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: true,
                closeOnSelect: true,
                close,
            }),
        );

        // Assert
        expect(addSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));
    });

    it("removes mouseup listener on unmount", () => {
        // Arrange
        refWrapper.current = document.createElement("div");
        datePickerRef.current = document.createElement("div");
        const addSpy = jest.spyOn(document, "addEventListener");
        const removeSpy = jest.spyOn(document, "removeEventListener");
        const {unmount} = renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: true,
                closeOnSelect: true,
                close,
            }),
        );
        const addedHandler = addSpy.mock.calls[0][1];

        // Act
        unmount();

        // Assert
        expect(removeSpy).toHaveBeenCalledWith("mouseup", addedHandler);
    });

    it("calls close when click is outside wrapper and outside calendar", () => {
        // Arrange
        const wrapperEl = document.createElement("div");
        const calendarEl = document.createElement("div");
        refWrapper.current = wrapperEl;
        datePickerRef.current = calendarEl;
        document.body.appendChild(wrapperEl);
        document.body.appendChild(calendarEl);
        const targetOutside = document.createElement("div");
        document.body.appendChild(targetOutside);
        renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: true,
                closeOnSelect: true,
                close,
            }),
        );

        // Act
        targetOutside.dispatchEvent(new MouseEvent("mouseup", {bubbles: true}));

        // Assert
        expect(close).toHaveBeenCalled();
    });

    it("does not call close when click is inside wrapper", () => {
        // Arrange
        const wrapperEl = document.createElement("div");
        const insideEl = document.createElement("span");
        wrapperEl.appendChild(insideEl);
        refWrapper.current = wrapperEl;
        datePickerRef.current = document.createElement("div");
        renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: true,
                closeOnSelect: true,
                close,
            }),
        );

        // Act
        insideEl.dispatchEvent(new MouseEvent("mouseup", {bubbles: true}));

        // Assert
        expect(close).not.toHaveBeenCalled();
    });

    it("does not call close when click is inside calendar", () => {
        // Arrange
        refWrapper.current = document.createElement("div");
        const calendarEl = document.createElement("div");
        const insideCalendar = document.createElement("button");
        calendarEl.appendChild(insideCalendar);
        datePickerRef.current = calendarEl;
        renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: true,
                closeOnSelect: true,
                close,
            }),
        );

        // Act
        insideCalendar.dispatchEvent(
            new MouseEvent("mouseup", {bubbles: true}),
        );

        // Assert
        expect(close).not.toHaveBeenCalled();
    });

    it("does not call close when showOverlay is false", () => {
        // Arrange
        refWrapper.current = document.createElement("div");
        datePickerRef.current = document.createElement("div");
        const targetOutside = document.createElement("div");
        document.body.appendChild(targetOutside);
        renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: false,
                closeOnSelect: true,
                close,
            }),
        );

        // Act
        targetOutside.dispatchEvent(new MouseEvent("mouseup", {bubbles: true}));

        // Assert
        expect(close).not.toHaveBeenCalled();
    });

    it("does not call close when closeOnSelect is false", () => {
        // Arrange
        refWrapper.current = document.createElement("div");
        datePickerRef.current = document.createElement("div");
        const targetOutside = document.createElement("div");
        document.body.appendChild(targetOutside);
        renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: true,
                closeOnSelect: false,
                close,
            }),
        );

        // Act
        targetOutside.dispatchEvent(new MouseEvent("mouseup", {bubbles: true}));

        // Assert
        expect(close).not.toHaveBeenCalled();
    });

    it("does not call close when target is inside element with data-placement (portal)", () => {
        // Arrange
        refWrapper.current = document.createElement("div");
        datePickerRef.current = document.createElement("div");
        const portalRoot = document.createElement("div");
        portalRoot.setAttribute("data-placement", "bottom");
        const insidePortal = document.createElement("div");
        portalRoot.appendChild(insidePortal);
        document.body.appendChild(portalRoot);
        renderHook(() =>
            useCloseOnOutsideClick({
                refWrapper,
                datePickerRef,
                showOverlay: true,
                closeOnSelect: true,
                close,
            }),
        );

        // Act
        insidePortal.dispatchEvent(new MouseEvent("mouseup", {bubbles: true}));

        // Assert
        expect(close).not.toHaveBeenCalled();
    });
});
