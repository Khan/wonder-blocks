import{a as e,j as M}from"./jsx-runtime-309e447d.js";import{V as u,l as A}from"./render-state-root-891c0d56.js";import{a as N}from"./chunk-AY7I2SME-c7b6cf8a.js";import{S as d,C as U}from"./index-f641b98f.js";import"./index-9f32f44c.js";import"./icon-a4f17d53.js";import{h as H,s as n,d as O,b as P,a as q}from"./icon-assets-a0b49981.js";import{S as m}from"./strut-c6011196.js";import{I as o}from"./icon-button-297fafd1.js";import{C as F}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./button-b2794e32.js";import"./footnote-761d2bcc.js";const G="@khanacademy/wonder-blocks-icon-button",J="4.1.0",K="v1",Q={access:"public"},X="",Y="dist/index.js",Z="dist/es/index.js",$="dist/index.d.ts",ee={test:'echo "Error: no test specified" && exit 1'},oe="",re="MIT",ne={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-clickable":"^3.1.1","@khanacademy/wonder-blocks-color":"^2.0.1","@khanacademy/wonder-blocks-core":"^5.3.0","@khanacademy/wonder-blocks-icon":"^2.0.14"},ie={aphrodite:"^1.2.5",react:"16.14.0","react-router":"5.2.1","react-router-dom":"5.3.0"},ae={"wb-dev-build-settings":"^0.9.7"},k={name:G,version:J,design:K,publishConfig:Q,description:X,main:Y,module:Z,types:$,scripts:ee,author:oe,license:re,dependencies:ne,peerDependencies:ie,devDependencies:ae},xe={title:"IconButton / IconButton",component:o,parameters:{componentSubtitle:e(F,{name:k.name,version:k.version})},argTypes:{icon:{options:H}}},p={args:{icon:n,color:"default",kind:"primary",onClick:r=>{console.log("Click!"),N("clicked")(r)}}},i=()=>e(o,{icon:n,onClick:()=>console.log("Click!")});i.parameters={docs:{description:{story:"Minimal icon button. The only props specified in\n            this example are `icon` and `onClick`."}}};const a=()=>M(u,{style:{flexDirection:"row"},children:[e(o,{icon:n,"aria-label":"search",onClick:r=>console.log("Click!")}),e(m,{size:d.medium_16}),e(o,{icon:n,"aria-label":"search",kind:"secondary",onClick:r=>console.log("Click!")}),e(m,{size:d.medium_16}),e(o,{icon:n,"aria-label":"search",kind:"tertiary",onClick:r=>console.log("Click!")}),e(m,{size:d.medium_16}),e(o,{disabled:!0,icon:n,"aria-label":"search",onClick:r=>console.log("Click!")})]});a.parameters={docs:{description:{story:"In this example, we have primary, secondary,\n            tertiary, and disabled `IconButton`s from left to right."}}};const t=()=>e(u,{style:h.dark,children:e(o,{icon:n,"aria-label":"search",light:!0,onClick:r=>console.log("Click!")})});t.parameters={docs:{description:{story:"An IconButton on a dark background.\n            Only the primary kind is allowed to have the `light`\n            prop set to true."}}};const s=()=>e(u,{style:h.dark,children:e(o,{disabled:!0,icon:n,"aria-label":"search",light:!0,onClick:r=>console.log("Click!")})});s.parameters={docs:{description:{story:"This is a disabled icon button with the `light` prop set to true."}}};const c=()=>e(o,{icon:O,"aria-label":"More information",href:"/",target:"_blank",onClick:r=>console.log("Click!")});c.parameters={docs:{description:{story:'This example has an `href` prop in addition to the\n            `onClick` prop. `href` takes a URL or path, and clicking the\n            icon button will result in a navigation to the specified page.\n            Note that `onClick` is not required if `href` is defined.\n            The `target="_blank"` prop will cause the href page to open in\n            a new tab.'}}};const l=()=>M(u,{style:h.arrowsWrapper,children:[e(o,{icon:P,onClick:r=>console.log("Click!"),"aria-label":"Previous page"}),e(o,{icon:q,onClick:r=>console.log("Click!"),"aria-label":"Next page"})]});l.parameters={docs:{description:{story:`By default, the icon buttons do not have
            accessible names. The \`aria-label\` prop must be used to explain
            the function of the button. Remember to keep the description
            concise but understandable.`}}};const h=A.StyleSheet.create({dark:{backgroundColor:U.darkBlue,padding:d.medium_16},arrowsWrapper:{flexDirection:"row",justifyContent:"space-between",width:d.xxxLarge_64}});var g,b,C;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    icon: icons.search,
    color: "default",
    kind: "primary",
    onClick: (e: React.SyntheticEvent) => {
      console.log("Click!");
      action("clicked")(e);
    }
  }
}`,...(C=(b=p.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var f,y,w;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  return <IconButton icon={icons.search} onClick={() => console.log("Click!")} />;
}`,...(w=(y=i.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var x,S,B;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  return <View style={{
    flexDirection: "row"
  }}>
            <IconButton icon={icons.search} aria-label="search" onClick={e => console.log("Click!")} />
            <Strut size={Spacing.medium_16} />
            <IconButton icon={icons.search} aria-label="search" kind="secondary" onClick={e => console.log("Click!")} />
            <Strut size={Spacing.medium_16} />
            <IconButton icon={icons.search} aria-label="search" kind="tertiary" onClick={e => console.log("Click!")} />
            <Strut size={Spacing.medium_16} />
            <IconButton disabled={true} icon={icons.search} aria-label="search" onClick={e => console.log("Click!")} />
        </View>;
}`,...(B=(S=a.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var I,v,_;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  return <View style={styles.dark}>
            <IconButton icon={icons.search} aria-label="search" light={true} onClick={e => console.log("Click!")} />
        </View>;
}`,...(_=(v=t.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var V,D,L;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  return <View style={styles.dark}>
            <IconButton disabled={true} icon={icons.search} aria-label="search" light={true} onClick={e => console.log("Click!")} />
        </View>;
}`,...(L=(D=s.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var T,j,z;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  return <IconButton icon={icons.info} aria-label="More information" href="/" target="_blank" onClick={e => console.log("Click!")} />;
}`,...(z=(j=c.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var R,W,E;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  return <View style={styles.arrowsWrapper}>
            <IconButton icon={icons.caretLeft} onClick={e => console.log("Click!")} aria-label="Previous page" />
            <IconButton icon={icons.caretRight} onClick={e => console.log("Click!")} aria-label="Next page" />
        </View>;
}`,...(E=(W=l.parameters)==null?void 0:W.docs)==null?void 0:E.source}}};const Se=["Default","Basic","Variants","Light","DisabledLight","UsingHref","WithAriaLabel"];export{i as Basic,p as Default,s as DisabledLight,t as Light,c as UsingHref,a as Variants,l as WithAriaLabel,Se as __namedExportsOrder,xe as default};
//# sourceMappingURL=icon-button.stories-7ed8e007.js.map
