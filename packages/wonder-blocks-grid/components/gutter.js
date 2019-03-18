// @flow
import * as React from "react";
import {
    MediaLayout,
    Strut,
    queryMatchesSize,
} from "@khanacademy/wonder-blocks-layout";
import type {MediaQuery} from "@khanacademy/wonder-blocks-layout";

type Props = {|
    /**
     * Which media should this cell be renderer on.  Defaults to all.
     */
    mediaQuery: MediaQuery,
|};

/**
 * Gutter is a component whose width is set based on the size of grid currently
 * being displayed. Used for spacing out cells from each other. The gutter
 * itself doesn't hold any content, it just spaces it out.
 *
 * Gutters are inserted automatically inside of a [Row](#row) in-between Cells.
 * You may only need to use Gutters if you're manually building your own
 * sub-grid, or some-such (this should be relatively rare).
 *
 * By default (with no properties specified) it will display at all
 * grid sizes. If you specify the `small`, `medium`, or `large`
 * props then the component will only be shown at those grid sizes.
 */
export default class Gutter extends React.Component<Props> {
    static defaultProps = {
        mediaQuery: "all",
    };

    render() {
        return (
            <MediaLayout>
                {({mediaSize, mediaSpec}) => {
                    const {gutterWidth} = mediaSpec[mediaSize];

                    if (!queryMatchesSize(this.props.mediaQuery, mediaSize)) {
                        return null;
                    }

                    return <Strut size={gutterWidth} />;
                }}
            </MediaLayout>
        );
    }
}
