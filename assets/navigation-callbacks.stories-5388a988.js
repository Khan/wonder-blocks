import{M as w,C as l,b as c}from"./index-35e12253.js";import{V as a}from"./render-state-root-891c0d56.js";import{B as r}from"./button-b2794e32.js";import"./index-9f32f44c.js";import{styles as i}from"./button.stories-cb858da3.js";import{a as n,j as t,F as N}from"./jsx-runtime-309e447d.js";import{M as d,S as u,R as f}from"./clickable-8a7f284d.js";import{u as p}from"./index-506666d7.js";import"./iframe-97aa1d91.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-938b085e.js";import"./index-d475d2ea.js";import"./_commonjsHelpers-de833af9.js";import"./index-9c2d1831.js";import"./inheritsLoose-9eefaa95.js";import"./assertThisInitialized-081f9914.js";import"./index-4733a090.js";import"./_baseIsEqual-976d9d82.js";import"./uniq-944679ca.js";import"./index-356e4a49.js";import"./footnote-761d2bcc.js";import"./index-f641b98f.js";import"./icon-a4f17d53.js";import"./index-c40e7184.js";import"./index-cdbaf94c.js";import"./index-03bbf7d1.js";import"./icon-assets-a0b49981.js";import"./strut-c6011196.js";import"./component-info-cedbe096.js";import"./index-8d47fad6.js";const v=()=>n(d,{children:t(a,{style:i.row,children:[n(r,{href:"/foo",style:i.button,beforeNav:()=>new Promise((o,e)=>{setTimeout(o,1e3)}),children:"beforeNav, client-side nav"}),n(r,{href:"/foo",style:i.button,skipClientNav:!0,beforeNav:()=>new Promise((o,e)=>{setTimeout(o,1e3)}),children:"beforeNav, server-side nav"}),n(r,{href:"https://google.com",style:i.button,skipClientNav:!0,beforeNav:()=>new Promise((o,e)=>{setTimeout(o,1e3)}),children:"beforeNav, open URL in new tab"}),n(u,{children:n(f,{path:"/foo",children:n(a,{id:"foo",children:"Hello, world!"})})})]})}),m=()=>n(d,{children:t(a,{style:i.row,children:[n(r,{href:"/foo",style:i.button,safeWithNav:()=>new Promise((o,e)=>{setTimeout(o,1e3)}),children:"safeWithNav, client-side nav"}),n(r,{href:"/foo",style:i.button,skipClientNav:!0,safeWithNav:()=>new Promise((o,e)=>{setTimeout(o,1e3)}),children:"safeWithNav, server-side nav"}),n(r,{href:"https://google.com",style:i.button,skipClientNav:!0,safeWithNav:()=>new Promise((o,e)=>{setTimeout(o,1e3)}),children:"safeWithNav, open URL in new tab"}),n(u,{children:n(f,{path:"/foo",children:n(a,{id:"foo",children:"Hello, world!"})})})]})});function h(o){const e=Object.assign({h1:"h1",p:"p",code:"code",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h2:"h2",h3:"h3"},p(),o.components);return t(N,{children:[n(w,{title:"Button / Navigation Callbacks",component:r,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),`
`,n(e.h1,{id:"running-callbacks-on-navigation",children:"Running Callbacks on Navigation"}),`
`,t(e.p,{children:[`Sometimes you may need to run some code and also navigate when the user
clicks the button. For example, you might want to send a request to the
server and also send the user to a different page. You can do this by
passing in a URL to the `,n(e.code,{children:"href"}),` prop and also passing in a callback
function to either the `,n(e.code,{children:"onClick"}),", ",n(e.code,{children:"beforeNav"}),", or ",n(e.code,{children:"safeWithNav"}),` prop.
Which prop you choose depends on your use case.`]}),`
`,t(e.ul,{children:[`
`,t(e.li,{children:[`
`,t(e.p,{children:[n(e.code,{children:"onClick"}),` is guaranteed to run to completion before navigation starts,
but it is not async aware, so it should only be used if all of the code
in your callback function executes synchronously.`]}),`
`]}),`
`,t(e.li,{children:[`
`,t(e.p,{children:[n(e.code,{children:"beforeNav"}),` is guaranteed to run async operations before navigation
starts. You must return a promise from the callback function passed in
to this prop, and the navigation will happen after the promise
resolves. If the promise rejects, the navigation will not occur.
This prop should be used if it's important that the async code
completely finishes before the next URL starts loading.`]}),`
`]}),`
`,t(e.li,{children:[`
`,t(e.p,{children:[n(e.code,{children:"safeWithNav"}),` runs async code concurrently with navigation when safe,
but delays navigation until the async code is finished when
concurrent execution is not safe. You must return a promise from the
callback function passed in to this prop, and Wonder Blocks will run
the async code in parallel with client-side navigation or while opening
a new tab, but will wait until the async code finishes to start a
server-side navigation. If the promise rejects the navigation will
happen anyway. This prop should be used when it's okay to load
the next URL while the async callback code is running.`]}),`
`]}),`
`]}),`
`,n(e.p,{children:"This table gives an overview of the options:"}),`
`,t(e.table,{children:[n(e.thead,{children:t(e.tr,{children:[n(e.th,{align:"none",children:"Prop"}),n(e.th,{align:"none",children:"Async safe?"}),n(e.th,{align:"none",children:"Completes before navigation?"})]})}),t(e.tbody,{children:[t(e.tr,{children:[n(e.td,{align:"none",children:"onClick"}),n(e.td,{align:"none",children:"no"}),n(e.td,{align:"none",children:"yes"})]}),t(e.tr,{children:[n(e.td,{align:"none",children:"beforeNav"}),n(e.td,{align:"none",children:"yes"}),n(e.td,{align:"none",children:"yes"})]}),t(e.tr,{children:[n(e.td,{align:"none",children:"safeWithNav"}),n(e.td,{align:"none",children:"yes"}),n(e.td,{align:"none",children:"no"})]})]})]}),`
`,t(e.p,{children:[`It is possible to use more than one of these props on the same element.
If multiple props are used, they will run in this order: first `,n(e.code,{children:"onClick"}),`,
then `,n(e.code,{children:"beforeNav"}),", then ",n(e.code,{children:"safeWithNav"}),". If both ",n(e.code,{children:"beforeNav"})," and ",n(e.code,{children:"safeWithNav"}),`
are used, the `,n(e.code,{children:"safeWithNav"}),` callback will not be called until the
`,n(e.code,{children:"beforeNav"})," promise resolves successfully. If the ",n(e.code,{children:"beforeNav"}),` promise
rejects, `,n(e.code,{children:"safeWithNav"})," will not be run."]}),`
`,t(e.p,{children:["If the ",n(e.code,{children:"onClick"})," handler calls ",n(e.code,{children:"preventDefault()"}),", then ",n(e.code,{children:"beforeNav"}),`
and `,n(e.code,{children:"safeWithNav"})," will still run, but navigation will not occur."]}),`
`,`
`,`
`,n(e.h2,{id:"stories",children:"Stories"}),`
`,n(e.h3,{id:"beforenav-callbacks",children:"beforeNav Callbacks"}),`
`,n(e.p,{children:`These buttons always wait until the async callback code completes before
starting navigation.`}),`
`,n(l,{children:n(c,{name:"beforeNav Callbacks",children:v.bind({})})}),`
`,n(e.h3,{id:"safewithnav-callbacks",children:"safeWithNav Callbacks"}),`
`,t(e.p,{children:["If the ",n(e.code,{children:"onClick"})," callback calls ",n(e.code,{children:"preventDefault()"}),", then navigation will not occur."]}),`
`,n(l,{children:n(c,{name:"safeWithNav Callbacks",children:m.bind({})})})]})}function g(o={}){const{wrapper:e}=Object.assign({},p(),o.components);return e?n(e,{...o,children:n(h,{...o})}):h(o)}const b=v.bind({});b.storyName="beforeNav Callbacks";b.parameters={storySource:{source:`() => <MemoryRouter>
        <View style={styles.row}>
            <Button href="/foo" style={styles.button} beforeNav={() => new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })}>
                beforeNav, client-side nav
            </Button>
            <Button href="/foo" style={styles.button} skipClientNav={true} beforeNav={() => new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })}>
                beforeNav, server-side nav
            </Button>
            <Button href="https://google.com" style={styles.button} skipClientNav={true} beforeNav={() => new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })}>
                beforeNav, open URL in new tab
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>`}};const y=m.bind({});y.storyName="safeWithNav Callbacks";y.parameters={storySource:{source:`() => <MemoryRouter>
        <View style={styles.row}>
            <Button href="/foo" style={styles.button} safeWithNav={() => new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })}>
                safeWithNav, client-side nav
            </Button>
            <Button href="/foo" style={styles.button} skipClientNav={true} safeWithNav={() => new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })}>
                safeWithNav, server-side nav
            </Button>
            <Button href="https://google.com" style={styles.button} skipClientNav={true} safeWithNav={() => new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })}>
                safeWithNav, open URL in new tab
            </Button>
            <Switch>
                <Route path="/foo">
                    <View id="foo">Hello, world!</View>
                </Route>
            </Switch>
        </View>
    </MemoryRouter>`}};const s={title:"Button / Navigation Callbacks",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:r,tags:["stories-mdx"],includeStories:["beforeNavCallbacks","safeWithNavCallbacks"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:g};const Z=["BeforeNavCallbacks","SafeWithNavCallbacks","beforeNavCallbacks","safeWithNavCallbacks"];export{v as BeforeNavCallbacks,m as SafeWithNavCallbacks,Z as __namedExportsOrder,b as beforeNavCallbacks,s as default,y as safeWithNavCallbacks};
//# sourceMappingURL=navigation-callbacks.stories-5388a988.js.map
