import{M as h}from"./index-35e12253.js";import{a as t,j as r,F as i}from"./jsx-runtime-309e447d.js";import{u as c}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function a(n){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",ul:"ul",li:"li"},c(),n.components);return r(i,{children:[t(h,{title:"Data / Types / FetchPolicy",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"fetchpolicy",children:"FetchPolicy"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`export enum FetchPolicy {
    /**
     * If the data is in the cache, return that; otherwise, fetch from the server.
     */
    CacheBeforeNetwork,

    /**
     * If the data is in the cache, return that; always fetch from the server
     * regardless of cache.
     */
    CacheAndNetwork,

    /**
     * If the data is in the cache, return that; otherwise, do nothing.
     */
    CacheOnly,

    /**
     * Ignore any existing cached result; fetch from the server.
     */
    NetworkOnly,
}
`})}),`
`,r(e.p,{children:["The ",t(e.code,{children:"FetchPolicy"})," type is used with our request framework to define how a request should be fulfilled with respect to the cache and the network."]}),`
`,r(e.ul,{children:[`
`,r(e.li,{children:[t(e.code,{children:"CacheBeforeNetwork"}),": If the data is in the cache, return that; otherwise, fetch from the server."]}),`
`,r(e.li,{children:[t(e.code,{children:"CacheAndNetwork"}),": If the data is in the cache, return that; always fetch from the server regardless of cache."]}),`
`,r(e.li,{children:[t(e.code,{children:"CacheOnly"}),": If the data is in the cache, return that; otherwise, do nothing."]}),`
`,r(e.li,{children:[t(e.code,{children:"NetworkOnly"}),": Ignore any existing cached result; always fetch from the server."]}),`
`]})]})}function s(n={}){const{wrapper:e}=Object.assign({},c(),n.components);return e?t(e,{...n,children:t(a,{...n})}):a(n)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const o={title:"Data / Types / FetchPolicy",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:s};const N=["__page"];export{N as __namedExportsOrder,l as __page,o as default};
//# sourceMappingURL=types.fetch-policy.stories-97aa9748.js.map
