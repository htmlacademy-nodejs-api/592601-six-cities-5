import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { CoordinatesType, Offer } from '../../types/index.js';
import { HousingTypeEnum } from '../../enums/index.js';
import { ConvenienceType } from '../../types/convenience.type.js';
import { UserEntity } from '../user/index.js';

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

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public city!: string;

  @prop()
  public previewImage!: string;

  @prop()
  public imagesDescribe!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public ratio!: number;

  @prop() // {type: () => String, enum: HousingTypeEnum}
  public type!: HousingTypeEnum;

  @prop()
  public numberRooms!: number;

  @prop()
  public numberGuests!: number;

  @prop()
  public price!: number;

  @prop()
  public conveniences!: ConvenienceType[];

  @prop({
    ref: UserEntity,
    required: true,
    default: [],
    _id: false
  })
  public user!: UserEntity;

  @prop()
  public numberComments!: number;

  @prop()
  public coordinates!: CoordinatesType;
}

export const OfferModel = getModelForClass(OfferEntity);
