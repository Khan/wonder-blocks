import{j as g,a as e,F as z}from"./jsx-runtime-309e447d.js";import{V as y,l as A}from"./render-state-root-891c0d56.js";import{B as V,a as i}from"./breadcrumbs-item-25bba318.js";import"./index-9f32f44c.js";import{L as b}from"./link-64b6fd31.js";import{B as u}from"./footnote-761d2bcc.js";import{c as a,b as o,a as l}from"./one-pane-dialog-da34165b.js";import{p as f}from"./package-5b48c142.js";import{C as _}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./index-f641b98f.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./with-action-scheduler-7e779422.js";import"./strut-c6011196.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";import"./button-b2794e32.js";const M={none:null,"lesson path":g(V,{children:[e(i,{children:e(b,{href:"",children:"Course"})}),e(i,{children:e(b,{href:"",children:"Unit"})}),e(i,{children:"Lesson"})]})},F={title:{control:{type:"text"},description:"The main title rendered in larger bold text.",table:{type:{summary:"string"}}},light:{control:{type:"boolean"},defaultValue:"true",description:`Whether to display the "light" version of this
            component instead, for use when the item is used on a dark
            background.`,table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},titleId:{control:{type:"text"},description:"An id to provide a selector for the title element.\n            Use this as the `aria-labelledby` value on the encompassing\n            `<ModalDialog>`.",table:{type:{summary:"string"}}},testId:{control:{type:"text"},description:'Test ID used for e2e testing.\n\nIn this case, this\n            component is internal, so `testId` is composed with the\n            `testId` passed down from the Dialog variant + a suffix to scope\n            it to this component. If the dialog `testId` is\n            `"some-random-id"` then the header will have the `testId`\n            `"some-random-id-modal-header"`.',table:{type:{summary:"string"}}},subtitle:{control:{type:"text"},description:"The dialog subtitle.",table:{type:{summary:"string"}}},breadcrumbs:{control:{type:"select"},description:`Adds a breadcrumb-trail, appearing in the ModalHeader,
            above the title.`,options:Object.keys(M),mapping:M,table:{type:{summary:"React.Element<Breadcrumbs>"}}}},N={phone:{name:"phone",styles:{width:"320px",height:"568px"}},tablet:{name:"tablet",styles:{width:"640px",height:"960px"}},desktop:{name:"desktop",styles:{width:"1024px",height:"768px"}}},r=g(z,{children:[e(u,{children:`Let's make this body content long in order
to test scroll overflow.`}),e("br",{}),e(u,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}),e("br",{}),e(u,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}),e("br",{}),e(u,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`})]}),me={title:"Modal/Building Blocks/ModalHeader",component:a,decorators:[p=>e(y,{style:t.previewSizer,children:e(y,{style:t.modalPositioner,children:e(p,{})})})],parameters:{componentSubtitle:e(_,{name:f.name,version:f.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},viewport:{viewports:N,defaultViewport:"desktop"},chromatic:{viewports:[320,640,1024]}},argTypes:F},h={render:p=>e(o,{"aria-labelledby":p.titleId,style:t.dialog,children:e(l,{header:e(a,{...p}),content:r})}),args:{title:"This is a modal title.",titleId:"modal-title-id-default-example"}},s=()=>e(o,{"aria-labelledby":"modal-title-1",style:t.dialog,children:e(l,{header:e(a,{title:"Modal Title",titleId:"modal-title-1"}),content:r})});s.parameters={docs:{description:{story:"This is a basic `<ModalHeader>`. It just has a\n            `content` prop that contains a title and a body."}}};const d=()=>e(o,{"aria-labelledby":"modal-title-2",style:t.dialog,children:e(l,{header:e(a,{title:"Modal Title",titleId:"modal-title-2",light:!1}),content:r,light:!1})});d.parameters={docs:{description:{story:"This is `<ModalHeader>` when `light` is\n            set to false. This should only be false if the `light` prop\n            on the encompassing `<ModalPanel>` is also false . Note that\n            the close button is not visible on the header if the panel is\n            light."}}};const n=()=>e(o,{"aria-labelledby":"modal-title-3",style:t.dialog,children:e(l,{header:e(a,{title:"Modal Title",titleId:"modal-title-3",subtitle:"This is what a subtitle looks like."}),content:r})});n.parameters={docs:{description:{story:"This is `<ModalHeader>` with a subtitle, which\n            can be done by passing a string into the `subtitle` prop."}}};const c=()=>e(o,{"aria-labelledby":"modal-title-4",style:t.dialog,children:e(l,{header:e(a,{title:"Modal Title",titleId:"modal-title-4",subtitle:"This is what a subtitle looks like.",light:!1}),content:r,light:!1})});c.parameters={docs:{description:{story:"This is `<ModalHeader>` with a subtitle\n            when it also has `light` set to false."}}};const m=()=>e(o,{"aria-labelledby":"modal-title-5",style:t.dialog,children:e(l,{header:e(a,{title:"Modal Title",titleId:"modal-title-5",breadcrumbs:g(V,{children:[e(i,{children:e(b,{href:"",children:"Course"})}),e(i,{children:e(b,{href:"",children:"Unit"})}),e(i,{children:"Lesson"})]})}),content:r})});m.parameters={docs:{description:{story:"This is `<ModalHeader>` with breadcrumbs, which\n            can be done by passing a Wonder Blocks `<Breadcrumbs>`\n            element into the `breadcrumbs` prop. Note that `breadcrumbs`\n            currently do not work when `light` is false."}}};const t=A.StyleSheet.create({dialog:{maxWidth:600,maxHeight:500},modalPositioner:{backgroundImage:"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",backgroundSize:"20px 20px",backgroundPosition:"0 0, 0 10px, 10px -10px, -10px 0px",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",left:0,right:0,top:0,bottom:0},previewSizer:{height:600},example:{alignItems:"center",justifyContent:"center"}});var x,I,k;h.parameters={...h.parameters,docs:{...(x=h.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <ModalDialog aria-labelledby={args.titleId} style={styles.dialog}>
            <ModalPanel header={<ModalHeader {...args} />} content={longBody} />
        </ModalDialog>,
  args: {
    title: "This is a modal title.",
    titleId: "modal-title-id-default-example"
  }
}`,...(k=(I=h.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};var w,B,D;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
        <ModalPanel header={<ModalHeader title="Modal Title" titleId="modal-title-1" />} content={longBody} />
    </ModalDialog>`,...(D=(B=s.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var T,v,S;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-2" style={styles.dialog}>
        <ModalPanel header={<ModalHeader title="Modal Title" titleId="modal-title-2" light={false} />} content={longBody} light={false} />
    </ModalDialog>`,...(S=(v=d.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var H,q,L;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
        <ModalPanel header={<ModalHeader title="Modal Title" titleId="modal-title-3" subtitle="This is what a subtitle looks like." />} content={longBody} />
    </ModalDialog>`,...(L=(q=n.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var P,W,C;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-4" style={styles.dialog}>
        <ModalPanel header={<ModalHeader title="Modal Title" titleId="modal-title-4" subtitle="This is what a subtitle looks like." light={false} />} content={longBody} light={false} />
    </ModalDialog>`,...(C=(W=c.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var j,U,E;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-5" style={styles.dialog}>
        <ModalPanel header={<ModalHeader title="Modal Title" titleId="modal-title-5" breadcrumbs={<Breadcrumbs>
                            <BreadcrumbsItem>
                                <Link href="">Course</Link>
                            </BreadcrumbsItem>
                            <BreadcrumbsItem>
                                <Link href="">Unit</Link>
                            </BreadcrumbsItem>
                            <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                        </Breadcrumbs>} />} content={longBody} />
    </ModalDialog>`,...(E=(U=m.parameters)==null?void 0:U.docs)==null?void 0:E.source}}};const pe=["Default","Simple","Dark","WithSubtitle","WithSubtitleDark","WithBreadcrumbs"];export{d as Dark,h as Default,s as Simple,m as WithBreadcrumbs,n as WithSubtitle,c as WithSubtitleDark,pe as __namedExportsOrder,me as default};
//# sourceMappingURL=modal-header.stories-1199db13.js.map
