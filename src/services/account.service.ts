import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerTokenMessage} from '../model/server-token-message';
import {ServerMessage} from '../model/server-message';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {LocalStorageService} from './local_storage.service';

const EMAIL_REGEX: RegExp = new RegExp('^(?:[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)'
  + '*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@gatech.edu$');
const MIN_PASSWORD_LENGTH = 8;
const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class AccountService {

  public static getEmailRegex(): RegExp {
    return EMAIL_REGEX;
  }

  public static getMinPasswordLength(): number {
    return MIN_PASSWORD_LENGTH;
  }

  public static validateEntry(entry: string, validator: (str: string) => boolean): boolean {
    const trimmedEntry: string = (entry) ? entry.trim() : '';
    return validator(trimmedEntry);
  }

  public static validateNotEmpty(entry: string): boolean {
    return this.validateEntry(entry, str => str !== '');
  }

  public static validateEmail(entry: string): boolean {
    return AccountService.validateEntry(entry, str => {
      return AccountService.getEmailRegex().test(str);
    });
  }

  public static validatePassword(entry: string): boolean {
    return AccountService.validateEntry(entry, str => {
      return str.length >= AccountService.getMinPasswordLength();
    });
  }

  constructor(private http: HttpClient,
              private router: Router) {}

  public logout(): void {
    LocalStorageService.removeAccessToken();
    this.router.navigate(['']);
  }

  public login(email: string, password: string, route: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerTokenMessage>(environment.serverUrl + '/login', {email: email, password: password})
      .subscribe(res => {
        if (res) {
          if (res.successful) {
            LocalStorageService.addAccessToken(res.token);
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

    this.http.post<ServerMessage>(environment.serverUrl + '/create-account',
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

    this.http.post<ServerMessage>(environment.serverUrl + '/resend-verification', {email: email})
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
    this.http.get<ServerMessage>(environment.serverUrl + '/verify/' + token)
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

  public authenticate(next: (isAuthenticated: boolean) => void): void {
    if (!LocalStorageService.getAccessToken()) {
      next(false);
    } else {
      this.http.get<boolean>(environment.serverUrl + '/authenticate')
        .subscribe(res => {
          next(res);
        }, err => {
          next(err.error);
        });
    }
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.serverUrl + '/profile');
  }
}
