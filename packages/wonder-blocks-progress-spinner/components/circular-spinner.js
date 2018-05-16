// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View, addStyle} from "wonder-blocks-core";
import Color from "wonder-blocks-color";

const heights = {
    xsmall: 16,
    small: 24,
    medium: 48,
    large: 96,
};

const paths = {
    xsmall:
        "M6.7.389c.103.496-.4.636-.4.636-3 .81-5.3 3.541-5.3 6.88 0 3.946 3.1 7.083 7 7.083s6.91-3.138 7-7.083c0 0 .055-.485.516-.485.46 0 .484.485.484.485C16 12.347 12.4 16 8 16s-8-3.643-8-8.095C0 4.161 2.6.924 6.1.013c0 0 .496-.12.6.376z",
    small:
        "M10.598.943c-.093-.449-.362-.748-.732-.875a1.314 1.314 0 0 0-.723-.033C3.83 1.417 0 6.317 0 11.864 0 18.538 5.398 24 12 24c6.598 0 12-5.471 12-12.16a1.333 1.333 0 0 0-.154-.548c-.193-.368-.544-.606-1.023-.606-.472 0-.825.229-1.035.585-.117.2-.169.39-.189.582-.124 5.472-4.294 9.73-9.599 9.73-5.349 0-9.599-4.3-9.599-9.72 0-4.46 3.036-8.299 7.28-9.444.127-.036.291-.107.458-.232.373-.28.57-.711.46-1.244z",
    medium:
        "M20.099 1.166c.309 1.49-1.199 1.908-1.199 1.908C9.9 5.503 3 13.7 3 23.716c0 11.838 9.3 21.248 21 21.248s20.731-9.413 21-21.248c0 0 .166-1.455 1.547-1.455 1.382 0 1.453 1.455 1.453 1.455C48 37.04 37.2 48 24 48S0 37.072 0 23.716C0 12.484 7.8 2.77 18.3.039c0 0 1.49-.362 1.799 1.127z",
    large:
        "M40.198 2.332c.618 2.979-2.398 3.816-2.398 3.816C19.8 11.005 6 27.398 6 47.432c0 23.677 18.6 42.497 42 42.497s41.462-18.826 42-42.497c0 0 .332-2.91 3.095-2.91 2.763 0 2.905 2.91 2.905 2.91C96 74.082 74.4 96 48 96S0 74.144 0 47.432C0 24.969 15.6 5.542 36.6.077c0 0 2.979-.723 3.598 2.255z",
};

const colors = {
    light: Color.white,
    dark: Color.offBlack16,
};

const StyledSVG = addStyle("svg");
const StyledPath = addStyle("path");

const svgs = {
    light: {},
    dark: {},
};

const _generateSVG = (size, light) => {
    const svgCache = svgs[light];

    if (svgCache[size]) {
        return svgCache[size];
    }

    const height = heights[size];
    const path = paths[size];
    const color = colors[light];

    const svg = (
        <StyledSVG
            xmlns="http://www.w3.org/2000/svg"
            width={height}
            height={height}
            viewBox={`0 0 ${height} ${height}`}
            style={styles.loadingSpinner}
        >
            <StyledPath style={{fill: color}} fill-rule="nonzero" d={path} />
        </StyledSVG>
    );

    svgCache[size] = svg;
    return svg;
};

type Props = {
    /**
     * The size of the spinner. (large = 96px, medium = 48px, small = 24px,
     * xsmall = 16px)
     */
    size: "xsmall" | "small" | "medium" | "large",
    /** Should a light version of the spinner be shown?
     * (To be used on a dark background.)
     */
    light: boolean,
    /** Any (optional) styling to apply to the spinner container. */
    style?: any,
};

/**
 * A circular progress spinner. Used for indicating loading progress. Should
 * be used by default in most places where a loading indicator is needed.
 */
export default class CircularSpinner extends React.Component<Props> {
    static defaultProps = {
        size: "large",
        light: false,
    };

    render() {
        const {size, light, style} = this.props;
        const svg = _generateSVG(size, light ? "light" : "dark");

        return <View style={[styles.spinnerContainer, style]}>{svg}</View>;
    }
}

const rotateKeyFrames = {
    "0%": {
        transform: "rotate(0deg)",
    },
    "50%": {
        transform: "rotate(180deg)",
    },
    "100%": {
        transform: "rotate(360deg)",
    },
};

const styles = StyleSheet.create({
    spinnerContainer: {
        justifyContent: "center",
    },
    loadingSpinner: {
        animationName: rotateKeyFrames,
        animationDuration: "1.1s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
    },
});
