import { User } from './user.type.js';
import { CoordinatesType } from './coordinates.type.js';
import { HousingTypeEnum } from '../enums/index.js';
import { ConvenienceType } from './convenience.type.js';

export type Offer = {
  name: string;
  description: string;
  postDate: Date;
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
  conveniences: ConvenienceType[];
  user: User;
  numberComments: number,
  coordinates: CoordinatesType
}
