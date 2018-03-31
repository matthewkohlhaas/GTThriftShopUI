export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  positiveRatings: number;
  totalRatings: number;
  profilePictureUrl: string;
  profileBio: string;
  blockedUsers: User[];
}
