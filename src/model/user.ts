import {Offer} from './offer';
import {Listing} from './listing';
import {Question} from './question';

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  positiveRatings: number;
  totalRatings: number;
  profilePictureUrl: string;
  profileBio: string;
  listings: Listing[];
  questions: Question[];
  offers: Offer[];
  blockedUsers: User[];
}
