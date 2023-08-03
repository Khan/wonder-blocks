import{M as a}from"./index-35e12253.js";import{a as t,j as o,F as p}from"./jsx-runtime-309e447d.js";import{u as i}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function s(r){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},i(),r.components);return o(p,{children:[t(a,{title:"Testing / Fixtures / Exports / fixtures()",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"fixtures",children:"fixtures()"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type FixtureProps<TProps: {...}> =
    | $ReadOnly<TProps>
    | ((options: $ReadOnly<GetPropsOptions>) => $ReadOnly<TProps>);

fixtures<
    TComponent: React.ComponentType<any>,
    TProps: React.ElementConfig<TComponent>,
>(
    Component: TComponent,
): FixtureFn<TProps>;
`})}),`
`,o(e.p,{children:["The ",t(e.code,{children:"fixtures()"})," method is used to define a set of fixtures for a component. Each fixture is a story compatible with the CSF format used by Storybook."]}),`
`,o(e.p,{children:["The method returned by ",t(e.code,{children:"fixtures(Component)"})," is a strongly-typed call for generating a named story with the given args, and using the given wrapper component, if provided. See ",t(e.a,{href:"/docs/testing-fixtures-basic--f-1",children:"our Fixtures Framework example stories"})," for examples."]}),`
`,o(e.p,{children:["The returned ",t(e.code,{children:"fixture"})," function is of type ",t(e.a,{href:"/docs/testing-fixtures-types-fixturefn--page",children:t(e.code,{children:"FixtureFn<TProps>"})}),"."]})]})}function c(r={}){const{wrapper:e}=Object.assign({},i(),r.components);return e?t(e,{...r,children:t(s,{...r})}):s(r)}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const n={title:"Testing / Fixtures / Exports / fixtures()",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:c};const M=["__page"];export{M as __namedExportsOrder,m as __page,n as default};
//# sourceMappingURL=exports.fixtures.stories-b3d50d1d.js.map
