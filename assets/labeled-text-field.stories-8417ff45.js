import{a as n,j as L}from"./jsx-runtime-309e447d.js";import{r as l}from"./index-9f32f44c.js";import{V as C,l as Me}from"./render-state-root-891c0d56.js";import{c as Fe,L as Ne}from"./footnote-761d2bcc.js";import{S as R,C as V}from"./index-f641b98f.js";import{S as Ie}from"./strut-c6011196.js";import{B as qe}from"./button-b2794e32.js";import{L as He}from"./link-64b6fd31.js";import{L as s}from"./labeled-text-field-d77d5301.js";import{p as P}from"./package-55b6077d.js";import{C as Ae}from"./component-info-cedbe096.js";import"./_commonjsHelpers-de833af9.js";import"./clickable-8a7f284d.js";import"./inheritsLoose-9eefaa95.js";import"./index-8d47fad6.js";import"./icon-a4f17d53.js";import"./radio-0fc824b1.js";const Be={id:{description:`An optional unique identifier for the TextField.
        If no id is specified, a unique id will be auto-generated.`,table:{type:{summary:"string"}},control:{type:"text"}},type:{description:"Determines the type of input. Defaults to text. This may change the appearance or type of characters allowed.",table:{type:{summary:'"text" | "password" | "email" | "number" | "tel"'},defaultValue:{summary:"text"}},options:["text","password","email","number","tel"],control:{type:"select"}},label:{description:"Provide a label for the TextField.",type:{name:"string",required:!0},table:{type:{summary:"React.Node"}},control:{type:"text"}},description:{description:"Provide a description for the TextField.",table:{type:{summary:"React.Node"}},control:{type:"text"}},value:{description:"The input value.",type:{name:"string",required:!0},table:{type:{summary:"string"}},control:{type:"text"}},autoComplete:{description:"Specifies if the TextField allows autocomplete.",table:{type:{summary:"string",detail:'There is a large number of options, including "on", "off", "username", "current-password", and many others.'}},control:{type:"text"}},disabled:{description:"Makes a read-only input field that cannot be focused.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}},control:{type:"boolean"}},light:{description:"Change the field’s sub-components to fit a dark background.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}},control:{type:"boolean"}},placeholder:{description:"Provide hints or examples of what to enter.",table:{type:{summary:"string"}},control:{type:"text"}},required:{description:"Whether this field is required to to continue, or the error message to render if this field is left blank. Pass in a message instead of `true` if possible.",table:{type:{summary:"boolean | string",detail:"The string will not be used if a `validate` prop is passed in."}},control:{type:"boolean"}},readOnly:{description:"Specifies if the TextField is read-only.",table:{type:{summary:"boolean"}},control:{type:"boolean"}},style:{description:"Custom styles for the input.",table:{type:{summary:"StyleType"}}},testId:{description:"Optional test ID for e2e testing.",table:{type:{summary:"string"}},control:{type:"text"}},validate:{description:"Provide a validation for the input value. Return a string error message or null | void for a valid input.",table:{type:{summary:"(value: string) => ?string"}},control:{type:"null"}},ariaDescribedby:{description:"Identifies the element or elements that describes this text field.",table:{category:"Accessibility",type:{summary:"string | Array<string>"}},control:{type:"text"}},onValidate:{description:"Called when the TextField input is validated.",table:{category:"Events",type:{summary:"(errorMessage: ?string) => mixed"}}},onChange:{description:"Called when the value has changed. Use this in conjunction with the `value` prop to update the string rendered in the input field.",type:{name:"other",value:"(newValue: string) => mixed",required:!0},table:{category:"Events",type:{summary:"(newValue: string) => mixed"}}},onKeyDown:{action:"keyDown",description:"Called when a key is pressed.",table:{category:"Events",type:{summary:"(event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed"}}},onFocus:{action:"focus",description:"Called when the element has been focused.",table:{category:"Events",type:{summary:"(event: SyntheticFocusEvent<HTMLInputElement>) => mixed"}}},onBlur:{action:"blur",description:"Called when the element has been blurred.",table:{category:"Events",type:{summary:"(event: SyntheticFocusEvent<HTMLInputElement>) => mixed"}}}},ot={title:"Form / LabeledTextField",component:s,parameters:{componentSubtitle:n(Ae,{name:P.name,version:P.version})},argTypes:Be},k={args:{id:"some-ltf-id",type:"text",label:"Label",description:"Hello, this is the description for this field",value:"",disabled:!1,required:!1,light:!1,placeholder:"Placeholder",readOnly:!1,autoComplete:"off",validate:()=>{},onValidate:()=>{},onChange:()=>{},onKeyDown:()=>{},onFocus:()=>{},onBlur:()=>{}}},p=()=>{const[a,r]=l.useState("Khan");return n(s,{label:"Name",description:"Please enter your name",value:a,onChange:t=>r(t),placeholder:"Name",onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()}})};p.parameters={docs:{description:{story:"An input field with type `text` takes all kinds of characters."}}};const m=()=>{const[a,r]=l.useState("");return n(s,{label:"Name",description:"Please enter your name",value:a,onChange:r,onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()},required:!0})};m.parameters={docs:{description:{story:`A required field will show the message
        "This field is required." by default if someone types in it
        at some point but leaves it blank. Type in the field, then
        backspace all the way and click out of the field to see
        this message. Note that this message would not appear if
        the \`validation\` prop were set.`}},chromatic:{disableSnapshot:!0}};const h=()=>{const[a,r]=l.useState("");return n(s,{label:"Name",description:"Please enter your name",value:a,onChange:r,onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()},required:"This specific field is super required."})};h.parameters={docs:{description:{story:"If a string is passed into the `required` prop,\n        the specified message will show when the field is left blank.\n        Type in the field, then backspace all the way and click out of\n        the field to see this message. Note that this message would not\n        appear if the `validation` prop were set."}},chromatic:{disableSnapshot:!0}};const y=()=>{const[a,r]=l.useState("18");return n(s,{label:"Age",type:"number",description:"Please enter your age",value:a,onChange:r,placeholder:"Age",onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()}})};y.parameters={docs:{description:{story:"An input field with type `number` will only take numeric characters as input."}}};const b=()=>{const[a,r]=l.useState("$ecure123");return n(s,{label:"Password",type:"password",description:"Please enter a secure password",value:a,onChange:r,placeholder:"Password",validate:e=>{if(e.length<8)return"Password must be at least 8 characters long";if(!/\d/.test(e))return"Password must contain a numeric value"},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()}})};b.parameters={docs:{description:{story:`An input field with type \`password\` will
        obscure the input value. It also often contains validation.
        In this example, the password must be over 8 characters long and
        must contain a numeric value.`}}};const f=()=>{const[a,r]=l.useState("khan@khan.org");return n(s,{label:"Email",type:"email",value:a,onChange:r,description:"Please provide your personal email",placeholder:"Email",validate:e=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(e))return"Please enter a valid email"},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()}})};f.parameters={docs:{description:{story:"An input field with type `email` will automatically\n        validate an input on submit to ensure it's either formatted properly\n        or blank. `TextField` will run validation on blur if the\n        `validate` prop is passed in, as in this example."}}};const v=()=>{const[a,r]=l.useState("");return n(s,{label:"Email",type:"email",onChange:r,description:"Please provide your personal email",value:a,validate:e=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(e))return"Please enter a valid email"},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()},required:!0})};v.parameters={docs:{description:{story:"An example of a required field that also has\n        a `validation` prop passed in. `required` can be a boolean or\n        a string. In this case, `required` is set to `true` since a\n        string would not even be used if it were passed in because the\n        validation overrides it."}},chromatic:{disableSnapshot:!0}};const g=()=>{const[a,r]=l.useState("123-456-7890");return n(s,{label:"Telephone",type:"tel",value:a,onChange:r,description:"Please provide your personal phone number",placeholder:"Telephone",validate:e=>{if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e))return"Invalid US telephone number"},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()}})};g.parameters={docs:{description:{story:"An input field with type `tel` will NOT\n        validate an input on submit by default as telephone numbers\n        can vary considerably. `TextField` will run validation on blur\n        if the `validate` prop is passed in, as in this example."}}};const w=()=>{const[a,r]=l.useState("khan");return n(s,{label:"Email",type:"email",value:a,onChange:r,description:"Please provide your personal email",placeholder:"Email",validate:e=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(e))return"Please enter a valid email"},onKeyDown:e=>{e.key==="Enter"&&e.currentTarget.blur()}})};w.parameters={docs:{description:{story:"If an input value fails validation,\n        `TextField` will have error styling."}}};const u=a=>{const[r,o]=l.useState(""),t=e=>{e.key==="Enter"&&e.currentTarget.blur()};return n(C,{style:d.darkBackground,children:n(s,{...a,label:n(Fe,{style:d.whiteColor,children:"Name"}),description:n(Ne,{style:d.offWhiteColor,children:"Please enter your name"}),value:r,onChange:o,placeholder:"Name",light:!0,onKeyDown:t})})};u.args={disabled:!1};u.parameters={docs:{description:{story:"If the `light` prop is set to true, the\n        underlying `TextField` will have a light border when focused.\n        This is intended to be used on a dark background. There is also a\n        specific light styling for the error state, as seen in the\n        `ErrorLight` story."}}};const c=a=>{const[r,o]=l.useState("khan"),t=i=>{if(!/^[^@\s]+@[^@\s.]+\.[^@.\s]+$/.test(i))return"Please enter a valid email"},e=i=>{i.key==="Enter"&&i.currentTarget.blur()};return n(C,{style:d.darkBackground,children:n(s,{...a,label:n(Fe,{style:d.whiteColor,children:"Email"}),description:n(Ne,{style:d.offWhiteColor,children:"Please provide your personal email"}),type:"email",value:r,light:!0,onChange:o,placeholder:"Email",validate:t,onKeyDown:e})})};c.args={disabled:!1};c.parameters={docs:{description:{story:"If an input value fails validation and the\n        `light` prop is true, `TextField` will have light error styling."}}};const T=()=>n(s,{label:"Name",description:"Please enter your name",value:"",onChange:()=>{},placeholder:"Name",disabled:!0});T.parameters={docs:{description:{story:"If the `disabled` prop is set to true,\n        `TextField` will have disabled styling and will not be interactable."}}};const K=()=>{const[a,r]=l.useState(""),[o,t]=l.useState(""),e=i=>{i.key==="Enter"&&i.currentTarget.blur()};return L(C,{style:d.row,children:[n(s,{label:"First name",description:"Please enter your first name",value:a,onChange:r,placeholder:"Khan",style:d.grow,onKeyDown:e}),n(Ie,{size:R.xLarge_32}),n(s,{label:"Last name",description:"Please enter your last name",value:o,onChange:t,placeholder:"Academy",style:d.grow,onKeyDown:e})]})};K.parameters={docs:{description:{story:"`LabeledTextField` can take in custom styles that\n        override the default styles. In this example, each field has the\n        style property `flexGrow: 1`"}}};const x={render:a=>n(s,{...a,label:"Name",description:L("span",{children:["Description with ",n("strong",{children:"strong"})," text and a"," ",n(He,{href:"/path/to/resource",inline:!0,children:"link"})]})})};x.parameters={docs:{description:"`LabeledTextField`'s `label` and `description` props\n        can accept `React.Node`s.  This is helpful when you need to decorate or use\n        specific elements in your form field (e.g. including Popovers, Tooltips or\n        emphasized text)"}};const D=()=>{const[a,r]=l.useState("Khan"),o=l.createRef(),t=i=>{i.key==="Enter"&&i.currentTarget.blur()},e=()=>{o.current&&o.current.focus()};return L(C,{children:[n(s,{label:"Name",description:"Please enter your name",value:a,onChange:r,placeholder:"Name",onKeyDown:t,ref:o}),n(Ie,{size:R.medium_16}),n(qe,{style:d.button,onClick:e,children:"Focus Input"})]})};D.parameters={docs:{description:{story:"If you need to save a reference to the input\n        field, you can do so by using the `ref` prop. In this example,\n        we want the input field to receive focus when the button is\n        pressed. We can do this by creating a React ref of type\n        `HTMLInputElement` and passing it into `TextField`'s `ref` prop.\n        Now we can use the ref variable in the `handleSubmit` function to\n        shift focus to the field."},chromatic:{disableSnapshot:!0}}};const E=()=>{const[a,r]=l.useState("Khan");return n(s,{label:"Read Only",description:"This is a read-only field.",value:a,onChange:r,placeholder:"Name",onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()},readOnly:!0})};E.parameters={docs:{description:{story:`An input field with the prop \`readOnly\` set
        to true is not interactable. It looks the same as if it were not
        read only, and it can still receive focus, but the interaction
        point will not appear and the input will not change.`},chromatic:{disableSnapshot:!0}}};const S=()=>{const[a,r]=l.useState("");return L("form",{children:[n(s,{label:"Name",description:"Please enter your name.",value:a,onChange:r,placeholder:"Name",onKeyDown:t=>{t.key==="Enter"&&t.currentTarget.blur()},style:d.fieldWithButton,autoComplete:"name"}),n(qe,{type:"submit",children:"Submit"})]})};S.parameters={docs:{description:{story:`If \`TextField\`'s \`autocomplete\` prop is set,
        the browser can predict values for the input. When the user starts
        to type in the field, a list of options will show up based on
        values that may have been submitted at a previous time.
        In this example, the text field provides options after you
        input a value, press the submit button, and refresh the page.`},chromatic:{disableSnapshot:!0}}};const d=Me.StyleSheet.create({darkBackground:{background:V.darkBlue,padding:`${R.medium_16}px`},whiteColor:{color:V.white},offWhiteColor:{color:V.white64},button:{maxWidth:150},row:{flexDirection:"row"},grow:{flexGrow:1},fieldWithButton:{marginBottom:R.medium_16}});var F,N,I;k.parameters={...k.parameters,docs:{...(F=k.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    id: "some-ltf-id",
    type: "text",
    label: "Label",
    description: "Hello, this is the description for this field",
    value: "",
    disabled: false,
    required: false,
    light: false,
    placeholder: "Placeholder",
    readOnly: false,
    autoComplete: "off",
    validate: () => undefined,
    onValidate: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onFocus: () => {},
    onBlur: () => {}
  }
}`,...(I=(N=k.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var q,M,H;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("Khan");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Name" description="Please enter your name" value={value} onChange={newValue => setValue(newValue)} placeholder="Name" onKeyDown={handleKeyDown} />;
}`,...(H=(M=p.parameters)==null?void 0:M.docs)==null?void 0:H.source}}};var A,B,W;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Name" description="Please enter your name" value={value} onChange={setValue} onKeyDown={handleKeyDown} required={true} />;
}`,...(W=(B=m.parameters)==null?void 0:B.docs)==null?void 0:W.source}}};var O,$,_;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Name" description="Please enter your name" value={value} onChange={setValue} onKeyDown={handleKeyDown} required="This specific field is super required." />;
}`,...(_=($=h.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};var j,z,U;y.parameters={...y.parameters,docs:{...(j=y.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("18");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Age" type="number" description="Please enter your age" value={value} onChange={setValue} placeholder="Age" onKeyDown={handleKeyDown} />;
}`,...(U=(z=y.parameters)==null?void 0:z.docs)==null?void 0:U.source}}};var G,J,Q;b.parameters={...b.parameters,docs:{...(G=b.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("$ecure123");
  const validate = (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/\\d/.test(value)) {
      return "Password must contain a numeric value";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Password" type="password" description="Please enter a secure password" value={value} onChange={setValue} placeholder="Password" validate={validate} onKeyDown={handleKeyDown} />;
}`,...(Q=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("khan@khan.org");
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Email" type="email" value={value} onChange={setValue} description="Please provide your personal email" placeholder="Email" validate={validate} onKeyDown={handleKeyDown} />;
}`,...(Z=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,te,ae;v.parameters={...v.parameters,docs:{...(ee=v.parameters)==null?void 0:ee.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Email" type="email" onChange={setValue} description="Please provide your personal email" value={value} validate={validate} onKeyDown={handleKeyDown} required={true} />;
}`,...(ae=(te=v.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var ne,re,oe;g.parameters={...g.parameters,docs:{...(ne=g.parameters)==null?void 0:ne.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("123-456-7890");
  const validate = (value: string) => {
    const telRegex = /^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!telRegex.test(value)) {
      return "Invalid US telephone number";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Telephone" type="tel" value={value} onChange={setValue} description="Please provide your personal phone number" placeholder="Telephone" validate={validate} onKeyDown={handleKeyDown} />;
}`,...(oe=(re=g.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,le,ie;w.parameters={...w.parameters,docs:{...(se=w.parameters)==null?void 0:se.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("khan");
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Email" type="email" value={value} onChange={setValue} description="Please provide your personal email" placeholder="Email" validate={validate} onKeyDown={handleKeyDown} />;
}`,...(ie=(le=w.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var de,ue,ce;u.parameters={...u.parameters,docs:{...(de=u.parameters)==null?void 0:de.docs,source:{originalSource:`(args: any) => {
  const [value, setValue] = React.useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <View style={styles.darkBackground}>
            <LabeledTextField {...args} label={<LabelMedium style={styles.whiteColor}>Name</LabelMedium>} description={<LabelSmall style={styles.offWhiteColor}>
                        Please enter your name
                    </LabelSmall>} value={value} onChange={setValue} placeholder="Name" light={true} onKeyDown={handleKeyDown} />
        </View>;
}`,...(ce=(ue=u.parameters)==null?void 0:ue.docs)==null?void 0:ce.source}}};var pe,me,he;c.parameters={...c.parameters,docs:{...(pe=c.parameters)==null?void 0:pe.docs,source:{originalSource:`(args: any) => {
  const [value, setValue] = React.useState("khan");
  const validate = (value: string) => {
    const emailRegex = /^[^@\\s]+@[^@\\s.]+\\.[^@.\\s]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <View style={styles.darkBackground}>
            <LabeledTextField {...args} label={<LabelMedium style={styles.whiteColor}>Email</LabelMedium>} description={<LabelSmall style={styles.offWhiteColor}>
                        Please provide your personal email
                    </LabelSmall>} type="email" value={value} light={true} onChange={setValue} placeholder="Email" validate={validate} onKeyDown={handleKeyDown} />
        </View>;
}`,...(he=(me=c.parameters)==null?void 0:me.docs)==null?void 0:he.source}}};var ye,be,fe;T.parameters={...T.parameters,docs:{...(ye=T.parameters)==null?void 0:ye.docs,source:{originalSource:'() => <LabeledTextField label="Name" description="Please enter your name" value="" onChange={() => {}} placeholder="Name" disabled={true} />',...(fe=(be=T.parameters)==null?void 0:be.docs)==null?void 0:fe.source}}};var ve,ge,we;K.parameters={...K.parameters,docs:{...(ve=K.parameters)==null?void 0:ve.docs,source:{originalSource:`() => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <View style={styles.row}>
            <LabeledTextField label="First name" description="Please enter your first name" value={firstName} onChange={setFirstName} placeholder="Khan" style={styles.grow} onKeyDown={handleKeyDown} />
            <Strut size={Spacing.xLarge_32} />
            <LabeledTextField label="Last name" description="Please enter your last name" value={lastName} onChange={setLastName} placeholder="Academy" style={styles.grow} onKeyDown={handleKeyDown} />
        </View>;
}`,...(we=(ge=K.parameters)==null?void 0:ge.docs)==null?void 0:we.source}}};var Te,Ke,xe;x.parameters={...x.parameters,docs:{...(Te=x.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: args => {
    return <LabeledTextField {...args} label="Name" description={<span>
                        Description with <strong>strong</strong> text and a{" "}
                        <Link href="/path/to/resource" inline={true}>
                            link
                        </Link>
                    </span>} />;
  }
}`,...(xe=(Ke=x.parameters)==null?void 0:Ke.docs)==null?void 0:xe.source}}};var De,Ee,Se;D.parameters={...D.parameters,docs:{...(De=D.parameters)==null?void 0:De.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("Khan");
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  const handleSubmit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return <View>
            <LabeledTextField label="Name" description="Please enter your name" value={value} onChange={setValue} placeholder="Name" onKeyDown={handleKeyDown} ref={inputRef} />
            <Strut size={Spacing.medium_16} />
            <Button style={styles.button} onClick={handleSubmit}>
                Focus Input
            </Button>
        </View>;
}`,...(Se=(Ee=D.parameters)==null?void 0:Ee.docs)==null?void 0:Se.source}}};var ke,Re,Le;E.parameters={...E.parameters,docs:{...(ke=E.parameters)==null?void 0:ke.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("Khan");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <LabeledTextField label="Read Only" description="This is a read-only field." value={value} onChange={setValue} placeholder="Name" onKeyDown={handleKeyDown} readOnly={true} />;
}`,...(Le=(Re=E.parameters)==null?void 0:Re.docs)==null?void 0:Le.source}}};var Ce,Ve,Pe;S.parameters={...S.parameters,docs:{...(Ce=S.parameters)==null?void 0:Ce.docs,source:{originalSource:`() => {
  const [value, setValue] = React.useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };
  return <form>
            <LabeledTextField label="Name" description="Please enter your name." value={value} onChange={setValue} placeholder="Name" onKeyDown={handleKeyDown} style={styles.fieldWithButton} autoComplete="name" />
            <Button type="submit">Submit</Button>
        </form>;
}`,...(Pe=(Ve=S.parameters)==null?void 0:Ve.docs)==null?void 0:Pe.source}}};const st=["Default","Text","RequiredWithDefaultText","RequiredWithSpecifiedText","Number","Password","Email","EmailRequired","Telephone","Error","Light","ErrorLight","Disabled","CustomStyle","WithMarkup","Ref","ReadOnly","AutoComplete"];export{S as AutoComplete,K as CustomStyle,k as Default,T as Disabled,f as Email,v as EmailRequired,w as Error,c as ErrorLight,u as Light,y as Number,b as Password,E as ReadOnly,D as Ref,m as RequiredWithDefaultText,h as RequiredWithSpecifiedText,g as Telephone,p as Text,x as WithMarkup,st as __namedExportsOrder,ot as default};
//# sourceMappingURL=labeled-text-field.stories-8417ff45.js.map
