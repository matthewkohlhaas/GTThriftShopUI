import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ValidationUtils} from '../../utils/validation.utils';
import {ErrorStateMatcher} from '@angular/material';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-account-recovery-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.css']
})
export class PasswordResetPageComponent implements OnInit {

  private minPasswordLength: number;
  private submitDisabled: boolean;

  private password: string;
  private confirmedPassword: string;

  private passwordErrorStateMatcher: ErrorStateMatcher;

  constructor(
    private accountService: AccountService,
    private modalService: ModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.submitDisabled = false;
    this.minPasswordLength = ValidationUtils.getMinPasswordLength();
    this.passwordErrorStateMatcher = ValidationUtils.getPasswordErrorStateMatcher();
  }

  private onSubmit(): void {
    if (!this.submitDisabled
        && ValidationUtils.validatePassword(this.password)
        && ValidationUtils.validatePassword(this.confirmedPassword)) {

      if (this.password !== this.confirmedPassword) {
        this.showPasswordsDoNotMatchModal();
      } else {
        this.resetPassword();
      }
    }
  }

  private showPasswordsDoNotMatchModal(): void {
    this.submitDisabled = true;

    this.modalService.openAlertModal(
      'Cannot Reset Password',
      'Please enter matching passwords in the two fields.',
      () => this.submitDisabled = false
    );
  }

  private resetPassword(): void {
    this.submitDisabled = true;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.accountService.resetPassword(params['token'], this.password, msg => {
        let title = 'Failed to Reset Password';

        if (msg.successful) {
          title = 'Successfully Reset Password';
        }
        this.modalService.openAlertModal(title, msg.text, () => this.onModalClose(msg.successful));
      });
    });
  }

  private onModalClose(successful: boolean): void {
    if (successful) {
      this.router.navigate(['']);
    }
    this.submitDisabled = false;
  }
}
