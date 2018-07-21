import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';

import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { BookCategory } from '../models/book-category';
import { DeleteDialogService } from '../delete-dialog/delete-dialog.service';
import { UpdateBookDialogService } from '../update-book/update-book-dialog.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;
  resultsLength = 0;
  currentPage = 0;
  books: Book[];
  bookCategories: BookCategory[];
  dataSource: MatTableDataSource<Book>;
  displayedColumns = ['id', 'title', 'category', 'author', 'availability'];

  constructor(private bookService: BookService,
    private deleteDialogService: DeleteDialogService,
    private snackBar: MatSnackBar,
    private updateDialogService: UpdateBookDialogService) { }

  ngOnInit() {
  }

  sortChanged(sortEventData?) {
    this.bookService.getBooks().subscribe(res => {

      this.bookService.getBookCategories().subscribe(categoryData => {
        this.bookCategories = categoryData;

        this.books.forEach(book => {
          const bookCategory = this.bookCategories.find(b => b.id === book.categoryID);
          if (bookCategory) {
            book.category = bookCategory.name;
          }
        });
        if (sortEventData) {
          switch (sortEventData.active) {
            case 'id':
              if (sortEventData.direction === 'desc') {
                res.sort((a, b) => {
                  return b.id - a.id;
                });
              } else {
                res.sort((a, b) => {
                  return a.id - b.id;
                });
              }
              break;
            case 'title':
              if (sortEventData.direction === 'desc') {
                res.sort((a, b) => {
                  return b.title.localeCompare(a.title);
                });
              } else {
                res.sort((a, b) => {
                  return a.title.localeCompare(b.title);
                });
              }
              break;
            case 'category':
              if (sortEventData.direction === 'desc') {
                res.sort((a, b) => {
                  return b.category.localeCompare(a.category);
                });
              } else {
                res.sort((a, b) => {
                  return a.category.localeCompare(b.category);
                });
              }
              break;
            case 'author':
              if (sortEventData.direction === 'desc') {
                res.sort((a, b) => {
                  return new Date(b.author).valueOf() - new Date(a.author).valueOf();
                });
              } else {
                res.sort((a, b) => {
                  return a.author.localeCompare(b.author);
                });
              }
              break;
            case 'availability':
              if (sortEventData.direction === 'desc') {
                res.sort((a, b) => {
                  return b.availability - a.availability;
                });
              } else {
                res.sort((a, b) => {
                  return a.availability - b.availability;
                });
              }
              break;
            default:
              break;
          }
        }
        this.resultsLength = Math.ceil(res.length / 5);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource<Book>(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  ngAfterViewInit(): void {
    this.bookService.getBooks().subscribe(res => {
      this.books = res;
      this.dataSource = new MatTableDataSource<Book>(this.books);
      this.dataSource.paginator = this.paginator;
      this.sortChanged();
    });
  }

  deleteBook(bookId, bookTitle) {
    this.deleteDialogService.confirm(bookTitle, 'Do you want to delete this book?')
      .subscribe(res => {
        if (res) {
          this.bookService.deleteBook(bookId).subscribe((response: any) => {
            this.snackBar.open(response.message, 'Ok', {
              duration: 3000
            });
          });
        }
      });
  }

  updateBook(bookId, title, categoryID, author, availability) {
    this.updateDialogService.update(new Book(bookId,
      title,
      categoryID,
      author,
      availability), this.bookCategories).subscribe(res => {
        this.bookService.updateBook(res, res.id).subscribe((updateRes: any) => {
          this.snackBar.open(updateRes.message, 'Yayy!', {
            duration: 3000
          });
        });
      });
  }

}
