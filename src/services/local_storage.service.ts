import {Injectable} from '@angular/core';
// import {environment} from '../environments/environment';

const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days * 24 hours/day * 60 min/hour * 60 s/min * 1,000 ms/s
const ACCESS_TOKEN = 'access_token';
const IS_ADMIN = 'is_admin';

@Injectable()
export class LocalStorageService {

  constructor() {}

  public static addAccessToken(token, time_to_live?): void {
    if (!time_to_live) {
      time_to_live = EXPIRATION_TIME;
    }
    LocalStorageService.addItem(token, ACCESS_TOKEN, time_to_live);
  }

  public static removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  public static getAccessToken(): string {
    return LocalStorageService.getItem(ACCESS_TOKEN);
  }

  public static addIsAdmin(isAdmin, time_to_live?): void {
    let string = 'false';
    if (isAdmin === true) {
      string = 'true';
    }
    if (!time_to_live) {
      time_to_live = EXPIRATION_TIME;
    }
    LocalStorageService.addItem(string, IS_ADMIN, time_to_live);
  }

  public static removeIsAdmin(): void {
    localStorage.removeItem(IS_ADMIN);
  }

  public static getIsAdmin(): boolean {
    const result = LocalStorageService.getItem(IS_ADMIN);
    if (!result) {
      return null;
    } else {
      return result === 'true';
    }
  }

  private static addItem(item, label, time_to_live): void {
    const mapping = {};
    const expiration = new Date().getTime() + time_to_live;
    mapping[label] = item;
    mapping['expiration'] = expiration;
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
