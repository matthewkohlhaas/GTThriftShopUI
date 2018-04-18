import {User} from './user';
import {Offer} from './offer';
import {Question} from './question';

export class Listing {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  user: User;
  userRating: number;
  createAt: Date;
  questions: Question[];
  offers: Offer[];
}
