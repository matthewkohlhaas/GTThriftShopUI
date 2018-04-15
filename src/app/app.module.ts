import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule, MatExpansionModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {ListingsFeedPageComponent} from './listings-feed-page/listings-feed-page.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AccountService} from '../services/account.service';
import {ListingService} from '../services/listing.service';
import {AdminService} from '../services/admin.service';
import {FlagService} from '../services/flag.service';
import {ModalService} from '../services/modal.service';
import {CreateAccountPageComponent} from './create-account-page/create-account-page.component';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {CreateListingComponent} from './create-listing/create-listing.component';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {TicketService} from '../services/ticket.service';
import {AccountRecoveryPageComponent} from './account-recovery-page/account-recovery-page.component';
import {VerificationPageComponent} from './verification-page/verification-page.component';
import {PasswordResetPageComponent} from './password-reset-page/password-reset-page.component';
import {ListingPageComponent} from './listing-page/listing-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LocalStorageService} from '../services/local-storage.service';
import {AuthenticateGuard} from '../guards/authenticate.guard';
import {AdminGuard} from '../guards/admin.guard';
import {ModalFlagListingContentComponent} from './modal-flag-listing-content/modal-flag-listing-content.component';
import {MainToolbarComponent} from './main-toolbar/main-toolbar.component';
import {MainSidenavComponent} from './main-sidenav/main-sidenav.component';
import {LoginToolbarComponent} from './login-toolbar/login-toolbar.component';
import {ValidationUtils} from '../utils/validation.utils';
import {ModalAlertContentComponent} from './modal-alert-content/modal-alert-content.component';
import {UserService} from '../services/user.service';
import {UserProfilePageComponent} from './user-profile-page/user-profile-page.component';
import {FlagFormComponent} from './flag-form/flag-form.component';
import {ModalEditListingContentComponent} from './modal-edit-listing-content/modal-edit-listing-content.component';
import {ListingsFeedToolbarComponent} from './listings-feed-toolbar/listings-feed-toolbar.component';
import {MessageService} from '../services/message.service';
import {UserMessagingPageComponent} from './user-messaging-page/user-messaging.page.component';
import {ModalMessagingContentComponent } from './modal-messaging-content/modal-messaging-content.component';
import {ModalGetMessagesComponent} from './modal-get-messages/modal-get-messages.component';
import {ModalBlockUserContentComponent} from './modal-block-user-content/modal-block-user-content.component';
import {AccountSettingsPageComponent} from './account-settings-page/account-settings-page.component';
import { ModalMakeOfferContentComponent } from './modal-make-offer-content/modal-make-offer-content.component';
import { ListingOfferComponent } from './listing-offer/listing-offer.component';
import {OfferService} from '../services/offer.service';

const appRoutes: Routes = [
  {path: '', component: CreateAccountPageComponent},
  {path: 'account-recovery', component: AccountRecoveryPageComponent},
  {path: 'account-settings', component: AccountSettingsPageComponent, canActivate: [AuthenticateGuard]},
  {path: 'verify/:token', component: VerificationPageComponent},
  {path: 'reset-password/:token', component: PasswordResetPageComponent},
  {path: 'listings', component: ListingsFeedPageComponent, canActivate: [AuthenticateGuard]},
  {path: 'listings/:id', component: ListingPageComponent, canActivate: [AuthenticateGuard]},
  {path: 'create-listing', component: CreateListingComponent, canActivate: [AuthenticateGuard]},
  {path: 'support', component: ContactPageComponent, canActivate: [AuthenticateGuard]},
  {path: 'messages', component: UserMessagingPageComponent, canActivate: [AuthenticateGuard]},
  {path: 'users/:id', component: UserProfilePageComponent, canActivate: [AuthenticateGuard]},
  {path: 'admin', component: AdminPageComponent, canActivate: [AuthenticateGuard, AdminGuard]},
  {path: '**', component: NotFoundPageComponent}
];

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return LocalStorageService.getAccessToken();
    },
    authScheme: '',
    whitelistedDomains: [environment.serverDomain]
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainSidenavComponent,
    LoginToolbarComponent,
    NotFoundPageComponent,
    ModalAlertContentComponent,
    ModalEditListingContentComponent,
    ModalFlagListingContentComponent,
    CreateAccountPageComponent,
    ListingsFeedPageComponent,
    ListingsFeedToolbarComponent,
    ListingPageComponent,
    CreateListingComponent,
    ContactPageComponent,
    AccountRecoveryPageComponent,
    AccountSettingsPageComponent,
    VerificationPageComponent,
    PasswordResetPageComponent,
    UserProfilePageComponent,
    AdminPageComponent,
    ListingPageComponent,
    AdminPageComponent,
    FlagFormComponent,
    UserMessagingPageComponent,
    ModalMessagingContentComponent,
    ModalGetMessagesComponent,
    ModalBlockUserContentComponent,
    AccountSettingsPageComponent,
    ModalMakeOfferContentComponent,
    ListingOfferComponent
  ],
  entryComponents: [
    ModalAlertContentComponent,
    ModalEditListingContentComponent,
    ModalFlagListingContentComponent,
    ModalMessagingContentComponent,
    ModalGetMessagesComponent,
    ModalBlockUserContentComponent,
    ModalMakeOfferContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LocalStorageService]
      }
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule
  ],
  providers: [
    HttpClient,
    ValidationUtils,
    AccountService,
    UserService,
    ListingService,
    OfferService,
    TicketService,
    AdminService,
    FlagService,
    LocalStorageService,
    ModalService,
    MessageService,
    AuthenticateGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
