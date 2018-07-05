import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular5-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { BookReviewService } from './services/book-review.service';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ReviewDialogService } from './review-dialog/review-dialog.service';
import { ViewBookComponent } from './view-book/view-book.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DeleteDialogService } from './delete-dialog/delete-dialog.service';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateBookDialogService } from './update-book/update-book-dialog.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { LoginDialogService } from './login/login-dialog.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BookDashboardComponent,
    BookComponent,
    BookingDialogComponent,
    AddBookComponent,
    ViewBookingsComponent,
    ReviewDialogComponent,
    ViewBookComponent,
    DeleteDialogComponent,
    UpdateBookComponent,
    WelcomePageComponent,
    LoginComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'customer',
        component: CustomerDashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: WelcomePageComponent
      }
    ])
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    BookService,
    UserService,
    BookingDialogService,
    BookReviewService,
    ReviewDialogService,
    DeleteDialogService,
    UpdateBookDialogService,
    AuthService,
    LoginDialogService,
    AuthGuard
  ],
  entryComponents: [
    BookingDialogComponent,
    ReviewDialogComponent,
    DeleteDialogComponent,
    UpdateBookComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
