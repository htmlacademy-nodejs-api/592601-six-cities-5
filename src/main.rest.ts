import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface, PinoLogger } from './shared/logger/index.js';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container(); // эта своего рода контейнер, в которой будут находиться все зависимости

  // Bind - регистрируем зависимость, куда помещаем информацию о нашем классе или интерфейсе или о каком-то значении
  // которое хотим поместить в наш контейнер.
  // bind(тип)(сам компонент).поместить (to)в контейнер зависимостей и он будет соответствовать экземпляру класса RestApplication
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication);
  container.bind<LoggerInterface>(Component.Logger).to(PinoLogger);
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig);

  // Такой подход, если без использования inversify
  // const logger = new PinoLogger();
  // const config = new RestConfig(logger);
  // const application = new RestApplication(logger, config);

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
