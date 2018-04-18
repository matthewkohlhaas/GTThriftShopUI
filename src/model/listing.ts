import {User} from './user';
import {Offer} from './offer';
import {Question} from './question';

export class Listing {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  user: User;
  userRating: number;
  questions: Question[];
  offers: Offer[];
}
