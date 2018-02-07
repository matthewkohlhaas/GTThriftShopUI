import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  private isLoggedIn: boolean;
  private url: string;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.isLoggedIn = false;
    this.url = window.location.href;
    this.accountService.authenticate((isAuthenticated => this.isLoggedIn = isAuthenticated));
  }
}
