import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular5-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { getAuthServiceConfigs } from '../../socialloginConfig';
import { MaterialModule } from '../Added_Modules/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { BookDashboardComponent } from './book-dashboard/book-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { BookService } from './services/book.service';
import { UserService } from './services/user.service';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { BookingDialogService } from './booking-dialog/booking-dialog.service';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BookDashboardComponent,
    BookComponent,
    BookingDialogComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    BookService,
    UserService,
    BookingDialogService
  ],
  entryComponents: [
    BookingDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
