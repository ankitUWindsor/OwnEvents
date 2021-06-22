import { UserType } from './enums';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;

  constructor() {}
}
