import { Component, ViewEncapsulation } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../modal-content/modal-content.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuComponent {

  constructor(private accountService: AccountService, private modalService: NgbModal) { }

  private logout(): void {
    this.accountService.logout();
  }

  private settings(): void {
    const content: NgbModalRef = this.modalService.open(ModalContentComponent);
    content.componentInstance.title = 'Not Implemented';
    content.componentInstance.message = 'This feature has not been implemented';
  }

}
