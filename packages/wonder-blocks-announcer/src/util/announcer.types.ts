/*
PolitenessLevel: The two options for ARIA Live Regions:
- polite, which will wait for other announcements to finish
- assertive, which will interrupt other messages
*/
export type PolitenessLevel = "polite" | "assertive";

export type LayerContext = "modal" | "document";

/*
LayerFactory: A config for creating duplicate region elements for a specific layer.
- Count is the total number for each level.
- aIndex references the index of the last-used assertive log element.
- pIndex references the index of the last-used polite log element.
*/
export type LayerFactory = {
    count: number;
    aIndex: number;
    pIndex: number;
};

/*
RegionFactory: A config for creating duplicate region elements across layers.
Maps each layer context to its own factory configuration.
*/
export type RegionFactory = Map<LayerContext, LayerFactory>;

/*
RegionDef: A type for Announcer dictionary entries for fast lookup.
- id: the IDREF for a live region element.
- level: the politeness level (polite or assertive)
- levelIndex: the index of the region at a particular level
- element: an element reference for a live region.
- layerId: string for modal or document context
*/
export type RegionDef = {
    id: string;
    level: PolitenessLevel;
    levelIndex: number;
    element: HTMLElement;
    layerId: LayerContext;
};

/*
RegionDictionary: a Map data structure of live regions for fast lookup.
*/
export type RegionDictionary = Map<string, RegionDef>;
