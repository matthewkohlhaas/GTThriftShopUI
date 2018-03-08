import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';
import {Listing} from "../model/listing";

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class FlagService {

  constructor(private http: HttpClient) {}

  flagListing(listing: Listing, description: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(environment.serverUrl + '/flag-listing',
      {description: description, listing: listing})
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
}
