// @flow
export type ValidData = string | boolean | number | {...} | Array<ValidData>;

export type Status = "loading" | "success" | "error";

export type Result<TData: ValidData> =
    | {|
          status: "loading",
      |}
    | {|
          status: "success",
          data: TData,
      |}
    | {|
          status: "error",
          error: string,
      |}
    | {|
          status: "aborted",
      |};

export type CacheEntry<TData: ValidData> =
    | {|
          +error: string,
          +data?: void,
      |}
    | {|
          +data: TData,
          +error?: void,
      |};

export type InterceptContextData = {
    [id: string]: <TData: ValidData>() => ?Promise<?TData>,
    ...
};

export type Cache = {
    [key: string]: CacheEntry<any>,
    ...
};

export type ResponseCache = $ReadOnly<Cache>;
