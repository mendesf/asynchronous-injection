type ErrorDetails = Record<string, unknown>;

export class BaseError extends Error {
  readonly code: string;
  readonly details?: ErrorDetails;

  constructor(message: string, code: string, details?: ErrorDetails) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export class BusinessError extends BaseError {}

export class SystemError extends BaseError {}
