import{M as x,C as h,b as m}from"./index-35e12253.js";import{S as t,C as a}from"./index-f641b98f.js";import{V as o}from"./render-state-root-891c0d56.js";import"./index-9f32f44c.js";import{I as r}from"./icon-a4f17d53.js";import{c as u,i as f,a as y,b as g}from"./icon-assets-a0b49981.js";import{c as l}from"./footnote-761d2bcc.js";import{j as i,F as d,a as e}from"./jsx-runtime-309e447d.js";import{u as b}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";function p(c){const n=Object.assign({h2:"h2",h3:"h3",ul:"ul",li:"li",code:"code",a:"a",p:"p"},b(),c.components);return i(d,{children:[e(x,{title:"Icon / Accessibility",component:r,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,e(n.h2,{id:"icon-accessibility",children:"Icon Accessibility"}),`
`,e(n.h3,{id:"rules-of-thumb",children:"Rules of Thumb"}),`
`,i(n.ul,{children:[`
`,e(n.li,{children:"Use familiar or commonly used icons."}),`
`,e(n.li,{children:"Each icon should convey a single meaning."}),`
`,e(n.li,{children:"Icons should be easy to see."}),`
`,i(n.li,{children:["The color contrast should pass WCAG.",`
`,i(n.ul,{children:[`
`,e(n.li,{children:"At least 4.5:1 contrast ratio for icons."}),`
`]}),`
`]}),`
`,i(n.li,{children:[`Ideally, an icon should be accompanied by text. However, if an icon
is not accompanied by text, provide alt text.`,`
`,i(n.ul,{children:[`
`,i(n.li,{children:[`Do not provide alt text for decorative icons. Set the alt text
to an empty string (`,e(n.code,{children:'""'}),")."]}),`
`,i(n.li,{children:["The ",e(n.code,{children:"title"}),` attribute is often used to display a description on mouse
hover, but please note that use of the `,e(n.code,{children:"title"}),` attribute is discouraged
as titles are not available to keyboard-only or touch-only users.
More information can be found in the `,e(n.a,{href:"#references",children:"References"})," below."]}),`
`]}),`
`]}),`
`,i(n.li,{children:[`Icons should go on the opposite side as left-to-right languages
for right-to-left languages.`,`
`,i(n.ul,{children:[`
`,e(n.li,{children:"The icon may also need to be mirrored."}),`
`]}),`
`]}),`
`]}),`
`,i(n.p,{children:[`More information about all these points can be found in the
`,e(n.a,{href:"#references",children:"References"})," below."]}),`
`,e(n.h3,{id:"demo-contrast",children:"Demo: Contrast"}),`
`,e(h,{children:i(m,{name:"Icon contrast",children:[i(o,{style:{flexDirection:"row",marginBottom:t.xSmall_8},children:[e(l,{style:{display:"inline"},children:e(n.p,{children:"High contrast icon (GOOD):"})}),e(r,{icon:u,style:{color:a.blue,marginInlineStart:t.xSmall_8}})]}),i(o,{style:{flexDirection:"row"},children:[e(l,{style:{display:"inline"},children:e(n.p,{children:"Low contrast icon (BAD):"})}),e(r,{icon:f,style:{color:a.lightBlue,marginInlineStart:t.xSmall_8}})]})]})}),`
`,e(n.h3,{id:"demo-right-to-left-icons",children:"Demo: Right-to-left icons"}),`
`,e(h,{children:i(m,{name:"Right to left icons",children:[i(o,{style:{flexDirection:"row",direction:"ltr"},children:[e(r,{icon:y}),e(l,{style:{display:"inline",marginInlineStart:t.xSmall_8},children:e(n.p,{children:"Left to right"})})]}),i(o,{style:{flexDirection:"row",direction:"rtl"},children:[e(r,{icon:g}),e(l,{style:{display:"inline",marginInlineStart:t.xSmall_8},children:e(n.p,{children:"دائیں سے بائیں"})})]})]})}),`
`,e(n.h3,{id:"references",children:"References"}),`
`,i(n.ul,{children:[`
`,e(n.li,{children:e(n.a,{href:"https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p07-icons-used/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Use Icons that Help the User - W3"})}),`
`,e(n.li,{children:e(n.a,{href:"https://m2.material.io/design/usability/bidirectionality.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"Bidirectionality - Material"})}),`
`,e(n.li,{children:e(n.a,{href:"https://blog.hubspot.com/website/accessible-icons",target:"_blank",rel:"nofollow noopener noreferrer",children:"Accessible Icons: How to Make Them for Your Website"})}),`
`,e(n.li,{children:e(n.a,{href:"https://www.tpgi.com/html5-accessibility-chops-title-attribute-use-and-abuse/",target:"_blank",rel:"nofollow noopener noreferrer",children:"HTML5 Accessibility Chops: title attribute use and abuse"})}),`
`]})]})}function I(c={}){const{wrapper:n}=Object.assign({},b(),c.components);return n?e(n,{...c,children:e(p,{...c})}):p(c)}const w=()=>i(d,{children:[i(o,{style:{flexDirection:"row",marginBottom:t.xSmall_8},children:[e(l,{style:{display:"inline"},children:e("p",{children:"High contrast icon (GOOD):"})}),e(r,{icon:u,style:{color:a.blue,marginInlineStart:t.xSmall_8}})]}),i(o,{style:{flexDirection:"row"},children:[e(l,{style:{display:"inline"},children:e("p",{children:"Low contrast icon (BAD):"})}),e(r,{icon:f,style:{color:a.lightBlue,marginInlineStart:t.xSmall_8}})]})]});w.storyName="Icon contrast";w.parameters={storySource:{source:`<View style={{
  flexDirection: "row",
  marginBottom: Spacing.xSmall_8
}}><LabelMedium style={{
    display: "inline"
  }}><p>{"High contrast icon (GOOD):"}</p></LabelMedium><Icon icon={icons.correct} style={{
    color: Color.blue,
    marginInlineStart: Spacing.xSmall_8
  }} /></View>
<View style={{
  flexDirection: "row"
}}><LabelMedium style={{
    display: "inline"
  }}><p>{"Low contrast icon (BAD):"}</p></LabelMedium><Icon icon={icons.incorrect} style={{
    color: Color.lightBlue,
    marginInlineStart: Spacing.xSmall_8
  }} /></View>`}};const S=()=>i(d,{children:[i(o,{style:{flexDirection:"row",direction:"ltr"},children:[e(r,{icon:y}),e(l,{style:{display:"inline",marginInlineStart:t.xSmall_8},children:e("p",{children:"Left to right"})})]}),i(o,{style:{flexDirection:"row",direction:"rtl"},children:[e(r,{icon:g}),e(l,{style:{display:"inline",marginInlineStart:t.xSmall_8},children:e("p",{children:"دائیں سے بائیں"})})]})]});S.storyName="Right to left icons";S.parameters={storySource:{source:`<View style={{
  flexDirection: "row",
  direction: "ltr"
}}><Icon icon={icons.caretRight} /><LabelMedium style={{
    display: "inline",
    marginInlineStart: Spacing.xSmall_8
  }}><p>{"Left to right"}</p></LabelMedium></View>
<View style={{
  flexDirection: "row",
  direction: "rtl"
}}><Icon icon={icons.caretLeft} /><LabelMedium style={{
    display: "inline",
    marginInlineStart: Spacing.xSmall_8
  }}><p>{"\\u062F\\u0627\\u0626\\u06CC\\u06BA \\u0633\\u06D2 \\u0628\\u0627\\u0626\\u06CC\\u06BA"}</p></LabelMedium></View>`}};const s={title:"Icon / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:r,tags:["stories-mdx"],includeStories:["iconContrast","rightToLeftIcons"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:I};const N=["iconContrast","rightToLeftIcons"];export{N as __namedExportsOrder,s as default,w as iconContrast,S as rightToLeftIcons};
//# sourceMappingURL=accessibility.stories-6fafce0f.js.map
