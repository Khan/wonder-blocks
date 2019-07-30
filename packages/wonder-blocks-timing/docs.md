Abstractions for common timing APIs like `setTimeout`, `setInterval` and
`requestAnimationFrame` that are aware of React component lifecycles, ensuring
that scheduled timer actions are not unexpectedly dangling after a component
unmounts.

Access to the timing API is provided via the `withActionScheduler` higher order
component.

### Timing API Usage Example

The following component, `MyNaughtyComponent`, will keep spamming our pretend
log even after it was unmounted.

```jsx
import Button from "@khanacademy/wonder-blocks-button";
import {IDProvider, View} from "@khanacademy/wonder-blocks-core";

class Unmounter extends React.Component {
    constructor() {
        super();
        this.state = {
            mountKids: true,
        };
    }

    maybeRenderKids() {
        if (this.state.mountKids) {
            return (
                <React.Fragment>
                    <Button onClick={() => this.onClick()}>Unmount</Button>
                    {this.props.children}
                </React.Fragment>
            );
        } else {
            return "Children unmounted";
        }
    }

    onClick() {
        this.setState({mountKids: false});
    }

    render() {
        return (
            <View>
                {this.maybeRenderKids()}
            </View>
        );
    }
}

class MyNaughtyComponent extends React.Component {
    componentDidMount() {
        const {targetId} = this.props;
        let counter = 0;
        const domElement = document.getElementById(targetId);
        setInterval(() => {
            domElement.innerText = "Naughty interval logged: " + counter++;
        }, 200);
    }

    render() {
        return <View>NaughtyComponent here</View>;
    }
}


<IDProvider>
    {id => (
        <View>
            <Unmounter>
                <MyNaughtyComponent targetId={id} />
            </Unmounter>
            <View>
                <View id={id}></View>
            </View>
        </View>
    )}
</IDProvider>
```

But if we use `withActionScheduler` and the `interval` method, everything is
just fine. Unmount the component, and the logging stops.

```jsx
import {withActionScheduler} from "@khanacademy/wonder-blocks-timing";
import Button from "@khanacademy/wonder-blocks-button";
import {IDProvider, View} from "@khanacademy/wonder-blocks-core";

class Unmounter extends React.Component {
    constructor() {
        super();
        this.state = {
            mountKids: true,
        };
    }

    maybeRenderKids() {
        if (this.state.mountKids) {
            return (
                <React.Fragment>
                    <Button onClick={() => this.onClick()}>Unmount</Button>
                    {this.props.children}
                </React.Fragment>
            );
        } else {
            return "Children unmounted";
        }
    }

    onClick() {
        this.setState({mountKids: false});
    }

    render() {
        return (
            <View>
                {this.maybeRenderKids()}
            </View>
        );
    }
}

class MyGoodComponent extends React.Component {
    componentDidMount() {
        const {targetId, schedule} = this.props;
        let counter = 0;
        const domElement = document.getElementById(targetId);
        schedule.interval(() => {
            domElement.innerText = "Naughty interval logged: " + counter++;
        }, 200);
    }

    render() {
        return <View>GoodComponent here</View>;
    }
}

const MyGoodComponentWithScheduler = withActionScheduler(MyGoodComponent);

<IDProvider>
    {id => (
        <View>
            <Unmounter>
                <MyGoodComponentWithScheduler targetId={id} />
            </Unmounter>
            <View>
                <View id={id}></View>
            </View>
        </View>
    )}
</IDProvider>
```

<!-- Styleguidist doesn't support the extended syntax for custom header IDs.
     If that ever changes, this should be:
         `### API Overiview {#timing-api-overview}`
-->
<h3 id="timing-api-overview">API Overview</h3>

#### IScheduleActions

The `IScheduleActions` interface provides 4 (four) different functions:

* [`timeout`](#timeout)
* [`interval`](#interval)
* [`animationFrame`](#animationframe)
* [`clearAll`](#clearall)

##### timeout

```js static
    timeout(
        action: () => mixed,
        period: number,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): ITimeout;
```

The `timeout` function replaces the `setTimeout` and `clearTimeout` functions
in the standard timer API.

| | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `()`&nbsp;`=>`&nbsp;`void` | _Required_ | The action to be invoked when the timeout period is reached. |
| `period` | `number` | _Required_ | The timeout period in milliseconds. The action will be invoked after this period has passed since the timeout was set. This value must be greater than or equal to zero. |
| `autoSchedule` | `boolean` | `true` | Whether or not to set the timeout as soon as this call is made, or wait until `set` is explicitly called. Defaults to `true`. |
| `resolveOnClear` | `boolean` | `false` | Whether or not the associated action will be invoked if it is still pending at the point the timeout is cleared. Defaults to `false`. This only takes effect when the [clearAll](#clearall) is invoked on parent the `IScheduleActions` instance, such as when unmounting; this does not affect calls to the `clear` method on the returned `ITimeout` interface. |
| _returns_ | [`ITimeout`](#itimeout) | | An interface for manipulating the created timeout. |

##### interval

```js static
    interval(
        action: () => mixed,
        period: number,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): IInterval;
```

The `interval` function replaces the `setInterval` and `clearInterval` functions
in the standard timer API.

| | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `()`&nbsp;`=>`&nbsp;`void` | _Required_ | The action to be invoked when the interval period occurs. |
| `period` | `number` | _Required_ | The interval period in milliseconds. The action will be invoked each time this period has passed since the interval was set or last occurred. This value must be greater than zero. |
| `autoSchedule` | `boolean` | `true` | Whether or not to set the interval as soon as this call is made, or wait until `set` is explicitly called. Defaults to `true`. |
| `resolveOnClear` | `boolean` | `false` |  Whether or not the associated action will be invoked at the point the interval is cleared if the interval is running at that time. Defaults to `false`. This only takes effect when the [clearAll](#clearall) is invoked on parent the `IScheduleActions` instance, such as when unmounting; this does not affect calls to the `clear` method on the returned `IInterval` interface. |
| _returns_ | [`IInterval`](#iinterval) | | An interface for manipulating the created interval. |

##### animationFrame

```js static
    animationFrame(
        action: () => void,
        autoSchedule?: boolean,
        resolveOnClear?: boolean,
    ): IAnimationFrame;
```

The `animationFrame` function replaces the `requestAnimationFrame` and `cancelAnimationFrame` functions
in the standard timer API.

| | Flow&nbsp;Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `()`&nbsp;`=>`&nbsp;`void` | _Required_ | The action to be invoked before the repaint. |
| `autoSchedule` | `boolean` | `true` | Whether or not to make the request as soon as this call is made, or wait until `set` is explicitly called. Defaults to `true`. |
| `resolveOnClear` | `boolean` | `false` |  Whether or not the associated action will be invoked at the point the request is cleared if it has not yet executed. Defaults to `false`. This only takes effect when the [clearAll](#clearall) is invoked on parent the `IScheduleActions` instance, such as when unmounting; this does not affect calls to the `clear` method on the returned `IAnimationFrame` interface. |
| _returns_ | [`IAnimationFrame`](#ianimationframe) | | An interface for manipulating the created request. |

##### clearAll

```js static
    clearAll(): void;
```

Clears all timeouts, intervals, and animation frame requests that were made with this scheduler.

#### Types

##### ITimeout

```js static
interface ITimeout {
    get isSet(): boolean;
    set(): void;
    clear(resolve?: boolean): void;
}
```

The `ITimeout` interface provides additional calls to manipulate a timeout, if so required.

| | Flow&nbsp;Type | Description |
| --- | --- | --- |
| `isSet` | `boolean` | A read-only property for determining if the timeout is set or not. Returns `true` if the timeout is set (aka pending), otherwise `false`. |
| `set` | `()`&nbsp;`=>`&nbsp;`void` | If the timeout is pending, this cancels that pending timeout and starts the timeout afresh. If the timeout is not pending, this starts the timeout. Can be used to re-schedule an already invoked or cleared timeout. |
| `clear` | `(resolve?:`&nbsp;`boolean)`&nbsp;`=>`&nbsp;`void` | If the timeout is pending, this cancels that pending timeout. If no timeout is pending, this does nothing. When the optional `resolve` argument is `true`, and the timeout was in the set state when called, the timeout action is invoked after cancelling the timeout. The `resolve` parameter defaults to `false`. This call does nothing if there was no pending timeout (i.e. when `isSet` is `false`). |

##### IInterval

```js static
interface IInterval {
    get isSet(): boolean;
    set(): void;
    clear(resolve?: boolean): void;
}
```

The `IInterval` interface provides additional calls to manipulate an interval, if so required.

| | Flow&nbsp;Type | Description |
| --- | --- | --- |
| `isSet` | `boolean` | A read-only property for determining if the interval is active or not. Returns `true` if the interval is active, otherwise `false`. |
| `set` | `()`&nbsp;`=>`&nbsp;`void` | If the interval is active, this cancels that interval and restarts it afresh. If the interval is not active, this starts the interval. Can be used to re-schedule a cleared interval. |
| `clear` | `(resolve?:`&nbsp;`boolean)`&nbsp;`=>`&nbsp;`void` | If the interval is active, this cancels that interval. If the interval is not active, this does nothing. When the optional `resolve` argument is `true`, and the interval was in the active state when called, the associated action is invoked after cancelling the interval. The `resolve` parameter defaults to `false`. This call does nothing if there was no pending interval (i.e. when `isSet` is `false`). |

##### IAnimationFrame

```js static
interface IAnimationFrame {
    get isSet(): boolean;
    set(): void;
    clear(resolve?: boolean): void;
}
```

The `IAnimationFrame` interface provides additional calls to manipulate an animation frame request, if so required.

| | Flow&nbsp;Type | Description |
| --- | --- | --- |
| `isSet` | `boolean` | A read-only property for determining if the request is set (aka pending). Returns `true` if the animation frame is set, otherwise `false`. |
| `set` | `()`&nbsp;`=>`&nbsp;`void` | If the request is pending, this cancels that pending request and starts a request afresh. If the request is not pending, this starts the request. Can be used to re-request an already invokd or cleared request. |
| `clear` | `(resolve?:`&nbsp;`boolean)`&nbsp;`=>`&nbsp;`void` | If the request is pending, this cancels that pending request. If no request is pending, this does nothing. When the optional `resolve` argument is `true`, and the request was in the active state when called, the associated action is invoked after cancelling the request. The `resolve` parameter defaults to `false`. This call does nothing if there was no pending request (i.e. when `isSet` is `false`). |

### Migration from standard API

Migrating from the standard API is as simple as:

1. Wrapping your component with the `withActionScheduler` HOC (and, if using Flow, using the `WithActionScheduler<TOwnProps>` type to extend your components props)
2. Using the new `schedule` prop in your component instead of `setTimeout`, `setInterval` and `requestAnimationFrame`

#### Migration Example

Let's imagine we have a component that uses `setTimeout` like this:

```js static
type Props = {||};

type State = {
    timerFired: boolean,
}

class MyLegacyComponent extends React.Component<Props, State> {
    _timeoutID: TimeoutID;

    state = {
        timerFired: false;
    };

    componentDidMount() {
        this.timeoutID = setTimeout(
            () => this.setState({timerFired: true}),
            2000,
        );
    }

    componentWillUnmount() {
        /* 0 is a valid ID for a timeout */
        if (this.timeoutID != null) {
            clearTimeout(this.timeoutID);
        }
    }

    renderState() {
        const {timerFired} = this.state;
        if (timerFired) {
            return "...fired!";
        }
        return "pending...";
    }

    render() {
        return <View>Legacy Component {this.renderState()}</View>;
    }
}
```

We can rewrite it to use the Wonder Blocks Timing API like this:

```js static
/**
 * These are the props that consumers of your component will see.
 */
type OwnProps = {||};

/**
 * These are the props that your component actually uses. We use the
 * WithActionScheduler<TOwnProps> generic type to augment `OwnProps` with the
 * props injected by the withActionScheduler HOC.
 */
type Props = WithActionScheduler<OwnProps>;

type State = {
    timerFired: boolean,
}

class MyWonderBlocksComponentImpl extends React.Component<Props, State> {
    state = {
        timerFired: false;
    };

    componentDidMount() {
        const {schedule} = this.props;
        schedule.timeout(() => this.setState({timerFired: true}), 2000);
    }

    renderState() {
        const {timerFired} = this.state;
        if (timerFired) {
            return "...fired!";
        }
        return "pending...";
    }

    render() {
        return <View>Wonder Blocks Component {this.renderState()}</View>;
    }
}

/**
 * The component that you would export as a drop-in replacement for your
 * legacy component.
 */
const MyWonderBlocksComponent: React.AbstractComponent<
    OwnProps,
> = withActionScheduler(MyWonderBlocksComponentImpl);
```
