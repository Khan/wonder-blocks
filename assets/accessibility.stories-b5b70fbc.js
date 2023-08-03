import{M as b,C as y,b as m}from"./index-35e12253.js";import{l as T,V as r}from"./render-state-root-891c0d56.js";import{S as d,C as h}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{I as s}from"./icon-a4f17d53.js";import{i as l,c}from"./icon-assets-a0b49981.js";import{B as i}from"./footnote-761d2bcc.js";import{j as n,a as e,F as k}from"./jsx-runtime-309e447d.js";import{u}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";const t=T.StyleSheet.create({explanation:{fontWeight:700,flexDirection:"row",marginTop:d.xSmall_8},correct:{color:h.green,marginRight:d.xxxSmall_4,paddingTop:d.xxxxSmall_2},incorrect:{color:h.red,marginRight:d.xxxSmall_4,paddingTop:d.xxxxSmall_2}});function f(a){const o=Object.assign({h2:"h2",h3:"h3",ul:"ul",li:"li",code:"code",a:"a",p:"p"},u(),a.components);return n(k,{children:[e(b,{title:"Typography / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,e(o.h2,{id:"typography-accessibility",children:"Typography Accessibility"}),`
`,e(o.h3,{id:"rules-of-thumb",children:"Rules of Thumb"}),`
`,n(o.ul,{children:[`
`,n(o.li,{children:[`The font size should be large enough for the text to be readable. The
font size for the Wonder Blocks Typography `,e(o.code,{children:"Body"}),` element is currently
set to be 16px. Headings are even larger.`,`
`,n(o.ul,{children:[`
`,n(o.li,{children:[`Each Wonder Blocks Typography component has its own predetermined
font size - this cannot be updated by the user via the `,e(o.code,{children:"styles"})," prop."]}),`
`]}),`
`]}),`
`,n(o.li,{children:["The color contrast should pass WCAG.",`
`,n(o.ul,{children:[`
`,n(o.li,{children:[`"WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for
normal text and 3:1 for large text." `,e(o.a,{href:"https://webaim.org/resources/contrastchecker/",target:"_blank",rel:"nofollow noopener noreferrer",children:"(Contrast Checker, WebAIM)"}),"."]}),`
`]}),`
`]}),`
`,n(o.li,{children:[`It is best to use a familiar font that is easy to read. By default,
most Wonder Blocks Typography elements use Lato (a sans-serif font) for
Latin-based languages, and Noto for Non-Latin languages such as Arabic,
Armenian, Greek, and Hebrew. The `,e(o.code,{children:"BodySerif"})," and ",e(o.code,{children:"BodySerifBlock"}),`
components use the Noto Serif font.`,`
`,n(o.ul,{children:[`
`,e(o.li,{children:`Note that sans-serif fonts are generally recommended for use on web,
but serif fonts may be preferable for some users, such as users with
dyslexia.`}),`
`]}),`
`]}),`
`,n(o.li,{children:[`There should be adequate line spacing in order to make text easier to read.
Each Wonder Blocks Typography component has its own predetermined
line height - this cannot be updated by the user via the `,e(o.code,{children:"styles"})," prop."]}),`
`]}),`
`,n(o.p,{children:[`More information about all these points and more can be found in the
`,e(o.a,{href:"#references",children:"References"})," below."]}),`
`,e(o.h3,{id:"demo-font-size",children:"Demo: Font size"}),`
`,e(y,{children:e(m,{name:"Font size",children:n(r,{children:[n(r,{style:t.explanation,children:[e(s,{icon:l,style:t.incorrect}),e(i,{children:e(o.p,{children:"The following text is too small for body text (10px):"})})]}),e(r,{style:{fontSize:"10px"},children:e("p",{children:"The quick brown fox jumps over the lazy dog."})}),n(r,{style:t.explanation,children:[e(s,{icon:c,style:t.correct}),e(i,{children:e(o.p,{children:"The following text is adequate for body text (16px):"})})]}),e(i,{children:"The quick brown fox jumps over the lazy dog"})]})})}),`
`,e(o.h3,{id:"demo-color-contrast",children:"Demo: Color contrast"}),`
`,e(y,{children:e(m,{name:"Color contrast",children:n(r,{children:[n(r,{style:t.explanation,children:[e(s,{icon:l,style:t.incorrect}),e(i,{children:e(o.p,{children:"The color contrast for the following text is too low:"})})]}),e(i,{style:{color:h.offBlack32},children:e(o.p,{children:"The quick brown fox jumps over the lazy dog"})}),n(r,{style:t.explanation,children:[e(s,{icon:c,style:t.correct}),e(i,{children:e(o.p,{children:"The color contrast for the following text is adequate:"})})]}),e(i,{style:{color:h.offBlack},children:e(o.p,{children:"The quick brown fox jumps over the lazy dog"})})]})})}),`
`,e(o.h3,{id:"demo-line-spacing",children:"Demo: Line spacing"}),`
`,e(y,{children:e(m,{name:"Line spacing",children:n(r,{children:[n(r,{style:t.explanation,children:[e(s,{icon:l,style:t.incorrect}),e(i,{children:"The following line spacing is too small:"})]}),e(r,{style:{lineHeight:1},children:e("p",{children:e(o.p,{children:`Khan Academy offers practice exercises, instructional
videos, and a personalized learning dashboard that empower
learners to study at their own pace in and outside of the
classroom. We tackle math, science, computing, history, art
history, economics, and more, including K-14 and test
preparation (SAT, Praxis, LSAT) content. We focus on skill
mastery to help learners establish strong foundations, so
there's no limit to what they can learn next!`})})}),n(r,{style:t.explanation,children:[e(s,{icon:c,style:t.correct}),e(i,{children:"The following line spacing is adequate:"})]}),e(i,{children:e(o.p,{children:`Khan Academy offers practice exercises, instructional videos,
and a personalized learning dashboard that empower learners to
study at their own pace in and outside of the classroom. We
tackle math, science, computing, history, art history,
economics, and more, including K-14 and test preparation (SAT,
Praxis, LSAT) content. We focus on skill mastery to help
learners establish strong foundations, so there's no limit to
what they can learn next!`})})]})})}),`
`,e(o.h3,{id:"references",children:"References"}),`
`,n(o.ul,{children:[`
`,e(o.li,{children:e(o.a,{href:"https://webaim.org/techniques/fonts/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Typefaces and Fonts - WebAIM"})}),`
`,e(o.li,{children:e(o.a,{href:"https://webaim.org/resources/contrastchecker",target:"_blank",rel:"nofollow noopener noreferrer",children:"Contrast Checker - WebAIM"})}),`
`]})]})}function S(a={}){const{wrapper:o}=Object.assign({},u(),a.components);return o?e(o,{...a,children:e(f,{...a})}):f(a)}const g=()=>n(r,{children:[n(r,{style:t.explanation,children:[e(s,{icon:l,style:t.incorrect}),e(i,{children:e("p",{children:"The following text is too small for body text (10px):"})})]}),e(r,{style:{fontSize:"10px"},children:e("p",{children:"The quick brown fox jumps over the lazy dog."})}),n(r,{style:t.explanation,children:[e(s,{icon:c,style:t.correct}),e(i,{children:e("p",{children:"The following text is adequate for body text (16px):"})})]}),e(i,{children:"The quick brown fox jumps over the lazy dog"})]});g.storyName="Font size";g.parameters={storySource:{source:`<View><View style={styles.explanation}><Icon icon={icons.incorrect} style={styles.incorrect} /><Body><p>{"The following text is too small for body text (10px):"}</p></Body></View><View style={{
    fontSize: "10px"
  }}><p>{"The quick brown fox jumps over the lazy dog."}</p></View><View style={styles.explanation}><Icon icon={icons.correct} style={styles.correct} /><Body><p>{"The following text is adequate for body text (16px):"}</p></Body></View><Body>{"The quick brown fox jumps over the lazy dog"}</Body></View>`}};const x=()=>n(r,{children:[n(r,{style:t.explanation,children:[e(s,{icon:l,style:t.incorrect}),e(i,{children:e("p",{children:"The color contrast for the following text is too low:"})})]}),e(i,{style:{color:h.offBlack32},children:e("p",{children:"The quick brown fox jumps over the lazy dog"})}),n(r,{style:t.explanation,children:[e(s,{icon:c,style:t.correct}),e(i,{children:e("p",{children:"The color contrast for the following text is adequate:"})})]}),e(i,{style:{color:h.offBlack},children:e("p",{children:"The quick brown fox jumps over the lazy dog"})})]});x.storyName="Color contrast";x.parameters={storySource:{source:`<View><View style={styles.explanation}><Icon icon={icons.incorrect} style={styles.incorrect} /><Body><p>{"The color contrast for the following text is too low:"}</p></Body></View><Body style={{
    color: Color.offBlack32
  }}><p>{"The quick brown fox jumps over the lazy dog"}</p></Body><View style={styles.explanation}><Icon icon={icons.correct} style={styles.correct} /><Body><p>{"The color contrast for the following text is adequate:"}</p></Body></View><Body style={{
    color: Color.offBlack
  }}><p>{"The quick brown fox jumps over the lazy dog"}</p></Body></View>`}};const w=()=>n(r,{children:[n(r,{style:t.explanation,children:[e(s,{icon:l,style:t.incorrect}),e(i,{children:"The following line spacing is too small:"})]}),e(r,{style:{lineHeight:1},children:e("p",{children:e("p",{children:`Khan Academy offers practice exercises, instructional
videos, and a personalized learning dashboard that empower
learners to study at their own pace in and outside of the
classroom. We tackle math, science, computing, history, art
history, economics, and more, including K-14 and test
preparation (SAT, Praxis, LSAT) content. We focus on skill
mastery to help learners establish strong foundations, so
there's no limit to what they can learn next!`})})}),n(r,{style:t.explanation,children:[e(s,{icon:c,style:t.correct}),e(i,{children:"The following line spacing is adequate:"})]}),e(i,{children:e("p",{children:`Khan Academy offers practice exercises, instructional videos,
and a personalized learning dashboard that empower learners to
study at their own pace in and outside of the classroom. We
tackle math, science, computing, history, art history,
economics, and more, including K-14 and test preparation (SAT,
Praxis, LSAT) content. We focus on skill mastery to help
learners establish strong foundations, so there's no limit to
what they can learn next!`})})]});w.storyName="Line spacing";w.parameters={storySource:{source:`<View><View style={styles.explanation}><Icon icon={icons.incorrect} style={styles.incorrect} /><Body>{"The following line spacing is too small:"}</Body></View><View style={{
    lineHeight: 1
  }}><p><p>{"Khan Academy offers practice exercises, instructional\\nvideos, and a personalized learning dashboard that empower\\nlearners to study at their own pace in and outside of the\\nclassroom. We tackle math, science, computing, history, art\\nhistory, economics, and more, including K-14 and test\\npreparation (SAT, Praxis, LSAT) content. We focus on skill\\nmastery to help learners establish strong foundations, so\\nthere's no limit to what they can learn next!"}</p></p></View><View style={styles.explanation}><Icon icon={icons.correct} style={styles.correct} /><Body>{"The following line spacing is adequate:"}</Body></View><Body><p>{"Khan Academy offers practice exercises, instructional videos,\\nand a personalized learning dashboard that empower learners to\\nstudy at their own pace in and outside of the classroom. We\\ntackle math, science, computing, history, art history,\\neconomics, and more, including K-14 and test preparation (SAT,\\nPraxis, LSAT) content. We focus on skill mastery to help\\nlearners establish strong foundations, so there's no limit to\\nwhat they can learn next!"}</p></Body></View>`}};const p={title:"Typography / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},tags:["stories-mdx"],includeStories:["fontSize","colorContrast","lineSpacing"]};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:S};const G=["styles","fontSize","colorContrast","lineSpacing"];export{G as __namedExportsOrder,x as colorContrast,p as default,g as fontSize,w as lineSpacing,t as styles};
//# sourceMappingURL=accessibility.stories-b5b70fbc.js.map
