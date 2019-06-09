This is a higher order component that attaches the given component to an
`IScheduleActions` instance. Any actions scheduled will automatically be
cleared on unmount. This allows for "set it and forget it" behavior that won't
leave timers dangling when the component's lifecycle ends.

For example, the following component, `MyNaughtyComponent`, will keep spamming
our pretend log even after it was unmounted.

```jsx
const Button = require("@khanacademy/wonder-blocks-button").default;
const {IDProvider} = require("@khanacademy/wonder-blocks-core");


class Unmounter extends React.Component {
    constructor() {
        this.state = {
            mountKids: true,
        };
    }

    maybeRenderKids() {
        if (this.state.mountKids) {
            return (
                <_>
                    <Button onClick={() => this.onClick()}>Unmount</Button>
                    {this.props.children}
                </_>
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
const {withActionScheduler} = require("@khanacademy/wonder-blocks-timing");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {IDProvider} = require("@khanacademy/wonder-blocks-core");


class Unmounter extends React.Component {
    constructor() {
        this.state = {
            mountKids: true,
        };
    }

    maybeRenderKids() {
        if (this.state.mountKids) {
            return (
                <_>
                    <Button onClick={() => this.onClick()}>Unmount</Button>
                    {this.props.children}
                </_>
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
