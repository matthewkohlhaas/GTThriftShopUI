import {Injectable} from '@angular/core';
import {Listing} from '../model/listing';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ServerMessage} from '../model/server-message';
import {Offer} from '../model/offer';

const COULD_NOT_CONNECT = 'Could not connect to server.';

@Injectable()
export class ListingService {

  constructor(private http: HttpClient) { }

  public getListings(params?: any): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${environment.serverUrl}/listings`, {params: params});
  }

  public getListing(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${environment.serverUrl}/listings/` + id);
  }

  public getAllListingsForUser(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${environment.serverUrl}/listings/users/${userId}`);
  }

  public createListing(name: string, price: number, description: string, imageUrl: string, category: string,
                next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(`${environment.serverUrl}/listings`,
      {name: name, description: description, price: price, imageUrl: imageUrl, category: category})
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

  public editListing(listing: Listing, next?: (msg: ServerMessage) => void): void {
    this.http.put<ServerMessage>(`${environment.serverUrl}/listings/${listing._id}`,
      {
        name: listing.name,
        price: listing.price,
        description: listing.description,
        imageUrl: listing.imageUrl
      }).subscribe(
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

  public postQuestion(listingId: string, question: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(`${environment.serverUrl}/listings/${listingId}/questions`,
      {
        question: question
      }).subscribe(
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

  public getOffers(listingId: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${environment.serverUrl}/listings/${listingId}/offers`);
  }

  public postOffer(listingId: string, price: number, message: string, next?: (msg: ServerMessage) => void): void {
    this.http.post<ServerMessage>(`${environment.serverUrl}/listings/${listingId}/offers`,
      {
        price: price,
        message: message
      }).subscribe(
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
