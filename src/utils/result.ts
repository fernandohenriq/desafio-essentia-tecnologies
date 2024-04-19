export class Result<V, E> {
  private constructor(
    readonly value: V = undefined as V,
    readonly error: E = undefined as E,
  ) {}

  get isSuccess(): boolean {
    return this.value !== undefined;
  }

  get isFailure(): boolean {
    return this.error !== undefined;
  }

  static success<V, E>(value: V): Result<V, E> {
    return new Result<V, E>(value, undefined);
  }

  static failure<V, E>(error: E): Result<V, E> {
    return new Result<V, E>(undefined, error);
  }
}
