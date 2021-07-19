import { UserType, InterestsCategory, EventStatus } from './enums';

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
  status: EventStatus;
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
    this.capacity = 50;
  }
}

export class Booking {
  id: string;
  name: string;
  organizerId: string;
  eventId: string;
  seatCount: number;
  participantId: string;
  isCanceled: boolean;
  event: {
    startDateAndTime?: Date;
    endDateAndTime?: Date;
    capacity?: number;
    eventName?: string
  };

}
