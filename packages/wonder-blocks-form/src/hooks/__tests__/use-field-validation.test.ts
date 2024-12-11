import {act, renderHook, RenderHookResult} from "@testing-library/react";
import {useFieldValidation} from "../use-field-validation";

type HookResult = RenderHookResult<
    ReturnType<typeof useFieldValidation>,
    Parameters<typeof useFieldValidation>[0]
>["result"];

describe("useFieldValidation", () => {
    const testErrorMessage = "Error message";

    describe("Initialization", () => {
        describe("errorMessage", () => {
            it("should have a null errorMessage if value is empty", () => {
                // Arrange
                // Act
                const {result} = renderHook(() =>
                    useFieldValidation({
                        value: "",
                        validate: () => testErrorMessage,
                    }),
                );

                // Assert
                expect(result.current.errorMessage).toBe(null);
            });

            it("should have a null errorMessage if value is set and there is no validate prop", () => {
                // Arrange
                // Act
                const {result} = renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                    }),
                );

                // Assert
                expect(result.current.errorMessage).toBe(null);
            });

            it("should have a null errorMessage if it is disabled", () => {
                // Arrange
                // Act
                const {result} = renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                        validate: () => testErrorMessage,
                        disabled: true,
                    }),
                );

                // Assert
                expect(result.current.errorMessage).toBe(null);
            });

            it("should have the errorMessage from the validate prop if value is set", () => {
                // Arrange
                // Act
                const {result} = renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                        validate: () => testErrorMessage,
                    }),
                );

                // Assert
                expect(result.current.errorMessage).toBe(testErrorMessage);
            });
        });

        describe("validate prop", () => {
            it("should call the validate prop twice initially (once on state initalization and once after mounting", () => {
                // Arrange
                const validate = jest.fn();
                const value = "Test";

                // Act
                renderHook(() =>
                    useFieldValidation({
                        value,
                        validate,
                    }),
                );

                // Assert
                expect(validate.mock.calls).toStrictEqual([[value], [value]]);
            });

            it("should not call the validate prop if value is empty", () => {
                // Arrange
                const validate = jest.fn();

                // Act
                renderHook(() =>
                    useFieldValidation({
                        value: "",
                        validate,
                    }),
                );

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            it("should not call the validate prop if it is disabled", () => {
                // Arrange
                const validate = jest.fn();

                // Act
                renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                        validate,
                        disabled: true,
                    }),
                );

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });
        });
        describe("onValidate prop", () => {
            it("should call the onValidate prop once initially (only after mount)", () => {
                // Arrange
                const onValidate = jest.fn();

                // Act
                renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                        validate: () => testErrorMessage,
                        onValidate,
                    }),
                );

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    testErrorMessage,
                );
            });

            it("should not call the onValidate prop if value is empty", () => {
                // Arrange
                const onValidate = jest.fn();

                // Act
                renderHook(() =>
                    useFieldValidation({
                        value: "",
                        validate: () => testErrorMessage,
                        onValidate,
                    }),
                );

                // Assert
                expect(onValidate).not.toHaveBeenCalled();
            });

            it("should not call the validate prop if it is disabled", () => {
                // Arrange
                const onValidate = jest.fn();

                // Act
                renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                        validate: () => testErrorMessage,
                        onValidate,
                        disabled: true,
                    }),
                );

                // Assert
                expect(onValidate).not.toHaveBeenCalled();
            });
        });
    });

    describe("Validation Cases - Checks validation logic depending on the triggering action and instantValidation prop", () => {
        describe.each([
            [
                "onChangeValidation",
                true,
                (result: HookResult, value: string) => {
                    result.current.onChangeValidation(value);
                },
            ],
            [
                "onBlurValidation",
                false,
                (result: HookResult, value: string) => {
                    result.current.onBlurValidation(value);
                },
            ],
        ])(
            "%s - instantValidation = %s",
            (
                _actionName: string,
                instantValidation: boolean,
                action: (result: HookResult, value: string) => void,
            ) => {
                describe("validate", () => {
                    it("should call the validate prop", () => {
                        // Arrange
                        const validate = jest.fn();
                        const newValue = "X";
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "",
                                validate,
                                instantValidation,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, newValue);
                        });

                        // Assert
                        expect(validate).toHaveBeenCalledWith(newValue);
                    });

                    it("should update the errorMessage", () => {
                        // Arrange
                        const newValue = "X";
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "",
                                instantValidation,
                                validate: () => testErrorMessage,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, newValue);
                        });

                        // Assert
                        expect(result.current.errorMessage).toBe(
                            testErrorMessage,
                        );
                    });
                    it("should call onValidate", () => {
                        // Arrange
                        const newValue = "X";
                        const onValidate = jest.fn();
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "",
                                instantValidation,
                                validate: () => testErrorMessage,
                                onValidate,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, newValue);
                        });

                        // Assert
                        expect(onValidate).toHaveBeenCalledWith(
                            testErrorMessage,
                        );
                    });

                    it("should call onValidate with null if there is no error", () => {
                        // Arrange
                        const newValue = "X";
                        const onValidate = jest.fn();
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "",
                                instantValidation,
                                validate: () => {},
                                onValidate,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, newValue);
                        });

                        // Assert
                        expect(onValidate).toHaveBeenCalledWith(null);
                    });

                    it("should not call the validate prop if it is disabled", () => {
                        // Arrange
                        const validate = jest.fn();
                        const newValue = "X";
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "",
                                validate,
                                instantValidation,
                                disabled: true,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, newValue);
                        });

                        // Assert
                        expect(validate).not.toHaveBeenCalled();
                    });
                });

                describe("required", () => {
                    it("should have an errorMessage with the required text", () => {
                        // Arrange
                        const requiredText = "Required";
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "X",
                                instantValidation,
                                required: requiredText,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, "");
                        });

                        // Assert
                        expect(result.current.errorMessage).toBe(requiredText);
                    });

                    it("should call onValidate with the required text when it receives an empty string", () => {
                        // Arrange
                        const requiredText = "Required";
                        const onValidate = jest.fn();
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "X",
                                instantValidation,
                                required: requiredText,
                                onValidate,
                            }),
                        );
                        onValidate.mockReset(); // Clear any initial calls to onValidate

                        // Act
                        act(() => {
                            action(result, "");
                        });

                        // Assert
                        expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                            requiredText,
                        );
                    });

                    it("should have a null errorMessage when it receives is a non-empty string", () => {
                        // Arrange
                        const requiredText = "Required";
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "",
                                instantValidation,
                                required: requiredText,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, "X");
                        });

                        // Assert
                        expect(result.current.errorMessage).toBe(null);
                    });

                    it("should call onValidate with null when it receives a non-empty string", () => {
                        // Arrange
                        const requiredText = "Required";
                        const onValidate = jest.fn();
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "",
                                instantValidation,
                                required: requiredText,
                                onValidate,
                            }),
                        );
                        onValidate.mockReset(); // Clear any initial calls to onValidate

                        // Act
                        act(() => {
                            action(result, "X");
                        });

                        // Assert
                        expect(onValidate).toHaveBeenCalledWith(null);
                    });

                    it("should have an errorMessage with the default required text if required is true", () => {
                        // Arrange
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "X",
                                instantValidation,
                                required: true,
                            }),
                        );

                        // Act
                        act(() => {
                            action(result, "");
                        });

                        // Assert
                        expect(result.current.errorMessage).toBe(
                            "This field is required.",
                        );
                    });

                    it("should call onValidate with the default required text if required is true", () => {
                        // Arrange
                        const onValidate = jest.fn();
                        const {result} = renderHook(() =>
                            useFieldValidation({
                                value: "X",
                                instantValidation,
                                required: true,
                                onValidate,
                            }),
                        );
                        onValidate.mockReset(); // Clear any initial calls to onValidate

                        // Act
                        act(() => {
                            action(result, "");
                        });

                        // Assert
                        expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                            "This field is required.",
                        );
                    });
                });
            },
        );
    });

    describe("onChangeValidation", () => {
        it("should validate onChange if instantValidation isn't provided", () => {
            // Arrange
            const validate = jest.fn();
            const newValue = "X";
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    validate,
                }),
            );

            // Act
            act(() => {
                result.current.onChangeValidation(newValue);
            });

            // Assert
            expect(validate).toHaveBeenCalledWith(newValue);
        });

        it("should clear the errorMessage onChange if there was an error and instantValidation is false", () => {
            // Arrange
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "T",
                    instantValidation: false,
                    validate: () => testErrorMessage,
                }),
            );

            // Act
            act(() => {
                result.current.onChangeValidation("Te");
            });

            // Assert
            expect(result.current.errorMessage).toBe(null);
        });

        it("should call onValidate with null onChange if there was an error and instantValidation is false", () => {
            // Arrange
            const onValidate = jest.fn();
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "T",
                    instantValidation: false,
                    validate: () => testErrorMessage,
                    onValidate,
                }),
            );
            onValidate.mockReset(); // Clear any initial calls to onValidate

            // Act
            act(() => {
                result.current.onChangeValidation("Te");
            });

            // Assert
            expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
        });

        it("should not call validate onChange if instantValidation is false", () => {
            // Arrange
            const validate = jest.fn();
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    instantValidation: false,
                    validate,
                }),
            );

            // Act
            act(() => {
                result.current.onChangeValidation("X");
            });

            // Assert
            expect(validate).not.toHaveBeenCalled();
        });
    });

    describe("onBlurValidation", () => {
        it("should not validate onBlur if instantValidation isn't provided", () => {
            // Arrange
            const validate = jest.fn();
            const newValue = "X";
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    validate,
                }),
            );

            // Act
            act(() => {
                result.current.onBlurValidation(newValue);
            });

            // Assert
            expect(validate).not.toHaveBeenCalled();
        });

        it("should not update errorMessage onBlur if instantValidation is true", () => {
            // Arrange
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    instantValidation: true,
                    validate: () => testErrorMessage,
                }),
            );

            // Act
            act(() => {
                result.current.onBlurValidation("X");
            });

            // Assert
            expect(result.current.errorMessage).toBe(null);
        });

        it("should not call validate onBlur if instantValidation is true", () => {
            // Arrange
            const validate = jest.fn();
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    instantValidation: true,
                    validate,
                }),
            );

            // Act
            act(() => {
                result.current.onBlurValidation("X");
            });

            // Assert
            expect(validate).not.toHaveBeenCalled();
        });

        it("should not call onValidate onBlur if instantValidation is true", () => {
            // Arrange
            const onValidate = jest.fn();
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    instantValidation: true,
                    validate: () => testErrorMessage,
                    onValidate,
                }),
            );

            // Act
            act(() => {
                result.current.onBlurValidation("X");
            });

            // Assert
            expect(onValidate).not.toHaveBeenCalled();
        });

        it("should not call validate onBlur if newValue is empty and instantValidation is false", () => {
            // Arrange
            const validate = jest.fn();
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    instantValidation: false,
                    validate,
                }),
            );

            // Act
            act(() => {
                result.current.onBlurValidation("");
            });

            // Assert
            expect(validate).not.toHaveBeenCalled();
        });

        it("should call validate onBlur if newValue is empty and it is required", () => {
            // Arrange
            const validate = jest.fn();
            const {result} = renderHook(() =>
                useFieldValidation({
                    value: "",
                    instantValidation: false,
                    validate,
                    required: true,
                }),
            );

            // Act
            act(() => {
                result.current.onBlurValidation("");
            });

            // Assert
            expect(validate).toHaveBeenCalledWith("");
        });
    });
});
