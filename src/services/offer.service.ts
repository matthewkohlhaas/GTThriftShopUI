import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerMessage} from '../model/server-message';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Message} from '../model/message';
import {ServerMessageUtils} from '../utils/server-message.utils';

@Injectable()
export class OfferService {

  constructor(private http: HttpClient) { }

  public getMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.serverUrl}/offers/${id}/messages`);
  }

  public postMessage(id: string, message: string): Promise<string> {
    return ServerMessageUtils.processServerMessageResponse(
      this.http.post<ServerMessage>(`${environment.serverUrl}/offers/${id}/messages`, {text: message})
    );
  }

  public putAccepted(id: string, accepted: boolean): Promise<string> {
    return ServerMessageUtils.processServerMessageResponse(
      this.http.put<ServerMessage>(`${environment.serverUrl}/offers/${id}/accepted`, {accepted: accepted})
    );
  }

  public putRejected(id: string, rejected: boolean): Promise<string> {
    return ServerMessageUtils.processServerMessageResponse(
      this.http.put<ServerMessage>(`${environment.serverUrl}/offers/${id}/rejected`, {rejected: rejected}),
    );
  }
}
