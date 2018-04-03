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

  public getMessagesAboutListing(listing: Listing, currentUserId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.serverUrl}/messages/${listing._id}/users/${currentUserId}`);
  }

  public getMessages(listing: Listing, currentUserId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.serverUrl}/messages/${listing._id}/${listing.user._id}/${currentUserId}`);
  }

  public getAllMessagesForUser(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.serverUrl}/messages/users/${id}`);
  }

  sendMessage(listing: Listing, sendingUserId: string, receivingUser: string, message: string,
                next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/messages',
      {listing: listing._id, sendingUser: sendingUserId, receivingUser: listing.user._id, message: message})
      .subscribe(
        res => {
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

