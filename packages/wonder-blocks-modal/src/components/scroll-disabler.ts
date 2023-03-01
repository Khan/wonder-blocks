/**
 * A UI-less component that lets `ModalLauncher` disable page scroll.
 *
 * The positioning of the modal requires some global page state changed
 * unfortunately, and this handles that in an encapsulated way.
 *
 * NOTE(mdr): This component was copied from webapp. Be wary of sync issues. It
 *     also doesn't have unit tests, and we haven't added any, since it's a
 *     relatively stable component that has now been stress-tested lots in prod.
 */

import * as React from "react";

const needsHackyMobileSafariScrollDisabler = (() => {
    if (typeof window === "undefined") {
        return false;
    }

    const userAgent = window.navigator.userAgent;
    return userAgent.indexOf("iPad") > -1 || userAgent.indexOf("iPhone") > -1;
})();

type Props = Record<any, any>;

class ScrollDisabler extends React.Component<Props> {
    static oldOverflow: string;
    static oldPosition: string;
    static oldScrollY: number;
    static oldWidth: string;
    static oldTop: string;

    componentDidMount() {
        if (ScrollDisabler.numModalsOpened === 0) {
            const body = document.body;
            if (!body) {
                throw new Error("couldn't find document.body");
            }

            // Prevent scrolling of the background, the first time a modal is
            // opened.
            ScrollDisabler.oldOverflow = body.style.overflow;
            ScrollDisabler.oldScrollY = window.scrollY;

            // We need to grab all of the original style properties before we
            // modified any of them.
            if (needsHackyMobileSafariScrollDisabler) {
                ScrollDisabler.oldPosition = body.style.position;
                ScrollDisabler.oldWidth = body.style.width;
                ScrollDisabler.oldTop = body.style.top;
            }

            body.style.overflow = "hidden";

            // On mobile Safari, overflow: hidden is not enough, position:
            // fixed is also required.  Setting style.top = -scollTop maintains
            // the scroll position (without which we'd scroll to the top).
            if (needsHackyMobileSafariScrollDisabler) {
                body.style.position = "fixed";
                body.style.width = "100%";
                body.style.top = `${-ScrollDisabler.oldScrollY}px`;
            }
        }
        ScrollDisabler.numModalsOpened++;
    }

    componentWillUnmount() {
        ScrollDisabler.numModalsOpened--;
        if (ScrollDisabler.numModalsOpened === 0) {
            const body = document.body;
            if (!body) {
                throw new Error("couldn't find document.body");
            }

            // Reset all values on the closing of the final modal.
            body.style.overflow = ScrollDisabler.oldOverflow;
            if (needsHackyMobileSafariScrollDisabler) {
                body.style.position = ScrollDisabler.oldPosition;
                body.style.width = ScrollDisabler.oldWidth;
                body.style.top = ScrollDisabler.oldTop;
            }

            if (typeof window !== "undefined" && window.scrollTo) {
                window.scrollTo(0, ScrollDisabler.oldScrollY);
            }
        }
    }

    static numModalsOpened: number = 0;

    render(): React.ReactElement | null {
        return null;
    }
}

export default ScrollDisabler;
