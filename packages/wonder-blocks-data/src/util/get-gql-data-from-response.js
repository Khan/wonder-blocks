// @flow
export const getGqlDataFromResponse = async <TData>(
    response: Response,
): Promise<TData> => {
    // Get the response as text, that way we can use the text in error
    // messaging, should our parsing fail.
    const bodyText = await response.text();
    let result;
    try {
        result = JSON.parse(bodyText);
    } catch (e) {
        // TODO: Use KindError from WS Core.
        throw new Error("Failed to parse");
    }

    if (response.status >= 300) {
        // TODO: Use KindError from WS Core.
        throw new Error("Network error");
    }

    if (
        // Flow shouldn't be warning about this.
        // $FlowIgnore[method-unbinding]
        !Object.prototype.hasOwnProperty.call(result, "data") &&
        // Flow shouldn't be warning about this.
        // $FlowIgnore[method-unbinding]
        !Object.prototype.hasOwnProperty.call(result, "errors")
    ) {
        // TODO: Use KindError from WS Core.
        throw new Error("Data error");
    }

    // TODO: If there are errors, throw an error to encapsulate them.
    if (result?.errors != null) {
        throw new Error("GQL error");
    }

    return result.data;
};
