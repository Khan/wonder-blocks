import {act, renderHook} from "@testing-library/react-hooks";
import {useFieldValidation} from "../use-field-validation";

describe("useFieldValidation", () => {
    const testErrorMessage = "Error message";

    describe("Initialization", () => {
        describe("errorMessage", () => {
            it("should have a null errorMessage if value is empty", () => {
                // Arrange
                // Act
                const {
                    result: {
                        current: {errorMessage},
                    },
                } = renderHook(() =>
                    useFieldValidation({
                        value: "",
                        validate: () => testErrorMessage,
                    }),
                );

                // Assert
                expect(errorMessage).toBe(null);
            });

            it("should have a null errorMessage if value is set and there is no validate prop", () => {
                // Arrange
                // Act
                const {
                    result: {
                        current: {errorMessage},
                    },
                } = renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                    }),
                );

                // Assert
                expect(errorMessage).toBe(null);
            });

            it("should have a null errorMessage if it is disabled", () => {
                // Arrange
                // Act
                const {
                    result: {
                        current: {errorMessage},
                    },
                } = renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                        validate: () => testErrorMessage,
                        disabled: true,
                    }),
                );

                // Assert
                expect(errorMessage).toBe(null);
            });

            it("should have the errorMessage from the validate prop if value is set", () => {
                // Arrange
                // Act
                const {
                    result: {
                        current: {errorMessage},
                    },
                } = renderHook(() =>
                    useFieldValidation({
                        value: "Test",
                        validate: () => testErrorMessage,
                    }),
                );

                // Assert
                expect(errorMessage).toBe(testErrorMessage);
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

    describe("onChangeValidation", () => {
        it("should validate onChange if instantValidation isn't provided", () => {
            // Arrange
            const validate = jest.fn();
            const newValue = "X";
            const {
                result: {
                    current: {onChangeValidation},
                },
            } = renderHook(() =>
                useFieldValidation({
                    value: "",
                    validate,
                }),
            );

            // Act
            onChangeValidation(newValue);

            // Assert
            expect(validate).toHaveBeenCalledWith(newValue);
        });

        describe("instantValidation=true", () => {
            describe("validate", () => {
                it("should call the validate prop", () => {
                    // Arrange
                    const validate = jest.fn();
                    const newValue = "X";
                    const {result} = renderHook(() =>
                        useFieldValidation({
                            value: "",
                            validate,
                            instantValidation: true,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onChangeValidation(newValue);
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
                            instantValidation: true,
                            validate: () => testErrorMessage,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onChangeValidation(newValue);
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(testErrorMessage);
                });
                it("should call onValidate", () => {
                    // Arrange
                    const newValue = "X";
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
                        result.current.onChangeValidation(newValue);
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledWith(testErrorMessage);
                });

                it("should call onValidate with null if there is no error", () => {
                    // Arrange
                    const newValue = "X";
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useFieldValidation({
                            value: "",
                            instantValidation: true,
                            validate: () => {},
                            onValidate,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onChangeValidation(newValue);
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
                            instantValidation: true,
                            disabled: true,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onChangeValidation(newValue);
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
                            instantValidation: true,
                            required: requiredText,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onChangeValidation("");
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(requiredText);
                });

                it("should call onValidate with the required text when the value onChangeValidation receives an empty string", () => {
                    // Arrange
                    const requiredText = "Required";
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useFieldValidation({
                            value: "X",
                            instantValidation: true,
                            required: requiredText,
                            onValidate,
                        }),
                    );
                    onValidate.mockReset(); // Clear any initial calls to onValidate

                    // Act
                    act(() => {
                        result.current.onChangeValidation("");
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        requiredText,
                    );
                });

                it("should have a null errorMessage when the value onChangeValidation receives is a non-empty string", () => {
                    // Arrange
                    const requiredText = "Required";
                    const {result} = renderHook(() =>
                        useFieldValidation({
                            value: "",
                            instantValidation: true,
                            required: requiredText,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onChangeValidation("X");
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(null);
                });

                it("should call onValidate with null when the value onChangeValidation receives is a non-empty string", () => {
                    // Arrange
                    const requiredText = "Required";
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useFieldValidation({
                            value: "",
                            instantValidation: true,
                            required: requiredText,
                            onValidate,
                        }),
                    );
                    onValidate.mockReset(); // Clear any initial calls to onValidate

                    // Act
                    act(() => {
                        result.current.onChangeValidation("X");
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledWith(null);
                });

                it("should have an errorMessage with the default required text if required is true", () => {
                    // Arrange
                    const {result} = renderHook(() =>
                        useFieldValidation({
                            value: "X",
                            instantValidation: true,
                            required: true,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onChangeValidation("");
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
                            instantValidation: true,
                            required: true,
                            onValidate,
                        }),
                    );
                    onValidate.mockReset(); // Clear any initial calls to onValidate

                    // Act
                    act(() => {
                        result.current.onChangeValidation("");
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        "This field is required.",
                    );
                });
            });
        });
        describe("instantValidation=false", () => {
            it("should clear the errorMessage onChange if there was an error", () => {
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

            it("should call onValidate with null onChange if there was an error", () => {
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

            it("should not call validate onChange", () => {
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
    });

    describe("onBlurValidation", () => {
        describe("instantValidation=true", () => {
            it("should not update errorMessage onBlur", () => {
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

            it("should not call validate onBlur", () => {
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

            it("should not call onValidate onBlur", () => {
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
        });

        describe("instantValidation=false", () => {
            describe("validate", () => {
                it("should not call validate onBlur if newValue is empty", () => {
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
            });

            describe("required", () => {
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
    });
});
