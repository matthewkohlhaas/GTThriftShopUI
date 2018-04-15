import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerMessage} from '../model/server-message';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Message} from '../model/message';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class OfferService {

  constructor(private http: HttpClient) { }

  public getMessages(offerId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.serverUrl}/offers/${offerId}/messages`);
  }

  public postMessage(offerId: string, message: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(`${environment.serverUrl}/offers/${offerId}/messages`,
      {
        text: message
      }).subscribe(
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
