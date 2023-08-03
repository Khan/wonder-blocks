import{a as e,j as r}from"./jsx-runtime-309e447d.js";import{C as H}from"./index-f641b98f.js";import{V as _}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{c as o}from"./footnote-761d2bcc.js";import{I as n}from"./icon-a4f17d53.js";import{h as R,s,d as O}from"./icon-assets-a0b49981.js";import{C as A}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";const F="@khanacademy/wonder-blocks-icon",G="2.0.14",J="v1",N={access:"public"},q="",K="dist/index.js",P="dist/es/index.js",Q="dist/index.d.ts",U={test:'echo "Error: no test specified" && exit 1'},X="",Y="MIT",$={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-core":"^5.3.0"},e1={"@khanacademy/wonder-stuff-core":"^1.4.2","wb-dev-build-settings":"^0.9.7"},n1={aphrodite:"^1.2.5",react:"16.14.0"},u={name:F,version:G,design:J,publishConfig:N,description:q,main:K,module:P,types:Q,scripts:U,author:X,license:Y,dependencies:$,devDependencies:e1,peerDependencies:n1},h1={title:"Icon / Icon",component:n,parameters:{componentSubtitle:e(A,{name:u.name,version:u.version})},argTypes:{icon:{options:R},size:{options:["small","medium","large","xlarge"]}}},m={args:{icon:s,size:"small"}},i=()=>e(n,{icon:s});i.parameters={docs:{description:{story:'Minimal icon usage. This is a search icon.\n            Icons are size `"small"` by default.'}}};const t=()=>r("table",{children:[r("tr",{children:[e("td",{children:e(o,{children:"small"})}),e("td",{children:e(n,{icon:s,size:"small"})})]}),r("tr",{children:[e("td",{children:e(o,{children:"medium"})}),e("td",{children:e(n,{icon:s,size:"medium"})})]}),r("tr",{children:[e("td",{children:e(o,{children:"large"})}),e("td",{children:e(n,{icon:s,size:"large"})})]}),r("tr",{children:[e("td",{children:e(o,{children:"xlarge"})}),e("td",{children:e(n,{icon:s,size:"xlarge"})})]})]});t.parameters={docs:{description:{story:'The size of an icon is determined by the `Icon`\'s\n            `size` prop. While we don\'t currently have assets for sizes\n            larger than medium, we can still render any icon at any size\n            in a pinch. The available sizes are `"small"`, `"medium"`,\n            `"large"`, and `"xlarge"`. '}}};const a=()=>{const p=Object.entries(R).map(([B,E])=>r("tr",{children:[e("td",{children:e(n,{icon:E})}),e("td",{children:e(o,{children:B})})]}));return e("table",{children:p})};a.parameters={docs:{description:{story:'The actual icon is determined by the `Icon`\'s\n            `icon` prop. Here are the icons that are already defined in\n            Wonder Blocks and ready to use. Just import `{icons}` from\n            `"@khanacademy/wonder-blocks-icon"`.'}}};const c=()=>e(n,{size:"small",icon:O,color:H.red});c.parameters={docs:{description:{story:"The color of an icon can be specified through its `color` prop."}}};const d=()=>r(_,{children:["Here is an icon",e(n,{size:"small",icon:O,style:{margin:2}}),"when it is inline."]});d.parameters={docs:{description:{story:"Icons have `display: inline-block` by default."}}};const l=()=>e(n,{icon:{medium:"M12.5 4.25C12.5 3.14543 13.3954 2.25 14.5 2.25C15.6046 2.25 16.5 3.14543 16.5 4.25C16.5 5.35457 15.6046 6.25 14.5 6.25C13.8117 6.25 13.2046 5.90228 12.8447 5.37291C12.8367 5.3589 12.8282 5.34502 12.8194 5.33126C12.8102 5.31696 12.8007 5.30297 12.7909 5.28929C12.6063 4.98641 12.5 4.63062 12.5 4.25ZM14.5 8.25C13.4511 8.25 12.4966 7.8463 11.7832 7.18581L7.79943 9.7458C7.92958 10.1403 8 10.5619 8 11C8 11.4381 7.92958 11.8597 7.79943 12.2542L11.7832 14.8142C12.4966 14.1537 13.4511 13.75 14.5 13.75C16.7091 13.75 18.5 15.5409 18.5 17.75C18.5 19.9591 16.7091 21.75 14.5 21.75C12.2909 21.75 10.5 19.9591 10.5 17.75C10.5 17.3119 10.5704 16.8903 10.7006 16.4958L6.71681 13.9358C6.00342 14.5963 5.04885 15 4 15C1.79086 15 0 13.2091 0 11C0 8.79086 1.79086 7 4 7C5.04885 7 6.00342 7.40369 6.71681 8.06417L10.7006 5.50416C10.5704 5.10969 10.5 4.68807 10.5 4.25C10.5 2.04086 12.2909 0.25 14.5 0.25C16.7091 0.25 18.5 2.04086 18.5 4.25C18.5 6.45914 16.7091 8.25 14.5 8.25ZM5.70939 12.0388C5.69949 12.0526 5.68988 12.0668 5.68058 12.0813C5.67164 12.0952 5.6631 12.1092 5.65493 12.1234C5.29508 12.6525 4.68812 13 4 13C2.89543 13 2 12.1046 2 11C2 9.8954 2.89543 9 4 9C4.68812 9 5.29507 9.3475 5.65493 9.8766C5.66309 9.8908 5.67164 9.9048 5.68058 9.9187C5.68988 9.9332 5.69949 9.9474 5.7094 9.9612C5.89379 10.264 6 10.6196 6 11C6 11.3804 5.89379 11.736 5.70939 12.0388ZM12.7909 16.7107C12.6063 17.0136 12.5 17.3694 12.5 17.75C12.5 18.8546 13.3954 19.75 14.5 19.75C15.6046 19.75 16.5 18.8546 16.5 17.75C16.5 16.6454 15.6046 15.75 14.5 15.75C13.8117 15.75 13.2046 16.0977 12.8447 16.6271C12.8367 16.6411 12.8282 16.655 12.8194 16.6687C12.8102 16.683 12.8007 16.697 12.7909 16.7107Z"},style:{fillRule:"evenodd",clipRule:"evenodd"}});l.parameters={docs:{description:{story:"Icons can be customized by passing in a custom icon.The icon should be an object with a size-related property (`small | medium | large | xlarge`) that is a string containing the path data for the icon.\n\nNOTE: Sometimes the icon will need some custom SVG attributes to render correctly. For example, the `fillRule` and `clipRule` attributes are needed for the share icon. This can be set using the `style` prop."}}};var C,h,b;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    icon: icons.search,
    size: "small"
  }
}`,...(b=(h=m.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var g,f,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  return <Icon icon={icons.search} />;
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var z,I,L;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  return <table>
            <tr>
                <td>
                    <LabelMedium>{"small"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="small" />
                </td>
            </tr>
            <tr>
                <td>
                    <LabelMedium>{"medium"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="medium" />
                </td>
            </tr>
            <tr>
                <td>
                    <LabelMedium>{"large"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="large" />
                </td>
            </tr>
            <tr>
                <td>
                    <LabelMedium>{"xlarge"}</LabelMedium>
                </td>
                <td>
                    <Icon icon={icons.search} size="xlarge" />
                </td>
            </tr>
        </table>;
}`,...(L=(I=t.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var M,x,v;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const iconsWithLabels = Object.entries(icons).map(([name, icon]) => {
    return <tr>
                <td>
                    <Icon icon={icon} />
                </td>
                <td>
                    <LabelMedium>{name}</LabelMedium>
                </td>
            </tr>;
  });
  return <table>{iconsWithLabels}</table>;
}`,...(v=(x=a.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var w,S,k;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  return <Icon size="small" icon={icons.info} color={Color.red} />;
}`,...(k=(S=c.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var T,j,Z;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  return <View>
            Here is an icon
            <Icon size="small" icon={icons.info} style={{
      margin: 2
    }} />
            when it is inline.
        </View>;
}`,...(Z=(j=d.parameters)==null?void 0:j.docs)==null?void 0:Z.source}}};var V,W,D;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const share: IconAsset = {
    medium: "M12.5 4.25C12.5 3.14543 13.3954 2.25 14.5 2.25C15.6046 2.25 16.5 3.14543 16.5 4.25C16.5 5.35457 15.6046 6.25 14.5 6.25C13.8117 6.25 13.2046 5.90228 12.8447 5.37291C12.8367 5.3589 12.8282 5.34502 12.8194 5.33126C12.8102 5.31696 12.8007 5.30297 12.7909 5.28929C12.6063 4.98641 12.5 4.63062 12.5 4.25ZM14.5 8.25C13.4511 8.25 12.4966 7.8463 11.7832 7.18581L7.79943 9.7458C7.92958 10.1403 8 10.5619 8 11C8 11.4381 7.92958 11.8597 7.79943 12.2542L11.7832 14.8142C12.4966 14.1537 13.4511 13.75 14.5 13.75C16.7091 13.75 18.5 15.5409 18.5 17.75C18.5 19.9591 16.7091 21.75 14.5 21.75C12.2909 21.75 10.5 19.9591 10.5 17.75C10.5 17.3119 10.5704 16.8903 10.7006 16.4958L6.71681 13.9358C6.00342 14.5963 5.04885 15 4 15C1.79086 15 0 13.2091 0 11C0 8.79086 1.79086 7 4 7C5.04885 7 6.00342 7.40369 6.71681 8.06417L10.7006 5.50416C10.5704 5.10969 10.5 4.68807 10.5 4.25C10.5 2.04086 12.2909 0.25 14.5 0.25C16.7091 0.25 18.5 2.04086 18.5 4.25C18.5 6.45914 16.7091 8.25 14.5 8.25ZM5.70939 12.0388C5.69949 12.0526 5.68988 12.0668 5.68058 12.0813C5.67164 12.0952 5.6631 12.1092 5.65493 12.1234C5.29508 12.6525 4.68812 13 4 13C2.89543 13 2 12.1046 2 11C2 9.8954 2.89543 9 4 9C4.68812 9 5.29507 9.3475 5.65493 9.8766C5.66309 9.8908 5.67164 9.9048 5.68058 9.9187C5.68988 9.9332 5.69949 9.9474 5.7094 9.9612C5.89379 10.264 6 10.6196 6 11C6 11.3804 5.89379 11.736 5.70939 12.0388ZM12.7909 16.7107C12.6063 17.0136 12.5 17.3694 12.5 17.75C12.5 18.8546 13.3954 19.75 14.5 19.75C15.6046 19.75 16.5 18.8546 16.5 17.75C16.5 16.6454 15.6046 15.75 14.5 15.75C13.8117 15.75 13.2046 16.0977 12.8447 16.6271C12.8367 16.6411 12.8282 16.655 12.8194 16.6687C12.8102 16.683 12.8007 16.697 12.7909 16.7107Z"
  };
  return <Icon icon={share} style={{
    fillRule: "evenodd",
    clipRule: "evenodd"
  }} />;
}`,...(D=(W=l.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};const b1=["Default","Basic","Sizes","Variants","WithColor","Inline","CustomIcon"];export{i as Basic,l as CustomIcon,m as Default,d as Inline,t as Sizes,a as Variants,c as WithColor,b1 as __namedExportsOrder,h1 as default};
//# sourceMappingURL=icon.stories-7904bed5.js.map
