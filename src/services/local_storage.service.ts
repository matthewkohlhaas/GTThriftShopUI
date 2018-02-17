import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes * 60 seconds/minute * 1,000 ms/second
const ACCESS_TOKEN = 'access_token';
const IS_ADMIN = 'is_admin';

@Injectable()
export class LocalStorageService {

  constructor() {}

  public static addAccessToken(token): void {
    this.addItem(token, ACCESS_TOKEN);
  }

  public static removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  public static getAccessToken(): string {
    return this.getItem(ACCESS_TOKEN);
  }

  public static addIsAdmin(isAdmin): void {
    this.addItem(isAdmin, IS_ADMIN);
  }

  public static removeIsAdmin(): void {
    localStorage.removeItem(IS_ADMIN);
  }

  public static getIsAdmin(): string {
    return this.getItem(IS_ADMIN);
  }

  private static addItem(item, label): void {
    const expiration = new Date().getTime() + EXPIRATION_TIME;
    const mapping = { label: item, 'expiration': expiration };
    localStorage.setItem(label, JSON.stringify(mapping));
    return;
  }

  private static getItem(label): string {
    const json_mapping = localStorage.getItem(label);
    if (json_mapping) {
      const mapping = JSON.parse(json_mapping);
      const current_time = new Date().getTime();
      if (mapping['expiration'] <= current_time) {
        return null;
      }
      return mapping[label];
    }
    return null;
  }

}
