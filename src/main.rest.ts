import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface, PinoLogger } from './shared/logger/index.js';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Component } from './shared/types/index.js';
import { DatabaseClient, MongoDatabaseClient } from './shared/libs/database-client/index.js';

async function bootstrap() {
  const container = new Container(); // эта своего рода контейнер, в которой будут находиться все зависимости

  // Bind - регистрируем зависимость, куда помещаем информацию о нашем классе или интерфейсе или о каком-то значении
  // которое хотим поместить в наш контейнер.
  // bind(тип)(сам компонент).поместить (to)в контейнер зависимостей и он будет соответствовать экземпляру класса RestApplication
  // inSingletonScope - это указывает, что мы будем создавать только один экземпляр класса
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  // Такой подход, если без использования inversify
  // const logger = new PinoLogger();
  // const config = new RestConfig(logger);
  // const application = new RestApplication(logger, config);

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
