import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {TokenMessage} from '../model/token-message';
import {Message} from '../model/message';

@Injectable()
export class AccountService {

  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }

  logout(): void {
    // TODO find some way to invalidate token?
    window.sessionStorage.token = null;
    this.isLoggedIn = false;
  }

  login(email: string, password: string): string {
    const message: Observable<TokenMessage> = this.http.post<TokenMessage>(environment.serverUrl + '/login',
      {email: email, password: password});

    let msg = 'Failed to log in';

    message.subscribe(res => {
      if (res !== null || res !== undefined) {
        if (res.successful) {
          window.sessionStorage.token = res.token;
          this.isLoggedIn = true;
        }
        if (res.text !== null) {
          msg = res.text;
        }
      }
    });
    return msg;
  }

  createAccount(email: string, password: string, firstName: string, lastName: string): Observable<Message> {
    return this.http.post<Message>(environment.serverUrl + '/create-account',
      {email: email, password: password, firstName: firstName, lastName: lastName});
  }

  verify(): void {
    if (window.sessionStorage.token) {
      const headers: HttpHeaders = new HttpHeaders().set('Authorization', window.sessionStorage.token);
      this.http.get<boolean>(environment.serverUrl + '/verify', {headers: headers})
        .subscribe(res => this.isLoggedIn = res);
    }
  }
}
