import{a as e,j as t,F as s}from"./jsx-runtime-309e447d.js";import{V as r,l as E}from"./render-state-root-891c0d56.js";import{B as a}from"./button-b2794e32.js";import"./index-9f32f44c.js";import{S as l}from"./strut-c6011196.js";import{S as i}from"./index-f641b98f.js";import{T as y,a as A,B as x}from"./footnote-761d2bcc.js";import{d,b as g,a as h}from"./one-pane-dialog-da34165b.js";import{p as M}from"./package-5b48c142.js";import{C as N}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./with-action-scheduler-7e779422.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";const U={phone:{name:"phone",styles:{width:"320px",height:"568px"}},tablet:{name:"tablet",styles:{width:"640px",height:"960px"}},desktop:{name:"desktop",styles:{width:"1024px",height:"768px"}}},f=t(s,{children:[e(x,{children:`Let's make this body content long in order
to test scroll overflow.`}),e("br",{}),e(x,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}),e("br",{}),e(x,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}),e("br",{}),e(x,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`})]}),se={title:"Modal/Building Blocks/ModalFooter",component:d,decorators:[o=>e(r,{style:n.previewSizer,children:e(r,{style:n.modalPositioner,children:e(o,{})})})],parameters:{componentSubtitle:e(N,{name:M.name,version:M.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},viewport:{viewports:U,defaultViewport:"desktop"},chromatic:{viewports:[320,640,1024]}},argTypes:{children:{control:{type:null}}}},S={render:o=>e(g,{"aria-labelledby":"modal-id-0",style:n.dialog,children:e(h,{content:t(s,{children:[e(y,{id:"modal-id-0",children:"Modal Title"}),e(l,{size:i.large_24}),f]}),footer:e(d,{...o})})})},c=()=>e(g,{"aria-labelledby":"modal-id-1",style:n.dialog,children:e(h,{content:t(s,{children:[e(y,{id:"modal-id-1",children:"Modal Title"}),e(l,{size:i.large_24}),f]}),footer:e(d,{children:e(r,{})})})});c.parameters={docs:{description:{story:"This is a basic footer. It contains an empty\n            `<View>`, so it is completely blank."}}};const m=()=>e(g,{"aria-labelledby":"modal-id-2",style:n.dialog,children:e(h,{content:t(s,{children:[e(y,{id:"modal-id-2",children:"Modal Title"}),e(l,{size:i.large_24}),f]}),footer:e(d,{children:e(a,{onClick:()=>{},children:"Submit"})})})});m.parameters={docs:{description:{story:'This is a `<ModalFooter>` with a `<Button>`\n            as a child. No additional styling is needed, as the footer\n            already has the style `{justifyContent: "flex-end"}`.'}}};const u=()=>{const o="@media (max-width: 1023px)",b="@media (min-width: 1024px)",w={[b]:{marginRight:i.medium_16},[o]:{marginBottom:i.medium_16}},W={[b]:{flexDirection:"row",justifyContent:"flex-end"},[o]:{flexDirection:"column-reverse",width:"100%"}};return e(g,{"aria-labelledby":"modal-id-3",style:n.dialog,children:e(h,{content:t(s,{children:[e(y,{id:"modal-id-3",children:"Modal Title"}),e(l,{size:i.large_24}),f]}),footer:e(d,{children:t(r,{style:W,children:[e(a,{style:w,kind:"tertiary",children:"Tertiary action"}),e(a,{style:w,kind:"tertiary",children:"Secondary action"}),e(a,{style:w,children:"Primary action"})]})})})})};u.parameters={docs:{description:{story:`This is an example of a footer with multiple
            actions. It's fully responsive, so the buttons are in a
            column layout when the window is small.`}}};const p=()=>{const o={alignItems:"center",flexDirection:"row",justifyContent:"space-between",width:"100%"},b={flexDirection:"row",justifyContent:"flex-end"};return e(g,{"aria-labelledby":"modal-id-4",style:n.dialog,children:e(h,{content:t(s,{children:[e(y,{id:"modal-id-4",children:"Modal Title"}),e(l,{size:i.large_24}),f]}),footer:e(d,{children:t(r,{style:o,children:[e(A,{children:"Step 1 of 4"}),t(r,{style:b,children:[e(a,{kind:"tertiary",children:"Previous"}),e(l,{size:16}),e(a,{kind:"primary",children:"Next"})]})]})})})})};p.parameters={docs:{description:{story:`This is an example of a footer that indicates
            multiple steps in a flow.`}}};const n=E.StyleSheet.create({dialog:{maxWidth:600,maxHeight:500},modalPositioner:{backgroundImage:"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",backgroundSize:"20px 20px",backgroundPosition:"0 0, 0 10px, 10px -10px, -10px 0px",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",left:0,right:0,top:0,bottom:0},previewSizer:{height:600},example:{alignItems:"center",justifyContent:"center"}});var T,B,D;S.parameters={...S.parameters,docs:{...(T=S.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <ModalDialog aria-labelledby={"modal-id-0"} style={styles.dialog}>
            <ModalPanel content={<>
                        <Title id="modal-id-0">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        {longBody}
                    </>} footer={<ModalFooter {...args} />} />
        </ModalDialog>
}`,...(D=(B=S.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};var k,v,_;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`() => <ModalDialog aria-labelledby={"modal-id-1"} style={styles.dialog}>
        <ModalPanel content={<>
                    <Title id="modal-id-1">Modal Title</Title>
                    <Strut size={Spacing.large_24} />
                    {longBody}
                </>} footer={<ModalFooter>
                    <View />
                </ModalFooter>} />
    </ModalDialog>`,...(_=(v=c.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var q,z,F;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`() => <ModalDialog aria-labelledby={"modal-id-2"} style={styles.dialog}>
        <ModalPanel content={<>
                    <Title id="modal-id-2">Modal Title</Title>
                    <Strut size={Spacing.large_24} />
                    {longBody}
                </>} footer={<ModalFooter>
                    <Button onClick={() => {}}>Submit</Button>
                </ModalFooter>} />
    </ModalDialog>`,...(F=(z=m.parameters)==null?void 0:z.docs)==null?void 0:F.source}}};var C,P,j;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const mobile = "@media (max-width: 1023px)";
  const desktop = "@media (min-width: 1024px)";
  const buttonStyle = ({
    [desktop]: {
      marginRight: Spacing.medium_16
    },
    [mobile]: {
      marginBottom: Spacing.medium_16
    }
  } as const);
  const containerStyle = ({
    [desktop]: {
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    [mobile]: {
      flexDirection: "column-reverse",
      width: "100%"
    }
  } as const);
  return <ModalDialog aria-labelledby={"modal-id-3"} style={styles.dialog}>
            <ModalPanel content={<>
                        <Title id="modal-id-3">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        {longBody}
                    </>} footer={<ModalFooter>
                        <View style={containerStyle}>
                            <Button style={buttonStyle} kind="tertiary">
                                Tertiary action
                            </Button>
                            <Button style={buttonStyle} kind="tertiary">
                                Secondary action
                            </Button>
                            <Button style={buttonStyle}>Primary action</Button>
                        </View>
                    </ModalFooter>} />
        </ModalDialog>;
}`,...(j=(P=u.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var V,L,I;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const footerStyle = ({
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  } as const);
  const rowStyle = ({
    flexDirection: "row",
    justifyContent: "flex-end"
  } as const);
  return <ModalDialog aria-labelledby={"modal-id-4"} style={styles.dialog}>
            <ModalPanel content={<>
                        <Title id="modal-id-4">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        {longBody}
                    </>} footer={<ModalFooter>
                        <View style={footerStyle}>
                            <LabelLarge>Step 1 of 4</LabelLarge>
                            <View style={rowStyle}>
                                <Button kind="tertiary">Previous</Button>
                                <Strut size={16} />
                                <Button kind="primary">Next</Button>
                            </View>
                        </View>
                    </ModalFooter>} />
        </ModalDialog>;
}`,...(I=(L=p.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};const de=["Default","Simple","WithButton","WithThreeActions","WithMultipleActions"];export{S as Default,c as Simple,m as WithButton,p as WithMultipleActions,u as WithThreeActions,de as __namedExportsOrder,se as default};
//# sourceMappingURL=modal-footer.stories-84a7d04a.js.map
