import React from "react";

type Props = {
    children: React.ReactElement | React.ReactElement[];
    /**
     * The [zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom) level.
     * Defaults to 400%.
     */
    zoom?: string;
};

/**
 * Simulates browser zoom for stories
 */
export const ZoomWrapper = (props: Props) => {
    const {zoom = "400%", children} = props;

    return <div style={{zoom}}>{children}</div>;
};
