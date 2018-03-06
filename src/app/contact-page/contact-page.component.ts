import {Component, ViewEncapsulation} from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {ModalService} from '../../services/modal.service';
import {ValidationUtils} from '../../utils/validation.utils';

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
    private modalService: ModalService
  ) { }

  private static validateEntry(entry: string, validator: (str: string) => boolean): boolean {
    const trimmedEntry: string = (entry) ? entry.trim() : '';
    return validator(trimmedEntry);
  }

  private resetForm(): void {
    this.submitDisabled = false;
    this.message = '';
    this.subject = '';
  }

  private onSubmit(): void {
    if (!ValidationUtils.validateNotEmpty(this.subject) || !ValidationUtils.validateNotEmpty(this.message)) {
      return;
    }
    this.submitDisabled = true;
      this.ticketService.createTicket(this.subject, this.message, msg => {
        let title = 'Failed to Send Support Message';

        if (msg.successful) {
          title = 'Sent Support Message';
        }
        this.modalService.openAlertModal(title, msg.text, () => this.resetForm());
      });
  }
}
