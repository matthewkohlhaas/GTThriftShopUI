import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import {Router} from '@angular/router';

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

  private showErrorFirstName: boolean;
  private showErrorLastName: boolean;
  private showErrorEmail: boolean;
  private showErrorPassword: boolean;

  constructor(private router: Router, private accountService: AccountService, private modalService: NgbModal) {}

  public ngOnInit(): void {
    this.accountService.authenticate(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['listings']);
      }
    });
    this.minPasswordLength = AccountService.getMinPasswordLength();
    this.submitDisabled = false;
    this.showErrorFirstName = false;
    this.showErrorLastName = false;
    this.showErrorEmail = false;
    this.showErrorPassword = false;
  }

  private onSubmit(): void {
    if (!this.submitDisabled) {
      this.validateAllFields();
      if (!this.showErrorFirstName && !this.showErrorLastName && !this.showErrorEmail && !this.showErrorPassword) {
        this.createAccount();
      }
    }
  }

  private onBlurEmail(): void {
    this.showErrorEmail = !AccountService.validateEmail(this.email) && this.email && this.email !== '';
  }

  private onBlurPassword(): void {
    this.showErrorPassword = !AccountService.validatePassword(this.password) && this.password && this.password !== '';
  }

  private validateAllFields(): void {
    this.showErrorFirstName = !AccountService.validateNotEmpty(this.firstName);
    this.showErrorLastName = !AccountService.validateNotEmpty(this.lastName);
    this.showErrorEmail = !AccountService.validateEmail(this.email);
    this.showErrorPassword = !AccountService.validatePassword(this.password);
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
