import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {TitleBarComponent} from './title-bar/title-bar.component';
import {ListingPageComponent} from './listing-page/listing-page.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AccountService} from '../services/account.service';
import {ListingService} from '../services/listing.service';
import {LoginBarComponent} from './login-bar/login-bar.component';
import {CreateAccountPageComponent} from './create-account-page/create-account-page.component';
import {JwtModule} from '@auth0/angular-jwt';
import {OcticonDirective} from '../directives/octicon.directive';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    LoginBarComponent,
    CreateAccountPageComponent,
    ListingPageComponent,
    OcticonDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('ACCESS_TOKEN');
        },
        authScheme: '',
        whitelistedDomains: ['localhost:1337']
      }
    }),
    NgbModule.forRoot()
  ],
  providers: [
    HttpClient,
    AccountService,
    ListingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
