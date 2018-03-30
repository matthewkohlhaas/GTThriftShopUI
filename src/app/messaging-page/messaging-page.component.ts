import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message';
import {Listing} from '../../model/listing';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../model/user';
import {AccountService} from '../../services/account.service';
import {ListingService} from '../../services/listing.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessagingPageComponent implements OnInit {

  private currentUser: User;
  private messages: Message[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private listingService: ListingService,
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(res => this.currentUser = res);
  }

}

