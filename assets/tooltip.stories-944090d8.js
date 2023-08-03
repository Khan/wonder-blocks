import{a as t,j as y}from"./jsx-runtime-309e447d.js";import{r as et}from"./index-9f32f44c.js";import{V as e,l as nt}from"./render-state-root-891c0d56.js";import{w as Z,u as tt}from"./index-cdbaf94c.js";import{e as ot}from"./index-c40e7184.js";import{B as b}from"./button-b2794e32.js";import{S as l,C as it}from"./index-f641b98f.js";import{T as st}from"./labeled-text-field-d77d5301.js";import{I as rt}from"./icon-button-297fafd1.js";import"./icon-a4f17d53.js";import{s as at}from"./icon-assets-a0b49981.js";import{O as lt,M as ct}from"./one-pane-dialog-da34165b.js";import{B as pt}from"./footnote-761d2bcc.js";import{T as i}from"./tooltip-f80a1c8a.js";import{p as w}from"./package-d1ae22b0.js";import{C as dt}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./index-356e4a49.js";import"./index-d475d2ea.js";import"./_baseIsEqual-976d9d82.js";import"./index-03bbf7d1.js";import"./uniq-944679ca.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./radio-0fc824b1.js";import"./strut-c6011196.js";import"./index-9c2d1831.js";import"./with-action-scheduler-7e779422.js";import"./maybe-get-portal-mounted-modal-host-element-fbe11998.js";const qt={title:"Tooltip / Tooltip",component:i,argTypes:{placement:{control:{type:"select",options:["top","bottom","right","left"]}},title:{control:{type:"text"}}},args:{forceAnchorFocusivity:!0,placement:"top"},parameters:{componentSubtitle:t(dt,{name:w.name,version:w.version}),chromatic:{delay:500}},decorators:[n=>t(e,{style:o.storyCanvas,children:n()})]},c={args:{content:"This is a text tooltip on the top",children:"some text"}};c.play=async({canvasElement:n})=>{const s=Z(n.ownerDocument.body),r=await s.findByText("some text");await tt.hover(r),await ot(await s.findByText("This is a text tooltip on the top")).toBeInTheDocument()};const a={args:{forceAnchorFocusivity:!1,placement:"bottom",id:"my-a11y-tooltip",title:"This tooltip has a title",content:"I'm at the bottom!",children:y(e,{children:["Some text",t(st,{"aria-describedby":"my-a11y-tooltip",id:"",onChange:()=>{},value:""})]})}};a.play=async({canvasElement:n})=>{const s=Z(n.ownerDocument.body),r=await s.findByText("Some text");await tt.hover(r),await ot(await s.findByText("This tooltip has a title")).toBeInTheDocument()};a.parameters={docs:{description:{story:"In this example, we're no longer forcing the anchor root to be focusable, since the text input can take focus. However, that needs a custom accessibility implementation too (for that, we should use `UniqueIDProvider`, but we'll cheat here and give our own identifier)."}}};const p=()=>t(e,{style:o.scrollbox,children:t(e,{style:o.hostbox,children:y(pt,{children:["This is a big long piece of text with a",t(i,{content:"This tooltip will disappear when scrolled out of bounds",placement:"bottom",children:"[tooltip]"})," ","in the middle."]})})});p.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"In this example, we have the anchor in a scrollable parent. Notice how, when the anchor is focused but scrolled out of bounds, the tooltip disappears."}}};const d=()=>{const n=t(e,{style:o.scrollbox,children:t(e,{style:o.hostbox,children:t(i,{content:"I'm on the left!",placement:"left",children:"tooltip"})})}),s=t(lt,{title:"My modal",footer:"Still my modal",content:t(e,{style:o.modalbox,children:n})});return t(ct,{modal:s,children:({openModal:r})=>t(b,{onClick:r,children:"Click here!"})})};d.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"This checks that the tooltip works how we want inside a modal. Click the button to take a look."}}};const m={render:()=>y(e,{style:o.row,children:[t(i,{content:"Tooltip A",placement:"bottom",children:t(e,{style:o.block,children:"A"})}),t(i,{content:"Tooltip B",placement:"bottom",children:t(e,{style:o.block,children:"B"})}),t(i,{content:"Tooltip C",placement:"bottom",children:t(e,{style:o.block,children:"C"})}),t(i,{content:"Tooltip D",placement:"bottom",children:t(e,{style:o.block,children:"D"})})]}),name:"Side-by-side"};m.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"Here, we can see that the first tooltip shown has an initial delay before it appears, as does the last tooltip shown, yet when moving between tooltipped items, the transition from one to another is instantaneous."}}};const h=()=>y(e,{style:[o.centered,o.row],children:[t(i,{content:"This is a tooltip on a button.",children:t(b,{disabled:!1,children:"Example 1"})}),t(i,{content:"This is a tooltip on a disabled button.",placement:"bottom",children:t(b,{disabled:!0,children:"Example 2"})}),t(i,{content:"Short and stout",children:t(rt,{icon:at,"aria-label":"search",onClick:()=>{}})})]});h.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"This example shows tooltips on different types of buttons."}}};const u=()=>{const[n,s]=et.useState(!0),r=`Click to ${n?"close":"open"} tooltip`;return y(e,{style:[o.centered,o.row],children:[t(i,{content:"You opened the tooltip with a button",opened:n,children:"tooltip"}),t(b,{onClick:()=>s(!n),children:r})]})};u.parameters={docs:{description:{story:"Sometimes you'll want to trigger a tooltip programmatically.\n               This can be done by setting the `opened` prop to `true`. In\n               this situation the `Tooltip` is a controlled component. The\n               parent is responsible for managing the opening/closing of the\n               tooltip when using this prop. This means that you'll also have\n               to update `opened` to `false` in response to the\n               `onClose` callback being triggered."}}};const o=nt.StyleSheet.create({storyCanvas:{minHeight:280,padding:l.xxxLarge_64,justifyContent:"center",textAlign:"center"},row:{flexDirection:"row"},centered:{alignItems:"center",justifyContent:"center",gap:l.medium_16,padding:l.xxLarge_48},scrollbox:{height:100,overflow:"auto",border:"1px solid black",margin:l.small_12},hostbox:{minHeight:"200vh"},modalbox:{height:"200vh"},block:{border:`solid 1px ${it.lightBlue}`,width:l.xLarge_32,height:l.xLarge_32,alignItems:"center",justifyContent:"center"}});var T,x,f,g,C;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: ({
    content: "This is a text tooltip on the top",
    children: "some text"
  } as TooltipArgs)
}`,...(f=(x=c.parameters)==null?void 0:x.docs)==null?void 0:f.source},description:{story:"Default example (interactive).",...(C=(g=c.parameters)==null?void 0:g.docs)==null?void 0:C.description}}};var S,B,k,V,v;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: ({
    forceAnchorFocusivity: false,
    placement: "bottom",
    id: "my-a11y-tooltip",
    title: "This tooltip has a title",
    content: "I'm at the bottom!",
    children: <View>
                Some text
                <TextField aria-describedby="my-a11y-tooltip" id="" onChange={() => {}} value="" />
            </View>
  } as TooltipArgs)
}`,...(k=(B=a.parameters)==null?void 0:B.docs)==null?void 0:k.source},description:{story:"Complex anchor & title tooltip",...(v=(V=a.parameters)==null?void 0:V.docs)==null?void 0:v.description}}};var I,A,D,M,O;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`() => <View style={styles.scrollbox}>
        <View style={styles.hostbox}>
            <Body>
                This is a big long piece of text with a
                <Tooltip content="This tooltip will disappear when scrolled out of bounds" placement="bottom">
                    [tooltip]
                </Tooltip>{" "}
                in the middle.
            </Body>
        </View>
    </View>`,...(D=(A=p.parameters)==null?void 0:A.docs)==null?void 0:D.source},description:{story:"Anchor in scrollable parent & placement bottom",...(O=(M=p.parameters)==null?void 0:M.docs)==null?void 0:O.description}}};var _,E,L,j,F;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
  const scrollyContent = <View style={styles.scrollbox}>
            <View style={styles.hostbox}>
                <Tooltip content="I'm on the left!" placement="left">
                    tooltip
                </Tooltip>
            </View>
        </View>;
  const modal = <OnePaneDialog title="My modal" footer="Still my modal" content={<View style={styles.modalbox}>{scrollyContent}</View>} />;
  return <ModalLauncher modal={modal}>
            {({
      openModal
    }) => <Button onClick={openModal}>Click here!</Button>}
        </ModalLauncher>;
}`,...(L=(E=d.parameters)==null?void 0:E.docs)==null?void 0:L.source},description:{story:"Tooltip in a modal",...(F=(j=d.parameters)==null?void 0:j.docs)==null?void 0:F.description}}};var P,H,$,Y,q;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <View style={styles.row}>
            <Tooltip content="Tooltip A" placement="bottom">
                <View style={styles.block}>A</View>
            </Tooltip>
            <Tooltip content="Tooltip B" placement="bottom">
                <View style={styles.block}>B</View>
            </Tooltip>
            <Tooltip content="Tooltip C" placement="bottom">
                <View style={styles.block}>C</View>
            </Tooltip>
            <Tooltip content="Tooltip D" placement="bottom">
                <View style={styles.block}>D</View>
            </Tooltip>
        </View>,
  name: "Side-by-side"
}`,...($=(H=m.parameters)==null?void 0:H.docs)==null?void 0:$.source},description:{story:"Tooltips side-by-side",...(q=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:q.description}}};var N,R,U,z,G;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  return <View style={[styles.centered, styles.row]}>
            <Tooltip content={"This is a tooltip on a button."}>
                <Button disabled={false}>Example 1</Button>
            </Tooltip>
            <Tooltip content="This is a tooltip on a disabled button." placement="bottom">
                <Button disabled={true}>Example 2</Button>
            </Tooltip>
            <Tooltip content="Short and stout">
                <IconButton icon={icons.search} aria-label="search" onClick={() => {}} />
            </Tooltip>
        </View>;
}`,...(U=(R=h.parameters)==null?void 0:R.docs)==null?void 0:U.source},description:{story:"Tooltips on buttons",...(G=(z=h.parameters)==null?void 0:z.docs)==null?void 0:G.description}}};var J,K,Q,W,X;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const [opened, setOpened] = React.useState(true);
  const buttonText = \`Click to \${opened ? "close" : "open"} tooltip\`;
  return <View style={[styles.centered, styles.row]}>
            <Tooltip content="You opened the tooltip with a button" opened={opened}>
                tooltip
            </Tooltip>
            <Button onClick={() => setOpened(!opened)}>{buttonText}</Button>
        </View>;
}`,...(Q=(K=u.parameters)==null?void 0:K.docs)==null?void 0:Q.source},description:{story:"Opening a tooltip programatically (Controlled)",...(X=(W=u.parameters)==null?void 0:W.docs)==null?void 0:X.description}}};const Nt=["Default","ComplexAnchorAndTitle","AnchorInScrollableParent","TooltipInModal","SideBySide","TooltipOnButtons","Controlled"];export{p as AnchorInScrollableParent,a as ComplexAnchorAndTitle,u as Controlled,c as Default,m as SideBySide,d as TooltipInModal,h as TooltipOnButtons,Nt as __namedExportsOrder,qt as default};
//# sourceMappingURL=tooltip.stories-944090d8.js.map
