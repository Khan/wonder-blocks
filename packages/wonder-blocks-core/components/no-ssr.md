`NoSSR` is a behavioral component, providing a mechanism to hide the rendering of a component from server-side rendering (SSR).

```jsx
<NoSSR placeholder={() => <View>This gets rendered on client and server for the first render call</View>}>
    {() => <View>This is rendered only by the client for all but the first render.</View>}
</NoSSR>
```