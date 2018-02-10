import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {}

  public isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(environment.serverUrl + '/isAdmin');
  }
}
