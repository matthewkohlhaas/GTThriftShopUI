import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FlagService} from '../../services/flag.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent {

  @Input() message;
  @Input() listing;
  private submitDisabled: boolean;
  private description: string;
  private fixedDescription;

  constructor(private modalService: ModalService, private flagService: FlagService) {}

  private resetForm() {
    this.submitDisabled = false;
    this.description = '';
  }

  private onSubmitFlag(): void {

    this.submitDisabled = true;
    let message = '';
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
