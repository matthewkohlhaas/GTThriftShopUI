import {Injectable} from '@angular/core';

const DEFAULT_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days * 24 hours/day * 60 min/hour * 60 s/min * 1,000 ms/s
const ACCESS_TOKEN = 'accessToken';
const IS_ADMIN = 'isAdmin';

@Injectable()
export class LocalStorageService {

  constructor() {}

  public static addAccessToken(token: string, timeToLive?: number): void {
    if (!timeToLive) {
      timeToLive = DEFAULT_TIME;
    }
    LocalStorageService.addItem(token, ACCESS_TOKEN, timeToLive);
  }

  public static removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  public static getAccessToken(): string {
    return LocalStorageService.getItem(ACCESS_TOKEN);
  }

  public static addIsAdmin(isAdmin: boolean, timeToLive?: number): void {
    if (!timeToLive) {
      timeToLive = DEFAULT_TIME;
    }
    LocalStorageService.addItem(isAdmin, IS_ADMIN, timeToLive);
  }

  public static removeIsAdmin(): void {
    localStorage.removeItem(IS_ADMIN);
  }

  public static getIsAdmin(): boolean {
    return LocalStorageService.getItem(IS_ADMIN);
  }

  private static addItem(item: any, label: string, timeToLive: number): void {
    const mapping: object = {};
    const expiration: number = new Date().getTime() + timeToLive;
    mapping[label] = item;
    mapping['expiration'] = expiration;
    localStorage.setItem(label, JSON.stringify(mapping));
    return;
  }

  private static getItem(label: string): any {
    const json_mapping: string = localStorage.getItem(label);
    if (json_mapping) {
      const mapping: object = JSON.parse(json_mapping);
      const current_time: number = new Date().getTime();
      if (mapping['expiration'] <= current_time) {
        return null;
      }
      return mapping[label];
    }
    return null;
  }

}
