import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { BookService } from '../services/book.service';
import { BookCategory } from '../models/book-category';
import { Book } from '../models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  availabilityForm: any;
  bookCategoryForm: any;
  bookCategoryName: any;
  bookNameForm: any;
  authorForm: any;
  isNewCategory = false;
  bookCategories: BookCategory[];

  constructor(private bookService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.bookService.getBookCategories().subscribe(data => {
      this.bookCategories = data;
    });

    this.availabilityForm = new FormControl('', [Validators.required]);
    this.bookCategoryForm = new FormControl('', [Validators.required]);
    this.bookNameForm = new FormControl('', [Validators.required]);
    this.authorForm = new FormControl('', [Validators.required]);
  }

  enterCategory() {
    this.isNewCategory = true;
    this.bookCategoryName = new FormControl('', [Validators.required]);
    this.bookCategoryForm = new FormControl('');
  }

  submit() {
    this.bookService.addBook(new Book(
      -1,
      this.bookNameForm.value,
      this.isNewCategory ? -1 : this.bookCategoryForm.value,
      this.authorForm.value,
      this.availabilityForm.value
    )).subscribe((response: any) => {
      this.snackBar.open(response.message, 'Yayy!', {
        duration: 3000
      });
    });
    this.availabilityForm.reset();
    this.authorForm.reset();
    this.bookCategoryForm.reset();
    this.bookNameForm.reset();
    if (this.isNewCategory) {
      this.bookCategoryName.reset();
    }
  }

  selectCategory() {
    this.isNewCategory = false;
  }
}
