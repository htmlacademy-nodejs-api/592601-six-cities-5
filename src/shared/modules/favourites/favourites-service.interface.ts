import { DocumentType } from '@typegoose/typegoose';
import { CreateFavouritesDto } from './dto/create-favourites.dto.js';
import { FavouritesEntity } from './favourites.entity.js';

export interface FavouritesServiceInterface {
  create(dto: CreateFavouritesDto): Promise<DocumentType<FavouritesEntity>>;
  findByFavouritesId(categoryId: string): Promise<DocumentType<FavouritesEntity> | null>;
  findByFavouritesName(categoryName: string): Promise<DocumentType<FavouritesEntity> | null>;
  findByFavouritesNameOrCreate(categoryName: string, dto: CreateFavouritesDto): Promise<DocumentType<FavouritesEntity>>;
}
