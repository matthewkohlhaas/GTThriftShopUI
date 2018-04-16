import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerMessage} from '../model/server-message';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Message} from '../model/message';
import {ServerMessageUtils} from '../utils/server-message.utils';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  public putAnswer(id, answer: string): Promise<string> {
    return ServerMessageUtils.processServerMessageResponse(
      this.http.put<ServerMessage>(`${environment.serverUrl}/questions/${id}/answer`, {answer: answer})
    );
  }
}
