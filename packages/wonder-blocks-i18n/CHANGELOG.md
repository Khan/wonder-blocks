# @khanacademy/wonder-blocks-i18n

## 2.0.0

### Major Changes

-   1ca4d7e3: Fix minor issue with generate Flow types (this is a major bump b/c I forgot to do one after doing the TS conversion)

## 1.2.7

### Patch Changes

-   b5ba5568: Ensure that flow lib defs use React.ElementConfig<> isntead of JSX.LibraryManagedAttributes<>

## 1.2.6

### Patch Changes

-   92afa7d2: Fix export types for ngettext and \$\_

## 1.2.5

### Patch Changes

-   d816af08: Update build and test configs use TypeScript
-   3891f544: Update babel config to include plugins that Storybook needed
-   0d28bb1c: Configured TypeScript
-   3d05f764: Fix HOCs and other type errors
-   c2ec4902: Update eslint configuration, fix lint
-   2983c05b: Include 'types' field in package.json
-   77ff6a66: Generate Flow types from TypeScript types
-   ec8d4b7f: Fix miscellaneous TypeScript errors

## 1.2.4

### Patch Changes

-   91cb727c: Remove file extensions from imports
-   91cb727c: Include onError for all kinds of errors thrown in `I18nInlineMarkup`

## 1.2.3

### Patch Changes

-   49c041e5: Warn instead of throwing an execption if the use of I18nInlineMarkup isn't necessary

## 1.2.2

### Patch Changes

-   9a6641e2: Pass-through strings if the current locale is not a pseudo-lang

## 1.2.1

### Patch Changes

-   399394bb: Don't package 'react' in the dist bundles

## 1.2.0

### Minor Changes

-   b2a6a248: Export I18nInlineMarkup from wonder-blocks-i18n package
-   d05a3c4e: Add setLocale()/getLocale() methods so that mobile/webapp can set the current locale

## 1.1.0

### Minor Changes

-   cb57833c: Export ngetpos so that it can be use by handlebars i18n functions in webapp

## 1.0.0

### Major Changes

-   66097df7: Create wonder-blocks-i18n package by copying i18n.js and deps from webapp