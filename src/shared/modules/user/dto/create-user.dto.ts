import { UserTypeEnum } from '../../../enums/index.js';

// Использует классы, а не интерфейсы, так как мы их будем
// использовать в рантайме. Если бы использовали интерфейс,
// то в рантайме от них бы ничего не осталось.
// dto - это обычные транспортные объекты
export class CreateUserDto {
  public firstname: string;
  public email: string;
  public avatar: string;
  public type: UserTypeEnum;
  public password: string;
}
