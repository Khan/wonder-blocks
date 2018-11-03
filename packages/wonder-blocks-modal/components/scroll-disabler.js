// @flow
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

import {Component} from "react";

import needsHackyMobileSafariScrollDisabler from "../util/needs-hacky-mobile-safari-scroll-disabler.js";

class ScrollDisabler extends Component<{}> {
    static numModalsOpened = 0;
    static oldOverflow: string;
    static oldPosition: string;
    static oldScrollY: number;
    static oldWidth: string;
    static oldTop: string;

    componentWillMount() {
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
            window.scrollTo(0, ScrollDisabler.oldScrollY);
        }
    }

    render() {
        return null;
    }
}

export default ScrollDisabler;
