interface ErrorResponseItemSchema {
    [key: string]: string[];
}
export interface ErrorResponseSchema {
    errors: ErrorResponseItemSchema;
}
