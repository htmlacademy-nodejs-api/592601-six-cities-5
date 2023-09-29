import { UserTypeEnum } from '../enums/user-type.enum.js';

export type User = {
  firstname: string;
  email: string;
  avatar: string;
  password: string;
  type: UserTypeEnum;
}
