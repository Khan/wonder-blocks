Tooltips should be used to help describe an on screen object.

Tooltips:

- contain text
- may contain small graphic elements to complement the text
- do not include actions

For more rich content see Popovers, for taking action on an object, see Snackbars.

# START TEMPTEMPTEMP

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");
const {Tooltip} = require("@khanacademy/wonder-blocks-tooltip");
const {StandardModal, ModalLauncher} = require("@khanacademy/wonder-blocks-modal");

const tooltip = (
    <Tooltip content={"Some long text"}>
        Some text
    </Tooltip>
);

const scrollyContent = (
     <div style={{height: 100, overflow: "auto", border: "1px solid", margin: 10,}}>
        <div style={{height: "200vh"}}>
            {tooltip}
        </div>
     </div>
);

const modalContent = (
    <div style={{height: "200vh"}}>
        {scrollyContent}
    </div>
);

const modal = (
    <StandardModal
        title="My modal"
        footer="Still my modal"
        content={modalContent} />
);

<div>
    {tooltip}

    {scrollyContent}

    <ModalLauncher modal={modal}>
        {({openModal}) => <button onClick={openModal}>Click here!</button>}
    </ModalLauncher>
</div>


```

# END TEMPTEMPTEMP
