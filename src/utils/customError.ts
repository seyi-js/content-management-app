export class CustomError extends Error {
  statusCode: number;

  constructor(
    name: string,
    statusCode: number,
    message: string,
    error?: Error
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
    this.stack = error?.stack;
  }
}
