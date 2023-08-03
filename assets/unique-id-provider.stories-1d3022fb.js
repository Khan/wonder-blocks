import{a as e,j as s}from"./jsx-runtime-309e447d.js";import{r as u}from"./index-9f32f44c.js";import{B as P}from"./button-b2794e32.js";import{S as D}from"./strut-c6011196.js";import{H as c,B as T}from"./footnote-761d2bcc.js";import{U as a,V as o}from"./render-state-root-891c0d56.js";import{p as l}from"./package-8a90d7b9.js";import{C as U}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";const K={title:"Core / UniqueIDProvider",component:a,args:{scope:"field",mockOnFirstRender:!1},parameters:{componentSubtitle:e(U,{name:l.name,version:l.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}},decorators:[r=>e(o,{children:r()})]},S=r=>{const[d,q]=u.useState(0),m=u.useRef([]);return s(o,{children:[e(P,{onClick:()=>{q(d+1)},style:{width:200},children:"Re-render"}),e(D,{size:16}),e(c,{children:"The UniqueIDProvider:"}),e(a,{...r,children:O=>(m.current.push(O.get("my-unique-id")),m.current.map((I,p)=>s(o,{children:["Render ",p,": ",I]},p)))})]})},i={render:S};i.parameters={docs:{description:{story:"By default, `mockOnFirstRender` is `false`. The `children` prop is only called after the initial render. Each call provides the same identifier factory, meaning the same identifier gets returned. Try it below."}}};const t={render:S,args:{mockOnFirstRender:!0},name:"With mockOnFirstRender"};t.parameters={docs:{description:{story:"When specifying `mockOnFirstRender` to be `true`, the first render will use a mock identifier factory that doesn't guarantee identifier uniqueness. Mock mode can help things appear on the screen during the initial render, but is not the default, because it is not always safe (e.g., we need actual IDs for some SVG constructs)."}}};const n=()=>{const r=d=>e(o,{children:s(T,{children:["The id returned for my-identifier: ",d.get("my-identifier")]})});return s(o,{children:[e(c,{children:"First Provider with scope: first"}),e(a,{mockOnFirstRender:!1,scope:"first",children:r}),e(c,{children:"Second Provider with scope: second"}),e(a,{mockOnFirstRender:!1,scope:"second",children:r})]})};n.args={mockOnFirstRender:!0};n.parameters={docs:{description:{story:"`UniqueIDProvider` ensures every identifier factory is unique using a unique number for each one. However, this isn't very readable when wanting to differentiate the types of things using unique identifiers. If we want to, we can provide a `scope` prop that adds some text to each identifier provided. This can be useful for providing some quick at-a-glance component identification to identifiers when there are multiple providers."}}};var f,h,g;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: Template
}`,...(g=(h=i.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var y,v,k;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: Template,
  args: {
    mockOnFirstRender: true
  },
  name: "With mockOnFirstRender"
}`,...(k=(v=t.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var w,F,R;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const children = (ids: IIdentifierFactory) => <View>
            <Body>
                The id returned for my-identifier: {ids.get("my-identifier")}
            </Body>
        </View>;
  return <View>
            <HeadingSmall>First Provider with scope: first</HeadingSmall>
            <UniqueIDProvider mockOnFirstRender={false} scope="first">
                {children}
            </UniqueIDProvider>
            <HeadingSmall>Second Provider with scope: second</HeadingSmall>
            <UniqueIDProvider mockOnFirstRender={false} scope="second">
                {children}
            </UniqueIDProvider>
        </View>;
}`,...(R=(F=n.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};const L=["Default","WithMockOnFirstRender","Scoped"];export{i as Default,n as Scoped,t as WithMockOnFirstRender,L as __namedExportsOrder,K as default};
//# sourceMappingURL=unique-id-provider.stories-1d3022fb.js.map
