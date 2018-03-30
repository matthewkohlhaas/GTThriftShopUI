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

  currentUser: User;
  listing: Listing;


  private submitDisabled = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private listingService: ListingService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe(res => this.currentUser = res);
  }

  private loadListing(): void {
    this.activatedRoute.params.subscribe((params: Params) =>  {
      this.listingService.getListing(params['id']).subscribe(res => this.listing = res);
    });
  }

  // private loadMessages(): void {
  //   this.activatedRoute.params.subscribe((params: Params) => {
  //     this.messageService.getMessages(params[this.listing._id], params[this.listing.user._id], params[this.currentUser._id]).
  //     subscribe(res => this.messages = res);
  //   });
  // }
}

