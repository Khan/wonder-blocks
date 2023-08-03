import{M as x,C as b,b as p}from"./index-35e12253.js";import{l as S,V as r}from"./render-state-root-891c0d56.js";import{C as o}from"./clickable-8a7f284d.js";import{C as d,S as m}from"./index-f641b98f.js";import"./index-9f32f44c.js";import{I as g}from"./icon-a4f17d53.js";import{d as y}from"./icon-assets-a0b49981.js";import{B as f}from"./footnote-761d2bcc.js";import{a as n,j as i,F as A}from"./jsx-runtime-309e447d.js";import{u as k}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./index-8d47fad6.js";const t=S.StyleSheet.create({resting:{boxShadow:`inset 0px 0px 1px 1px ${d.lightBlue}`,padding:m.xSmall_8},hovered:{textDecoration:"underline",backgroundColor:d.blue,color:d.white},pressed:{color:d.darkBlue},focused:{outline:`solid 4px ${d.lightBlue}`},panel:{padding:m.medium_16,boxShadow:`inset 0px 0px 0 1px ${d.offBlack8}`}});function u(l){const e=Object.assign({h1:"h1",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",h3:"h3",p:"p",em:"em",strong:"strong"},k(),l.components);return i(A,{children:[n(x,{title:"Clickable / Clickable / Accessibility",component:o,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"accessibility",children:"Accessibility"}),`
`,n(e.h2,{id:"keyboard-interactions",children:"Keyboard interactions"}),`
`,i(e.table,{children:[n(e.thead,{children:i(e.tr,{children:[n(e.th,{align:"none",children:"Key"}),n(e.th,{align:"none",children:"Action"})]})}),n(e.tbody,{children:i(e.tr,{children:[n(e.td,{align:"none",children:"Enter or Space"}),n(e.td,{align:"none",children:"Activates the clickable element"})]})})]}),`
`,n(e.h2,{id:"roles",children:"Roles"}),`
`,i(e.table,{children:[n(e.thead,{children:i(e.tr,{children:[n(e.th,{align:"none",children:"Component"}),n(e.th,{align:"none",children:"Role"}),n(e.th,{align:"none",children:"Usage"})]})}),i(e.tbody,{children:[i(e.tr,{children:[n(e.td,{align:"none",children:n(e.code,{children:"<Clickable onClick={} />"})}),n(e.td,{align:"none",children:"button"}),n(e.td,{align:"none",children:"A clickable button element"})]}),i(e.tr,{children:[n(e.td,{align:"none",children:n(e.code,{children:'<Clickable href="/math" skipClientNav={true} />'})}),n(e.td,{align:"none",children:"link"}),n(e.td,{align:"none",children:"A clickable anchor element"})]}),i(e.tr,{children:[n(e.td,{align:"none",children:n(e.code,{children:'<Clickable href="/math" />'})}),n(e.td,{align:"none",children:"link"}),i(e.td,{align:"none",children:["A clickable anchor element (using ",n(e.code,{children:"react-router"}),"'s Link)"]})]})]})]}),`
`,n(e.h2,{id:"attributes",children:"Attributes"}),`
`,i(e.table,{children:[n(e.thead,{children:i(e.tr,{children:[n(e.th,{align:"none",children:"Attribute"}),n(e.th,{align:"none",children:"Usage"})]})}),i(e.tbody,{children:[i(e.tr,{children:[n(e.td,{align:"none",children:'tabindex="0"'}),n(e.td,{align:"none",children:"Includes the clickable element in the tab sequence."})]}),i(e.tr,{children:[n(e.td,{align:"none",children:'aria-disabled="true"'}),n(e.td,{align:"none",children:"Indicates that the element is perceivable but disabled."})]}),i(e.tr,{children:[n(e.td,{align:"none",children:'aria-label="value"'}),n(e.td,{align:"none",children:"Defines a string value that labels the clickable element. Use it in case the clickable element doesn't include any descriptive text (e.g. Icons, images)"})]})]})]}),`
`,n(e.h2,{id:"examples",children:"Examples"}),`
`,n(e.h3,{id:"labeling",children:"Labeling"}),`
`,i(e.p,{children:[n(e.code,{children:"Clickable"})," has an ",n(e.code,{children:"ariaLabel"}),` prop that sets the component's accessible name.
ariaLabel should be passed when using graphical elements to let screen reader
users know the purpose of the clickable element.`]}),`
`,i(e.p,{children:[n(e.em,{children:"NOTE:"})," If the clickable element is not graphical, it's best to avoid using ",n(e.code,{children:"ariaLabel"})," as the text content of the element itself, which is read by default, should ideally be descriptive enough to not need to manually pass in the label."]}),`
`,n(e.p,{children:"This is an example of a component with an accessible label:"}),`
`,n(b,{children:n(p,{name:"Labeling",children:n(r,{children:n(o,{onClick:()=>{},"aria-label":"More information about this subject",children:({hovered:a,focused:s,pressed:h})=>n(g,{icon:y})})})})}),`
`,n(e.h3,{id:"disabled-state",children:"Disabled state"}),`
`,i(e.p,{children:["Clickable does not need an ",n(e.code,{children:"aria-disabled"}),` attribute, if it also has a
`,n(e.code,{children:"disabled"}),` component prop. We internally take care of defining the behavior so
users can use these type of controls (including Screen Readers). By defining the
internal behavior we can ensure that the component is accessible via Keyboard
but not interactable/operatable.`]}),`
`,n(b,{children:n(p,{name:"Disabled state",children:n(o,{onClick:a=>console.log("Hello, world!"),disabled:!0,children:({hovered:a,focused:s,pressed:h})=>"This is a disabled clickable element"})})}),`
`,n(e.h3,{id:"keyboard-navigation",children:"Keyboard navigation"}),`
`,n(e.p,{children:`Clickable adds support to keyboard navigation and setting ARIA attributes. This
way, your components are accessible and emulate better the browser's behavior.`}),`
`,i(e.p,{children:[n(e.strong,{children:"NOTE:"}),` If you want to navigate to an external URL and/or reload the window,
make sure to use `,n(e.code,{children:"href"})," and `skipClientNav=",!0,"."]}),`
`,n(b,{children:n(p,{name:"Keyboard navigation",children:i(r,{children:[n(o,{role:"tab","aria-controls":"panel-1",id:"tab-1",children:({hovered:a,focused:s,pressed:h})=>n(r,{style:[t.resting,a&&t.hovered,s&&t.focused,h&&t.pressed],children:n(f,{children:"Open School Info"})})}),n(r,{id:"panel-1",role:"tabpanel",tabindex:"0","aria-labelledby":"tab-1",style:t.panel,children:n(e.p,{children:"This is the information for the school."})})]})})}),`
`,`
`,n(e.p,{children:";"})]})}function I(l={}){const{wrapper:e}=Object.assign({},k(),l.components);return e?n(e,{...l,children:n(u,{...l})}):u(l)}const v=()=>n(r,{children:n(o,{onClick:()=>{},"aria-label":"More information about this subject",children:({hovered:l,focused:e,pressed:a})=>n(g,{icon:y})})});v.storyName="Labeling";v.parameters={storySource:{source:`<View><Clickable onClick={() => {}} aria-label="More information about this subject">{({
      hovered,
      focused,
      pressed
    }) => <Icon icon={icons.info} />}</Clickable></View>`}};const C=()=>n(o,{onClick:l=>console.log("Hello, world!"),disabled:!0,children:({hovered:l,focused:e,pressed:a})=>"This is a disabled clickable element"});C.storyName="Disabled state";C.parameters={storySource:{source:`<Clickable onClick={e => console.log("Hello, world!")} disabled={true}>{({
    hovered,
    focused,
    pressed
  }) => "This is a disabled clickable element"}</Clickable>`}};const w=()=>i(r,{children:[n(o,{role:"tab","aria-controls":"panel-1",id:"tab-1",children:({hovered:l,focused:e,pressed:a})=>n(r,{style:[t.resting,l&&t.hovered,e&&t.focused,a&&t.pressed],children:n(f,{children:"Open School Info"})})}),n(r,{id:"panel-1",role:"tabpanel",tabindex:"0","aria-labelledby":"tab-1",style:t.panel,children:n("p",{children:"This is the information for the school."})})]});w.storyName="Keyboard navigation";w.parameters={storySource:{source:`<View><Clickable role="tab" aria-controls="panel-1" id="tab-1">{({
      hovered,
      focused,
      pressed
    }) => <View style={[styles.resting, hovered && styles.hovered, focused && styles.focused, pressed && styles.pressed]}>
                        <Body>Open School Info</Body>
                    </View>}</Clickable><View id="panel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1" style={styles.panel}><p>{"This is the information for the school."}</p></View></View>`}};const c={title:"Clickable / Clickable / Accessibility",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:o,tags:["stories-mdx"],includeStories:["labeling","disabledState","keyboardNavigation"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:I};const P=["styles","labeling","disabledState","keyboardNavigation"];export{P as __namedExportsOrder,c as default,C as disabledState,w as keyboardNavigation,v as labeling,t as styles};
//# sourceMappingURL=accessibility.stories-84d23ec0.js.map
