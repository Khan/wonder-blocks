import{M as p}from"./index-35e12253.js";import{a as t,j as s,F as i}from"./jsx-runtime-309e447d.js";import{u as o}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function n(a){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},o(),a.components);return s(i,{children:[t(p,{title:"Testing / Test Harness / Types / TestHarnessAdapters",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"testharnessadapters",children:"TestHarnessAdapters"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type TestHarnessAdapters = {|
    [adapterID: string]: TestHarnessAdapter<any>,
|};
`})}),`
`,t(e.p,{children:"Defines a generic collection of test harness adapters."}),`
`,s(e.p,{children:["Only use ",t(e.code,{children:"TestHarnessAdapters"})," in input locations to verify a set of adapters conforms to that type, but avoid using it in output locations as it can erase useful type information."]}),`
`,s(e.p,{children:["For example, the ",t(e.a,{href:"/docs/testing-test-harness-exports-harnessadapters--page",children:t(e.code,{children:"harnessAdapters.DefaultAdapters"})})," type is specific to the adapters it contains."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`const DefaultAdapters = {
    css: css.adapter,
    data: data.adapter,
    portal: portal.adapter,
    router: router.adapter,
};
`})}),`
`,s(e.p,{children:[t(e.code,{children:"DefaultAdapters"})," is not strongly typed to ",t(e.code,{children:"TestHarnessAdapters"}),". Instead, its type is:"]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type DefaultAdaptersType = {|
   css: typeof css.adapter,
   data: typeof data.adapter,
   portal: typeof portal.adapter,
   router: typeof router.adapter,
|};
`})}),`
`,s(e.p,{children:["It conforms to the ",t(e.code,{children:"TestHarnessAdapters"})," type because each key is a string and the value of each property is a variation of ",t(e.code,{children:"TestHarnessAdapter<TConfig>"})," with a different type for ",t(e.code,{children:"TConfig"})," in each case, but it is not equivalent to the ",t(e.code,{children:"TestHarnessAdapters"})," type where each key is a string and each value is exactly ",t(e.code,{children:"TestHarnessAdapter<any>"}),"."]})]})}function d(a={}){const{wrapper:e}=Object.assign({},o(),a.components);return e?t(e,{...a,children:t(n,{...a})}):n(a)}const c=()=>{throw new Error("Docs-only story")};c.parameters={docsOnly:!0};const r={title:"Testing / Test Harness / Types / TestHarnessAdapters",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:d};const j=["__page"];export{j as __namedExportsOrder,c as __page,r as default};
//# sourceMappingURL=types.test-harness-adapters.stories-a786e1f0.js.map
