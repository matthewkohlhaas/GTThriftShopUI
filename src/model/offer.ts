import {User} from './user';
import {Listing} from './listing';
import {Message} from './message';

export class Offer {
  _id: string;
  user: User;
  listing: Listing;
  price: number;
  messages: Message[];
  createdAt: Date;
}
