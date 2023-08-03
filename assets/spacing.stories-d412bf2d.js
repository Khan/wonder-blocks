import{M as x}from"./index-35e12253.js";import{j as s,a as e,F as b}from"./jsx-runtime-309e447d.js";import{a as d,l as f,V as p}from"./render-state-root-891c0d56.js";import{S as i,C as r}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{c as m}from"./footnote-761d2bcc.js";import{C as S}from"./component-info-cedbe096.js";import{u as y}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./button-b2794e32.js";import"./clickable-8a7f284d.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";const w="@khanacademy/wonder-blocks-spacing",_="4.0.1",k="v1",v={access:"public"},C="",M="dist/index.js",T="dist/es/index.js",j="dist/index.d.ts",D={test:'echo "Error: no test specified" && exit 1'},E={"wb-dev-build-settings":"^0.9.7"},O="",$="MIT",h={name:w,version:_,design:k,publishConfig:v,description:C,main:M,module:T,types:j,scripts:D,devDependencies:E,author:O,license:$},z=d("table"),g=d("tr"),a=d("th"),l=d("td");function B(){return s(z,{style:t.table,children:[e("thead",{children:s(g,{style:t.header,children:[e(a,{style:t.cell,children:"Name"}),e(a,{style:t.cell,children:"Size"}),e(a,{style:t.cell,children:"Example horizontal"}),e(a,{style:t.cell,children:"Example vertical"})]})}),e("tbody",{children:Object.keys(i).map((o,n)=>s(g,{style:t.row,children:[e(l,{style:t.cell,children:e(m,{style:t.tag,children:o})}),e(l,{style:t.cell,children:s(m,{children:[i[o],"px"]})}),e(l,{style:t.cell,children:e(p,{style:{backgroundColor:r.purple,width:i[o],height:i.medium_16}})}),e(l,{style:t.cell,children:e(p,{style:{backgroundColor:r.purple,width:i.medium_16,height:i[o]}})})]},n))})]})}const t=f.StyleSheet.create({table:{borderCollapse:"collapse",borderSpacing:0,margin:`${i.xLarge_32}px 0`,textAlign:"left",width:"100%"},header:{backgroundColor:r.offWhite},row:{borderTop:`1px solid ${r.offBlack8}`},cell:{padding:i.xSmall_8,verticalAlign:"middle"},tag:{background:r.offWhite,border:`solid 1px ${r.offBlack8}`,borderRadius:i.xxxxSmall_2,display:"inline-block",margin:`${i.xxxSmall_4}px 0`,padding:`0 ${i.xxxSmall_4}px`}});function u(o){const n=Object.assign({h1:"h1",p:"p",a:"a",code:"code",h2:"h2",pre:"pre"},y(),o.components);return s(b,{children:[e(x,{title:"Spacing / Spacing",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs"}}),`
`,e(n.h1,{id:"spacing",children:"Spacing"}),`
`,e(S,{name:h.name,version:h.version}),`
`,s(n.p,{children:[`Spacing is a collection of names assigned to specific dimensions. These are used
frequently when laying out Wonder Blocks components (such as with
`,e(n.a,{href:"/docs/core-view--default",children:"View"}),`). You can use these sizes directly by
importing the `,e(n.code,{children:"wonder-blocks-spacing"}),` package and accessing the named property
like so: `,e(n.code,{children:"Spacing.xxSmall_6"}),"."]}),`
`,e(B,{}),`
`,e(n.h2,{id:"usage",children:"Usage"}),`
`,e(n.pre,{children:e(n.code,{className:"language-js",children:`import Spacing from "@khanacademy/wonder-blocks-spacing";

const styles = StyleSheet.create({
    box: {
        padding: Spacing.xxSmall_6,
    },
});
`})})]})}function L(o={}){const{wrapper:n}=Object.assign({},y(),o.components);return n?e(n,{...o,children:e(u,{...o})}):u(o)}const V=()=>{throw new Error("Docs-only story")};V.parameters={docsOnly:!0};const c={title:"Spacing / Spacing",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs"},tags:["stories-mdx"],includeStories:["__page"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:L};const ae=["__page"];export{ae as __namedExportsOrder,V as __page,c as default};
//# sourceMappingURL=spacing.stories-d412bf2d.js.map
