import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { LoggerInterface, PinoLogger } from '../shared/logger/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  // Bind - регистрируем зависимость, куда помещаем информацию о нашем классе или интерфейсе или о каком-то значении
  // которое хотим поместить в наш контейнер.
  // bind(тип)(сам компонент).поместить (to)в контейнер зависимостей и он будет соответствовать экземпляру класса RestApplication
  // inSingletonScope - это указывает, что мы будем создавать только один экземпляр класса
  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  // Такой подход, если без использования inversify
  // const logger = new PinoLogger();
  // const config = new RestConfig(logger);
  // const application = new RestApplication(logger, config);

  return restApplicationContainer;
}
