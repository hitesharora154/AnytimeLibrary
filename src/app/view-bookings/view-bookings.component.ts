import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent, MatPaginator, Sort, MatSnackBar } from '@angular/material';

import { BookIssued } from '../models/book-issued';
import { BookService } from '../services/book.service';
import { ReviewDialogService } from '../review-dialog/review-dialog.service';
import { BookReviewService } from '../services/book-review.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;
  resultsLength = 0;
  currentPage = 0;
  BooksIssued: BookIssued[];
  dataSource: MatTableDataSource<BookIssued>;
  displayedColumns = ['bookTitle', 'bookAuthor', 'issueDate', 'returnDate'];
  role: string;
  pageEvent: PageEvent;
  userId = null;

  constructor(private bookService: BookService,
    private dialogService: ReviewDialogService,
    private bookReviewService: BookReviewService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    if (this.role !== 'customer') {
      this.displayedColumns.unshift('userName');
    }
  }

  sortChanged(sortEventData?) {
    if (sessionStorage.getItem('role') === 'customer') {
      this.userId = sessionStorage.getItem('userId');
    }
    this.bookService.getIssuedBooks(this.userId).subscribe(res => {
      this.BooksIssued = res;
      if (sortEventData) {
        switch (sortEventData.active) {
          case 'userName':
            if (sortEventData.direction === 'desc') {
              this.BooksIssued.sort((a, b) => {
                return b.userName.localeCompare(a.userName);
              });
            } else {
              this.BooksIssued.sort((a, b) => {
                return a.userName.localeCompare(b.userName);
              });
            }
            break;
          case 'bookTitle':
            if (sortEventData.direction === 'desc') {
              this.BooksIssued.sort((a, b) => {
                return b.bookTitle.localeCompare(a.bookTitle);
              });
            } else {
              this.BooksIssued.sort((a, b) => {
                return a.bookTitle.localeCompare(b.bookTitle);
              });
            }
            break;
          case 'bookAuthor':
            if (sortEventData.direction === 'desc') {
              this.BooksIssued.sort((a, b) => {
                return b.bookAuthor.localeCompare(a.bookAuthor);
              });
            } else {
              this.BooksIssued.sort((a, b) => {
                return a.bookAuthor.localeCompare(b.bookAuthor);
              });
            }
            break;
          case 'issueDate':
            if (sortEventData.direction === 'desc') {
              this.BooksIssued.sort((a, b) => {
                return new Date(b.issueDate).valueOf() - new Date(a.issueDate).valueOf();
              });
            } else {
              this.BooksIssued.sort((a, b) => {
                return a.issueDate.localeCompare(b.issueDate);
              });
            }
            break;
          case 'returnDate':
            if (sortEventData.direction === 'desc') {
              this.BooksIssued.sort((a, b) => {
                return new Date(b.returnDate).valueOf() - new Date(a.returnDate).valueOf();
              });
            } else {
              this.BooksIssued.sort((a, b) => {
                return a.returnDate.localeCompare(b.returnDate);
              });
            }
            break;
          default:
            break;
        }
      }
      this.resultsLength = Math.ceil(this.BooksIssued.length / 5);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<BookIssued>(this.BooksIssued);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.bookService.getIssuedBooks().subscribe(res => {
      this.BooksIssued = res;
      this.dataSource = new MatTableDataSource<BookIssued>(this.BooksIssued);
      const sortData: Sort = {
        active: 'bookTitle',
        direction: 'asc'
      };
      this.sortChanged(sortData);
    });
  }

  returnBook(bookTitle, bookId, userId, bookingId) {
    this.dialogService.submitReview(bookTitle, bookId, userId, bookingId).subscribe(
      res => {
        if (res) {
          this.bookReviewService.addReview(res).subscribe((response: any) => {
            this.snackBar.open(response.message, 'Yayy!', {
              duration: 3000
            });
            this.sortChanged();
          });
        }
      });
  }
}
