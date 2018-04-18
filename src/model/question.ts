import {User} from './user';
import {Listing} from './listing';

export class Question {
  _id: string;
  user: User;
  listing: Listing | string;
  question: string;
  answer: string;
  createdAt: Date;
}
