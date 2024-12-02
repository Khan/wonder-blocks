import {act, renderHook} from "@testing-library/react-hooks";
import {
    SelectValidationProps,
    SelectValue,
    useSelectValidation,
} from "../use-select-validation";

const emptyValueCases = ["", [], undefined, null];
const valueCases = ["Test", ["Test"]];

describe("useSelectValidation", () => {
    const testErrorMessage = "Error message";
    const testRequiredErrorMessage = "Required error message";

    describe("Initialization", () => {
        describe("errorMessage", () => {
            it.each(emptyValueCases)(
                "should have a null errorMessage if value is `%s`",
                (value) => {
                    // Arrange
                    // Act
                    const {result} = renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => testErrorMessage,
                        }),
                    );

                    // Assert
                    expect(result.current.errorMessage).toBe(null);
                },
            );

            it("should have a null errorMessage if value is set and there is no validate prop", () => {
                // Arrange
                // Act
                const {result} = renderHook(() =>
                    useSelectValidation({
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
                    useSelectValidation({
                        value: "Test",
                        validate: () => testErrorMessage,
                        disabled: true,
                    }),
                );

                // Assert
                expect(result.current.errorMessage).toBe(null);
            });
            it.each(valueCases)(
                "should have the errorMessage from the validate prop if value is set to %s",
                (value) => {
                    // Arrange
                    // Act
                    const {result} = renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => testErrorMessage,
                        }),
                    );

                    // Assert
                    expect(result.current.errorMessage).toBe(testErrorMessage);
                },
            );
        });

        describe("validate prop", () => {
            it.each(valueCases)(
                "should call the validate prop with value (%s) twice initially (once on state initalization and once after mounting)",
                (value) => {
                    // Arrange
                    const validate = jest.fn();

                    // Act
                    renderHook(() =>
                        useSelectValidation({
                            value,
                            validate,
                        }),
                    );

                    // Assert
                    expect(validate.mock.calls).toStrictEqual([
                        [value],
                        [value],
                    ]);
                },
            );

            it.each(emptyValueCases)(
                "should not call the validate prop if value is `%s`",
                (value) => {
                    // Arrange
                    const validate = jest.fn();

                    // Act
                    renderHook(() =>
                        useSelectValidation({
                            value,
                            validate,
                        }),
                    );

                    // Assert
                    expect(validate).not.toHaveBeenCalled();
                },
            );

            it("should not call the validate prop if it is disabled", () => {
                // Arrange
                const validate = jest.fn();

                // Act
                renderHook(() =>
                    useSelectValidation({
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
            it.each(valueCases)(
                "should call the onValidate prop once initially (only after mount) when value is `%s`",
                (value) => {
                    // Arrange
                    const onValidate = jest.fn();

                    // Act
                    renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => testErrorMessage,
                            onValidate,
                        }),
                    );

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        testErrorMessage,
                    );
                },
            );

            it.each(emptyValueCases)(
                "should not call the onValidate prop if value is `%s`",
                (value) => {
                    // Arrange
                    const onValidate = jest.fn();

                    // Act
                    renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => testErrorMessage,
                            onValidate,
                        }),
                    );

                    // Assert
                    expect(onValidate).not.toHaveBeenCalled();
                },
            );

            it("should not call the validate prop if it is disabled", () => {
                // Arrange
                const onValidate = jest.fn();

                // Act
                renderHook(() =>
                    useSelectValidation({
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

    describe("onOpenerBlurValidation", () => {
        // Since onOpenerBlurValidation handles the validation for `required`,
        // we don't need tests checking if the validate prop is called since
        // it works without the validate prop.
        it.each(emptyValueCases)(
            "should call the onValidate prop with the required prop message if the dropdown is closed, the field is required, and no value (%s) is selected",
            (value) => {
                // Arrange
                const onValidate = jest.fn();
                const {result} = renderHook(() =>
                    useSelectValidation({
                        value,
                        onValidate,
                        required: testRequiredErrorMessage,
                        open: false,
                    }),
                );

                // Act
                act(() => {
                    result.current.onOpenerBlurValidation();
                });

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    testRequiredErrorMessage,
                );
            },
        );

        it("should call the onValidate prop with the default required message if required=true, dropdown is closed, the field is required, and no value is selected", () => {
            // Arrange
            const onValidate = jest.fn();
            const value = "";
            const {result} = renderHook(() =>
                useSelectValidation({
                    value,
                    onValidate,
                    required: true,
                    open: false,
                }),
            );

            // Act
            act(() => {
                result.current.onOpenerBlurValidation();
            });

            // Assert
            expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                "This field is required.",
            );
        });

        it.each(emptyValueCases)(
            "should have the errorMessage be the required prop message if the dropdown is closed, the field is required, and no value (%s) is selected",
            (value) => {
                // Arrange
                const onValidate = jest.fn();
                const {result} = renderHook(() =>
                    useSelectValidation({
                        value,
                        onValidate,
                        required: testRequiredErrorMessage,
                        open: false,
                    }),
                );

                // Act
                act(() => {
                    result.current.onOpenerBlurValidation();
                });

                // Assert
                expect(result.current.errorMessage).toBe(
                    testRequiredErrorMessage,
                );
            },
        );

        it("should have the errorMessage be the default required message if the required=true, dropdown is closed, the field is required, and no value is selected", () => {
            // Arrange
            const onValidate = jest.fn();
            const value = "";
            const {result} = renderHook(() =>
                useSelectValidation({
                    value,
                    onValidate,
                    required: true,
                    open: false,
                }),
            );

            // Act
            act(() => {
                result.current.onOpenerBlurValidation();
            });

            // Assert
            expect(result.current.errorMessage).toBe("This field is required.");
        });
        it.each([
            {condition: "if it is open", props: {open: true}},
            {condition: "if it is not required", props: {required: false}},
            {condition: "if it is has a string value", props: {value: "Test"}},
            {
                condition: "if it is has an array value",
                props: {value: ["Test"]},
            },
        ])("should not call the onValidate prop $condition", ({props}) => {
            // Arrange
            const onValidate = jest.fn();
            const {result} = renderHook(() =>
                useSelectValidation({
                    value: props.value || "",
                    onValidate,
                    required: true,
                    open: false,
                    ...props,
                }),
            );
            onValidate.mockClear(); // Clear any calls from mounting

            // Act
            act(() => {
                result.current.onOpenerBlurValidation();
            });

            // Assert
            expect(onValidate).not.toHaveBeenCalled();
        });

        it.each([
            {condition: "if it is open", props: {open: true}},
            {condition: "if it is not required", props: {required: false}},
            {condition: "if it is has a string value", props: {value: "Test"}},
            {
                condition: "if it is has an array value",
                props: {value: ["Test"]},
            },
        ])("should not have an error message $condition", ({props}) => {
            // Arrange
            const onValidate = jest.fn();
            const {result} = renderHook(() =>
                useSelectValidation({
                    value: props.value || "",
                    onValidate,
                    required: true,
                    open: false,
                    ...props,
                }),
            );
            onValidate.mockClear(); // Clear any calls from mounting

            // Act
            act(() => {
                result.current.onOpenerBlurValidation();
            });

            // Assert
            expect(result.current.errorMessage).toBe(null);
        });
    });

    describe("onDropdownClosedValidation", () => {
        it.each(emptyValueCases)(
            "should call the onValidate prop with the required prop message if the field is required, and no value (%s) is selected",
            (value) => {
                // Arrange
                const onValidate = jest.fn();
                const {result} = renderHook(() =>
                    useSelectValidation({
                        value,
                        onValidate,
                        required: testRequiredErrorMessage,
                    }),
                );

                // Act
                act(() => {
                    result.current.onDropdownClosedValidation();
                });

                // Assert
                expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                    testRequiredErrorMessage,
                );
            },
        );

        it.each(emptyValueCases)(
            "should have the required prop message as the errorMessage if the field is required, and no value (%s) is selected",
            (value) => {
                // Arrange
                const {result} = renderHook(() =>
                    useSelectValidation({
                        value,
                        required: testRequiredErrorMessage,
                    }),
                );

                // Act
                act(() => {
                    result.current.onDropdownClosedValidation();
                });

                // Assert
                expect(result.current.errorMessage).toBe(
                    testRequiredErrorMessage,
                );
            },
        );

        const conditionsThatShouldNotTriggerValidation = [
            {
                condition: "if it is not required and value is []",
                props: {required: false, value: []},
            },
            {
                condition: "if it is not required and value is an empty string",
                props: {required: false, value: ""},
            },
            {
                condition:
                    "if it is not required and value is set to a string value",
                props: {required: false, value: "test"},
            },
            {
                condition:
                    "if it is not required and value is set to an array value",
                props: {required: false, value: ["test"]},
            },
            {
                condition:
                    "if it is required and value is set to a string value",
                props: {required: testRequiredErrorMessage, value: "test"},
            },
            {
                condition:
                    "if it is required and value is set to an array value",
                props: {required: testRequiredErrorMessage, value: ["test"]},
            },
        ];

        it.each(conditionsThatShouldNotTriggerValidation)(
            "should not call the onValidate prop $condition",
            ({props}: {props: SelectValidationProps<string | string[]>}) => {
                // Arrange
                const onValidate = jest.fn();
                const {result} = renderHook(() =>
                    useSelectValidation({
                        ...props,
                        onValidate,
                    }),
                );
                onValidate.mockClear(); // Clear any calls from mounting

                // Act
                act(() => {
                    result.current.onDropdownClosedValidation();
                });

                // Assert
                expect(onValidate).not.toHaveBeenCalled();
            },
        );

        it.each(conditionsThatShouldNotTriggerValidation)(
            "should not have an error message $condition",
            ({props}: {props: SelectValidationProps<string | string[]>}) => {
                // Arrange
                const {result} = renderHook(() =>
                    useSelectValidation({...props}),
                );

                // Act
                act(() => {
                    result.current.onDropdownClosedValidation();
                });

                // Assert
                expect(result.current.errorMessage).toBe(null);
            },
        );
    });
    describe("onSelectionValidation", () => {
        describe("validate prop", () => {
            it("should not call the validate prop if it is disabled", () => {
                // Arrange
                const validate = jest.fn();
                const {result} = renderHook(() =>
                    useSelectValidation<string>({
                        value: "Test",
                        validate,
                        disabled: true,
                    }),
                );

                // Act
                act(() => {
                    result.current.onSelectionValidation("Test2");
                });

                // Assert
                expect(validate).not.toHaveBeenCalled();
            });

            describe.each([
                {
                    condition: "newValue is a string",
                    value: "Test",
                    newValue: "Test2",
                },
                {
                    condition: "newValue is an array",
                    value: ["Test"],
                    newValue: ["Test", "Test2"],
                },
            ])("$condition", ({value, newValue}) => {
                it("should call the validate prop with the new value", () => {
                    // Arrange
                    const validate = jest.fn();
                    const {result} = renderHook(() =>
                        useSelectValidation({value, validate}),
                    );
                    validate.mockClear(); // Clear any calls from mounting

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(validate).toHaveBeenCalledExactlyOnceWith(newValue);
                });

                it("should set the errorMessage to the message returned by the validate prop", () => {
                    // Arrange
                    const {result} = renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => testErrorMessage,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(testErrorMessage);
                });

                it("should set the errorMessage to null if the validate prop doesn't return an error message", () => {
                    // Arrange
                    const {result} = renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => {},
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(null);
                });

                it("should call onValidate with the message returned by the validate prop", () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => testErrorMessage,
                            onValidate,
                        }),
                    );
                    onValidate.mockClear(); // Clear any calls from mounting

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        testErrorMessage,
                    );
                });

                it("should call onValidate with null if the validate prop doesn't return an error message", () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useSelectValidation({
                            value,
                            validate: () => {},
                            onValidate,
                        }),
                    );
                    onValidate.mockClear(); // Clear any calls from mounting

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
                });
            });
        });
        describe("validating a new value when it is required", () => {
            describe.each([
                {
                    condition: "newValue is an empty string",
                    value: "Test",
                    newValue: "",
                },
                {
                    condition: "newValue is null",
                    value: "Test",
                    newValue: null,
                },
                {
                    condition: "newValue is an empty array",
                    value: ["Test"],
                    newValue: [] as string[],
                },
            ])("$condition", ({value, newValue}) => {
                it("should set the errorMessage to the required prop message", () => {
                    // Arrange
                    const {result} = renderHook(() =>
                        useSelectValidation<SelectValue>({
                            value,
                            required: testRequiredErrorMessage,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(
                        testRequiredErrorMessage,
                    );
                });

                it("should set the errorMessage to the default required message if the required prop is true", () => {
                    // Arrange
                    const {result} = renderHook(() =>
                        useSelectValidation<SelectValue>({
                            value,
                            required: true,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(
                        "This field is required.",
                    );
                });

                it("should call onValidate with the required prop message", () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useSelectValidation<SelectValue>({
                            value,
                            required: testRequiredErrorMessage,
                            onValidate,
                        }),
                    );
                    onValidate.mockClear(); // Clear any calls from mounting

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        testRequiredErrorMessage,
                    );
                });

                it("should call onValidate with the default required message if the required prop is true", () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useSelectValidation<SelectValue>({
                            value,
                            required: true,
                            onValidate,
                        }),
                    );
                    onValidate.mockClear(); // Clear any calls from mounting

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(
                        "This field is required.",
                    );
                });
            });

            describe.each([
                {
                    condition: "newValue is a string value",
                    value: "Test",
                    newValue: "Test2",
                },
                {
                    condition: "newValue is an array",
                    value: ["Test"],
                    newValue: ["Test", "Test2"],
                },
            ])("$condition", ({value, newValue}) => {
                it("should have a null errorMessage since the field has a value", () => {
                    // Arrange
                    const {result} = renderHook(() =>
                        useSelectValidation<SelectValue>({
                            value,
                            required: testRequiredErrorMessage,
                        }),
                    );

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(result.current.errorMessage).toBe(null);
                });

                it("should call the onValidate prop with null since the field has a value", () => {
                    // Arrange
                    const onValidate = jest.fn();
                    const {result} = renderHook(() =>
                        useSelectValidation<SelectValue>({
                            value,
                            onValidate,
                            required: testRequiredErrorMessage,
                        }),
                    );
                    onValidate.mockClear(); // Clear any calls from mounting

                    // Act
                    act(() => {
                        result.current.onSelectionValidation(newValue);
                    });

                    // Assert
                    expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
                });
            });
        });

        describe("validate + required", () => {
            it("should set the error message to the required error message if the validation succeeds", () => {
                // Arrange
                const {result} = renderHook(() =>
                    useSelectValidation<SelectValue>({
                        value: "Test",
                        validate: () => {},
                        required: testRequiredErrorMessage,
                    }),
                );

                // Act
                act(() => {
                    result.current.onSelectionValidation("");
                });

                // Assert
                expect(result.current.errorMessage).toBe(
                    testRequiredErrorMessage,
                );
            });

            it("should set the error message to the validate error message if the validation fails", () => {
                // Arrange
                const {result} = renderHook(() =>
                    useSelectValidation<SelectValue>({
                        value: "Test",
                        validate: () => testErrorMessage,
                        required: testRequiredErrorMessage,
                    }),
                );

                // Act
                act(() => {
                    result.current.onSelectionValidation("");
                });

                // Assert
                expect(result.current.errorMessage).toBe(testErrorMessage);
            });
        });
    });

    describe("onSelectedValuesChangeValidation", () => {
        it("should set the errorMessage to null", () => {
            // Arrange
            // Mounting with a value and validate prop returning an error message
            // will trigger it to have an error message already
            const {result} = renderHook(() =>
                useSelectValidation({
                    value: "Test",
                    validate: () => testErrorMessage,
                }),
            );

            // Act
            act(() => {
                result.current.onSelectedValuesChangeValidation();
            });

            // Assert
            expect(result.current.errorMessage).toBe(null);
        });

        it("should call onValidate with null", () => {
            // Arrange
            // Mounting with a value and validate prop returning an error message
            // will trigger it to have an error message already
            const onValidate = jest.fn();
            const {result} = renderHook(() =>
                useSelectValidation({
                    value: "Test",
                    validate: () => testErrorMessage,
                    onValidate,
                }),
            );
            onValidate.mockClear(); // Clear any calls from mounting
            // Act
            act(() => {
                result.current.onSelectedValuesChangeValidation();
            });

            // Assert
            expect(onValidate).toHaveBeenCalledExactlyOnceWith(null);
        });
    });
});
