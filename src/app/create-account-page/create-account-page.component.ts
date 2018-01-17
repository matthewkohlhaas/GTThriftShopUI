import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css']
})
export class CreateAccountPageComponent {

  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor(private accountService: AccountService) {}

  createAccount(): void {
    this.accountService.createAccount(this.email, this.password, this.firstName, this.lastName);
    // TODO deal with failure
  }
}
