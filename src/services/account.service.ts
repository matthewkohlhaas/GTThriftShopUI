import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {TokenMessage} from '../model/token-message';
import {Message} from '../model/message';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
      .catch(res => {
        // TODO deal with 500's

        localStorage.removeItem(TOKEN_NAME);
        this.isLoggedIn = false;
        next(new Message(res.error.successful, res.error.text));
        return Observable.throw('unauthorized');

    }).subscribe(res => {
        if (res) {
          if (res.successful) {
            localStorage.setItem(TOKEN_NAME, res.token);
            this.isLoggedIn = true;
          }
          next(new Message(res.successful, res.text));
        }
      });
  }


  createAccount(email: string, password: string, firstName: string, lastName: string): Observable<Message> {
    return this.http.post<Message>(environment.serverUrl + '/create-account',
      {email: email, password: password, firstName: firstName, lastName: lastName});
  }

  verify(): void {
    this.http.get<boolean>(environment.serverUrl + '/verify').subscribe(res => this.isLoggedIn = res);
  }
}
