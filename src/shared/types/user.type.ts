import { UserTypeEnum } from '../enums/index.js';

export type User = {
  firstname: string;
  email: string;
  avatar: string;
  password: string;
  type: UserTypeEnum;
}
