import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AccountSettingsPageComponent implements OnInit{

  private currentUser : User;
  private blockedList : User[] = [];
  private nameList : string[] = []

  constructor(
    private userService: UserService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe((value => {
      this.currentUser = value;
      this.blockedList = this.currentUser.blockedUsers;

      for (let i = 0; i < this.blockedList.length; i++) {
        this.userService.getUserById(this.blockedList[i].toString()).subscribe(value => {
          let name = value.firstName.concat(' ', value.lastName);
          this.nameList.push(name);
        });

      }


    }));
  }

}

export interface tableData {
  position: number;
  name: string;
}


