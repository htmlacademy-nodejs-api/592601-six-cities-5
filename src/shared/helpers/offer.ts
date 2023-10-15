import { Offer } from '../types/index.js';
import { UserTypeEnum } from '../enums/index.js';
import { getCoordinatesByCity, getOfferType, toNumber } from './common.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    postDate,
    city,
    previewImage,
    imagesDescribe,
    isPremium,
    isFavorite,
    ratio,
    type,
    numberRooms,
    numberGuests,
    price,
    conveniences,
    firstname,
    email,
    avatar,
    password,
    userType,
    numberComments
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    firstname,
    email,
    avatar,
    password,
    type: userType === UserTypeEnum.Ordinary ? UserTypeEnum.Ordinary : UserTypeEnum.Pro
  };

  return {
    name,
    description,
    postDate: new Date(postDate),
    city,
    previewImage,
    imagesDescribe: imagesDescribe.split(', ').map((item) => (item)),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    ratio: toNumber(ratio, 0),
    type: getOfferType(String(type)),
    numberRooms: +numberRooms,
    numberGuests: +numberGuests,
    price: +price,
    conveniences: conveniences.split(';').map((convenience) => ({convenience})),
    user,
    numberComments: +numberComments,
    coordinates: getCoordinatesByCity(city)
  };
}
