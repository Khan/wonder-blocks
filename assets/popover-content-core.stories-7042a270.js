import{a as e,j as r,F as i}from"./jsx-runtime-309e447d.js";import{V as h,l as P}from"./render-state-root-891c0d56.js";import{S as t,C as a}from"./index-f641b98f.js";import{C as m}from"./clickable-8a7f284d.js";import"./index-9f32f44c.js";import{I as c}from"./icon-a4f17d53.js";import{e as S}from"./icon-assets-a0b49981.js";import{a as p,B,H as _}from"./footnote-761d2bcc.js";import{b as j,p as u}from"./package-2cfe7d80.js";import{C as V}from"./component-info-cedbe096.js";import{ClickableDetailCell as w}from"./detail-cell.stories-6409cf17.js";import"./_commonjsHelpers-de833af9.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./index-9c2d1831.js";import"./tooltip-f80a1c8a.js";import"./one-pane-dialog-da34165b.js";import"./with-action-scheduler-7e779422.js";import"./strut-c6011196.js";import"./icon-button-297fafd1.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";import"./button-b2794e32.js";import"./compact-cell.argtypes-ad65c4dc.js";const z={children:{control:{type:null}}},se={title:"Popover/PopoverContentCore",component:j,argTypes:z,parameters:{componentSubtitle:e(V,{name:u.name,version:u.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}},decorators:[L=>e(h,{style:o.example,children:L()})]},o=P.StyleSheet.create({example:{alignItems:"center",justifyContent:"center"},popoverWithIcon:{alignItems:"center",flexDirection:"row",gap:t.medium_16},popoverWithCell:{padding:0},customPopover:{maxWidth:t.medium_16*25,width:t.medium_16*25,textAlign:"center"},row:{flexDirection:"row",justifyContent:"center",padding:`${t.small_12}px 0`},action:{backgroundColor:"transparent",border:"none",color:a.white,cursor:"pointer",margin:t.small_12,padding:t.xxSmall_6,alignItems:"center",justifyContent:"center"}}),l={args:{children:r(i,{children:[e(c,{size:"large",icon:S}),r(h,{children:[e(p,{children:"This is an article"}),e(B,{children:"With the content"})]})]}),closeButtonVisible:!0,style:o.popoverWithIcon}},A=w,n={args:{children:e(A,{...w.args}),style:o.popoverWithCell}};n.parameters={docs:{description:{story:"Popovers can also benefit from other Wonder Blocks components. In this example, we are using the DetailCell component embedded as part of the popover contents."}}};const d={small:"M6.92820 0L13.85640 4L13.85640 12L6.92820 16L0 12L0 4Z"},O=r(i,{children:[e(_,{children:"Custom popover title"}),r(h,{style:o.row,children:[e(m,{style:o.action,onClick:close,id:"btn-1",children:()=>r(i,{children:[e(c,{icon:d,color:a.gold,size:"large"}),e(p,{children:"Option 1"})]})}),e(m,{style:o.action,onClick:close,id:"btn-2",children:()=>r(i,{children:[e(c,{icon:d,color:a.green,size:"large"}),e(p,{children:"Option 2"})]})}),e(m,{style:o.action,onClick:close,id:"btn-3",children:()=>r(i,{children:[e(c,{icon:d,color:a.blue,size:"large"}),e(p,{children:"Option 3"})]})})]})]}),s={args:{children:O,color:"darkBlue",style:o.customPopover}};s.parameters={docs:{description:{story:"This component provides a flexible variant that can be used for example, for our Confidence Prompt in test prep and popovers that don't fit into other categories. If you want to use a different background, you can set `color` as part of `PopoverContentCore`."}}};var C,g,f;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: <>
                <Icon size="large" icon={icons.contentArticle} />
                <View>
                    <LabelLarge>This is an article</LabelLarge>
                    <Body>With the content</Body>
                </View>
            </>,
    closeButtonVisible: true,
    style: styles.popoverWithIcon
  }
}`,...(f=(g=l.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var y,v,b,x,k;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    // use the composed DetailCell component
    children: <ClickableDetailCellWrapper {...ClickableDetailCell.args} />,
    style: styles.popoverWithCell
  }
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source},description:{story:"Using DetailCell as the content",...(k=(x=n.parameters)==null?void 0:x.docs)==null?void 0:k.description}}};var W,I,D;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: CustomPopoverContent,
    color: "darkBlue",
    style: styles.customPopover
  }
}`,...(D=(I=s.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};const le=["WithIcon","WithDetailCell","Dark"];export{s as Dark,n as WithDetailCell,l as WithIcon,le as __namedExportsOrder,se as default};
//# sourceMappingURL=popover-content-core.stories-7042a270.js.map
