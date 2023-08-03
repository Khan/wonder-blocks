import{a as e,j as s,F as N}from"./jsx-runtime-309e447d.js";import{r as d}from"./index-9f32f44c.js";import{l as Y}from"./render-state-root-891c0d56.js";import{a as T}from"./footnote-761d2bcc.js";import{R as l,C as a}from"./labeled-text-field-d77d5301.js";import{p as m}from"./package-55b6077d.js";import{C as A}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./radio-0fc824b1.js";import"./index-f641b98f.js";import"./strut-c6011196.js";import"./icon-a4f17d53.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";const re={title:"Form / RadioGroup",component:l,parameters:{componentSubtitle:e(A,{name:m.name,version:m.version})}},h={render:r=>s(l,{...r,children:[e(a,{label:"Bulbasaur",value:"bulbasaur-1"}),e(a,{label:"Charmander",value:"charmander-1",description:"Oops, we ran out of Charmanders",disabled:!0}),e(a,{label:"Squirtle",value:"squirtle-1"}),e(a,{label:"Pikachu",value:"pikachu-1"})]}),args:{groupName:"pokemon",selectedValue:"bulbasaur-1",onChange:()=>{},label:"Pokemon",description:"Your first Pokemon."}},n=()=>{const[r,o]=d.useState("");return s(l,{groupName:"pokemon",label:"Pokemon",description:"Your first Pokemon.",onChange:o,selectedValue:r,children:[e(a,{label:"Bulbasaur",value:"bulbasaur-2"}),e(a,{label:"Charmander",value:"charmander-2",description:"Oops, we ran out of Charmanders",disabled:!0}),e(a,{label:"Squirtle",value:"squirtle-2"}),e(a,{label:"Pikachu",value:"pikachu-2"})]})};n.parameters={docs:{description:{story:"This is a basic example of a radio group.\n        The Wonder Blocks `RadioGroup` component takes `Choice`\n        components as children. One of the `Choice` components here\n        includes a description."}}};const i=()=>{const r="You must select an option to continue.",[o,x]=d.useState(""),[G,O]=d.useState(r),F=p=>{if(!p)return r};return s(l,{groupName:"pokemon",label:"Pokemon",description:"Your first Pokemon.",onChange:p=>{const M=F(p);x(p),O(M)},selectedValue:o,errorMessage:G,children:[e(a,{label:"Bulbasaur",value:"bulbasaur-3"}),e(a,{label:"Charmander",value:"charmander-3"}),e(a,{label:"Squirtle",value:"squirtle-3"}),e(a,{label:"Pikachu",value:"pikachu-3"})]})};i.parameters={docs:{description:{story:`This is what a radio group looks like
        if it has an error. It displays the error that is passed into the
        \`errorMessage\` prop, provided the error is not null. It also
        uses the error styling for all the radio buttons. Here, the error
        message is saved as a state, updated in the change handler, and then
        passed in as the \`errorMessage\` prop.`}}};const u=()=>{const[r,o]=d.useState("");return s(N,{children:[e(T,{style:t.prompt,children:"Select your blood type"}),s(l,{groupName:"science-classes",onChange:o,selectedValue:r,children:[e(a,{label:"A",value:"1",style:t.choice}),e(a,{label:"B",value:"2",style:t.choice}),e(a,{label:"AB",value:"3",style:t.choice}),e(a,{label:"O",value:"4",style:[t.choice,t.lastChoice]})]})]})};u.parameters={docs:{description:{story:`This example shows how to use custom styling
        to change the appearance of the radio group to look more like
        a multiple choice question. Here, there is a line in
        between each question, which is achieved using the
        \`{borderTop: "solid 1px #CCC"}\` style on each \`Choice\`
        component.`}}};const c=()=>{const[r,o]=d.useState("bulbasaur-4");return s(l,{groupName:"pokemon",onChange:o,selectedValue:r,label:"Pokemon",description:"Your first Pokemon.",children:[e(a,{label:"Bulbasaur",value:"bulbasaur-4"}),e(a,{label:"Charmander",value:"charmander-4",description:"Oops, we ran out of Charmanders",disabled:!0}),e(a,{label:"Squirtle",value:"squirtle-4"}),null]})};c.parameters={docs:{description:{story:`This example shows that children can be falsy values and
        that those falsy values are filtered out when rendering children.  In this
        case, one of the children is \`{false && <Choice .../>}\` which results in
        that choice (Pikachu) being filtered out.`}},chromatic:{disableSnapshot:!0}};const t=Y.StyleSheet.create({choice:{margin:0,height:48,borderTop:"solid 1px #CCC",justifyContent:"center"},lastChoice:{borderBottom:"solid 1px #CCC"},prompt:{marginBottom:16}});var b,C,g;h.parameters={...h.parameters,docs:{...(b=h.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => {
    return <RadioGroup {...args}>
                <Choice label="Bulbasaur" value="bulbasaur-1" />
                <Choice label="Charmander" value="charmander-1" description="Oops, we ran out of Charmanders" disabled />
                <Choice label="Squirtle" value="squirtle-1" />
                <Choice label="Pikachu" value="pikachu-1" />
            </RadioGroup>;
  },
  args: {
    // Required
    groupName: "pokemon",
    selectedValue: "bulbasaur-1",
    onChange: () => {},
    // Optional
    label: "Pokemon",
    description: "Your first Pokemon."
  }
}`,...(g=(C=h.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};var f,k,v;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const [selectedValue, setSelectedValue] = React.useState("");
  return <RadioGroup groupName="pokemon" label="Pokemon" description="Your first Pokemon." onChange={setSelectedValue} selectedValue={selectedValue}>
            <Choice label="Bulbasaur" value="bulbasaur-2" />
            <Choice label="Charmander" value="charmander-2" description="Oops, we ran out of Charmanders" disabled />
            <Choice label="Squirtle" value="squirtle-2" />
            <Choice label="Pikachu" value="pikachu-2" />
        </RadioGroup>;
}`,...(v=(k=n.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var S,y,V;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const emptyError = "You must select an option to continue.";
  const [selectedValue, setSelectedValue] = React.useState("");
  const [error, setError] = React.useState(emptyError);

  // This returns an error message if no option is selected,
  // and it returns undefined otherwise. We use undefined instead of
  // null here because null would result in a type error, whereas
  // undefined would be the same as not passing in anything to the
  // radio group's \`errorMessage\` prop.
  const checkForError = (input: string) => {
    if (!input) {
      return emptyError;
    }
  };
  const handleChange = (input: string) => {
    const errorMessage = checkForError(input);
    setSelectedValue(input);
    // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'SetStateAction<string>'.
    setError(errorMessage);
  };
  return <RadioGroup groupName="pokemon" label="Pokemon" description="Your first Pokemon." onChange={handleChange} selectedValue={selectedValue} errorMessage={error}>
            <Choice label="Bulbasaur" value="bulbasaur-3" />
            <Choice label="Charmander" value="charmander-3" />
            <Choice label="Squirtle" value="squirtle-3" />
            <Choice label="Pikachu" value="pikachu-3" />
        </RadioGroup>;
}`,...(V=(y=i.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};var P,R,q;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const [selectedValue, setSelectedValue] = React.useState("");
  return <>
            <LabelLarge style={styles.prompt}>
                Select your blood type
            </LabelLarge>
            <RadioGroup groupName="science-classes" onChange={setSelectedValue} selectedValue={selectedValue}>
                <Choice label="A" value="1" style={styles.choice} />
                <Choice label="B" value="2" style={styles.choice} />
                <Choice label="AB" value="3" style={styles.choice} />
                <Choice label="O" value="4" style={[styles.choice, styles.lastChoice]} />
            </RadioGroup>
        </>;
}`,...(q=(R=u.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var w,B,E;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const [selectedValue, setSelectedValue] = React.useState("bulbasaur-4");
  return <RadioGroup groupName="pokemon" onChange={setSelectedValue} selectedValue={selectedValue} label="Pokemon" description="Your first Pokemon.">
            <Choice label="Bulbasaur" value="bulbasaur-4" />
            <Choice label="Charmander" value="charmander-4" description="Oops, we ran out of Charmanders" disabled />
            <Choice label="Squirtle" value="squirtle-4" />
            {/* eslint-disable-next-line no-constant-condition */}
            {false ? <Choice label="Pikachu" value="pikachu-4" /> : null}
        </RadioGroup>;
}`,...(E=(B=c.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};const oe=["Default","Basic","Error","MultipleChoiceStyling","FiltersOutFalsyChildren"];export{n as Basic,h as Default,i as Error,c as FiltersOutFalsyChildren,u as MultipleChoiceStyling,oe as __namedExportsOrder,re as default};
//# sourceMappingURL=radio-group.stories-69f0d87b.js.map
