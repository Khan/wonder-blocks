import{M as a}from"./index-35e12253.js";import{a as t,j as n,F as p}from"./jsx-runtime-309e447d.js";import{u as s}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function o(r){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a",ul:"ul",li:"li"},s(),r.components);return n(p,{children:[t(a,{title:"Testing / Fixtures / Types / FixtureFn",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"fixturefn",children:"FixtureFn"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`/**
 * A function for defining a fixture.
 */
type FixtureFn<TProps: {...}> = (
    /**
     * The name of the fixture.
     */
    description: string,

    /**
     * The props for the fixture or a function that returns the props.
     * The function is injected with an API to facilitate logging.
     */
    props: FixtureProps<TProps>,

    /**
     * An alternative component to render for the fixture.
     * Useful if the fixture requires some additional setup for testing the
     * component.
     */
    wrapper?: React.ComponentType<TProps>,
) => mixed;

`})}),`
`,n(e.p,{children:["The ",t(e.a,{href:"/docs/testing-fixtures-exports-fixtures--page",children:t(e.code,{children:"fixtures"})})," method returns a method of this type, specific to the component that was passed into ",t(e.code,{children:"fixtures"}),"."]}),`
`,t(e.p,{children:"This function takes two or three arguments:"}),`
`,n(e.ul,{children:[`
`,n(e.li,{children:[t(e.code,{children:"description: string"}),": A string describing the fixture. This should be used to explain what the fixture is expected to show."]}),`
`,n(e.li,{children:[t(e.code,{children:"props: FixtureProps<TProps>"}),": The props that the fixture should be rendered with. See ",t(e.a,{href:"/docs/testing-fixtures-types-fixtureprops--page",children:t(e.code,{children:"FixtureProps"})}),"."]}),`
`,n(e.li,{children:[t(e.code,{children:"wrapper?: React.ComponentType<TProps>"}),": An optional component that will be rendered for the fixture. This can be used to wrap the fixture in a component that adds additional functionality, such as a test harness (see ",t(e.a,{href:"/docs/testing-test-harness-exports-maketestharness--page",children:t(e.code,{children:"makeTestHarness"})}),")."]}),`
`]})]})}function c(r={}){const{wrapper:e}=Object.assign({},s(),r.components);return e?t(e,{...r,children:t(o,{...r})}):o(r)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const i={title:"Testing / Fixtures / Types / FixtureFn",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:c};const A=["__page"];export{A as __namedExportsOrder,d as __page,i as default};
//# sourceMappingURL=types.fixture-fn.stories-05acccee.js.map
