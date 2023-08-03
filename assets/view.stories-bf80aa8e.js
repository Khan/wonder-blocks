import{a as e,j as a}from"./jsx-runtime-309e447d.js";import{V as t,l as k}from"./render-state-root-891c0d56.js";import{C as l,S as n}from"./index-f641b98f.js";import{e as m,c as d}from"./footnote-761d2bcc.js";import"./index-9f32f44c.js";import{p}from"./package-8a90d7b9.js";import{C as L}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";const v={children:{description:"The content of the `View` element.",type:{name:"other",value:"React.ReactNode",required:!0}},tag:{description:"The HTML tag to render.",control:{type:"select",options:["div","article","aside","nav","section"]}},id:{description:"An optional id attribute.",table:{type:{summary:"string"}},control:{type:"text"}},style:{description:"Optional custom styles.",control:{type:"object"},table:{type:{summary:"StyleType"}}},tabIndex:{description:"Set the tabindex attribute on the rendered element.",control:{type:"number",min:-1},table:{type:{summary:"number"}}},testId:{description:"Test ID used for e2e testing. This sets the `data-test-id` attribute on the rendered element.",control:{type:"text"},table:{type:{summary:"string"}}}},R={title:"Core / View",component:t,argTypes:v,parameters:{componentSubtitle:e(L,{name:p.name,version:p.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}}},c={args:{children:"This is a View!"}},r=()=>a(t,{style:i.container,children:[e(m,{children:"Hello, world!"}),e(t,{style:[i.container,{background:l.lightBlue,border:`1px solid ${l.blue}`,padding:n.xxxSmall_4}],children:"The style prop can accept a (nested) array of Aphrodite styles and inline styles."})]});r.parameters={docs:{description:{story:"Styles can be applied inline to the component, or by passing an Aphrodite style object."}}};const s={name:"Using other props",render:()=>a(t,{style:i.container,children:[e(t,{onClick:()=>{console.log("View has been clicked!")},style:i.item,children:"Click me!"}),e(t,{"aria-hidden":"true",children:"This text is hidden from screen readers."})]})};s.parameters={docs:{description:{story:"Other props can be passed through `View`s as if they were normal tags."}}};const o=()=>a(t,{style:i.container,children:[e(m,{children:"View as a column"}),a(t,{style:i.view,children:[e(t,{style:i.item,children:e(d,{children:"First item"})}),e(t,{style:i.item,children:e(d,{children:"Second item"})})]}),e(m,{children:"View as a row"}),a(t,{style:[i.view,{flexDirection:"row"}],children:[e(t,{style:i.item,children:e(d,{children:"First item"})}),e(t,{style:i.item,children:e(d,{children:"Second item"})})]})]});o.parameters={docs:{description:{story:'`View` can also be used to wrap elements and apply different flexbox layouts. By default, `View` uses `flexDirection: "column"`.'}}};const i=k.StyleSheet.create({container:{background:l.offBlack8,gap:n.medium_16,padding:n.xLarge_32},view:{border:`1px dashed ${l.lightBlue}`,gap:n.medium_16,padding:n.medium_16},item:{background:l.offBlack32,padding:n.medium_16}});var y,u,h;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: "This is a View!"
  }
}`,...(h=(u=c.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var w,g,b;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`() => <View style={styles.container}>
        <HeadingMedium>Hello, world!</HeadingMedium>
        <View style={[styles.container, {
    background: Color.lightBlue,
    border: \`1px solid \${Color.blue}\`,
    padding: Spacing.xxxSmall_4
  }]}>
            The style prop can accept a (nested) array of Aphrodite styles and
            inline styles.
        </View>
    </View>`,...(b=(g=r.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var V,f,x;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: "Using other props",
  render: () => <View style={styles.container}>
            <View onClick={() => {
      // eslint-disable-next-line no-console
      console.log("View has been clicked!");
    }} style={styles.item}>
                Click me!
            </View>

            <View aria-hidden="true">
                This text is hidden from screen readers.
            </View>
        </View>
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var S,M,T;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`() => <View style={styles.container}>
        <HeadingMedium>View as a column</HeadingMedium>
        <View style={styles.view}>
            <View style={styles.item}>
                <LabelMedium>First item</LabelMedium>
            </View>
            <View style={styles.item}>
                <LabelMedium>Second item</LabelMedium>
            </View>
        </View>

        <HeadingMedium>View as a row</HeadingMedium>
        <View style={[styles.view, {
    flexDirection: "row"
  }]}>
            <View style={styles.item}>
                <LabelMedium>First item</LabelMedium>
            </View>
            <View style={styles.item}>
                <LabelMedium>Second item</LabelMedium>
            </View>
        </View>
    </View>`,...(T=(M=o.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};const U=["Default","InlineStyles","OtherProps","DefiningLayout"];export{c as Default,o as DefiningLayout,r as InlineStyles,s as OtherProps,U as __namedExportsOrder,R as default};
//# sourceMappingURL=view.stories-bf80aa8e.js.map
