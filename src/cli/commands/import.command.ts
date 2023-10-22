import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { LoggerInterface } from '../../shared/logger/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { DefaultOfferService, OfferModel, OfferServiceInterface } from '../../shared/modules/offer/index.js';
import { UserServiceInterface } from '../../shared/modules/user/user-service.interface.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';

export class ImportCommand implements Command {

  // private favouritesService!: FavouritesServiceInterface;
  private offerService: OfferServiceInterface;
  private userService: UserServiceInterface;
  private databaseClient: DatabaseClient;
  private logger: LoggerInterface;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    // this.favouritesService = new DefaultFavouritesService(this.logger, FavouritesModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    // const categories: string[] = [];
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    // for (const { name } of offer.categories) {
    //   const existCategory = await this.categoryService.findByCategoryNameOrCreate(name, { name });
    //   categories.push(existCategory.id);
    // }

    await this.offerService.create({
      name: offer.name,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      previewImage: offer.previewImage,
      imagesDescribe: offer.imagesDescribe,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      ratio: offer.ratio,
      type: offer.type,
      numberRooms: offer.numberRooms,
      numberGuests: offer.numberGuests,
      price: offer.price,
      conveniences: offer.conveniences,
      userId: user.id,
      numberComments: offer.numberComments,
      coordinates: offer.coordinates
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }
      console.error(getErrorMessage(err));
    }
  }
}
