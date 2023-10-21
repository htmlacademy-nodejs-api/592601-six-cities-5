import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Offer } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({required: true, trim: true})
  public name!: string;
}

export const OfferModel = getModelForClass(OfferEntity);
