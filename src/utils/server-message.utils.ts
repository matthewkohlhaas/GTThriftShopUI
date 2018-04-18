import {Observable} from 'rxjs/Observable';
import {ServerMessage} from '../model/server-message';

const COULD_NOT_CONNECT = 'Could not connect to server.';

export class ServerMessageUtils {

  public static processServerMessageResponse(response: Observable<ServerMessage>): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      response.subscribe(res => {
        if (res.successful) {
          resolve(res.text);
        } else {
          reject(res.text);
        }
      }, err => {
        if (err.status === 0) {
          reject(COULD_NOT_CONNECT);
        } else {
          reject(err.error.text);
        }
      });
    });
  }
}

