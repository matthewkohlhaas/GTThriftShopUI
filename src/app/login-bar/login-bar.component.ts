import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent implements OnInit {

  private submitDisabled: boolean;

  private email: string;
  private password: string;

  constructor(private accountService: AccountService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.submitDisabled = false;
  }

  private login(): void {
    this.submitDisabled = true;
    this.accountService.login(this.email, this.password, msg => {
      if (!msg.successful) {
        const content: NgbModalRef = this.modalService.open(ModalContentComponent);
        content.componentInstance.title = 'Failed to Log In';
        content.componentInstance.message = msg.text;

        content.result.then(value => {
          this.submitDisabled = false;
        }, reason => {
          this.submitDisabled = false;
        });
      }
    });
  }
}
