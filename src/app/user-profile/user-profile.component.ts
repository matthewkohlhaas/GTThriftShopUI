import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.authenticate(isAuthenticated => {
      if (isAuthenticated) {
        this.accountService.getCurrentUser().subscribe(res => {
          this.user = res;
        });
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
