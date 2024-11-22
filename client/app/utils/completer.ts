export class Completer<T> {
    private _resolve!: (value: T | PromiseLike<T>) => void;
    private _reject!: (reason?: any) => void;
    private _isCompleted: boolean = false;
    private _promise: Promise<T>;

    constructor() {
        // Initialize the Promise and store the resolve and reject functions
        this._promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    /**
     * Returns the promise that will be completed later.
     */
    get promise(): Promise<T> {
        return this._promise;
    }

    /**
     * Completes the promise with a value.
     * @param value The value to resolve the promise with.
     */
    complete(value: T): void {
        if (this._isCompleted) {
            throw new Error("Completer has already been completed.");
        }
        this._isCompleted = true;
        this._resolve(value);
    }

    /**
     * Completes the promise with an error.
     * @param reason The reason for rejecting the promise.
     */
    completeError(reason?: any): void {
        if (this._isCompleted) {
            throw new Error("Completer has already been completed.");
        }
        this._isCompleted = true;
        this._reject(reason);
    }

    /**
     * Checks if the completer has been completed.
     */
    get isCompleted(): boolean {
        return this._isCompleted;
    }
}
