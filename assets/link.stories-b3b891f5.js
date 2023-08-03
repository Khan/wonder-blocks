import{a as e,j as s}from"./jsx-runtime-309e447d.js";import{e as i}from"./index-c40e7184.js";import{w as m,u as h,f as x}from"./index-cdbaf94c.js";import{V as r,l as $e}from"./render-state-root-891c0d56.js";import{C as o,S as c}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{S as H}from"./strut-c6011196.js";import{B as u,H as qe,a as j}from"./footnote-761d2bcc.js";import{L as n}from"./link-64b6fd31.js";import{C as Ae}from"./component-info-cedbe096.js";import"./icon-a4f17d53.js";import{h as R,j as D,s as z,d as $,b as k,a as y}from"./icon-assets-a0b49981.js";import{M as Me,S as Ue,R as q}from"./clickable-8a7f284d.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./_baseIsEqual-976d9d82.js";import"./index-03bbf7d1.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./button-b2794e32.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";const Oe="@khanacademy/wonder-blocks-link",Ke="4.3.0",Fe="v1",Ge={access:"public"},Ye="Link component for Wonder Blocks design system.",Je="dist/index.js",Qe="dist/es/index.js",Xe="dist/index.d.ts",Ze={test:'echo "Error: no test specified" && exit 1'},en="",nn="MIT",tn={"@babel/runtime":"^7.18.6","@khanacademy/wonder-blocks-clickable":"^3.1.1","@khanacademy/wonder-blocks-color":"^2.0.1","@khanacademy/wonder-blocks-core":"^5.3.0","@khanacademy/wonder-blocks-icon":"^2.0.14","@khanacademy/wonder-blocks-spacing":"^4.0.1"},an={aphrodite:"^1.2.5",react:"16.14.0","react-router":"5.2.1","react-router-dom":"5.3.0"},rn={"wb-dev-build-settings":"^0.9.7"},A={name:Oe,version:Ke,design:Fe,publishConfig:Ge,description:Ye,main:Je,module:Qe,types:Xe,scripts:Ze,author:en,license:nn,dependencies:tn,peerDependencies:an,devDependencies:rn},on={children:{control:{type:"text"},description:"Text to appear on the link. It can be a plain text or Typography element.",table:{type:{summary:"string | React.Element<Typography>"}},type:{name:"string",required:!0}},endIcon:{control:{type:"select",labels:{null:"none"}},description:'Icon to appear after the link label. If\n        `target="_blank"` and an `endIcon` is passed in, `endIcon` will\n        override the default `externalIcon`.',options:[null,...Object.keys(R)],mapping:R,table:{category:"Icons",type:{summary:"IconAsset"}}},href:{control:{type:"text"},description:"URL to navigate to.",table:{type:{summary:"string"}},type:{name:"string",required:!0}},id:{control:{type:"text"},description:"An optional id attribute.",table:{type:{summary:"string"}},type:{name:"string",required:!1}},inline:{control:{type:"boolean"},description:`Indicates that this link is used within a body of text.
            This styles the link with an underline to distinguish it
            from surrounding text.`,table:{type:{summary:"boolean"}},type:{name:"boolean",required:!1}},kind:{control:{type:"select"},description:"Kind of Link. Note: Secondary light Links are not supported.",options:["primary","secondary"],table:{type:{summary:'"primary" | "secondary"'}},type:{name:"enum",value:["primary","secondary"],required:!1}},light:{control:{type:"boolean"},description:"Whether the button is on a dark/colored background.",table:{type:{summary:"boolean"}}},visitable:{control:{type:"boolean"},description:"Whether the link should change color once it's visited. Secondary or primary (light) links are not allowed to be visitable.",table:{type:{summary:"boolean"}}},rel:{control:{type:"text"},description:'Specifies the type of relationship between the current\n            document and the linked document. Should only be used when\n            `href` is specified. This defaults to "noopener noreferrer"\n            when `target="_blank"`, but can be overridden by setting this\n            prop to something else.',table:{type:{summary:"string"}}},tabIndex:{control:{type:"number"},description:"Set the tabindex attribute on the rendered element.",table:{defaultValue:{summary:0},type:{summary:"number"}}},target:{control:{type:"text"},description:`A target destination window for a link to open in.
            We only support "_blank" which opens the URL in a new tab.`,table:{type:{summary:"string"}}},testId:{control:{type:"text"},description:"Test ID used for e2e testing.",table:{type:{summary:"string"}}},startIcon:{control:{type:"select",labels:{null:"none"}},description:"Icon to appear before the link label.",options:[null,...Object.keys(R)],mapping:R,table:{category:"Icons",type:{summary:"IconAsset"}}},style:{control:{type:"object"},description:"custom styles.",table:{type:{summary:"StyleType"}}},className:{control:{type:"text"},description:"Adds CSS classes to the Link.",table:{type:{summary:"string"}}},title:{control:{type:"text"},description:"An optional title attribute.",table:{type:{summary:"string"}},type:{name:"string",required:!1}},beforeNav:{description:`Run async code before navigating to the URL passed to
            \`href\`. If the promise returned rejects then navigation will not
            occur. If both safeWithNav and beforeNav are provided, beforeNav
            will be run first and safeWithNav will only be run if beforeNav
            does not reject.`,table:{category:"Navigation",type:{summary:"() => Promise<mixed>"}}},safeWithNav:{description:`Run async code in the background while client-side
        navigating. If the browser does a full page load navigation, the
        callback promise must be settled before the navigation will occur.
        Errors are ignored so that navigation is guaranteed to succeed.`,table:{category:"Navigation",type:{summary:"() => Promise<mixed>"}}},skipClientNav:{control:{type:"boolean"},description:`Whether to avoid using client-side navigation.
            If the URL passed to href is local to the client-side, e.g.
            /math/algebra/eval-exprs, then it tries to use react-router-dom's
            Link component which handles the client-side navigation. You can set
            \`skipClientNav\` to true avoid using client-side nav entirely.`,table:{category:"Navigation",type:{summary:"boolean"}}},onClick:{description:`Function to call when button is clicked.
        This should NOT be used to redirect to a different URL or to
        prevent navigation via e.preventDefault(). The event passed to this
        handler will have its preventDefault() and stopPropagation() methods
        stubbed out.`,table:{category:"Events",type:{summary:"(e: SyntheticEvent<>) => mixed"}}},onKeyDown:{description:'Respond to raw "keydown" event.',table:{category:"Events",type:{summary:"(e: SyntheticKeyboardEvent<>) => mixed"}}},onKeyUp:{description:'Respond to raw "keyup" event.',table:{category:"Events",type:{summary:"(e: SyntheticKeyboardEvent<>) => mixed"}}}},Wn={title:"Link",component:n,parameters:{componentSubtitle:e(Ae,{name:A.name,version:A.version})},argTypes:on},N="#1b50b3",je="#b5cefb",E={args:{href:"/",children:"Hello, world!"}},g=()=>e(n,{href:"#",children:"The quick brown fox jumps over the lazy dog."});g.parameters={docs:{description:{story:`Minimal link usage.
            This links to the top of the page.`}}};g.play=async({canvasElement:d})=>{const t=m(d).getByRole("link");await i(t).toHaveStyle(`color: ${o.blue}`),await h.hover(t),await i(t).toHaveStyle(`text-decoration: underline ${o.blue} solid`),await h.tab();const l=getComputedStyle(t,":focus-visible");await i(l.outline).toBe("rgb(24, 101, 242) solid 1px"),await x.mouseDown(t),await i(t).toHaveStyle(`text-decoration: underline solid ${N}`)};const b=()=>e(n,{href:"#",kind:"secondary",children:"The quick brown fox jumps over the lazy dog."});b.parameters={docs:{description:{story:`Minimal secondary link usage. A secondary link
            has lighter text. This links to the top of the page.`}}};b.play=async({canvasElement:d})=>{const t=m(d).getByRole("link");await i(t).toHaveStyle(`color: ${o.offBlack64}`),await h.hover(t),await i(t).toHaveStyle(`text-decoration: underline ${o.offBlack64} solid`),await h.tab();const l=getComputedStyle(t,":focus-visible");await i(l.outline).toBe("rgb(24, 101, 242) solid 1px"),await x.mouseDown(t),await i(t).toHaveStyle(`text-decoration: underline solid ${o.offBlack}`)};const I=()=>e(n,{href:"#",visitable:!0,children:"The quick brown fox jumps over the lazy dog."});I.parameters={docs:{description:{story:`This is a visitable link. It changes color after
            it has been clicked on to indicate that it's been visited before.
            This link's \`visitable\` prop is set to true.
            It links to the top of the page.`}}};const f=()=>e(n,{href:"#",light:!0,children:"The quick brown fox jumps over the lazy dog."});f.parameters={docs:{description:{story:"Minimal link usage on a dark background. This\n            link has its `light` prop set to true. It links to the top\n            of the page."}},backgrounds:{default:"darkBlue"}};f.play=async({canvasElement:d})=>{const t=m(d).getByRole("link");await i(t).toHaveStyle(`color: ${o.white}`),await h.hover(t),await i(t).toHaveStyle(`text-decoration: underline ${o.white} solid`),await h.tab();const l=getComputedStyle(t,":focus-visible");await i(l.outline).toBe("rgb(255, 255, 255) solid 1px"),await x.mouseDown(t),await i(t).toHaveStyle(`text-decoration: underline solid ${je}`)};const T=()=>e(n,{href:"#",light:!0,visitable:!0,children:"The quick brown fox jumps over the lazy dog."});T.parameters={backgrounds:{default:"darkBlue"},docs:{description:{story:`This is a visitable link on a dark background.
            It changes color after it has been clicked on to indicate
            that it's been visited before. This link's \`visitable\` prop
            is set to true. It links to the top of the page.`}}};const V=()=>s(r,{children:[e(n,{href:"https://cat-bounce.com/",target:"_blank",children:"This is a Primary link that opens in a new tab"}),e(n,{href:"https://cat-bounce.com/",kind:"secondary",target:"_blank",children:"This is a Secondary link that opens in a new tab"})]});V.parameters={docs:{description:{summary:'When a link is external and `target="_blank"`, the\n        external icon is automatically added to the end of the link. This\n        indicates that the link will open in a new tab.'}}};const _=()=>s(r,{children:[s(r,{style:{padding:c.large_24},children:[e(n,{href:"#",startIcon:D,style:a.standaloneLinkWrapper,children:"This link has a start icon"}),e(n,{href:"#",endIcon:z,kind:"secondary",style:a.standaloneLinkWrapper,children:"This link has an end icon"}),e(n,{href:"https://stuffonmycat.com/",endIcon:$,target:"_blank",style:a.standaloneLinkWrapper,children:"This external link has an end icon that is overrides the default external icon"}),e(n,{href:"#",startIcon:k,endIcon:y,kind:"secondary",style:a.standaloneLinkWrapper,children:"This link has a start icon and an end icon"}),e(n,{href:"#",startIcon:k,endIcon:y,style:a.multiLine,children:"This is a multi-line link with start and end icons"}),s(u,{children:["This is an inline"," ",e(n,{href:"#",inline:!0,startIcon:k,children:"link with a start icon"})," ","and an inline"," ",e(n,{href:"#",inline:!0,target:"_blank",endIcon:y,children:"link with an end icon"}),"."]})]}),s(r,{style:{backgroundColor:o.darkBlue,padding:c.large_24},children:[e(n,{href:"#",startIcon:D,light:!0,style:a.standaloneLinkWrapper,children:"This link has a start icon"}),e(n,{href:"#",endIcon:z,light:!0,style:a.standaloneLinkWrapper,children:"This link has an end icon"}),e(n,{href:"https://stuffonmycat.com/",endIcon:$,target:"_blank",light:!0,style:a.standaloneLinkWrapper,children:"This external link has an end icon that is overrides the default external icon"}),e(n,{href:"#",startIcon:k,endIcon:y,light:!0,style:a.standaloneLinkWrapper,children:"This link has a start icon and an end icon"}),e(n,{href:"#",startIcon:k,endIcon:y,light:!0,style:a.multiLine,children:"This is a multi-line link with start and end icons"}),s(u,{style:{color:o.white},children:["This is an inline"," ",e(n,{href:"#",startIcon:k,inline:!0,light:!0,children:"link with a start icon"})," ","and an inline"," ",e(n,{href:"#",endIcon:y,inline:!0,light:!0,target:"_blank",children:"link with an end icon"}),"."]})]})]});_.parameters={docs:{description:{summary:'Link can take an optional `startIcon` and/or `endIcon`. If\n        `target="_blank"` and an `endIcon` prop is passed in, then `endIcon` will\n        override the default `externalIcon`.'}}};const L=()=>s(u,{children:["This is an inline"," ",e(n,{href:"#",inline:!0,children:"Primary link"})," ","and an inline"," ",e(n,{href:"https://www.procatinator.com/",inline:!0,target:"_blank",children:"external Primary link"}),", whereas this is an inline"," ",e(n,{href:"#",kind:"secondary",inline:!0,children:"Secondary link"}),", and an inline"," ",e(n,{href:"https://www.procatinator.com/",kind:"secondary",inline:!0,target:"_blank",children:"external Secondary link"}),", and this is an inline"," ",e(n,{href:"#",visitable:!0,inline:!0,children:"Visitable link (Primary only)"})," ","and an inline"," ",e(n,{href:"https://www.procatinator.com/",visitable:!0,inline:!0,target:"_blank",children:"external Visitable link (Primary only)"}),"."]});L.parameters={docs:{description:{story:"Inline links include an underline to distinguish\n            them from the surrounding text. Make a link inline by setting the\n            `inline` prop to `true`. It is recommended to use inline\n            links within paragraphs and sentences."}}};L.play=async({canvasElement:d})=>{const p=m(d),t=p.getByRole("link",{name:"Primary link"}),l=p.getByRole("link",{name:"Secondary link"});await i(t).toHaveStyle(`color: ${o.blue}`),await h.hover(t),await i(t).toHaveStyle(`text-decoration: underline ${o.blue} solid`),await h.tab();const De=getComputedStyle(t,":focus-visible");await i(De.outline).toBe("rgb(24, 101, 242) solid 1px"),await x.mouseDown(t),await i(t).toHaveStyle(`text-decoration: underline solid ${N}`),await i(l).toHaveStyle(`color: ${o.offBlack}`),await h.hover(l),await i(l).toHaveStyle(`text-decoration: underline ${o.offBlack} solid`),await h.tab(),await h.tab();const ze=getComputedStyle(l,":focus-visible");await i(ze.outline).toBe("rgb(24, 101, 242) solid 1px"),await x.mouseDown(l),await i(l).toHaveStyle(`text-decoration: underline solid ${N}`)};const w=()=>s(u,{style:{color:o.white},children:["This is an inline"," ",e(n,{href:"#",inline:!0,light:!0,children:"Primary link"})," ","and an"," ",e(n,{href:"https://cat-bounce.com/",inline:!0,light:!0,target:"_blank",children:"external Primary link"}),", whereas this is an inline"," ",e(n,{href:"#",visitable:!0,inline:!0,light:!0,children:"Visitable link (Primary only)"})," ","and an"," ",e(n,{href:"https://cat-bounce.com/",visitable:!0,inline:!0,light:!0,target:"_blank",children:"external Visitable link (Primary only)"}),". Secondary light links are not supported."]});w.parameters={backgrounds:{default:"darkBlue"},docs:{description:{story:`Inline links include an underline to distinguish
            them from the surrounding text. If the link is on a
            dark background, set the \`light\` prop to true for it to
            be appropriately visible.

**NOTE:** Secondary light links are
            not supported.`}}};w.play=async({canvasElement:d})=>{const t=m(d).getByRole("link",{name:"Primary link"});await i(t).toHaveStyle(`color: ${o.white}`),await h.hover(t),await i(t).toHaveStyle(`text-decoration: underline ${o.white} solid`),await h.tab();const l=getComputedStyle(t,":focus-visible");await i(l.outline).toBe("rgb(255, 255, 255) solid 1px"),await x.mouseDown(t),await i(t).toHaveStyle(`text-decoration: underline solid ${je}`)};const W=()=>s(r,{children:[s(r,{style:{padding:c.large_24},children:[s(r,{children:[e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"#nonexistent-link",children:"Standalone Primary Link"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"https://cat-bounce.com/",target:"_blank",children:"Standalone External Primary Link"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"#secondary-nonexistent-link",kind:"secondary",children:"Standalone Secondary Link"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"https://cat-bounce.com/",kind:"secondary",target:"_blank",children:"Standalone External Secondary Link"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"#",visitable:!0,children:"Standalone Visitable Link (Primary only)"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"https://cat-bounce.com/",visitable:!0,target:"_blank",children:"Standalone External Visitable Link (Primary only)"})})]}),e(H,{size:c.xSmall_8}),s(u,{children:["This is an"," ",e(n,{href:"#",inline:!0,children:"Inline Primary link"})," ","and an"," ",e(n,{href:"https://cat-bounce.com/",inline:!0,target:"_blank",children:"Inline External Primary link"}),", whereas this is an"," ",e(n,{href:"#",kind:"secondary",inline:!0,children:"Inline Secondary link"})," ","and an"," ",e(n,{href:"https://cat-bounce.com/",kind:"secondary",inline:!0,target:"_blank",children:"Inline External Secondary link"}),", and this is an"," ",e(n,{href:"#",visitable:!0,inline:!0,children:"Inline Visitable link (Primary only)"})," ","and an"," ",e(n,{href:"https://cat-bounce.com/",visitable:!0,inline:!0,target:"_blank",children:"Inline External Visitable link (Primary only)"}),"."]})]}),s(r,{style:{backgroundColor:o.darkBlue,padding:c.large_24},children:[s(r,{children:[e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"#nonexistent-link",light:!0,children:"Standalone Light Link (Primary only)"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"https://cat-bounce.com/",light:!0,target:"_blank",children:"Standalone External Light Link (Primary only)"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"#",visitable:!0,light:!0,children:"Standalone Light Visitable Link (Primary only)"})}),e(r,{style:a.standaloneLinkWrapper,children:e(n,{href:"https://cat-bounce.com/",visitable:!0,light:!0,target:"_blank",children:"Standalone External Light Visitable Link (Primary only)"})})]}),e(H,{size:c.xSmall_8}),s(u,{style:{color:o.white},children:["This is an"," ",e(n,{href:"#",inline:!0,light:!0,children:"Inline Primary link"})," ","and an"," ",e(n,{href:"https://cat-bounce.com/",inline:!0,light:!0,target:"_blank",children:"Inline External Primary link"}),", whereas this is an"," ",e(n,{href:"#",visitable:!0,inline:!0,light:!0,children:"Inline Visitable link (Primary only)"})," ","and an"," ",e(n,{href:"https://cat-bounce.com/",visitable:!0,inline:!0,light:!0,target:"_blank",children:"Inline External Visitable link (Primary only)"}),". Secondary light links are not supported."]})]})]});W.parameters={docs:{description:{story:`By default, primary links are blue, secondary
            links are gray, and visitable links turn purple after they've
            been clicked on. Default inline links are underlined, and the
            secondary kind is black to match surrounding text color.
            Light standalone and inline links have the same colors - white
            with visited visitable links being pink. Light inline links are
            also underlined like default inline links. Light secondary links
            are not supported and will result in an error.`}}};const v=()=>e(qe,{children:e(n,{href:"#nonexistent-link",id:"typography-link",children:"Link inside a Heading element"})});v.parameters={docs:{description:{story:"Wonder Blocks Typography elements can be used\n        with Links instead of plain text. We recommend that `Typography` is\n        always the parent element of `Link` to avoid styling issues. Here, we\n        have a `HeadingSmall` containing a `Link`."}}};v.play=async({canvasElement:d})=>{const t=m(d).getByText("Link inside a Heading element");await i(t).toHaveStyle("font-size: 20px"),await i(t).toHaveStyle("lineHeight: 24px")};const P=()=>e(n,{href:"#",style:a.pinkLink,children:"This link has a style."});P.parameters={docs:{storyDescription:"Link can take a `style` prop. Here, the\n            Link has been given a style in which the `color` field has\n            been set to `Colors.pink`."}};const B=()=>e(Me,{children:s(r,{children:[s(r,{style:a.row,children:[e(n,{href:"/foo",style:a.heading,onClick:()=>{console.log("I'm still on the same page!")},children:e(j,{children:"Uses Client-side Nav"})}),e(n,{href:"/iframe.html?id=link--default&viewMode=story",style:a.heading,skipClientNav:!0,children:e(j,{children:"Avoids Client-side Nav"})})]}),e(r,{style:a.navigation,children:s(Ue,{children:[e(q,{path:"/foo",children:e(r,{id:"foo",children:"The first link does client-side navigation here."})}),e(q,{path:"*",children:"See navigation changes here"})]})})]})});B.parameters={docs:{description:{story:"If you want to navigate to an external URL\n            and/or reload the window, make sure to use `href` and\n            `skipClientNav={true}`, as shown in this example.\n            **For navigation callbacks:** The `onClick`, `beforeNav`, and\n            `safeWithNav` props can be used to run callbacks when navigating\n            to the new URL. Which prop to use depends on the use case. See the\n            [Button documentation](/story/button-navigation-callbacks--before-nav-callbacks&viewMode=docs)\n            for details."}}};const S=()=>e(u,{children:e(n,{href:"#",title:"I am a title 😎",children:"This link has a title."})});S.parameters={docs:{description:{story:"Link can take a title prop. Give a link a title by\n        setting the `title` prop to a string. Hover over the link to see its title."}}};S.play=async({canvasElement:d})=>{const t=m(d).getByRole("link");await i(t).toHaveAttribute("title")};const C=()=>e(r,{style:{padding:c.medium_16},children:s(r,{style:a.rightToLeft,children:[e(n,{href:"/",startIcon:y,children:"هذا الرابط مكتوب باللغة العربية"}),e(H,{size:c.medium_16}),e(n,{href:"/",endIcon:k,children:"هذا الرابط مكتوب باللغة العربية"}),e(H,{size:c.medium_16}),e(n,{href:"/",startIcon:y,endIcon:k,children:"هذا الرابط مكتوب باللغة العربية"})]})});C.parameters={docs:{description:{story:"When in the right-to-left direction, the `startIcon`\n        and `endIcon` are flipped. This example has text in Arabic, a\n        right-to-left language."}}};const a=$e.StyleSheet.create({darkBackground:{backgroundColor:o.darkBlue,color:o.white,padding:10},heading:{marginRight:c.large_24},navigation:{border:`1px dashed ${o.lightBlue}`,marginTop:c.large_24,padding:c.large_24},pinkLink:{color:o.pink},row:{flexDirection:"row",alignItems:"center"},standaloneLinkWrapper:{display:"inline-block",marginBottom:c.xSmall_8},rightToLeft:{width:"100%",direction:"rtl"},multiLine:{display:"inline-block",marginBottom:c.xSmall_8,maxWidth:"15%"}});var M,U,O;E.parameters={...E.parameters,docs:{...(M=E.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    href: "/",
    children: "Hello, world!"
  }
}`,...(O=(U=E.parameters)==null?void 0:U.docs)==null?void 0:O.source}}};var K,F,G;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:'() => <Link href="#">The quick brown fox jumps over the lazy dog.</Link>',...(G=(F=g.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var Y,J,Q;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`() => <Link href="#" kind="secondary">
        The quick brown fox jumps over the lazy dog.
    </Link>`,...(Q=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Z,ee;I.parameters={...I.parameters,docs:{...(X=I.parameters)==null?void 0:X.docs,source:{originalSource:`() => <Link href="#" visitable={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>`,...(ee=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,te,ie;f.parameters={...f.parameters,docs:{...(ne=f.parameters)==null?void 0:ne.docs,source:{originalSource:`() => <Link href="#" light={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>`,...(ie=(te=f.parameters)==null?void 0:te.docs)==null?void 0:ie.source}}};var ae,re,oe;T.parameters={...T.parameters,docs:{...(ae=T.parameters)==null?void 0:ae.docs,source:{originalSource:`() => <Link href="#" light={true} visitable={true}>
        The quick brown fox jumps over the lazy dog.
    </Link>`,...(oe=(re=T.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,le,ce;V.parameters={...V.parameters,docs:{...(se=V.parameters)==null?void 0:se.docs,source:{originalSource:`() => <View>
        <Link href="https://cat-bounce.com/" target="_blank">
            This is a Primary link that opens in a new tab
        </Link>
        <Link href="https://cat-bounce.com/" kind="secondary" target="_blank">
            This is a Secondary link that opens in a new tab
        </Link>
    </View>`,...(ce=(le=V.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var de,he,pe;_.parameters={..._.parameters,docs:{...(de=_.parameters)==null?void 0:de.docs,source:{originalSource:`() => <View>
        {/* Default (dark) */}
        <View style={{
    padding: Spacing.large_24
  }}>
            <Link href="#" startIcon={icons.add} style={styles.standaloneLinkWrapper}>
                This link has a start icon
            </Link>
            <Link href="#" endIcon={icons.search} kind="secondary" style={styles.standaloneLinkWrapper}>
                This link has an end icon
            </Link>
            <Link href="https://stuffonmycat.com/" endIcon={icons.info} target="_blank" style={styles.standaloneLinkWrapper}>
                This external link has an end icon that is overrides the default
                external icon
            </Link>
            <Link href="#" startIcon={icons.caretLeft} endIcon={icons.caretRight} kind="secondary" style={styles.standaloneLinkWrapper}>
                This link has a start icon and an end icon
            </Link>
            <Link href="#" startIcon={icons.caretLeft} endIcon={icons.caretRight} style={styles.multiLine}>
                This is a multi-line link with start and end icons
            </Link>
            <Body>
                This is an inline{" "}
                <Link href="#" inline={true} startIcon={icons.caretLeft}>
                    link with a start icon
                </Link>{" "}
                and an inline{" "}
                <Link href="#" inline={true} target="_blank" endIcon={icons.caretRight}>
                    link with an end icon
                </Link>
                .
            </Body>
        </View>
        {/* Light */}
        <View style={{
    backgroundColor: Color.darkBlue,
    padding: Spacing.large_24
  }}>
            <Link href="#" startIcon={icons.add} light={true} style={styles.standaloneLinkWrapper}>
                This link has a start icon
            </Link>
            <Link href="#" endIcon={icons.search} light={true} style={styles.standaloneLinkWrapper}>
                This link has an end icon
            </Link>
            <Link href="https://stuffonmycat.com/" endIcon={icons.info} target="_blank" light={true} style={styles.standaloneLinkWrapper}>
                This external link has an end icon that is overrides the default
                external icon
            </Link>
            <Link href="#" startIcon={icons.caretLeft} endIcon={icons.caretRight} light={true} style={styles.standaloneLinkWrapper}>
                This link has a start icon and an end icon
            </Link>
            <Link href="#" startIcon={icons.caretLeft} endIcon={icons.caretRight} light={true} style={styles.multiLine}>
                This is a multi-line link with start and end icons
            </Link>
            <Body style={{
      color: Color.white
    }}>
                This is an inline{" "}
                <Link href="#" startIcon={icons.caretLeft} inline={true} light={true}>
                    link with a start icon
                </Link>{" "}
                and an inline{" "}
                <Link href="#" endIcon={icons.caretRight} inline={true} light={true} target="_blank">
                    link with an end icon
                </Link>
                .
            </Body>
        </View>
    </View>`,...(pe=(he=_.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};var ke,ye,ue;L.parameters={...L.parameters,docs:{...(ke=L.parameters)==null?void 0:ke.docs,source:{originalSource:`() => <Body>
        This is an inline{" "}
        <Link href="#" inline={true}>
            Primary link
        </Link>{" "}
        and an inline{" "}
        <Link href="https://www.procatinator.com/" inline={true} target="_blank">
            external Primary link
        </Link>
        , whereas this is an inline{" "}
        <Link href="#" kind="secondary" inline={true}>
            Secondary link
        </Link>
        , and an inline{" "}
        <Link href="https://www.procatinator.com/" kind="secondary" inline={true} target="_blank">
            external Secondary link
        </Link>
        , and this is an inline{" "}
        <Link href="#" visitable={true} inline={true}>
            Visitable link (Primary only)
        </Link>{" "}
        and an inline{" "}
        <Link href="https://www.procatinator.com/" visitable={true} inline={true} target="_blank">
            external Visitable link (Primary only)
        </Link>
        .
    </Body>`,...(ue=(ye=L.parameters)==null?void 0:ye.docs)==null?void 0:ue.source}}};var me,ge,be;w.parameters={...w.parameters,docs:{...(me=w.parameters)==null?void 0:me.docs,source:{originalSource:`() => <Body style={{
  color: Color.white
}}>
        This is an inline{" "}
        <Link href="#" inline={true} light={true}>
            Primary link
        </Link>{" "}
        and an{" "}
        <Link href="https://cat-bounce.com/" inline={true} light={true} target="_blank">
            external Primary link
        </Link>
        , whereas this is an inline{" "}
        <Link href="#" visitable={true} inline={true} light={true}>
            Visitable link (Primary only)
        </Link>{" "}
        and an{" "}
        <Link href="https://cat-bounce.com/" visitable={true} inline={true} light={true} target="_blank">
            external Visitable link (Primary only)
        </Link>
        . Secondary light links are not supported.
    </Body>`,...(be=(ge=w.parameters)==null?void 0:ge.docs)==null?void 0:be.source}}};var fe,Le,we;W.parameters={...W.parameters,docs:{...(fe=W.parameters)==null?void 0:fe.docs,source:{originalSource:`() => <View>
        {/* Default (dark) */}
        <View style={{
    padding: Spacing.large_24
  }}>
            {/* Standalone */}
            <View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#nonexistent-link">
                        Standalone Primary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="https://cat-bounce.com/" target="_blank">
                        Standalone External Primary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#secondary-nonexistent-link" kind="secondary">
                        Standalone Secondary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="https://cat-bounce.com/" kind="secondary" target="_blank">
                        Standalone External Secondary Link
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#" visitable={true}>
                        Standalone Visitable Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="https://cat-bounce.com/" visitable={true} target="_blank">
                        Standalone External Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={Spacing.xSmall_8} />
            {/* Inline */}
            <Body>
                This is an{" "}
                <Link href="#" inline={true}>
                    Inline Primary link
                </Link>{" "}
                and an{" "}
                <Link href="https://cat-bounce.com/" inline={true} target="_blank">
                    Inline External Primary link
                </Link>
                , whereas this is an{" "}
                <Link href="#" kind="secondary" inline={true}>
                    Inline Secondary link
                </Link>{" "}
                and an{" "}
                <Link href="https://cat-bounce.com/" kind="secondary" inline={true} target="_blank">
                    Inline External Secondary link
                </Link>
                , and this is an{" "}
                <Link href="#" visitable={true} inline={true}>
                    Inline Visitable link (Primary only)
                </Link>{" "}
                and an{" "}
                <Link href="https://cat-bounce.com/" visitable={true} inline={true} target="_blank">
                    Inline External Visitable link (Primary only)
                </Link>
                .
            </Body>
        </View>
        {/* Light */}
        <View style={{
    backgroundColor: Color.darkBlue,
    padding: Spacing.large_24
  }}>
            {/* Standalone */}
            <View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#nonexistent-link" light={true}>
                        Standalone Light Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="https://cat-bounce.com/" light={true} target="_blank">
                        Standalone External Light Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="#" visitable={true} light={true}>
                        Standalone Light Visitable Link (Primary only)
                    </Link>
                </View>
                <View style={styles.standaloneLinkWrapper}>
                    <Link href="https://cat-bounce.com/" visitable={true} light={true} target="_blank">
                        Standalone External Light Visitable Link (Primary only)
                    </Link>
                </View>
            </View>
            <Strut size={Spacing.xSmall_8} />
            {/* Inline */}
            <Body style={{
      color: Color.white
    }}>
                This is an{" "}
                <Link href="#" inline={true} light={true}>
                    Inline Primary link
                </Link>{" "}
                and an{" "}
                <Link href="https://cat-bounce.com/" inline={true} light={true} target="_blank">
                    Inline External Primary link
                </Link>
                , whereas this is an{" "}
                <Link href="#" visitable={true} inline={true} light={true}>
                    Inline Visitable link (Primary only)
                </Link>{" "}
                and an{" "}
                <Link href="https://cat-bounce.com/" visitable={true} inline={true} light={true} target="_blank">
                    Inline External Visitable link (Primary only)
                </Link>
                . Secondary light links are not supported.
            </Body>
        </View>
    </View>`,...(we=(Le=W.parameters)==null?void 0:Le.docs)==null?void 0:we.source}}};var ve,Se,xe;v.parameters={...v.parameters,docs:{...(ve=v.parameters)==null?void 0:ve.docs,source:{originalSource:`() => <HeadingSmall>
        <Link href="#nonexistent-link" id="typography-link">
            Link inside a Heading element
        </Link>
    </HeadingSmall>`,...(xe=(Se=v.parameters)==null?void 0:Se.docs)==null?void 0:xe.source}}};var Ie,Te,Ve;P.parameters={...P.parameters,docs:{...(Ie=P.parameters)==null?void 0:Ie.docs,source:{originalSource:`() => <Link href="#" style={styles.pinkLink}>
        This link has a style.
    </Link>`,...(Ve=(Te=P.parameters)==null?void 0:Te.docs)==null?void 0:Ve.source}}};var _e,We,Pe;B.parameters={...B.parameters,docs:{...(_e=B.parameters)==null?void 0:_e.docs,source:{originalSource:`() => <MemoryRouter>
        <View>
            <View style={styles.row}>
                <Link href="/foo" style={styles.heading} onClick={() => {
        // eslint-disable-next-line no-console
        console.log("I'm still on the same page!");
      }}>
                    <LabelLarge>Uses Client-side Nav</LabelLarge>
                </Link>
                <Link href="/iframe.html?id=link--default&viewMode=story" style={styles.heading} skipClientNav>
                    <LabelLarge>Avoids Client-side Nav</LabelLarge>
                </Link>
            </View>
            <View style={styles.navigation}>
                <Switch>
                    <Route path="/foo">
                        <View id="foo">
                            The first link does client-side navigation here.
                        </View>
                    </Route>
                    <Route path="*">See navigation changes here</Route>
                </Switch>
            </View>
        </View>
    </MemoryRouter>`,...(Pe=(We=B.parameters)==null?void 0:We.docs)==null?void 0:Pe.source}}};var Be,Ce,Re;S.parameters={...S.parameters,docs:{...(Be=S.parameters)==null?void 0:Be.docs,source:{originalSource:`() => <Body>
        <Link href="#" title="I am a title 😎">
            This link has a title.
        </Link>
    </Body>`,...(Re=(Ce=S.parameters)==null?void 0:Ce.docs)==null?void 0:Re.source}}};var Ee,He,Ne;C.parameters={...C.parameters,docs:{...(Ee=C.parameters)==null?void 0:Ee.docs,source:{originalSource:`() => <View style={{
  padding: Spacing.medium_16
}}>
        <View style={styles.rightToLeft}>
            <Link href="/" startIcon={icons.caretRight}>
                هذا الرابط مكتوب باللغة العربية
            </Link>
            <Strut size={Spacing.medium_16} />
            <Link href="/" endIcon={icons.caretLeft}>
                هذا الرابط مكتوب باللغة العربية
            </Link>
            <Strut size={Spacing.medium_16} />
            <Link href="/" startIcon={icons.caretRight} endIcon={icons.caretLeft}>
                هذا الرابط مكتوب باللغة العربية
            </Link>
        </View>
    </View>`,...(Ne=(He=C.parameters)==null?void 0:He.docs)==null?void 0:Ne.source}}};const Pn=["Default","Primary","Secondary","Visitable","LightPrimary","LightVisitable","OpensInANewTab","StartAndEndIcons","Inline","InlineLight","Variants","WithTypography","WithStyle","Navigation","WithTitle","RightToLeftWithIcons"];export{E as Default,L as Inline,w as InlineLight,f as LightPrimary,T as LightVisitable,B as Navigation,V as OpensInANewTab,g as Primary,C as RightToLeftWithIcons,b as Secondary,_ as StartAndEndIcons,W as Variants,I as Visitable,P as WithStyle,S as WithTitle,v as WithTypography,Pn as __namedExportsOrder,Wn as default};
//# sourceMappingURL=link.stories-b3b891f5.js.map
