import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.serverUrl}/users/${id}`);
  }

  public getUsers(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.serverUrl}/users/all-users/${id}`);
  }
}
