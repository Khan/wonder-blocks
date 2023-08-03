import{a as e,j as r}from"./jsx-runtime-309e447d.js";import{r as n}from"./index-9f32f44c.js";import{V as Y,l as _}from"./render-state-root-891c0d56.js";import{S as g,C as b}from"./index-f641b98f.js";import{a as A,d as j}from"./footnote-761d2bcc.js";import{a as t,C as s}from"./labeled-text-field-d77d5301.js";import{p as y}from"./package-55b6077d.js";import{C as W}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./radio-0fc824b1.js";import"./strut-c6011196.js";import"./icon-a4f17d53.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";const ce={title:"Form / CheckboxGroup",component:t,parameters:{componentSubtitle:e(W,{name:y.name,version:y.version})}},d={render:a=>r(t,{...a,children:[e(s,{label:"Pepperoni",value:"pepperoni-1"}),e(s,{label:"Sausage",value:"sausage-1",description:"Imported from Italy"}),e(s,{label:"Extra cheese",value:"cheese-1"}),e(s,{label:"Green pepper",value:"pepper-1"}),e(s,{label:"Mushroom",value:"mushroom-1"})]}),args:{groupName:"toppings",selectedValues:["pepperoni-1","sausage-1"],onChange:()=>{},label:"Pizza toppings",description:"Choose as many toppings as you would like."}},i=()=>{const[a,l]=n.useState([]);return r(t,{groupName:"toppings",onChange:l,selectedValues:a,children:[e(s,{label:"Pepperoni",value:"pepperoni-2"}),e(s,{label:"Sausage",value:"sausage-2",description:"Imported from Italy"}),e(s,{label:"Extra cheese",value:"cheese-2"}),e(s,{label:"Green pepper",value:"pepper-2"}),e(s,{label:"Mushroom",value:"mushroom-2"})]})};i.parameters={docs:{description:{story:"This is a basic example of a checkbox group.\n        The Wonder Blocks `CheckboxGroup` component takes `Choice`\n        components as children. One of the `Choice` components here\n        includes a description."}}};const c=()=>{const a="You have selected too many toppings",[l,R]=n.useState(["pepperoni-3","sausage-3","cheese-3","pepper-3"]),[F,H]=n.useState(a),D=m=>{if(m.length>3)return a};return r(t,{label:"Pizza order",groupName:"toppings",description:"You may choose at most three toppings",onChange:m=>{const O=D(m);R(m),H(O)},errorMessage:F,selectedValues:l,children:[e(s,{label:"Pepperoni",value:"pepperoni-3"}),e(s,{label:"Sausage",value:"sausage-3",description:"Imported from Italy"}),e(s,{label:"Extra cheese",value:"cheese-3"}),e(s,{label:"Green pepper",value:"pepper-3"}),e(s,{label:"Mushroom",value:"mushroom-3"})]})};c.parameters={docs:{storyDescription:`This is what a checkbox group looks like
        if it has an error. It displays the error that is passed into the
        \`errorMessage\` prop, provided the error is not null. It also
        uses the error styling for all the checkboxes. Here, the error
        message is saved as a state, updated in the change handler, and then
        passed in as the \`errorMessage\` prop.`}};const p=()=>{const[a,l]=n.useState([]);return r(Y,{style:o.wrapper,children:[e(A,{style:o.title,children:"Science"}),r(t,{groupName:"science-classes",onChange:l,selectedValues:a,style:o.group,children:[e(s,{label:"Biology",value:"1",style:o.choice}),e(s,{label:"AP®︎ Biology",value:"2",style:o.choice}),e(s,{label:"High school biology",value:"3",style:o.choice}),e(s,{label:"Cosmology and astronomy",value:"4",style:o.choice}),e(s,{label:"Electrical engineering",value:"5",style:o.choice}),e(s,{label:"Health and medicine",value:"6",style:o.choice})]})]})};p.parameters={docs:{description:{story:`This example shows how one can add custom styles
        to the checkbox group and to each component to achieve desired custom
        layouts. The context in this example is inspired by the class selector
        modal. The label is created separately because we are reflowing all
        the elements in the group to row. The checkboxes render
        horizontally when the style on the \`CheckboxGroup\` is set to
        \`{flexDirection: "row"}\`. Here, \`{flexWrap: "wrap"}\` is also
        used so the options continue on the next line.`}}};const u=()=>{const[a,l]=n.useState([]);return r(t,{label:e(A,{children:"Select all prime numbers"}),description:e(j,{style:o.description,children:"Hint: There is at least one prime number"}),groupName:"science-classes",onChange:l,selectedValues:a,children:[e(s,{label:"1",value:"1-mc-styling",style:o.multipleChoice}),e(s,{label:"2",value:"2-mc-styling",style:o.multipleChoice}),e(s,{label:"3",value:"3-mc-styling",style:o.multipleChoice}),e(s,{label:"4",value:"4-mc-styling",style:o.multipleChoice}),e(s,{label:"5",value:"5-mc-styling",style:[o.multipleChoice,o.last]})]})};u.parameters={docs:{description:{story:`This example shows how to use custom styling
        to change the appearance of the checkbox group to look more like
        a multiple choice question. You may also provide custom typography
        to the label and description. Here, there is a line in
        between each question, which is achieved using the
        \`{borderTop: "solid 1px #CCC"}\` style on each \`Choice\`
        component.`}}};const h=()=>{const[a,l]=n.useState(["pepperoni-4","sausage-4"]);return r(t,{groupName:"pizza",onChange:l,selectedValues:a,label:"Pizza toppings",children:[e(s,{label:"Pepperoni",value:"pepperoni-4"}),e(s,{label:"Sausage",value:"sausage-4",description:"Imported from Italy"}),e(s,{label:"Extra cheese",value:"cheese-4"}),e(s,{label:"Green pepper",value:"pepper-4"}),null]})};h.parameters={docs:{description:{story:`This example shows that children can be falsy values and
        that those falsy values are filtered out when rendering children.  In this
        case, one of the children is \`{false && <Choice .../>}\` which results in
        that choice (Mushroom) being filtered out.`}},chromatic:{disableSnapshot:!0}};const o=_.StyleSheet.create({wrapper:{width:650},group:{flexDirection:"row",flexWrap:"wrap"},choice:{marginTop:g.xSmall_8,width:200},title:{paddingBottom:g.xSmall_8,borderBottom:`1px solid ${b.offBlack64}`},multipleChoice:{margin:0,height:48,borderTop:"solid 1px #CCC",justifyContent:"center"},description:{color:b.offBlack64},last:{borderBottom:"solid 1px #CCC"}});var C,v,S;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => {
    return <CheckboxGroup {...args}>
                <Choice label="Pepperoni" value="pepperoni-1" />
                <Choice label="Sausage" value="sausage-1" description="Imported from Italy" />
                <Choice label="Extra cheese" value="cheese-1" />
                <Choice label="Green pepper" value="pepper-1" />
                <Choice label="Mushroom" value="mushroom-1" />
            </CheckboxGroup>;
  },
  args: {
    // Required
    groupName: "toppings",
    selectedValues: ["pepperoni-1", "sausage-1"],
    onChange: () => {},
    // Optional
    label: "Pizza toppings",
    description: "Choose as many toppings as you would like."
  }
}`,...(S=(v=d.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var x,f,V;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);
  return <CheckboxGroup groupName="toppings" onChange={setSelectedValues} selectedValues={selectedValues}>
            <Choice label="Pepperoni" value="pepperoni-2" />
            <Choice label="Sausage" value="sausage-2" description="Imported from Italy" />
            <Choice label="Extra cheese" value="cheese-2" />
            <Choice label="Green pepper" value="pepper-2" />
            <Choice label="Mushroom" value="mushroom-2" />
        </CheckboxGroup>;
}`,...(V=(f=i.parameters)==null?void 0:f.docs)==null?void 0:V.source}}};var k,w,E;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const toppingsError = "You have selected too many toppings";
  const [selectedValues, setSelectedValues] = React.useState(["pepperoni-3", "sausage-3", "cheese-3", "pepper-3"]);
  const [error, setError] = React.useState(toppingsError);

  // Returns an error message if more than 3 items are selected,
  // and it returns undefined otherwise. We use undefined instead of
  // null here because null would result in a type error, whereas
  // undefined would be the same as not passing in anything to the
  // checkbox group's \`errorMessage\` prop.
  const checkForError = (input: Array<string>) => {
    if (input.length > 3) {
      return toppingsError;
    }
  };
  const handleChange = (input: Array<string>) => {
    const errorMessage = checkForError(input);
    setSelectedValues(input);
    // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'SetStateAction<string>'.
    setError(errorMessage);
  };
  return <CheckboxGroup label="Pizza order" groupName="toppings" description="You may choose at most three toppings" onChange={handleChange} errorMessage={error} selectedValues={selectedValues}>
            <Choice label="Pepperoni" value="pepperoni-3" />
            <Choice label="Sausage" value="sausage-3" description="Imported from Italy" />
            <Choice label="Extra cheese" value="cheese-3" />
            <Choice label="Green pepper" value="pepper-3" />
            <Choice label="Mushroom" value="mushroom-3" />
        </CheckboxGroup>;
}`,...(E=(w=c.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var G,I,M;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);
  return <View style={styles.wrapper}>
            <LabelLarge style={styles.title}>Science</LabelLarge>
            <CheckboxGroup groupName="science-classes" onChange={setSelectedValues} selectedValues={selectedValues} style={styles.group}>
                <Choice label="Biology" value="1" style={styles.choice} />
                <Choice label="AP®︎ Biology" value="2" style={styles.choice} />
                <Choice label="High school biology" value="3" style={styles.choice} />
                <Choice label="Cosmology and astronomy" value="4" style={styles.choice} />
                <Choice label="Electrical engineering" value="5" style={styles.choice} />
                <Choice label="Health and medicine" value="6" style={styles.choice} />
            </CheckboxGroup>
        </View>;
}`,...(M=(I=p.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var z,P,T;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);
  return <CheckboxGroup label={<LabelLarge>Select all prime numbers</LabelLarge>} description={<LabelXSmall style={styles.description}>
                    Hint: There is at least one prime number
                </LabelXSmall>} groupName="science-classes" onChange={setSelectedValues} selectedValues={selectedValues}>
            <Choice label="1" value="1-mc-styling" style={styles.multipleChoice} />
            <Choice label="2" value="2-mc-styling" style={styles.multipleChoice} />
            <Choice label="3" value="3-mc-styling" style={styles.multipleChoice} />
            <Choice label="4" value="4-mc-styling" style={styles.multipleChoice} />
            <Choice label="5" value="5-mc-styling" style={[styles.multipleChoice, styles.last]} />
        </CheckboxGroup>;
}`,...(T=(P=u.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var L,B,N;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>(["pepperoni-4", "sausage-4"]);
  return <CheckboxGroup groupName="pizza" onChange={setSelectedValues} selectedValues={selectedValues} label="Pizza toppings">
            <Choice label="Pepperoni" value="pepperoni-4" />
            <Choice label="Sausage" value="sausage-4" description="Imported from Italy" />
            <Choice label="Extra cheese" value="cheese-4" />
            <Choice label="Green pepper" value="pepper-4" />
            {/* eslint-disable-next-line no-constant-condition */}
            {false ? <Choice label="Mushroom" value="mushroom-4" /> : null}
        </CheckboxGroup>;
}`,...(N=(B=h.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};const pe=["Default","Basic","Error","RowStyling","MultipleChoiceStyling","FiltersOutFalsyChildren"];export{i as Basic,d as Default,c as Error,h as FiltersOutFalsyChildren,u as MultipleChoiceStyling,p as RowStyling,pe as __namedExportsOrder,ce as default};
//# sourceMappingURL=checkbox-group.stories-c03c9299.js.map
