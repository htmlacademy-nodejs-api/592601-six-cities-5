import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { LoggerInterface } from '../../logger/index.js';
import { FavouritesServiceInterface } from './favourites-service.interface.js';
import { FavouritesEntity } from './favourites.entity.js';
import { CreateFavouritesDto } from './dto/create-favourites.dto.js';

export class DefaultFavouritesService implements FavouritesServiceInterface {
  constructor(
    @inject(Component.Logger) private readonly logger: LoggerInterface,
    @inject(Component.FavouritesModel) private readonly favouritesModel: types.ModelType<FavouritesEntity>
  ) {}

  public async create(dto: CreateFavouritesDto): Promise<DocumentType<FavouritesEntity>> {
    const result = await this.favouritesModel.create(dto);
    this.logger.info(`New favourites created: ${dto.name}`);
    return result;
  }

  public async findByFavouritesId(categoryId: string): Promise<DocumentType<FavouritesEntity> | null> {
    return this.favouritesModel.findById(categoryId).exec();
  }

  public async findByFavouritesName(favouritesName: string): Promise<DocumentType<FavouritesEntity> | null> {
    return this.favouritesModel.findOne({name: favouritesName}).exec();
  }

  public async findByFavouritesNameOrCreate(favouritesName: string, dto: CreateFavouritesDto): Promise<DocumentType<FavouritesEntity>> {
    const existedFavourites = await this.findByFavouritesName(favouritesName);

    if (existedFavourites) {
      return existedFavourites;
    }

    return this.create(dto);
  }
}
