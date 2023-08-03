import{a as e,j as u}from"./jsx-runtime-309e447d.js";import{V as h,l as G}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{C as g,S as d}from"./index-f641b98f.js";import{I as t}from"./icon-a4f17d53.js";import{f as l,a as i,b as O}from"./icon-assets-a0b49981.js";import{a as U,D as o,p as b}from"./compact-cell.argtypes-ad65c4dc.js";import{C as q}from"./component-info-cedbe096.js";import{M as Y,S as $,R as p}from"./clickable-8a7f284d.js";import"./_commonjsHelpers-de833af9.js";import"./footnote-761d2bcc.js";import"./strut-c6011196.js";import"./button-b2794e32.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";const J={...U,subtitle1:{control:{type:"text"},table:{category:"Layout",type:{detail:"string | React.Element<Typography>"}}},subtitle2:{control:{type:"text"},table:{category:"Layout",type:{detail:"string | React.Element<Typography>"}}}},ue={title:"Cell / DetailCell",component:o,argTypes:J,design:{type:"figma",url:"https://www.figma.com/file/VbVu3h2BpBhH80niq101MHHE/%F0%9F%92%A0-Main-Components?type=design&node-id=4337-2033&mode=design&t=h4nok7uwaPYDOkz6-4"},parameters:{componentSubtitle:e(q,{name:b.name,version:b.version}),docs:{description:{component:null},source:{excludeDecorators:!0}}},decorators:[W=>e(h,{style:H.example,children:W()})]},m={args:{title:"Title for article item",subtitle1:"Subtitle 1 for article item",subtitle2:"Subtitle 2 for article item",leftAccessory:e(t,{icon:l,size:"medium"}),rightAccessory:e(t,{icon:i})}},r=()=>e(o,{title:"Title for article item",subtitle1:"Subtitle for article item",subtitle2:"Subtitle for article item",leftAccessory:e(t,{icon:l,size:"medium"}),rightAccessory:e(t,{icon:i,size:"small"}),active:!0});r.parameters={docs:{description:{story:"For more complex scenarios where we need to use more content such as subtitles, we provide a DetailCell component that can be used to cover these cases. The following example shows how to include a subtitle and use the active state."}}};const a=()=>e(o,{title:"Title for article item",subtitle1:"Subtitle for article item",subtitle2:"Subtitle for article item",leftAccessory:e(t,{icon:l,size:"medium"}),rightAccessory:e(t,{icon:i,size:"small"}),disabled:!0});a.parameters={docs:{description:{story:"For more complex scenarios where we need to use more content such as subtitles, we provide a DetailCell component that can be used to cover these cases. The following example shows how to include a subtitle and use the active state."}}};const s=()=>e(o,{title:"Title for article item",subtitle1:"Subtitle for article item",subtitle2:"Subtitle for article item",leftAccessory:e(t,{icon:O,size:"small"}),leftAccessoryStyle:{alignSelf:"flex-start"},rightAccessory:e(t,{icon:i,size:"small"}),rightAccessoryStyle:{alignSelf:"flex-start"},style:{textAlign:"center"}});s.parameters={docs:{description:{story:"Accessories can also be customized to adapt to different sizes and alignments. In this example, we can see how a cell can be customized for both accessories."}}};const c=()=>e(o,{title:"Title for article item",subtitle1:"Subtitle for article item",subtitle2:"Subtitle for article item",leftAccessory:e(t,{icon:l,size:"medium"}),rightAccessory:e(t,{icon:i}),onClick:()=>{},"aria-label":"Press to navigate to the article"});c.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"Cell components can also also be clickable. This is done by passing a `onClick` prop to the component."}}};const n={name:"Client-side navigation with DetailCell",render:()=>u(Y,{children:[u(h,{children:[e(o,{title:"Data",subtitle2:"Subtitle for article item",leftAccessory:e(t,{icon:l,size:"medium"}),rightAccessory:e(t,{icon:i}),href:"/math/algebra","aria-label":"Press to navigate to the article"}),e(o,{title:"Geometry",subtitle2:"Subtitle for article item",leftAccessory:e(t,{icon:l,size:"medium"}),rightAccessory:e(t,{icon:i}),href:"/math/geometry","aria-label":"Press to navigate to the article",horizontalRule:"none"})]}),e(h,{style:H.navigation,children:u($,{children:[e(p,{path:"/math/algebra",children:"Navigates to /math/algebra"}),e(p,{path:"/math/geometry",children:"Navigates to /math/geometry"}),e(p,{path:"*",children:"See navigation changes here"})]})})]})};n.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"Cells accept an `href` prop to be able to navigate to a different URL. Note that this will use client-side navigation if the Cell component is within a React-Router environment."}}};const H=G.StyleSheet.create({example:{backgroundColor:g.offWhite,padding:d.large_24,width:376},navigation:{border:`1px dashed ${g.lightBlue}`,marginTop:d.large_24,padding:d.large_24}});var f,y,S;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: "Title for article item",
    subtitle1: "Subtitle 1 for article item",
    subtitle2: "Subtitle 2 for article item",
    leftAccessory: <Icon icon={icons.contentVideo} size="medium" />,
    rightAccessory: <Icon icon={icons.caretRight} />
  }
}`,...(S=(y=m.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var C,A,v,D,w;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:'() => <DetailCell title="Title for article item" subtitle1="Subtitle for article item" subtitle2="Subtitle for article item" leftAccessory={<Icon icon={icons.contentVideo} size="medium" />} rightAccessory={<Icon icon={icons.caretRight} size="small" />} active={true} />',...(v=(A=r.parameters)==null?void 0:A.docs)==null?void 0:v.source},description:{story:"Active detail cell example.",...(w=(D=r.parameters)==null?void 0:D.docs)==null?void 0:w.description}}};var z,R,x,T,I;a.parameters={...a.parameters,docs:{...(z=a.parameters)==null?void 0:z.docs,source:{originalSource:'() => <DetailCell title="Title for article item" subtitle1="Subtitle for article item" subtitle2="Subtitle for article item" leftAccessory={<Icon icon={icons.contentVideo} size="medium" />} rightAccessory={<Icon icon={icons.caretRight} size="small" />} disabled={true} />',...(x=(R=a.parameters)==null?void 0:R.docs)==null?void 0:x.source},description:{story:"Disabled detail cell example.",...(I=(T=a.parameters)==null?void 0:T.docs)==null?void 0:I.description}}};var V,k,N,P,M;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`() => <DetailCell title="Title for article item" subtitle1="Subtitle for article item" subtitle2="Subtitle for article item" leftAccessory={<Icon icon={icons.caretLeft} size="small" />} leftAccessoryStyle={{
  alignSelf: "flex-start"
}} rightAccessory={<Icon icon={icons.caretRight} size="small" />} rightAccessoryStyle={{
  alignSelf: "flex-start"
}} style={{
  textAlign: "center"
}} />`,...(N=(k=s.parameters)==null?void 0:k.docs)==null?void 0:N.source},description:{story:"Using custom styles.",...(M=(P=s.parameters)==null?void 0:P.docs)==null?void 0:M.description}}};var _,E,L;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:'() => <DetailCell title="Title for article item" subtitle1="Subtitle for article item" subtitle2="Subtitle for article item" leftAccessory={<Icon icon={icons.contentVideo} size="medium" />} rightAccessory={<Icon icon={icons.caretRight} />} onClick={() => {}} aria-label="Press to navigate to the article" />',...(L=(E=c.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var F,j,B;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "Client-side navigation with DetailCell",
  render: () => <MemoryRouter>
            <View>
                <DetailCell title="Data" subtitle2="Subtitle for article item" leftAccessory={<Icon icon={icons.contentVideo} size="medium" />} rightAccessory={<Icon icon={icons.caretRight} />} href="/math/algebra" aria-label="Press to navigate to the article" />
                <DetailCell title="Geometry" subtitle2="Subtitle for article item" leftAccessory={<Icon icon={icons.contentVideo} size="medium" />} rightAccessory={<Icon icon={icons.caretRight} />} href="/math/geometry" aria-label="Press to navigate to the article" horizontalRule="none" />
            </View>

            <View style={styles.navigation}>
                <Switch>
                    <Route path="/math/algebra">
                        Navigates to /math/algebra
                    </Route>
                    <Route path="/math/geometry">
                        Navigates to /math/geometry
                    </Route>
                    <Route path="*">See navigation changes here</Route>
                </Switch>
            </View>
        </MemoryRouter>
}`,...(B=(j=n.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};const de=["DefaultDetailCell","DetailCellActive","DetailCellDisabled","DetailCellWithCustomStyles","ClickableDetailCell","DetailCellNavigation"];export{c as ClickableDetailCell,m as DefaultDetailCell,r as DetailCellActive,a as DetailCellDisabled,n as DetailCellNavigation,s as DetailCellWithCustomStyles,de as __namedExportsOrder,ue as default};
//# sourceMappingURL=detail-cell.stories-6409cf17.js.map
