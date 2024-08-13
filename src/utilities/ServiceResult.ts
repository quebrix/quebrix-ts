export class ServiceResult {
    private message: string;
    private data: unknown;

    constructor(message: string, data?: unknown) {
        this.message = message
        this.data = data
    }

    ok() {
        return {
            is_success: true,
            data: this.data,
            message: this.message

        }
    }

    failure() {
        return {
            is_success: false,
            data: null,
            message: this.message

        }
    }
}
