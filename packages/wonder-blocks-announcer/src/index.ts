// TODO: publish wonder-blocks-style package WB-1776
// import {srOnly} from "../../wonder-blocks-style/src/styles/a11y";

export type PolitenessLevel = "polite" | "assertive";

const TIMEOUT_DELAY = 5000;
let announcer: Announcer | null = null;

export type SendMessageProps = {
    message: string;
    level?: PolitenessLevel;
    timeoutDelay?: number;
};

export function sendMessage({
    message,
    level = "polite", // TODO: find way to factor in `timer`
    timeoutDelay,
}: SendMessageProps): string {
    if (!announcer) {
        announcer = new Announcer();

        return announcer.announce(message, level, timeoutDelay);
    } else {
        return announcer.announce(message, level, timeoutDelay);
    }
}

export function clearMessages(id?: string) {
    if (id && document?.getElementById(id)) {
        // clear target element
    } else if (document) {
        // clear all elements
    }
}

class Announcer {
    node: HTMLElement | null = null;
    assertiveRegions: HTMLElement | null = null;
    politeRegions: HTMLElement | null = null;

    constructor() {
        if (typeof document !== "undefined") {
            this.node = document.createElement("div");
            this.node.id = `wbAnnouncer`;

            Object.assign(this.node.style, srOnly);

            this.assertiveRegions = this.createElements("assertive");
            this.node.appendChild(this.assertiveRegions);

            this.politeRegions = this.createElements("polite");
            this.node.appendChild(this.politeRegions);

            document.body.prepend(this.node);
        }
    }

    createElements(level: PolitenessLevel) {
        const wrapper = document.createElement("div");
        wrapper.id = `wbAnnounceWrapper-${level}`;

        const region1 = this.createRegion(level, 1);
        const region2 = this.createRegion(level, 2);

        wrapper.appendChild(region1);
        wrapper.appendChild(region2);

        return wrapper;
    }

    createRegion(level: PolitenessLevel, id: number, role = "log") {
        const region = document.createElement("div");
        // TODO: test combinations of attrs
        region.setAttribute("role", role);
        region.setAttribute("aria-live", level);
        region.id = `wbAnnounce-${level}${id}`;
        return region;
    }

    announce(
        message: string,
        level: PolitenessLevel,
        timeoutDelay = TIMEOUT_DELAY,
    ): string {
        if (level === "polite") {
            // do polite things
        } else if (level === "assertive") {
            // do assertive things
        }

        // TODO: return ID of element targeted for announcement
        return "";
    }
}

export default Announcer;

export const srOnly = {
    border: 0,
    clip: "rect(0,0,0,0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: 1,
};
