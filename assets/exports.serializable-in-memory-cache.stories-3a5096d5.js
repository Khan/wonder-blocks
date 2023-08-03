import{M as d}from"./index-35e12253.js";import{a as n,j as r,F as o}from"./jsx-runtime-309e447d.js";import{u as t}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function c(i){const e=Object.assign({h1:"h1",p:"p",a:"a",code:"code",h2:"h2",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},t(),i.components);return r(o,{children:[n(d,{title:"Data / Exports / SerializableInMemoryCache",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"serializableinmemorycache",children:"SerializableInMemoryCache"}),`
`,r(e.p,{children:["This class is a specialization of ",n(e.a,{href:"/docs/data-exports-scopedinmemorycache--page",children:n(e.code,{children:"ScopedInMemoryCache"})}),". This specialization requires that values added can be serialized to and from strings."]}),`
`,n(e.h2,{id:"constructor",children:"constructor()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`new SerializableInMemoryCache(initialCache?: RawScopedCache)
`})}),`
`,r(e.p,{children:["Creates a new instance. The ",n(e.code,{children:"initialCache"}),", if provided, will be cloned and used as the initial state of the cache."]}),`
`,n(e.h3,{id:"throws",children:"Throws"}),`
`,r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{align:"none",children:"Error Type"}),n(e.th,{align:"none",children:"Error Name"}),n(e.th,{align:"none",children:"Reason"})]})}),n(e.tbody,{children:r(e.tr,{children:[n(e.td,{align:"none",children:n(e.a,{href:"/docs/data-exports-dataerror--page",children:n(e.code,{children:"DataError"})})}),n(e.td,{align:"none",children:n(e.code,{children:"InvalidInputDataError"})}),n(e.td,{align:"none",children:"Could not clone the initial cache."})]})})]}),`
`,n(e.h2,{id:"inuse",children:"inUse"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`if (cache.inUse) {
    // Cache is in use
}
`})}),`
`,r(e.p,{children:["Is ",n(e.code,{children:"true"})," if the cache contains any data; otherwise, ",n(e.code,{children:"false"}),"."]}),`
`,n(e.h2,{id:"set",children:"set()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`set<TValue: ValidCacheData>(
    scope: string,
    id: string,
    value: TValue,
): void;
`})}),`
`,n(e.p,{children:"Sets a value in the cache within a given scope. The value is cloned and the clone is frozen before being added to the cache."}),`
`,n(e.h3,{id:"throws-1",children:"Throws"}),`
`,r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{align:"none",children:"Error Type"}),n(e.th,{align:"none",children:"Error Name"}),n(e.th,{align:"none",children:"Reason"})]})}),r(e.tbody,{children:[r(e.tr,{children:[n(e.td,{align:"none",children:n(e.a,{href:"/docs/data-exports-dataerror--page",children:n(e.code,{children:"DataError"})})}),n(e.td,{align:"none",children:n(e.code,{children:"InvalidInputDataError"})}),r(e.td,{align:"none",children:[n(e.code,{children:"id"})," and ",n(e.code,{children:"scope"})," must be non-empty strings"]})]}),r(e.tr,{children:[n(e.td,{align:"none",children:n(e.a,{href:"/docs/data-exports-dataerror--page",children:n(e.code,{children:"DataError"})})}),n(e.td,{align:"none",children:n(e.code,{children:"InvalidInputDataError"})}),r(e.td,{align:"none",children:[n(e.code,{children:"value"})," must be a non-function value"]})]})]})]}),`
`,n(e.h2,{id:"get",children:"get()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`get(scope: string, id: string): ?ValidCacheData;
`})}),`
`,r(e.p,{children:["Gets a value from the cache. If a value with the given identifier (",n(e.code,{children:"id"}),") is not found within the given scope (",n(e.code,{children:"scope"}),") of the cache, ",n(e.code,{children:"null"})," is returned."]}),`
`,n(e.h2,{id:"clone",children:"clone()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`clone(): RawScopedCache;
`})}),`
`,n(e.p,{children:"Returns a clone of the current cache."}),`
`,n(e.h3,{id:"throws-2",children:"Throws"}),`
`,r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{align:"none",children:"Error Type"}),n(e.th,{align:"none",children:"Error Name"}),n(e.th,{align:"none",children:"Reason"})]})}),n(e.tbody,{children:r(e.tr,{children:[n(e.td,{align:"none",children:n(e.a,{href:"/docs/data-exports-dataerror--page",children:n(e.code,{children:"DataError"})})}),n(e.td,{align:"none",children:n(e.code,{children:"InternalDataError"})}),n(e.td,{align:"none",children:"Could not clone the cache."})]})})]}),`
`,n(e.h2,{id:"purge",children:"purge()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`purge(scope: string, id: string): void;
`})}),`
`,r(e.p,{children:["Purges the value from the cache. If a value with the given identifier (",n(e.code,{children:"id"}),") is not found within the given scope (",n(e.code,{children:"scope"}),") of the cache, nothing happens."]}),`
`,n(e.h2,{id:"purgescope",children:"purgeScope()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`purgeScope(
    scope: string,
    predicate?: (id: string, value: ValidCacheData) => boolean,
): void;
`})}),`
`,r(e.p,{children:["Purges items within a given scope (",n(e.code,{children:"scope"}),") of the cache from that scope. If a predicate is provided, only items for which the predicate returns ",n(e.code,{children:"true"})," will be purged; otherwise, the entire scope will be purged."]}),`
`,n(e.h2,{id:"purgeall",children:"purgeAll()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`purgeAll(
    predicate?: (
        scope: string,
        id: string,
        value: ValidCacheData,
    ) => boolean,
): void;
`})}),`
`,r(e.p,{children:["Purges all items from the cache. If a predicate is provided, only items for which the predicate returns ",n(e.code,{children:"true"})," will be purged; otherwise, the entire cache will be purged."]})]})}function h(i={}){const{wrapper:e}=Object.assign({},t(),i.components);return e?n(e,{...i,children:n(c,{...i})}):c(i)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const a={title:"Data / Exports / SerializableInMemoryCache",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:h};const M=["__page"];export{M as __namedExportsOrder,l as __page,a as default};
//# sourceMappingURL=exports.serializable-in-memory-cache.stories-3a5096d5.js.map
