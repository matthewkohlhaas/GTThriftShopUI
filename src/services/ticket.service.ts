import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';
import {Router} from '@angular/router';

const COULD_NOT_CONNECT = 'Could not connect to server.';
const TOKEN_NAME = 'ACCESS_TOKEN';


@Injectable()
export class TicketService {

  constructor(private http: HttpClient, private router: Router) {}

  createTicket(subject: string, message: string,
                next?: (msg: ServerMessage) => void): void {

    this.http.post<ServerMessage>(environment.serverUrl + '/create-ticket',
      {subject: subject, message: message})
      .subscribe(
        res => {
          next(res);
        }, err => {
          next(new ServerMessage(false, COULD_NOT_CONNECT));
        }
      );
  }

  authenticate(next: (isAuthenticated: boolean) => void): void {
    if (localStorage.getItem(TOKEN_NAME)) {
      this.http.get<boolean>(environment.serverUrl + '/verify')
        .subscribe(res => {
          next(res);
        }, err => {
          next(err);
        });
    }
  }
}
