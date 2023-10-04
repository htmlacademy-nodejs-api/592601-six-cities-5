import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem } from '../../heplpers/index.js';
import { HousingTypeEnum, UserTypeEnum } from '../../enums/index.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    console.log('postDate', postDate);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const imagesDescribe = getRandomItem<string>(this.mockData.imagesDescribe);

    const isPremium = getRandomItem([true, false]);
    const isFavorite = getRandomItem([true, false]);
    const ratio = generateRandomValue(1, 5, 1);

    const type = getRandomItem([HousingTypeEnum.House, HousingTypeEnum.Room, HousingTypeEnum.Apartment, HousingTypeEnum.Hotel]);
    const numberRooms = generateRandomValue(1, 5);
    const numberGuests = generateRandomValue(1, 6);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const conveniences = getRandomItem<string>(this.mockData.conveniences);

    const author = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);

    const numberComments = generateRandomValue(0, 10);
    const firstname = author.split(' ')[0];
    const userType = getRandomItem([UserTypeEnum.Pro, UserTypeEnum.Ordinary]);
    return [
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
      numberComments,
    ].join('\t');
  }
}
