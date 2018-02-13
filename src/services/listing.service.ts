import {Injectable} from '@angular/core';
import {Listing} from '../model/listing';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class ListingService {

  constructor(private http: HttpClient) {}

  public getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(environment.serverUrl + '/listings');
  }
}
