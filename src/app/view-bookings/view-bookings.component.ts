import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { BookIssued } from '../models/book-issued';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  dataSource = new BookingDataSource(this.bookService);

  displayedColumns = ['userName', 'bookTitle', 'bookAuthor', 'issueDate'];

  constructor(private bookService: BookService) { }

  ngOnInit() {
  }

  loadBookIssued() {
    this.dataSource = new BookingDataSource(this.bookService);
  }
}

export class BookingDataSource extends DataSource<any> {

  bookings: BookIssued[];

  constructor(private bookService: BookService) {
    super();
  }

  connect(): Observable<BookIssued[]> {
    return this.bookService.getIssuedBooks();
  }
  disconnect(): void {

  }

}
