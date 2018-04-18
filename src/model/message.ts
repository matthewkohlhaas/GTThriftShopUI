import {User} from './user';

export class Message {
  author: User | string;
  text: string;
}
