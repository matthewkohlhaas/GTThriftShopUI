import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerMessage} from '../model/server-message';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Message} from '../model/message';

@Injectable()
export class OfferService {

  constructor(private http: HttpClient) { }

  public getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.serverUrl}/offers/${id}/messages`);
  }

  public postMessage(id: string, message: string): Promise<string> {
    return this.processServerMessageResponse(
      this.http.post<ServerMessage>(`${environment.serverUrl}/offers/${id}/messages`, {text: message})
    );
  }

  public putAccepted(id, accepted: boolean): Promise<string> {
    return this.processServerMessageResponse(
      this.http.put<ServerMessage>(`${environment.serverUrl}/offers/${id}/accepted`, {accepted: accepted})
    );
  }

  public putRejected(id, rejected: boolean): Promise<string> {
    return this.processServerMessageResponse(
      this.http.put<ServerMessage>(`${environment.serverUrl}/offers/${id}/rejected`, {rejected: rejected}),
    );
  }

  private processServerMessageResponse(response: Observable<ServerMessage>): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      response.subscribe(res => {
          if (res.successful) {
            resolve(res.text);
          } else {
            reject(res.text);
          }
        }, err => {
          if (err.status === 0) {
            reject('Could not connect to server.');
          } else {
            reject(err.error.text);
          }
        });
    });
  }
}
