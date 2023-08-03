import{a as e,j as ye}from"./jsx-runtime-309e447d.js";import{r as n}from"./index-9f32f44c.js";import{V as d,l as Me}from"./render-state-root-891c0d56.js";import{B as Ve}from"./button-b2794e32.js";import{C as i,S as m}from"./index-f641b98f.js";import{b as ve}from"./labeled-text-field-d77d5301.js";import{M as Oe,O as Te}from"./one-pane-dialog-da34165b.js";import{b as De}from"./footnote-761d2bcc.js";import{M as u,d as fe,O as l}from"./multi-select-4619a451.js";import{C as Ae}from"./component-info-cedbe096.js";import{p as T}from"./package-5a33a824.js";import{m as Ie}from"./base-select.argtypes-11c39909.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./radio-0fc824b1.js";import"./strut-c6011196.js";import"./index-9c2d1831.js";import"./with-action-scheduler-7e779422.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";import"./search-field-66099b8d.js";import"./assertThisInitialized-081f9914.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";const ct={title:"Dropdown / MultiSelect",component:u,argTypes:Ie,args:{isFilterable:!1,opened:!1,disabled:!1,light:!1,shortcuts:!1,implicitAllEnabled:!1,id:"",testId:""},decorators:[t=>e(d,{style:o.example,children:e(t,{})})],parameters:{componentSubtitle:e(Ae,{name:T.name,version:T.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}}},o=Me.StyleSheet.create({example:{background:i.offWhite,padding:m.medium_16},setWidth:{minWidth:170,width:"100%"},customDropdown:{maxHeight:200},wrapper:{height:"400px",width:"600px"},centered:{alignItems:"center",justifyContent:"center"},scrolledWrapper:{height:200,overflow:"auto",border:"1px solid grey",borderRadius:m.xxxSmall_4,margin:m.xSmall_8,padding:m.medium_16},scrollableArea:{height:"200vh"},customOpener:{borderLeft:`5px solid ${i.blue}`,borderRadius:m.xxxSmall_4,background:i.lightBlue,color:i.white,padding:m.medium_16},focused:{color:i.offWhite},hovered:{textDecoration:"underline",color:i.offWhite,cursor:"pointer"},pressed:{color:i.blue}}),O=[e(l,{label:"Mercury",value:"1"},1),e(l,{label:"Venus",value:"2"},2),e(l,{label:"Earth",value:"3",disabled:!0},3),e(l,{label:"Mars",value:"4"},4),e(l,{label:"Jupiter",value:"5"},5),e(l,{label:"Saturn",value:"6"},6),e(l,{label:"Neptune",value:"7"},7),e(l,{label:"Uranus",value:"8"},8)],f=t=>{const[s,c]=n.useState(t.selectedValues),[r,a]=n.useState(t.opened);return n.useEffect(()=>{a(t.opened)},[t.opened]),e(d,{style:o.wrapper,children:e(u,{...t,onChange:c,selectedValues:s,opened:r,onToggle:a,children:O})})},v={render:f},We=t=>{const[s,c]=n.useState([]),[r,a]=n.useState(!!t.opened);return n.useEffect(()=>{a(!!t.opened)},[t.opened]),ye(d,{style:o.wrapper,children:[e(ve,{label:"Open",onChange:a,checked:r}),e(u,{...t,onChange:c,selectedValues:s,opened:r,onToggle:a,children:O})]})},y={render:t=>e(We,{...t}),args:{opened:!0}};y.storyName="Controlled (opened)";y.parameters={docs:{description:{story:"Sometimes you'll want to trigger a dropdown programmatically. This can be done by `MultiSelect` is a controlled component. The parent is responsible for managing the opening/closing of the dropdown when using this prop.\n\nThis means that you'll also have to update `opened` to the value triggered by the `onToggle` prop."}},chromatic:{delay:500}};const we={...fe,noneSelected:"Solar system",someSelected:t=>`${t} planets`},C={render:f,args:{labels:we,dropdownStyle:o.customDropdown,style:o.setWidth}};C.parameters={docs:{description:{story:"Sometimes, we may want to customize the dropdown style (for example, to limit the height of the list). For this purpose, we have the `dropdownStyle` prop."}},chromatic:{disableSnapshot:!0}};const x={render:f,args:{labels:we,dropdownStyle:o.customDropdown,style:o.setWidth,opened:!0},name:"Custom styles (opened)"};x.parameters={docs:{description:{story:"Here you can see an example of the previous dropdown opened"}}};const h={render:f,args:{shortcuts:!0,opened:!0}};h.parameters={docs:{description:{story:"This example starts with one item selected and has selection shortcuts for select all and select none. This one does not have a predefined placeholder."}}};const Le=t=>{const[s,c]=n.useState([]),[r,a]=n.useState(!0),w=e(d,{style:o.scrollableArea,children:e(d,{style:o.scrolledWrapper,children:e(d,{style:{minHeight:"100vh"},children:e(u,{...t,onChange:c,isFilterable:!0,opened:r,onToggle:a,selectedValues:s,children:O})})})}),Ce=e(Te,{title:"Dropdown in a Modal",content:w});return e(d,{style:o.centered,children:e(Oe,{modal:Ce,children:({openModal:xe})=>e(Ve,{onClick:xe,children:"Click here!"})})})},M={render:t=>e(Le,{...t}),name:"Dropdown in a modal"};M.parameters={docs:{description:{story:"Sometimes we want to include Dropdowns inside a Modal, and these controls can be accessed only by scrolling down. This example help us to demonstrate that `MultiSelect` components can correctly be displayed within the visible scrolling area."}},chromatic:{disableSnapshot:!0}};const g=()=>ye(u,{disabled:!0,onChange:()=>{},children:[e(l,{label:"Mercury",value:"1"}),e(l,{label:"Venus",value:"2"})]});g.parameters={docs:{storyDescription:"`MultiSelect` can be disabled by passing `disabled={true}`. This can be useful when you want to disable a control temporarily."}};const S={render:f,args:{implicitAllEnabled:!0,labels:{...fe,someSelected:t=>`${t} fruits`,allSelected:"All planets selected"}}};S.parameters={docs:{description:{story:`When nothing is selected, show the menu text as "All selected". Note that the actual selection logic doesn't change. (Only the menu text)`}},chromatic:{disableSnapshot:!0}};const D=["banana","strawberry","pear","orange"],ke=new Array(1e3).fill(null).map((t,s)=>e(l,{value:(s+1).toString(),label:`Fruit # ${s+1} ${D[s%D.length]}`},s)),Ee=function(t){const[s,c]=n.useState([]),[r,a]=n.useState(t.opened||!1);return e(d,{style:o.wrapper,children:e(u,{onChange:c,shortcuts:!0,isFilterable:!0,opened:r,onToggle:a,selectedValues:s,children:ke})})},p=()=>e(Ee,{opened:!0});p.storyName="Virtualized (isFilterable)";p.parameters={docs:{description:{story:"When there are many options, you could use a search filter in the `MultiSelect`. The search filter will be performed toward the labels of the option items. Note that this example shows how we can add custom styles to the dropdown as well."}}};const b={render:f,args:{selectedValues:[],opener:({focused:t,hovered:s,pressed:c,text:r})=>e(De,{onClick:()=>{console.log("custom click!!!!!")},style:[o.customOpener,t&&o.focused,s&&o.hovered,c&&o.pressed],children:r})},name:"With custom opener"};b.parameters={docs:{description:{story:"In case you need to use a custom opener with the `MultiSelect`, you can use the opener property to achieve this. In this example, the opener prop accepts a function with the following arguments:\n- `eventState`: lets you customize the style for different states, such as pressed, hovered and focused.\n- `text`: Passes the menu label defined in the parent component. This value is passed using the placeholder prop set in the `MultiSelect` component.\n\n**Note:** If you need to use a custom ID for testing the opener, make sure to pass the testId prop inside the opener component/element."}}};const Fe=new Array(10).fill(null).map((t,s)=>e(l,{value:(s+1).toString(),label:`Escuela # ${s+1}`},s)),V=()=>{const[t,s]=n.useState([]),[c,r]=n.useState(!0),a={clearSearch:"Limpiar busqueda",filter:"Filtrar",noResults:"Sin resultados",selectAllLabel:w=>`Seleccionar todas (${w})`,selectNoneLabel:"No seleccionar ninguno",noneSelected:"0 escuelas seleccionadas",allSelected:"Todas las escuelas",someSelected:w=>`${w} escuelas seleccionadas`};return e(d,{style:o.wrapper,children:e(u,{shortcuts:!0,isFilterable:!0,onChange:s,selectedValues:t,labels:a,opened:c,onToggle:r,children:Fe})})};V.parameters={docs:{description:{story:"This example illustrates how you can pass custom labels to the MultiSelect component."}}};var A,I,W;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: Template
}`,...(W=(I=v.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var L,k,E;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <ControlledWrapper {...args} />,
  args: ({
    opened: true
  } as MultiSelectArgs)
}`,...(E=(k=y.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var F,_,$;C.parameters={...C.parameters,docs:{...(F=C.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: Template,
  args: ({
    labels: dropdownLabels,
    dropdownStyle: styles.customDropdown,
    style: styles.setWidth
  } as MultiSelectArgs)
}`,...($=(_=C.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var N,z,H;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: Template,
  args: ({
    labels: dropdownLabels,
    dropdownStyle: styles.customDropdown,
    style: styles.setWidth,
    opened: true
  } as MultiSelectArgs),
  name: "Custom styles (opened)"
}`,...(H=(z=x.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var R,B,j,q,P;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: Template,
  args: ({
    shortcuts: true,
    opened: true
  } as MultiSelectArgs)
}`,...(j=(B=h.parameters)==null?void 0:B.docs)==null?void 0:j.source},description:{story:"With shortcuts",...(P=(q=h.parameters)==null?void 0:q.docs)==null?void 0:P.description}}};var J,U,G;M.parameters={...M.parameters,docs:{...(J=M.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: args => <DropdownInModalWrapper {...args} />,
  name: "Dropdown in a modal"
}`,...(G=(U=M.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var K,Q,X,Y,Z;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`() => <MultiSelect disabled={true} onChange={() => {}}>
        <OptionItem label="Mercury" value="1" />
        <OptionItem label="Venus" value="2" />
    </MultiSelect>`,...(X=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:X.source},description:{story:"Disabled",...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.description}}};var ee,te,se,oe,re;S.parameters={...S.parameters,docs:{...(ee=S.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: Template,
  args: ({
    implicitAllEnabled: true,
    labels: {
      ...defaultLabels,
      someSelected: (numSelectedValues: number) => \`\${numSelectedValues} fruits\`,
      allSelected: "All planets selected"
    }
  } as MultiSelectArgs)
}`,...(se=(te=S.parameters)==null?void 0:te.docs)==null?void 0:se.source},description:{story:"ImplicitAll enabled",...(re=(oe=S.parameters)==null?void 0:oe.docs)==null?void 0:re.description}}};var ae,le,ne,ce,de;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:"() => <VirtualizedMultiSelect opened={true} />",...(ne=(le=p.parameters)==null?void 0:le.docs)==null?void 0:ne.source},description:{story:"Virtualized MultiSelect",...(de=(ce=p.parameters)==null?void 0:ce.docs)==null?void 0:de.description}}};var ie,pe,ue,me,he;b.parameters={...b.parameters,docs:{...(ie=b.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: Template,
  args: ({
    selectedValues: [],
    opener: ({
      focused,
      hovered,
      pressed,
      text
    }: any) => <HeadingLarge onClick={() => {
      // eslint-disable-next-line no-console
      console.log("custom click!!!!!");
    }} style={[styles.customOpener, focused && styles.focused, hovered && styles.hovered, pressed && styles.pressed]}>
                {text}
            </HeadingLarge>
  } as MultiSelectArgs),
  name: "With custom opener"
}`,...(ue=(pe=b.parameters)==null?void 0:pe.docs)==null?void 0:ue.source},description:{story:"Custom opener",...(he=(me=b.parameters)==null?void 0:me.docs)==null?void 0:he.description}}};var ge,Se,be;V.parameters={...V.parameters,docs:{...(ge=V.parameters)==null?void 0:ge.docs,source:{originalSource:`() => {
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);
  const [opened, setOpened] = React.useState(true);
  const labels: Labels = {
    clearSearch: "Limpiar busqueda",
    filter: "Filtrar",
    noResults: "Sin resultados",
    selectAllLabel: numOptions => \`Seleccionar todas (\${numOptions})\`,
    selectNoneLabel: "No seleccionar ninguno",
    noneSelected: "0 escuelas seleccionadas",
    allSelected: "Todas las escuelas",
    someSelected: numSelectedValues => \`\${numSelectedValues} escuelas seleccionadas\`
  };
  return <View style={styles.wrapper}>
            <MultiSelect shortcuts={true} isFilterable={true} onChange={setSelectedValues} selectedValues={selectedValues} labels={labels} opened={opened} onToggle={setOpened}>
                {translatedItems}
            </MultiSelect>
        </View>;
}`,...(be=(Se=V.parameters)==null?void 0:Se.docs)==null?void 0:be.source}}};const dt=["Default","ControlledOpened","CustomStyles","CustomStylesOpened","Shortcuts","DropdownInModal","Disabled","ImplicitAllEnabled","VirtualizedFilterable","CustomOpener","CustomLabels"];export{y as ControlledOpened,V as CustomLabels,b as CustomOpener,C as CustomStyles,x as CustomStylesOpened,v as Default,g as Disabled,M as DropdownInModal,S as ImplicitAllEnabled,h as Shortcuts,p as VirtualizedFilterable,dt as __namedExportsOrder,ct as default};
//# sourceMappingURL=multi-select.stories-976b4b45.js.map
