import{M as s}from"./index-35e12253.js";import{a as t,j as r,F as l}from"./jsx-runtime-309e447d.js";import{u as i}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function a(n){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p"},i(),n.components);return r(l,{children:[t(s,{title:"Testing / Fixtures / Types / GetPropsOptions",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"getpropsoptions",children:"GetPropsOptions"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type GetPropsOptions = {|
    /**
     * A function to call that will log output.
     */
    log: (message: string, ...args: Array<any>) => void,

    /**
     * A function to make a handler that will log all arguments with the given
     * name or message. Useful for logging events as it avoids the boilerplate
     * of the \`log\` function.
     */
    logHandler: (name: string) => (...args: Array<any>) => void,
|};
`})}),`
`,r(e.p,{children:["A fixture can provide a callback that the framework invokes to obtain the props for the fixture component. This callback takes a single argument of type ",t(e.code,{children:"GetPropsOptions"}),"."]}),`
`,t(e.p,{children:"This has two calls available."}),`
`,r(e.p,{children:["The ",t(e.code,{children:"log"})," callback is for logging output in the context of the fixture. This can be useful for logging information during your fixture. However, in many situations, it is easier to use the ",t(e.code,{children:"logHandler"})," callback. The ",t(e.code,{children:"logHandler"})," callback takes a single argument of type ",t(e.code,{children:"string"})," and returns a function that logs all arguments with the given name or message, allowing easy creation of event handlers that will log that event and its arguments."]}),`
`,t(e.p,{children:"For example:"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`fixture("My fixture that does logging", ({logHandler}) => ({
    onClick: logHandler("onClick"),
}));
`})}),`
`,t(e.p,{children:"is equivalent to:"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`fixture("My fixture that does logging", ({log}) => ({
    onClick: (...args) => log("onClick", ...args),
}));
`})})]})}function c(n={}){const{wrapper:e}=Object.assign({},i(),n.components);return e?t(e,{...n,children:t(a,{...n})}):a(n)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const o={title:"Testing / Fixtures / Types / GetPropsOptions",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:c};const C=["__page"];export{C as __namedExportsOrder,p as __page,o as default};
//# sourceMappingURL=types.get-props-options.stories-16f8c8cd.js.map
