import {Injectable} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../app/modal-content/modal-content.component';

@Injectable()
export class ModalService {

  constructor(private modalService: NgbModal) { }

  public displayModal(title, text): void {
    const content: NgbModalRef = this.modalService.open(ModalContentComponent);
    content.componentInstance.title = title;
    content.componentInstance.message = text;
  }
}
