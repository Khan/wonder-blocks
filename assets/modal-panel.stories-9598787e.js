import{a as e,j as i,F as x}from"./jsx-runtime-309e447d.js";import{V as f,l as Z}from"./render-state-root-891c0d56.js";import{B as w}from"./button-b2794e32.js";import{S as n,C as D}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{S as r}from"./strut-c6011196.js";import{T as c,B as s}from"./footnote-761d2bcc.js";import{a as t,b as l,c as S,d as K}from"./one-pane-dialog-da34165b.js";import{p as k}from"./package-5b48c142.js";import{C as ee}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./with-action-scheduler-7e779422.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";const te={phone:{name:"phone",styles:{width:"320px",height:"568px"}},tablet:{name:"tablet",styles:{width:"640px",height:"960px"}},desktop:{name:"desktop",styles:{width:"1024px",height:"768px"}}},d=i(x,{children:[e(s,{children:`Let's make this body content long in order
to test scroll overflow.`}),e("br",{}),e(s,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}),e("br",{}),e(s,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`}),e("br",{}),e(s,{children:`Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute
irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id
est.`})]}),we={title:"Modal/Building Blocks/ModalPanel",component:t,decorators:[a=>e(f,{style:o.previewSizer,children:e(f,{style:o.modalPositioner,children:e(a,{})})})],parameters:{componentSubtitle:e(ee,{name:k.name,version:k.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},viewport:{viewports:te,defaultViewport:"desktop"},chromatic:{viewports:[320,640,1024]}},argTypes:{content:{control:{type:null}},header:{control:{type:null}},footer:{control:{type:null}}}},M={render:a=>e(l,{"aria-labelledby":"modal-title-0",style:o.dialog,children:e(t,{...a,content:i(x,{children:[e(c,{id:"modal-title-0",children:"Modal Title"}),e(r,{size:n.large_24}),d]})})})},m=()=>e(l,{"aria-labelledby":"modal-title-1",style:o.dialog,children:e(t,{content:i(x,{children:[e(c,{id:"modal-title-1",children:"Modal Title"}),e(r,{size:n.large_24}),d]})})});m.parameters={docs:{description:{story:"This is a basic `<ModalPanel>`. It just has a\n            `content` prop that contains a title and a body."}}};const u=()=>e(l,{"aria-labelledby":"modal-title-a",style:o.dialog,children:e(t,{content:i(x,{children:[e(c,{id:"modal-title-a",children:"Modal Title"}),e(r,{size:n.large_24}),d]}),light:!1})});u.parameters={docs:{description:{story:"This is what a modal panel looks like when its `light` prop is set to false."}}};const p=()=>e(l,{"aria-labelledby":"modal-title-2",style:o.dialog,children:e(t,{header:e(S,{titleId:"modal-title-2",title:"Modal Title"}),content:d})});p.parameters={docs:{description:{story:"This is a `<ModalPanel>` with a `header`\n            prop. Note that the header that renders here as part of the\n            `header` prop is sticky, so it remains even if you scroll\n            down in the modal."}}};const h=()=>e(l,{"aria-labelledby":"modal-title-3",style:o.dialog,children:e(t,{content:i(x,{children:[e(c,{id:"modal-title-3",children:"Modal Title"}),e(r,{size:n.large_24}),d]}),footer:e(K,{children:e(w,{onClick:()=>{},children:"Continue"})})})});h.parameters={docs:{description:{story:"A modal panel can have a footer with the `footer`\n            prop. In this example, the footer just contains a button. Note\n            that the footer is sticky."}}};const g=()=>e(l,{"aria-labelledby":"modal-title-3",style:o.dialog,children:e(t,{header:e(S,{titleId:"modal-title-2",title:"Modal Title"}),content:d,footer:e(K,{children:e(w,{onClick:()=>{},light:!0,children:"Continue"})}),light:!1})});g.parameters={docs:{description:{story:"Here is a dark `<ModalPanel>` with a header\n            and a footer. The `<Button>` in the footer must have the\n            `light` prop set to true in order to be visible on the dark\n            background."}}};const y=()=>{const a="@media (max-width: 1023px)",T="@media (min-width: 1024px)",Q={[T]:{width:"86.72%",maxWidth:888,height:"60.42%",minHeight:308},[a]:{width:"100%",height:"100%",overflow:"hidden"}},Y={flex:1,[T]:{flexDirection:"row"},[a]:{flexDirection:"column"}};return e(l,{style:Q,children:i(f,{style:Y,children:[e(t,{content:i(f,{children:[e(c,{children:"Sidebar"}),e(r,{size:n.large_24}),e(s,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."})]}),light:!1,closeButtonVisible:!1}),e(t,{content:i(f,{children:[e(c,{children:"Contents"}),e(r,{size:n.large_24}),e(s,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}),e(r,{size:n.large_24}),e(w,{children:"Primary action"})]}),closeButtonVisible:!1})]})})};y.parameters={docs:{description:{story:`Here is an example of how you can have a modal
            with two panels. Observe that it is responsive, so it uses a
            row layout with a larger window size and a column layout on
            a smaller window size. The "X" close button has been disabled
            for both panels since the top right spot would change depending
            on which layout is being used.`}}};const b=()=>{const a={color:D.blue,border:`2px solid ${D.darkBlue}`,borderRadius:20};return e(l,{"aria-labelledby":"modal-title-1",style:o.dialog,children:e(t,{header:e(S,{titleId:"modal-title-1",title:"Modal Title"}),content:d,style:a})})};b.parameters={docs:{description:{story:`A \`<ModalPanel>\` can have custom styles.
            In this example, the styles for the modal panel include blue
            text color, a 2px solid dark blue border, and a border
            radius of 20px.`}}};const o=Z.StyleSheet.create({dialog:{maxWidth:600,maxHeight:500},modalPositioner:{backgroundImage:"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",backgroundSize:"20px 20px",backgroundPosition:"0 0, 0 10px, 10px -10px, -10px 0px",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",left:0,right:0,top:0,bottom:0},previewSizer:{height:600},example:{alignItems:"center",justifyContent:"center"}});var B,v,P;M.parameters={...M.parameters,docs:{...(B=M.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <ModalDialog aria-labelledby="modal-title-0" style={styles.dialog}>
            <ModalPanel {...args} content={<>
                        <Title id="modal-title-0">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        {longBody}
                    </>} />
        </ModalDialog>
}`,...(P=(v=M.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var q,z,C;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
        <ModalPanel content={<>
                    <Title id="modal-title-1">Modal Title</Title>
                    <Strut size={Spacing.large_24} />
                    {longBody}
                </>} />
    </ModalDialog>`,...(C=(z=m.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var _,V,H;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-a" style={styles.dialog}>
        <ModalPanel content={<>
                    <Title id="modal-title-a">Modal Title</Title>
                    <Strut size={Spacing.large_24} />
                    {longBody}
                </>} light={false} />
    </ModalDialog>`,...(H=(V=u.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};var I,F,W;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-2" style={styles.dialog}>
        <ModalPanel header={<ModalHeader titleId="modal-title-2" title="Modal Title" />} content={longBody} />
    </ModalDialog>`,...(W=(F=p.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var L,j,E;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
        <ModalPanel content={<>
                    <Title id="modal-title-3">Modal Title</Title>
                    <Strut size={Spacing.large_24} />
                    {longBody}
                </>} footer={<ModalFooter>
                    <Button onClick={() => {}}>Continue</Button>
                </ModalFooter>} />
    </ModalDialog>`,...(E=(j=h.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var U,A,G;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`() => <ModalDialog aria-labelledby="modal-title-3" style={styles.dialog}>
        <ModalPanel header={<ModalHeader titleId="modal-title-2" title="Modal Title" />} content={longBody} footer={<ModalFooter>
                    <Button onClick={() => {}} light={true}>
                        Continue
                    </Button>
                </ModalFooter>} light={false} />
    </ModalDialog>`,...(G=(A=g.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var N,O,R;y.parameters={...y.parameters,docs:{...(N=y.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const mobile = "@media (max-width: 1023px)";
  const desktop = "@media (min-width: 1024px)";
  const twoPaneDialogStyle = ({
    [desktop]: {
      width: "86.72%",
      maxWidth: 888,
      height: "60.42%",
      minHeight: 308
    },
    [mobile]: {
      width: "100%",
      height: "100%",
      overflow: "hidden"
    }
  } as const);
  const panelGroupStyle = ({
    flex: 1,
    [desktop]: {
      flexDirection: "row"
    },
    [mobile]: {
      flexDirection: "column"
    }
  } as const);
  return <ModalDialog style={twoPaneDialogStyle}>
            <View style={panelGroupStyle}>
                <ModalPanel content={<View>
                            <Title>Sidebar</Title>
                            <Strut size={Spacing.large_24} />
                            <Body>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris.
                            </Body>
                        </View>} light={false} closeButtonVisible={false} />
                <ModalPanel content={<View>
                            <Title>Contents</Title>
                            <Strut size={Spacing.large_24} />
                            <Body>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </Body>
                            <Strut size={Spacing.large_24} />
                            <Button>Primary action</Button>
                        </View>} closeButtonVisible={false} />
            </View>
        </ModalDialog>;
}`,...(R=(O=y.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var $,X,J;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const modalStyles = ({
    color: Color.blue,
    border: \`2px solid \${Color.darkBlue}\`,
    borderRadius: 20
  } as const);
  return <ModalDialog aria-labelledby="modal-title-1" style={styles.dialog}>
            <ModalPanel header={<ModalHeader titleId="modal-title-1" title="Modal Title" />} content={longBody} style={modalStyles} />
        </ModalDialog>;
}`,...(J=(X=b.parameters)==null?void 0:X.docs)==null?void 0:J.source}}};const Se=["Default","Simple","Dark","WithHeader","WithFooter","DarkWithHeaderAndFooter","TwoPanels","WithStyle"];export{u as Dark,g as DarkWithHeaderAndFooter,M as Default,m as Simple,y as TwoPanels,h as WithFooter,p as WithHeader,b as WithStyle,Se as __namedExportsOrder,we as default};
//# sourceMappingURL=modal-panel.stories-9598787e.js.map
