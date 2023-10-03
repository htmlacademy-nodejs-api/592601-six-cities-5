import { Offer } from '../types/index.js';
import { UserTypeEnum } from '../enums/index.js';

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
    userType
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    firstname, email, avatar, password, type: userType === UserTypeEnum.Ordinary ? UserTypeEnum.Ordinary : UserTypeEnum.Pro
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
    ratio: this.toNumber(ratio, 0),
    type: this.getOfferType(String(type)),
    numberRooms: this.toNumber(numberRooms, 2),
    numberGuests: this.toNumber(numberGuests, 3),
    price: this.toNumber(price, 0),
    conveniences: conveniences.split(';').map((convenience) => ({convenience})),
    user,
    numberComments: 0,
    coordinates: this.getCoordinatesByCity(city)
  };
}
