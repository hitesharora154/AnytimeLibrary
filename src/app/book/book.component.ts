import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Book } from '../models/book';
import { BookingDialogService } from '../booking-dialog/booking-dialog.service';
import { BookService } from '../services/book.service';
import { BookIssued } from '../models/book-issued';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book;

  constructor(private bookingDialogService: BookingDialogService, private bookService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  bookIssue(bookId, bookTitle, bookAvailability) {
    if (bookAvailability === 0) {
      bookId = -1;
    }
    this.bookingDialogService.confirm(bookId, bookTitle)
      .subscribe(res => {
        if (res !== null) {
          this.bookService.addBookIssue(new BookIssued(
            sessionStorage.getItem('userId'),
            this.book.id,
            res
          )).subscribe((response: any) => {
            this.book.availability--;
            this.snackBar.open(response.message, 'Yayy!', {
              duration: 3000
            });
          });
        }
      });
  }

}
