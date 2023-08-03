import{a as n,j as w}from"./jsx-runtime-309e447d.js";import{r as d}from"./index-9f32f44c.js";import{V as g,l as P}from"./render-state-root-891c0d56.js";import{a as _}from"./chunk-AY7I2SME-c7b6cf8a.js";import{B as y}from"./button-b2794e32.js";import{S as p,C as R}from"./index-f641b98f.js";import{a as j}from"./footnote-761d2bcc.js";import{S as h}from"./search-field-66099b8d.js";import{C as A}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./icon-button-297fafd1.js";import"./labeled-text-field-d77d5301.js";import"./radio-0fc824b1.js";import"./strut-c6011196.js";import"./icon-assets-a0b49981.js";const I="@khanacademy/wonder-blocks-search-field",M="2.1.4",H="v1",W="Search Field components for Wonder Blocks.",G="dist/index.js",N="dist/es/index.js",O="dist/index.d.ts",U={test:'echo "Error: no test specified" && exit 1'},q="",z="MIT",J={access:"public"},Q={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-color":"^2.0.1","@khanacademy/wonder-blocks-core":"^5.3.0","@khanacademy/wonder-blocks-form":"^4.3.0","@khanacademy/wonder-blocks-icon":"^2.0.14","@khanacademy/wonder-blocks-icon-button":"^4.1.0","@khanacademy/wonder-blocks-spacing":"^4.0.1","@khanacademy/wonder-blocks-typography":"^2.1.0"},X={aphrodite:"^1.2.5",react:"16.14.0"},Y={"wb-dev-build-settings":"^0.9.7"},f={name:I,version:M,design:H,description:W,main:G,module:N,types:O,scripts:U,author:q,license:z,publishConfig:J,dependencies:Q,peerDependencies:X,devDependencies:Y},be={component:h,title:"Search Field/SearchField",args:{disabled:!1,placeholder:"Placeholder"},parameters:{componentSubtitle:n(A,{name:f.name,version:f.version})}},Z=o=>{const[a,s]=d.useState(""),r=t=>{s(t)},e=t=>{t.key==="Enter"&&t.currentTarget.blur()};return n(h,{...o,value:a,onChange:r,onKeyDown:t=>{_("onKeyDown")(t),e(t)}})},m={render:Z},c=()=>{const[o,a]=d.useState(""),s=e=>{a(e)},r=e=>{e.key==="Enter"&&e.currentTarget.blur()};return n(g,{style:$.darkBackground,children:n(h,{value:o,placeholder:"Placeholder",onChange:s,onKeyDown:r,light:!0})})};c.parameters={docs:{description:{story:"SearchField takes a `light` prop, which gives it an extra white ring on focus to make it visible against a dark background."}}};const l=()=>{const[o,a]=d.useState("");return n(h,{value:o,placeholder:"Placeholder",onChange:e=>{a(e)},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()},disabled:!0})};l.parameters={docs:{description:{story:"SearchField takes a `disabled` prop, which makes it unusable. Try to avoid using this if possible as it is bad for accessibility."}}};const i=()=>{const[o,a]=d.useState(""),[s,r]=d.useState(!1),e=u=>{a(u)},t=u=>{u.key==="Enter"&&u.currentTarget.blur()},B=()=>{r(!s)},L=()=>w(g,{style:{flexDirection:"row"},children:[n(y,{onClick:()=>{},children:"Some other focusable element"}),n(h,{value:o,placeholder:"Placeholder",autoFocus:!0,onChange:e,onKeyDown:t,style:{flexGrow:1,marginLeft:p.small_12}})]});return w(g,{children:[n(j,{style:{marginBottom:p.small_12},children:"Press the button to view the search field with autofocus."}),n(y,{onClick:B,style:{width:300,marginBottom:p.large_24},children:"Toggle autoFocus demo"}),s&&n(L,{})]})};i.parameters={docs:{description:{story:`SearchField takes an \`autoFocus\` prop, which
            makes it autofocus on page load. Try to avoid using this if
            possible as it is bad for accessibility.

Press the button
            to view this example. Notice that the search field automatically
            receives focus. Upon pressing the botton, try typing and
            notice that the text appears directly in the search field.
            There is another focusable element present to demonstrate that
            focus skips that element and goes straight to the search field.`}}};const $=P.StyleSheet.create({darkBackground:{background:R.darkBlue,padding:p.medium_16}});var b,k,D;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: Template
}`,...(D=(k=m.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var S,v,C;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <View style={styles.darkBackground}>
            <SearchField value={value} placeholder="Placeholder" onChange={handleChange} onKeyDown={handleKeyDown} light={true} />
        </View>;
}`,...(C=(v=c.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var V,K,F;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <SearchField value={value} placeholder="Placeholder" onChange={handleChange} onKeyDown={handleKeyDown} disabled={true} />;
}`,...(F=(K=l.parameters)==null?void 0:K.docs)==null?void 0:F.source}}};var T,x,E;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const [showDemo, setShowDemo] = React.useState(false);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleShowDemo = () => {
    setShowDemo(!showDemo);
  };
  const AutoFocusDemo = () => <View style={{
    flexDirection: "row"
  }}>
            <Button onClick={() => {}}>Some other focusable element</Button>
            <SearchField value={value} placeholder="Placeholder" autoFocus={true} onChange={handleChange} onKeyDown={handleKeyDown} style={{
      flexGrow: 1,
      marginLeft: Spacing.small_12
    }} />
        </View>;
  return <View>
            <LabelLarge style={{
      marginBottom: Spacing.small_12
    }}>
                Press the button to view the search field with autofocus.
            </LabelLarge>
            <Button onClick={handleShowDemo} style={{
      width: 300,
      marginBottom: Spacing.large_24
    }}>
                Toggle autoFocus demo
            </Button>
            {showDemo && <AutoFocusDemo />}
        </View>;
}`,...(E=(x=i.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};const ke=["Default","Light","Disabled","WithAutofocus"];export{m as Default,l as Disabled,c as Light,i as WithAutofocus,ke as __namedExportsOrder,be as default};
//# sourceMappingURL=search-field.stories-d881048e.js.map
