import{a as e,j as r}from"./jsx-runtime-309e447d.js";import{e as s}from"./index-c40e7184.js";import{l as ge,V as o}from"./render-state-root-891c0d56.js";import{w as ke,u as fe,f as V}from"./index-cdbaf94c.js";import{C as x,S as C}from"./index-f641b98f.js";import"./index-9f32f44c.js";import"./icon-a4f17d53.js";import{h as L,l as D,j as ve}from"./icon-assets-a0b49981.js";import{S as i}from"./strut-c6011196.js";import{c as S}from"./footnote-761d2bcc.js";import{B as t}from"./button-b2794e32.js";import{C as Be}from"./component-info-cedbe096.js";import{M as he,S as be,R as we}from"./clickable-8a7f284d.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./_baseIsEqual-976d9d82.js";import"./index-03bbf7d1.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";const Ce="@khanacademy/wonder-blocks-button",Se="4.1.0",xe="v1",ze={access:"public"},He="",Ve="dist/index.js",Le="dist/es/index.js",De="dist/index.d.ts",Te={test:'echo "Error: no test specified" && exit 1'},Ne="",Re="MIT",We={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-clickable":"^3.1.1","@khanacademy/wonder-blocks-color":"^2.0.1","@khanacademy/wonder-blocks-core":"^5.3.0","@khanacademy/wonder-blocks-icon":"^2.0.14","@khanacademy/wonder-blocks-progress-spinner":"^2.0.14","@khanacademy/wonder-blocks-spacing":"^4.0.1","@khanacademy/wonder-blocks-typography":"^2.1.0"},Ie={aphrodite:"^1.2.5",react:"16.14.0","react-router":"5.2.1","react-router-dom":"5.3.0"},Me={"wb-dev-build-settings":"^0.9.7"},T={name:Ce,version:Se,design:xe,publishConfig:ze,description:He,main:Ve,module:Le,types:De,scripts:Te,author:Ne,license:Re,dependencies:We,peerDependencies:Ie,devDependencies:Me},Ee={children:{description:"Text to appear on the button.",type:{name:"string",required:!0}},icon:{description:"An icon, displayed to the left of the title.",type:{name:"other",value:"IconAsset",required:!1},control:{type:"select"},options:Object.keys(L),mapping:L,table:{category:"Layout",type:{summary:"IconAsset"}}},spinner:{description:"If true, replaces the contents with a spinner.",control:{type:"boolean"},table:{category:"Layout",type:{summary:"boolean",detail:"Setting this prop to `true` will disable the button."}}},color:{description:"The color of the button, either blue or red.",options:["default","destructive"],control:{type:"radio"},table:{category:"Theming",type:{summary:'"default" | "destructive"'}}},kind:{description:"The kind of the button, either primary, secondary, or tertiary.",options:["primary","secondary","tertiary"],control:{type:"select"},table:{type:{summary:"primary | secondary | tertiary"},defaultValue:{detail:`
                - Primary buttons have background colors.
- Secondary buttons have a border and no background color.
- Tertiary buttons have no background or border.
                `}}},light:{description:"Whether the button is on a dark/colored background.",control:{type:"boolean"},table:{category:"Theming",type:{summary:"boolean",detail:"Sets primary button background color to white, and secondary and tertiary button title to color."}}},size:{description:"The size of the button.",options:["small","medium","large"],control:{type:"select"},table:{category:"Layout",defaultValue:{detail:'"medium" = height: 40; "small" = height: 32; "large" = height: 56;'},type:{summary:'"medium" | "small" | "large"'}}},disabled:{description:"Whether the button is disabled.",table:{type:{summary:"boolean"}}},id:{description:"An optional id attribute.",control:{type:"text"},table:{type:{summary:"string"}}},testId:{description:"Test ID used for e2e testing.",control:{type:"text"},table:{type:{summary:"string"}}},tabIndex:{description:"Set the tabindex attribute on the rendered element.",control:{type:"number",min:-1},table:{type:{summary:"number"}}},style:{description:"Optional custom styles.",table:{category:"Layout",type:{summary:"StyleType"}}},className:{description:"Adds CSS classes to the Button.",control:{type:"text"},table:{category:"Layout",type:{summary:"string"}}},onClick:{action:"clicked",description:`Function to call when button is clicked.
        This callback should be used for things like marking BigBingo conversions. It should NOT be used to redirect to a different URL or to prevent navigation via e.preventDefault(). The event passed to this handler will have its preventDefault() and stopPropagation() methods stubbed out.
        `,table:{category:"Events",type:{summary:"(e: SyntheticEvent<>) => mixed",detail:`onClick is optional if href is present, but must be defined if
                    * href is not`}}},skipClientNav:{description:`Whether to avoid using client-side navigation. If the URL passed to href is local to the client-side, e.g. /math/algebra/eval-exprs, then it tries to use react-router-dom's Link component which handles the client-side navigation. You can set "skipClientNav" to true avoid using client-side nav entirely.`,control:{type:"boolean"},table:{category:"Navigation",type:{summary:"Note",detail:"All URLs containing a protocol are considered external, e.g. https://khanacademy.org/math/algebra/eval-exprs will trigger a full page reload."}}},rel:{description:'Specifies the type of relationship between the current document and the linked document. Should only be used when "href" is specified. This defaults to "noopener noreferrer" when target="_blank", but can be overridden by setting this prop to something else.',control:{type:"text"},table:{category:"Navigation",type:{summary:"string"}}},target:{description:`A target destination window for a link to open in. Should only be used
        * when "href" is specified.`,control:{type:"text"},table:{category:"Navigation",type:{summary:"string"}}},href:{description:"URL to navigate to.",control:{type:"text"},table:{category:"Navigation",type:{summary:"string",detail:"URL is required when we use `safeWithNav`"}}},beforeNav:{description:"Run async code before navigating. If the promise returned rejects then navigation will not occur. If both safeWithNav and beforeNav are provided, beforeNav will be run first and safeWithNav will only be run if beforeNav does not reject.",table:{category:"Navigation",type:{summary:"() => Promise<mixed>"}}},safeWithNav:{description:"Run async code in the background while client-side navigating. If the browser does a full page load navigation, the callback promise must be settled before the navigation will occur. Errors are ignored so that navigation is guaranteed to succeed.",table:{category:"Navigation",type:{summary:"() => Promise<mixed>"}}},ariaLabel:{name:"aria-label",description:"A label for the button.",table:{category:"Accessibility",type:{summary:"string",detail:"aria-label should be used when spinner={true} to let people using screen readers that the action taken by clicking the button will take some time to complete."}}}},it={title:"Button",component:t,parameters:{componentSubtitle:e(Be,{name:T.name,version:T.version})},argTypes:Ee,excludeStories:["styles"]},v={args:{children:"Hello, world!",kind:"primary",color:"default",size:"medium",light:!1,disabled:!1,style:{maxWidth:200},onClick:()=>{alert("Click!")}},parameters:{design:{type:"figma",url:"https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/%F0%9F%92%A0-Main-Components?type=design&node-id=389-0&mode=design"},chromatic:{disableSnapshot:!0}}},B={args:{onClick:()=>{},kind:"tertiary",testId:"test-button",children:"Hello, world!"},play:async({canvasElement:l})=>{const a=ke(l),c=a.getByRole("button"),z=getComputedStyle(c,":after"),H=a.getByTestId("test-button-inner-label"),f=getComputedStyle(H,":after");await s(c).toHaveStyle(`color: ${x.blue}`),await s(c).toHaveTextContent("Hello, world!"),await fe.hover(c),await s(f.height).toBe("2px"),await s(f.color).toBe("rgb(24, 101, 242)"),await V.focus(c),await s(z.borderColor).toBe("rgb(24, 101, 242)"),await s(z.borderWidth).toBe("2px"),await V.mouseDown(c),await s(H).toHaveStyle("color: rgb(27, 80, 179)"),await s(f.height).toBe("1px"),await s(f.color).toBe("rgb(27, 80, 179)")}},n=ge.StyleSheet.create({row:{flexDirection:"row",alignItems:"center",marginBottom:C.xSmall_8},button:{marginRight:C.xSmall_8},fillSpace:{minWidth:140},example:{background:x.offWhite,padding:C.medium_16}}),d={render:()=>r(o,{children:[r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},kind:"secondary",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},kind:"tertiary",children:"Hello, world!"})]}),e(i,{size:16}),r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},disabled:!0,children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},disabled:!0,kind:"secondary",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},disabled:!0,kind:"tertiary",children:"Hello, world!"})]}),e(i,{size:16}),r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},color:"destructive",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},kind:"secondary",color:"destructive",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},kind:"tertiary",color:"destructive",children:"Hello, world!"})]})]})};d.parameters={docs:{description:{story:"There are three kinds of buttons: `primary` (default), `secondary`, and `tertiary`."}}};const u={name:"Color",render:()=>r(o,{style:n.row,children:[e(t,{style:n.button,onClick:()=>{},color:"destructive",children:"Primary"}),e(t,{style:n.button,onClick:()=>{},kind:"secondary",color:"destructive",children:"Secondary"}),e(t,{style:n.button,onClick:()=>{},kind:"tertiary",color:"destructive",children:"Tertiary"})]})};u.parameters={docs:{description:{story:"Buttons have a `color` that is either `default` (the default, as shown above) or `destructive` (as can seen below):"}}};const y=()=>r(o,{style:{backgroundColor:x.darkBlue},children:[r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},light:!0,children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},light:!0,kind:"secondary",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},light:!0,kind:"tertiary",children:"Hello, world!"})]}),e(i,{size:16}),r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},light:!0,disabled:!0,children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},light:!0,disabled:!0,kind:"secondary",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},light:!0,disabled:!0,kind:"tertiary",children:"Hello, world!"})]}),e(i,{size:16}),r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},light:!0,color:"destructive",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},light:!0,kind:"secondary",color:"destructive",children:"Hello, world!"}),e(i,{size:16}),e(t,{onClick:()=>{},light:!0,kind:"tertiary",color:"destructive",children:"Hello, world!"})]})]});y.parameters={backgrounds:{default:"darkBlue"},docs:{description:{story:"Buttons on a `darkBlue` background should set `light` to `true`."}}};const N=["primary","secondary","tertiary"],m=()=>r(o,{children:[e(o,{style:n.row,children:N.map((l,a)=>e(t,{kind:l,icon:D,style:n.button,children:l},a))}),e(o,{style:n.row,children:N.map((l,a)=>e(t,{kind:l,icon:D,style:n.button,size:"small",children:`${l} small`},a))})]});m.parameters={docs:{description:{story:"Buttons can have an icon on it's left side."}}};const p=()=>r(o,{children:[r(o,{style:n.row,children:[e(S,{style:n.fillSpace,children:"small"}),r(o,{style:[n.row,n.example],children:[e(t,{style:n.button,onClick:()=>{},size:"small",children:"Label"}),e(t,{style:n.button,onClick:()=>{},kind:"secondary",size:"small",children:"Label"}),e(t,{style:n.button,onClick:()=>{},kind:"tertiary",size:"small",children:"Label"})]})]}),r(o,{style:n.row,children:[e(S,{style:n.fillSpace,children:"medium (default)"}),r(o,{style:[n.row,n.example],children:[e(t,{style:n.button,onClick:()=>{},size:"medium",children:"Label"}),e(t,{style:n.button,onClick:()=>{},kind:"secondary",size:"medium",children:"Label"}),e(t,{style:n.button,onClick:()=>{},kind:"tertiary",size:"medium",children:"Label"})]})]}),r(o,{style:n.row,children:[e(S,{style:n.fillSpace,children:"large"}),r(o,{style:[n.row,n.example],children:[e(t,{style:n.button,onClick:()=>{},size:"large",children:"Label"}),e(t,{style:n.button,onClick:()=>{},kind:"secondary",size:"large",children:"Label"}),e(t,{style:n.button,onClick:()=>{},kind:"tertiary",size:"large",children:"Label"})]})]})]});p.parameters={docs:{description:{story:"Buttons have a size that's either `medium` (default), `small`, or `large`."}}};const h=()=>r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},spinner:!0,size:"large","aria-label":"waiting",children:"Hello, world"}),e(i,{size:16}),e(t,{onClick:()=>{},spinner:!0,"aria-label":"waiting",children:"Hello, world"}),e(i,{size:16}),e(t,{onClick:()=>{},spinner:!0,size:"small","aria-label":"waiting",children:"Hello, world"})]});h.parameters={docs:{description:{story:"Buttons can show a spinner. This is useful when indicating to a user that their input has been recognized but that the operation will take some time. While the spinner property is set to true the button is disabled."}}};const b={name:"Truncating labels",render:()=>r(o,{style:{flexDirection:"row"},children:[e(t,{onClick:()=>{},style:{maxWidth:200},children:"label too long for the parent container"}),e(i,{size:16}),e(t,{onClick:()=>{},style:{maxWidth:200},icon:ve,children:"label too long for the parent container"})]})};b.parameters={docs:{description:{story:"If the label is too long for the button width, the text will be truncated."}}};const w={name:"Submitting forms",render:()=>e("form",{onSubmit:l=>{l.preventDefault(),window.alert("form submitted")},children:r(o,{children:["Foo: ",e("input",{id:"foo",value:"bar"}),e(t,{type:"submit",children:"Submit"})]})})};w.parameters={docs:{description:{story:'If the button is inside a form, you can use the `type="submit"` variant, so the form will be submitted on click.'}},options:{showAddonPanel:!0},chromatic:{disableSnapshot:!0}};const g={name:"Preventing navigation",render:()=>e(he,{children:r(o,{style:n.row,children:[e(t,{href:"/foo",style:n.button,onClick:l=>{l.preventDefault()},children:"This button prevents navigation."}),e(be,{children:e(we,{path:"/foo",children:e(o,{id:"foo",children:"Hello, world!"})})})]})})};g.parameters={docs:{description:{story:"Sometimes you may need to perform an async action either before or during navigation. This can be accomplished with `beforeNav` and `safeWithNav` respectively."}},chromatic:{disableSnapshot:!0}};const k={name:"Navigation with React Router",render:()=>e(he,{children:r(o,{style:n.row,children:[e(t,{href:"/foo",style:n.button,children:"Uses Client-side Nav"}),e(t,{href:"/foo",style:n.button,skipClientNav:!0,children:"Avoids Client-side Nav"}),e(be,{children:e(we,{path:"/foo",children:e(o,{id:"foo",children:"Hello, world!"})})})]})})};k.parameters={docs:{description:{story:"Buttons do client-side navigation by default, if React Router exists:"}},chromatic:{disableSnapshot:!0}};var R,W,I;v.parameters={...v.parameters,docs:{...(R=v.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    children: "Hello, world!",
    kind: "primary",
    color: "default",
    size: "medium",
    light: false,
    disabled: false,
    style: {
      maxWidth: 200
    },
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert("Click!");
    }
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/%F0%9F%92%A0-Main-Components?type=design&node-id=389-0&mode=design"
    },
    chromatic: {
      // We already have screenshots of other stories that cover more of the button states
      disableSnapshot: true
    }
  }
}`,...(I=(W=v.parameters)==null?void 0:W.docs)==null?void 0:I.source}}};var M,E,A;B.parameters={...B.parameters,docs:{...(M=B.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    onClick: () => {},
    kind: "tertiary",
    testId: "test-button",
    children: "Hello, world!"
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Get HTML elements
    const button = canvas.getByRole("button");
    const computedStyleButton = getComputedStyle(button, ":after");
    const innerLabel = canvas.getByTestId("test-button-inner-label");
    const computedStyleLabel = getComputedStyle(innerLabel, ":after");

    // Resting style
    await expect(button).toHaveStyle(\`color: \${Color.blue}\`);
    await expect(button).toHaveTextContent("Hello, world!");

    // Hover style
    await userEvent.hover(button);
    await expect(computedStyleLabel.height).toBe("2px");
    await expect(computedStyleLabel.color).toBe("rgb(24, 101, 242)");

    // Focus style
    await fireEvent.focus(button);
    await expect(computedStyleButton.borderColor).toBe("rgb(24, 101, 242)");
    await expect(computedStyleButton.borderWidth).toBe("2px");

    // Active (mouse down) style
    // eslint-disable-next-line testing-library/prefer-user-event
    await fireEvent.mouseDown(button);
    await expect(innerLabel).toHaveStyle("color: rgb(27, 80, 179)");
    await expect(computedStyleLabel.height).toBe("1px");
    await expect(computedStyleLabel.color).toBe("rgb(27, 80, 179)");
  }
}`,...(A=(E=B.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var P,F,j;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <View>
            <View style={{
      flexDirection: "row"
    }}>
                <Button onClick={() => {}}>Hello, world!</Button>
                <Strut size={16} />
                <Button onClick={() => {}} kind="secondary">
                    Hello, world!
                </Button>
                <Strut size={16} />
                <Button onClick={() => {}} kind="tertiary">
                    Hello, world!
                </Button>
            </View>
            <Strut size={16} />
            <View style={{
      flexDirection: "row"
    }}>
                <Button onClick={() => {}} disabled={true}>
                    Hello, world!
                </Button>
                <Strut size={16} />
                <Button onClick={() => {}} disabled={true} kind="secondary">
                    Hello, world!
                </Button>
                <Strut size={16} />
                <Button onClick={() => {}} disabled={true} kind="tertiary">
                    Hello, world!
                </Button>
            </View>
            <Strut size={16} />
            <View style={{
      flexDirection: "row"
    }}>
                <Button onClick={() => {}} color="destructive">
                    Hello, world!
                </Button>
                <Strut size={16} />
                <Button onClick={() => {}} kind="secondary" color="destructive">
                    Hello, world!
                </Button>
                <Strut size={16} />
                <Button onClick={() => {}} kind="tertiary" color="destructive">
                    Hello, world!
                </Button>
            </View>
        </View>
}`,...(j=(F=d.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var U,_,q;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: "Color",
  render: () => <View style={styles.row}>
            <Button style={styles.button} onClick={() => {}} color="destructive">
                Primary
            </Button>
            <Button style={styles.button} onClick={() => {}} kind="secondary" color="destructive">
                Secondary
            </Button>
            <Button style={styles.button} onClick={() => {}} kind="tertiary" color="destructive">
                Tertiary
            </Button>
        </View>
}`,...(q=(_=u.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var O,$,G;y.parameters={...y.parameters,docs:{...(O=y.parameters)==null?void 0:O.docs,source:{originalSource:`() => <View style={{
  backgroundColor: Color.darkBlue
}}>
        <View style={{
    flexDirection: "row"
  }}>
            <Button onClick={() => {}} light={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{
    flexDirection: "row"
  }}>
            <Button onClick={() => {}} light={true} disabled={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} disabled={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} disabled={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{
    flexDirection: "row"
  }}>
            <Button onClick={() => {}} light={true} color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="secondary" color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="tertiary" color="destructive">
                Hello, world!
            </Button>
        </View>
    </View>`,...(G=($=y.parameters)==null?void 0:$.docs)==null?void 0:G.source}}};var Y,J,K;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`() => <View>
        <View style={styles.row}>
            {kinds.map((kind, idx) => <Button kind={kind} icon={icons.contentExercise} style={styles.button} key={idx}>
                    {kind}
                </Button>)}
        </View>
        <View style={styles.row}>
            {kinds.map((kind, idx) => <Button kind={kind} icon={icons.contentExercise} style={styles.button} key={idx} size="small">
                    {\`\${kind} small\`}
                </Button>)}
        </View>
    </View>`,...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`() => <View>
        <View style={styles.row}>
            <LabelMedium style={styles.fillSpace}>small</LabelMedium>
            <View style={[styles.row, styles.example]}>
                <Button style={styles.button} onClick={() => {}} size="small">
                    Label
                </Button>
                <Button style={styles.button} onClick={() => {}} kind="secondary" size="small">
                    Label
                </Button>
                <Button style={styles.button} onClick={() => {}} kind="tertiary" size="small">
                    Label
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <LabelMedium style={styles.fillSpace}>medium (default)</LabelMedium>

            <View style={[styles.row, styles.example]}>
                <Button style={styles.button} onClick={() => {}} size="medium">
                    Label
                </Button>
                <Button style={styles.button} onClick={() => {}} kind="secondary" size="medium">
                    Label
                </Button>
                <Button style={styles.button} onClick={() => {}} kind="tertiary" size="medium">
                    Label
                </Button>
            </View>
        </View>
        <View style={styles.row}>
            <LabelMedium style={styles.fillSpace}>large</LabelMedium>
            <View style={[styles.row, styles.example]}>
                <Button style={styles.button} onClick={() => {}} size="large">
                    Label
                </Button>
                <Button style={styles.button} onClick={() => {}} kind="secondary" size="large">
                    Label
                </Button>
                <Button style={styles.button} onClick={() => {}} kind="tertiary" size="large">
                    Label
                </Button>
            </View>
        </View>
    </View>`,...(Z=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,ne;h.parameters={...h.parameters,docs:{...(ee=h.parameters)==null?void 0:ee.docs,source:{originalSource:`() => <View style={{
  flexDirection: "row"
}}>
        <Button onClick={() => {}} spinner={true} size="large" aria-label={"waiting"}>
            Hello, world
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} spinner={true} aria-label={"waiting"}>
            Hello, world
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} spinner={true} size="small" aria-label={"waiting"}>
            Hello, world
        </Button>
    </View>`,...(ne=(te=h.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,re,ie;b.parameters={...b.parameters,docs:{...(oe=b.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  name: "Truncating labels",
  render: () => <View style={{
    flexDirection: "row"
  }}>
            <Button onClick={() => {}} style={{
      maxWidth: 200
    }}>
                label too long for the parent container
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} style={{
      maxWidth: 200
    }} icon={icons.add}>
                label too long for the parent container
            </Button>
        </View>
}`,...(ie=(re=b.parameters)==null?void 0:re.docs)==null?void 0:ie.source}}};var le,se,ae;w.parameters={...w.parameters,docs:{...(le=w.parameters)==null?void 0:le.docs,source:{originalSource:`{
  name: "Submitting forms",
  render: () => <form onSubmit={e => {
    e.preventDefault();
    window.alert("form submitted"); // eslint-disable-line no-alert
  }}>
            <View>
                Foo: <input id="foo" value="bar" />
                <Button type="submit">Submit</Button>
            </View>
        </form>
}`,...(ae=(se=w.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var ce,de,ue;g.parameters={...g.parameters,docs:{...(ce=g.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  name: "Preventing navigation",
  render: () => <MemoryRouter>
            <View style={styles.row}>
                <Button href="/foo" style={styles.button} onClick={e => {
        e.preventDefault();
      }}>
                    This button prevents navigation.
                </Button>
                <Switch>
                    <Route path="/foo">
                        <View id="foo">Hello, world!</View>
                    </Route>
                </Switch>
            </View>
        </MemoryRouter>
}`,...(ue=(de=g.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var ye,me,pe;k.parameters={...k.parameters,docs:{...(ye=k.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  name: "Navigation with React Router",
  render: () => <MemoryRouter>
            <View style={styles.row}>
                <Button href="/foo" style={styles.button}>
                    Uses Client-side Nav
                </Button>
                <Button href="/foo" style={styles.button} skipClientNav>
                    Avoids Client-side Nav
                </Button>
                <Switch>
                    <Route path="/foo">
                        <View id="foo">Hello, world!</View>
                    </Route>
                </Switch>
            </View>
        </MemoryRouter>
}`,...(pe=(me=k.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};const lt=["Default","Tertiary","styles","Variants","WithColor","Dark","Icon","Size","Spinner","TruncatingLabels","SubmittingForms","PreventNavigation","WithRouter"];export{y as Dark,v as Default,m as Icon,g as PreventNavigation,p as Size,h as Spinner,w as SubmittingForms,B as Tertiary,b as TruncatingLabels,d as Variants,u as WithColor,k as WithRouter,lt as __namedExportsOrder,it as default,n as styles};
//# sourceMappingURL=button.stories-cb858da3.js.map
