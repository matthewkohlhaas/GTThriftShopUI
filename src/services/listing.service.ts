import {Injectable} from '@angular/core';
import {Listing} from '../model/listing';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class ListingService {

  constructor(private http: HttpClient) {}

  getListings(): Observable<Listing[]> {
    if (window.sessionStorage.token) {
      const headers: HttpHeaders = new HttpHeaders().set('Authorization', window.sessionStorage.token);
      return this.http.get<Listing[]>(environment.serverUrl + '/listings', {headers: headers});
    }
    return null;
  }
}
