/**
 * A UI-less component that lets `ModalLauncher` disable page scroll.
 *
 * The positioning of the modal requires some global page state changed
 * unfortunately, and this handles that in an encapsulated way.
 *
 * NOTE(mdr): This component was copied from webapp. Be wary of sync issues. It
 *     also doesn't have many unit tests, since it's a
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

let numModalsOpened = 0;
let oldOverflow: string;
let oldPosition: string;
let oldScrollY: number;
let oldWidth: string;
let oldTop: string;

const ScrollDisabler = (_props: Props): null => {
    React.useEffect(() => {
        if (numModalsOpened === 0) {
            const body = document.body;
            if (!body) {
                throw new Error("couldn't find document.body");
            }

            // Prevent scrolling of the background, the first time a modal is
            // opened.
            oldOverflow = body.style.overflow;
            oldScrollY = window.scrollY;

            // We need to grab all of the original style properties before we
            // modified any of them.
            if (needsHackyMobileSafariScrollDisabler) {
                oldPosition = body.style.position;
                oldWidth = body.style.width;
                oldTop = body.style.top;
            }

            body.style.overflow = "hidden";

            // On mobile Safari, overflow: hidden is not enough, position:
            // fixed is also required.  Setting style.top = -scollTop maintains
            // the scroll position (without which we'd scroll to the top).
            if (needsHackyMobileSafariScrollDisabler) {
                body.style.position = "fixed";
                body.style.width = "100%";
                body.style.top = `${-oldScrollY}px`;
            }
        }
        numModalsOpened++;

        return () => {
            numModalsOpened--;
            if (numModalsOpened === 0) {
                const body = document.body;
                if (!body) {
                    throw new Error("couldn't find document.body");
                }

                // Reset all values on the closing of the final modal.
                body.style.overflow = oldOverflow;
                if (needsHackyMobileSafariScrollDisabler) {
                    body.style.position = oldPosition;
                    body.style.width = oldWidth;
                    body.style.top = oldTop;
                }

                if (typeof window !== "undefined" && window.scrollTo) {
                    window.scrollTo(0, oldScrollY);
                }
            }
        };
    }, []); // Empty dependency array since we don't use any props

    return null;
};

export default ScrollDisabler;
