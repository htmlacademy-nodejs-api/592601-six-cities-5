import { UserTypeEnum } from '../enums/index.js';

export type User = {
  firstname: string;
  email: string;
  avatar: string;
  type: UserTypeEnum;
}
