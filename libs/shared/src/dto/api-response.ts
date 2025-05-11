export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T | null;
    error?: string;
}

export const success = <T>(data: T, message = 'OK'): ApiResponse<T> => ({
    success: true,
    message,
    data,
});

export const failure = (message: string, error = 'Error'): ApiResponse<null> => ({
    success: false,
    message,
    error,
    data: null,
});
