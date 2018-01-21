import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent {

  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor(private accountService: AccountService, private modalService: NgbModal) {}

  private createAccount(): void {
    this.accountService.createAccount(this.email, this.password, this.firstName, this.lastName, msg => {

        const content = this.modalService.open(ModalContentComponent);

        if (msg.successful) {
          content.componentInstance.title = 'Successfully Created Account';
        } else {
          content.componentInstance.title = 'Failed to Create Account';
        }
        content.componentInstance.message = msg.text;
      });
  }
}
