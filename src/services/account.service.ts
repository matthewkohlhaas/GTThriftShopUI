import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerTokenMessage} from '../model/server-token-message';
import {ServerMessage} from '../model/server-message';
import {Router} from '@angular/router';

const EMAIL_REGEX: RegExp = new RegExp('^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"'
  + '(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@gatech.edu$');
const MIN_PASSWORD_LENGTH = 8;
const TOKEN_NAME = 'ACCESS_TOKEN';
const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class AccountService {

  static getEmailRegex(): RegExp {
    return EMAIL_REGEX;
  }

  static getMinPasswordLength(): number {
    return MIN_PASSWORD_LENGTH;
  }

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    // TODO find some way to invalidate token?
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['']);
  }

  login(email: string, password: string, route: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerTokenMessage>(environment.serverUrl + '/login', {email: email, password: password})
      .subscribe(res => {
        if (res) {
          if (res.successful) {
            localStorage.setItem(TOKEN_NAME, res.token);
            this.router.navigate([route]);
          }
          next(new ServerMessage(res.successful, res.text));
        }
      }, err => {
        localStorage.removeItem(TOKEN_NAME);

        if (err.status === 401) {
          next(new ServerMessage(err.error.successful, err.error.text));
        } else {
          next(new ServerMessage(false, COULD_NOT_CONNECT));
        }
      });
  }


  createAccount(email: string, password: string, firstName: string, lastName: string,
                next?: (msg: ServerMessage) => void): void {

    this.http.post<ServerMessage>(environment.serverUrl + '/create-account',
      {email: email, password: password, firstName: firstName, lastName: lastName})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 503) {
            next(err);
          } else {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          }
        }
      );
  }

  authenticate(next: (isAuthenticated: boolean) => void): void {
    if (localStorage.getItem(TOKEN_NAME)) {
      this.http.get<boolean>(environment.serverUrl + '/authenticate')
        .subscribe(res => {
          next(res);
        }, err => {
          next(err);
        });
    }
  }
}
