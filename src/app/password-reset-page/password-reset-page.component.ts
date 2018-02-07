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
  private isLoggedIn: boolean;
  private submitDisabled: boolean;

  private password: string;
  private confirmPassword: string;
  private showErrorPassword: boolean;
  private showErrorConfirmPassword: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  public ngOnInit() {
    this.minPasswordLength = AccountService.getMinPasswordLength();
    this.isLoggedIn = false;
    this.submitDisabled = false;
    this.showErrorPassword = false;
    this.showErrorConfirmPassword = false;
    this.accountService.authenticate(isAuthenticated => this.isLoggedIn = isAuthenticated);
  }

  private onBlurPassword(): void {
    this.showErrorPassword = !AccountService.validatePassword(this.password) && this.password && this.password !== '';
  }

  private onSubmit(): void {
    if (!this.submitDisabled) {
      this.showErrorPassword = !AccountService.validatePassword(this.password);
      if (!this.showErrorPassword) {
        this.resetPassword();
      }
    }
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
