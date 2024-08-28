import {fetchRequestMatchesMock} from "./fetch-request-matches-mock";
import {mockRequester} from "../mock-requester";
import type {FetchMockFn, FetchMockOperation} from "./types";

/**
 * A mock for the fetch function passed to GqlRouter.
 */
export const mockFetch = (): FetchMockFn =>
    mockRequester<FetchMockOperation>(
        fetchRequestMatchesMock,
        // NOTE(somewhatabstract): The indentation is expected on the lines
        // here.
        (input, init) =>
            `Input: ${
                typeof input === "string"
                    ? input
                    : JSON.stringify(input, null, 2)
            }
    Options: ${init == null ? "None" : JSON.stringify(init, null, 2)}`,
    );
