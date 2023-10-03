import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem } from '../../heplpers/index.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    // const categories = getRandomItems<string>(this.mockData.categories).join(';');
    const title = getRandomItem<string>(this.mockData.titles);
    const type = getRandomItem<string>(this.mockData.type);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const photo = getRandomItem<string>(this.mockData.offerImages);
    // const type = getRandomItem([OfferType.Buy, OfferType.Sell]);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const author = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const [firstname, lastname] = author.split(' ');

    return [
      title,
      description,
      createdDate,
      photo,
      type,
      price,
      // categories,
      firstname,
      lastname,
      email,
      avatar,

      // name,
      // description,
      // postDate,
      // city,
      // previewImage,
      // imagesDescribe,
      // isPremium,
      // isFavorite,
      // ratio,
      // type,
      // numberRooms,
      // numberGuests,
      // price,
      // conveniences,
      // firstname,
      // email,
      // avatar,
      // password,
      // userType
    ].join('\t');
  }
}
