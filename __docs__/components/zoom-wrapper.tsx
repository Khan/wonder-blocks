import * as React from "react";

type Props = {
    children: React.ReactElement | React.ReactElement[];
    /**
     * The [zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom) level.
     * Defaults to 400%.
     */
    zoom?: string;
};

/**
 * Simulates browser zoom for stories. Note: It is still important to test with
 * real browser zoom in different browsers. For example, using the CSS zoom
 * property in Safari looks a bit different than when you zoom.
 */
export const ZoomWrapper = (props: Props) => {
    const {zoom = "400%", children} = props;

    return <div style={{zoom}}>{children}</div>;
};
