import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class FlagService {

  constructor(private http: HttpClient) {}

  public flagListing(id: string, reason: string, next?: (msg: ServerMessage) => void): void {
    this.flag(id, reason, 'listing-flags', next);
  }

  public flagUser(id: string, reason: string, next?: (msg: ServerMessage) => void): void {
    this.flag(id, reason, 'user-flags', next);
  }

  private flag(id: string, reason: string, route: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(`${environment.serverUrl}/flags/${route}`,
      {reason: reason, id: id})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            next(err.error);
          }
        }
      );
  }
}
