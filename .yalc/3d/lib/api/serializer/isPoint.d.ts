export declare const isPoint: (v: any, type?: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function") => v is {
    x: number;
    y: number;
    z?: number | undefined;
};
