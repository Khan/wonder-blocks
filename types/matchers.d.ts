// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace jest {
    interface Matchers<R> {
        /*
         * From: config/jest/matchers/to-have-no-a11y-violations.ts
         */
        toHaveNoA11yViolations(): Promise<R>;
    }
}
