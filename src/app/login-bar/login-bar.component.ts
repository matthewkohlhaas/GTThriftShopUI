import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent {

  private email: string;
  private password: string;

  constructor(private accountService: AccountService, private modalService: NgbModal) {}

  private login(): void {
    this.accountService.login(this.email, this.password, msg => {
      if (!msg.successful) {
        const content = this.modalService.open(ModalContentComponent);
        content.componentInstance.title = 'Failed to Log In';
        content.componentInstance.message = msg.text;
      }
    });
  }
}
