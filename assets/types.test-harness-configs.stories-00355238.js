import{M as i}from"./index-35e12253.js";import{a as t,j as s,F as d}from"./jsx-runtime-309e447d.js";import{u as o}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function n(a){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},o(),a.components);return s(d,{children:[t(i,{title:"Testing / Test Harness / Types / TestHarnessConfigs<>",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"testharnessconfigs",children:"TestHarnessConfigs<>"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type TestHarnessConfigs<TAdapters: TestHarnessAdapters>;
`})}),`
`,s(e.p,{children:["When given the type of a set of adapters conforming to ",t(e.a,{href:"/docs/testing-test-harness-types-testharnessadapters--page",children:t(e.code,{children:"TestHarnessAdapters"})}),", this type will represent a set of configurations for those adapters."]}),`
`,s(e.p,{children:["It is important to note here that if the ",t(e.code,{children:"TAdapters"})," type passed in is the actual ",t(e.code,{children:"TestHarnessAdapters"})," type, then the resulting configuration type will have each adapter's config being set to ",t(e.code,{children:"any"}),". Instead of using the ",t(e.code,{children:"TestHarnessAdapters"})," type directly, the passed object should not be typed as that, but should merely conform to that type."]}),`
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
`,s(e.p,{children:["It conforms to the ",t(e.code,{children:"TestHarnessAdapters"})," type, but it is not equivalent to the ",t(e.code,{children:"TestHarnessAdapters"})," type. This is important when we consider the companion export, ",t(e.a,{href:"/docs/testing-test-harness-exports-harnessadapters--page",children:t(e.code,{children:"harnessAdapters.DefaultConfigs"})}),"."]}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`const DefaultConfigs: TestHarnessConfigs<typeof DefaultAdapters> = {
    css: css.defaultConfig,
    data: data.defaultConfig,
    portal: portal.defaultConfig,
    router: router.defaultConfig,
};
`})}),`
`,s(e.p,{children:[t(e.code,{children:"DefaultConfigs"})," is typed using ",t(e.code,{children:"TestHarnessConfigs<typeof DefaultAdapters>"}),". Because ",t(e.code,{children:"DefaultAdapters"})," is strongly typed specifically to each adapter it contains, the type that ",t(e.code,{children:"TestHarnessConfigs<>"})," creates ensures that there is one configuration per adapter key, and that the configuration type for each adapter key is correct for the corresponding adapter."]}),`
`,s(e.p,{children:["If we had typed ",t(e.code,{children:"DefaultAdapters"})," as ",t(e.code,{children:"TestHarnessAdapters"}),", then although we would still enforce one configuration per adapter key, we would allow ",t(e.code,{children:"any"})," type to provide that configuration, which does not give us any real type safety."]}),`
`,s(e.p,{children:["So, to summarize, use ",t(e.code,{children:"TestHarnessAdapters"})," in input locations to verify a set of adapters conforms to that type, but avoid using it in output locations as it can erase useful type information."]})]})}function p(a={}){const{wrapper:e}=Object.assign({},o(),a.components);return e?t(e,{...a,children:t(n,{...a})}):n(a)}const c=()=>{throw new Error("Docs-only story")};c.parameters={docsOnly:!0};const r={title:"Testing / Test Harness / Types / TestHarnessConfigs<>",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:p};const v=["__page"];export{v as __namedExportsOrder,c as __page,r as default};
//# sourceMappingURL=types.test-harness-configs.stories-00355238.js.map
