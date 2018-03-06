import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ValidationUtils} from '../../utils/validation.utils';
import {ErrorStateMatcher} from '@angular/material';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-account-recovery-page',
  templateUrl: './account-recovery-page.component.html',
  styleUrls: ['./account-recovery-page.component.css']
})
export class AccountRecoveryPageComponent implements OnInit {

  private submitDisabled: boolean;

  private email: string;
  private emailErrorStateMatcher: ErrorStateMatcher;

  constructor(private accountService: AccountService, private modalService: ModalService) {}

  public ngOnInit() {
    this.emailErrorStateMatcher = ValidationUtils.getEmailErrorStateMatcher();
    this.submitDisabled = false;
  }

  private onClickSendPasswordReset(): void {
    if (!this.submitDisabled && ValidationUtils.validateEmail(this.email)) {
      this.sendPasswordResetEmail();
    }
  }

  private onClickResendVerification(): void {
    if (!this.submitDisabled && ValidationUtils.validateEmail(this.email)) {
      this.resendVerificationEmail();
    }
  }

  private sendPasswordResetEmail(): void {
    this.submitDisabled = true;

    this.accountService.sendPasswordResetEmail(this.email, msg => {
      let title = 'Failed to Send Password Reset Email';

      if (msg.successful) {
        title = 'Sent Password Reset Email';
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }

  private resendVerificationEmail(): void {
    this.submitDisabled = true;

    this.accountService.resendVerificationEmail(this.email, msg => {
      let title = 'Failed to Resend Verification Email';

      if (msg.successful) {
        title = 'Resent Verification Email';
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }
}
