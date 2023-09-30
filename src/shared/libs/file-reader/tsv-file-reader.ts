import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer } from '../../types/index.js';
// import { HousingTypeEnum, UserTypeEnum } from '../../enums/index.js';

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

  private toArray2() {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'));
  }

  // private toNumber(value: string, base: number): number {
  //   const parsed = Number.parseInt(value, base);
  //   if (Number.isNaN(parsed)) {
  //     return 0;
  //   }
  //   return parsed;
  // }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    console.log('this.toArray2()', this.toArray2());
    return (
      this.toArray2().map((
        [
          name,
          description
        ]
      ) => ({
        name,
        description
      }))
    );
  }
}

// [
//   {name: '', description: ''},
//   {name: '', description: ''}
// ]

/*this.rawData
  .split('\n')
  .filter((row) => row.trim().length > 0)
  .map((line) => line.split('\t'))
  .map((
    [
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
      password
      userType,
    ]
  ) => ({
    name,
    description,
    postDate: new Date(postDate),
    city,
    previewImage,
    imagesDescribe: ['', ''],
    isPremium,
    isFavorite,
    ratio: this.toNumber(price, 0),
    type: HousingTypeEnum['apartment'],
    numberRooms: this.toNumber(numberRooms, 2),
    numberGuests: this.toNumber(numberGuests, 3),
    price: this.toNumber(price, 0),
    conveniences: conveniences.split(';').map((item) => ({item})),
    user: {firstname, email, avatar, password, type: UserTypeEnum[userType as 'Ordinary' | 'Pro'] },
    numberComments: 0,
    coordinates: {latitude: 52.370216, longitude: 4.895168}
  }));*/
