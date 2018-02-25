import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
  private showErrorPassword: boolean;
  private showErrorConfirmedPassword: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  public ngOnInit() {
    this.minPasswordLength = AccountService.getMinPasswordLength();
    this.submitDisabled = false;
    this.showErrorPassword = false;
    this.showErrorConfirmedPassword = false;
  }

  private onBlurPassword(): void {
    this.showErrorPassword = !AccountService.validatePassword(this.password) && this.password && this.password !== '';
  }

  private onBlurConfirmedPassword(): void {
    this.showErrorConfirmedPassword = !AccountService.validatePassword(this.confirmedPassword) && this.confirmedPassword
      && this.confirmedPassword !== '';
  }

  private onSubmit(): void {
    if (!this.submitDisabled) {
      this.showErrorPassword = !AccountService.validatePassword(this.password);
      this.showErrorConfirmedPassword = !AccountService.validatePassword(this.confirmedPassword);

      if (!this.showErrorPassword && !this.showErrorConfirmedPassword) {
        if (this.password !== this.confirmedPassword) {
          this.showPasswordsDoNotMatchModal();
        } else {
          this.resetPassword();
        }
      }
    }
  }

  private showPasswordsDoNotMatchModal(): void {
    this.submitDisabled = true;
    const content: NgbModalRef = this.modalService.open(ModalContentComponent);

    content.componentInstance.title = 'Cannot Reset Password';
    content.componentInstance.message = 'Please enter matching passwords in the two fields.';

    content.result.then(value => {
      this.submitDisabled = false;
    }, reason => {
      this.submitDisabled = false;
    });
  }

  private resetPassword(): void {
    this.submitDisabled = true;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.accountService.resetPassword(params['token'], this.password, msg => {
        const content: NgbModalRef = this.modalService.open(ModalContentComponent);

        if (msg.successful) {
          content.componentInstance.title = 'Successfully Reset Password';
        } else {
          content.componentInstance.title = 'Failed to Reset Password';
        }
        content.componentInstance.message = msg.text;

        content.result.then(value => {
          this.onModalClose(msg.successful);
        }, reason => {
          this.onModalClose(msg.successful);
        });
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
