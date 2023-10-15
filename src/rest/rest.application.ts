import { LoggerInterface } from '../shared/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';

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
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {}

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    // console.log('process', process.env);
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    // this.logger.warn('warning');
    // this.logger.error('error', new Error('Some error'));

    this.logger.info('Init database');
    await this._initDb();
    this.logger.info('Init database completed');
  }
}
