import { Config } from './config.interface.js';
import { LoggerInterface } from '../../logger/index.js';
import { config } from 'dotenv';
import { configRestSchema, RestSchema } from './rest.schema.js';

export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema; // объект с ключами и значениями (process.env)

  constructor(
    private readonly logger: LoggerInterface
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});

    try {
      configRestSchema.validate({ allowed: 'strict', output: this.logger.info });
    } catch (e) {
      this.logger.error('RestConfig', e as Error, []);
    }

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  // get c обычной типизацией
  // public get(key: string): string | undefined {
  //   return this.config[key];
  // }

  // get c строгой типизацией
  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
