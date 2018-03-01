import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) {}

  createTicket(subject: string, message: string, next?: (msg: ServerMessage) => void): void {

    this.http.post<ServerMessage>(environment.serverUrl + '/tickets',
      {subject: subject, message: message})
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
