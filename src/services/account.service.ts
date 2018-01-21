import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {TokenMessage} from '../model/token-message';
import {Message} from '../model/message';

const TOKEN_NAME = 'ACCESS_TOKEN';

@Injectable()
export class AccountService {

  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }

  logout(): void {
    // TODO find some way to invalidate token?
    localStorage.removeItem(TOKEN_NAME);
    this.isLoggedIn = false;
  }

  login(email: string, password: string, next?: (msg: Message) => void): void {
    this.http.post<TokenMessage>(environment.serverUrl + '/login', {email: email, password: password})
      .subscribe(res => {
        if (res) {
          if (res.successful) {
            localStorage.setItem(TOKEN_NAME, res.token);
            this.isLoggedIn = true;
          }
          next(new Message(res.successful, res.text));
        }
      }, err => {
        localStorage.removeItem(TOKEN_NAME);
        this.isLoggedIn = false;

        if (err.status === 401) {
          next(new Message(err.error.successful, err.error.text));
        } else {
          next(new Message(false, 'Could not connect to server.'));
        }
      });
  }


  createAccount(email: string, password: string, firstName: string, lastName: string): Observable<Message> {
    return this.http.post<Message>(environment.serverUrl + '/create-account',
      {email: email, password: password, firstName: firstName, lastName: lastName});
  }

  verify(): void {
    this.http.get<boolean>(environment.serverUrl + '/verify')
      .subscribe(res => this.isLoggedIn = res, err => this.isLoggedIn = false);
  }
}
