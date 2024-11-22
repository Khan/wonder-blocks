/*
PolitenessLevel: The two options for ARIA Live Regions:
- polite, which will wait for other announcements to finish
- assertive, which will interrupt other messages
*/
export type PolitenessLevel = "polite" | "assertive";

/*
RegionFactory: A config for creating duplicate region elements.
- Count is the total number for each level.
- aIndex references the index of the last-used assertive log element.
- pIndex references the index of the last-used polite log element.
*/
export type RegionFactory = {
    count: number;
    aIndex: number;
    pIndex: number;
};

/*
RegionDef: A type for Announcer dictionary entries for fast lookup.
- id: the IDREF for a live region element.
- level: the politeness level (polite or assertive)
- levelIndex: the index of the region at a particular level
- element: an element reference for a live region.
*/
export type RegionDef = {
    id: string;
    level: PolitenessLevel;
    levelIndex: number;
    element: HTMLElement;
};

/*
RegionDictionary: a Map data structure of live regions for fast lookup.
*/
export type RegionDictionary = Map<string, RegionDef>;
