import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.css']
})
export class LoginBarComponent {

  private email: string;
  private password: string;

  constructor(private accountService: AccountService, private modalService: NgbModal) {}

  private login(): void {
    this.accountService.login(this.email, this.password, msg => {
      if (!msg.successful) {
        this.modalService.open(msg.text);
      }
    });
  }
}
