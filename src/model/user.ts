import {Offer} from './offer';
import {Listing} from './listing';

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
  offers: Offer[];
  blockedUsers: User[];
}
