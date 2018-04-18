import {Component} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {ListingsFeedPageComponent} from '../listings-feed-page/listings-feed-page.component';


@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent {

  constructor(private accountService: AccountService) { }

  private logout(): void {
    this.accountService.logout();
  }
}
