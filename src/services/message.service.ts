import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {Message} from '../model/message';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';
import {Listing} from '../model/listing';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) {}

  public getMessages(listingId: string, firstUserId: string, secondUserId: string): Observable<Message[]> {
    return this.http.get<Message[]>(environment.serverUrl + '/messages/' + listingId + '/' + firstUserId + '/' + secondUserId);
  }

  sendMessage(listing: Listing, receivingUser: User, sendingUser: User, message: string,
                next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/messages',
      {listing: listing, receivingUser: receivingUser, sendingUser: sendingUser, message: message})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            next(new ServerMessage(err.error.successful, err.error.text));
          }
        }
      );
  }

}

