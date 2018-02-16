import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {TitleBarComponent} from './title-bar/title-bar.component';
import {ListingPageComponent} from './listing-page/listing-page.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AccountService} from '../services/account.service';
import {ListingService} from '../services/listing.service';
import {AdminService} from '../services/admin.service';
import {ModalService} from '../services/modal.service'
import {LoginBarComponent} from './login-bar/login-bar.component';
import {CreateAccountPageComponent} from './create-account-page/create-account-page.component';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import {OcticonDirective} from '../directives/octicon.directive';
import {ModalContentComponent} from './modal-content/modal-content.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {environment} from '../environments/environment';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import {ContactPageComponent} from './contact-page/contact-page.component';
import {TicketService} from '../services/ticket.service';
import {AccountRecoveryPageComponent} from './account-recovery-page/account-recovery-page.component';
import {VerificationPageComponent} from './verification-page/verification-page.component';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LocalStorageService} from '../services/local_storage.service';

const appRoutes: Routes = [
  {path: '', component: CreateAccountPageComponent},
  {path: 'account-recovery', component: AccountRecoveryPageComponent},
  {path: 'verify/:token', component: VerificationPageComponent},
  {path: 'listings', component: ListingPageComponent},
  {path: 'listing', component: ListingViewComponent},
  {path: 'create-listing', component: CreateListingComponent},
  {path: 'support', component: ContactPageComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: '**', component: NotFoundPageComponent}
];

export function jwtOptionsFactory(localStorageService) {
  return {
    tokenGetter: () => {
      return localStorageService.getAccessToken();
    },
    authScheme: '',
    whitelistedDomains: [environment.serverDomain]
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    TitleBarComponent,
    LoginBarComponent,
    CreateAccountPageComponent,
    ListingPageComponent,
    ModalContentComponent,
    OcticonDirective,
    NavMenuComponent,
    CreateListingComponent,
    ContactPageComponent,
    AccountRecoveryPageComponent,
    VerificationPageComponent,
    ListingViewComponent,
    UserProfileComponent,
    AdminPageComponent
  ],
  entryComponents: [ModalContentComponent],
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
    MatMenuModule,
    NgbModule.forRoot()
  ],
  providers: [
    HttpClient,
    AccountService,
    ListingService,
    TicketService,
    AdminService,
    LocalStorageService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
