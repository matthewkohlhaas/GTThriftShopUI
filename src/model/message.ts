import {User} from './user';
import {Listing} from './listing';

export class Message {
  sendingUser: User;
  receivingUser: User;
  listing: Listing;
  message: string;
  createdAt: Date;
}
