import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent {

  constructor(private accountService: AccountService) {}

  private logout(): void {
    this.accountService.logout();
  }
}
