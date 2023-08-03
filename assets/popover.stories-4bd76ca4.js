import{a as e,j as m}from"./jsx-runtime-309e447d.js";import{r as b}from"./index-9f32f44c.js";import{V as d,l as re}from"./render-state-root-891c0d56.js";import{B as o}from"./button-b2794e32.js";import{S as w}from"./strut-c6011196.js";import{S as C}from"./index-f641b98f.js";import{a as ae}from"./footnote-761d2bcc.js";import{P as h,p as T,a as i}from"./package-2cfe7d80.js";import{C as pe}from"./component-info-cedbe096.js";import{Default as X,Emphasized as Z,WithIcon as ee,WithIllustration as te}from"./popover-content.stories-0d3ef4c5.js";import{WithIcon as oe,WithDetailCell as ne,Dark as se}from"./popover-content-core.stories-7042a270.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./tooltip-f80a1c8a.js";import"./one-pane-dialog-da34165b.js";import"./with-action-scheduler-7e779422.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";import"./detail-cell.stories-6409cf17.js";import"./compact-cell.argtypes-ad65c4dc.js";const le=X,ce=Z,de=ee,ue=te,me=oe,he=ne,ge=se,y={withTextOnly:e(le,{...X.args}),withEmphasis:e(ce,{...Z.args}),withIcon:e(de,{...ee.args}),withIllustration:e(ue,{...te.args}),coreWithIcon:e(me,{...oe.args}),coreWithCell:e(he,{...ne.args}),coreDark:e(ge,{...se.args})},ve={children:{control:{type:null}},placement:{control:{type:"select",options:["top","bottom","right","left"]}},content:{control:{type:"select"},defaultValue:y.withTextOnly,options:Object.keys(y),mapping:y}},$e={title:"Popover/Popover",component:h,argTypes:ve,parameters:{componentSubtitle:e(pe,{name:T.name,version:T.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},chromatic:{disableSnapshot:!0}},decorators:[t=>e(d,{style:s.example,children:e(t,{})})]},s=re.StyleSheet.create({container:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",height:"calc(100vh - 16px)"},example:{alignItems:"center",justifyContent:"center"},row:{flexDirection:"row"},actions:{alignItems:"center",flex:1,justifyContent:"space-between"}}),g={args:{children:e(o,{children:"Open default popover"}),content:e(i,{closeButtonVisible:!0,title:"Title",content:"The popover content."}),placement:"top",dismissEnabled:!0,id:"",initialFocusId:"",testId:"",onClose:()=>{}}},u={args:{children:e(o,{children:"Open popover without tail"}),content:e(i,{closeButtonVisible:!0,title:"Title",content:"The popover content. This popover does not have a tail."}),placement:"top",dismissEnabled:!0,id:"",initialFocusId:"",testId:"",onClose:()=>{},showTail:!1}},a=()=>e(h,{dismissEnabled:!0,content:e(i,{closeButtonVisible:!0,title:"Title",content:"The popover content.",image:e("img",{src:"/illustration.svg",alt:"An illustration of a person skating on a pencil",width:288,height:200})}),children:({open:t})=>e(o,{onClick:t,children:"Trigger element"})});a.parameters={docs:{description:{story:"This example shows a popover adorning the same element that\n                triggers it. This is accomplished by passing a function as\n                children and using the `open` property passed it as the\n                `onClick` handler on a button in this example.\n\n**NOTES:**\n- You will always need to add a trigger element inside the\n                Popover to control when and/or from where to open the popover\n                dialog.\n- For this example, if you use the `image` prop, make sure\n                to avoid using `icon` and/or `emphasized` at the same time.\n                Doing so will throw an error.\n- This example uses the `dismissEnabled` prop. This means\n                that the user can close the Popover by pressing `Esc` or\n                clicking in the trigger element."}}};const p=()=>{const[t,r]=b.useState(!0);return m(d,{style:s.row,children:[e(h,{opened:t,onClose:()=>{r(!1)},content:({close:n})=>e(i,{title:"Controlled popover",content:"This popover is controlled programatically. This means that is only displayed using the `opened` prop.",actions:e(o,{onClick:()=>{n()},children:"Click to close the popover"})}),children:e(o,{onClick:()=>console.log("This is a controlled popover."),children:"Anchor element (it does not open the popover)"})}),e(w,{size:C.xLarge_32}),e(o,{onClick:()=>r(!0),children:"Outside button (click here to re-open the popover)"})]})};p.parameters={docs:{description:{story:"Sometimes you'll want to trigger a popover programmatically.\n                This can be done by setting the `opened` prop to `true`. In\n                this situation the `Popover` is a controlled component. The\n                parent is responsible for managing the opening/closing of the\n                popover when using this prop. This means that you'll also have\n                to update `opened` to `false` in response to the\n                `onClose` callback being triggered.\n\nHere you can see as well how the focus is managed when a\n                popover is opened. To see more details, please check the\n                **Accesibility section**."}}};const l=()=>{const[t,r]=b.useState(1),n=5;return e(h,{content:({close:ie})=>e(i,{title:"Popover with actions",content:"This example shows a popover which contains a set of actions that can be used to control the popover itself.",actions:m(d,{style:[s.row,s.actions],children:[m(ae,{children:["Step ",t," of ",n]}),e(w,{size:C.medium_16}),e(o,{kind:"tertiary",onClick:()=>{t<n?r(t+1):ie()},children:t<n?"Skip this step":"Finish"})]})}),placement:"top",children:e(o,{children:"Open popover with actions"})})};l.parameters={docs:{description:{story:"Sometimes you need to add actions to be able to\n            control the popover state. For this reason, you can make use of the\n            `actions` prop:"}}};const c={args:{children:e(o,{children:'Open with initial focus on the "It is focused!" button'}),content:e(i,{title:`
            Setting initialFocusId`,content:"The focus will be set on the second button",actions:m(d,{style:s.row,children:[e(o,{kind:"tertiary",id:"popover-button-1",children:"No focus"}),e(w,{size:C.medium_16}),e(o,{kind:"tertiary",id:"popover-button-2",children:"It is focused!"})]})}),placement:"top",dismissEnabled:!0,initialFocusId:"popover-button-2"}};c.storyName="With initialFocusId";c.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`Sometimes, you may want a specific element inside
            the Popover to receive focus first. This can be done using the
            \`initialFocusId\` prop on the \`<Popover>\` element.
            Just pass in the ID of the element that should receive focus,
            and it will automatically receieve focus once the popover is
            displayed.
            In this example, the first button would have received the focus
            by default, but the second button receives focus instead
            since its ID is passed into the \`initialFocusId\` prop.`}}};const v=({placement:t})=>{const[r,n]=b.useState(!0);return e(d,{style:s.example,children:e(h,{placement:t,opened:r,onClose:()=>n(!1),content:e(i,{title:"Title",content:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo.",closeButtonVisible:!0}),children:e(o,{onClick:()=>{n(!0)},children:`Open popover: ${t}`})})})},f={render:()=>m(d,{style:s.container,children:[e(v,{placement:"left"}),e(v,{placement:"bottom"}),e(v,{placement:"right"}),e(v,{placement:"top"})]})};var S,I,k;g.parameters={...g.parameters,docs:{...(S=g.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: ({
    children: <Button>Open default popover</Button>,
    content: <PopoverContent closeButtonVisible title="Title" content="The popover content." />,
    placement: "top",
    dismissEnabled: true,
    id: "",
    initialFocusId: "",
    testId: "",
    onClose: () => {}
  } as PopoverArgs)
}`,...(k=(I=g.parameters)==null?void 0:I.docs)==null?void 0:k.source}}};var B,P,x,E,W;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: ({
    children: <Button>Open popover without tail</Button>,
    content: <PopoverContent closeButtonVisible title="Title" content="The popover content. This popover does not have a tail." />,
    placement: "top",
    dismissEnabled: true,
    id: "",
    initialFocusId: "",
    testId: "",
    onClose: () => {},
    showTail: false
  } as PopoverArgs)
}`,...(x=(P=u.parameters)==null?void 0:P.docs)==null?void 0:x.source},description:{story:"No tail",...(W=(E=u.parameters)==null?void 0:E.docs)==null?void 0:W.description}}};var O,V,F,D,A;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`() => <Popover dismissEnabled={true} content={<PopoverContent closeButtonVisible title="Title" content="The popover content." image={<img src="/illustration.svg" alt="An illustration of a person skating on a pencil" width={288} height={200} />} />}>
        {({
    open
  }) => <Button onClick={open}>Trigger element</Button>}
    </Popover>`,...(F=(V=a.parameters)==null?void 0:V.docs)==null?void 0:F.source},description:{story:"Using a trigger element",...(A=(D=a.parameters)==null?void 0:D.docs)==null?void 0:A.description}}};var z,_,L,N,j;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [opened, setOpened] = React.useState(true);
  return <View style={styles.row}>
            <Popover opened={opened} onClose={() => {
      setOpened(false);
    }} content={({
      close
    }) => <PopoverContent title="Controlled popover" content="This popover is controlled programatically. This means that is only displayed using the \`opened\` prop." actions={<Button onClick={() => {
      close();
    }}>
                                Click to close the popover
                            </Button>} />}>
                <Button
      // eslint-disable-next-line no-console
      onClick={() => console.log("This is a controlled popover.")}>
                    Anchor element (it does not open the popover)
                </Button>
            </Popover>
            <Strut size={Spacing.xLarge_32} />
            <Button onClick={() => setOpened(true)}>
                Outside button (click here to re-open the popover)
            </Button>
        </View>;
}`,...(L=(_=p.parameters)==null?void 0:_.docs)==null?void 0:L.source},description:{story:"Opening a popover programatically (Controlled)",...(j=(N=p.parameters)==null?void 0:N.docs)==null?void 0:j.description}}};var q,$,R,U,H;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const [step, setStep] = React.useState(1);
  const totalSteps = 5;
  return <Popover content={({
    close
  }) => <PopoverContent title="Popover with actions" content="This example shows a popover which contains a set of actions that can be used to control the popover itself." actions={<View style={[styles.row, styles.actions]}>
                            <LabelLarge>
                                Step {step} of {totalSteps}
                            </LabelLarge>
                            <Strut size={Spacing.medium_16} />
                            <Button kind="tertiary" onClick={() => {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        close();
      }
    }}>
                                {step < totalSteps ? "Skip this step" : "Finish"}
                            </Button>
                        </View>} />} placement="top">
            <Button>Open popover with actions</Button>
        </Popover>;
}`,...(R=($=l.parameters)==null?void 0:$.docs)==null?void 0:R.source},description:{story:"With Actions",...(H=(U=l.parameters)==null?void 0:U.docs)==null?void 0:H.description}}};var J,M,Y;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: ({
    children: <Button>
                Open with initial focus on the &quot;It is focused!&quot; button
            </Button>,
    content: <PopoverContent title="
            Setting initialFocusId" content="The focus will be set on the second button" actions={<View style={styles.row}>
                        <Button kind="tertiary" id="popover-button-1">
                            No focus
                        </Button>
                        <Strut size={Spacing.medium_16} />
                        <Button kind="tertiary" id="popover-button-2">
                            It is focused!
                        </Button>
                    </View>} />,
    placement: "top",
    dismissEnabled: true,
    initialFocusId: "popover-button-2"
  } as PopoverArgs)
}`,...(Y=(M=c.parameters)==null?void 0:M.docs)==null?void 0:Y.source}}};var G,K,Q;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <View style={styles.container}>
            <BasePopoverExample placement="left" />
            <BasePopoverExample placement="bottom" />
            <BasePopoverExample placement="right" />
            <BasePopoverExample placement="top" />
        </View>
}`,...(Q=(K=f.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const Re=["Default","NoTail","TriggerElement","Controlled","WithActions","WithInitialFocusId","PopoverAlignment"];export{p as Controlled,g as Default,u as NoTail,f as PopoverAlignment,a as TriggerElement,l as WithActions,c as WithInitialFocusId,Re as __namedExportsOrder,$e as default};
//# sourceMappingURL=popover.stories-4bd76ca4.js.map
