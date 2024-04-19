export class AppError<T = unknown> extends Error {
  readonly name: string = this.constructor.name;
  readonly statusCode: number;
  readonly details: T | undefined;

  constructor(message?: string, statusCode?: number, details?: T) {
    super(message ?? 'Ops! Something went wrong.');
    this.statusCode = statusCode ?? 500;
    this.details = details;
  }
}

export class BadRequestError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 400, details);
  }
}

export class NotFoundError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 404, details);
  }
}

export class UnauthorizedError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 401, details);
  }
}

export class ForbiddenError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 403, details);
  }
}

export class ConflictError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 409, details);
  }
}

export class UnprocessableEntityError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 422, details);
  }
}

export class InternalServerError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 500, details);
  }
}

export class NotImplementedError<T = unknown> extends AppError<T> {
  constructor(message?: string, details?: T) {
    super(message, 501, details);
  }
}
