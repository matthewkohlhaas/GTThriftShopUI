import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent implements OnInit{

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
    const trimmedEntry = (entry) ? entry.trim() : '';
    return validator(trimmedEntry);
  }

  ngOnInit() {
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
    this.validateAllFields();
    if (!this.showErrorFirstName && !this.showErrorLastName && !this.showErrorEmail && !this.showErrorPassword) {
      this.createAccount();
    }
  }

  private validateFirstName(): void {
    this.showErrorFirstName = CreateAccountPageComponent.validateEntry(this.firstName, str => str === '');
  }

  private validateLastName(): void {
    this.showErrorLastName = CreateAccountPageComponent.validateEntry(this.lastName, str => str === '');
  }

  private validateEmail(): void {
    this.showErrorEmail = CreateAccountPageComponent.validateEntry(this.email, str => {
      return !AccountService.getEmailRegex().test(str);
    });
  }

  private validatePassword(): void {
    this.showErrorPassword = CreateAccountPageComponent.validateEntry(this.password, str => {
      return str.length < AccountService.getMinPasswordLength();
    });
  }

  private validateAllFields(): void {
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validatePassword();
  }

  private createAccount(): void {
    this.accountService.createAccount(this.email, this.password, this.firstName, this.lastName, msg => {
        const content = this.modalService.open(ModalContentComponent);

        if (msg.successful) {
          content.componentInstance.title = 'Successfully Created Account';
        } else {
          content.componentInstance.title = 'Failed to Create Account';
        }
        content.componentInstance.message = msg.text;
      });
  }
}
