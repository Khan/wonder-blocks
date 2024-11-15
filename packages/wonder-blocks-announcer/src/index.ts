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
    level = "polite", // TODO: decide whether to allow role=`timer`
    timeoutDelay,
}: SendMessageProps): string {
    announcer = Announcer.getInstance();

    if (typeof jest === "undefined") {
        setTimeout(() => {
            return announcer?.announce(message, level, timeoutDelay);
        }, 100);
    } else {
        // If we are in a test environment, announce without waiting
        return announcer.announce(message, level, timeoutDelay);
    }
    return "";
}

export function clearMessages(id?: string) {
    if (id && document?.getElementById(id)) {
        announcer?.clear(id);
    } else if (document) {
        announcer?.clear();
    }
}

type RegionFactory = {
    count: number;
    aIndex: number;
    pIndex: number;
};

interface RegionSet {
    polite: HTMLElement[];
    assertive: HTMLElement[];
} //deprecate

type RegionList = {[K in keyof RegionSet]: HTMLElement[]}; //deprecate
type RegionDef = {
    id: string;
    levelIndex: number;
    level: PolitenessLevel;
    element: HTMLElement;
};
type RegionDictionary = Map<string, RegionDef>;

/* {
    wbARegion-polite0: {id: 0, level: polite, element: HTMLElement}
    wbARegion-polite1: {id: 1, level: polite, element: HTMLElement}
    wbARegion-assertive0: {id: 0, level: assertive, element: HTMLElement}
    wbARegion-assertive1: {id: 1, level: assertive, element: HTMLElement}
}
{
    assertive: [element0, element1]
    polite: [element0, element1]
} */
class Announcer {
    private static _instance: Announcer;
    node: HTMLElement | null = null;
    regionFactory: RegionFactory = {
        count: 2,
        aIndex: 0,
        pIndex: 0,
    };
    regionList: RegionList = {polite: [], assertive: []};
    dictionary: RegionDictionary = new Map();

    private constructor() {
        if (typeof document !== "undefined") {
            const topLevelId = `wbAnnounce`;

            // Prevent duplicates in HMR
            const announcerCheck = document.getElementById(topLevelId);
            if (announcerCheck === null) {
                this.init(topLevelId);
            }
        }
    }

    static getInstance() {
        if (!Announcer._instance) {
            Announcer._instance = new Announcer();
        }

        Announcer._instance.rebootForHMR();
        return Announcer._instance;
    }

    init(id: string) {
        this.node = document.createElement("div");
        this.node.id = id;
        this.node.setAttribute("data-testid", `wbAnnounce`);

        Object.assign(this.node.style, srOnly);

        const aWrapper = this.createRegionWrapper("assertive");
        this.createDuplicateRegions(aWrapper, "assertive");
        this.node?.appendChild(aWrapper);

        const pWrapper = this.createRegionWrapper("polite");
        this.createDuplicateRegions(pWrapper, "polite");
        this.node.appendChild(pWrapper);

        document.body.prepend(this.node);
    }

    rebootForHMR() {
        // Recover in the event regions get lost
        // This happens in Storybook when saving a file:
        // Announcer exists, but it loses the connection to element Refs
        const announcerCheck = document.getElementById(`wbAnnounce`);
        if (announcerCheck !== null) {
            this.node = announcerCheck;
            const regions = Array.from(
                announcerCheck.querySelectorAll<HTMLElement>(
                    "[id^='wbARegion'",
                ),
            );
            regions.forEach((region) => {
                this.dictionary.set(region.id, {
                    id: region.id,
                    levelIndex: parseInt(
                        region.id.charAt(region.id.length - 1),
                    ),
                    level: region.getAttribute("aria-live") as PolitenessLevel,
                    element: region,
                });
            });
        }
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

    createRegion(level: PolitenessLevel, index: number, role = "log") {
        const region = document.createElement("div");
        // TODO: test combinations of attrs
        region.setAttribute("role", role);
        region.setAttribute("aria-live", level);
        region.classList.add("wbARegion");
        const id = `wbARegion-${level}${index}`;
        region.id = id;
        region.setAttribute("data-testid", id);
        this.dictionary.set(id, {
            id,
            levelIndex: index,
            level,
            element: region,
        });
        return region;
    }

    announce(
        message: string,
        level: PolitenessLevel,
        timeoutDelay?: number,
    ): string {
        if (!this.node) {
            return "";
        }

        // Filter region elements to the selected level
        const regions: RegionDef[] = [...this.dictionary.values()].filter(
            (entry: RegionDef) => entry.level === level,
        );

        const newIndex = this.appendMessage(
            message,
            level,
            regions,
            timeoutDelay,
        );

        // overwrite central index for the given level
        if (level === "assertive") {
            this.regionFactory.aIndex = newIndex;
        } else {
            this.regionFactory.pIndex = newIndex;
        }

        return regions[newIndex].id || "";
    }

    appendMessage(
        message: string,
        level: PolitenessLevel, // level
        regionList: RegionDef[], // list of relevant elements
        timeoutDelay: number = TIMEOUT_DELAY,
    ): number {
        // Starting index for a given level
        let index =
            level === "assertive"
                ? this.regionFactory.aIndex
                : this.regionFactory.pIndex;

        // empty region at the previous index
        regionList[index].element.replaceChildren();

        // overwrite index passed in to update locally
        index = this.alternateIndex(index);

        // create element for new message
        const messageEl = document.createElement("p");
        messageEl.textContent = message;

        // append message to new index
        regionList[index].element.appendChild(messageEl);

        setTimeout(() => {
            messageEl.remove();
        }, timeoutDelay);

        return index;
    }

    alternateIndex(index: number): number {
        index += 1;
        index = index % this.regionFactory.count;
        return index;
    }

    clear(id?: string) {
        if (!this.node) {
            return;
        }
        if (id) {
            this.dictionary.get(id)?.element.replaceChildren();
        } else {
            this.dictionary.forEach((region) => {
                region.element.replaceChildren();
            });
        }
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
