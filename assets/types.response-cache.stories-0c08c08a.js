import{M as c}from"./index-35e12253.js";import{a as r,j as n,F as i}from"./jsx-runtime-309e447d.js";import{u as o}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function s(t){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},o(),t.components);return n(i,{children:[r(c,{title:"Data / Types / ResponseCache",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,r(e.h1,{id:"responsecache",children:"ResponseCache"}),`
`,r(e.pre,{children:r(e.code,{className:"language-ts",children:`type ResponseCache = {
    [key: string]: CachedResponse<any>,
    ...
};
`})}),`
`,n(e.p,{children:[r(e.code,{children:"ResponseCache"})," describes the serialized cache that is used to hydrate responses. An example of a valid ",r(e.code,{children:"ResponseCache"})," instance is shown below. Generally, you would not generate this object directly, but rather use the returned data from ",r(e.a,{href:"/docs/data-exports-fetchtrackedrequests--page",children:r(e.code,{children:"fetchTrackedRequests"})}),"."]}),`
`,r(e.pre,{children:r(e.code,{className:"language-ts",children:`const responseCache: ResponseCache = {
    DATA_ID_1: {error: "It go 💥boom 😢"},
    DATA_ID_2: {data: ["array", "of", "data"]},
    DATA_ID_3: {data: {some: "data"}},
};
`})}),`
`,r(e.p,{children:"In this example, the cache contains data retrieved for three different requests."}),`
`,n(e.p,{children:["Each entry in the cache is of type ",r(e.a,{href:"/docs/data-types-cachedresponse--page",children:r(e.code,{children:"CachedResponse"})}),". See the section on ",r(e.a,{href:"/docs/data-server-side-rendering-and-hydration--page",children:"server-side rendering"})," for more information."]})]})}function d(t={}){const{wrapper:e}=Object.assign({},o(),t.components);return e?r(e,{...t,children:r(s,{...t})}):s(t)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const a={title:"Data / Types / ResponseCache",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:d};const w=["__page"];export{w as __namedExportsOrder,p as __page,a as default};
//# sourceMappingURL=types.response-cache.stories-0c08c08a.js.map
