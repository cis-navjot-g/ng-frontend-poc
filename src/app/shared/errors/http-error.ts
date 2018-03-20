export interface IError {
    message: string;
}

export class HttpError implements IError {
    constructor(public message: string) {
    }
}

export class EmptyError {}
