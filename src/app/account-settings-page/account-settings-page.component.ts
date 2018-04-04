import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Params, Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";
import {User} from "../../model/user";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AccountSettingsPageComponent implements OnInit{
  private  testUser : User;
  private  test : string;

  private currentUser : User;
  private blockedList : User[];
  private displayedColumns = ['position', 'name', 'status'];
  private dataSource = new MatTableDataSource()
  constructor(
    private router: Router,
    private userService: UserService,
    private accountService: AccountService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe((value => {
      this.currentUser = value;
      this.blockedList = this.currentUser.blockedUsers;
      this.dataSource = new MatTableDataSource(this.blockedList);
    }));
  }

  private applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private onSubmit(user: User): void {

    this.accountService.removeBlockedUser(user._id, msg => {
      let title = 'Failed to unblock user';
      if (msg.successful) {
        title = 'Successfully unblocked user';
      }
      this.modalService.openAlertModal(title, msg.text, () => this.onModalClose(msg.successful));
    });
  }

  private onModalClose(successful: boolean): void {
    if (successful) {
      this.ngOnInit();
      this.router.navigate('/account-setings')
    }
  }
}



