import { LoggerInterface } from '../shared/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {

  constructor(
    // сюда можно объявлять другие логи по необходимости,
    // тем самым наш RestApplication может работать с разными логерами
    // так как работает не с переменной, а с интерфейсом
    // private readonly logger: LoggerInterface,
    // private readonly config: Config<RestSchema>

    // внедряем DI
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    console.log('process', process.env);
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    // this.logger.warn('warning');
    // this.logger.error('error', new Error('Some error'));
  }
}
