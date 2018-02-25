import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ValidationUtils} from '../../utils/validation.utils';

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

  constructor(private router: Router, private accountService: AccountService, private modalService: NgbModal) {}

  public ngOnInit(): void {
    this.accountService.authenticate(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['listings']);
      }
    });
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
        const content: NgbModalRef = this.modalService.open(ModalContentComponent);

        if (msg.successful) {
          content.componentInstance.title = 'Successfully Created Account';
        } else {
          content.componentInstance.title = 'Failed to Create Account';
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
