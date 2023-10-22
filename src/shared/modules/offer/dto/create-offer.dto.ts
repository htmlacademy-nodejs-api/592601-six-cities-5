import { HousingTypeEnum } from '../../../enums/index.js';
import { ConvenienceType } from '../../../types/convenience.type.js';
import { CoordinatesType } from '../../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public previewImage: string;
  public imagesDescribe: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public ratio: number;
  public type: HousingTypeEnum;
  public numberRooms: number;
  public numberGuests: number;
  public price: number;
  public conveniences: ConvenienceType[];
  public userId: string;
  public numberComments: number;
  public coordinates: CoordinatesType;
}
