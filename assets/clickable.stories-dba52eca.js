import{a as e,j as y,F as $}from"./jsx-runtime-309e447d.js";import{r as Y}from"./index-9f32f44c.js";import{V as a,l as q}from"./render-state-root-891c0d56.js";import{S as c,C as l}from"./index-f641b98f.js";import{B as p,a as g}from"./footnote-761d2bcc.js";import{C as i,M as z,S as G,R as f}from"./clickable-8a7f284d.js";import{c as J,p as w}from"./clickable.argtypes-8b694e47.js";import{C as K}from"./component-info-cedbe096.js";import{B as Q}from"./button-b2794e32.js";import"./_commonjsHelpers-de833af9.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";const he={title:"Clickable / Clickable",component:i,argTypes:J,args:{testId:"",disabled:!1,light:!1,hideDefaultFocusRing:!1},decorators:[t=>e(a,{style:s.centerText,children:e(t,{})})],parameters:{componentSubtitle:e(K,{name:w.name,version:w.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}}},u=t=>e(i,{...t,children:({hovered:r,pressed:n})=>e(a,{style:[s.clickable,r&&s.hovered,n&&s.pressed],children:e(p,{children:"This text is clickable!"})})});u.args={onClick:()=>{alert("Click!")}};const b=()=>e(a,{style:s.centerText,children:e(i,{href:"https://www.khanacademy.org/about/tos",skipClientNav:!0,children:({hovered:t,pressed:r})=>e(a,{style:[t&&s.hovered,r&&s.pressed],children:e(p,{children:"This text is clickable!"})})})});b.parameters={docs:{description:{story:"You can make custom components Clickable by returning them in a function of the Clickable child. The eventState parameter the function takes allows access to states pressed, hovered and clicked, which you may use to create custom styles.\n\nClickable has a default focus ring style built-in.  If you are creating your own custom focus ring it should be disabled using by setting `hideDefaultFocusRing={true}` in the props passed to `Clickable`."}},chromatic:{disableSnapshot:!0}};const d=()=>e(a,{style:s.dark,children:e(i,{href:"https://www.khanacademy.org/about/tos",skipClientNav:!0,light:!0,children:({hovered:t,pressed:r})=>e(a,{style:[s.clickable,t&&s.hovered,r&&s.pressed],children:e(p,{children:"This text is clickable!"})})})});d.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"Clickable has a `light` prop which changes the default focus ring color to fit a dark background."}},backgrounds:{default:"darkBlue"}};const o=t=>y($,{children:[e(i,{onClick:()=>{},...t,children:({hovered:r,pressed:n})=>e(a,{style:[s.clickable,r&&s.hovered,n&&s.pressed],children:e(p,{children:"Disabled clickable using the default disabled style"})})}),e(i,{onClick:()=>{},...t,children:({hovered:r,focused:n,pressed:k})=>e(a,{style:[s.clickable,r&&s.hovered,k&&s.pressed,t.disabled&&s.disabled],children:e(p,{children:"Disabled clickable passing custom disabled styles"})})})]});o.args={disabled:!0};o.parameters={docs:{description:{story:"Clickable has a `disabled` prop which prevents the element from being operable. Note that the default disabled style is applied to the element, but you can also pass custom styles to the children element by passing any `disabled` styles (see the second clickable element in the example below)."}}};const h=()=>e(z,{children:y(a,{children:[y(a,{style:s.row,children:[e(i,{href:"/foo",style:s.heading,onClick:()=>{console.log("I'm still on the same page!")},children:t=>e(g,{children:"Uses Client-side Nav"})}),e(i,{href:"/iframe.html?id=clickable-clickable--default&viewMode=story",style:s.heading,skipClientNav:!0,children:t=>e(g,{children:"Avoids Client-side Nav"})})]}),e(a,{style:s.navigation,children:y(G,{children:[e(f,{path:"/foo",children:e(a,{id:"foo",children:"The first clickable element does client-side navigation here."})}),e(f,{path:"*",children:"See navigation changes here"})]})})]})});h.storyName="Client-side Navigation";h.parameters={docs:{description:{story:"Clickable adds support to keyboard navigation. This way, your components are accessible and emulate better the browser's behavior.\n\n**NOTE:** If you want to navigate to an external URL and/or reload the window, make sure to use `href` and `skipClientNav={true}`"}},chromatic:{disableSnapshot:!0}};const m=()=>{const t=Y.createRef(),r=()=>{t.current&&t.current.focus()};return y(a,{style:[s.centerText,s.centered],children:[e(i,{ref:t,children:({hovered:n,focused:k,pressed:P})=>e(a,{style:[n&&s.hovered,P&&s.pressed,k&&s.focused],children:e(p,{children:"Press below to focus me!"})})}),e(Q,{style:s.button,onClick:r,children:"Focus"})]})};m.parameters={docs:{description:{story:"If you need to save a reference to the `Clickable` element , you can do\n        so using the `ref` prop. In this example, we want the element to receive focus when the\n        button is pressed. We can do this by creating a React ref of type `HTMLButtonElement` and\n        passing it into `Clickable`'s `ref` prop. Now we can use the ref variable in the\n        `handleSubmit` function to shift focus to the field."}},chromatic:{disableSnapshot:!0}};const s=q.StyleSheet.create({clickable:{borderWidth:1,padding:c.medium_16},hovered:{textDecoration:"underline",backgroundColor:l.teal},pressed:{color:l.blue},focused:{outline:`solid 4px ${l.lightBlue}`},centerText:{gap:c.medium_16,textAlign:"center"},dark:{backgroundColor:l.darkBlue,color:l.white,padding:c.xSmall_8},row:{flexDirection:"row",alignItems:"center"},heading:{marginRight:c.large_24},navigation:{border:`1px dashed ${l.lightBlue}`,marginTop:c.large_24,padding:c.large_24},disabled:{color:l.white,backgroundColor:l.offBlack64},button:{maxWidth:150},centered:{alignItems:"center",justifyContent:"center"}});var v,C,S;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`(args: any) => <Clickable {...args}>
        {({
    hovered,
    pressed
  }) => {
    return <View style={[styles.clickable, hovered && styles.hovered, pressed && styles.pressed]}>
                    <Body>This text is clickable!</Body>
                </View>;
  }}
    </Clickable>`,...(S=(C=u.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var x,V,B;b.parameters={...b.parameters,docs:{...(x=b.parameters)==null?void 0:x.docs,source:{originalSource:`() => <View style={styles.centerText}>
        <Clickable href="https://www.khanacademy.org/about/tos" skipClientNav={true}>
            {({
      hovered,
      pressed
    }) => <View style={[hovered && styles.hovered, pressed && styles.pressed]}>
                    <Body>This text is clickable!</Body>
                </View>}
        </Clickable>
    </View>`,...(B=(V=b.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};var R,T,N,L,D;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`() => <View style={styles.dark}>
        <Clickable href="https://www.khanacademy.org/about/tos" skipClientNav={true} light={true}>
            {({
      hovered,
      pressed
    }) => <View style={[styles.clickable, hovered && styles.hovered, pressed && styles.pressed]}>
                    <Body>This text is clickable!</Body>
                </View>}
        </Clickable>
    </View>`,...(N=(T=d.parameters)==null?void 0:T.docs)==null?void 0:N.source},description:{story:"Clickable usage on dark backgrounds",...(D=(L=d.parameters)==null?void 0:L.docs)==null?void 0:D.description}}};var I,_,M,E,F;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`(args: any) => <>
        <Clickable onClick={() => {}} {...args}>
            {({
      hovered,
      pressed
    }) => <View style={[styles.clickable, hovered && styles.hovered, pressed && styles.pressed]}>
                    <Body>
                        Disabled clickable using the default disabled style
                    </Body>
                </View>}
        </Clickable>
        <Clickable onClick={() => {}} {...args}>
            {({
      hovered,
      focused,
      pressed
    }) => <View style={[styles.clickable, hovered && styles.hovered, pressed && styles.pressed, args.disabled && styles.disabled]}>
                    <Body>
                        Disabled clickable passing custom disabled styles
                    </Body>
                </View>}
        </Clickable>
    </>`,...(M=(_=o.parameters)==null?void 0:_.docs)==null?void 0:M.source},description:{story:"Disabled state",...(F=(E=o.parameters)==null?void 0:E.docs)==null?void 0:F.description}}};var j,A,O;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`() => <MemoryRouter>
        <View>
            <View style={styles.row}>
                <Clickable href="/foo" style={styles.heading} onClick={() => {
        // eslint-disable-next-line no-console
        console.log("I'm still on the same page!");
      }}>
                    {eventState => <LabelLarge>Uses Client-side Nav</LabelLarge>}
                </Clickable>
                <Clickable href="/iframe.html?id=clickable-clickable--default&viewMode=story" style={styles.heading} skipClientNav>
                    {eventState => <LabelLarge>Avoids Client-side Nav</LabelLarge>}
                </Clickable>
            </View>
            <View style={styles.navigation}>
                <Switch>
                    <Route path="/foo">
                        <View id="foo">
                            The first clickable element does client-side
                            navigation here.
                        </View>
                    </Route>
                    <Route path="*">See navigation changes here</Route>
                </Switch>
            </View>
        </View>
    </MemoryRouter>`,...(O=(A=h.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var U,W,H;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const clickableRef: React.RefObject<HTMLAnchorElement> = React.createRef();
  const handleSubmit = () => {
    if (clickableRef.current) {
      clickableRef.current.focus();
    }
  };
  return <View style={[styles.centerText, styles.centered]}>
            <Clickable ref={clickableRef}>
                {({
        hovered,
        focused,
        pressed
      }) => <View style={[hovered && styles.hovered, pressed && styles.pressed, focused && styles.focused]}>
                        <Body>Press below to focus me!</Body>
                    </View>}
            </Clickable>
            <Button style={styles.button} onClick={handleSubmit}>
                Focus
            </Button>
        </View>;
}`,...(H=(W=m.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};const pe=["Default","Basic","Light","Disabled","ClientSideNavigation","Ref"];export{b as Basic,h as ClientSideNavigation,u as Default,o as Disabled,d as Light,m as Ref,pe as __namedExportsOrder,he as default};
//# sourceMappingURL=clickable.stories-dba52eca.js.map
