import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit{

  private submitDisabled: boolean;

  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  private showErrorFirstName: boolean;
  private showErrorLastName: boolean;
  private showErrorEmail: boolean;
  private showErrorPassword: boolean;

  constructor(private accountService: AccountService, private modalService: NgbModal) {}

  private static validateEntry(entry: string, validator: (str: string) => boolean): boolean {
    const trimmedEntry: string = (entry) ? entry.trim() : '';
    return validator(trimmedEntry);
  }

  private static validateNotEmpty(entry: string): boolean {
    return this.validateEntry(entry, str => str === '');
  }

  ngOnInit(): void {
    this.submitDisabled = false;
    this.showErrorFirstName = false;
    this.showErrorLastName = false;
    this.showErrorEmail = false;
    this.showErrorPassword = false;
  }

  // Do not make this method static -- the template uses it
  private getMinPasswordLength(): number {
    return AccountService.getMinPasswordLength();
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
    this.showErrorEmail = this.validateEmail(this.email) && this.email && this.email !== '';
  }

  private onBlurPassword(): void {
    this.showErrorPassword = this.validatePassword(this.password) && this.password && this.password !== '';
  }

  private validateEmail(entry: string): boolean {
    return CreateAccountPageComponent.validateEntry(entry, str => {
      return !AccountService.getEmailRegex().test(str);
    });
  }

  private validatePassword(entry: string): boolean {
    return CreateAccountPageComponent.validateEntry(entry, str => {
      return str.length < AccountService.getMinPasswordLength();
    });
  }

  private validateAllFields(): void {
    this.showErrorFirstName = CreateAccountPageComponent.validateNotEmpty(this.firstName);
    this.showErrorLastName = CreateAccountPageComponent.validateNotEmpty(this.lastName);
    this.showErrorEmail = this.validateEmail(this.email);
    this.showErrorPassword = this.validatePassword(this.password);
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
