import{a as r,j as s}from"./jsx-runtime-309e447d.js";import{I as a,V as f}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{p as d}from"./package-8a90d7b9.js";import{C as v}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./footnote-761d2bcc.js";import"./icon-a4f17d53.js";const _={title:"Core / IDProvider",component:a,args:{scope:"field",id:"",testId:""},parameters:{componentSubtitle:r(v,{name:d.name,version:d.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}},decorators:[e=>r(f,{children:e()})]},o={render:e=>r(a,{...e,children:n=>s("label",{htmlFor:n,children:["Label with ID ",n,":",r("input",{type:"text",id:n})]})})},i=()=>r(a,{scope:"field",children:e=>s("label",{htmlFor:e,children:["Label with ID ",e,":",r("input",{type:"text",id:e})]})});i.parameters={docs:{description:{story:"This example allows you to generate an unique ID and make it available to associate the `<label>` and `<input>` elements. To see this example in action, check that `label[for]` and `input[id]` are using the same id."}}};const t={name:"Identifier provided by parent component",render:()=>r(a,{scope:"field",id:"some-user-id",children:e=>s("label",{htmlFor:e,children:["Label with ID ",e,":",r("input",{type:"text",id:e})]})})};t.parameters={docs:{description:{story:"In some cases, a parent component using `IDProvider` could have an identifier as well. For this particular scenario, we can reuse this ID and pass it down to `IDProvider`. This will avoid generating a unique identifier, and it will reuse the passed identifier instead."}}};var l,p,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <IDProvider {...args}>
            {uniqueId => <label htmlFor={uniqueId}>
                    Label with ID {uniqueId}:
                    <input type="text" id={uniqueId} />
                </label>}
        </IDProvider>
}`,...(c=(p=o.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,u,h;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`() => <IDProvider scope="field">
        {uniqueId => <label htmlFor={uniqueId}>
                Label with ID {uniqueId}:
                <input type="text" id={uniqueId} />
            </label>}
    </IDProvider>`,...(h=(u=i.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var I,b,D;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: "Identifier provided by parent component",
  render: () => <IDProvider scope="field" id="some-user-id">
            {uniqueId => <label htmlFor={uniqueId}>
                    Label with ID {uniqueId}:
                    <input type="text" id={uniqueId} />
                </label>}
        </IDProvider>
}`,...(D=(b=t.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};const V=["Default","WithFormFields","IdProvided"];export{o as Default,t as IdProvided,i as WithFormFields,V as __namedExportsOrder,_ as default};
//# sourceMappingURL=id-provider.stories-97bd16a2.js.map
