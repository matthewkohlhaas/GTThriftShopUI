import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent {

  private email: string;
  private password: string;

  constructor(private accountService: AccountService) {}

  logIn(): void {
    this.accountService.logIn(this.email, this.password);
    // TODO deal with failure
  }
}
