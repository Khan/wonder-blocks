import{M as U,C as f,b as R}from"./index-35e12253.js";import{H as y,B as S}from"./footnote-761d2bcc.js";import{u as M,R as u,S as F,b as x,V as c,c as s}from"./render-state-root-891c0d56.js";import{r as E}from"./index-9f32f44c.js";import{B as g}from"./button-b2794e32.js";import{j as r,a as e,F as O}from"./jsx-runtime-309e447d.js";import{u as h}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";const D=n=>{const t=M(),o=E.useRef(null);if(t===u.Root)throw new Error("Components using useUniqueIdWithMock() should be descendants of <RenderStateRoot>");return t===u.Initial?F:(o.current||(o.current=new x(n)),o.current)},k=n=>{const t=M(),o=E.useRef(null);if(t===u.Root)throw new Error("Components using useUniqueIdWithoutMock() should be descendants of <RenderStateRoot>");return t===u.Initial?null:(o.current||(o.current=new x(n)),o.current)},b=()=>{const n=Object.assign({br:"br"},h()),[t,o]=React.useState(0),i=React.useRef([]),a=k(),m=()=>{o(t+1)};return a?i.current.push(a.get("my-unique-id")):i.current.push("null"),r(c,{children:[e(g,{onClick:m,style:{width:200},children:"Re-render"}),e(n.br,{}),"renders:",i.current.map((p,d)=>r(c,{children:["Render ",d,": ",p]},d))]})},q=()=>{const n=Object.assign({br:"br"},h()),[t,o]=React.useState(0),i=React.useRef([]),a=D(),m=()=>{o(t+1)};return a?i.current.push(a.get("my-unique-id")):i.current.push("null"),r(c,{children:[e(g,{onClick:m,style:{width:200},children:"Re-render"}),e(n.br,{}),"renders:",i.current.map((p,d)=>r(c,{children:["Render ",d,": ",p]},d))]})},I=()=>{const n=k("first"),t=k("second");return r(c,{children:[e(y,{children:"First Provider with scope: first"}),n&&e(c,{children:r(S,{children:["The id returned for my-identifier:"," ",n.get("my-identifier")]})}),e(y,{children:"Second Provider with scope: second"}),t&&e(c,{children:r(S,{children:["The id returned for my-identifier:"," ",t.get("my-identifier")]})})]})};function w(n){const t=Object.assign({h1:"h1",code:"code",p:"p"},h(),n.components);return r(O,{children:[e(U,{title:"Core/useUniqueId*",parameters:{chromatic:{disableSnapshot:!0}}}),`
`,e(t.h1,{id:"useuniqueidwithoutmock",children:e(t.code,{children:"useUniqueIdWithoutMock"})}),`
`,r(t.p,{children:["This hook is similar to ",e(t.code,{children:"<UniqueIDProvider mockOnFirstRender={false}>"}),`.
It will return `,e(t.code,{children:"null"}),` on the initial render and then the same identifier
factory for each subsequent render. The identifier factory is unique to
each component.`]}),`
`,r(t.p,{children:["NOTE: All uses of ",e(t.code,{children:"useUniqueIdWithoutMock"}),` should appear as descendants
of `,e(t.code,{children:"<RenderStateRoot>"}),". It's customary to place ",e(t.code,{children:"<RenderStateRoot>"}),` near
the base of the render tree since only one instance is allow in any given
render tree.`]}),`
`,`
`,e(f,{children:e(R,{name:"WithoutMockExample",children:e(s,{children:e(b,{})})})}),`
`,e(t.h1,{id:"useuniqueidwithmock",children:e(t.code,{children:"useUniqueIdWithMock"})}),`
`,r(t.p,{children:["This hook is similar to ",e(t.code,{children:"<UniqueIDProvider mockOnFirstRender={true}>"}),`.
It will return a mock identifier factory on the initial render that doesn'that
guarantee identifier uniqueness. Mock mode can help things appear on the screen
during the initial render, but is not the default, because it is not always safe
(e.g., we need actual IDs for some SVG constructs).`]}),`
`,r(t.p,{children:["NOTE: All uses of ",e(t.code,{children:"useUniqueIdWithMock"}),` should appear as descendants
of `,e(t.code,{children:"<RenderStateRoot>"}),". It's customary to place ",e(t.code,{children:"<RenderStateRoot>"}),` near
the base of the render tree since only one instance is allow in any given
render tree.`]}),`
`,`
`,e(f,{children:e(R,{name:"WithMockExample",children:e(s,{children:e(q,{})})})}),`
`,e(t.h1,{id:"scoped",children:"Scoped"}),`
`,r(t.p,{children:[`Both of these hooks ensure that every identifier factory is unique using a
unique number for each one. However, this isn't very readable when wanting to
differentiate the types of things using unique identifiers. If we want to, we
can provide a `,e(t.code,{children:"scope"}),` param that adds some text to each identifier provided.
This can be useful for providing some quick at-a-glance component identification
to identifiers when there are multiple hooks being used.`]}),`
`,`
`,e(f,{children:e(R,{name:"ScopedExample",children:e(s,{children:e(I,{})})})})]})}function T(n={}){const{wrapper:t}=Object.assign({},h(),n.components);return t?e(t,{...n,children:e(w,{...n})}):w(n)}const W=()=>e(s,{children:e(b,{})});W.storyName="WithoutMockExample";W.parameters={storySource:{source:"<RenderStateRoot><WithoutMockExample /></RenderStateRoot>"}};const C=()=>e(s,{children:e(q,{})});C.storyName="WithMockExample";C.parameters={storySource:{source:"<RenderStateRoot><WithMockExample /></RenderStateRoot>"}};const v=()=>e(s,{children:e(I,{})});v.storyName="ScopedExample";v.parameters={storySource:{source:"<RenderStateRoot><ScopedExample /></RenderStateRoot>"}};const l={title:"Core/useUniqueId*",parameters:{chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["withoutMockExample","withMockExample","scopedExample"]};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:T};const ie=["WithoutMockExample","WithMockExample","ScopedExample","withoutMockExample","withMockExample","scopedExample"];export{I as ScopedExample,q as WithMockExample,b as WithoutMockExample,ie as __namedExportsOrder,l as default,v as scopedExample,C as withMockExample,W as withoutMockExample};
//# sourceMappingURL=use-unique-id.stories-552e3033.js.map
