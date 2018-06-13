import { Component, OnInit, ApplicationRef } from '@angular/core';

import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { BookCategory } from '../models/book-category';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent implements OnInit {

  books: Book[];
  bookCategories: BookCategory[];
  authorOrTitle: string;
  isLoading = true;
  categoryId = 0;

  constructor(private bookService: BookService, private applicationRef: ApplicationRef) { }

  ngOnInit() {
    this.getBooks(null);
  }

  getBooks(categoryId) {
    this.categoryId = categoryId;
    this.isLoading = true;
    this.bookService.getBooks()
      .subscribe(data => {
        this.books = data;

        this.bookService.getBookCategories()
          .subscribe(categoryData => {
            this.bookCategories = categoryData;

            this.books.forEach(book => {
              const bookCategory = this.bookCategories.find(b => b.id === book.categoryID);

              book.category = bookCategory.name;
            });
          });

        if (this.authorOrTitle && categoryId) {
          this.books = this.books.filter(b => {
            const query = this.authorOrTitle.toLocaleLowerCase();
            const bookTitle = b.title.toLocaleLowerCase();
            const author = b.author.toLocaleLowerCase();
            if ((bookTitle.includes(query) || author.includes(query))
              && b.categoryID !== 0 && b.categoryID === categoryId) {
              return b;
            }
          });
        } else if (categoryId) {
          this.books = this.books.filter(b => {
            if (b.categoryID !== 0 && b.categoryID === categoryId) {
              return b;
            }
          });
        } else if (this.authorOrTitle) {
          this.books = this.books.filter(b => {
            const query = this.authorOrTitle.toLocaleLowerCase();
            const bookTitle = b.title.toLocaleLowerCase();
            const author = b.author.toLocaleLowerCase();
            if ((bookTitle.includes(query) || author.includes(query))) {
              return b;
            }
          });
        }
        this.isLoading = false;
      });
  }

  categorySelected(categoryId) {
    this.categoryId = categoryId;
    this.isLoading = true;
    this.getBooks(categoryId);
  }

  textEntered(queryText) {
    this.isLoading = true;
    this.authorOrTitle = queryText;
    this.getBooks(this.categoryId);
  }
}
