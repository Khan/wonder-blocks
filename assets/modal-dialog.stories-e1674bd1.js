import{a as e,j as c,F as m}from"./jsx-runtime-309e447d.js";import{V as o,l as z}from"./render-state-root-891c0d56.js";import{B as C}from"./button-b2794e32.js";import{S as p,C as H}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{S as h}from"./strut-c6011196.js";import{T as g,B as u}from"./footnote-761d2bcc.js";import{b as r,a as y,M as _}from"./one-pane-dialog-da34165b.js";import{C as I}from"./component-info-cedbe096.js";import{p as b}from"./package-5b48c142.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./with-action-scheduler-7e779422.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";const W={phone:{name:"phone",styles:{width:"320px",height:"568px"}},tablet:{name:"tablet",styles:{width:"640px",height:"960px"}},desktop:{name:"desktop",styles:{width:"1024px",height:"768px"}}},te={title:"Modal/Building Blocks/ModalDialog",component:r,decorators:[a=>e(o,{style:t.example,children:e(a,{})})],parameters:{componentSubtitle:e(I,{name:b.name,version:b.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},viewport:{viewports:W,defaultViewport:"desktop"},chromatic:{viewports:[320,640,1024]}},argTypes:{children:{control:{type:null}},above:{control:{type:null}},below:{control:{type:null}}}},d={render:a=>e(o,{style:t.previewSizer,children:e(o,{style:t.modalPositioner,children:e(r,{"aria-labelledby":"modal-title-0",...a,children:e(y,{content:c(m,{children:[e(g,{id:"modal-title-0",children:"Modal Title"}),e(h,{size:p.large_24}),e(u,{children:"Here is some text in the modal."})]})})})})}),args:{style:{maxWidth:500,maxHeight:500}}},l=()=>e(o,{style:t.previewSizer,children:e(o,{style:t.modalPositioner,children:e(r,{"aria-labelledby":"modal-title-1",style:t.squareDialog,children:e(y,{content:c(m,{children:[e(g,{id:"modal-title-1",children:"Modal Title"}),e(h,{size:p.large_24}),e(u,{children:"Here is some text in the modal."})]})})})})});l.parameters={docs:{description:{story:'This is a basic `<ModalDialog>` that wraps a\n            `<ModalPanel>` element. The `<ModalDialog>` is just a a wrapper\n            for the visual components of the overall modal. It sets\n            the modal\'s role to `"dialog"`. If it did not have another\n            element as a child here (a `<ModalPanel>` in this case),\n            nothing would be visible. If the `<ModalDialog>` were not given\n            a `maxHeight` or `maxWidth` style, it would take up the\n            entire viewport. To demonstrate the difference between\n            the `<ModalDialog>` and the `<ModalPanel>` elements, the panel\n            has been given a smaller height and width than `<ModalDialog>`,\n            and `<ModalDialog>` has been given a dark blue background.'}}};const n=()=>{const a={background:"url(./modal-above.png)",width:874,height:551,position:"absolute",top:40,left:-140},s={background:"url(./modal-below.png)",width:868,height:521,position:"absolute",top:-100,left:-300};return e(o,{style:t.previewSizer,children:e(o,{style:t.modalPositioner,children:e(r,{"aria-labelledby":"modal-title-2",style:t.squareDialog,above:e(o,{style:a}),below:e(o,{style:s}),children:e(y,{content:c(m,{children:[e(g,{id:"modal-title-2",children:"Modal Title"}),e(h,{size:p.large_24}),e(u,{children:"Here is some text in the modal."})]})})})})})};n.parameters={docs:{description:{story:"The `above` and `below` props work the same\n            for `<ModalDialog>` as they do for `<OnePaneDialog>`.\n            The element passed into the `above` prop is rendered in front\n            of the modal. The element passed into the `below` prop is\n            rendered behind the modal. In this example, a `<View>` element\n            with a background image of a person and an orange blob is passed\n            into the `below` prop. A `<View>` element with a background\n            image of an arc and a blue semicircle is passed into the `above`\n            prop. This results in the person's head and the orange blob\n            peeking out from behind the modal, and the arc and semicircle\n            going over the front of the modal."}}};const i=()=>e(_,{modal:({closeModal:s})=>e(r,{"aria-labelledby":"modal-title-3",style:t.squareDialog,children:e(y,{content:c(m,{children:[e(g,{id:"modal-title-3",children:"Modal Title"}),e(h,{size:p.large_24}),e(u,{children:"Here is some text in the modal."})]})})}),children:({openModal:s})=>e(C,{onClick:s,children:"Click me to open the modal"})});i.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"A modal can be launched using a launcher. Here,\n            the launcher is a `<Button>` element whose `onClick` function\n            opens the modal. The modal passed into the `modal` prop of\n            the `<ModalLauncher>` element is a `<ModalDialog>` element.\n            To turn an element into a launcher, wrap the element in a\n            `<ModalLauncher>` element."}}};const t=z.StyleSheet.create({example:{alignItems:"center",justifyContent:"center"},modalPositioner:{backgroundImage:"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",backgroundSize:"20px 20px",backgroundPosition:"0 0, 0 10px, 10px -10px, -10px 0px",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",left:0,right:0,top:0,bottom:0},previewSizer:{minHeight:600,width:"100%"},row:{flexDirection:"row",justifyContent:"flex-end"},footer:{alignItems:"center",flexDirection:"row",justifyContent:"space-between",width:"100%"},squareDialog:{maxHeight:500,maxWidth:500,backgroundColor:H.darkBlue},smallSquarePanel:{maxHeight:400,maxWidth:400}});var w,M,f;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <ModalDialog aria-labelledby="modal-title-0" {...args}>
                    <ModalPanel content={<>
                                <Title id="modal-title-0">Modal Title</Title>
                                <Strut size={Spacing.large_24} />
                                <Body>Here is some text in the modal.</Body>
                            </>} />
                </ModalDialog>
            </View>
        </View>,
  args: {
    style: {
      maxWidth: 500,
      maxHeight: 500
    }
  }
}`,...(f=(M=d.parameters)==null?void 0:M.docs)==null?void 0:f.source}}};var x,S,v;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`() => <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <ModalDialog aria-labelledby="modal-title-1" style={styles.squareDialog}>
                <ModalPanel content={<>
                            <Title id="modal-title-1">Modal Title</Title>
                            <Strut size={Spacing.large_24} />
                            <Body>Here is some text in the modal.</Body>
                        </>} />
            </ModalDialog>
        </View>
    </View>`,...(v=(S=l.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var D,T,k;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const aboveStyle = ({
    background: "url(./modal-above.png)",
    width: 874,
    height: 551,
    position: "absolute",
    top: 40,
    left: -140
  } as const);
  const belowStyle = ({
    background: "url(./modal-below.png)",
    width: 868,
    height: 521,
    position: "absolute",
    top: -100,
    left: -300
  } as const);
  return <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <ModalDialog aria-labelledby="modal-title-2" style={styles.squareDialog} above={<View style={aboveStyle} />} below={<View style={belowStyle} />}>
                    <ModalPanel content={<>
                                <Title id="modal-title-2">Modal Title</Title>
                                <Strut size={Spacing.large_24} />
                                <Body>Here is some text in the modal.</Body>
                            </>} />
                </ModalDialog>
            </View>
        </View>;
}`,...(k=(T=n.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var B,P,V;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  type MyModalProps = {
    closeModal: () => void;
  };
  const MyModal = ({
    closeModal
  }: MyModalProps): React.ReactElement => <ModalDialog aria-labelledby="modal-title-3" style={styles.squareDialog}>
            <ModalPanel content={<>
                        <Title id="modal-title-3">Modal Title</Title>
                        <Strut size={Spacing.large_24} />
                        <Body>Here is some text in the modal.</Body>
                    </>} />
        </ModalDialog>;
  return <ModalLauncher modal={MyModal}>
            {({
      openModal
    }) => <Button onClick={openModal}>Click me to open the modal</Button>}
        </ModalLauncher>;
}`,...(V=(P=i.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};const oe=["Default","Simple","WithAboveAndBelow","WithLauncher"];export{d as Default,l as Simple,n as WithAboveAndBelow,i as WithLauncher,oe as __namedExportsOrder,te as default};
//# sourceMappingURL=modal-dialog.stories-e1674bd1.js.map
