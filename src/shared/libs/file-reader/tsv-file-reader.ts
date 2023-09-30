import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { CoordinatesType, Offer } from '../../types/index.js';
import { UserTypeEnum } from '../../enums/index.js';

export class TSVFileReader implements FileReader {
  private rawData: string = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    try {
      this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
      console.log('rawData', this.rawData);
    } catch (error) {
      console.error(`Failed to read version from ${this.filename}`);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  private toArray() {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'));
  }

  private toNumber(value: string, base: number): number {
    const parsed = Number.parseInt(value, base);
    if (Number.isNaN(parsed)) {
      return 0;
    }
    return parsed;
  }

  getCoordinatesByCity(city: string): CoordinatesType {
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

  public getOffer(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    console.log('this.toArray()', this.toArray());
    return (
      this.toArray().map((
        [
          name,
          description,
          postDate,
          city,
          previewImage,
          // imagesDescribe,
          isPremium,
          isFavorite,
          ratio,
          // type,
          numberRooms,
          numberGuests,
          price,
          // conveniences,
          firstname,
          email,
          avatar,
          password,
          userType,
        ]
      ) => ({
        name,
        description,
        postDate: new Date(postDate),
        city,
        previewImage,
        // imagesDescribe: imagesDescribe.split(', ').map((item) => ({item})),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        ratio: this.toNumber(ratio, 0),
        // type: HousingTypeEnum[type],
        numberRooms: this.toNumber(numberRooms, 2),
        numberGuests: this.toNumber(numberGuests, 3),
        price: this.toNumber(price, 0),
        // conveniences: conveniences.split(';').map((item) => ({item})),
        user: {firstname, email, avatar, password, type: UserTypeEnum[userType as 'Ordinary' | 'Pro'] },
        numberComments: 0,
        coordinates: this.getCoordinatesByCity(city)
      }))
    );
  }
}
