import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-account-recovery-page',
  templateUrl: './account-recovery-page.component.html',
  styleUrls: ['./account-recovery-page.component.css']
})
export class AccountRecoveryPageComponent {

  constructor(private accountService: AccountService) {}
}
