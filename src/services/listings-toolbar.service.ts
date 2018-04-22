import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ListingsToolbarService {

  private messageSource = new BehaviorSubject<object>({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: object) {
    this.messageSource.next(message);
  }

}
