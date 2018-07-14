import { Component, OnInit, ViewChild } from '@angular/core';

import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild(ViewBookComponent) bookViewComponents: ViewBookComponent;

  constructor() { }

  ngOnInit() {
  }

  getBooks() {
    this.bookViewComponents.ngAfterViewInit();
  }


}
