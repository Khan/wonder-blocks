import{a as e,j as ue}from"./jsx-runtime-309e447d.js";import{r as w}from"./index-9f32f44c.js";import{V as S,l as ye}from"./render-state-root-891c0d56.js";import{C as a,S as f}from"./index-f641b98f.js";import{b as be}from"./labeled-text-field-d77d5301.js";import{a as fe}from"./footnote-761d2bcc.js";import{A as y,b as o,a as he,O as C}from"./multi-select-4619a451.js";import{C as we}from"./component-info-cedbe096.js";import{p as x}from"./package-5a33a824.js";import"./_commonjsHelpers-de833af9.js";import"./radio-0fc824b1.js";import"./strut-c6011196.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-assets-a0b49981.js";import"./search-field-66099b8d.js";import"./icon-button-297fafd1.js";import"./with-action-scheduler-7e779422.js";import"./assertThisInitialized-081f9914.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";import"./one-pane-dialog-da34165b.js";import"./button-b2794e32.js";const Se={alignment:{table:{category:"Layout"}},disabled:{table:{category:"States"}},opened:{control:"boolean",table:{category:"States"}},onToggle:{table:{category:"Events"}},onChange:{table:{category:"Events"}},dropdownStyle:{table:{category:"Styling"}},style:{table:{category:"Styling"}},className:{table:{category:"Styling"}}},ge=[e(o,{label:"Profile",href:"http://khanacademy.org/profile",target:"_blank",testId:"profile"}),e(o,{label:"Teacher dashboard",href:"http://khanacademy.org/coach/dashboard",testId:"dashboard"}),e(o,{label:"Settings (onClick)",onClick:()=>console.log("user clicked on settings"),testId:"settings"}),e(o,{label:"Help",disabled:!0,onClick:()=>console.log("this item is disabled..."),testId:"help"}),e(o,{label:"Feedback",disabled:!0,href:"/feedback",testId:"feedback"}),e(he,{}),e(o,{label:"Log out",href:"http://khanacademy.org/logout",testId:"logout"})],ke={alignment:"left",disabled:!1,menuText:"Betsy Appleseed",onChange:()=>{},selectedValues:[],testId:"",dropdownStyle:{},style:{},className:"",children:ge.map((t,n)=>t)},Je={title:"Dropdown / ActionMenu",component:y,subcomponents:{ActionItem:o},argTypes:Se,args:ke,decorators:[t=>e(S,{style:s.example,children:e(t,{})})],parameters:{componentSubtitle:e(we,{name:x.name,version:x.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}}},s=ye.StyleSheet.create({example:{background:a.offWhite,padding:f.medium_16},rowRight:{flexDirection:"row",justifyContent:"flex-end"},row:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},dropdown:{maxHeight:200},customOpener:{borderLeft:`5px solid ${a.blue}`,borderRadius:f.xxxSmall_4,background:a.lightBlue,color:a.white,padding:f.medium_16},focused:{color:a.offWhite},hovered:{textDecoration:"underline",color:a.offWhite,cursor:"pointer"},pressed:{color:a.blue}}),g={};g.parameters={chromatic:{disableSnapshot:!0}};const r={args:{alignment:"right"}};r.decorators=[t=>e(S,{style:s.rowRight,children:t()})];r.parameters={docs:{description:{story:`This menu shows different type of possible items in this type of menu:
1. leads to a different page (the profile).
2. leads to the teacher dashboard.
3. has an onClick callback, which could be used for conversion logging.
4. is a disabled item.
5. is a separator.
6. leads to the logout link.

This menu is also right-aligned.`}},chromatic:{disableSnapshot:!0}};const d={args:{style:{width:100}}};d.parameters={docs:{description:{story:"The text in the menu opener should be truncated with ellipsis at the end and the down caret should be the same size as it is for the other examples."}}};const p=()=>{const[t,n]=w.useState([]),[c,b]=w.useState(!1);return ue(y,{menuText:"Assignments",onChange:k=>{n(k),b(k.includes("in-class"))},selectedValues:t,children:[e(o,{label:"Create...",onClick:()=>console.log("create action")}),e(o,{label:"Edit...",disabled:!0,onClick:()=>console.log("edit action")}),e(o,{label:"Delete",disabled:!0,onClick:()=>console.log("delete action")}),c&&e(o,{label:"Hidden menu for class",disabled:!c,onClick:()=>console.log("hidden menu is clicked!")}),e(he,{}),e(C,{label:"Show homework assignments",value:"homework",onClick:()=>console.log("Show homework assignments toggled")}),e(C,{label:"Show in-class assignments",value:"in-class",onClick:()=>console.log("Show in-class assignments toggled")})]})};p.parameters={docs:{description:{story:"The following menu demonstrates a hybrid menu with both action items and items that can toggle to change the state of the application. The user of this menu must keep track of the state of the selected items."}},chromatic:{disableSnapshot:!0}};const m=()=>e(y,{menuText:"Empty"});m.parameters={docs:{description:{story:"Empty menus are disabled automatically."}}};const u={name:"Custom dropdownStyle",args:{dropdownStyle:s.dropdown}};u.parameters={docs:{description:{story:"This example shows how we can add custom styles to the dropdown menu."}},chromatic:{disableSnapshot:!0}};const h=()=>{const[t,n]=w.useState(!1);return ue(S,{style:s.row,children:[e(be,{label:"Click to toggle",onChange:n,checked:t}),e(y,{menuText:"Betsy Appleseed",opened:t,onToggle:n,children:ge.map((c,b)=>c)})]})};h.parameters={docs:{description:{story:`Sometimes you'll want to trigger a dropdown programmatically. This can be done by setting a value to the opened prop (true or false). In this situation the ActionMenu is a controlled component. The parent is responsible for managing the opening/closing of the dropdown when using this prop.
This means that you'll also have to update opened to the value triggered by the onToggle prop.`}},chromatic:{disableSnapshot:!0}};const i={args:{opener:({focused:t,hovered:n,pressed:c,text:b})=>e(fe,{onClick:()=>{console.log("custom click!!!!!")},testId:"teacher-menu-custom-opener",style:[s.customOpener,t&&s.focused,n&&s.hovered,c&&s.pressed],children:b})}};i.storyName="With custom opener";i.parameters={docs:{description:{story:"In case you need to use a custom opener, you can use the opener property to achieve this. In this example, the opener prop accepts a function with the following arguments:\n- `eventState`: lets you customize the style for different states, such as pressed, hovered and focused.\n- `text`: Passes the menu label defined in the parent component. This value is passed using the placeholder prop set in the ActionMenu component.\n\n**Note:** If you need to use a custom ID for testing the opener, make sure to pass the testId prop inside the opener component/element."}}};const l=()=>e(y,{menuText:"Locales",children:Ce.map(t=>e(o,{label:t.localName,lang:t.locale,testId:"language_picker_"+t.locale},t.locale))});l.storyName="Using the lang attribute";l.parameters={docs:{storyDescription:"You can use the `lang` attribute to specify the language of the action item(s). This is useful if you want to avoid issues with Screen Readers trying to read the proper language for the rendered text."},chromatic:{disableSnapshot:!0}};const Ce=[{id:"az",locale:"az",localName:"Azərbaycanca"},{id:"id",locale:"id",localName:"Bahasa Indonesia"},{id:"cs",locale:"cs",localName:"čeština"},{id:"da",locale:"da",localName:"dansk"},{id:"de",locale:"de",localName:"Deutsch"},{id:"en",locale:"en",localName:"English"},{id:"es",locale:"es",localName:"español"},{id:"fr",locale:"fr",localName:"français"},{id:"it",locale:"it",localName:"italiano"}];var I,A,T;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:"{}",...(T=(A=g.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var O,M,v,N,D;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: ({
    alignment: "right"
  } as Partial<typeof ActionMenu>)
}`,...(v=(M=r.parameters)==null?void 0:M.docs)==null?void 0:v.source},description:{story:"Right-aligned action menu.",...(D=(N=r.parameters)==null?void 0:N.docs)==null?void 0:D.description}}};var E,L,V,H,_;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: ({
    style: {
      width: 100
    }
  } as Partial<typeof ActionMenu>)
}`,...(V=(L=d.parameters)==null?void 0:L.docs)==null?void 0:V.source},description:{story:"Menu with truncated text.",...(_=(H=d.parameters)==null?void 0:H.docs)==null?void 0:_.description}}};var R,W,P,j,z;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);
  const [showHiddenOption, setShowHiddenOption] = React.useState(false);
  const handleChange = (selectedItems: Array<string>) => {
    setSelectedValues(selectedItems);
    setShowHiddenOption(selectedItems.includes("in-class"));
  };
  return <ActionMenu menuText="Assignments" onChange={handleChange} selectedValues={selectedValues}>
            <ActionItem label="Create..." onClick={() => console.log("create action")} />
            <ActionItem label="Edit..." disabled={true} onClick={() => console.log("edit action")} />
            <ActionItem label="Delete" disabled={true} onClick={() => console.log("delete action")} />
            {showHiddenOption && <ActionItem label="Hidden menu for class" disabled={!showHiddenOption} onClick={() => console.log("hidden menu is clicked!")} />}
            <SeparatorItem />
            <OptionItem label="Show homework assignments" value="homework" onClick={() => console.log(\`Show homework assignments toggled\`)} />
            <OptionItem label="Show in-class assignments" value="in-class" onClick={() => console.log(\`Show in-class assignments toggled\`)} />
        </ActionMenu>;
}`,...(P=(W=p.parameters)==null?void 0:W.docs)==null?void 0:P.source},description:{story:"With option items",...(z=(j=p.parameters)==null?void 0:j.docs)==null?void 0:z.description}}};var B,F,U,Y,$;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:'() => <ActionMenu menuText="Empty" />',...(U=(F=m.parameters)==null?void 0:F.docs)==null?void 0:U.source},description:{story:"Empty menu",...($=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:$.description}}};var q,G,J,K,Q;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: "Custom dropdownStyle",
  args: ({
    dropdownStyle: styles.dropdown
  } as Partial<typeof ActionMenu>)
}`,...(J=(G=u.parameters)==null?void 0:G.docs)==null?void 0:J.source},description:{story:"Custom dropdownStyle",...(Q=(K=u.parameters)==null?void 0:K.docs)==null?void 0:Q.description}}};var X,Z,ee,te,oe;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [opened, setOpened] = React.useState(false);
  return <View style={styles.row}>
            <Checkbox label="Click to toggle" onChange={setOpened} checked={opened} />
            <ActionMenu menuText="Betsy Appleseed" opened={opened} onToggle={setOpened}>
                {actionItems.map((actionItem, index) => actionItem)}
            </ActionMenu>
        </View>;
}`,...(ee=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:ee.source},description:{story:"Controlled ActionMenu",...(oe=(te=h.parameters)==null?void 0:te.docs)==null?void 0:oe.description}}};var se,ne,ae,re,ie;i.parameters={...i.parameters,docs:{...(se=i.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: ({
    opener: ({
      focused,
      hovered,
      pressed,
      text
    }: any) => <LabelLarge onClick={() => {
      console.log("custom click!!!!!");
    }} testId="teacher-menu-custom-opener" style={[styles.customOpener, focused && styles.focused, hovered && styles.hovered, pressed && styles.pressed]}>
                {text}
            </LabelLarge>
  } as Partial<typeof ActionMenu>)
}`,...(ae=(ne=i.parameters)==null?void 0:ne.docs)==null?void 0:ae.source},description:{story:"With custom opener",...(ie=(re=i.parameters)==null?void 0:re.docs)==null?void 0:ie.description}}};var le,ce,de,pe,me;l.parameters={...l.parameters,docs:{...(le=l.parameters)==null?void 0:le.docs,source:{originalSource:`() => <ActionMenu menuText="Locales">
        {locales.map(locale => <ActionItem key={locale.locale} label={locale.localName} lang={locale.locale} testId={"language_picker_" + locale.locale} />)}
    </ActionMenu>`,...(de=(ce=l.parameters)==null?void 0:ce.docs)==null?void 0:de.source},description:{story:"Action menu items with lang attribute.",...(me=(pe=l.parameters)==null?void 0:pe.docs)==null?void 0:me.description}}};const Ke=["Default","RightAligned","TruncatedOpener","WithOptionItems","EmptyMenu","CustomDropdownStyle","Controlled","CustomOpener","ActionMenuWithLang"];export{l as ActionMenuWithLang,h as Controlled,u as CustomDropdownStyle,i as CustomOpener,g as Default,m as EmptyMenu,r as RightAligned,d as TruncatedOpener,p as WithOptionItems,Ke as __namedExportsOrder,Je as default};
//# sourceMappingURL=action-menu.stories-ffe9123c.js.map
