import{a as e,j as l,F as v}from"./jsx-runtime-309e447d.js";import{r as y}from"./index-9f32f44c.js";import{V as i,l as oe}from"./render-state-root-891c0d56.js";import{B as n}from"./button-b2794e32.js";import{A as $,b as ee}from"./multi-select-4619a451.js";import{L as I,R as te,C as B}from"./labeled-text-field-d77d5301.js";import{S as x}from"./strut-c6011196.js";import{S as w}from"./index-f641b98f.js";import{T as ne,B as C}from"./footnote-761d2bcc.js";import{M as a,O as d}from"./one-pane-dialog-da34165b.js";import{p as T}from"./package-5b48c142.js";import{C as ae}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./icon-assets-a0b49981.js";import"./search-field-66099b8d.js";import"./icon-button-297fafd1.js";import"./with-action-scheduler-7e779422.js";import"./assertThisInitialized-081f9914.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";import"./radio-0fc824b1.js";const se={modal:{control:{type:null},description:`The modal to render. The modal will be rendered inside
            of a container whose parent is document.body. This allows us to
            use ModalLauncher within menus and other components that clip
            their content. If the modal needs to close itself by some other
            means than tapping the backdrop or the default close button a
            render callback can be passed. The closeModal function provided
            to this callback can be called to close the modal.
            **Note**: Don't call \`closeModal\` while rendering! It should
            be used to respond to user intearction, like \`onClick\`.`,table:{type:{summary:"ModalElement | (({|closeModal: () => void|}) => ModalElement)"}},type:{name:"other",value:"ModalElement | (({|closeModal: () => void|}) => ModalElement)",required:!0}},backdropDismissEnabled:{control:{type:"boolean"},defaultValue:"true",description:"Enables the backdrop to dismiss the modal on click/tap.",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},initialFocusId:{control:{type:"text"},description:`The selector for the element that will be focused
            when the dialog shows. When not set, the first tabbable element
            within the dialog will be used.`,table:{type:{summary:"string"}}},closedFocusId:{control:{type:"text"},description:`The selector for the element that will be focused
            after the dialog closes. When not set, the last element focused
            outside the modal will be used if it exists.`,table:{type:{summary:"string"}}},testId:{control:{type:"text"},description:"Test ID used for e2e testing. It's set on the ModalBackdrop",table:{type:{summary:"string"}}},opened:{control:{type:"boolean"},description:`Renders the modal when true, renders nothing when false.
            Using this prop makes the component behave as a controlled
            component. The parent is responsible for managing the
            opening/closing of the modal when using this prop.  \`onClose\`
            should always be used and \`children\` should never be used with
            this prop.  Not doing so will result in an error being thrown.`,table:{category:"Controlled",type:{summary:"boolean"}}},onClose:{description:"If the parent needs to be notified when the modal is\n            closed, use this prop. You probably want to use this instead of\n            `onClose` on the modals themselves, since this will capture a\n            more complete set of close events. `onClose` is required when\n            the component is being used as a controlled component.",table:{category:"Controlled",type:{summary:"() => mixed"}}}},le={phone:{name:"phone",styles:{width:"320px",height:"568px"}},tablet:{name:"tablet",styles:{width:"640px",height:"960px"}},desktop:{name:"desktop",styles:{width:"1024px",height:"768px"}}},S=()=>e(d,{title:"Single-line title",content:e(i,{children:e(C,{children:`Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id
                    est.`})})}),Ae={title:"Modal/ModalLauncher",component:a,decorators:[o=>e(i,{style:re.example,children:e(o,{})})],parameters:{componentSubtitle:e(ae,{name:T.name,version:T.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},viewport:{viewports:le,defaultViewport:"desktop"},chromatic:{viewports:[320,640,1024]}},argTypes:se},u={render:o=>e(a,{...o,modal:S,children:({openModal:t})=>e(n,{onClick:t,children:"Click me to open the modal"})})};u.parameters={chromatic:{disableSnapshot:!0}};const h=()=>e(a,{modal:S,children:({openModal:o})=>e(n,{onClick:o,children:"Click me to open the modal"})});h.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"This is a basic modal launcher. Its child, the\n            button, has access to the `openModal` function via the\n            function-as-child pattern. It passes this into its `onClick`\n            function, which causes the modal to launch when the button\n            is clicked."}}};const m=()=>e(a,{modal:({closeModal:t})=>e(d,{title:"Single-line title",content:e(i,{children:e(C,{children:`Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id
                        est.`})}),closeButtonVisible:!1,footer:e(n,{onClick:t,children:"Close"})}),children:({openModal:t})=>e(n,{onClick:t,children:"Click me to open the modal"})});m.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:'This is an example of a modal that uses\n            a close button other than the default "X" button in the top\n            right corner. Here, the default "X" close button is not rendered\n            because the `closeButtonVisible` prop on the `<OnePaneDialog>`\n            is set to false. Instead, a custom close button has been added\n            to the modal footer. The `modal` prop on `<ModalLauncher>`\n            can either be a plain modal, or it can be a function that takes\n            a `closeModal` function as a parameter and returns a modal.\n            The latter is what we do in this case. Then the `closeModal`\n            function is passed into the `onClick` prop on the button\n            in the footer.'}}};const p=()=>e(a,{modal:S,backdropDismissEnabled:!1,children:({openModal:o})=>e(n,{onClick:o,children:"Click me to open the modal"})});p.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"This is an example in which the modal _cannot_\n            be dismissed by clicking in in the backdrop. This is done by\n            setting the `backdropDismissEnabled` prop on the\n            `<ModalLauncher>` element to false."}}};const f=()=>{const[o,t]=y.useState(!1);return l(i,{children:[e($,{menuText:"actions",children:e(ee,{label:"Open modal",onClick:()=>{t(!0)}})}),e(a,{onClose:()=>{t(!1)},opened:o,modal:({closeModal:M})=>e(d,{title:"Triggered from action menu",content:e(i,{children:e(ne,{children:"Hello, world"})}),footer:e(n,{onClick:M,children:"Close Modal"})})})]})};f.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"Sometimes you'll want to trigger a modal\n            programmatically. This can be done by rendering `<ModalLauncher>`\n            without any children and instead setting its `opened` prop to\n            true. In this situation, `ModalLauncher` is a controlled\n            component which means you'll also have to update `opened` to\n            false in response to the `onClose` callback being triggered.\n            It is necessary to use this method in this example, as\n            `ActionMenu` cannot have a `ModalLauncher` element as a child,\n            (it can only have `Item` elements as children), so launching a\n            modal from a dropdown must be done programatically."}}};const b=()=>{const[o,t]=y.useState(!1),c=()=>{t(!0)},s=()=>{t(!1)};return l(i,{style:{gap:20},children:[e(n,{children:"Top of page (should not receive focus)"}),e(n,{id:"button-to-focus-on",children:"Focus here after close"}),e($,{menuText:"actions",children:e(ee,{label:"Open modal",onClick:()=>c()})}),e(a,{onClose:()=>s(),opened:o,closedFocusId:"button-to-focus-on",modal:S})]})};b.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`You can use the \`closedFocusId\` prop on the
            \`ModalLauncher\` to specify where to set the focus after the
            modal has been closed. Imagine the following situation:
            clicking on a dropdown menu option to open a modal
            causes the dropdown to close, and so all of the dropdown options
            are removed from the DOM. This can be a problem because by
            default, the focus shifts to the previously focused element after
            a modal is closed; in this case, the element that opened the modal
            cannot receive focus since it no longer exists in the DOM,
            so when you close the modal, it doesn't know where to focus on the
            page. When the previously focused element no longer exists,
            the focus shifts to the page body, which causes a jump to
            the top of the page. This can make it diffcult to find the original
            dropdown. A solution to this is to use the \`closedFocusId\` prop            to specify where to set the focus after the modal has been closed.
            In this example, \`closedFocusId\` is set to the ID of the button
            labeled "Focus here after close." If the focus shifts to the button
            labeled "Top of page (should not receieve focus)," then the focus
            is on the page body, and the \`closedFocusId\` did not work.`}}};const g=()=>{const[o,t]=y.useState("Previously stored value"),[c,s]=y.useState("");return e(a,{modal:({closeModal:k})=>e(d,{title:"Single-line title",content:l(v,{children:[e(I,{label:"Label",value:o,onChange:t}),e(x,{size:w.large_24}),e(I,{label:"Label 2",value:c,onChange:s,id:"text-field-to-be-focused"})]}),footer:l(v,{children:[e(n,{kind:"tertiary",onClick:k,children:"Cancel"}),e(x,{size:w.medium_16}),e(n,{onClick:k,children:"Submit"})]})}),initialFocusId:"text-field-to-be-focused-field",children:({openModal:k})=>e(n,{onClick:k,children:"Open modal with initial focus"})})};g.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`Sometimes, you may want a specific element inside
            the modal to receive focus first. This can be done using the
            \`initialFocusId\` prop on the \`<ModalLauncher>\` element.
            Just pass in the ID of the element that should receive focus,
            and it will automatically receieve focus once the modal opens.
            In this example, the top text input would have received the focus
            by default, but the bottom text field receives focus instead
            since its ID is passed into the \`initialFocusId\` prop.`}}};const ie=()=>e(d,{title:"Submodal",content:l(i,{style:{gap:w.medium_16},children:[e(C,{children:"This modal demonstrates how the focus trap works when a modal is opened from another modal."}),e(C,{children:"Try navigating this modal with the keyboard and then close it. The focus should be restored to the button that opened the modal."}),e(I,{label:"Label",value:"",onChange:()=>{}}),e(n,{children:"A focusable element"})]})}),r=()=>{const[o,t]=y.useState(null);return e(a,{modal:({closeModal:s})=>e(d,{title:"Testing the focus trap on multiple modals",closeButtonVisible:!1,content:l(v,{children:[e(C,{id:"focus-trap-story-body-text",children:"This modal demonstrates how the focus trap works with form elements (or focusable elements). Also demonstrates how the focus trap is moved to the next modal when it is opened (focus/tap on the `Open another modal` button)."}),e(x,{size:w.large_24}),l(te,{label:"A RadioGroup component inside a modal",description:"Some description",groupName:"some-group-name",onChange:t,selectedValue:o??"",children:[e(B,{label:"Choice 1",value:"some-choice-value"}),e(B,{label:"Choice 2",value:"some-choice-value-2"})]})]}),footer:l(v,{children:[e(a,{modal:ie,children:({openModal:M})=>e(n,{kind:"secondary",onClick:M,children:"Open another modal"})}),e(x,{size:w.medium_16}),e(n,{onClick:s,disabled:!o,children:"Next"})]}),"aria-describedby":"focus-trap-story-body-text"}),children:({openModal:s})=>e(n,{onClick:s,children:"Open modal with RadioGroup"})})};r.storyName="Navigation with focus trap";r.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`All modals have a focus trap, which means that the
            focus is locked inside the modal. This is done to prevent the user
            from tabbing out of the modal and losing their place. The focus
            trap is also used to ensure that the focus is restored to the
            correct element when the modal is closed. In this example, the
            focus is trapped inside the modal, and the focus is restored to the
            button that opened the modal when the modal is closed.

Also, this example includes a sub-modal that is opened from the
            first modal so we can test how the focus trap works when multiple
            modals are open.`}}};const re=oe.StyleSheet.create({example:{alignItems:"center",justifyContent:"center"},row:{flexDirection:"row"}});var L,O,F;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <ModalLauncher {...args} modal={DefaultModal}>
            {({
      openModal
    }) => <Button onClick={openModal}>Click me to open the modal</Button>}
        </ModalLauncher>
}`,...(F=(O=u.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var V,D,A;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`() => <ModalLauncher modal={DefaultModal}>
        {({
    openModal
  }) => <Button onClick={openModal}>Click me to open the modal</Button>}
    </ModalLauncher>`,...(A=(D=h.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var E,q,R;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  type MyModalProps = {
    closeModal: () => void;
  };
  const ModalWithCloseButton = ({
    closeModal
  }: MyModalProps): React.ReactElement => <OnePaneDialog title="Single-line title" content={<View>
                    <Body>
                        {\`Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id
                        est.\`}
                    </Body>
                </View>}
  // No "X" close button in the top right corner
  closeButtonVisible={false} footer={<Button onClick={closeModal}>Close</Button>} />;
  return <ModalLauncher modal={ModalWithCloseButton}>
            {({
      openModal
    }) => <Button onClick={openModal}>Click me to open the modal</Button>}
        </ModalLauncher>;
}`,...(R=(q=m.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var W,_,P;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`() => <ModalLauncher modal={DefaultModal} backdropDismissEnabled={false}>
        {({
    openModal
  }) => <Button onClick={openModal}>Click me to open the modal</Button>}
    </ModalLauncher>`,...(P=(_=p.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var N,z,G;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const [opened, setOpened] = React.useState(false);
  const handleOpen = () => {
    setOpened(true);
  };
  const handleClose = () => {
    setOpened(false);
  };
  return <View>
            <ActionMenu menuText="actions">
                <ActionItem label="Open modal" onClick={handleOpen} />
            </ActionMenu>

            <ModalLauncher onClose={handleClose} opened={opened} modal={({
      closeModal
    }) => <OnePaneDialog title="Triggered from action menu" content={<View>
                                <Title>Hello, world</Title>
                            </View>} footer={<Button onClick={closeModal}>Close Modal</Button>} />}
    // Note that this modal launcher has no children.
    />
        </View>;
}`,...(G=(z=f.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var j,U,H;b.parameters={...b.parameters,docs:{...(j=b.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [opened, setOpened] = React.useState(false);
  const handleOpen = () => {
    setOpened(true);
  };
  const handleClose = () => {
    setOpened(false);
  };
  return <View style={{
    gap: 20
  }}>
            <Button>Top of page (should not receive focus)</Button>
            <Button id="button-to-focus-on">Focus here after close</Button>
            <ActionMenu menuText="actions">
                <ActionItem label="Open modal" onClick={() => handleOpen()} />
            </ActionMenu>
            <ModalLauncher onClose={() => handleClose()} opened={opened} closedFocusId="button-to-focus-on" modal={DefaultModal} />
        </View>;
}`,...(H=(U=b.parameters)==null?void 0:U.docs)==null?void 0:H.source}}};var X,Y,J;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("Previously stored value");
  const [value2, setValue2] = React.useState("");

  // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'closeModal' implicitly has an 'any' type.
  const modalInitialFocus = ({
    closeModal
  }) => <OnePaneDialog title="Single-line title" content={<>
                    <LabeledTextField label="Label" value={value} onChange={setValue} />
                    <Strut size={Spacing.large_24} />
                    <LabeledTextField label="Label 2" value={value2} onChange={setValue2} id="text-field-to-be-focused" />
                </>} footer={<>
                    <Button kind="tertiary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Strut size={Spacing.medium_16} />
                    <Button onClick={closeModal}>Submit</Button>
                </>} />;
  return <ModalLauncher modal={modalInitialFocus} initialFocusId="text-field-to-be-focused-field">
            {({
      openModal
    }) => <Button onClick={openModal}>
                    Open modal with initial focus
                </Button>}
        </ModalLauncher>;
}`,...(J=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var K,Q,Z;r.parameters={...r.parameters,docs:{...(K=r.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  const [selectedValue, setSelectedValue] = React.useState<any>(null);

  // @ts-expect-error [FEI-5019] - TS7031 - Binding element 'closeModal' implicitly has an 'any' type.
  const modalInitialFocus = ({
    closeModal
  }) => <OnePaneDialog title="Testing the focus trap on multiple modals" closeButtonVisible={false} content={<>
                    <Body id="focus-trap-story-body-text">
                        This modal demonstrates how the focus trap works with
                        form elements (or focusable elements). Also demonstrates
                        how the focus trap is moved to the next modal when it is
                        opened (focus/tap on the \`Open another modal\` button).
                    </Body>
                    <Strut size={Spacing.large_24} />
                    <RadioGroup label="A RadioGroup component inside a modal" description="Some description" groupName="some-group-name" onChange={setSelectedValue} selectedValue={selectedValue ?? ""}>
                        <Choice label="Choice 1" value="some-choice-value" />
                        <Choice label="Choice 2" value="some-choice-value-2" />
                    </RadioGroup>
                </>} footer={<>
                    <ModalLauncher modal={SubModal}>
                        {({
        openModal
      }) => <Button kind="secondary" onClick={openModal}>
                                Open another modal
                            </Button>}
                    </ModalLauncher>
                    <Strut size={Spacing.medium_16} />
                    <Button onClick={closeModal} disabled={!selectedValue}>
                        Next
                    </Button>
                </>} aria-describedby="focus-trap-story-body-text" />;
  return <ModalLauncher modal={modalInitialFocus}>
            {({
      openModal
    }) => <Button onClick={openModal}>Open modal with RadioGroup</Button>}
        </ModalLauncher>;
}`,...(Z=(Q=r.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};const Ee=["Default","Simple","WithCustomCloseButton","WithBackdropDismissDisabled","TriggeringProgrammatically","WithClosedFocusId","WithInitialFocusId","FocusTrap"];export{u as Default,r as FocusTrap,h as Simple,f as TriggeringProgrammatically,p as WithBackdropDismissDisabled,b as WithClosedFocusId,m as WithCustomCloseButton,g as WithInitialFocusId,Ee as __namedExportsOrder,Ae as default};
//# sourceMappingURL=modal-launcher.stories-9aceaa33.js.map
