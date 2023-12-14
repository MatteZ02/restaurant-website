import { debug } from "..";

class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly message: string
    ) {
        super(message);
        debug.log(`ApiError: ${status} ${message}`);
    }
}

export default ApiError;
