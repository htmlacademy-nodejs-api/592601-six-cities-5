import { LoggerInterface } from '../shared/logger/index.js';

export class RestApplication {

  constructor(
    // сюда можно объявлять другие логи по необходимости,
    // тем самым наш RestApplication может работать с разными логерами
    // так как работает не с переменной, а с интерфейсом
    private readonly logger: LoggerInterface
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    // this.logger.warn('warning');
    // this.logger.error('error', new Error('Some error'));
  }
}
