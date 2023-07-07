import * as React from "react";
import {compose} from "mu-lambda";
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";

import type {WithActionSchedulerProps} from "@khanacademy/wonder-blocks-timing";

// sync-start:with-interacted-recently 1436197118 services/static/javascript/app-shell-package/with-interacted-recently.js
// A user is considered to be interactive if they performed an action within
// the time specified here (in milliseconds) (10 minutes).
const USER_INTERACTION_TIMEOUT = 10 * 60 * 1000;

type Props = {
    children: (props: WithInteractedRecentlyProps) => React.ReactNode;
} & WithInteractedRecentlyArgs &
    WithActionSchedulerProps;

type DefaultProps = {
    timeout: Props["timeout"];
};

type State = {
    hasInteractedRecently: boolean;
};

class InternalInteractedRecently extends React.Component<Props, State> {
    LAST_USER_INTERACTION: number;

    static defaultProps: DefaultProps = {
        timeout: USER_INTERACTION_TIMEOUT,
    };

    state: State = {
        hasInteractedRecently: true,
    };

    componentDidMount() {
        // Initialize time and data for later comparison
        this.LAST_USER_INTERACTION = Date.now();

        // Start a timer to go through and check if the user has interacted
        // recently. This should be a very cheap check (only comparing numbers,
        // not reading any browser/DOM APIs)
        const {schedule} = this.props;
        schedule.interval(this.hasInteractedRecently, 1000);

        // Track interactions from the user, uses the same logic that's
        // used to detect learning time.
        // sync-start:user-interaction 96695875 services/static/javascript/shared-package/learning-time/heartbeat.js
        document.addEventListener("mousemove", this.trackUserInteraction);
        document.addEventListener("scroll", this.trackUserInteraction, true);
        document.addEventListener(
            "visibilitychange",
            this.trackUserInteraction,
        );
        // sync-end:user-interaction
    }

    componentWillUnmount() {
        // Remove the listeners on unmount
        document.removeEventListener("mousemove", this.trackUserInteraction);
        document.removeEventListener("scroll", this.trackUserInteraction, true);
        document.removeEventListener(
            "visibilitychange",
            this.trackUserInteraction,
        );
    }

    /**
     * Determines if a user has interacted with the page recently and sets the
     * internal state if the user's interaction state has changed.
     *
     * We implement this by tracking various user interaction indicators (see
     * componentWillMount/componentWillUnmount) and then comparing the last
     * time this change happened, plus an offset, with now.
     */
    hasInteractedRecently = () => {
        const {timeout} = this.props;
        const {hasInteractedRecently: lastHasInteractedRecently} = this.state;
        const hasInteractedRecently =
            this.LAST_USER_INTERACTION + (timeout ?? 0) >= Date.now();

        if (lastHasInteractedRecently !== hasInteractedRecently) {
            this.setState({hasInteractedRecently});
        }
    };

    /**
     * Track user interactions collecting the timestamp of when they happened.
     * This is used by the listeners in componentWillMount/componentWillUnmount
     * to keep track of when the last user interaction was.
     */
    trackUserInteraction = () => {
        this.LAST_USER_INTERACTION = Date.now();
    };

    render(): React.ReactNode {
        const {hasInteractedRecently} = this.state;
        return this.props.children({hasInteractedRecently});
    }
}

const InteractedRecently = compose(withActionScheduler)(
    InternalInteractedRecently,
);

/**
 * The HOC to check if a user has interacted with the page recently.
 *
 * This HOC checks a few events which correspond with the events used to track
 * learning time. Using this HOC will ensure that your concept of "user
 * interaction" matches our internal representations, as well.
 *
 * Examples:
 * - export default withInteractedRecently()(WrappedComponent);
 * - export default compose(
 *      withInteractedRecently(),
 *      withRouter
 *   )(WrappedComponent);
 */
export type WithInteractedRecentlyProps = {
    // If the user has interacted with the page recently
    hasInteractedRecently: boolean;
};

export type WithoutInteractedRecently<T> = Omit<
    T,
    keyof WithInteractedRecentlyProps
>;

type WithInteractedRecentlyArgs = {
    // A timeout to use to override the default (10 minutes)
    timeout?: number;
};

// Context added for fixture testing
export const InteractedRecentlyContext: React.Context<WithInteractedRecentlyProps | null> =
    React.createContext<WithInteractedRecentlyProps | null>(null);
InteractedRecentlyContext.displayName = "InteractedRecentlyContext";

const withInteractedRecently =
    (args?: WithInteractedRecentlyArgs) =>
    <
        C extends React.ComponentType<
            React.ComponentProps<C> & WithInteractedRecentlyProps
        > & {
            displayName?: string | undefined;
        },
        OuterProps = Omit<
            JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
            keyof WithInteractedRecentlyProps
        >,
    >(
        WrappedComponent: C,
    ): React.ComponentType<OuterProps> => {
        // We return a class instead of a functional component since refs can't
        // be used with functional components.
        return (props: OuterProps) => (
            <InteractedRecentlyContext.Consumer>
                {(mockContext: WithInteractedRecentlyProps | null) => {
                    if (mockContext) {
                        return (
                            <WrappedComponent
                                {...(props as any)}
                                hasInteractedRecently={
                                    mockContext.hasInteractedRecently
                                }
                            />
                        );
                    }

                    return (
                        <InteractedRecently
                            timeout={args ? args.timeout : undefined}
                        >
                            {({
                                hasInteractedRecently,
                            }: WithInteractedRecentlyProps) => (
                                <WrappedComponent
                                    {...(props as any)}
                                    hasInteractedRecently={
                                        hasInteractedRecently
                                    }
                                />
                            )}
                        </InteractedRecently>
                    );
                }}
            </InteractedRecentlyContext.Consumer>
        );
    };

export default withInteractedRecently;
