The `TooltipArrow` renders the arrow, including appropriate padding from the anchor location.

In these examples, a red bar has been added to show how the arrow is distanced from the target elements.

### Placement top

```jsx
<div style={{display: "flex", flexDirection: "column"}}>
    <TooltipArrow placement="top" />
    <div style={{backgroundColor: "red", width: 24, height: 4}} />
</div>
```

### Placement right

```jsx
<div style={{display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end"}}>
    <TooltipArrow placement="right" />
    <div style={{backgroundColor: "red", width: 4, height: 24}} />
</div>
```

### Placement bottom

```jsx
<div style={{display: "flex", flexDirection: "column-reverse"}}>
    <TooltipArrow placement="bottom" />
    <div style={{backgroundColor: "red", width: 24, height: 4}} />
</div>
```

### Placement left

```jsx
<div style={{display: "flex", flexDirection: "row"}}>
    <TooltipArrow placement="left" />
    <div style={{backgroundColor: "red", width: 4, height: 24}} />
</div>
```