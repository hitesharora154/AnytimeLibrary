import { Component, OnInit, ViewChild } from '@angular/core';

import { ViewBookingsComponent } from '../view-bookings/view-bookings.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  @ViewChild(ViewBookingsComponent) bookingComponent: ViewBookingsComponent;

  constructor() { }

  ngOnInit() {
  }

  loadBookings() {
    this.bookingComponent.sortChanged();
  }

}
