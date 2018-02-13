import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {TicketService} from '../../services/ticket.service';
import {AccountService} from '../../services/account.service';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactPageComponent implements OnInit {
  private submitDisabled: boolean;
  private subject: string;
  private message: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private ticketService: TicketService,
    private modalService: NgbModal
  ) { }

  private static validateEntry(entry: string, validator: (str: string) => boolean): boolean {
    const trimmedEntry: string = (entry) ? entry.trim() : '';
    return validator(trimmedEntry);
  }

  ngOnInit(): void {
    this.accountService.authenticate(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['support']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  private onSubmit(): void {
      this.createTicket();
  }

  private resetTicket() {
      this.message = '';
      this.subject = '';
  }

  private createTicket(): void {
    this.submitDisabled = true;
      this.ticketService.createTicket(this.subject, this.message, msg => {
        const content: NgbModalRef = this.modalService.open(ModalContentComponent);

        if (msg.successful) {
          content.componentInstance.title = 'Successfully Created Ticket';
        } else {
          content.componentInstance.title = 'Failed to Create Ticket';
        }
        content.componentInstance.message = msg.text;

        content.result.then(value => {
          this.submitDisabled = false;
          this.message = '';
          this.subject = '';
        }, reason => {
          this.submitDisabled = false;
          this.message = '';
          this.subject = '';
        });
      });
  }
}
