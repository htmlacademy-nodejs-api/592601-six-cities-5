import { HousingTypeEnum } from '../enums/housing-type.enum.js';
import { ConveniencesEnum } from '../enums/conveniences.enum.js';
import { User } from './user.type.js';
import { CoordinatesType } from './coordinates.type.js';

export type Offer = {
  name: string;
  description: string;
  postDate: string | Date;
  city: string;
  previewImage: string;
  imagesDescribe: string[];
  isPremium: boolean;
  isFavorite: boolean;
  ratio: number;
  type: HousingTypeEnum,
  numberRooms: number,
  numberGuests: number,
  price: number;
  conveniences: ConveniencesEnum[];
  user: User;
  numberComments: number,
  coordinates: CoordinatesType
}
