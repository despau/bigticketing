import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {

    // Hardcode the reason and the statusCode
    reason = 'Error connecting to database :(';
    statusCode = 500;

    constructor() {
        super('Error connecting to DB');

        // Because we are extending a builtin class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }

}