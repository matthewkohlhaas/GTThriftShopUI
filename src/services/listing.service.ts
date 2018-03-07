import {Injectable} from '@angular/core';
import {Listing} from '../model/listing';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class ListingService {

  constructor(private http: HttpClient) {}

  public getListings(params?: Object): Observable<Listing[]> {
    let url = '/listings';
    url = this.buildQueryString(url, params);
    return this.http.get<Listing[]>(environment.serverUrl + url);
  }

  private buildQueryString(url: string, params: Object): string {
    url += '?';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url += key + '=' + params[key] + '&';
      }
    }
    return url.slice(0, -1);
  }

  createListing(name: string, price: number, description: string, imageUrl: string,
                next?: (msg: ServerMessage) => void): void {
    this.http.post <ServerMessage>(environment.serverUrl + '/listings',
      {name: name, description: description, price: price, imageUrl: imageUrl})
      .subscribe(
        res => {
          next(res);
        }, err => {
          if (err.status === 0) {
            next(new ServerMessage(false, COULD_NOT_CONNECT));
          } else {
            next(new ServerMessage(err.error.successful, err.error.text));
          }
        }
      );
  }
}
