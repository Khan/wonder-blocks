# Wonder Blocks Modal

Wonder Blocks Modal provides a comprehensive collection of modal and drawer components for creating accessible overlay interfaces. These components offer various layout patterns, navigation paradigms, and accessibility features for different modal use cases.

The `@khanacademy/wonder-blocks-modal` package includes several types of modal components and launchers, each designed for specific interaction patterns:

- **OnePaneDialog**: Standard forms, confirmations, information displays
- **FlexibleDialog**: Custom layouts, marketing modals, rich media content
- **DrawerDialog**: Settings panels, navigation menus, contextual actions

## Dialog Components

### OnePaneDialog

The standard layout for most straightforward modal experiences. Features a required header, optional footer, and fully customizable content with fixed padding.

**Key Features:**
- Standard modal layout with header, content, and optional footer
- Fixed left/right/top/bottom padding
- Automatic focus management
- Built-in close button
- Scroll overflow handling

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OnePaneDialog />
    </View>
</View>
```

### FlexibleDialog

A flexible modal variant with fewer layout constraints. Perfect for custom backgrounds, flexible layouts, and cases where the title can be positioned within the content area.

**Key Features:**
- Minimal layout constraints for maximum flexibility
- Custom background support (images or colors)
- Title can render in content area via render props
- Custom styling through styles prop
- Supports both traditional and creative modal designs

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <FlexibleDialog />
    </View>
</View>
```

### DrawerDialog

A specialized dialog for drawer interfaces that slides in from the side. Built on top of FlexibleDialog with drawer-specific styling and animations.

**Key Features:**
- Slides in from left, right, or inline-end
- Responsive design for mobile and desktop
- Smooth animations with customizable timing
- RTL (Right-to-Left) language support
- Custom background and styling support

```tsx
<DrawerLauncher
    alignment="inlineEnd"
    modal={
        <DrawerDialog
            title="Default Drawer"
            content={
                <View style={styles.content}>
                    <BodyText>
                        This is a basic drawer dialog with simple text
                        content. The drawer slides in from the inline
                        end (right in LTR mode).
                    </BodyText>
                </View>
            }
        />
    }
>
    {({openModal}) => (
        <Button onClick={openModal}>Open Default Drawer</Button>
    )}
</DrawerLauncher>
```

## Launcher Components

Modal dialogs are typically rendered using WB launcher components that handle modal dialog lifecycles, focus management, and user interactions.

For conditionally rendering modals, ensure there is only one `ModalLauncher` or `DrawerLauncher` in your component tree. A launcher needs to stay mounted on the current page to properly handle the user's keyboard focus on close of modals. Read [more details on Confluence](https://khanacademy.atlassian.net/wiki/spaces/FRONTEND/blog/2025/11/24/4454383789/Wonder+Blocks+Modal+Tips+Tricks).

### ModalLauncher

The primary component for launching modals. Handles backdrop clicks, focus management, keyboard navigation, and modal lifecycle.

**Key Features:**
- Complete modal lifecycle management
- Backdrop dismiss functionality
- Focus trap and restoration
- Keyboard navigation (ESC to close)
- Portal-based rendering for proper layering
- Customizable initial and closing focus targets

```tsx
<ModalLauncher modal={DefaultModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</ModalLauncher>
```

### DrawerLauncher

Specialized launcher for drawer interfaces with slide-in animations and mobile-responsive behavior.

**Key Features:**
- Drawer-specific animations and transitions
- Responsive drawer positioning
- Mobile-first design considerations
- Context-aware alignment (left, right, inline-end)
- Animation timing controls

```tsx
<DrawerLauncher modal={DefaultModal}>
    {({openModal}) => (
        <Button onClick={openModal}>Click me to open the modal</Button>
    )}
</DrawerLauncher>
```

## Building Block Components

    <Banner
        kind="info"
        text={<>The following components are lower-level building blocks. Most use cases should be covered by the Dialog and Launcher components above.Can't get something working? Contact the WB team!</>}
    />

### ModalDialog

The foundational dialog container that provides the visual dialog element and accessibility structure.

**Key Features:**
- ARIA-compliant dialog markup
- Supports content above and below the modal
- Customizable role (dialog or alertdialog)
- Required aria-labelledby for accessibility
- Custom styling support

```tsx
<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <ModalDialog
            aria-labelledby="modal-title-0"
            aria-describedby="modal-desc-0"
        >
            <ModalPanel
                content={
                    <View style={{gap: sizing.size_240}}>
                        <Heading size="xxlarge" id="modal-title-0">
                            Modal Title
                        </Heading>
                        <BodyText id="modal-desc-0">
                            Here is some text in the modal.
                        </BodyText>
                    </View>
                }
            />
        </ModalDialog>
    </View>
</View>
```

### ModalPanel

The content container that handles header, footer, and scrollable content layout.

**Key Features:**
- Structured layout for modal content
- Scroll overflow management
- Close button positioning
- Header and footer support
- Test ID integration for e2e testing

```tsx
<ModalDialog aria-labelledby="modal-title-0" style={styles.dialog}>
    <ModalPanel
        content={
            <View
                style={[styles.content, styles.scrollContainer]}
                tabIndex={0}
            >
                <Heading size="xxlarge" id="modal-title-0">
                    Modal Title
                </Heading>
                {longBody}
            </View>
        }
    />
</ModalDialog>
```

### ModalHeader

Standardized header component with title, subtitle, and breadcrumb support.

**Key Features:**
- Primary title with optional subtitle
- Breadcrumb navigation support
- Consistent styling and spacing
- Proper heading hierarchy
- Light and dark theme support

```tsx
<ModalDialog aria-labelledby={"modal-title-id-default-example"} style={styles.dialog}>
    <ModalPanel header={<ModalHeader />} content={longBody} />
</ModalDialog>
```

### ModalFooter

Footer component for action buttons and additional content.

**Key Features:**
- Flexible content layout
- Action button styling
- Consistent spacing and alignment
- Theme-aware styling

```tsx
<ModalDialog aria-labelledby={"modal-id-0"} style={styles.dialog}>
    <ModalPanel
        content={
            <View style={{gap: sizing.size_240}}>
                <Heading size="xxlarge" id="modal-id-0">
                    Modal Heading
                </Heading>
                {longBody}
            </View>
        }
        footer={<ModalFooter />}
    />
</ModalDialog>
```

For detailed examples, props, and advanced usage patterns, refer to the individual component documentation pages.


---

## Components & Guides

- [Building Blocks Modal Dialog](building-blocks-modal-dialog.md)
- [Building Blocks Modal Footer](building-blocks-modal-footer.md)
- [Building Blocks Modal Header](building-blocks-modal-header.md)
- [Building Blocks Modal Panel](building-blocks-modal-panel.md)
- [Drawer Launcher Drawer Launcher](drawer-launcher-drawer-launcher.md)
- [Flexible Dialog](flexible-dialog.md)
- [Modal Launcher](modal-launcher.md)
- [One Pane Dialog](one-pane-dialog.md)
