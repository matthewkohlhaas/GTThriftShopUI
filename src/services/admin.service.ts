import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';
import {LocalStorageService} from './local_storage.service';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {}

  public isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(environment.serverUrl + '/is-admin');
  }

  public registerAdmin(email_address): Observable<ServerMessage> {
    return this.http.post<ServerMessage>(environment.serverUrl + '/admin/register',
      {email: email_address});
  }

  public banUser(email_address): Observable<ServerMessage> {
    return this.http.post<ServerMessage>(environment.serverUrl + '/user/ban', {email: email_address});
  }

  public unbanUser(email_address): Observable<ServerMessage> {
    return this.http.post<ServerMessage>(environment.serverUrl + '/user/unban', {email: email_address});
  }

  public setIsAdminStatus(): void {
    this.isAdmin().subscribe(res => {
      if (res != null) {
        LocalStorageService.addIsAdmin(res);
      }
    });
  }

}
