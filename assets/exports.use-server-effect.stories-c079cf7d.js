import{M as d}from"./index-35e12253.js";import{a as t,j as r,F as c}from"./jsx-runtime-309e447d.js";import{u as o}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function a(n){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h2:"h2",a:"a"},o(),n.components);return r(c,{children:[t(d,{title:"Data / Exports / useServerEffect()",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"useservereffect",children:"useServerEffect()"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`function useServerEffect<TData: ValidCacheData>(
    requestId: string,
    handler: () => Promise<TData>,
    options?: ServerEffectOptions,
): ?Result<TData>;
`})}),`
`,r(e.p,{children:["The ",t(e.code,{children:"useServerEffect"})," hook is an integral part of server-side rendering. It has different behavior depending on whether it is running on the server (and in what context) or the client."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type ServerEffectOptions = {|
    skip?: boolean,
    hydrate?: boolean,
|};
`})}),`
`,r(e.table,{children:[t(e.thead,{children:r(e.tr,{children:[t(e.th,{align:"none",children:"Option"}),t(e.th,{align:"none",children:"Default"}),t(e.th,{align:"none",children:"Description"})]})}),r(e.tbody,{children:[r(e.tr,{children:[t(e.td,{align:"none",children:t(e.code,{children:"hydrate"})}),t(e.td,{align:"none",children:t(e.code,{children:"true"})}),r(e.td,{align:"none",children:["When ",t(e.code,{children:"true"}),", the result of the effect when fulfilled using Wonder Blocks Data will be stored in the hydration cache for hydrating client-side; otherwise, the result will be stored in the server-side-only cache."]})]}),r(e.tr,{children:[t(e.td,{align:"none",children:t(e.code,{children:"skip"})}),t(e.td,{align:"none",children:t(e.code,{children:"false"})}),r(e.td,{align:"none",children:["When ",t(e.code,{children:"true"}),", the effect will not be tracked for fulfillment; otherwise, the effect will be tracked for fulfillment."]})]})]})]}),`
`,t(e.h2,{id:"server-side-behavior",children:"Server-side behavior"}),`
`,t(e.p,{children:"First, this hook checks the server-side rendering cache for the request identifier; if it finds a cached value, it will return that."}),`
`,r(e.p,{children:['If there is no cached value, it will return a "loading" state. In addition, if the current rendering component has a ',t(e.a,{href:"/docs/data-exports-trackdata--page",children:t(e.code,{children:"TrackData"})})," ancestor, ",t(e.code,{children:"useServerEffect"})," will register the request for fulfillment."]}),`
`,r(e.p,{children:["This then allows that pending request to be fulfilled with ",t(e.a,{href:"/docs/data-exports-fetchtrackddatarequests--page",children:t(e.code,{children:"fetchTrackedRequests"})}),', the response to be placed into the cache, and the render to be reexecuted, at which point, this hook will be able to provide that result instead of "loading.']}),`
`,r(e.p,{children:["More details about server-side rendering with Wonder Blocks Data can be found in the ",t(e.a,{href:"/docs/data-server-side-rendering-and-hydration--page",children:"relevant overview section"}),"."]}),`
`,t(e.h2,{id:"client-side-behavior",children:"Client-side behavior"}),`
`,t(e.p,{children:"On initial render in the client, this hook will look for a corresponding value in the Wonder Blocks Data hydration cache. If there is one, it will delete it from the hydration cache and return that value."}),`
`,r(e.p,{children:["Otherwise, it will return ",t(e.code,{children:"null"}),"."]})]})}function h(n={}){const{wrapper:e}=Object.assign({},o(),n.components);return e?t(e,{...n,children:t(a,{...n})}):a(n)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const i={title:"Data / Exports / useServerEffect()",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:h};const O=["__page"];export{O as __namedExportsOrder,l as __page,i as default};
//# sourceMappingURL=exports.use-server-effect.stories-c079cf7d.js.map
