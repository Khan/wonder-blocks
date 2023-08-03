import{a as e,j as h}from"./jsx-runtime-309e447d.js";import{r as o}from"./index-9f32f44c.js";import{V as l,l as Q}from"./render-state-root-891c0d56.js";import{c as X,L as Z}from"./footnote-761d2bcc.js";import{b as t,a as $,C as ee}from"./labeled-text-field-d77d5301.js";import{S as x}from"./index-f641b98f.js";import{p as w}from"./package-55b6077d.js";import{C as te}from"./component-info-cedbe096.js";import{S as y}from"./strut-c6011196.js";import"./_commonjsHelpers-de833af9.js";import"./radio-0fc824b1.js";import"./icon-a4f17d53.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";const fe={title:"Form / Checkbox",component:t,parameters:{componentSubtitle:e(te,{name:w.name,version:w.version})}},u={args:{checked:!1,onChange:()=>{}}};u.parameters={chromatic:{disableSnapshot:!0}};const p=()=>{const[s,n]=o.useState(null);return e(t,{checked:s,onChange:()=>{n(s===!1)}})};p.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`Use state to keep track of whether the checkbox
            is checked or not. This is in the indeterminate (null)
            state by default. Clicking it will uncheck it, and clicking it
            again will check it.`}}};const m=()=>h(l,{style:a.row,children:[e(t,{checked:null,disabled:!1,error:!1,onChange:()=>{}}),e(y,{size:8}),e(t,{checked:void 0,disabled:!0,error:!1,onChange:()=>{}}),e(y,{size:8}),e(t,{checked:null,disabled:!1,error:!0,onChange:()=>{}})]});m.parameters={docs:{description:{story:"The checkbox has a third state for when the checkbox\n        is neither `checked` (true) nor `unchecked` (false). Set the\n        `checked` prop to `null` or `undefined` to use the indeterminate checkbox."}}};const g=()=>{const[s,n]=o.useState(!1),[i,c]=o.useState([]),d=[{label:"Pepperoni",value:"pepperoni"},{label:"Sausage",value:"sausage"},{label:"Extra cheese",value:"cheese"},{label:"Green pepper",value:"pepper"},{label:"Mushroom",value:"mushroom"}],S=()=>{if(s||s===null)c([]),n(!1);else{const r=d.map(K=>K.value);c(r),n(!0)}},J=r=>{c(r),r.length===d.length?n(!0):r.length?n(null):n(!1)};return h(l,{children:[e(t,{checked:s,label:"Topping(s)",onChange:S}),e(y,{size:x.small_12}),e(l,{style:{marginInlineStart:x.large_24},children:e($,{groupName:"toppings",onChange:J,selectedValues:i,children:d.map(r=>e(ee,{label:r.label,value:r.value},r.label))})})]})};g.parameters={docs:{description:{story:`Here is an example of how you can use the
            indeterminate checkbox to select all or deselect all options
            in a checkbox group. If only some of the options are selected,
            the indeterminate checkbox will be in the indeterminate state.`}}};const k=()=>h(l,{style:a.row,children:[e(t,{error:!1,checked:!1,style:a.marginRight,onChange:()=>{}}),e(t,{error:!1,checked:!0,style:a.marginRight,onChange:()=>{}}),e(t,{error:!0,checked:!1,style:a.marginRight,onChange:()=>{}}),e(t,{error:!0,checked:!0,style:a.marginRight,onChange:()=>{}}),e(t,{disabled:!0,checked:!1,style:a.marginRight,onChange:()=>{}}),e(t,{disabled:!0,checked:!0,style:a.marginRight,onChange:()=>{}})]});k.parameters={docs:{description:{story:"The checkbox has various styles for clickable states. Here are sets of default checkboxes, checkboxes in an error state, and disabled checkboxes."}}};const b=()=>{const[s,n]=o.useState(!1),[i,c]=o.useState(!1),[d,S]=o.useState(!1);return h(l,{style:a.row,children:[e(t,{checked:s,onChange:n,style:a.marginRight}),e(t,{error:!0,checked:i,onChange:c,style:a.marginRight}),e(t,{checked:d,disabled:!0,onChange:S,style:a.marginRight})]})};b.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"A demo of the different kinds of checkboxes\n            when they have their `checked` and `onChange` props set\n            to make them toggle on click."}}};const f=()=>{const[s,n]=o.useState(!1);return e(t,{label:"Receive assignment reminders for Algebra",description:"You will receive a reminder 24 hours before each deadline",checked:s,onChange:n})};f.parameters={docs:{description:{story:"The checkbox can have an optional label and description. This allows it to be used as a settings-like item. The user of this component is responsible for keeping track of checked state and providing an onChange callback."}}};const C=()=>{const[s,n]=o.useState(!1),i="Functions",c=`A great cook knows how to take basic
        ingredients and prepare a delicious meal. In this topic, you will
        become function-chefs! You will learn how to combine functions
        with arithmetic operations and how to compose functions.`;return h(l,{style:a.wrapper,children:[h(l,{style:a.topic,children:[e("label",{htmlFor:"topic-123",children:e(X,{children:i})}),e(Z,{children:c})]}),e(t,{checked:s,id:"topic-123",onChange:n})]})};C.parameters={docs:{description:{story:"Sometimes one may wish to use a checkbox in a different context (label may not be right next to the checkbox), like in this example content item. Use a `<label htmlFor={id}>` element where the id matches the `id` prop of the Checkbox. This is for accessibility purposes, and doing this also automatically makes the label a click target for the checkbox."}}};const a=Q.StyleSheet.create({row:{flexDirection:"row"},marginLeft:{marginLeft:16},marginRight:{marginRight:16},wrapper:{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"},topic:{maxWidth:600}});var V,v,R;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    checked: false,
    onChange: () => {}
  }
}`,...(R=(v=u.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var A,T,I;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [checked, setChecked] = React.useState<boolean | null>(null);
  const handleChange = () => {
    // If \`checked\` is true (checked) OR null/undefined (indeterminate),
    // we want to change it to false (unchecked). We only change it back
    // to true if it the value is explicitly false.
    setChecked(checked === false);
  };
  return <Checkbox checked={checked} onChange={handleChange} />;
}`,...(I=(T=p.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var L,G,_;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  return <View style={styles.row}>
            <Checkbox checked={null} disabled={false} error={false} onChange={() => {}} />
            <Strut size={8} />
            <Checkbox checked={undefined} disabled={true} error={false} onChange={() => {}} />
            <Strut size={8} />
            <Checkbox checked={null} disabled={false} error={true} onChange={() => {}} />
        </View>;
}`,...(_=(G=m.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var z,F,W;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [allSelected, setAllSelected] = React.useState<boolean | null>(false);
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);
  const choices = [{
    label: "Pepperoni",
    value: "pepperoni"
  }, {
    label: "Sausage",
    value: "sausage"
  }, {
    label: "Extra cheese",
    value: "cheese"
  }, {
    label: "Green pepper",
    value: "pepper"
  }, {
    label: "Mushroom",
    value: "mushroom"
  }];
  const handleSelectAll = () => {
    if (allSelected || allSelected === null) {
      setSelectedValues([]);
      setAllSelected(false);
    } else {
      const allValues = choices.map(choice => choice.value);
      setSelectedValues(allValues);
      setAllSelected(true);
    }
  };
  const handleCheckboxGroupSelect = (values: Array<string>) => {
    setSelectedValues(values);
    if (values.length === choices.length) {
      setAllSelected(true);
    } else if (values.length) {
      setAllSelected(null);
    } else {
      setAllSelected(false);
    }
  };
  return <View>
            <Checkbox checked={allSelected} label={"Topping(s)"} onChange={handleSelectAll} />
            <Strut size={Spacing.small_12} />
            <View style={{
      marginInlineStart: Spacing.large_24
    }}>
                <CheckboxGroup groupName="toppings" onChange={handleCheckboxGroupSelect} selectedValues={selectedValues}>
                    {choices.map(choice => <Choice key={choice.label} label={choice.label} value={choice.value} />)}
                </CheckboxGroup>
            </View>
        </View>;
}`,...(W=(F=g.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var E,M,j;k.parameters={...k.parameters,docs:{...(E=k.parameters)==null?void 0:E.docs,source:{originalSource:`() => <View style={styles.row}>
        <Checkbox error={false} checked={false} style={styles.marginRight} onChange={() => {}} />
        <Checkbox error={false} checked={true} style={styles.marginRight} onChange={() => {}} />
        <Checkbox error={true} checked={false} style={styles.marginRight} onChange={() => {}} />
        <Checkbox error={true} checked={true} style={styles.marginRight} onChange={() => {}} />
        <Checkbox disabled={true} checked={false} style={styles.marginRight} onChange={() => {}} />
        <Checkbox disabled={true} checked={true} style={styles.marginRight} onChange={() => {}} />
    </View>`,...(j=(M=k.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var D,Y,H;b.parameters={...b.parameters,docs:{...(D=b.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const [defaultChecked, defaultSetChecked] = React.useState(false);
  const [errorChecked, errorSetChecked] = React.useState(false);
  const [disabledChecked, disabledSetChecked] = React.useState(false);
  return <View style={styles.row}>
            <Checkbox checked={defaultChecked} onChange={defaultSetChecked} style={styles.marginRight} />
            <Checkbox error={true} checked={errorChecked} onChange={errorSetChecked} style={styles.marginRight} />
            <Checkbox checked={disabledChecked} disabled={true} onChange={disabledSetChecked} style={styles.marginRight} />
        </View>;
}`,...(H=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:H.source}}};var N,O,P;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox label="Receive assignment reminders for Algebra" description="You will receive a reminder 24 hours before each deadline" checked={checked} onChange={setChecked} />;
}`,...(P=(O=f.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var U,q,B;C.parameters={...C.parameters,docs:{...(U=C.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
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
            <Checkbox checked={checked} id="topic-123" onChange={setChecked} />
        </View>;
}`,...(B=(q=C.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};const Ce=["Default","Controlled","Indeterminate","IndeterminateWithGroup","Variants","VariantsControlled","WithLabel","AdditionalClickTarget"];export{C as AdditionalClickTarget,p as Controlled,u as Default,m as Indeterminate,g as IndeterminateWithGroup,k as Variants,b as VariantsControlled,f as WithLabel,Ce as __namedExportsOrder,fe as default};
//# sourceMappingURL=checkbox.stories-a9c3c91e.js.map
