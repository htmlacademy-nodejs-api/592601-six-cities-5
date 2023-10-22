import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { DefaultFavouritesService } from './default-favourites.service.js';
import { FavouritesEntity, FavouritesModel } from './favourites.entity.js';
import { FavouritesServiceInterface } from './favourites-service.interface.js';

export function createFavouritesContainer() {
  const favouritesContainer = new Container();

  favouritesContainer.bind<FavouritesServiceInterface>(Component.FavouritesService).to(DefaultFavouritesService);
  favouritesContainer.bind<types.ModelType<FavouritesEntity>>(Component.FavouritesModel).toConstantValue(FavouritesModel);

  return favouritesContainer;
}
