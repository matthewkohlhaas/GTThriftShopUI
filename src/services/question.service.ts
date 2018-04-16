import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerMessage} from '../model/server-message';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Message} from '../model/message';
import {ServerMessageUtils} from '../utils/server-message.utils';
import {Question} from '../model/question';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${environment.serverUrl}/questions/${id}`);
  }

  public putAnswer(id: string, answer: string): Promise<string> {
    return ServerMessageUtils.processServerMessageResponse(
      this.http.put<ServerMessage>(`${environment.serverUrl}/questions/${id}/answer`, {answer: answer})
    );
  }
}
