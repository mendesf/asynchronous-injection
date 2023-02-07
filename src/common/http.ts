import { BaseError, BusinessError, SystemError } from './error';

type ResponseHeaders = Record<string, string>;

type ResponseBody = Record<string, unknown> | Record<string, unknown>[];

type ErrorBody = Readonly<{
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}>;

export abstract class ActionResult {
  readonly statusCode: number;
  readonly headers: ResponseHeaders;
  readonly body: string;

  constructor(statusCode: number, body?: ResponseBody) {
    this.headers = {};
    this.statusCode = statusCode;
    this.body = body ? JSON.stringify(body) : '';
  }
}

export class InternalServerError extends ActionResult {
  constructor(body: ErrorBody) {
    super(500, body);
  }
}

export class BadRequestError extends ActionResult {
  constructor(body: ErrorBody) {
    super(400, body);
  }
}

export class Ok extends ActionResult {
  constructor(body?: ResponseBody) {
    super(200, body);
  }
}

export function handleError(err: unknown): ActionResult {
  const makeBody = ({ message, code, details }: BaseError): ErrorBody => ({ message, code, details });

  if (err instanceof BusinessError) {
    return new BadRequestError(makeBody(err));
  }

  if (err instanceof SystemError) {
    return new InternalServerError(makeBody(err));
  }

  return new InternalServerError({ message: 'Unhandled error.', code: 'unhandled-error' });
}
