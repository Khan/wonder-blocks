export type PolitenessLevel = "polite" | "assertive";

export type RegionFactory = {
    count: number;
    aIndex: number;
    pIndex: number;
};

export type RegionDef = {
    id: string;
    levelIndex: number;
    level: PolitenessLevel;
    element: HTMLElement;
};

export type RegionDictionary = Map<string, RegionDef>;
