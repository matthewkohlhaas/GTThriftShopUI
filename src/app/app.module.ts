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
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {ListingPageComponent} from './listing-page/listing-page.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AccountService} from '../services/account.service';
import {ListingService} from '../services/listing.service';
import {AdminService} from '../services/admin.service';
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
import {ListingViewComponent} from './listing-view/listing-view.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {LocalStorageService} from '../services/local-storage.service';
import {AuthenticateGuard} from '../guards/authenticate.guard';
import {AdminGuard} from '../guards/admin.guard';
import {MainToolbarComponent} from './main-toolbar/main-toolbar.component';
import {MainSidenavComponent} from './main-sidenav/main-sidenav.component';
import {LoginToolbarComponent} from './login-toolbar/login-toolbar.component';
import {ValidationUtils} from '../utils/validation.utils';
import {ModalAlertContentComponent} from './modal-alert-content/modal-alert-content.component';

const appRoutes: Routes = [
  {path: '', component: CreateAccountPageComponent},
  {path: 'account-recovery', component: AccountRecoveryPageComponent},
  {path: 'verify/:token', component: VerificationPageComponent},
  {path: 'reset-password/:token', component: PasswordResetPageComponent},
  {path: 'listings', component: ListingPageComponent, canActivate: [AuthenticateGuard]},
  {path: 'listing', component: ListingViewComponent, canActivate: [AuthenticateGuard]},
  {path: 'create-listing', component: CreateListingComponent, canActivate: [AuthenticateGuard]},
  {path: 'support', component: ContactPageComponent, canActivate: [AuthenticateGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthenticateGuard]},
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
    CreateAccountPageComponent,
    ListingPageComponent,
    ModalAlertContentComponent,
    CreateListingComponent,
    ContactPageComponent,
    AccountRecoveryPageComponent,
    VerificationPageComponent,
    PasswordResetPageComponent,
    ListingViewComponent,
    UserProfileComponent,
    AdminPageComponent
  ],
  entryComponents: [ModalAlertContentComponent],
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
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    HttpClient,
    ValidationUtils,
    AccountService,
    ListingService,
    TicketService,
    AdminService,
    LocalStorageService,
    ModalService,
    AuthenticateGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
