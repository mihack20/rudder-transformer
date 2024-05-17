/* eslint-disable max-classes-per-file */
export class RespStatusError extends Error {
  statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 400;
  }
}

export class RetryRequestError extends RespStatusError {
  constructor(message: any) {
    // chosen random unique status code 809 to mark requests that needs to be retried
    super(message, 809);
  }
}
