import { UserType, InterestsCategory } from './enums';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  interests: Array<InterestsCategory>;
  createdDate: string;

  constructor() {
    this.interests = [];
   }
}
