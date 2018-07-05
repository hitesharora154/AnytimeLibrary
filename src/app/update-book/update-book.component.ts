import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { BookCategory } from '../models/book-category';
import { Book } from '../models/book';

const NUMBER_REGEX = /^[0-9]+$/;
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  updateFormGroup: any;
  titleForm: any;
  categoryForm: any;
  authorForm: any;
  availabilityForm: any;
  book: Book;
  bookCategories: BookCategory[];

  constructor(private dialogRef: MatDialogRef<UpdateBookComponent>) { }

  ngOnInit() {
    this.titleForm = new FormControl(this.book.title, [Validators.required]);
    this.categoryForm = new FormControl(this.book.categoryID, [Validators.required]);
    this.authorForm = new FormControl(this.book.author, [Validators.required]);
    this.availabilityForm = new FormControl(this.book.availability, [Validators.required, Validators.pattern(NUMBER_REGEX)]);
  }

  update() {
    const updatedBook = new Book(this.book.id,
      this.titleForm.value,
      this.categoryForm.value,
      this.authorForm.value,
      this.availabilityForm.value);

      return this.dialogRef.close(updatedBook);
  }

}
