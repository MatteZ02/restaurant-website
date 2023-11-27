class ApiError extends Error {
    public readonly status: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.status = statusCode;
        this.message = message;
    }
}

export default ApiError;
