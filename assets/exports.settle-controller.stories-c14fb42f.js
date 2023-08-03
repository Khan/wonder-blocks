import{M as i}from"./index-35e12253.js";import{a as t,j as n,F as l}from"./jsx-runtime-309e447d.js";import{u as a}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function s(o){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",a:"a"},a(),o.components);return n(l,{children:[t(i,{title:"Testing / Mocking / Exports / SettleController",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"settlecontroller",children:"SettleController"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`class SettleController {
    /**
     * The signal to pass to the \`RespondWith\` API.
     */
    get signal(): SettleSignal;

    /**
     * Settle the signal and therefore any associated responses.
     *
     * @throws {Error} if the signal has already been settled.
     */
    settle(): void;
}
`})}),`
`,n(e.p,{children:["The ",t(e.code,{children:"SettleController"})," is used to control the settling of a signal. This is specifically created to work with the ",t(e.a,{href:"/docs/testing-mocking-exports-respondwith--page",children:t(e.code,{children:"RespondWith"})})," API. The ",t(e.code,{children:"signal"})," property it exposes can be passed to ",t(e.code,{children:"RespondWith"})," methods and then the ",t(e.code,{children:"settle"})," method can be invoked to settle the signal, causing the related responses to either reject or resolve as appropriate."]}),`
`,t(e.p,{children:"This can be useful for tests where the order of operations needs to be controlled in order to verify the expected behaviour of the system under test."})]})}function c(o={}){const{wrapper:e}=Object.assign({},a(),o.components);return e?t(e,{...o,children:t(s,{...o})}):s(o)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const r={title:"Testing / Mocking / Exports / SettleController",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:c};const k=["__page"];export{k as __namedExportsOrder,p as __page,r as default};
//# sourceMappingURL=exports.settle-controller.stories-c14fb42f.js.map
