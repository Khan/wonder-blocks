import{M as i}from"./index-35e12253.js";import{a as t,j as r,F as c}from"./jsx-runtime-309e447d.js";import{u as a}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function s(n){const e=Object.assign({h1:"h1",pre:"pre",code:"code",p:"p",ul:"ul",li:"li"},a(),n.components);return r(c,{children:[t(i,{title:"Data / Types / Result<>",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,t(e.h1,{id:"result",children:"Result<>"}),`
`,t(e.pre,{children:t(e.code,{className:"language-ts",children:`type Result<TData: ValidCacheData> =
    | {|
          status: "loading",
      |}
    | {|
          status: "success",
          data: TData,
      |}
    | {|
          status: "error",
          error: Error,
      |}
    | {|
          status: "aborted",
      |};
`})}),`
`,r(e.p,{children:["The ",t(e.code,{children:"Result<>"})," type is used to describe the result of an asynchronous operation. It is the primary type used by hooks and components in Wonder Blocks Data to convey the status of asynchronous tasks."]}),`
`,r(e.p,{children:["There are four states represented by the ",t(e.code,{children:"Result<>"})," type:"]}),`
`,r(e.ul,{children:[`
`,r(e.li,{children:[t(e.code,{children:"loading"}),": The operation is in pending."]}),`
`,r(e.li,{children:[t(e.code,{children:"success"}),": The operation completed successfully."]}),`
`,r(e.li,{children:[t(e.code,{children:"error"}),": The operation failed."]}),`
`,r(e.li,{children:[t(e.code,{children:"aborted"}),": The operation was aborted."]}),`
`]})]})}function d(n={}){const{wrapper:e}=Object.assign({},a(),n.components);return e?t(e,{...n,children:t(s,{...n})}):s(n)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const o={title:"Data / Types / Result<>",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:d};const C=["__page"];export{C as __namedExportsOrder,p as __page,o as default};
//# sourceMappingURL=types.result.stories-1c357f37.js.map
