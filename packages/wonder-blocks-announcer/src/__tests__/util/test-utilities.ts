import type {
    RegionDef,
    PolitenessLevel,
    LayerContext,
} from "../../util/announcer.types";

export function createTestRegionList(
    level: PolitenessLevel,
    element1: HTMLElement,
    element2: HTMLElement,
    layerId: LayerContext,
): RegionDef[] {
    return [
        {
            id: `wbARegion-${level}0`,
            level: level,
            levelIndex: 0,
            element: element1,
            layerId: "document",
        },
        {
            id: `wbARegion-${level}1`,
            level: level,
            levelIndex: 1,
            element: element2,
            layerId: layerId,
        },
    ];
}

export function createTestElements() {
    const testElement1 = document.createElement("div");
    testElement1.setAttribute("data-testid", "test-element1");
    const testElement2 = document.createElement("div");
    testElement2.setAttribute("data-testid", "test-element2");
    document.body.appendChild(testElement1);
    document.body.appendChild(testElement2);

    return {testElement1, testElement2};
}

export function resetTestElements(
    testElement1: HTMLElement | null,
    testElement2: HTMLElement | null,
) {
    if (testElement1 !== null) {
        document.body.removeChild(testElement1);
    }
    if (testElement2 !== null) {
        document.body.removeChild(testElement2);
    }
}
