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

export class Event {
  interests: Array<InterestsCategory>;
  eventName: string;
  description: string;
  status: 1;
  location: string;
  organizerId: string;
  startDateAndTime: Date;
  endDateAndTime: Date;
  capacity: number;
  images: Array<string>;
  participantIds: Array<string>;

  constructor() {
    this.interests = [];
    this.images = [];
    this.participantIds = [];
  }
}
