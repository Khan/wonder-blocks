import{M as d}from"./index-35e12253.js";import{a as n,j as r,F as o}from"./jsx-runtime-309e447d.js";import{u as c}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function a(t){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a",h2:"h2",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},c(),t.components);return r(o,{children:[n(d,{title:"Data / Types / ScopedCache",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"scopedcache",children:"ScopedCache"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`interface ScopedCache {
    set(scope: string, id: string, value: ValidCacheData): void;

    /**
     * Retrieve a value from the cache.
     */
    get(scope: string, id: string): ?ValidCacheData;

    /**
     * Purge an item from the cache.
     */
    purge(scope: string, id: string): void;

    /**
     * Purge a scope of items that match the given predicate.
     *
     * If the predicate is omitted, then all items in the scope are purged.
     */
    purgeScope(
        scope: string,
        predicate?: (id: string, value: ValidCacheData) => boolean,
    ): void;

    /**
     * Purge all items from the cache that match the given predicate.
     *
     * If the predicate is omitted, then all items in the cache are purged.
     */
    purgeAll(
        predicate?: (
            scope: string,
            id: string,
            value: ValidCacheData,
        ) => boolean,
    ): void;
}
`})}),`
`,r(e.p,{children:["This interface defines how to interact with a scoped cache, such as ",n(e.a,{href:"/docs/data-exports-scopedinmemorycache--page",children:n(e.code,{children:"ScopedInMemoryCache"})}),"."]}),`
`,n(e.h2,{id:"set",children:"set()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`set(
    scope: string,
    id: string,
    value: TValue,
): void;
`})}),`
`,n(e.p,{children:"Sets a value in the cache within a given scope."}),`
`,n(e.h3,{id:"throws",children:"Throws"}),`
`,r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{align:"none",children:"Error Type"}),n(e.th,{align:"none",children:"Error Name"}),n(e.th,{align:"none",children:"Reason"})]})}),r(e.tbody,{children:[r(e.tr,{children:[n(e.td,{align:"none",children:n(e.a,{href:"/docs/data-exports-dataerror--page",children:n(e.code,{children:"DataError"})})}),n(e.td,{align:"none",children:n(e.code,{children:"InvalidInputDataError"})}),r(e.td,{align:"none",children:[n(e.code,{children:"id"})," and ",n(e.code,{children:"scope"})," must be non-empty strings"]})]}),r(e.tr,{children:[n(e.td,{align:"none",children:n(e.a,{href:"/docs/data-exports-dataerror--page",children:n(e.code,{children:"DataError"})})}),n(e.td,{align:"none",children:n(e.code,{children:"InvalidInputDataError"})}),r(e.td,{align:"none",children:[n(e.code,{children:"value"})," must be a non-function value"]})]})]})]}),`
`,n(e.h2,{id:"get",children:"get()"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`get(scope: string, id: string): ?ValidCacheData;
`})}),`
`,r(e.p,{children:["Gets a value from the cache. If a value with the given identifier (",n(e.code,{children:"id"}),") is not found within the given scope (",n(e.code,{children:"scope"}),") of the cache, ",n(e.code,{children:"null"})," is returned."]}),`
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
`,r(e.p,{children:["Purges all items from the cache. If a predicate is provided, only items for which the predicate returns ",n(e.code,{children:"true"})," will be purged; otherwise, the entire cache will be purged."]})]})}function h(t={}){const{wrapper:e}=Object.assign({},c(),t.components);return e?n(e,{...t,children:n(a,{...t})}):a(t)}const s=()=>{throw new Error("Docs-only story")};s.parameters={docsOnly:!0};const i={title:"Data / Types / ScopedCache",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:h};const E=["__page"];export{E as __namedExportsOrder,s as __page,i as default};
//# sourceMappingURL=types.scoped-cache.stories-2f0bd0e3.js.map
