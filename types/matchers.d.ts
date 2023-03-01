// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace jest {
    interface Matchers<R> {
        toBeFunction(): R;
    }
}
