import{a as e,j as l}from"./jsx-runtime-309e447d.js";import{r as m}from"./index-9f32f44c.js";import{V as h,l as E}from"./render-state-root-891c0d56.js";import{c as I,L as j}from"./footnote-761d2bcc.js";import{C as D}from"./component-info-cedbe096.js";import{p}from"./package-55b6077d.js";import{R as t}from"./radio-0fc824b1.js";import"./_commonjsHelpers-de833af9.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";import"./strut-c6011196.js";const Q={title:"Form / Radio (internal)",component:t,parameters:{componentSubtitle:e(D,{name:p.name,version:p.version})}},r={args:{checked:!1,onChange:()=>{}}};r.parameters={chromatic:{disableSnapshot:!0}};const n=()=>{const[o,s]=m.useState(!1);return e(t,{checked:o,onChange:s})};n.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`Use state to keep track of whether
        the radio button has been checked. A radio button cannot be unchecked
        by the user once it has been checked. It would become unchecked if a
        different radio button is selected as part of a radio group.`}}};const i=()=>l(h,{style:a.row,children:[e(t,{checked:!1,style:a.marginRight,onChange:()=>{}}),e(t,{checked:!0,style:a.marginRight,onChange:()=>{}}),e(t,{error:!0,checked:!1,style:a.marginRight,onChange:()=>{}}),e(t,{error:!0,checked:!0,style:a.marginRight,onChange:()=>{}}),e(t,{disabled:!0,checked:!1,style:a.marginRight,onChange:()=>{}}),e(t,{disabled:!0,checked:!0,onChange:()=>{}})]});i.parameters={docs:{description:{story:`The radio button has various styles for
        clickable states. Here are sets of default radio buttons,
        radio buttons in an error state, and disabled radio buttons.`}}};const c=()=>{const[o,s]=m.useState(!1);return e(t,{label:"Easy",description:"Opt for a less difficult exercise set.",checked:o,onChange:s})};c.parameters={docs:{description:{story:`The radio button can have an optional label
            and description. This allows it to be used as a settings-like item,
            as opposed to its usage in a radio grid.`}}};const d=()=>{const[o,s]=m.useState(!1),v="Functions",A=`A great cook knows how to take basic
        ingredients and prepare a delicious meal. In this topic, you will
        become function-chefs! You will learn how to combine functions
        with arithmetic operations and how to compose functions.`;return l(h,{style:a.wrapper,children:[l(h,{style:a.topic,children:[e("label",{htmlFor:"topic-123",children:e(I,{children:v})}),e(j,{children:A})]}),e(t,{checked:o,id:"topic-123",onChange:s})]})};d.parameters={docs:{description:{story:`Sometimes one may wish to use a radio button
            in a different context (label may not be right next to the
            radio button), like in this example content item. Use a
            \`<label htmlFor={id}>\` element where the id matches the \`id\`
            prop of the Radio. This is for accessibility purposes,
            and doing this also automatically makes the label a click target
            for the radio button.`}}};const a=E.StyleSheet.create({row:{flexDirection:"row"},marginRight:{marginRight:16},wrapper:{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"},topic:{maxWidth:600}});var u,g,f;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    checked: false,
    onChange: () => {}
  }
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var k,b,y;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const [checked, setChecked] = React.useState(false);
  return <Radio checked={checked} onChange={setChecked} />;
}`,...(y=(b=n.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var C,w,R;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`() => <View style={styles.row}>
        <Radio checked={false} style={styles.marginRight} onChange={() => {}} />
        <Radio checked={true} style={styles.marginRight} onChange={() => {}} />
        <Radio error={true} checked={false} style={styles.marginRight} onChange={() => {}} />
        <Radio error={true} checked={true} style={styles.marginRight} onChange={() => {}} />
        <Radio disabled={true} checked={false} style={styles.marginRight} onChange={() => {}} />
        <Radio disabled={true} checked={true} onChange={() => {}} />
    </View>`,...(R=(w=i.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};var x,S,T;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [checked, setChecked] = React.useState(false);
  return <Radio label="Easy" description="Opt for a less difficult exercise set." checked={checked} onChange={setChecked} />;
}`,...(T=(S=c.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var V,L,F;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const [checked, setChecked] = React.useState(false);
  const headingText = "Functions";
  const descriptionText = \`A great cook knows how to take basic
        ingredients and prepare a delicious meal. In this topic, you will
        become function-chefs! You will learn how to combine functions
        with arithmetic operations and how to compose functions.\`;
  return <View style={styles.wrapper}>
            <View style={styles.topic}>
                <label htmlFor="topic-123">
                    <LabelMedium>{headingText}</LabelMedium>
                </label>
                <LabelSmall>{descriptionText}</LabelSmall>
            </View>
            <Radio checked={checked} id="topic-123" onChange={setChecked} />
        </View>;
}`,...(F=(L=d.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};const X=["Default","Controlled","Variants","WithLabel","AdditionalClickTarget"];export{d as AdditionalClickTarget,n as Controlled,r as Default,i as Variants,c as WithLabel,X as __namedExportsOrder,Q as default};
//# sourceMappingURL=radio.stories-f014e9e9.js.map
