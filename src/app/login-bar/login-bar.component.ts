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
  private statusMsg: string; // TODO use in popup modal for failure

  constructor(private accountService: AccountService) {}

  logIn(): void {
    this.statusMsg = this.accountService.login(this.email, this.password);
  }
}
