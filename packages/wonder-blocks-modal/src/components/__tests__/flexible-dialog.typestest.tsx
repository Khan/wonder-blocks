import * as React from "react";
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";
import FlexibleDialog from "../flexible-dialog";

// Using aria-label
<FlexibleDialog aria-label="A dialog" content={<p>Some text</p>} />;

// Using aria-labelledby
<FlexibleDialog
    aria-labelledby="heading1"
    content={<Heading id="heading1">Some text</Heading>}
/>;

// Using title string
<FlexibleDialog title="A title" content={<p>Some text</p>} />;

// Using title element
<FlexibleDialog title={<h2>A heading</h2>} content={<p>Some text</p>} />;

// Using title render prop
<FlexibleDialog
    title={<h2>A heading</h2>}
    content={({title}) => <div>{title}</div>}
/>;

// Using title render prop and strings with fragment
<FlexibleDialog title={"A heading"} content={({title}) => <>{title}</>} />;

// Using aria-label and string with fragment
<FlexibleDialog aria-label={"A heading"} content={<>Some text</>} />;

// Using titleId prop
<FlexibleDialog
    titleId="bert-reynolds"
    title={<h2>A heading</h2>}
    content={({title}) => <div>{title}</div>}
/>;

// Hiding close button
<FlexibleDialog
    title={<h2>A heading</h2>}
    closeButtonVisible={false}
    content={<p>Some text</p>}
/>;

// Using aria-describedby
<FlexibleDialog
    aria-labelledby="heading1"
    aria-describedby="content2"
    content={
        <>
            <Heading id="heading1">Some text</Heading>
            <BodyText id="content2">Some other text</BodyText>
        </>
    }
/>;

// Using styles object
<FlexibleDialog
    title={<h2>A heading</h2>}
    content={<p>Some text</p>}
    styles={{
        root: {background: "none"},
        panel: {height: "2px"},
        closeButton: {display: "flex"},
    }}
/>;

// Expected errors

// @ts-expect-error -- title, aria-label, or aria-labelledby are required
<FlexibleDialog content={<p>Some content</p>} />;

// @ts-expect-error -- content is required
<FlexibleDialog title="A thing" />;

// @ts-expect-error -- content cannot be a boolean value
<FlexibleDialog content={false} />;
