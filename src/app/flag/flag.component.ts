import {NgbActiveModal, NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Component,Input, OnInit, ViewEncapsulation } from '@angular/core';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {FlagService} from "../../services/flag.service";

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FlagComponent implements OnInit {

  @Input() title;
  @Input() message;
  private submitDisabled: boolean;
  private description: string;
  private fixedDescription;

  constructor(public activeModal: NgbActiveModal, private flagService: FlagService, private modalService: NgbModal) {}

  ngOnInit() {
  }

  private resetForm() {
    this.submitDisabled = false;
    this.description = '';
  }

  private onSubmitFlag(): void {
    this.submitDisabled = true;
    let message = "";
    if (this.description) {
      message = this.fixedDescription.concat(this.description);
    }
    this.flagService.flagListing(message, msg => {
      const content: NgbModalRef = this.modalService.open(ModalContentComponent);

      if (msg.successful) {
        content.componentInstance.title = 'Listing is succesfully flagged';
        this.activeModal.close('asdasd');
      } else {
        content.componentInstance.title = 'Failed to flag listing';
      }
      content.componentInstance.message = msg.text;

      content.result.then(value => {
        this.resetForm();
      }, reason => {
        this.resetForm();
      });
    });
  }

}
