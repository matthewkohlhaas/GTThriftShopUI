import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-account-recovery-page',
  templateUrl: './account-recovery-page.component.html',
  styleUrls: ['./account-recovery-page.component.css']
})
export class AccountRecoveryPageComponent implements OnInit {

  private submitDisabled: boolean;

  private email: string;
  private showErrorEmail: boolean;

  constructor(private accountService: AccountService, private modalService: NgbModal) {}

  public ngOnInit() {
    this.submitDisabled = false;
    this.showErrorEmail = false;
  }

  private onBlurEmail(): void {
    this.showErrorEmail = !AccountService.validateEmail(this.email) && this.email && this.email !== '';
  }

  private onClickSendPasswordReset(): void {
    if (!this.submitDisabled) {
      this.showErrorEmail = !AccountService.validateEmail(this.email);
      if (!this.showErrorEmail) {
        this.sendPasswordResetEmail();
      }
    }
  }

  private onClickResendVerification(): void {
    if (!this.submitDisabled) {
      this.showErrorEmail = !AccountService.validateEmail(this.email);
      if (!this.showErrorEmail) {
        this.resendVerificationEmail();
      }
    }
  }

  private sendPasswordResetEmail(): void {
    this.submitDisabled = true;

    this.accountService.sendPasswordResetEmail(this.email, msg => {
      const content: NgbModalRef = this.modalService.open(ModalContentComponent);

      if (msg.successful) {
        content.componentInstance.title = 'Sent Password Reset Email';
      } else {
        content.componentInstance.title = 'Failed to Send Password Reset Email';
      }
      content.componentInstance.message = msg.text;

      content.result.then(value => {
        this.submitDisabled = false;
      }, reason => {
        this.submitDisabled = false;
      });
    });
  }

  private resendVerificationEmail(): void {
    this.submitDisabled = true;

    this.accountService.resendVerificationEmail(this.email, msg => {
      const content: NgbModalRef = this.modalService.open(ModalContentComponent);

      if (msg.successful) {
        content.componentInstance.title = 'Resent Verification Email';
      } else {
        content.componentInstance.title = 'Failed to Resend Verification Email';
      }
      content.componentInstance.message = msg.text;

      content.result.then(value => {
        this.submitDisabled = false;
      }, reason => {
        this.submitDisabled = false;
      });
    });
  }
}
