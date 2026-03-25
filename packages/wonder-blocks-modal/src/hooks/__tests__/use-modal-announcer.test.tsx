import * as React from "react";
import {render} from "@testing-library/react";

import * as Announcer from "@khanacademy/wonder-blocks-announcer";

import {useModalAnnouncer} from "../use-modal-announcer";

const TestDialog = React.forwardRef<HTMLDivElement>(
    function TestDialog(_, ref) {
        const {ariaModalRef} = useModalAnnouncer(ref);
        return <div role="dialog" aria-modal="true" ref={ariaModalRef} />;
    },
);

describe("useModalAnnouncer", () => {
    beforeEach(() => {
        jest.spyOn(Announcer, "attachAnnouncerToModal").mockReturnValue(
            undefined,
        );
        jest.spyOn(Announcer, "detachAnnouncerFromModal").mockReturnValue(
            undefined,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("calls attachAnnouncerToModal with the dialog element on mount", () => {
        // Arrange
        const attachSpy = jest.spyOn(Announcer, "attachAnnouncerToModal");

        // Act
        render(<TestDialog />);

        // Assert
        expect(attachSpy).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it("calls detachAnnouncerFromModal with the dialog element on unmount", () => {
        // Arrange
        const detachSpy = jest.spyOn(Announcer, "detachAnnouncerFromModal");
        const {unmount} = render(<TestDialog />);

        // Act
        unmount();

        // Assert
        expect(detachSpy).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it("attaches and detaches the same element", () => {
        // Arrange
        let attachedEl: HTMLElement | undefined;
        let detachedEl: HTMLElement | undefined;
        jest.spyOn(Announcer, "attachAnnouncerToModal").mockImplementation(
            (el) => {
                attachedEl = el;
            },
        );
        jest.spyOn(Announcer, "detachAnnouncerFromModal").mockImplementation(
            (el) => {
                detachedEl = el;
            },
        );
        const {unmount} = render(<TestDialog />);

        // Act
        unmount();

        // Assert
        expect(attachedEl).toBe(detachedEl);
    });

    it("does not call attachAnnouncerToModal when no element is attached to the ref", () => {
        // Arrange
        const attachSpy = jest.spyOn(Announcer, "attachAnnouncerToModal");
        const TestComponent = () => {
            // ariaModalRef is never applied to a DOM node
            useModalAnnouncer();
            return <div role="dialog" aria-modal="true" />;
        };

        // Act
        render(<TestComponent />);

        // Assert
        expect(attachSpy).not.toHaveBeenCalled();
    });

    it("populates a forwarded ref object with the dialog element", () => {
        // Arrange
        const forwardedRef = React.createRef<HTMLDivElement>();

        // Act
        render(<TestDialog ref={forwardedRef} />);

        // Assert
        expect(forwardedRef.current).toBeInstanceOf(HTMLElement);
    });

    it("calls a forwarded ref callback with the dialog element", () => {
        // Arrange
        const refCallback = jest.fn();

        // Act
        render(<TestDialog ref={refCallback} />);

        // Assert
        expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLElement));
    });
});
