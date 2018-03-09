import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerTokenMessage} from '../model/server-token-message';
import {ServerMessage} from '../model/server-message';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {LocalStorageService} from './local-storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AdminService} from './admin.service';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private adminService: AdminService) {}

  public logout(): void {
    LocalStorageService.removeAccessToken();
    LocalStorageService.removeIsAdmin();
    this.router.navigate(['']);
  }

  public login(email: string, password: string, route: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerTokenMessage>(environment.serverUrl + '/users/login', {email: email, password: password})
      .subscribe(res => {
        if (res) {
          if (res.successful) {
            LocalStorageService.addAccessToken(res.token);
            this.adminService.setIsAdminStatus();
            this.router.navigate([route]);
          }
          next(new ServerMessage(res.successful, res.text));
        }
      }, err => {
        LocalStorageService.removeAccessToken();
        if (err.status === 0) {
          next(new ServerMessage(false, COULD_NOT_CONNECT));
        } else {
          next(new ServerMessage(err.error.successful, err.error.text));
        }
      });
  }

  public createAccount(email: string, password: string, firstName: string, lastName: string,
                       next?: (msg: ServerMessage) => void): void {

    this.http.post<ServerMessage>(environment.serverUrl + '/users',
      {email: email, password: password, firstName: firstName, lastName: lastName})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            console.log(err);
            next(err.error);
          }
        }
      );
  }

  public resendVerificationEmail(email: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/users/send-verification', {email: email})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            next(err.error);
          }
        }
      );
  }

  public verify(token: string, next?: (msg: ServerMessage) => void): void {
    this.http.get<ServerMessage>(environment.serverUrl + '/users/verify/' + token)
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            next(err.error);
          }
        }
      );
  }

  public sendPasswordResetEmail(email: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/users/send-password-reset', {email: email})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            next(err.error);
          }
        }
      );
  }

  public resetPassword(token: string, password: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/users/reset-password',
      {token: token, password: password}).subscribe(res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            next(err.error);
          }
        }
      );
  }

  public authenticate(next: (isAuthenticated: boolean) => void): void {
    if (!this.isAccessTokenAlive()) {
      next(false);
    } else {
      this.http.get<boolean>(environment.serverUrl + '/users/authenticate')
        .subscribe(res => {
          this.adminService.setIsAdminStatus();
          next(res);
        }, err => {
          next(err.error);
        });
    }
  }

  public isAccessTokenAlive(): boolean {
    const token: string = LocalStorageService.getAccessToken();
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }
    return false;
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.serverUrl + '/users/from-token');
  }

  public updateFirstName(firstName: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/users/from-token/first-name',
      {firstName: firstName})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            console.log(err);
            next(err.error);
          }
        }
      );
  }

  public updateLastName(lastName: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/users/from-token/last-name',
      {lastName: lastName})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            console.log(err);
            next(err.error);
          }
        }
      );
  }

  public updateProfilePictureUrl(profilePictureUrl: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/users/from-token/profile-picture-url',
      {profilePictureUrl: profilePictureUrl})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            console.log(err);
            next(err.error);
          }
        }
      );
  }

  public updateProfileBio(profileBio: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/users/from-token/profile-bio',
      {profileBio: profileBio})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            console.log(err);
            next(err.error);
          }
        }
      );
  }
}
