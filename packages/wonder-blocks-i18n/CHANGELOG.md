# @khanacademy/wonder-blocks-i18n

## 1.2.4

### Patch Changes

-   64f08528: Remove file extensions from imports
-   006d5009: Include onError for all kinds of errors thrown in `I18nInlineMarkup`

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
