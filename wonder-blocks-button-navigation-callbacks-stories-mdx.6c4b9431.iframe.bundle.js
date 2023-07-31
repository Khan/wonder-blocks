"use strict";(self.webpackChunkwonder_blocks=self.webpackChunkwonder_blocks||[]).push([[2344],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./__docs__/wonder-blocks-button/navigation-callbacks.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BeforeNavCallbacks:()=>BeforeNavCallbacks,SafeWithNavCallbacks:()=>SafeWithNavCallbacks,beforeNavCallbacks:()=>beforeNavCallbacks,default:()=>__WEBPACK_DEFAULT_EXPORT__,safeWithNavCallbacks:()=>safeWithNavCallbacks});__webpack_require__("./node_modules/react/index.js");var _storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),react_router_dom__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./node_modules/aphrodite/lib/index.js"),__webpack_require__("./node_modules/react-router/esm/react-router.js")),_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/wonder-blocks-button/dist/es/index.js"),_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/wonder-blocks-core/dist/es/index.js"),_button_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./__docs__/wonder-blocks-button/button.stories.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const BeforeNavCallbacks=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.VA,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__.G7,{style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.row,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,{href:"/foo",style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.button,beforeNav:()=>new Promise(((resolve,reject)=>{setTimeout(resolve,1e3)})),children:"beforeNav, client-side nav"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,{href:"/foo",style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.button,skipClientNav:!0,beforeNav:()=>new Promise(((resolve,reject)=>{setTimeout(resolve,1e3)})),children:"beforeNav, server-side nav"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,{href:"https://google.com",style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.button,skipClientNav:!0,beforeNav:()=>new Promise(((resolve,reject)=>{setTimeout(resolve,1e3)})),children:"beforeNav, open URL in new tab"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.rs,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.AW,{path:"/foo",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__.G7,{id:"foo",children:"Hello, world!"})})})]})}),SafeWithNavCallbacks=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.VA,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__.G7,{style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.row,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,{href:"/foo",style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.button,safeWithNav:()=>new Promise(((resolve,reject)=>{setTimeout(resolve,1e3)})),children:"safeWithNav, client-side nav"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,{href:"/foo",style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.button,skipClientNav:!0,safeWithNav:()=>new Promise(((resolve,reject)=>{setTimeout(resolve,1e3)})),children:"safeWithNav, server-side nav"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,{href:"https://google.com",style:_button_stories__WEBPACK_IMPORTED_MODULE_4__.styles.button,skipClientNav:!0,safeWithNav:()=>new Promise(((resolve,reject)=>{setTimeout(resolve,1e3)})),children:"safeWithNav, open URL in new tab"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.rs,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.AW,{path:"/foo",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_khanacademy_wonder_blocks_core__WEBPACK_IMPORTED_MODULE_3__.G7,{id:"foo",children:"Hello, world!"})})})]})});function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",code:"code",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h2:"h2",h3:"h3"},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_7__.ah)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_8__.h_,{title:"Button / Navigation Callbacks",component:_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}}}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h1,{id:"running-callbacks-on-navigation",children:"Running Callbacks on Navigation"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:["Sometimes you may need to run some code and also navigate when the user\nclicks the button. For example, you might want to send a request to the\nserver and also send the user to a different page. You can do this by\npassing in a URL to the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"href"})," prop and also passing in a callback\nfunction to either the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"onClick"}),", ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"beforeNav"}),", or ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"safeWithNav"})," prop.\nWhich prop you choose depends on your use case."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.li,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"onClick"})," is guaranteed to run to completion before navigation starts,\nbut it is not async aware, so it should only be used if all of the code\nin your callback function executes synchronously."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.li,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"beforeNav"})," is guaranteed to run async operations before navigation\nstarts. You must return a promise from the callback function passed in\nto this prop, and the navigation will happen after the promise\nresolves. If the promise rejects, the navigation will not occur.\nThis prop should be used if it's important that the async code\ncompletely finishes before the next URL starts loading."]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.li,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"safeWithNav"})," runs async code concurrently with navigation when safe,\nbut delays navigation until the async code is finished when\nconcurrent execution is not safe. You must return a promise from the\ncallback function passed in to this prop, and Wonder Blocks will run\nthe async code in parallel with client-side navigation or while opening\na new tab, but will wait until the async code finishes to start a\nserver-side navigation. If the promise rejects the navigation will\nhappen anyway. This prop should be used when it's okay to load\nthe next URL while the async callback code is running."]}),"\n"]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.p,{children:"This table gives an overview of the options:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.table,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.thead,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.th,{align:"none",children:"Prop"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.th,{align:"none",children:"Async safe?"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.th,{align:"none",children:"Completes before navigation?"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.tbody,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"onClick"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"no"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"yes"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"beforeNav"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"yes"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"yes"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.tr,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"safeWithNav"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"yes"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.td,{align:"none",children:"no"})]})]})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:["It is possible to use more than one of these props on the same element.\nIf multiple props are used, they will run in this order: first ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"onClick"}),",\nthen ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"beforeNav"}),", then ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"safeWithNav"}),". If both ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"beforeNav"})," and ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"safeWithNav"}),"\nare used, the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"safeWithNav"})," callback will not be called until the\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"beforeNav"})," promise resolves successfully. If the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"beforeNav"})," promise\nrejects, ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"safeWithNav"})," will not be run."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:["If the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"onClick"})," handler calls ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"preventDefault()"}),", then ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"beforeNav"}),"\nand ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"safeWithNav"})," will still run, but navigation will not occur."]}),"\n","\n","\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h2,{id:"stories",children:"Stories"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h3,{id:"beforenav-callbacks",children:"beforeNav Callbacks"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.p,{children:"These buttons always wait until the async callback code completes before\nstarting navigation."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_8__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_8__.oG,{name:"beforeNav Callbacks",children:BeforeNavCallbacks.bind({})})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.h3,{id:"safewithnav-callbacks",children:"safeWithNav Callbacks"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components.p,{children:["If the ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"onClick"})," callback calls ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components.code,{children:"preventDefault()"}),", then navigation will not occur."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_8__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_8__.oG,{name:"safeWithNav Callbacks",children:SafeWithNavCallbacks.bind({})})})]})}const beforeNavCallbacks=BeforeNavCallbacks.bind({});beforeNavCallbacks.storyName="beforeNav Callbacks",beforeNavCallbacks.parameters={storySource:{source:'() => <MemoryRouter>\n        <View style={styles.row}>\n            <Button href="/foo" style={styles.button} beforeNav={() => new Promise((resolve, reject) => {\n      setTimeout(resolve, 1000);\n    })}>\n                beforeNav, client-side nav\n            </Button>\n            <Button href="/foo" style={styles.button} skipClientNav={true} beforeNav={() => new Promise((resolve, reject) => {\n      setTimeout(resolve, 1000);\n    })}>\n                beforeNav, server-side nav\n            </Button>\n            <Button href="https://google.com" style={styles.button} skipClientNav={true} beforeNav={() => new Promise((resolve, reject) => {\n      setTimeout(resolve, 1000);\n    })}>\n                beforeNav, open URL in new tab\n            </Button>\n            <Switch>\n                <Route path="/foo">\n                    <View id="foo">Hello, world!</View>\n                </Route>\n            </Switch>\n        </View>\n    </MemoryRouter>'}};const safeWithNavCallbacks=SafeWithNavCallbacks.bind({});safeWithNavCallbacks.storyName="safeWithNav Callbacks",safeWithNavCallbacks.parameters={storySource:{source:'() => <MemoryRouter>\n        <View style={styles.row}>\n            <Button href="/foo" style={styles.button} safeWithNav={() => new Promise((resolve, reject) => {\n      setTimeout(resolve, 1000);\n    })}>\n                safeWithNav, client-side nav\n            </Button>\n            <Button href="/foo" style={styles.button} skipClientNav={true} safeWithNav={() => new Promise((resolve, reject) => {\n      setTimeout(resolve, 1000);\n    })}>\n                safeWithNav, server-side nav\n            </Button>\n            <Button href="https://google.com" style={styles.button} skipClientNav={true} safeWithNav={() => new Promise((resolve, reject) => {\n      setTimeout(resolve, 1000);\n    })}>\n                safeWithNav, open URL in new tab\n            </Button>\n            <Switch>\n                <Route path="/foo">\n                    <View id="foo">Hello, world!</View>\n                </Route>\n            </Switch>\n        </View>\n    </MemoryRouter>'}};const componentMeta={title:"Button / Navigation Callbacks",parameters:{previewTabs:{canvas:{hidden:!0}},viewMode:"docs",chromatic:{disableSnapshot:!0}},component:_khanacademy_wonder_blocks_button__WEBPACK_IMPORTED_MODULE_2__.Z,tags:["stories-mdx"],includeStories:["beforeNavCallbacks","safeWithNavCallbacks"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_storybook_addon_essentials_docs_mdx_react_shim__WEBPACK_IMPORTED_MODULE_7__.ah)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const __WEBPACK_DEFAULT_EXPORT__=componentMeta}}]);