import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AccountService {

  loggedInUser: User;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedInUser !== null && this.loggedInUser !== undefined;
  }

  logIn(email: string, password: string): Observable<User> {
    const response: Observable<User> = this.http.post<User>(environment.serverUrl + '/log-in',
      {email: email, password: password});

    response.subscribe(user => this.loggedInUser = user);

    return response;
  }

  createAccount(email: string, password: string, firstName: string, lastName: string): Observable<boolean> {
    return this.http.post<boolean>(environment.serverUrl + '/register',
      {email: email, password: password, firstName: firstName, lastName: lastName});
  }
}
