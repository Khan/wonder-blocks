`NoSSR` is a behavioral component, providing a mechanism to hide the rendering of a component from server-side rendering (SSR).

```jsx
<NoSSR placeholder={() => <View>This gets rendered on client and server for the first render call in the component tree</View>}>
    {() => <View>This is rendered only by the client for all but the very first render of the component tree.</View>}
</NoSSR>
```