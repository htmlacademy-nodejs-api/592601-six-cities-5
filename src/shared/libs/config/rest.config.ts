import { Config } from './config.interface.js';
import { LoggerInterface } from '../../logger/index.js';
import { DotenvParseOutput, config } from 'dotenv';

export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv; // объект с ключами и значениями (process.env)

  constructor(
    private readonly logger: LoggerInterface
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('.env file found and successfully parsed!');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
