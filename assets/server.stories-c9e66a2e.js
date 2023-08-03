import{M as a}from"./index-35e12253.js";import{a as r,j as i,F as d}from"./jsx-runtime-309e447d.js";import{u as t}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function o(n){const e=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code"},t(),n.components);return i(d,{children:[r(a,{title:"Core / Server"}),`
`,r(e.h1,{id:"server",children:"Server"}),`
`,r(e.p,{children:`Provides helpers for switching to server-side mode and determining if server-side mode is in use.
This API is valuable when performing server-side rendering actions.`}),`
`,r(e.h2,{id:"setserverside",children:"setServerSide"}),`
`,r(e.p,{children:`When called, server-side mode is turned on. Once turned on, it cannot be turned off.
This causes additinal features to be available in some Wonder Blocks packages that are otherwise ignored.`}),`
`,r(e.h3,{id:"usage",children:"Usage"}),`
`,r(e.pre,{children:r(e.code,{className:"language-js",children:`import {Server} from "@khanacademy/wonder-blocks-core";

Server.setServerSide(): void;
`})}),`
`,r(e.h2,{id:"isserverside",children:"isServerSide"}),`
`,i(e.p,{children:["This returns ",r(e.code,{children:"false"})," unless ",r(e.code,{children:"setServerSide"}),` has been called. It is used to determine
if server-side-only features and behaviors should be enabled.`]}),`
`,r(e.h3,{id:"usage-1",children:"Usage"}),`
`,r(e.pre,{children:r(e.code,{className:"language-js",children:`import {Server} from "@khanacademy/wonder-blocks-core";

Server.isServerSide(): boolean;
`})})]})}function c(n={}){const{wrapper:e}=Object.assign({},t(),n.components);return e?r(e,{...n,children:r(o,{...n})}):o(n)}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const s={title:"Core / Server",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:c};const C=["__page"];export{C as __namedExportsOrder,m as __page,s as default};
//# sourceMappingURL=server.stories-c9e66a2e.js.map
