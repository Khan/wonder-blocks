import{a as e,j as r}from"./jsx-runtime-309e447d.js";import{r as ae}from"./index-9f32f44c.js";import{V as t,l as ee}from"./render-state-root-891c0d56.js";import{B as re,a as S}from"./breadcrumbs-item-25bba318.js";import{B as s}from"./button-b2794e32.js";import{C as le,S as se}from"./index-f641b98f.js";import{S as te}from"./strut-c6011196.js";import{L as D}from"./link-64b6fd31.js";import{B as n,a as ie}from"./footnote-761d2bcc.js";import{O as a,M as ne}from"./one-pane-dialog-da34165b.js";import{p as V}from"./package-5b48c142.js";import{C as ue}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./index-9c2d1831.js";import"./with-action-scheduler-7e779422.js";import"./icon-assets-a0b49981.js";import"./icon-button-297fafd1.js";const de={content:{control:{type:null},description:`The content of the modal, appearing between the
            titlebar and footer.`,table:{type:{summary:"React.Node"}},type:{name:"other",value:"React.Node",required:!0}},title:{control:{type:"text"},description:"The title of the modal, appearing in the titlebar.",table:{type:{summary:"string"}},type:{name:"string",required:!0}},footer:{control:{type:null},description:`The content of the modal's footer.
            A great place for buttons! Content is right-aligned by default.
            To control alignment yourself, provide a container element
            with 100% width.`,table:{type:{summary:"React.Node"}}},breadcrumbs:{control:{type:null},description:`Adds a breadcrumb-trail, appearing in the ModalHeader,
            above the title.`,table:{type:{summary:"React.Element<Breadcrumbs>"}}},subtitle:{control:{type:"text"},description:`The subtitle of the modal, appearing in the titlebar,
            below the title.`,table:{type:{summary:"string"}}},onClose:{description:"Called when the button is clicked.\n            If you're using `ModalLauncher`, you probably shouldn't use this\n            prop! Instead, to listen for when the modal closes, add an\n            `onClose` handler to the `ModalLauncher`.  Doing so will\n            result in a console.warn().",table:{type:{summary:"() => mixed"}}},closeButtonVisible:{control:{type:"boolean"},defaultValue:"true",description:`When true, the close button is shown; otherwise,
            the close button is not shown.`,table:{defaultValue:{summary:"true"},type:{summary:"boolean"}}},above:{control:{type:null},description:`When set, provides a component that can render
            content above the top of the modal; when not set, no additional
            content is shown above the modal. This prop is passed down to
            the ModalDialog.`,table:{type:{summary:"React.Node"}}},below:{control:{type:null},description:`When set, provides a component that will render
            content below the bottom of the modal; when not set, no additional
            content is shown below the modal. This prop is passed down to
            the ModalDialog. NOTE: Devs can customize this content by
            rendering the component assigned to this prop with custom styles,
            such as by wrapping it in a View.`,table:{type:{summary:"React.Node"}}},role:{control:{type:"select"},defaultValue:"dialog",description:`When set, overrides the default role value. Default
            role is "dialog" Roles other than dialog and alertdialog aren't
            appropriate for this component`,options:["dialog","alertdialog"],table:{defaultValue:{summary:"dialog"},type:{summary:'"dialog" | "alertdialog"'}}},style:{control:{type:"object"},description:"Optional custom styles.",table:{type:{summary:"StyleType"}}},testId:{control:{type:"text"},description:`Test ID used for e2e testing.
            This ID will be passed down to the Dialog.`,table:{type:{summary:"string"}}},titleId:{control:{type:"text"},description:`An optional id parameter for the title. If one is
            not provided, a unique id will be generated.`,table:{type:{summary:"string"}}},"aria-describedby":{control:{type:"text"},description:"The ID of the content describing this dialog, if applicable",table:{type:{summary:"string"}}}},ce={phone:{name:"phone",styles:{width:"320px",height:"568px"}},tablet:{name:"tablet",styles:{width:"640px",height:"960px"}},desktop:{name:"desktop",styles:{width:"1024px",height:"768px"}}},Te={title:"Modal/OnePaneDialog",component:a,decorators:[o=>e(t,{style:i.example,children:e(o,{})})],parameters:{componentSubtitle:e(ue,{name:V.name,version:V.version}),docs:{description:{component:null},source:{excludeDecorators:!0}},viewport:{viewports:ce,defaultViewport:"desktop"},chromatic:{viewports:[320,640,1024]}},argTypes:de},x={render:o=>e(t,{style:i.previewSizer,children:e(t,{style:i.modalPositioner,children:e(a,{...o})})}),args:{content:e(n,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.`}),title:"Some title"}},c=()=>e(t,{style:i.previewSizer,children:e(t,{style:i.modalPositioner,children:e(a,{title:"Hello, world! Here is an example of a long title that wraps to the next line.",content:e(n,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`})})})});c.parameters={docs:{description:{story:`This is the most basic OnePaneDialog, with just
            the title and content.`}}};const m=()=>e(t,{style:i.previewSizer,children:e(t,{style:i.modalPositioner,children:e(a,{title:"Hello, world!",content:e(n,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}),footer:r(t,{style:i.footer,children:[e(ie,{children:"Step 1 of 4"}),r(t,{style:i.row,children:[e(s,{kind:"tertiary",children:"Previous"}),e(te,{size:16}),e(s,{kind:"primary",children:"Next"})]})]})})})});m.parameters={docs:{description:{story:"This OnePaneDialog includes a custom footer."}}};const p=()=>e(t,{style:i.previewSizer,children:e(t,{style:i.modalPositioner,children:e(a,{title:"Hello, world!",content:e(n,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}),subtitle:"Subtitle that provides additional context to the title"})})});p.parameters={docs:{description:{story:"This OnePaneDialog includes a custom subtitle."}}};const h=()=>e(t,{style:i.previewSizer,children:e(t,{style:i.modalPositioner,children:e(a,{title:"Hello, world!",content:e(n,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}),breadcrumbs:r(re,{children:[e(S,{children:e(D,{href:"",children:"Course"})}),e(S,{children:e(D,{href:"",children:"Unit"})}),e(S,{children:"Lesson"})]})})})});h.parameters={docs:{description:{story:`This OnePaneDialog includes a custom Breadcrumbs
            element.`}}};const y=()=>{const o={background:"url(./modal-above.png)",width:874,height:551,position:"absolute",top:40,left:-140},l={background:"url(./modal-below.png)",width:868,height:521,position:"absolute",top:-100,left:-300};return e(t,{style:i.previewSizer,children:e(t,{style:i.modalPositioner,children:e(a,{title:"Single-line title",content:r(t,{children:[e(n,{children:`Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id
                            est.`}),e("br",{}),e(n,{children:`Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id
                            est.`}),e("br",{}),e(n,{children:`Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id
                            est.`})]}),above:e(t,{style:o}),below:e(t,{style:l})})})})};y.parameters={docs:{description:{story:"The element passed into the `above` prop is\n            rendered in front of the modal. The element passed into the\n            `below` prop is rendered behind the modal. In this example,\n            a `<View>` element with a background image of a person and an\n            orange blob is passed into the `below` prop. A `<View>`\n            element with a background image of an arc and a blue semicircle\n            is passed into the `above` prop. This results in the person's\n            head and the orange blob peeking out from behind the modal, and\n            the arc and semicircle going over the front of the modal."}}};const g=()=>e(t,{style:i.previewSizer,children:e(t,{style:i.modalPositioner,children:e(a,{title:"Hello, world!",content:e(n,{children:`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.`}),style:{color:le.blue,maxWidth:1e3}})})});g.parameters={docs:{description:{story:"A OnePaneDialog can have custom styles via the\n            `style` prop. Here, the modal has a `maxWidth: 1000` and\n            `color: Color.blue` in its custom styles."}}};const b=()=>{const o=ee.StyleSheet.create({example:{padding:se.xLarge_32,alignItems:"center"},row:{flexDirection:"row",justifyContent:"flex-end"},footer:{alignItems:"center",flexDirection:"row",justifyContent:"space-between",width:"100%"}}),l=function(d){const{current:u,handleNextButton:w,handlePrevButton:q,question:v,total:B}=d;return e(a,{title:"Exercises",content:e(t,{children:r(n,{children:["This is the current question: ",v]})}),footer:r(t,{style:o.footer,children:[r(ie,{children:["Step ",u+1," of ",B]}),r(t,{style:o.row,children:[e(s,{kind:"tertiary",onClick:q,children:"Previous"}),e(te,{size:16}),e(s,{kind:"primary",onClick:w,children:"Next"})]})]})})},oe=function(d){const[u,w]=ae.useState(0),q=()=>{w(Math.min(u+1,d.questions.length-1))},v=()=>{w(Math.max(0,u-1))};return e(ne,{modal:e(l,{question:d.questions[u],current:u,total:d.questions.length,handlePrevButton:v,handleNextButton:q}),children:({openModal:B})=>e(s,{onClick:B,children:"Open flexible modal"})})};return e(t,{style:o.example,children:e(oe,{questions:["First question","Second question","Last question"]})})};b.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:`This example illustrates how we can update the
            Modal's contents by wrapping it into a new component/container.
            \`Modal\` is built in a way that provides great flexibility and
            makes it work with different variations and/or layouts.`}}};const f=()=>e(ne,{modal:({closeModal:l})=>e(a,{title:"Single-line title",content:e(n,{children:`Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id
                    est.`}),footer:e(s,{onClick:l,children:"Close"})}),children:({openModal:l})=>e(s,{onClick:l,children:"Click me to open the modal"})});f.parameters={chromatic:{disableSnapshot:!0},docs:{description:{story:"A modal can be launched using a launcher. Here,\n            the launcher is a `<Button>` element whose `onClick` function\n            opens the modal. The modal passed into the `modal` prop of\n            the `<ModalLauncher>` element is a `<OnePaneDialog>`.\n            To turn an element into a launcher, wrap the element in a\n            `<ModalLauncher>` element."}}};const i=ee.StyleSheet.create({example:{alignItems:"center",justifyContent:"center"},modalPositioner:{backgroundImage:"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",backgroundSize:"20px 20px",backgroundPosition:"0 0, 0 10px, 10px -10px, -10px 0px",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"absolute",left:0,right:0,top:0,bottom:0},previewSizer:{minHeight:600,width:"100%"},row:{flexDirection:"row",justifyContent:"flex-end"},footer:{alignItems:"center",flexDirection:"row",justifyContent:"space-between",width:"100%"}});var L,P,M;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <OnePaneDialog {...args} />
            </View>
        </View>,
  args: {
    content: <Body>
                {\`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.\`}
            </Body>,
    title: "Some title"
  }
}`,...(M=(P=x.parameters)==null?void 0:P.docs)==null?void 0:M.source}}};var k,C,E;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`() => <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog title="Hello, world! Here is an example of a long title that wraps to the next line." content={<Body>
                        {\`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.\`}
                    </Body>} />
        </View>
    </View>`,...(E=(C=c.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var T,I,O;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`() => <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog title="Hello, world!" content={<Body>
                        {\`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.\`}
                    </Body>} footer={<View style={styles.footer}>
                        <LabelLarge>Step 1 of 4</LabelLarge>
                        <View style={styles.row}>
                            <Button kind="tertiary">Previous</Button>
                            <Strut size={16} />
                            <Button kind="primary">Next</Button>
                        </View>
                    </View>} />
        </View>
    </View>`,...(O=(I=m.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var U,z,W;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`() => <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog title="Hello, world!" content={<Body>
                        {\`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.\`}
                    </Body>} subtitle={"Subtitle that provides additional context to the title"} />
        </View>
    </View>`,...(W=(z=p.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};var N,H,R;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`() => <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog title="Hello, world!" content={<Body>
                        {\`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.\`}
                    </Body>} breadcrumbs={<Breadcrumbs>
                        <BreadcrumbsItem>
                            <Link href="">Course</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>
                            <Link href="">Unit</Link>
                        </BreadcrumbsItem>
                        <BreadcrumbsItem>Lesson</BreadcrumbsItem>
                    </Breadcrumbs>} />
        </View>
    </View>`,...(R=(H=h.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};var j,A,Q;y.parameters={...y.parameters,docs:{...(j=y.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const aboveStyle = ({
    background: "url(./modal-above.png)",
    width: 874,
    height: 551,
    position: "absolute",
    top: 40,
    left: -140
  } as const);
  const belowStyle = ({
    background: "url(./modal-below.png)",
    width: 868,
    height: 521,
    position: "absolute",
    top: -100,
    left: -300
  } as const);
  return <View style={styles.previewSizer}>
            <View style={styles.modalPositioner}>
                <OnePaneDialog title="Single-line title" content={<View>
                            <Body>
                                {\`Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id
                            est.\`}
                            </Body>
                            <br />
                            <Body>
                                {\`Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id
                            est.\`}
                            </Body>
                            <br />
                            <Body>
                                {\`Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id
                            est.\`}
                            </Body>
                        </View>} above={<View style={aboveStyle} />} below={<View style={belowStyle} />} />
            </View>
        </View>;
}`,...(Q=(A=y.parameters)==null?void 0:A.docs)==null?void 0:Q.source}}};var F,_,G;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`() => <View style={styles.previewSizer}>
        <View style={styles.modalPositioner}>
            <OnePaneDialog title="Hello, world!" content={<Body>
                        {\`Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est.\`}
                    </Body>} style={{
      color: Color.blue,
      maxWidth: 1000
    }} />
        </View>
    </View>`,...(G=(_=g.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var J,K,X;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const styles = StyleSheet.create({
    example: {
      padding: Spacing.xLarge_32,
      alignItems: "center"
    },
    row: {
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    footer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%"
    }
  });
  type ExerciseModalProps = {
    current: number;
    handleNextButton: () => unknown;
    handlePrevButton: () => unknown;
    question: string;
    total: number;
  };
  const ExerciseModal = function (props: ExerciseModalProps): React.ReactElement {
    const {
      current,
      handleNextButton,
      handlePrevButton,
      question,
      total
    } = props;
    return <OnePaneDialog title="Exercises" content={<View>
                        <Body>This is the current question: {question}</Body>
                    </View>} footer={<View style={styles.footer}>
                        <LabelLarge>
                            Step {current + 1} of {total}
                        </LabelLarge>
                        <View style={styles.row}>
                            <Button kind="tertiary" onClick={handlePrevButton}>
                                Previous
                            </Button>
                            <Strut size={16} />
                            <Button kind="primary" onClick={handleNextButton}>
                                Next
                            </Button>
                        </View>
                    </View>} />;
  };
  type ExerciseContainerProps = {
    questions: Array<string>;
  };
  const ExerciseContainer = function (props: ExerciseContainerProps): React.ReactElement {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const handleNextButton = () => {
      setCurrentQuestion(Math.min(currentQuestion + 1, props.questions.length - 1));
    };
    const handlePrevButton = () => {
      setCurrentQuestion(Math.max(0, currentQuestion - 1));
    };
    return <ModalLauncher modal={<ExerciseModal question={props.questions[currentQuestion]} current={currentQuestion} total={props.questions.length} handlePrevButton={handlePrevButton} handleNextButton={handleNextButton} />}>
                {({
        openModal
      }) => <Button onClick={openModal}>Open flexible modal</Button>}
            </ModalLauncher>;
  };
  return <View style={styles.example}>
            <ExerciseContainer questions={["First question", "Second question", "Last question"]} />
        </View>;
}`,...(X=(K=b.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var Y,Z,$;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`() => {
  type MyModalProps = {
    closeModal: () => void;
  };
  const MyModal = ({
    closeModal
  }: MyModalProps): React.ReactElement => <OnePaneDialog title="Single-line title" content={<Body>
                    {\`Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id
                    est.\`}
                </Body>} footer={<Button onClick={closeModal}>Close</Button>} />;
  return <ModalLauncher modal={MyModal}>
            {({
      openModal
    }) => <Button onClick={openModal}>Click me to open the modal</Button>}
        </ModalLauncher>;
}`,...($=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const Ie=["Default","Simple","WithFooter","WithSubtitle","WithBreadcrumbs","WithAboveAndBelow","WithStyle","FlexibleModal","WithLauncher"];export{x as Default,b as FlexibleModal,c as Simple,y as WithAboveAndBelow,h as WithBreadcrumbs,m as WithFooter,f as WithLauncher,g as WithStyle,p as WithSubtitle,Ie as __namedExportsOrder,Te as default};
//# sourceMappingURL=one-pane-dialog.stories-c38c006e.js.map
