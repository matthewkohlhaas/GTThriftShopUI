import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

const EXPIRATION_TIME = 30 * 60 * 1000;
const TOKEN_EXPIRATION_MAPPING = 'TOKEN_EXPIRATION_MAPPING';

@Injectable()
export class LocalStorageService {

  constructor() {}

  public addAccessToken(token): void {
    const expiration = new Date().getTime() + EXPIRATION_TIME;
    const mapping = { 'token': token, 'expiration': expiration };
    localStorage.setItem(TOKEN_EXPIRATION_MAPPING, JSON.stringify(mapping));
    return;
  }

  public removeAccessToken(): void {
    localStorage.removeItem(TOKEN_EXPIRATION_MAPPING);
    return;
  }

  public getAccessToken(): string {
    const json_mapping = localStorage.getItem(TOKEN_EXPIRATION_MAPPING);
    if (json_mapping) {
      const mapping = JSON.parse(json_mapping);
      const current_time = new Date().getTime();
      if (mapping['expiration'] <= current_time) {
        return null;
      }
      return mapping['token'];
    }
    return null;
  }

}
