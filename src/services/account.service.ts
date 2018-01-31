import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerTokenMessage} from '../model/server-token-message';
import {ServerMessage} from '../model/server-message';

const EMAIL_REGEX: RegExp = /^.+@gatech.edu$/i;
const MIN_PASSWORD_LENGTH = 8;
const TOKEN_NAME = 'ACCESS_TOKEN';
const COULD_NOT_CONNECT = 'Could not connect to server.';


@Injectable()
export class AccountService {

  isLoggedIn: boolean;

  static getEmailRegex(): RegExp {
    return EMAIL_REGEX;
  }

  static getMinPasswordLength(): number {
    return MIN_PASSWORD_LENGTH;
  }

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }

  logout(): void {
    // TODO find some way to invalidate token?
    localStorage.removeItem(TOKEN_NAME);
    this.isLoggedIn = false;
  }

  login(email: string, password: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerTokenMessage>(environment.serverUrl + '/login', {email: email, password: password})
      .subscribe(res => {
        if (res) {
          if (res.successful) {
            localStorage.setItem(TOKEN_NAME, res.token);
            this.isLoggedIn = true;
          }
          next(new ServerMessage(res.successful, res.text));
        }
      }, err => {
        localStorage.removeItem(TOKEN_NAME);
        this.isLoggedIn = false;

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
          next(new ServerMessage(false, COULD_NOT_CONNECT));
        }
      );
  }

  verify(): void {
    this.http.get<boolean>(environment.serverUrl + '/verify')
      .subscribe(res => this.isLoggedIn = res, err => this.isLoggedIn = false);
  }
}
