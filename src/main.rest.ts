import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { Container } from 'inversify';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createFavouritesContainer } from './shared/modules/favourites/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';

async function bootstrap() {
  // эта своего рода контейнер, в которой будут находиться все зависимости
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createFavouritesContainer(),
    createOfferContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
