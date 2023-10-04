import { CoordinatesType, Offer } from '../types/index.js';
import { HousingTypeEnum, UserTypeEnum } from '../enums/index.js';

function getCoordinatesByCity(city: string): CoordinatesType {
  let coordinates;
  switch (city){
    case 'Paris':
      coordinates = {latitude: 48.85661, longitude: 2.351499};
      break;
    case 'Cologne':
      coordinates = {latitude: 50.938361, longitude: 6.959974};
      break;
    case 'Brussels':
      coordinates = {latitude: 50.846557, longitude: 4.351697};
      break;
    case 'Amsterdam':
      coordinates = {latitude: 52.370216, longitude: 4.895168};
      break;
    case 'Hamburg':
      coordinates = {latitude: 53.550341, longitude: 10.000654};
      break;
    case 'Dusseldorf':
      coordinates = {latitude: 51.225402, longitude: 6.776314};
      break;
    default:
      coordinates = {latitude: 52.370216, longitude: 4.895168};
  }
  return coordinates;
}

function getOfferType(typeString: string): HousingTypeEnum {
  let type;
  if (typeString === HousingTypeEnum.Apartment) {
    type = HousingTypeEnum.Apartment;
  } else if (typeString === HousingTypeEnum.House) {
    type = HousingTypeEnum.House;
  } else if(typeString === HousingTypeEnum.Room) {
    type = HousingTypeEnum.Room;
  } else if(typeString === HousingTypeEnum.Hotel) {
    type = HousingTypeEnum.Hotel;
  } else {
    type = HousingTypeEnum.unknown;
  }
  return type;
}

// function toArray() {
//   return this.rawData
//     .split('\n')
//     .filter((row) => row.trim().length > 0)
//     .map((line) => line.split('\t'));
// }

function toNumber(value: string, base: number): number {
  const parsed = Number.parseInt(value, base);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
}
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
    numberRooms: toNumber(numberRooms, 2),
    numberGuests: toNumber(numberGuests, 3),
    price: toNumber(price, 0),
    conveniences: conveniences.split(';').map((convenience) => ({convenience})),
    user,
    numberComments: 0,
    coordinates: getCoordinatesByCity(city)
  };
}
