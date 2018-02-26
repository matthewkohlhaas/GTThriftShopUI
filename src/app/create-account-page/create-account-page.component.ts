import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {ValidationUtils} from '../../utils/validation.utils';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit {

  private minPasswordLength: number;
  private submitDisabled: boolean;

  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  private emailErrorStateMatcher: ErrorStateMatcher;
  private passwordErrorStateMatcher: ErrorStateMatcher;

  constructor(private router: Router, private accountService: AccountService, private modalService: ModalService) {}

  public ngOnInit(): void {
    if (this.accountService.isAccessTokenAlive()) {
      this.router.navigate(['/listings']);
    }
    this.emailErrorStateMatcher = ValidationUtils.getEmailErrorStateMatcher();
    this.passwordErrorStateMatcher = ValidationUtils.getPasswordErrorStateMatcher();
    this.minPasswordLength = ValidationUtils.getMinPasswordLength();
    this.submitDisabled = false;
  }

  private onSubmit(): void {
    if (!this.submitDisabled
      && ValidationUtils.validateNotEmpty(this.firstName)
      && ValidationUtils.validateNotEmpty(this.lastName)
      && ValidationUtils.validateEmail(this.email)
      && ValidationUtils.validatePassword(this.password)) {

      this.createAccount();
    }
  }

  private createAccount(): void {
    this.submitDisabled = true;

    this.accountService.createAccount(this.email, this.password, this.firstName, this.lastName, msg => {
      let title = 'Failed to Create Account';

      if (msg.successful) {
        title = 'Successfully Created Account';
      }
      this.modalService.openAlertModal(title, msg.text, () => this.submitDisabled = false);
    });
  }
}
