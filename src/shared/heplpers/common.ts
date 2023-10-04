import { CoordinatesType } from '../types/index.js';
import { HousingTypeEnum } from '../enums/index.js';

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? `Error info: ${error.message}` : '';
}

export function getCoordinatesByCity(city: string): CoordinatesType {
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

export function getOfferType(typeString: string): HousingTypeEnum {
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

export function toNumber(value: string, base: number): number {
  const parsed = Number.parseInt(value, base);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

