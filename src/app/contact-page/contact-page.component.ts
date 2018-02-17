import {Component, ViewEncapsulation} from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactPageComponent {
  private submitDisabled: boolean;
  private subject: string;
  private message: string;

  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal
  ) { }

  private static validateEntry(entry: string, validator: (str: string) => boolean): boolean {
    const trimmedEntry: string = (entry) ? entry.trim() : '';
    return validator(trimmedEntry);
  }

  private resetForm() {
    this.submitDisabled = false;
    this.message = '';
    this.subject = '';
  }

  private onSubmit(): void {
    this.submitDisabled = true;
      this.ticketService.createTicket(this.subject, this.message, msg => {
        const content: NgbModalRef = this.modalService.open(ModalContentComponent);

        if (msg.successful) {
          content.componentInstance.title = 'Sent Support Message';
        } else {
          content.componentInstance.title = 'Failed to Send Support Message';
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
