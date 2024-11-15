// TODO: publish wonder-blocks-style package WB-1776
// import {srOnly} from "../../wonder-blocks-style/src/styles/a11y";

export type PolitenessLevel = "polite" | "assertive";

type RegionFactory = {
    count: number;
    aIndex: number;
    pIndex: number;
};

const TIMEOUT_DELAY = 5000;
let announcer: Announcer | null = null;

export type SendMessageProps = {
    message: string;
    level?: PolitenessLevel;
    timeoutDelay?: number;
};

export function sendMessage({
    message,
    level = "polite", // TODO: decide whether to allow role=`timer`
    timeoutDelay,
}: SendMessageProps): string | void {
    announcer = Announcer.getInstance();

    if (typeof jest === "undefined") {
        setTimeout(() => {
            return announcer?.announce(message, level, timeoutDelay);
        }, 100);
    } else {
        // If we are in a test environment, announce without waiting
        return announcer.announce(message, level, timeoutDelay);
    }
}

export function clearMessages(id?: string) {
    if (id && document?.getElementById(id)) {
        // announcer?.clear(id);
    } else if (document) {
        // announcer?.clear();
    }
}

class Announcer {
    private static _instance: Announcer;
    node: HTMLElement | null = null;
    assertiveRegions: HTMLElement[] | null = null;
    politeRegions: HTMLElement[] | null = null;
    regionFactory: RegionFactory = {
        count: 2,
        aIndex: 0,
        pIndex: 0,
    };
    delayNum: number = TIMEOUT_DELAY;

    private constructor() {
        if (typeof document !== "undefined") {
            const topLevelId = `wbAnnounce`;

            // Prevent duplicates in HMR
            const announcerCheck = document.getElementById(topLevelId);
            console.log(announcerCheck);
            if (announcerCheck === null) {
                this.init(topLevelId);
            }
        }
    }

    rebootForHMR() {
        // Recover in the event regions get lost
        // This happens in Storybook when saving a file:
        // Announcer exists, but it loses the connection to element Refs
        const announcerCheck = document.getElementById(`wbAnnounce`);
        if (announcerCheck !== null) {
            this.node = announcerCheck;
            const pRegions = Array.from(
                announcerCheck.querySelectorAll<HTMLElement>(
                    "[id^='wbARegion-polite'",
                ),
            );
            if (pRegions.length) {
                this.politeRegions = pRegions;
            }
            const aRegions = Array.from(
                announcerCheck.querySelectorAll<HTMLElement>(
                    "[id^='wbARegion-assertive'",
                ),
            );
            if (aRegions.length) {
                this.assertiveRegions = aRegions;
            }
        }
    }

    static getInstance() {
        if (!Announcer._instance) {
            Announcer._instance = new Announcer();
            console.log(Announcer._instance);
        }

        Announcer._instance.rebootForHMR();
        return Announcer._instance;
    }

    init(id: string) {
        this.node = document.createElement("div");
        this.node.id = id;

        // Object.assign(this.node.style, srOnly);

        const aWrapper = this.createRegionWrapper("assertive");
        this.assertiveRegions = this.createDuplicateRegions(
            aWrapper,
            "assertive",
        );
        this.node?.appendChild(aWrapper);

        const pWrapper = this.createRegionWrapper("polite");
        this.politeRegions = this.createDuplicateRegions(pWrapper, "polite");
        this.node.appendChild(pWrapper);

        document.body.prepend(this.node);
    }

    isAttached() {
        return this.node?.isConnected;
    }

    createRegionWrapper(level: PolitenessLevel) {
        const wrapper = document.createElement("div");
        wrapper.id = `wbAWrap-${level}`;
        return wrapper;
    }

    createDuplicateRegions(
        wrapper: HTMLElement,
        level: PolitenessLevel,
    ): HTMLElement[] {
        const result = new Array(this.regionFactory.count)
            .fill(0)
            .map((el, i) => {
                const region = this.createRegion(level, i);
                wrapper.appendChild(region);
                return region;
            });
        return result;
    }

    createRegion(level: PolitenessLevel, id: number, role = "log") {
        const region = document.createElement("div");
        // TODO: test combinations of attrs
        region.setAttribute("role", role);
        region.setAttribute("aria-live", level);
        region.classList.add("wbARegion");
        region.id = `wbARegion-${level}${id}`;
        return region;
    }

    announce(
        message: string,
        level: PolitenessLevel,
        timeoutDelay = TIMEOUT_DELAY,
    ): string | void {
        if (!this.node) {
            return;
        }

        if (timeoutDelay) {
            this.delayNum = timeoutDelay;
        }
        let targetedId = "";

        if (level === "polite" && this.politeRegions) {
            const index = this.appendMessage(
                message,
                this.politeRegions,
                this.regionFactory.pIndex,
            );
            this.regionFactory.pIndex = index;
            // console.log(
            //     "code:",
            //     this.politeRegions[this.regionFactory.pIndex].textContent,
            // );
            targetedId = this.politeRegions[this.regionFactory.pIndex].id || "";
        } else if (level === "assertive" && this.assertiveRegions) {
            const index = this.appendMessage(
                message,
                this.assertiveRegions,
                this.regionFactory.aIndex,
            );
            this.regionFactory.aIndex = index;
            targetedId =
                this.assertiveRegions[this.regionFactory.aIndex].id || "";
        }
        return targetedId;
    }

    appendMessage(
        message: string,
        targetRegions: HTMLElement[],
        index: number,
    ): number {
        // empty region at the previous index
        targetRegions[index].replaceChildren();

        // overwrite index passed in to update locally
        index = this.alternateIndex(index);

        // create element for new message
        const messageEl = document.createElement("p");
        messageEl.textContent = message;

        // append message to new index
        targetRegions[index].appendChild(messageEl);

        setTimeout(() => {
            messageEl.remove();
        }, this.delayNum);

        return index;
    }

    alternateIndex(index: number): number {
        index += 1;
        index = index % this.regionFactory.count;
        return index;
    }

    clear(targetRegions?: HTMLElement[] | null, index?: number) {
        if (!this.node) {
            return;
        }

        // if (index && targetRegions) {
        //     targetRegions[index].replaceChildren();
        // } else {
        // }
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
