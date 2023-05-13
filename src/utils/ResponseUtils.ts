enum ApiErrorType {
    ApiError = "ApiError"
}

type ApiError = {
    type: string | ApiErrorType
    message: string
};

type ApiResponse = {
    success: boolean
    error: ApiError | null
    data?: any
};

class ResponseUtils {
    private static makeResponse(error: ApiError | null, success: boolean, data?: any): ApiResponse {
        return {
            success,
            error,
            data
        };
    }

    static error(message: string, type: string | ApiErrorType): ApiResponse {
        return this.makeResponse({ message, type }, false);
    }

    static success(data: any): ApiResponse {
        return this.makeResponse(null, true, data);
    }
}

export { ResponseUtils, ApiErrorType };