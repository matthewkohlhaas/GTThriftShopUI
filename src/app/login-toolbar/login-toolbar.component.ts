import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-login-toolbar',
  templateUrl: './login-toolbar.component.html',
  styleUrls: ['./login-toolbar.component.css']
})
export class LoginToolbarComponent implements OnInit {

  private submitDisabled: boolean;

  private email: string;
  private password: string;

  constructor(private accountService: AccountService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.submitDisabled = false;
  }

  private login(): void {
    this.submitDisabled = true;
    this.accountService.login(this.email, this.password, 'listings', msg => {
      if (!msg.successful) {
        this.modalService.openAlertModal('Failed to Log In', msg.text, () => this.submitDisabled = false);
      }
    });
  }
}
