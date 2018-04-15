import {User} from './user';
import {Offer} from './offer';

export class Listing {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  user: User;
  userRating: number;
  offers: Offer[];
}
