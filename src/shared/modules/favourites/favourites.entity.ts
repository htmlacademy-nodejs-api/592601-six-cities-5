import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Favourites } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FavouritesEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favourites',
    timestamps: true
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FavouritesEntity extends defaultClasses.TimeStamps implements Favourites {
  @prop({required: true, trim: true})
  public name!: string;
}

export const FavouritesModel = getModelForClass(FavouritesEntity);
