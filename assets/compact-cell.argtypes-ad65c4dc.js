import{a as e,j as h,F as x}from"./jsx-runtime-309e447d.js";import{c as I,L as k,d as L}from"./footnote-761d2bcc.js";import{l as b,V as p}from"./render-state-root-891c0d56.js";import{S as i,C as s,f}from"./index-f641b98f.js";import{S as m}from"./strut-c6011196.js";import{C as E}from"./clickable-8a7f284d.js";import"./index-9f32f44c.js";import{I as y}from"./icon-a4f17d53.js";import{e as H,f as $,a as F,d as P}from"./icon-assets-a0b49981.js";const c={cellMinHeight:i.xxLarge_48,cellPadding:{paddingVertical:i.small_12,paddingHorizontal:i.medium_16},detailCellPadding:{paddingVertical:i.medium_16,paddingHorizontal:i.medium_16},accessoryHorizontalSpacing:i.medium_16},j=t=>{switch(t){case"inset":return[g.horizontalRule,g.horizontalRuleInset];case"full-width":return g.horizontalRule;case"none":return{}}},g=b.StyleSheet.create({horizontalRule:{position:"relative",":after":{width:"100%",content:"''",position:"absolute",bottom:0,right:0,height:i.xxxxSmall_2,boxShadow:`inset 0px -1px 0px ${s.offBlack8}`}},horizontalRuleInset:{":after":{width:`calc(100% - ${c.cellPadding.paddingHorizontal}px)`}}}),M=({leftAccessory:t,leftAccessoryStyle:n,disabled:r})=>t?h(x,{children:[e(p,{style:[a.accessory,r&&a.accessoryDisabled,{...n}],children:t}),e(m,{size:c.accessoryHorizontalSpacing})]}):null,U=({rightAccessory:t,rightAccessoryStyle:n,active:r,disabled:o})=>t?h(x,{children:[e(m,{size:c.accessoryHorizontalSpacing}),e(p,{style:[a.accessory,a.accessoryRight,o&&a.accessoryDisabled,{...n},r&&a.accessoryActive],children:t})]}):null,V=t=>{const{active:n,children:r,disabled:o,href:d,horizontalRule:_="inset",leftAccessory:q=void 0,leftAccessoryStyle:T=void 0,onClick:v,rightAccessory:R=void 0,rightAccessoryStyle:W=void 0,style:z,testId:O,"aria-label":A,innerStyle:D,target:B}=t,w=l=>{const N=j(_);return e(p,{style:[a.wrapper,(l==null?void 0:l.focused)&&a.focused],"aria-current":n?"true":void 0,children:h(p,{style:[a.innerWrapper,D,z,N,o&&a.disabled,n&&a.active,!o&&(l==null?void 0:l.hovered)&&a.hovered,n&&(l==null?void 0:l.hovered)&&a.activeHovered,!o&&(l==null?void 0:l.pressed)&&a.pressed,!o&&n&&(l==null?void 0:l.pressed)&&a.activePressed],children:[e(M,{leftAccessory:q,leftAccessoryStyle:T,disabled:o}),e(p,{style:a.content,testId:O,children:r}),e(U,{rightAccessory:R,rightAccessoryStyle:W,active:n,disabled:o})]})})};return v||d?e(E,{disabled:o,onClick:v,href:d,hideDefaultFocusRing:!0,"aria-label":A||void 0,target:B,children:l=>w(l)}):w()},a=b.StyleSheet.create({wrapper:{background:s.white,color:s.offBlack,minHeight:c.cellMinHeight,textAlign:"left"},innerWrapper:{padding:`${c.cellPadding.paddingVertical}px ${c.cellPadding.paddingHorizontal}px`,flexDirection:"row",flex:1},content:{alignSelf:"center",flex:1,overflowWrap:"break-word"},accessory:{minWidth:"auto",alignItems:"center",alignSelf:"center"},accessoryRight:{color:s.offBlack64},hovered:{background:s.offBlack8},focused:{borderRadius:i.xxxSmall_4,outline:`solid ${i.xxxxSmall_2}px ${s.blue}`,outlineOffset:-i.xxxxSmall_2,overflow:"hidden"},pressed:{background:s.offBlack16},active:{background:f(s.blue,.08),color:s.blue},activeHovered:{background:f(s.blue,.16)},activePressed:{background:f(s.blue,.24)},disabled:{color:s.offBlack32,":hover":{cursor:"not-allowed"}},accessoryActive:{color:s.blue},accessoryDisabled:{color:s.offBlack,opacity:.32}});try{cellcore.displayName="cellcore",cellcore.__docgenInfo={description:`CellCore is the base cell wrapper. It's used as the skeleton/layout that is
used by CompactCell and DetailCell (and any other variants).

Both variants share how they render their accessories, and the main
responsibility of this component is to render the contents that are passed in
(using the \`children\` prop).`,displayName:"cellcore",props:{"aria-label":{defaultValue:null,description:"Used to announce the cell's content to screen readers.",name:"aria-label",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"Optional custom styles applied to the cell container.",name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:"Optional test ID for e2e testing.",name:"testId",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:`Called when the cell is clicked.

If not provided, the Cell can’t be hovered and/or pressed (highlighted on
hover).`,name:"onClick",required:!1,type:{name:"((e: SyntheticEvent<Element, Event>) => unknown)"}},href:{defaultValue:null,description:`Optinal href which Cell should direct to, uses client-side routing
by default if react-router is present.`,name:"href",required:!1,type:{name:"string"}},target:{defaultValue:null,description:"A target destination window for a link to open in. Should only be used\nwhen `href` is specified.\n\nTODO(WB-1262): only allow this prop when `href` is also set.t",name:"target",required:!1,type:{name:"enum",value:[{value:'"_blank"'}]}},disabled:{defaultValue:null,description:"Whether the cell is disabled.",name:"disabled",required:!1,type:{name:"boolean"}},leftAccessory:{defaultValue:null,description:`If provided, this adds a left accessory to the cell. Left
Accessories can be defined using WB components such as Icon,
IconButton, or it can even be used for a custom node/component if
needed. What ever is passed in will occupy the "LeftAccessory” area
of the Cell.`,name:"leftAccessory",required:!1,type:{name:"ReactNode"}},leftAccessoryStyle:{defaultValue:null,description:`Optional custom styles applied to the leftAccessory wrapper. For
example, it can be used to set a custom minWidth or a custom
alignment.

NOTE: leftAccessoryStyle can only be used if leftAccessory is set.`,name:"leftAccessoryStyle",required:!1,type:{name:"AccessoryStyle"}},rightAccessory:{defaultValue:null,description:`If provided, this adds a right accessory to the cell. Right
Accessories can be defined using WB components such as Icon,
IconButton, or it can even be used for a custom node/component if
needed. What ever is passed in will occupy the “RightAccessory”
area of the Cell.`,name:"rightAccessory",required:!1,type:{name:"ReactNode"}},rightAccessoryStyle:{defaultValue:null,description:`Optional custom styles applied to the rightAccessory wrapper. For
example, it can be used to set a custom minWidth or a custom
alignment.

NOTE: rightAccessoryStyle can only be used if rightAccessory is
set.`,name:"rightAccessoryStyle",required:!1,type:{name:"AccessoryStyle"}},horizontalRule:{defaultValue:null,description:"Adds a horizontal rule at the bottom of the cell that can be used to\nseparate cells within groups such as lists. Defaults to `inset`.",name:"horizontalRule",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"inset"'},{value:'"full-width"'}]}},active:{defaultValue:null,description:"Whether the cell is active (or currently selected).",name:"active",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"The content of the cell.",name:"children",required:!0,type:{name:"ReactNode"}},innerStyle:{defaultValue:null,description:`The optional styles applied to the inner wrapper.

Note: This is not intended to be used externally, only used directly
within the package scope.`,name:"innerStyle",required:!1,type:{name:"any"}}}}}catch{}const Y=function(t){const{title:n,...r}=t;return e(V,{...r,children:typeof n=="string"?e(I,{children:n}):n})},be=Y;try{compactcell.displayName="compactcell",compactcell.__docgenInfo={description:`\`CompactCell\` is the simplest form of the Cell. It is a compacted-height Cell
with limited subviews and accessories. Typically they represent additional
info or selection lists. It has a minimum height of 48px and a non-bold
title. It does not have subtitles or a progress bar, and in general it has
less vertical space around text and accessories.

### Usage

\`\`\`jsx
import {CompactCell} from "@khanacademy/wonder-blocks-cell";

<CompactCell
 title="Compact cell"
 rightAccessory={<Icon icon={icons.caretRight} size="medium" />}
/>
\`\`\``,displayName:"compactcell",props:{title:{defaultValue:null,description:`The title / main content of the cell. You can either provide a string or
a Typography component. If a string is provided, typography defaults to
LabelLarge.`,name:"title",required:!0,type:{name:"TypographyText"}},leftAccessory:{defaultValue:null,description:`If provided, this adds a left accessory to the cell. Left
Accessories can be defined using WB components such as Icon,
IconButton, or it can even be used for a custom node/component if
needed. What ever is passed in will occupy the "LeftAccessory” area
of the Cell.`,name:"leftAccessory",required:!1,type:{name:"ReactNode"}},leftAccessoryStyle:{defaultValue:null,description:`Optional custom styles applied to the leftAccessory wrapper. For
example, it can be used to set a custom minWidth or a custom
alignment.

NOTE: leftAccessoryStyle can only be used if leftAccessory is set.`,name:"leftAccessoryStyle",required:!1,type:{name:"AccessoryStyle"}},rightAccessory:{defaultValue:null,description:`If provided, this adds a right accessory to the cell. Right
Accessories can be defined using WB components such as Icon,
IconButton, or it can even be used for a custom node/component if
needed. What ever is passed in will occupy the “RightAccessory”
area of the Cell.`,name:"rightAccessory",required:!1,type:{name:"ReactNode"}},rightAccessoryStyle:{defaultValue:null,description:`Optional custom styles applied to the rightAccessory wrapper. For
example, it can be used to set a custom minWidth or a custom
alignment.

NOTE: rightAccessoryStyle can only be used if rightAccessory is
set.`,name:"rightAccessoryStyle",required:!1,type:{name:"AccessoryStyle"}},horizontalRule:{defaultValue:null,description:"Adds a horizontal rule at the bottom of the cell that can be used to\nseparate cells within groups such as lists. Defaults to `inset`.",name:"horizontalRule",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"inset"'},{value:'"full-width"'}]}},style:{defaultValue:null,description:"Optional custom styles applied to the cell container.",name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:"Optional test ID for e2e testing.",name:"testId",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:`Called when the cell is clicked.

If not provided, the Cell can’t be hovered and/or pressed (highlighted on
hover).`,name:"onClick",required:!1,type:{name:"((e: SyntheticEvent<Element, Event>) => unknown)"}},active:{defaultValue:null,description:"Whether the cell is active (or currently selected).",name:"active",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"Whether the cell is disabled.",name:"disabled",required:!1,type:{name:"boolean"}},"aria-label":{defaultValue:null,description:"Used to announce the cell's content to screen readers.",name:"aria-label",required:!1,type:{name:"string"}},href:{defaultValue:null,description:`Optinal href which Cell should direct to, uses client-side routing
by default if react-router is present.`,name:"href",required:!1,type:{name:"string"}},target:{defaultValue:null,description:"A target destination window for a link to open in. Should only be used\nwhen `href` is specified.\n\nTODO(WB-1262): only allow this prop when `href` is also set.t",name:"target",required:!1,type:{name:"enum",value:[{value:'"_blank"'}]}}}}}catch{}const C=({subtitle:t,disabled:n})=>t?typeof t=="string"?e(k,{style:!n&&S.subtitle,children:t}):t:null,G=function(t){const{title:n,subtitle1:r,subtitle2:o,...d}=t;return h(V,{...d,innerStyle:S.innerWrapper,children:[e(C,{subtitle:r,disabled:d.disabled}),r&&e(m,{size:i.xxxxSmall_2}),typeof n=="string"?e(I,{children:n}):n,o&&e(m,{size:i.xxxxSmall_2}),e(C,{subtitle:o,disabled:d.disabled})]})},S=b.StyleSheet.create({subtitle:{color:s.offBlack64},innerWrapper:{padding:`${c.detailCellPadding.paddingVertical}px ${c.detailCellPadding.paddingHorizontal}px`}}),ve=G;try{detailcell.displayName="detailcell",detailcell.__docgenInfo={description:`This is a variant of CompactCell that allows adding subtitles, before and
after the cell title. They typically represent an item that can be
clicked/tapped to view more complex details. They vary in height depending on
the presence or absence of subtitles, and they allow for a wide range of
functionality depending on which accessories are active.

### Usage

\`\`\`jsx
import {DetailCell} from "@khanacademy/wonder-blocks-cell";

<DetailCell
 leftAccessory={<Icon icon={icons.contentVideo} size="medium" />}
 subtitle1="Subtitle 1"
 title="Detail cell"
 subtitle1="Subtitle 2"
 rightAccessory={<Icon icon={icons.caretRight} size="medium" />}
/>
\`\`\``,displayName:"detailcell",props:{title:{defaultValue:null,description:`The title / main content of the cell. You can either provide a string or
a Typography component. If a string is provided, typography defaults to
LabelLarge.`,name:"title",required:!0,type:{name:"TypographyText"}},leftAccessory:{defaultValue:null,description:`If provided, this adds a left accessory to the cell. Left
Accessories can be defined using WB components such as Icon,
IconButton, or it can even be used for a custom node/component if
needed. What ever is passed in will occupy the "LeftAccessory” area
of the Cell.`,name:"leftAccessory",required:!1,type:{name:"ReactNode"}},leftAccessoryStyle:{defaultValue:null,description:`Optional custom styles applied to the leftAccessory wrapper. For
example, it can be used to set a custom minWidth or a custom
alignment.

NOTE: leftAccessoryStyle can only be used if leftAccessory is set.`,name:"leftAccessoryStyle",required:!1,type:{name:"AccessoryStyle"}},rightAccessory:{defaultValue:null,description:`If provided, this adds a right accessory to the cell. Right
Accessories can be defined using WB components such as Icon,
IconButton, or it can even be used for a custom node/component if
needed. What ever is passed in will occupy the “RightAccessory”
area of the Cell.`,name:"rightAccessory",required:!1,type:{name:"ReactNode"}},rightAccessoryStyle:{defaultValue:null,description:`Optional custom styles applied to the rightAccessory wrapper. For
example, it can be used to set a custom minWidth or a custom
alignment.

NOTE: rightAccessoryStyle can only be used if rightAccessory is
set.`,name:"rightAccessoryStyle",required:!1,type:{name:"AccessoryStyle"}},horizontalRule:{defaultValue:null,description:"Adds a horizontal rule at the bottom of the cell that can be used to\nseparate cells within groups such as lists. Defaults to `inset`.",name:"horizontalRule",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"inset"'},{value:'"full-width"'}]}},style:{defaultValue:null,description:"Optional custom styles applied to the cell container.",name:"style",required:!1,type:{name:"any"}},testId:{defaultValue:null,description:"Optional test ID for e2e testing.",name:"testId",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:`Called when the cell is clicked.

If not provided, the Cell can’t be hovered and/or pressed (highlighted on
hover).`,name:"onClick",required:!1,type:{name:"((e: SyntheticEvent<Element, Event>) => unknown)"}},active:{defaultValue:null,description:"Whether the cell is active (or currently selected).",name:"active",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"Whether the cell is disabled.",name:"disabled",required:!1,type:{name:"boolean"}},"aria-label":{defaultValue:null,description:"Used to announce the cell's content to screen readers.",name:"aria-label",required:!1,type:{name:"string"}},href:{defaultValue:null,description:`Optinal href which Cell should direct to, uses client-side routing
by default if react-router is present.`,name:"href",required:!1,type:{name:"string"}},target:{defaultValue:null,description:"A target destination window for a link to open in. Should only be used\nwhen `href` is specified.\n\nTODO(WB-1262): only allow this prop when `href` is also set.t",name:"target",required:!1,type:{name:"enum",value:[{value:'"_blank"'}]}},subtitle1:{defaultValue:null,description:`You can either provide a string or a custom node Typography element (or
nothing at all). Both a string or a custom node Typography element will
occupy the “Subtitle1” area of the Cell.`,name:"subtitle1",required:!1,type:{name:"TypographyText"}},subtitle2:{defaultValue:null,description:`You can either provide a string or a custom node Typography element (or
nothing at all). Both a string or a custom node Typography element will
occupy the “Subtitle2” area of the Cell.`,name:"subtitle2",required:!1,type:{name:"TypographyText"}}}}}catch{}const X="@khanacademy/wonder-blocks-cell",J="3.0.15",K="v1",Q={access:"public"},Z="",ee="dist/index.js",te="dist/es/index.js",ne="dist/index.d.ts",le={test:'echo "Error: no test specified" && exit 1'},ae={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-clickable":"^3.1.1","@khanacademy/wonder-blocks-color":"^2.0.1","@khanacademy/wonder-blocks-core":"^5.3.0","@khanacademy/wonder-blocks-layout":"^2.0.14","@khanacademy/wonder-blocks-spacing":"^4.0.1","@khanacademy/wonder-blocks-typography":"^2.1.0"},se={aphrodite:"^1.2.5",react:"16.14.0"},oe={"wb-dev-build-settings":"^0.9.7"},ie="",re="MIT",Ae={name:X,version:J,design:K,publishConfig:Q,description:Z,main:ee,module:te,types:ne,scripts:le,dependencies:ae,peerDependencies:se,devDependencies:oe,author:ie,license:re},u={withContentArticle:e(y,{icon:H,size:"medium"}),withContentVideo:e(y,{icon:$,size:"medium"}),withCaret:e(y,{icon:F,size:"medium"}),withText:e(k,{children:"26.3 GB"}),withIconText:h(p,{style:{alignItems:"center"},children:[e(y,{icon:P,size:"small"}),e(L,{children:"Info"})]}),withImage:e("img",{src:"./avatar.png",alt:"ItemAvatar",width:48,height:48})},we={title:{description:"The title / main content of the cell. You can either provide a string or a Typography component. If a string is provided, typography defaults to `LabelLarge`.",type:{name:"union",value:[{name:"string"},{name:"other",value:"React.ReactElement<Typography>"}],required:!0},table:{type:{summary:"TypographyText",detail:"string | React.Element<Typography>"}}},leftAccessory:{description:'If provided, this adds a left accessory to the cell. Left Accessories can be defined using WB components such as Icon, IconButton, or it can even be used for a custom node/component if needed. What ever is passed in will occupy the "LeftAccessory” area of the Cell.',control:{type:"select"},options:Object.keys(u),mapping:u,table:{category:"Layout",type:{summary:"React.Node",detail:"By default it uses a free width and its default alignment is center (for both vertical and horizontal)."}}},leftAccessoryStyle:{description:"Optional custom styles applied to the leftAccessory wrapper. For example, it can be used to set a custom minWidth or a custom alignment.",table:{category:"Styling",type:{summary:"AccessoryStyle",detail:"NOTE: leftAccessoryStyle can only be used if leftAccessory is set."}}},rightAccessory:{description:"If provided, this adds a right accessory to the cell. Right Accessories can be defined using WB components such as Icon, IconButton, or it can even be used for a custom node/component if needed. What ever is passed in will occupy the “RightAccessory” area of the Cell.",control:{type:"select"},options:Object.keys(u),mapping:u,table:{category:"Layout",type:{summary:"React.Node",detail:"By default it uses a free width and its default alignment is center (for both vertical and horizontal)."}}},rightAccessoryStyle:{description:"Optional custom styles applied to the rightAccessory wrapper. For example, it can be used to set a custom minWidth or a custom alignment.",table:{category:"Styling",type:{summary:"AccessoryStyle",detail:"NOTE: rightAccessoryStyle can only be used if rightAccessory is set."}}},horizontalRule:{description:"Adds a horizontal rule at the bottom of the cell that can be used to separate cells within groups such as lists. Defaults to `inset`.",defaultValue:"inset",options:["inset","full-width","none"],control:{type:"select"},table:{category:"Layout",type:{summary:"inset | full-width | none"}}},style:{description:"Optional custom styles.",control:{type:"object"},table:{category:"Styling",type:{summary:"StyleType"}}},testId:{description:"Test ID used for e2e testing.",control:{type:"text"},table:{type:{summary:"string"}}},href:{description:"Optional href which Cell should direct to, uses client-side routing by default if react-router is present.",control:{type:"text"},table:{category:"Navigation",type:{summary:"string"}}},onClick:{action:"clicked",description:`Called when the cell is clicked.
        If not provided, the Cell can’t be hovered and/or pressed (highlighted on
    hover).
        `,table:{category:"Events",type:{summary:"(e: SyntheticEvent<>) => mixed"}}},disabled:{description:"Whether the cell is disabled.",control:{type:"boolean"},defaultValue:!1,table:{type:{summary:"boolean"}}},active:{description:"Whether the cell is active (or currently selected).",control:{type:"boolean"},defaultValue:!1,table:{type:{summary:"boolean"}}},ariaLabel:{name:"aria-label",control:{type:"string"},description:"Used to announce the cell's content to screen readers.",table:{category:"Accessibility",type:{summary:"string",detail:"aria-label should be specially used when the cell is pressable so screen readers can announce the link when the user is focused on it."}}}};try{u.displayName="AccessoryMappings",u.__docgenInfo={description:"Some pre-defined accessory examples to use in our stories.",displayName:"AccessoryMappings",props:{}}}catch{}export{u as A,be as C,ve as D,we as a,Ae as p};
//# sourceMappingURL=compact-cell.argtypes-ad65c4dc.js.map
