import * as React from "react";
import {describe, it} from "tstyche";
import {Heading, BodyText} from "@khanacademy/wonder-blocks-typography";

import FlexibleDialog from "../flexible-dialog";

describe("FlexibleDialog", () => {
    it("should accept aria-label", () => {
        <FlexibleDialog aria-label="A dialog" content={<p>Some text</p>} />;
    });

    it("should accept aria-labelledby", () => {
        <FlexibleDialog
            aria-labelledby="heading1"
            content={<Heading id="heading1">Some text</Heading>}
        />;
    });

    it("should accept a title string", () => {
        <FlexibleDialog title="A title" content={<p>Some text</p>} />;
    });

    it("should accept a title element", () => {
        <FlexibleDialog
            title={<h2>A heading</h2>}
            content={<p>Some text</p>}
        />;
    });

    it("should pass the title to the `content` render prop", () => {
        <FlexibleDialog
            title={<h2>A heading</h2>}
            content={({title}) => <div>{title}</div>}
        />;
    });

    it("should accept a `content` render prop that returns a fragment", () => {
        <FlexibleDialog
            title={"A heading"}
            content={({title}) => <>{title}</>}
        />;
    });

    it("should accept aria-label with a `content` fragment", () => {
        <FlexibleDialog aria-label={"A heading"} content={<>Some text</>} />;
    });

    it("should accept a titleId prop", () => {
        <FlexibleDialog
            titleId="bert-reynolds"
            title={<h2>A heading</h2>}
            content={({title}) => <div>{title}</div>}
        />;
    });

    it("should accept closeButtonVisible={false}", () => {
        <FlexibleDialog
            title={<h2>A heading</h2>}
            closeButtonVisible={false}
            content={<p>Some text</p>}
        />;
    });

    it("should accept aria-describedby", () => {
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
    });

    it("should accept a styles object", () => {
        <FlexibleDialog
            title={<h2>A heading</h2>}
            content={<p>Some text</p>}
            styles={{
                root: {background: "none"},
                panel: {height: "2px"},
                closeButton: {display: "flex"},
            }}
        />;
    });

    it("should reject missing aria label props", () => {
        // @ts-expect-error Property '"aria-labelledby"' is missing
        <FlexibleDialog content={<p>Some content</p>} />;
    });

    it("should reject missing content prop", () => {
        // @ts-expect-error Property 'content' is missing
        <FlexibleDialog title="A thing" />;
    });

    it("should reject boolean content", () => {
        // @ts-expect-error Type 'boolean' is not assignable
        <FlexibleDialog content={false} />;
    });
});
