export interface LoggerInterface {
  info(msg: string, ...args: unknown[]): void;
  warn(msg: string, ...args: unknown[]): void;
  error(msg: string, error: Error, ...args: unknown[]): void;
  debug(msg: string, ...args: unknown[]): void;
}
