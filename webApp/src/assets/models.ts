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
  id: string;
  interests: Array<InterestsCategory>;
  eventName: string;
  description: string;
  status: EventStatus;
  location: Location;
  organizerId: string;
  startDateAndTime: Date;
  endDateAndTime: Date;
  capacity: number;
  images: Array<string>;
  arModel: string;
  participantIds: Array<string>;
  createdDate: Date;
  ticketPrice: number;

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
  email: string;
  organizerId: string;
  eventId: string;
  seatCount: number;
  participantId: string;
  isCanceled: boolean;
  createdDate: Date;
  event: {
    startDateAndTime?: Date;
    endDateAndTime?: Date;
    capacity?: number;
    eventName?: string;
    eventImages?: Array<string>;
    eventStartDateAndTime?: Date;
    eventEndDateAndTime?: Date;
    interests?: Array<InterestsCategory>;
    location?: Location;
    arModel?: string;
    ticketPrice?: number;
  };
  organizer: {
    name?: string;
    email?: string;
  };

}

export class Location {
  latitude: number;
  longitude: number;
  address: string;
}
