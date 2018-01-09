import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {TitleBarComponent} from './title-bar/title-bar.component';
import {ListingPageComponent} from './listing-page/listing-page.component';
import {ListingService} from '../services/listing.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    ListingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    HttpClient,
    ListingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
